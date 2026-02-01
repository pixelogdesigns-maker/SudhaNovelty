import { BaseCrudService } from '@/integrations';
import { Toys } from '@/entities';

/**
 * Media Migration Utility
 * Migrates plain text filenames to actual Wix Media Manager URLs
 */

interface MigrationResult {
  itemId: string;
  itemName: string;
  toyImageUpdated: boolean;
  productGalleryUpdated: boolean;
  errors: string[];
}

/**
 * Search for a file in Wix Media Manager and return its URL
 * This uses the Wix Media Manager API to find files by name
 */
async function findMediaUrl(filename: string): Promise<string | null> {
  try {
    // Use Wix Media Manager API to search for the file
    // The file should be in the 'All Images' folder under site files
    const response = await fetch('/api/media/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: filename,
        folder: 'All Images',
      }),
    });

    if (!response.ok) {
      console.warn(`Could not find media for filename: ${filename}`);
      return null;
    }

    const data = await response.json();
    return data.url || null;
  } catch (error) {
    console.error(`Error searching for media ${filename}:`, error);
    return null;
  }
}

/**
 * Update a single toy item with media URLs
 */
async function updateToyItem(toy: Toys): Promise<MigrationResult> {
  const result: MigrationResult = {
    itemId: toy._id,
    itemName: toy.name || 'Unknown',
    toyImageUpdated: false,
    productGalleryUpdated: false,
    errors: [],
  };

  try {
    const updateData: Partial<Toys> = {
      _id: toy._id,
    };

    // Handle Toy Image field
    if (toy.productImages && typeof toy.productImages === 'string') {
      const filename = toy.productImages.trim();
      if (filename && !filename.startsWith('wix:image://')) {
        const mediaUrl = await findMediaUrl(filename);
        if (mediaUrl) {
          updateData.productImages = mediaUrl;
          result.toyImageUpdated = true;
          console.log(`✓ Updated toy image for "${toy.name}": ${filename} → ${mediaUrl}`);
        } else {
          result.errors.push(`Could not find media URL for toy image: ${filename}`);
        }
      }
    }

    // Handle Product Gallery field (comma-separated filenames)
    if (toy.productGallery && typeof toy.productGallery === 'string') {
      const filenames = toy.productGallery.split(',').map(f => f.trim());
      const mediaUrls: string[] = [];

      for (const filename of filenames) {
        if (filename && !filename.startsWith('wix:image://')) {
          const mediaUrl = await findMediaUrl(filename);
          if (mediaUrl) {
            mediaUrls.push(mediaUrl);
          } else {
            result.errors.push(`Could not find media URL for gallery image: ${filename}`);
          }
        } else if (filename.startsWith('wix:image://')) {
          mediaUrls.push(filename);
        }
      }

      if (mediaUrls.length > 0) {
        updateData.productGallery = mediaUrls.join(',');
        result.productGalleryUpdated = true;
        console.log(`✓ Updated product gallery for "${toy.name}": ${mediaUrls.length} images`);
      }
    }

    // Update the item if there are changes
    if (result.toyImageUpdated || result.productGalleryUpdated) {
      await BaseCrudService.update<Toys>('toys', updateData);
      console.log(`✓ Item "${toy.name}" updated successfully`);
    }
  } catch (error) {
    result.errors.push(`Error updating item: ${error instanceof Error ? error.message : String(error)}`);
    console.error(`✗ Error updating toy "${toy.name}":`, error);
  }

  return result;
}

/**
 * Main migration function
 * Migrates all toys in the collection
 */
export async function migrateToysMedia(): Promise<MigrationResult[]> {
  console.log('🚀 Starting Toys media migration...');

  const results: MigrationResult[] = [];

  try {
    // Fetch all toys
    const { items } = await BaseCrudService.getAll<Toys>('toys');
    console.log(`Found ${items.length} toys to process`);

    // Process each toy
    for (const toy of items) {
      const result = await updateToyItem(toy);
      results.push(result);
    }

    // Log summary
    console.log('\n📊 Migration Summary:');
    console.log(`Total items processed: ${results.length}`);
    console.log(`Items with toy image updated: ${results.filter(r => r.toyImageUpdated).length}`);
    console.log(`Items with product gallery updated: ${results.filter(r => r.productGalleryUpdated).length}`);
    console.log(`Items with errors: ${results.filter(r => r.errors.length > 0).length}`);

    // Log detailed results
    console.log('\n📋 Detailed Results:');
    results.forEach(result => {
      if (result.toyImageUpdated || result.productGalleryUpdated) {
        console.log(`✓ ${result.itemName} (${result.itemId})`);
        if (result.toyImageUpdated) console.log(`  - Toy image updated`);
        if (result.productGalleryUpdated) console.log(`  - Product gallery updated`);
      }
      if (result.errors.length > 0) {
        console.log(`⚠ ${result.itemName} (${result.itemId})`);
        result.errors.forEach(error => console.log(`  - ${error}`));
      }
    });

    console.log('\n✅ Migration complete!');
    return results;
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

/**
 * Helper function to manually run migration from browser console
 * Usage: window.runMediaMigration()
 */
if (typeof window !== 'undefined') {
  (window as any).runMediaMigration = migrateToysMedia;
}

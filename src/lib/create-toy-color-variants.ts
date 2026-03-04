import { BaseCrudService } from '@/integrations';
import { Toys } from '@/entities';

const COLORS = ['blue', 'black', 'red', 'yellow'];

/**
 * Removes duplicate toys from the collection.
 * Keeps only the first occurrence of each toy name and removes duplicates.
 * 
 * Usage: Call this function to clean up duplicate toys.
 * Example: await removeDuplicateToys();
 */
export async function removeDuplicateToys() {
  try {
    console.log('🧹 Starting duplicate toy removal...');
    
    // Fetch all toys
    const result = await BaseCrudService.getAll<Toys>('toys', [], { limit: 1000 });
    const allToys = result.items;
    
    if (!allToys || allToys.length === 0) {
      console.log('No toys found in collection');
      return { success: false, message: 'No toys found' };
    }
    
    console.log(`Found ${allToys.length} total toys. Identifying duplicates...`);
    
    // Track which toy names we've seen
    const seenNames = new Map<string, string>(); // name -> first _id
    const toDelete: string[] = [];
    
    // Identify duplicates
    for (const toy of allToys) {
      const toyName = toy.name?.trim().toLowerCase() || '';
      
      if (seenNames.has(toyName)) {
        // This is a duplicate
        toDelete.push(toy._id);
        console.log(`🔍 Found duplicate: ${toy.name} (ID: ${toy._id})`);
      } else {
        // First occurrence - keep it
        seenNames.set(toyName, toy._id);
      }
    }
    
    console.log(`Identified ${toDelete.length} duplicates to remove`);
    
    // Delete duplicates
    let deletedCount = 0;
    const errors: string[] = [];
    
    for (const toyId of toDelete) {
      try {
        await BaseCrudService.delete('toys', toyId);
        deletedCount++;
        console.log(`✅ Deleted duplicate toy: ${toyId}`);
      } catch (error) {
        const errorMsg = `Failed to delete toy ${toyId}: ${error instanceof Error ? error.message : String(error)}`;
        errors.push(errorMsg);
        console.error(errorMsg);
      }
    }
    
    const summary = {
      success: true,
      totalToys: allToys.length,
      duplicatesRemoved: deletedCount,
      uniqueToysRemaining: allToys.length - deletedCount,
      errors: errors.length > 0 ? errors : undefined,
    };
    
    console.log('🎉 Duplicate removal complete!', summary);
    return summary;
  } catch (error) {
    console.error('❌ Error removing duplicate toys:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : String(error) 
    };
  }
}

/**
 * Creates color variants for all existing toys in the collection.
 * For each toy, creates 4 duplicate records with different colors.
 * 
 * Usage: Call this function once from a component or page to generate variants.
 * Example: await createToyColorVariants();
 */
export async function createToyColorVariants() {
  try {
    console.log('🎨 Starting toy color variant creation...');
    
    // Fetch all existing toys
    const result = await BaseCrudService.getAll<Toys>('toys', [], { limit: 1000 });
    const existingToys = result.items;
    
    if (!existingToys || existingToys.length === 0) {
      console.log('No toys found in collection');
      return { success: false, message: 'No toys found' };
    }
    
    console.log(`Found ${existingToys.length} existing toys. Creating color variants...`);
    
    let createdCount = 0;
    const errors: string[] = [];
    
    // For each existing toy, create 4 color variants
    for (const toy of existingToys) {
      for (const color of COLORS) {
        try {
          const variantToy: Toys = {
            _id: crypto.randomUUID(),
            name: toy.name,
            color: color,
            productImages: toy.productImages,
            image: toy.image,
            shortDescription: toy.shortDescription,
            ageGroup: toy.ageGroup,
            category: toy.category,
            whatsAppInquiryLink: toy.whatsAppInquiryLink,
            price: toy.price,
            productImages1: toy.productImages1,
            productGallery: toy.productGallery,
          };
          
          await BaseCrudService.create('toys', variantToy);
          createdCount++;
          console.log(`✅ Created variant: ${toy.name} - ${color}`);
        } catch (error) {
          const errorMsg = `Failed to create ${toy.name} - ${color}: ${error instanceof Error ? error.message : String(error)}`;
          errors.push(errorMsg);
          console.error(errorMsg);
        }
      }
    }
    
    const summary = {
      success: true,
      totalOriginalToys: existingToys.length,
      variantsCreated: createdCount,
      expectedVariants: existingToys.length * COLORS.length,
      errors: errors.length > 0 ? errors : undefined,
    };
    
    console.log('🎉 Color variant creation complete!', summary);
    return summary;
  } catch (error) {
    console.error('❌ Error creating toy color variants:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : String(error) 
    };
  }
}

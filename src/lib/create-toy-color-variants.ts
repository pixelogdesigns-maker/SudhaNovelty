import { BaseCrudService } from '@/integrations';
import { Toys } from '@/entities';

const COLORS = ['blue', 'black', 'red', 'yellow'];

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

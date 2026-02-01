/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: contactinquiries
 * Interface for ContactInquiries
 */
export interface ContactInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  visitorName?: string;
  /** @wixFieldType text */
  visitorEmail?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: storeinformation
 * Interface for StoreInformation
 */
export interface StoreInformation {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  storeName?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  whatsAppNumber?: string;
  /** @wixFieldType text */
  workingHours?: string;
  /** @wixFieldType text */
  emailAddress?: string;
}


/**
 * Collection ID: toycategories
 * Interface for ToyCategories
 */
export interface ToyCategories {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  categoryName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  categoryImage?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType legacy_color */
  color?: any;
  /** @wixFieldType number */
  number?: number;
  /** @wixFieldType number */
  price?: number;
}


/**
 * Collection ID: toys
 * Interface for Toys
 */
export interface Toys {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  productImages?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  ageGroup?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType url */
  whatsAppInquiryLink?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType media_gallery */
  productImages1?: any;
}

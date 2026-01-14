/**
 * Utility functions for WhatsApp integration
 */

/**
 * Normalizes a phone number for WhatsApp API
 * Removes '+' prefix and any spaces/dashes
 * WhatsApp wa.me API requires format: https://wa.me/919025398147 (without +)
 */
export const normalizePhoneNumber = (phoneNumber: string | undefined): string => {
  if (!phoneNumber) return '919944234077'; // Default fallback
  
  return phoneNumber
    .replace(/^\+/, '') // Remove leading +
    .replace(/\s+/g, '') // Remove spaces
    .replace(/-/g, ''); // Remove dashes
};

/**
 * Generates a WhatsApp URL with optional message
 */
export const generateWhatsAppUrl = (
  phoneNumber: string | undefined,
  message?: string
): string => {
  const normalizedNumber = normalizePhoneNumber(phoneNumber);
  const baseUrl = `https://wa.me/${normalizedNumber}`;
  
  if (message) {
    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}?text=${encodedMessage}`;
  }
  
  return baseUrl;
};

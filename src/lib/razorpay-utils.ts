/**
 * Razorpay Integration Utilities
 * Handles payment processing with Razorpay
 */

export interface RazorpayPaymentOptions {
  amount: number; // Amount in paise (e.g., 50000 for Rs. 500)
  currency?: string;
  productName: string;
  productDescription?: string;
  customerEmail?: string;
  customerPhone?: string;
  orderId?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

/**
 * Initialize Razorpay script
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Open Razorpay checkout
 */
export const openRazorpayCheckout = async (options: RazorpayPaymentOptions) => {
  const scriptLoaded = await loadRazorpayScript();
  
  if (!scriptLoaded) {
    console.error('Failed to load Razorpay script');
    options.onError?.({ message: 'Failed to load payment gateway' });
    return;
  }

  // Declare Razorpay type
  declare global {
    interface Window {
      Razorpay: any;
    }
  }

  if (!window.Razorpay) {
    console.error('Razorpay is not available');
    options.onError?.({ message: 'Payment gateway not available' });
    return;
  }

  const razorpayOptions = {
    key: import.meta.env.PUBLIC_RAZORPAY_KEY_ID || '', // Set this in your .env file
    amount: options.amount,
    currency: options.currency || 'INR',
    name: 'Sudha Novelties',
    description: options.productDescription || options.productName,
    order_id: options.orderId,
    handler: (response: any) => {
      options.onSuccess?.(response);
    },
    prefill: {
      email: options.customerEmail || '',
      contact: options.customerPhone || '',
    },
    theme: {
      color: '#F48FB1', // Primary color from your brand
    },
    modal: {
      ondismiss: () => {
        options.onError?.({ message: 'Payment cancelled' });
      },
    },
  };

  try {
    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  } catch (error) {
    console.error('Error opening Razorpay checkout:', error);
    options.onError?.(error);
  }
};

/**
 * Format amount to paise (multiply by 100)
 */
export const formatAmountToPaise = (amount: number): number => {
  return Math.round(amount * 100);
};

/**
 * Format amount from paise to rupees
 */
export const formatAmountFromPaise = (amount: number): number => {
  return amount / 100;
};

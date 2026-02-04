# Razorpay Integration Setup Guide

This guide explains how to integrate Razorpay payment processing with your Sudha Novelties toy store.

## Overview

I've created a complete Razorpay integration for your store with the following components:

1. **RazorpayCheckout Component** - Handles payment processing
2. **Razorpay Utilities** - Helper functions for payment management
3. **Product Details Page** - Buy Now button linked to Razorpay
4. **Cart Page** - Optional Razorpay payment option

## Setup Steps

### Step 1: Get Your Razorpay API Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up or log in to your account
3. Navigate to **Settings → API Keys**
4. Copy your **Key ID** (public key)
5. Keep your **Key Secret** safe (private key - never share this)

### Step 2: Add Environment Variables

Create or update your `.env` file in the project root:

```env
PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

**Important:** 
- The `PUBLIC_` prefix makes this variable accessible in the browser (it's safe since it's a public key)
- Never commit your Key Secret to version control
- The Key Secret should only be used on your backend server

### Step 3: Update Your Environment Configuration

If you're using a `.env.local` file for local development:

```env
PUBLIC_RAZORPAY_KEY_ID=your_test_key_id
```

For production, update your hosting platform's environment variables with your production Key ID.

## How It Works

### Buy Now Button (Product Details Page)

When a user clicks "Buy Now" on a product:
1. They're taken to the cart page
2. They can proceed with Razorpay payment
3. The payment gateway opens
4. After successful payment, they receive an order confirmation

### Payment Flow

```
User clicks "Buy Now" 
    ↓
Cart page loads with product
    ↓
User clicks "Pay with Razorpay"
    ↓
Razorpay checkout modal opens
    ↓
User enters payment details
    ↓
Payment processed
    ↓
Success/Error callback triggered
```

## Files Created/Modified

### New Files:
- `/src/lib/razorpay-utils.ts` - Razorpay utility functions
- `/src/components/ecom/RazorpayCheckout.tsx` - Razorpay checkout component
- `/src/components/ecom/CartWithRazorpay.tsx` - Cart with Razorpay integration

### Modified Files:
- `/src/components/pages/ProductDetailsPage.tsx` - Added Razorpay import and handlers

## Usage Examples

### Using RazorpayCheckout Component

```tsx
import RazorpayCheckout from '@/components/ecom/RazorpayCheckout';

<RazorpayCheckout
  amount={500} // Amount in rupees
  productName="Toy Name"
  productDescription="Toy description"
  customerEmail="customer@example.com"
  customerPhone="9876543210"
  onSuccess={(response) => {
    console.log('Payment successful:', response);
    // Handle success - redirect, update order status, etc.
  }}
  onError={(error) => {
    console.error('Payment failed:', error);
    // Handle error
  }}
  label="Pay Now"
/>
```

### Using Razorpay Utils

```tsx
import { openRazorpayCheckout, formatAmountToPaise } from '@/lib/razorpay-utils';

// Open checkout
await openRazorpayCheckout({
  amount: formatAmountToPaise(500), // Convert rupees to paise
  productName: 'Toy',
  onSuccess: (response) => {
    // Handle success
  },
  onError: (error) => {
    // Handle error
  }
});
```

## Testing

### Test Credentials (Razorpay Sandbox)

Use these test card details in sandbox mode:

**Success Card:**
- Card Number: `4111 1111 1111 1111`
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

**Failed Payment Card:**
- Card Number: `4000 0000 0000 0002`
- Expiry: Any future date
- CVV: Any 3 digits

### Testing Steps

1. Add a product to cart
2. Click "Buy Now" or "Pay with Razorpay"
3. Use test card details above
4. Complete the payment
5. Check console for success/error messages

## Production Deployment

### Before Going Live:

1. **Switch to Production Keys:**
   - Update `PUBLIC_RAZORPAY_KEY_ID` with your production Key ID
   - Ensure Key Secret is stored securely on your backend only

2. **Backend Integration (Optional but Recommended):**
   - Create a backend endpoint to verify payments
   - Use Razorpay's payment verification API
   - Store order details in your database

3. **Email Notifications:**
   - Set up email confirmations for successful payments
   - Send order details to customers

4. **Order Management:**
   - Implement order tracking system
   - Update inventory after payment
   - Send shipping notifications

## Troubleshooting

### Issue: "Razorpay is not available"
- Check that the script loaded successfully
- Verify your Key ID is correct
- Check browser console for errors

### Issue: Payment modal doesn't open
- Ensure `PUBLIC_RAZORPAY_KEY_ID` is set in environment
- Check that the amount is greater than 0
- Verify no JavaScript errors in console

### Issue: Payment succeeds but no confirmation
- Implement backend verification
- Add order status tracking
- Send confirmation emails

## Security Notes

1. **Never expose your Key Secret** in frontend code
2. **Always verify payments** on your backend using the Key Secret
3. **Use HTTPS** in production
4. **Validate amounts** on backend before processing
5. **Implement rate limiting** to prevent abuse

## Next Steps

1. Set up your Razorpay account
2. Add your Key ID to environment variables
3. Test with sandbox credentials
4. Implement backend verification (recommended)
5. Deploy to production with production keys

## Support

For more information:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)
- [Razorpay Support](https://razorpay.com/support/)

## Additional Features to Consider

1. **Payment Status Tracking** - Track order status in real-time
2. **Refund Processing** - Handle refunds through Razorpay API
3. **Subscription Payments** - For recurring orders
4. **Payment Analytics** - Track sales and revenue
5. **Multiple Payment Methods** - UPI, Wallets, EMI options

---

**Last Updated:** February 2026
**Integration Version:** 1.0

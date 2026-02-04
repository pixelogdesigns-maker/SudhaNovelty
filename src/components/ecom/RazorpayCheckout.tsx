import { useState } from 'react';
import { openRazorpayCheckout, formatAmountToPaise } from '@/lib/razorpay-utils';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface RazorpayCheckoutProps {
  amount: number; // Amount in rupees
  productName: string;
  productDescription?: string;
  customerEmail?: string;
  customerPhone?: string;
  orderId?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  className?: string;
  label?: string;
  loadingState?: string;
}

export default function RazorpayCheckout({
  amount,
  productName,
  productDescription,
  customerEmail,
  customerPhone,
  orderId,
  onSuccess,
  onError,
  className = '',
  label = 'Pay with Razorpay',
  loadingState = 'Processing...',
}: RazorpayCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      onError?.({ message: 'Invalid amount' });
      return;
    }

    setIsLoading(true);

    try {
      await openRazorpayCheckout({
        amount: formatAmountToPaise(amount),
        productName,
        productDescription,
        customerEmail,
        customerPhone,
        orderId,
        onSuccess: (response) => {
          setIsLoading(false);
          onSuccess?.(response);
        },
        onError: (error) => {
          setIsLoading(false);
          onError?.(error);
        },
      });
    } catch (error) {
      setIsLoading(false);
      onError?.(error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading || !amount || amount <= 0}
      className={`
        w-full px-6 py-3 rounded-lg font-medium transition-all duration-300
        flex items-center justify-center gap-2
        ${
          isLoading || !amount || amount <= 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
        }
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" />
          {loadingState}
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

import { useEffect, useRef } from 'react';
import { useCart } from '@/integrations';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, actions } = useCart();
  const checkoutInitiatedRef = useRef(false);

  useEffect(() => {
    // Prevent double checkout initiation
    if (checkoutInitiatedRef.current) return;

    // If cart is empty, redirect to toys page
    if (items.length === 0) {
      navigate('/toys', { replace: true });
      return;
    }

    // Mark checkout as initiated to prevent race conditions
    checkoutInitiatedRef.current = true;

    // Trigger checkout immediately without await
    // This allows the redirect to happen in the background
    actions.checkout().catch((error) => {
      console.error('Checkout error:', error);
      // Fallback: redirect to toys if checkout fails
      navigate('/toys', { replace: true });
    });
  }, [items.length, actions, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-pink/20 to-white py-12 px-4 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="font-paragraph text-foreground text-lg mt-4">
          Initializing secure checkout...
        </p>
      </div>
    </div>
  );
}

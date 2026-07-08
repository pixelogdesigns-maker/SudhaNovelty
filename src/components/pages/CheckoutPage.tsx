import { useEffect } from 'react';
import { useCart } from '@/integrations';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface AddressForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  streetNumber: string;
  area: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, actions } = useCart();

  useEffect(() => {
    // If cart is empty, redirect to toys page
    if (items.length === 0) {
      navigate('/toys');
      return;
    }

    // Trigger the Wix checkout process
    actions.checkout();
  }, [items, actions, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-pink/20 to-white py-12 px-4 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="font-paragraph text-foreground text-lg mt-4">
          Redirecting to checkout...
        </p>
      </div>
    </div>
  );
}

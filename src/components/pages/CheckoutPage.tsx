import { useState } from 'react';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const { items, totalPrice, isCheckingOut } = useCart();
  const { currency } = useCurrency();
  const displayCurrency = currency ?? DEFAULT_CURRENCY;

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<AddressForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    streetNumber: '',
    area: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });

  const [billingAddress, setBillingAddress] = useState<AddressForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    streetNumber: '',
    area: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });

  const handleShippingChange = (field: keyof AddressForm, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
    if (sameAsShipping) {
      setBillingAddress((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleBillingChange = (field: keyof AddressForm, value: string) => {
    setBillingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked);
    if (checked) {
      setBillingAddress(shippingAddress);
    }
  };

  const validateForm = () => {
    const requiredFields: (keyof AddressForm)[] = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'streetNumber',
      'area',
      'city',
      'state',
      'zipCode',
    ];

    for (const field of requiredFields) {
      if (!shippingAddress[field]) {
        alert(`Please fill in ${field}`);
        return false;
      }
    }

    if (!sameAsShipping) {
      for (const field of requiredFields) {
        if (!billingAddress[field]) {
          alert(`Please fill in billing ${field}`);
          return false;
        }
      }
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      // Store address information in localStorage for order processing
      const orderData = {
        shippingAddress,
        billingAddress: sameAsShipping ? shippingAddress : billingAddress,
        items,
        totalPrice,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('pendingOrder', JSON.stringify(orderData));

      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert('Order placed successfully! Thank you for your purchase.');
      navigate('/');
    } catch (error) {
      alert('Error placing order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-light-pink/20 to-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/toys')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-paragraph font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Shopping
          </button>

          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="font-paragraph text-gray-600 text-lg mb-8">
              Add items to your cart before proceeding to checkout
            </p>
            <Button
              onClick={() => navigate('/toys')}
              size="lg"
              className="px-8 py-3"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-pink/20 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/toys')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-paragraph font-semibold"
        >
          <ArrowLeft size={20} />
          Back to Shopping
        </button>

        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-12">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    First Name *
                  </Label>
                  <Input
                    type="text"
                    value={shippingAddress.firstName}
                    onChange={(e) =>
                      handleShippingChange('firstName', e.target.value)
                    }
                    placeholder="John"
                    className="font-paragraph"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Last Name *
                  </Label>
                  <Input
                    type="text"
                    value={shippingAddress.lastName}
                    onChange={(e) =>
                      handleShippingChange('lastName', e.target.value)
                    }
                    placeholder="Doe"
                    className="font-paragraph"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Email *
                  </Label>
                  <Input
                    type="email"
                    value={shippingAddress.email}
                    onChange={(e) =>
                      handleShippingChange('email', e.target.value)
                    }
                    placeholder="john@example.com"
                    className="font-paragraph"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Phone Number *
                  </Label>
                  <Input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      handleShippingChange('phone', e.target.value)
                    }
                    placeholder="+91 98765 43210"
                    className="font-paragraph"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Street Address *
                  </Label>
                  <Input
                    type="text"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      handleShippingChange('address', e.target.value)
                    }
                    placeholder="Main Street"
                    className="font-paragraph"
                  />
                </div>

                {/* Street Number */}
                <div>
                  <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Street Number *
                  </Label>
                  <Input
                    type="text"
                    value={shippingAddress.streetNumber}
                    onChange={(e) =>
                      handleShippingChange('streetNumber', e.target.value)
                    }
                    placeholder="123"
                    className="font-paragraph"
                  />
                </div>

                {/* Area */}
                <div>
                  <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Area *
                  </Label>
                  <Input
                    type="text"
                    value={shippingAddress.area}
                    onChange={(e) =>
                      handleShippingChange('area', e.target.value)
                    }
                    placeholder="Downtown"
                    className="font-paragraph"
                  />
                </div>

                {/* City */}
                <div>
                  <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    City *
                  </Label>
                  <Input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      handleShippingChange('city', e.target.value)
                    }
                    placeholder="New York"
                    className="font-paragraph"
                  />
                </div>

                {/* State */}
                <div>
                  <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    State/Province *
                  </Label>
                  <Input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) =>
                      handleShippingChange('state', e.target.value)
                    }
                    placeholder="NY"
                    className="font-paragraph"
                  />
                </div>

                {/* Zip Code */}
                <div>
                  <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Zip/Postal Code *
                  </Label>
                  <Input
                    type="text"
                    value={shippingAddress.zipCode}
                    onChange={(e) =>
                      handleShippingChange('zipCode', e.target.value)
                    }
                    placeholder="10001"
                    className="font-paragraph"
                  />
                </div>

                {/* Country */}
                <div>
                  <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Country
                  </Label>
                  <Input
                    type="text"
                    value={shippingAddress.country}
                    onChange={(e) =>
                      handleShippingChange('country', e.target.value)
                    }
                    placeholder="India"
                    className="font-paragraph"
                  />
                </div>
              </div>
            </motion.div>

            {/* Billing Address Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <Checkbox
                  id="same-as-shipping"
                  checked={sameAsShipping}
                  onCheckedChange={handleSameAsShippingChange}
                  className="w-5 h-5"
                />
                <Label
                  htmlFor="same-as-shipping"
                  className="font-paragraph text-sm font-semibold text-foreground cursor-pointer"
                >
                  Billing address same as shipping
                </Label>
              </div>

              {!sameAsShipping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                      First Name *
                    </Label>
                    <Input
                      type="text"
                      value={billingAddress.firstName}
                      onChange={(e) =>
                        handleBillingChange('firstName', e.target.value)
                      }
                      placeholder="John"
                      className="font-paragraph"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                      Last Name *
                    </Label>
                    <Input
                      type="text"
                      value={billingAddress.lastName}
                      onChange={(e) =>
                        handleBillingChange('lastName', e.target.value)
                      }
                      placeholder="Doe"
                      className="font-paragraph"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                      Email *
                    </Label>
                    <Input
                      type="email"
                      value={billingAddress.email}
                      onChange={(e) =>
                        handleBillingChange('email', e.target.value)
                      }
                      placeholder="john@example.com"
                      className="font-paragraph"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                      Phone Number *
                    </Label>
                    <Input
                      type="tel"
                      value={billingAddress.phone}
                      onChange={(e) =>
                        handleBillingChange('phone', e.target.value)
                      }
                      placeholder="+91 98765 43210"
                      className="font-paragraph"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                      Street Address *
                    </Label>
                    <Input
                      type="text"
                      value={billingAddress.address}
                      onChange={(e) =>
                        handleBillingChange('address', e.target.value)
                      }
                      placeholder="Main Street"
                      className="font-paragraph"
                    />
                  </div>

                  {/* Street Number */}
                  <div>
                    <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                      Street Number *
                    </Label>
                    <Input
                      type="text"
                      value={billingAddress.streetNumber}
                      onChange={(e) =>
                        handleBillingChange('streetNumber', e.target.value)
                      }
                      placeholder="123"
                      className="font-paragraph"
                    />
                  </div>

                  {/* Area */}
                  <div>
                    <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                      Area *
                    </Label>
                    <Input
                      type="text"
                      value={billingAddress.area}
                      onChange={(e) =>
                        handleBillingChange('area', e.target.value)
                      }
                      placeholder="Downtown"
                      className="font-paragraph"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                      City *
                    </Label>
                    <Input
                      type="text"
                      value={billingAddress.city}
                      onChange={(e) =>
                        handleBillingChange('city', e.target.value)
                      }
                      placeholder="New York"
                      className="font-paragraph"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                      State/Province *
                    </Label>
                    <Input
                      type="text"
                      value={billingAddress.state}
                      onChange={(e) =>
                        handleBillingChange('state', e.target.value)
                      }
                      placeholder="NY"
                      className="font-paragraph"
                    />
                  </div>

                  {/* Zip Code */}
                  <div>
                    <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                      Zip/Postal Code *
                    </Label>
                    <Input
                      type="text"
                      value={billingAddress.zipCode}
                      onChange={(e) =>
                        handleBillingChange('zipCode', e.target.value)
                      }
                      placeholder="10001"
                      className="font-paragraph"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <Label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                      Country
                    </Label>
                    <Input
                      type="text"
                      value={billingAddress.country}
                      onChange={(e) =>
                        handleBillingChange('country', e.target.value)
                      }
                      placeholder="India"
                      className="font-paragraph"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.collectionId}-${item.itemId}`}
                    className="flex gap-3 pb-4 border-b border-gray-100 last:border-0"
                  >
                    {item.image && (
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-sm font-bold text-foreground truncate">
                        {item.name}
                      </h3>
                      <p className="font-paragraph text-xs text-gray-600 mt-1">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-heading text-sm font-bold text-primary mt-1 rupee-symbol">
                        {formatPrice(item.price * item.quantity, displayCurrency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-gray-100 pt-6">
                <div className="flex justify-between font-paragraph text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-foreground rupee-symbol">
                    {formatPrice(totalPrice, displayCurrency)}
                  </span>
                </div>
                <div className="flex justify-between font-paragraph text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-foreground rupee-symbol">
                    {formatPrice(0, displayCurrency)}
                  </span>
                </div>
                <div className="flex justify-between font-paragraph text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-foreground rupee-symbol">
                    {formatPrice(0, displayCurrency)}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-heading font-bold text-foreground">
                    Total
                  </span>
                  <span className="font-heading text-xl font-bold text-primary rupee-symbol">
                    {formatPrice(totalPrice, displayCurrency)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={isProcessing || isCheckingOut}
                size="lg"
                className="w-full mt-6 py-3 font-heading font-bold"
              >
                {isProcessing || isCheckingOut ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>

              <p className="font-paragraph text-xs text-gray-500 text-center mt-4">
                Your payment information is secure and encrypted
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

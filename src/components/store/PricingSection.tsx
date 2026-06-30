import React from 'react';
import { useCurrency, formatPrice } from '@/integrations';

interface PricingSectionProps {
  price: number;
  mrp?: number;
  className?: string;
  showBadge?: boolean;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  price,
  mrp,
  className = '',
  showBadge = true,
}) => {
  const { currency } = useCurrency();
  // Use INR as the currency for India
  const displayCurrency = currency || 'INR';

  // Calculate discount only if MRP is provided and greater than price
  const hasDiscount = mrp && mrp > price;
  const discountAmount = hasDiscount ? mrp - price : 0;
  const discountPercentage = hasDiscount ? Math.round((discountAmount / mrp) * 100) : 0;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Main Price Display */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl md:text-4xl font-bold text-foreground font-heading">
          {formatPrice(price, displayCurrency)}
        </span>
        
        {/* MRP with Strikethrough - if discount exists */}
        {hasDiscount && (
          <span className="text-sm md:text-base text-gray-350 line-through font-paragraph">
            {formatPrice(mrp, displayCurrency)}
          </span>
        )}
      </div>

      {/* Discount Indicator - Simple and Clean */}
      {hasDiscount && showBadge && (
        <div className="flex items-center gap-2 pt-1">
          <span className="inline-block bg-secondary text-foreground px-2.5 py-1 rounded-md text-xs font-bold font-heading">
            {discountPercentage}% off
          </span>
          <span className="text-xs text-gray-600 font-paragraph">
            Save {formatPrice(discountAmount, displayCurrency)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PricingSection;

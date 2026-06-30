import React from 'react';
import { useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';

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
  const displayCurrency = currency || DEFAULT_CURRENCY;

  // Calculate discount only if MRP is provided and greater than price
  const hasDiscount = mrp && mrp > price;
  const discountAmount = hasDiscount ? mrp - price : 0;
  const discountPercentage = hasDiscount ? Math.round((discountAmount / mrp) * 100) : 0;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* MRP with Strikethrough */}
      {hasDiscount && (
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm text-gray-500 font-paragraph uppercase tracking-wide">
            MRP
          </span>
          <span className="text-sm md:text-base text-gray-400 line-through font-paragraph">
            {formatPrice(mrp, displayCurrency)}
          </span>
        </div>
      )}

      {/* Our Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-xs md:text-sm text-gray-500 font-paragraph uppercase tracking-wide">
          Our Price
        </span>
        <span className="text-2xl md:text-4xl font-bold text-primary font-heading">
          {formatPrice(price, displayCurrency)}
        </span>
      </div>

      {/* Discount Badge */}
      {hasDiscount && showBadge && (
        <div className="flex items-center gap-3 pt-2">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-md">
            <span className="font-bold text-sm md:text-base font-heading">
              {discountPercentage}% OFF
            </span>
          </div>
          <span className="text-xs md:text-sm text-gray-600 font-paragraph">
            Save {formatPrice(discountAmount, displayCurrency)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PricingSection;

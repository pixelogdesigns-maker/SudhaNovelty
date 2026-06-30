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
    <div className={`space-y-3 ${className}`}>
      {/* Price Row - MRP and Selling Price */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Selling Price - Primary */}
        <div className="flex flex-col">
          <span className="text-[10px] md:text-xs text-gray-400 font-paragraph uppercase tracking-widest font-semibold mb-1">
            Price
          </span>
          <span className="text-2xl md:text-3xl font-bold text-primary font-heading leading-none">
            {formatPrice(price, displayCurrency)}
          </span>
        </div>

        {/* MRP with Strikethrough - Secondary */}
        {hasDiscount && (
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs text-gray-400 font-paragraph uppercase tracking-widest font-semibold mb-1">
              MRP
            </span>
            <span className="text-sm md:text-base text-gray-350 line-through font-paragraph font-medium">
              {formatPrice(mrp, displayCurrency)}
            </span>
          </div>
        )}
      </div>

      {/* Discount Badge and Savings - Aligned Below */}
      {hasDiscount && showBadge && (
        <div className="flex items-center gap-3 pt-1">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <span className="font-bold text-xs md:text-sm font-heading leading-none">
              {discountPercentage}% OFF
            </span>
          </div>
          <span className="text-xs md:text-sm text-gray-600 font-paragraph font-medium">
            Save {formatPrice(discountAmount, displayCurrency)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PricingSection;

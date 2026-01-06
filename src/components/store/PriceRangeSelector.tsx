import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PriceRangeSelectorProps {
  min: 500;
  max: 5000;
  selectedMin: number;
  selectedMax: number;
  setSelectedMin: (price: number) => void;
  setSelectedMax: (price: number) => void;
}

export const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({
  min,
  max,
  selectedMin,
  selectedMax,
  setSelectedMin,
  setSelectedMax,
}) => {
  // Local state for smooth slider + input sync
  const [localMin, setLocalMin] = useState(selectedMin);
  const [localMax, setLocalMax] = useState(selectedMax);

  useEffect(() => {
    setLocalMin(selectedMin);
    setLocalMax(selectedMax);
  }, [selectedMin, selectedMax]);

  const roundedMin = Math.floor(min);
  const roundedMax = Math.ceil(max);

  return (
    <div className="space-y-6">
      {/* Title */}
      <Label className="text-content-primary font-semibold text-md">
        Price Range (₹)
      </Label>

      {/* Min / Max Labels */}
      <div className="flex justify-between text-sm text-content-light">
        <span>₹{roundedMin}</span>
        <span>₹{roundedMax}</span>
      </div>

      {/* Slider */}
      <Slider
        min={roundedMin}
        max={roundedMax}
        step={100}
        value={[localMin, localMax]}
        onValueChange={([minVal, maxVal]) => {
          setLocalMin(minVal);
          setLocalMax(maxVal);
        }}
        onValueCommit={([minVal, maxVal]) => {
          setSelectedMin(minVal);
          setSelectedMax(maxVal);
        }}
      />

      {/* Manual Inputs */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Label className="text-xs text-content-muted">Min Price</Label>
          <Input
            type="number"
            value={localMin}
            min={roundedMin}
            max={localMax}
            onChange={e => {
              const value = Number(e.target.value);
              setLocalMin(value);
              setSelectedMin(value);
            }}
          />
        </div>

        <div className="flex-1">
          <Label className="text-xs text-content-muted">Max Price</Label>
          <Input
            type="number"
            value={localMax}
            min={localMin}
            max={roundedMax}
            onChange={e => {
              const value = Number(e.target.value);
              setLocalMax(value);
              setSelectedMax(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSelector;


import React, { useState, useEffect } from 'react';

const PriceRangeSlider = ({ min = 0, max = 500, value = [0, 500], onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), localValue[1] - 1);
    const newValue = [newMin, localValue[1]];
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), localValue[0] + 1);
    const newValue = [localValue[0], newMax];
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const percentage = (value) => ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      {/* Price Display */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          {localValue[0]} lei
        </span>
        <span className="text-gray-400">-</span>
        <span className="text-gray-600">
          {localValue[1]} lei
        </span>
      </div>

      {/* Dual Range Slider */}
      <div className="relative h-2">
        {/* Track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
        
        {/* Active Range */}
        <div 
          className="absolute h-2 bg-beauty-pink rounded-full"
          style={{
            left: `${percentage(localValue[0])}%`,
            right: `${100 - percentage(localValue[1])}%`
          }}
        ></div>

        {/* Min Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={handleMinChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-beauty-pink [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-beauty-pink [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
        />

        {/* Max Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-beauty-pink [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-beauty-pink [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
        />
      </div>

      {/* Input Fields */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={localValue[0]}
          onChange={(e) => {
            const newMin = Math.max(min, Math.min(Number(e.target.value), localValue[1] - 1));
            const newValue = [newMin, localValue[1]];
            setLocalValue(newValue);
            onChange?.(newValue);
          }}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink"
          placeholder="Min"
        />
        <span className="text-gray-400">-</span>
        <input
          type="number"
          value={localValue[1]}
          onChange={(e) => {
            const newMax = Math.min(max, Math.max(Number(e.target.value), localValue[0] + 1));
            const newValue = [localValue[0], newMax];
            setLocalValue(newValue);
            onChange?.(newValue);
          }}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink"
          placeholder="Max"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
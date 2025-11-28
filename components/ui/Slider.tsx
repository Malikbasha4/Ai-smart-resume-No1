
import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export const Slider: React.FC<SliderProps> = ({ 
  label, value, min, max, step = 1, onChange, formatValue 
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold uppercase text-slate-500 tracking-wide">{label}</label>
        <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
      />
    </div>
  );
};

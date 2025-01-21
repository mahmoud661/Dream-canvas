import React from 'react';
import { SIZES } from '../config/constants';

interface SizeSelectorProps {
  value: string;
  onChange: (size: string) => void;
}

export function SizeSelector({ value, onChange }: SizeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Image Size</label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SIZES.map(size => (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            className={`px-3 py-2 rounded-lg text-sm ${
              value === size
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
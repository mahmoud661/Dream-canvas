import React from 'react';
import { STYLES } from '../config/constants';

interface StyleSelectorProps {
  value: string;
  onChange: (style: string) => void;
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Style</label>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {STYLES.map(style => (
          <button
            key={style.id}
            type="button"
            onClick={() => onChange(style.id)}
            className={`px-3 py-2 rounded-lg text-sm ${
              value === style.id
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {style.name}
          </button>
        ))}
      </div>
    </div>
  );
}
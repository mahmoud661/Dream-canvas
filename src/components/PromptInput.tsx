import React from 'react';
import { ImageIcon } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PromptInput({ value, onChange }: PromptInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-300">
        Your Vision
      </label>
      <div className="relative">
        <textarea
          id="prompt"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="w-full h-32 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
        />
        <ImageIcon className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
}
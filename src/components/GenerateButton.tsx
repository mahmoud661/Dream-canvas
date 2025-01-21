import React from 'react';
import { Send } from 'lucide-react';

interface GenerateButtonProps {
  isGenerating: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function GenerateButton({ isGenerating, disabled, onClick }: GenerateButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isGenerating}
      onClick={onClick}
      className={`w-full py-3 px-6 rounded-xl flex items-center justify-center space-x-2 
        ${
          disabled || isGenerating
            ? 'bg-slate-700 cursor-not-allowed'
            : 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600'
        } transition-all duration-200 ease-in-out`}
    >
      <Send className="w-5 h-5" />
      <span>{isGenerating ? 'Creating Magic...' : 'Generate Image'}</span>
    </button>
  );
}
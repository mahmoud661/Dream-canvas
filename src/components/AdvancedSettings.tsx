import React from 'react';
import { Settings2, RefreshCw } from 'lucide-react';

interface AdvancedSettingsProps {
  steps: number;
  guidance: number;
  seed?: number;
  onStepsChange: (steps: number) => void;
  onGuidanceChange: (guidance: number) => void;
  onRegenerate?: () => void;
}

export function AdvancedSettings({
  steps,
  guidance,
  seed,
  onStepsChange,
  onGuidanceChange,
  onRegenerate
}: AdvancedSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings2 className="w-5 h-5 text-cyan-400" />
        <h3 className="text-sm font-medium text-gray-300">Advanced Settings</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="flex justify-between text-sm text-gray-300 mb-2">
            Inference Steps: <span className="text-cyan-400">{steps}</span>
          </label>
          <input
            type="range"
            min="20"
            max="50"
            value={steps}
            onChange={(e) => onStepsChange(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Faster</span>
            <span>Better Quality</span>
          </div>
        </div>

        <div>
          <label className="flex justify-between text-sm text-gray-300 mb-2">
            Guidance Scale: <span className="text-cyan-400">{guidance}</span>
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="0.5"
            value={guidance}
            onChange={(e) => onGuidanceChange(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Creative</span>
            <span>Precise</span>
          </div>
        </div>

        {seed && onRegenerate && (
          <div className="pt-2">
            <button
              onClick={onRegenerate}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate with Same Seed ({seed})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
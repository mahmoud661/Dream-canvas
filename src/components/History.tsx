import React from 'react';
import { History as HistoryIcon, Trash2, Download } from 'lucide-react';
import { HistoryItem } from '../types/image';

interface HistoryProps {
  items: HistoryItem[];
  onClear: () => void;
}

export function History({ items, onClear }: HistoryProps) {
  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };

  return (
    <div className="bg-slate-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <HistoryIcon className="w-5 h-5 mr-2 text-cyan-400" />
          <h2 className="text-lg font-semibold">History</h2>
        </div>
        {items.length > 0 && (
          <button
            onClick={onClear}
            className="text-gray-400 hover:text-red-400 transition-colors"
            title="Clear history"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">No generations yet</p>
        ) : (
          items.map(item => (
            <div
              key={item.id}
              className="bg-slate-700 bg-opacity-50 rounded-lg p-3"
            >
              <p className="text-gray-300 line-clamp-2 text-sm">{item.prompt}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-400 text-xs">
                  {item.timestamp.toLocaleTimeString()}
                </p>
                {item.imageUrl && (
                  <button
                    onClick={() => handleDownload(item.imageUrl!)}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    title="Download image"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
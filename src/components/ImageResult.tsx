import React from 'react';
import { ImageIcon, AlertCircle, Download, Share2, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageResultProps {
  imageUrl: string;
  isGenerating: boolean;
  error?: {
    message: string;
    code?: string;
    statusCode?: number;
  } | null;
  onErrorDismiss?: () => void;
}

export function ImageResult({ imageUrl, isGenerating, error, onErrorDismiss }: ImageResultProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My AI Generated Image',
          text: 'Check out this AI-generated image!',
          url: imageUrl
        });
      } else {
        await navigator.clipboard.writeText(imageUrl);
        alert('Image URL copied to clipboard!');
      }
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <div className="mt-6">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200"
          >
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">{error.message}</p>
                {error.code && (
                  <p className="text-sm mt-1 text-red-300">
                    Error code: {error.code}
                    {error.statusCode && ` (${error.statusCode})`}
                  </p>
                )}
              </div>
              {onErrorDismiss && (
                <button
                  onClick={onErrorDismiss}
                  className="ml-4 text-red-300 hover:text-red-100"
                >
                  Dismiss
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="border-2 border-dashed border-slate-700 rounded-xl p-8">
        <AnimatePresence mode="wait">
          {imageUrl ? (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <motion.img 
                src={imageUrl} 
                alt="Generated artwork" 
                className="w-full h-auto rounded-lg shadow-xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center gap-4"
              >
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 text-center"
            >
              {isGenerating ? (
                <div className="flex flex-col items-center space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader className="w-8 h-8" />
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Bringing your vision to life...
                  </motion.div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <ImageIcon className="w-12 h-12" />
                  <p>Your masterpiece will appear here</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
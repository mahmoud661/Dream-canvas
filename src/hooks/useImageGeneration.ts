import { useState } from 'react';
import { aiService } from '../services/ai.service';
import { GenerationRequest, HistoryItem } from '../types/image';

export function useImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [error, setError] = useState<{
    message: string;
    code?: string;
    statusCode?: number;
  } | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastSeed, setLastSeed] = useState<number | undefined>();

  const generateImage = async (request: GenerationRequest) => {
    try {
      setIsGenerating(true);
      setError(null);

      const response = await aiService.generateImage(request);

      if (response.status === 'success') {
        setGeneratedImage(response.imageUrl);
        setLastSeed(response.seed);
        
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          prompt: request.prompt,
          timestamp: new Date(),
          imageUrl: response.imageUrl
        };
        setHistory(prev => [newHistoryItem, ...prev]);
      } else {
        setError({
          message: response.message || 'Failed to generate image',
          code: response.code,
          statusCode: response.statusCode
        });
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'An unexpected error occurred'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateWithSeed = () => {
    if (lastSeed && history.length > 0) {
      const lastGeneration = history[0];
      generateImage({
        prompt: lastGeneration.prompt,
        size: '1024x1024', // Default size
        style: 'realistic', // Default style
        seed: lastSeed
      });
    }
  };

  const clearHistory = () => setHistory([]);
  const clearError = () => setError(null);

  return {
    isGenerating,
    generatedImage,
    error,
    history,
    lastSeed,
    generateImage,
    regenerateWithSeed,
    clearHistory,
    clearError
  };
}
import { fal } from '@fal-ai/client';
import { GenerationRequest, GenerationResponse } from '../types/image';

class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

class AIService {
  private readonly API_KEY = import.meta.env.VITE_AI_API_KEY;

  constructor() {
    fal.config({
      credentials: this.API_KEY
    });
  }

  private validateApiKey(): void {
    if (!this.API_KEY) {
      throw new APIError('API key is missing. Please check your environment variables.');
    }
  }

  private validateRequest(request: GenerationRequest): void {
    if (!request.prompt.trim()) {
      throw new APIError('Prompt cannot be empty');
    }
  }

  private getImageSize(size: string): { width: number; height: number } {
    const [width, height] = size.split('x').map(Number);
    return { width, height };
  }

  async generateImage(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      this.validateApiKey();
      this.validateRequest(request);

      const imageSize = this.getImageSize(request.size);
      
      const result = await fal.subscribe('fal-ai/flux/dev', {
        input: {
          prompt: `${request.prompt} Style: ${request.style}`,
          image_size: imageSize,
          num_inference_steps: request.steps || 28,
          guidance_scale: request.guidance || 3.5,
          num_images: 1,
          enable_safety_checker: true,
          seed: request.seed
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === 'IN_PROGRESS') {
            console.log(update.logs.map((log) => log.message));
          }
        },
      });

      if (!result.data?.images?.[0]?.url) {
        throw new APIError('Failed to generate image');
      }

      return {
        imageUrl: result.data.images[0].url,
        status: 'success',
        seed: result.data.seed
      };
    } catch (error) {
      if (error instanceof APIError) {
        return {
          imageUrl: '',
          status: 'error',
          message: error.message,
          code: error.code,
          statusCode: error.status
        };
      }

      return {
        imageUrl: '',
        status: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  }
}

export const aiService = new AIService();
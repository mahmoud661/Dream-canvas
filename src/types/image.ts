export interface GenerationRequest {
  prompt: string;
  size: string;
  style: string;
  steps?: number;
  guidance?: number;
  seed?: number;
}

export interface HistoryItem {
  id: string;
  prompt: string;
  timestamp: Date;
  imageUrl?: string;
}

export interface StyleOption {
  id: string;
  name: string;
}

export interface GenerationResponse {
  imageUrl: string;
  status: 'success' | 'error';
  message?: string;
  code?: string;
  statusCode?: number;
  seed?: number;
}
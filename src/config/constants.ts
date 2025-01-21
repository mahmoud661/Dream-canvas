export const STYLES = [
  { id: 'realistic', name: 'Realistic' },
  { id: 'artistic', name: 'Artistic' },
  { id: 'anime', name: 'Anime' },
  { id: 'digital-art', name: 'Digital Art' },
  { id: 'photography', name: 'Photography' },
  { id: 'oil-painting', name: 'Oil Painting' },
  { id: 'watercolor', name: 'Watercolor' },
  { id: 'sketch', name: 'Sketch' },
  { id: '3d-render', name: '3D Render' },
  { id: 'pixel-art', name: 'Pixel Art' }
] as const;

export const SIZES = [
  '512x512',
  '1024x1024',
  '1024x1792',
  '1792x1024'
] as const;

export const PRESETS = [
  {
    name: 'High Quality',
    steps: 40,
    guidance: 7.5
  },
  {
    name: 'Balanced',
    steps: 28,
    guidance: 3.5
  },
  {
    name: 'Fast',
    steps: 20,
    guidance: 3.0
  },
  {
    name: 'Creative',
    steps: 30,
    guidance: 2.0
  },
  {
    name: 'Precise',
    steps: 35,
    guidance: 10.0
  }
] as const;
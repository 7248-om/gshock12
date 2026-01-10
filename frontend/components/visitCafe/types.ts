
export type LocationState = 'ENTRANCE' | 'CENTER' | 'COUNTER' | 'ART_WALL' | 'WORKSHOP_AREA';

// Fixed: Added NavigationState to match usage in components
export type NavigationState = 'home' | 'menu' | 'art' | 'workshops';

export interface PointOfInterest {
  id: string;
  label: string;
  description?: string;
  path: string;
  position: [number, number, number];
}

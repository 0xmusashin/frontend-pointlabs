// TypeScript interfaces for the scroll-synced chain animation system

export interface LinkTransform {
  x: number;
  y: number;
  rotation: number;
  rotateY: number;
  rotateX: number;
  scale: number;
  opacity: number;
  z: number;
}

export interface ChainPhase {
  name: string;
  progressRange: [number, number];
  linkTransform: (
    linkIndex: number,
    linkCount: number,
    progress: number,
    localProgress: number
  ) => LinkTransform;
}

export interface ChainLayerConfig {
  id: string;
  yPosition: number; // 0-100 (% of viewport)
  scale: number; // Base scale
  opacity: number; // Base opacity (constant)
  blurAmount: number; // Depth blur in px
  linkCount: number; // Number of links in this chain
  direction: 1 | -1; // Movement direction (1 = left-to-right, -1 = right-to-left)
  rotationBias: number; // Layer z-rotation tilt
  // Horizontal movement params
  moveDistance: number; // Total pixels to move horizontally
  // Twist animation params
  twistAmount: number; // Total degrees to twist (e.g., 360 for full rotation)
  twistPhaseSpread: number; // Degrees of phase spread across chain links
  // Spacing
  linkSpacing: number; // Fixed spacing between links in pixels
}

export interface ChainTransformResult {
  chainX: number; // Horizontal position of entire chain
  twistBase: number; // Base twist angle for the chain
}

export interface ScrollProgressResult {
  progress: number;
  velocity: number;
  direction: 1 | -1;
}

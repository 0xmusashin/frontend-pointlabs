// Animation configuration for scroll-synced chains with horizontal movement and twist

import type { ChainLayerConfig, ChainTransformResult, LinkTransform } from "./types";

// Default transform for initialization
export const DEFAULT_TRANSFORM: LinkTransform = {
  x: 0,
  y: 0,
  rotation: 0,
  rotateY: 0,
  rotateX: 0,
  scale: 1,
  opacity: 1,
  z: 0,
};

// Layer configurations with horizontal movement and twist params
export const CHAIN_LAYERS: ChainLayerConfig[] = [
  {
    id: "foreground",
    yPosition: 50,
    scale: 1.0,
    opacity: 0.9,
    blurAmount: 0,
    linkCount: 9,
    direction: -1, // Moves right to left
    rotationBias: 0,
    moveDistance: 600,
    twistAmount: 360, // Full rotation
    twistPhaseSpread: 45, // 45° spread across chain
    linkSpacing: 140,
  },
  {
    id: "mid-upper",
    yPosition: 25,
    scale: 0.7,
    opacity: 0.5,
    blurAmount: 1.5,
    linkCount: 11,
    direction: 1, // Moves left to right
    rotationBias: 5,
    moveDistance: 450,
    twistAmount: 270,
    twistPhaseSpread: 40,
    linkSpacing: 140,
  },
  {
    id: "mid-lower",
    yPosition: 75,
    scale: 0.65,
    opacity: 0.45,
    blurAmount: 2,
    linkCount: 11,
    direction: -1,
    rotationBias: -5,
    moveDistance: 500,
    twistAmount: 300,
    twistPhaseSpread: 50,
    linkSpacing: 140,
  },
  {
    id: "back-upper",
    yPosition: 12,
    scale: 0.45,
    opacity: 0.25,
    blurAmount: 3,
    linkCount: 14,
    direction: 1,
    rotationBias: 8,
    moveDistance: 300,
    twistAmount: 180,
    twistPhaseSpread: 30,
    linkSpacing: 140,
  },
  {
    id: "back-lower",
    yPosition: 88,
    scale: 0.4,
    opacity: 0.2,
    blurAmount: 4,
    linkCount: 14,
    direction: -1,
    rotationBias: -6,
    moveDistance: 250,
    twistAmount: 200,
    twistPhaseSpread: 35,
    linkSpacing: 140,
  },
];

/**
 * Calculate chain-level transform based on scroll progress.
 * Returns horizontal position and base twist angle for the entire chain.
 */
export function getChainTransform(
  progress: number,
  layer: ChainLayerConfig
): ChainTransformResult {
  // Chain moves horizontally based on scroll
  // Start position: centered, then move by moveDistance * direction
  const chainX = progress * layer.moveDistance * layer.direction;

  // Base twist angle (links will offset from this)
  const twistBase = progress * layer.twistAmount;

  return { chainX, twistBase };
}

/**
 * Calculate twist angle for individual link.
 * Each link has a phase offset to create wave effect through the chain.
 */
export function getLinkTwist(
  linkIndex: number,
  linkCount: number,
  twistBase: number,
  phaseSpread: number
): number {
  // Per-link phase offset creates wave/ripple effect
  const normalizedIndex = linkIndex / Math.max(1, linkCount - 1);
  const phaseOffset = normalizedIndex * phaseSpread;
  return twistBase + phaseOffset;
}

/**
 * Calculate fixed position for a link within the chain.
 * Links maintain constant spacing - they move together as a unit.
 */
export function getLinkPosition(
  linkIndex: number,
  linkCount: number,
  linkSpacing: number
): number {
  // Center the chain: offset from center based on link index
  const centerIndex = (linkCount - 1) / 2;
  const offsetFromCenter = linkIndex - centerIndex;
  return offsetFromCenter * linkSpacing;
}

// Backward compatibility exports
export const CHAIN_PHASES: never[] = [];

export const getTransformForProgress = (
  linkIndex: number,
  linkCount: number,
  progress: number
): LinkTransform => {
  const layer = CHAIN_LAYERS[0];
  const { chainX, twistBase } = getChainTransform(progress, layer);
  const twistAngle = getLinkTwist(linkIndex, linkCount, twistBase, layer.twistPhaseSpread);
  const linkX = getLinkPosition(linkIndex, linkCount, layer.linkSpacing);

  return {
    x: linkX + chainX,
    y: 0,
    rotation: 0,
    rotateY: 0,
    rotateX: twistAngle,
    scale: 1,
    opacity: 1,
    z: 0,
  };
};

export const getRotationTransform = getTransformForProgress;

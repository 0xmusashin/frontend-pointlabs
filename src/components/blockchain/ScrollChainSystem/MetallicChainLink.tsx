"use client";

import { memo, useMemo } from "react";

interface MetallicChainLinkProps {
  /** Unique ID for SVG gradients */
  id: string;
  /** Scale multiplier */
  scale?: number;
  /** Twist angle in degrees for dynamic lighting (0-360) */
  twistAngle?: number;
}

/**
 * Enhanced metallic chain link with dynamic lighting based on twist angle.
 * Simulates light coming from above - brightens when facing up, darkens when facing down.
 */
export const MetallicChainLink = memo(function MetallicChainLink({
  id,
  scale = 1,
  twistAngle = 0,
}: MetallicChainLinkProps) {
  const width = 160 * scale;
  const height = 72 * scale;
  const strokeWidth = 2.5 * scale;
  const innerStroke = 1.5 * scale;
  const rx = 24 * scale;
  const innerRx = 16 * scale;

  // Calculate lighting based on twist angle
  // Light source is from above (top of screen)
  // When facing up (0°): brightest
  // When at side (90°, 270°): medium
  // When facing down (180°): darkest
  const lighting = useMemo(() => {
    const normalizedAngle = ((twistAngle % 360) + 360) % 360;
    const radians = (normalizedAngle * Math.PI) / 180;

    // cos(0) = 1 (facing up, bright)
    // cos(90) = 0 (side)
    // cos(180) = -1 (facing down, dark)
    const lightFactor = Math.cos(radians);

    // Map light factor to color values
    // Base metal color: rgb(70, 70, 75)
    // Range: 40-100 for dark to bright
    const baseValue = 70;
    const range = 30;
    const metalBrightness = Math.round(baseValue + lightFactor * range);

    // Highlight intensity: 0.05 to 0.25
    const highlightIntensity = 0.15 + lightFactor * 0.1;

    // Shadow intensity: 0.1 to 0.3
    const shadowIntensity = 0.2 - lightFactor * 0.1;

    // Gradient rotation follows the twist
    const gradientRotation = normalizedAngle * 0.3;

    return {
      metalBrightness,
      highlightIntensity,
      shadowIntensity,
      gradientRotation,
      lightFactor,
    };
  }, [twistAngle]);

  const { metalBrightness, highlightIntensity, shadowIntensity, gradientRotation, lightFactor } =
    lighting;

  // Dynamic metal colors based on lighting
  const metalDark = Math.max(30, metalBrightness - 25);
  const metalMid = metalBrightness;
  const metalLight = Math.min(130, metalBrightness + 25);
  const metalHighlight = Math.min(150, metalBrightness + 40);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className="chain-link-metallic"
      style={{ willChange: "transform" }}
    >
      <defs>
        {/* Primary metallic gradient - rotates with twist */}
        <linearGradient
          id={`metal-base-${id}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientTransform={`rotate(${gradientRotation}, 0.5, 0.5)`}
        >
          <stop offset="0%" stopColor={`rgb(${metalDark}, ${metalDark}, ${metalDark + 5})`} />
          <stop offset="25%" stopColor={`rgb(${metalMid}, ${metalMid}, ${metalMid + 5})`} />
          <stop offset="50%" stopColor={`rgb(${metalLight}, ${metalLight}, ${metalLight + 5})`} />
          <stop offset="75%" stopColor={`rgb(${metalMid}, ${metalMid}, ${metalMid + 5})`} />
          <stop offset="100%" stopColor={`rgb(${metalDark}, ${metalDark}, ${metalDark + 5})`} />
        </linearGradient>

        {/* Specular highlight - intensity varies with angle */}
        <linearGradient id={`specular-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={`rgba(255, 255, 255, ${highlightIntensity})`} />
          <stop offset="40%" stopColor={`rgba(255, 255, 255, ${highlightIntensity * 0.3})`} />
          <stop offset="60%" stopColor={`rgba(0, 0, 0, ${shadowIntensity * 0.5})`} />
          <stop offset="100%" stopColor={`rgba(0, 0, 0, ${shadowIntensity})`} />
        </linearGradient>

        {/* Edge highlight for 3D effect */}
        <linearGradient id={`edge-highlight-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={`rgba(255, 255, 255, ${highlightIntensity * 1.5})`} />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>

        {/* Soft glow filter */}
        <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={2 * scale} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Drop shadow - stronger when link faces up */}
      <rect
        x={strokeWidth}
        y={strokeWidth + 3 * scale}
        width={width - strokeWidth * 2}
        height={height - strokeWidth * 2}
        rx={rx}
        fill={`rgba(0, 0, 0, ${0.15 + lightFactor * 0.1})`}
        style={{ filter: `blur(${4 * scale}px)` }}
      />

      {/* Main outer shape - metallic body */}
      <rect
        x={strokeWidth}
        y={strokeWidth}
        width={width - strokeWidth * 2}
        height={height - strokeWidth * 2}
        rx={rx}
        fill={`url(#metal-base-${id})`}
        stroke={`rgba(255, 255, 255, ${0.05 + lightFactor * 0.05})`}
        strokeWidth={strokeWidth * 0.5}
      />

      {/* Specular overlay */}
      <rect
        x={strokeWidth}
        y={strokeWidth}
        width={width - strokeWidth * 2}
        height={height - strokeWidth * 2}
        rx={rx}
        fill={`url(#specular-${id})`}
      />

      {/* Inner cutout - the chain hole */}
      <rect
        x={strokeWidth * 5}
        y={strokeWidth * 5}
        width={width - strokeWidth * 10}
        height={height - strokeWidth * 10}
        rx={innerRx}
        fill={`rgba(5, 5, 8, ${0.9 + lightFactor * 0.05})`}
        stroke={`rgba(0, 0, 0, ${0.5 + lightFactor * 0.2})`}
        strokeWidth={innerStroke}
      />

      {/* Inner cutout rim highlight */}
      <rect
        x={strokeWidth * 5 + innerStroke}
        y={strokeWidth * 5 + innerStroke}
        width={width - strokeWidth * 10 - innerStroke * 2}
        height={(height - strokeWidth * 10 - innerStroke * 2) * 0.4}
        rx={innerRx - innerStroke}
        fill={`url(#edge-highlight-${id})`}
        opacity={0.3}
      />

      {/* Top bevel highlight - strongest when facing up */}
      <path
        d={`M ${rx + strokeWidth} ${strokeWidth + 2 * scale}
            L ${width - rx - strokeWidth} ${strokeWidth + 2 * scale}`}
        fill="none"
        stroke={`rgba(255, 255, 255, ${highlightIntensity * 1.2})`}
        strokeWidth={innerStroke}
        strokeLinecap="round"
      />

      {/* Bottom edge shadow */}
      <path
        d={`M ${rx + strokeWidth} ${height - strokeWidth - 2 * scale}
            L ${width - rx - strokeWidth} ${height - strokeWidth - 2 * scale}`}
        fill="none"
        stroke={`rgba(0, 0, 0, ${shadowIntensity * 0.8})`}
        strokeWidth={innerStroke * 0.8}
        strokeLinecap="round"
      />

      {/* Left connector nub */}
      <rect
        x={0}
        y={height / 2 - 6 * scale}
        width={strokeWidth * 2.5}
        height={12 * scale}
        rx={2 * scale}
        fill={`rgb(${metalMid - 10}, ${metalMid - 10}, ${metalMid - 5})`}
        stroke={`rgba(255, 255, 255, ${highlightIntensity * 0.5})`}
        strokeWidth={0.5 * scale}
      />

      {/* Right connector nub */}
      <rect
        x={width - strokeWidth * 2.5}
        y={height / 2 - 6 * scale}
        width={strokeWidth * 2.5}
        height={12 * scale}
        rx={2 * scale}
        fill={`rgb(${metalMid - 10}, ${metalMid - 10}, ${metalMid - 5})`}
        stroke={`rgba(255, 255, 255, ${highlightIntensity * 0.5})`}
        strokeWidth={0.5 * scale}
      />

      {/* Subtle green accent in center - follows lighting */}
      <ellipse
        cx={width / 2}
        cy={height / 2}
        rx={width * 0.15}
        ry={height * 0.1}
        fill={`rgba(34, 197, 94, ${0.05 + lightFactor * 0.05})`}
        filter={`url(#glow-${id})`}
      />
    </svg>
  );
});

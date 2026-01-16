"use client";

import { memo } from "react";

interface ChainConnectorProps {
  /** Unique ID for SVG elements */
  id: string;
  /** Scale multiplier */
  scale?: number;
  /** Glow intensity (0-1) */
  glowIntensity?: number;
}

/**
 * Diamond-shaped connector between chain links.
 * Creates visual continuity between links.
 */
export const ChainConnector = memo(function ChainConnector({
  id,
  scale = 1,
  glowIntensity = 0,
}: ChainConnectorProps) {
  const size = 32 * scale;
  const strokeWidth = 1.5 * scale;

  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
        margin: `0 ${-4 * scale}px`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        className="chain-connector"
      >
        <defs>
          <linearGradient
            id={`connector-gradient-${id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(70, 70, 75, 1)" />
            <stop offset="50%" stopColor="rgba(90, 90, 95, 1)" />
            <stop offset="100%" stopColor="rgba(60, 60, 65, 1)" />
          </linearGradient>
        </defs>

        {/* Outer diamond */}
        <rect
          x={size / 2}
          y={size * 0.2}
          width={size * 0.42}
          height={size * 0.42}
          rx={3 * scale}
          transform={`rotate(45 ${size / 2} ${size / 2})`}
          fill={`url(#connector-gradient-${id})`}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />

        {/* Inner diamond cutout */}
        <rect
          x={size / 2}
          y={size * 0.3}
          width={size * 0.28}
          height={size * 0.28}
          rx={2 * scale}
          transform={`rotate(45 ${size / 2} ${size / 2})`}
          fill="rgba(10, 10, 12, 0.9)"
          stroke="rgba(0, 0, 0, 0.5)"
          strokeWidth={strokeWidth * 0.6}
        />

        {/* Center dot */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={2.5 * scale}
          fill={`rgba(34, 197, 94, ${0.3 + glowIntensity * 0.5})`}
        />

        {/* Connection lines */}
        <line
          x1={0}
          y1={size / 2}
          x2={size * 0.15}
          y2={size / 2}
          stroke="rgba(80, 80, 85, 0.8)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <line
          x1={size * 0.85}
          y1={size / 2}
          x2={size}
          y2={size / 2}
          stroke="rgba(80, 80, 85, 0.8)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
});

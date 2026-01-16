"use client";

import { useScroll, useSpring, useMotionValueEvent, motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";

const LINK_COUNT = 12;

interface LinkState {
  x: number;
  y: number;
  rotation: number;
  rotateY: number;
  opacity: number;
  scale: number;
}

// Interpolate between values
function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

// Smooth step for easing
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Calculate all link states based on scroll progress
function calculateLinkStates(progress: number): LinkState[] {
  const width = typeof window !== "undefined" ? window.innerWidth : 1200;
  const height = typeof window !== "undefined" ? window.innerHeight : 800;

  const states: LinkState[] = [];

  for (let i = 0; i < LINK_COUNT; i++) {
    const linkProgress = i / (LINK_COUNT - 1);

    // Phase transitions
    const assemblyProgress = smoothstep(0, 0.3, progress);
    const flowProgress = smoothstep(0.3, 0.7, progress);
    const expandProgress = smoothstep(0.7, 1, progress);

    // Scattered positions (initial)
    const angle = (i / LINK_COUNT) * Math.PI * 2;
    const scatterRadius = Math.min(width, height) * 0.3;
    const scatteredX = Math.cos(angle) * scatterRadius + width / 2;
    const scatteredY = Math.sin(angle) * scatterRadius + height / 2;

    // Chain positions (assembled)
    const chainStartX = width * 0.1;
    const linkSpacing = Math.min(55, width / LINK_COUNT);
    const waveAmplitude = 35;
    const chainX = chainStartX + i * linkSpacing;
    const chainY = height / 2 + Math.sin(linkProgress * Math.PI * 2) * waveAmplitude;

    // Flowing positions
    const flowingX = chainX + flowProgress * width * 0.4;
    const flowingY = chainY + flowProgress * height * 0.15;

    // Expanded positions
    const expandAngle = (linkProgress - 0.5) * Math.PI * 0.7;
    const expandRadius = Math.min(width * 0.4, 400);
    const expandedX = width / 2 + Math.cos(expandAngle) * expandRadius;
    const expandedY = height * 0.65 + Math.sin(expandAngle) * 50;

    // Calculate position based on phase
    let x: number, y: number;

    if (progress < 0.3) {
      x = lerp(scatteredX, chainX, assemblyProgress);
      y = lerp(scatteredY, chainY, assemblyProgress);
    } else if (progress < 0.7) {
      x = lerp(chainX, flowingX, flowProgress);
      y = lerp(chainY, flowingY, flowProgress);
    } else {
      x = lerp(flowingX, expandedX, expandProgress);
      y = lerp(flowingY, expandedY, expandProgress);
    }

    // Rotation
    const scatteredRotation = (i * 30) % 360;
    const chainRotation = i % 2 === 0 ? 0 : 180;
    const rotation = lerp(scatteredRotation, chainRotation, assemblyProgress);

    // 3D Y rotation (oscillates)
    const rotateY = Math.sin(progress * Math.PI * 2 + i * 0.3) * 40;

    // Opacity
    const fadeIn = smoothstep(i * 0.015, i * 0.015 + 0.08, progress);
    const fadeOut = 1 - smoothstep(0.92, 1, progress);
    const opacity = Math.min(fadeIn, fadeOut);

    // Scale
    const scale = 0.85 + Math.sin(progress * Math.PI * 3 + i * 0.4) * 0.15;

    states.push({
      x: x - 40,
      y: y - 24,
      rotation,
      rotateY,
      opacity,
      scale,
    });
  }

  return states;
}

// 3D Tubular chain link SVG with dynamic rotation-aware lighting
function ChainLinkSVG({ index, rotateY = 0 }: { index: number; rotateY?: number }) {
  const id = `chain-${index}`;

  // Calculate lighting based on rotation (-40 to +40 degrees typical range)
  // facingCamera: 1 when facing camera (rotateY = 0), 0 when edge-on (rotateY = ±40)
  const facingCamera = 1 - Math.min(Math.abs(rotateY) / 40, 1);

  // Dynamic colors based on rotation
  const baseBrightness = Math.round(70 + facingCamera * 50); // 70-120
  const highlightOpacity = (0.15 + facingCamera * 0.25).toFixed(2); // 0.15-0.40
  const shadowOpacity = (0.2 + facingCamera * 0.3).toFixed(2); // 0.2-0.5

  // Gradient rotation follows the Y rotation for subtle lighting shift
  const gradientAngle = rotateY * 0.5;

  // Color values
  const darkColor = `rgb(${baseBrightness - 40}, ${baseBrightness - 40}, ${baseBrightness - 35})`;
  const midColor = `rgb(${baseBrightness - 20}, ${baseBrightness - 20}, ${baseBrightness - 15})`;
  const brightColor = `rgb(${baseBrightness}, ${baseBrightness}, ${baseBrightness + 5})`;

  return (
    <svg width="80" height="48" viewBox="0 0 100 60" className="chain-link">
      <defs>
        {/* Tubular gradient with dynamic rotation and brightness */}
        <linearGradient
          id={`tube-${id}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientTransform={`rotate(${gradientAngle}, 0.5, 0.5)`}
        >
          <stop offset="0%" stopColor={darkColor} />
          <stop offset="25%" stopColor={midColor} />
          <stop offset="50%" stopColor={brightColor} />
          <stop offset="75%" stopColor={midColor} />
          <stop offset="100%" stopColor={darkColor} />
        </linearGradient>
      </defs>

      {/* Drop shadow - stronger when facing camera */}
      <ellipse
        cx="50"
        cy="33"
        rx="32"
        ry="20"
        fill={`rgba(0,0,0,${shadowOpacity})`}
        style={{ filter: "blur(3px)" }}
      />

      {/* Main tube - thick stroke with gradient */}
      <ellipse
        cx="50"
        cy="30"
        rx="30"
        ry="18"
        fill="none"
        stroke={`url(#tube-${id})`}
        strokeWidth="14"
      />

      {/* Outer dark edge */}
      <ellipse
        cx="50"
        cy="30"
        rx="37"
        ry="25"
        fill="none"
        stroke={`rgba(0,0,0,${(0.2 + facingCamera * 0.15).toFixed(2)})`}
        strokeWidth="1"
      />

      {/* Inner bright rim - visibility varies with rotation */}
      <ellipse
        cx="50"
        cy="30"
        rx="23"
        ry="11"
        fill="none"
        stroke={`rgba(255,255,255,${(0.05 + facingCamera * 0.15).toFixed(2)})`}
        strokeWidth="1"
      />

      {/* Top highlight reflection - opacity varies */}
      <path
        d="M25,18 Q50,10 75,18"
        fill="none"
        stroke={`rgba(255,255,255,${highlightOpacity})`}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Secondary highlight */}
      <path
        d="M30,22 Q50,16 70,22"
        fill="none"
        stroke={`rgba(255,255,255,${(parseFloat(highlightOpacity) * 0.5).toFixed(2)})`}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BlockchainChain() {
  const { scrollYProgress } = useScroll();
  const [hasMounted, setHasMounted] = useState(false);
  const [linkStates, setLinkStates] = useState<LinkState[]>([]);

  // Initialize after mount to avoid hydration mismatch
  useEffect(() => {
    setHasMounted(true);
    setLinkStates(calculateLinkStates(0));
  }, []);

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Update link states on scroll
  useMotionValueEvent(smoothProgress, "change", useCallback((latest: number) => {
    setLinkStates(calculateLinkStates(latest));
  }, []));

  // Container opacity based on scroll
  const containerOpacity = smoothstep(0, 0.05, smoothProgress.get()) *
    (1 - smoothstep(0.92, 1, smoothProgress.get()));

  // Don't render until mounted to avoid hydration mismatch
  if (!hasMounted) {
    return null;
  }

  return (
    <div
      className="chain-container fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: Math.max(0, containerOpacity) * 0.6 }}
    >
      <div
        className="absolute inset-0"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {linkStates.map((state, index) => (
          <motion.div
            key={index}
            className="chain-link-wrapper absolute"
            style={{
              x: state.x,
              y: state.y,
              rotate: state.rotation,
              rotateY: state.rotateY,
              opacity: state.opacity,
              scale: state.scale,
              transformStyle: "preserve-3d",
            }}
          >
            <ChainLinkSVG index={index} rotateY={state.rotateY} />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-60 pointer-events-none" />
    </div>
  );
}

// Simplified lite version
export function BlockchainChainLite() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg width="500" height="80" viewBox="0 0 500 80">
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 80}, 10)`}>
              <path
                d="M15,30 C15,12 30,5 50,5 C70,5 85,12 85,30 C85,48 70,55 50,55 C30,55 15,48 15,30"
                fill="none"
                className="stroke-foreground-muted"
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

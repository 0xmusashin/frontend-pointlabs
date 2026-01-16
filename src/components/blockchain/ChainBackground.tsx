"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";

// Detailed chain link SVG with enhanced visual elements
function DetailedChainLink({ scale = 1, glowIntensity = 0.1 }: { scale?: number; glowIntensity?: number }) {
  const width = 300 * scale;
  const height = 130 * scale;
  const strokeOuter = 2.5 * scale;
  const strokeInner = 1.5 * scale;
  const rx = 28 * scale;
  const innerRx = 20 * scale;
  const rivetRadius = 4 * scale;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className="chain-link-detailed"
    >
      {/* SVG Filters for glow effect */}
      <defs>
        <filter id={`glow-${scale}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={4 * scale} result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`stroke-gradient-${scale}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
        </linearGradient>
      </defs>

      {/* Outer frame - main chain link shape */}
      <rect
        x={strokeOuter}
        y={strokeOuter}
        width={width - strokeOuter * 2}
        height={height - strokeOuter * 2}
        rx={rx}
        ry={rx}
        fill="none"
        stroke={`url(#stroke-gradient-${scale})`}
        strokeWidth={strokeOuter}
        filter={glowIntensity > 0 ? `url(#glow-${scale})` : undefined}
      />

      {/* Inner frame for depth */}
      <rect
        x={strokeOuter * 4}
        y={strokeOuter * 4}
        width={width - strokeOuter * 8}
        height={height - strokeOuter * 8}
        rx={innerRx}
        ry={innerRx}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={strokeInner}
      />

      {/* Corner rivets - top left */}
      <circle
        cx={rx + strokeOuter}
        cy={rx + strokeOuter}
        r={rivetRadius}
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={0.5 * scale}
      />
      {/* Corner rivets - top right */}
      <circle
        cx={width - rx - strokeOuter}
        cy={rx + strokeOuter}
        r={rivetRadius}
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={0.5 * scale}
      />
      {/* Corner rivets - bottom left */}
      <circle
        cx={rx + strokeOuter}
        cy={height - rx - strokeOuter}
        r={rivetRadius}
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={0.5 * scale}
      />
      {/* Corner rivets - bottom right */}
      <circle
        cx={width - rx - strokeOuter}
        cy={height - rx - strokeOuter}
        r={rivetRadius}
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={0.5 * scale}
      />

      {/* Center bar with notches */}
      <line
        x1={rx + strokeOuter * 2}
        y1={height / 2}
        x2={width - rx - strokeOuter * 2}
        y2={height / 2}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeInner}
        strokeDasharray={`${12 * scale} ${8 * scale}`}
      />

      {/* Left connector extension */}
      <line
        x1={0}
        y1={height / 2}
        x2={strokeOuter * 3}
        y2={height / 2}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={strokeOuter}
      />

      {/* Right connector extension */}
      <line
        x1={width - strokeOuter * 3}
        y1={height / 2}
        x2={width}
        y2={height / 2}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={strokeOuter}
      />

      {/* Subtle accent glow on center (green) */}
      <ellipse
        cx={width / 2}
        cy={height / 2}
        rx={width * 0.2}
        ry={height * 0.15}
        fill={`rgba(34, 197, 94, ${glowIntensity * 0.3})`}
        filter={`url(#glow-${scale})`}
      />
    </svg>
  );
}

// Enhanced diamond connector with pulse animation
function DetailedDiamondConnector({ scale = 1, pulse = false }: { scale?: number; pulse?: boolean }) {
  const size = 56 * scale;
  const strokeWidth = 2 * scale;

  return (
    <div className="flex items-center justify-center" style={{ margin: `0 ${-12 * scale}px` }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        className="diamond-connector-detailed"
      >
        {/* Outer diamond */}
        <rect
          x={size / 2}
          y={size * 0.15}
          width={size * 0.5}
          height={size * 0.5}
          rx={4 * scale}
          transform={`rotate(45 ${size / 2} ${size / 2})`}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Inner diamond */}
        <rect
          x={size / 2}
          y={size * 0.25}
          width={size * 0.35}
          height={size * 0.35}
          rx={2 * scale}
          transform={`rotate(45 ${size / 2} ${size / 2})`}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth * 0.6}
        />
        {/* Center dot with optional pulse */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={3 * scale}
          fill="rgba(34, 197, 94, 0.4)"
          className={pulse ? "animate-pulse" : ""}
        />
        {/* Connection lines */}
        <line
          x1={0}
          y1={size / 2}
          x2={size * 0.2}
          y2={size / 2}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth * 0.5}
        />
        <line
          x1={size * 0.8}
          y1={size / 2}
          x2={size}
          y2={size / 2}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth * 0.5}
        />
      </svg>
    </div>
  );
}

// Single chain track with rotation, curves, and 3D effects
interface ChainTrackProps {
  yPosition: string;
  opacity: number;
  scale: number;
  speed: number;
  direction: 1 | -1;
  scrollOffset: number;
  velocityBoost: number;
  rotation?: number; // degrees
  curve?: "none" | "wave" | "arc";
  mouseOffset: { x: number; y: number };
  parallaxStrength: number;
}

function ChainTrack({
  yPosition,
  opacity,
  scale,
  speed,
  direction,
  scrollOffset,
  velocityBoost,
  rotation = 0,
  curve = "none",
  mouseOffset,
  parallaxStrength,
}: ChainTrackProps) {
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const velocityRef = useRef(velocityBoost);

  // Keep velocity ref updated
  useEffect(() => {
    velocityRef.current = velocityBoost;
  }, [velocityBoost]);

  // Calculate how many links we need to fill the screen + buffer
  const linkWidth = 300 * scale;
  const connectorWidth = 32 * scale;
  const unitWidth = linkWidth + connectorWidth;
  const linksNeeded = Math.ceil(3000 / unitWidth) + 3; // Extra buffer for rotated tracks

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Dynamic speed based on scroll velocity
      const dynamicSpeed = speed * (1 + Math.abs(velocityRef.current) * 0.003);

      setOffset((prev) => {
        const newOffset = prev + (dynamicSpeed * delta * 0.001 * direction);
        // Reset when we've moved one full unit
        if (Math.abs(newOffset) >= unitWidth) {
          return newOffset % unitWidth;
        }
        return newOffset;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [speed, direction, unitWidth]);

  const links = useMemo(() => {
    return Array.from({ length: linksNeeded }, (_, i) => i);
  }, [linksNeeded]);

  // Calculate wave/arc Y offset for each link
  const calculateCurveY = (index: number) => {
    const position = offset + index * unitWidth;
    if (curve === "wave") {
      return Math.sin(position * 0.004) * 40;
    }
    if (curve === "arc") {
      const normalized = (index - linksNeeded / 2) / linksNeeded;
      return Math.pow(normalized, 2) * 80;
    }
    return 0;
  };

  // Calculate link rotation based on position
  const calculateLinkRotation = (index: number) => {
    const position = offset + index * unitWidth;
    return Math.sin(position * 0.002) * 8; // subtle Y rotation
  };

  // Calculate Z depth variation
  const calculateZDepth = (index: number) => {
    const position = offset + index * unitWidth;
    return Math.sin(position * 0.003) * 15;
  };

  // Apply mouse parallax
  const mouseX = mouseOffset.x * parallaxStrength;
  const mouseY = mouseOffset.y * parallaxStrength;

  return (
    <div
      className="absolute flex items-center pointer-events-none"
      style={{
        top: yPosition,
        left: "-20%",
        right: "-20%",
        opacity,
        transform: `
          translateY(-50%)
          translateX(${offset + scrollOffset + mouseX}px)
          translateY(${mouseY}px)
          rotate(${rotation}deg)
        `,
        transformOrigin: "center center",
        willChange: "transform",
        perspective: "1000px",
      }}
    >
      <div
        className="flex items-center"
        style={{
          marginLeft: -unitWidth * 2,
          transformStyle: "preserve-3d",
        }}
      >
        {links.map((i) => {
          const curveY = calculateCurveY(i);
          const linkRotation = calculateLinkRotation(i);
          const zDepth = calculateZDepth(i);

          return (
            <div
              key={i}
              className="flex items-center flex-shrink-0"
              style={{
                transform: `
                  translateY(${curveY}px)
                  translateZ(${zDepth}px)
                  rotateY(${linkRotation}deg)
                `,
                transformStyle: "preserve-3d",
              }}
            >
              <DetailedChainLink scale={scale} glowIntensity={opacity * 0.3} />
              <DetailedDiamondConnector scale={scale} pulse={i === Math.floor(linksNeeded / 2)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Main background component with multiple chain tracks
export function ChainBackground() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Increased parallax range for more noticeable effect
  const scrollOffset = useSpring(
    useTransform(scrollY, [0, 2000], [0, 400]),
    { stiffness: 80, damping: 25 }
  );

  // Track scroll velocity for dynamic speed changes
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 30,
  });

  const [scrollValue, setScrollValue] = useState(0);
  const [velocityValue, setVelocityValue] = useState(0);

  // Mouse tracking for parallax
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const smoothMouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(0, { stiffness: 50, damping: 20 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
      smoothMouseX.set((x - 0.5) * 100);
      smoothMouseY.set((y - 0.5) * 60);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [smoothMouseX, smoothMouseY]);

  // Subscribe to motion values
  useEffect(() => {
    const unsubScroll = scrollOffset.on("change", (v) => setScrollValue(v));
    const unsubVelocity = smoothVelocity.on("change", (v) => setVelocityValue(v));
    const unsubMouseX = smoothMouseX.on("change", (x) => {
      setMouseOffset((prev) => ({ ...prev, x }));
    });
    const unsubMouseY = smoothMouseY.on("change", (y) => {
      setMouseOffset((prev) => ({ ...prev, y }));
    });
    return () => {
      unsubScroll();
      unsubVelocity();
      unsubMouseX();
      unsubMouseY();
    };
  }, [scrollOffset, smoothVelocity, smoothMouseX, smoothMouseY]);

  if (!mounted) {
    return <div className="fixed inset-0 pointer-events-none z-0" />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-80" />

      {/* Track 3 - Back (slowest, smallest, most transparent) - angled up */}
      <ChainTrack
        yPosition="40%"
        opacity={0.1}
        scale={0.55}
        speed={10}
        direction={1}
        scrollOffset={scrollValue * 0.3}
        velocityBoost={velocityValue * 0.2}
        rotation={18}
        curve="wave"
        mouseOffset={mouseOffset}
        parallaxStrength={0.2}
      />

      {/* Track 5 - Far back - strong angle */}
      <ChainTrack
        yPosition="80%"
        opacity={0.08}
        scale={0.5}
        speed={8}
        direction={-1}
        scrollOffset={scrollValue * 0.2}
        velocityBoost={velocityValue * 0.15}
        rotation={-22}
        curve="arc"
        mouseOffset={mouseOffset}
        parallaxStrength={0.15}
      />

      {/* Track 2 - Middle upper - slight angle */}
      <ChainTrack
        yPosition="25%"
        opacity={0.18}
        scale={0.7}
        speed={18}
        direction={-1}
        scrollOffset={scrollValue * 0.5}
        velocityBoost={velocityValue * 0.4}
        rotation={10}
        curve="none"
        mouseOffset={mouseOffset}
        parallaxStrength={0.4}
      />

      {/* Track 4 - Lower middle - opposite angle */}
      <ChainTrack
        yPosition="70%"
        opacity={0.14}
        scale={0.65}
        speed={14}
        direction={1}
        scrollOffset={scrollValue * 0.5}
        velocityBoost={velocityValue * 0.35}
        rotation={-8}
        curve="wave"
        mouseOffset={mouseOffset}
        parallaxStrength={0.35}
      />

      {/* Track 1 - Front (fastest, largest, most visible) - gentle wave */}
      <ChainTrack
        yPosition="52%"
        opacity={0.32}
        scale={0.85}
        speed={25}
        direction={1}
        scrollOffset={scrollValue * 1.0}
        velocityBoost={velocityValue * 0.7}
        rotation={-5}
        curve="wave"
        mouseOffset={mouseOffset}
        parallaxStrength={0.8}
      />

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background to-transparent" />

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

// Hero chain with title overlay
export function HeroChain({ title = "Point Labs", subtitle }: { title?: string; subtitle?: string }) {
  return (
    <div className="relative flex items-center justify-center py-32">
      <div className="relative">
        {/* Background glow */}
        <div
          className="absolute inset-0 bg-accent/5 blur-3xl scale-150"
          style={{ borderRadius: "50%" }}
        />

        {/* Main chain link with title */}
        <div className="relative">
          <DetailedChainLink scale={1.2} glowIntensity={0.2} />

          {/* Title overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base md:text-lg text-foreground-secondary mt-3 opacity-90">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Side connectors for context */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full opacity-40">
          <div className="flex items-center">
            <DetailedChainLink scale={0.8} glowIntensity={0.05} />
            <DetailedDiamondConnector scale={0.8} />
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full opacity-40">
          <div className="flex items-center">
            <DetailedDiamondConnector scale={0.8} />
            <DetailedChainLink scale={0.8} glowIntensity={0.05} />
          </div>
        </div>
      </div>
    </div>
  );
}

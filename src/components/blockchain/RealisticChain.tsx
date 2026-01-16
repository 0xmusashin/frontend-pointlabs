"use client";

import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface RealisticChainProps {
  title?: string;
  subtitle?: string;
}

// Chain link SVG matching the screenshot design - thick rounded rectangle with center bar
function ChainLink({
  isCenter = false,
  title,
  subtitle,
  className = "",
}: {
  isCenter?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const width = isCenter ? 320 : 280;
  const height = isCenter ? 140 : 120;
  const strokeWidth = isCenter ? 3 : 2.5;
  const rx = isCenter ? 28 : 24;

  return (
    <div className={`relative ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        className="chain-link-realistic"
      >
        {/* Outer rounded rectangle frame - the main chain link shape */}
        <rect
          x={strokeWidth}
          y={strokeWidth}
          width={width - strokeWidth * 2}
          height={height - strokeWidth * 2}
          rx={rx}
          ry={rx}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-foreground-faint"
        />

        {/* Horizontal center bar - creates the "opening" illusion */}
        <line
          x1={rx + strokeWidth}
          y1={height / 2}
          x2={width - rx - strokeWidth}
          y2={height / 2}
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.75}
          className="text-foreground-faint"
          opacity="0.6"
        />

        {/* Left connector notch */}
        <line
          x1="0"
          y1={height / 2}
          x2={strokeWidth * 2}
          y2={height / 2}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-foreground-faint"
        />

        {/* Right connector notch */}
        <line
          x1={width - strokeWidth * 2}
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-foreground-faint"
        />
      </svg>

      {/* Title overlay for center link */}
      {isCenter && title && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm md:text-base text-foreground-secondary mt-2 opacity-80">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Diamond connector between links - matches screenshot aesthetic
function DiamondConnector({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center mx-[-8px] ${className}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="diamond-connector"
      >
        {/* Diamond shape rotated 45 degrees */}
        <rect
          x="24"
          y="8"
          width="22"
          height="22"
          rx="4"
          transform="rotate(45 24 24)"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-foreground-faint"
        />
        {/* Inner smaller diamond for depth */}
        <rect
          x="24"
          y="14"
          width="14"
          height="14"
          rx="2"
          transform="rotate(45 24 24)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-foreground-faint"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

// Circle connector (alternative)
function CircleConnector({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center mx-[-8px] ${className}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="circle-connector"
      >
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-foreground-faint"
        />
        <circle
          cx="24"
          cy="24"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-foreground-faint"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

export function RealisticChain({ title = "Point Labs", subtitle }: RealisticChainProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Animation values for 3D effect
  const leftLinkX = useTransform(smoothProgress, [0, 0.5], [0, -150]);
  const leftLinkZ = useTransform(smoothProgress, [0, 0.5], [0, -100]);
  const rightLinkX = useTransform(smoothProgress, [0, 0.5], [0, 150]);
  const rightLinkZ = useTransform(smoothProgress, [0, 0.5], [0, -100]);

  const centerScale = useTransform(smoothProgress, [0, 0.4], [1, 1.15]);
  const outerOpacity = useTransform(smoothProgress, [0, 0.4], [0.7, 0.35]);
  const outerScale = useTransform(smoothProgress, [0, 0.4], [0.85, 0.75]);

  // Subtle 3D rotation
  const rotateY = useTransform(smoothProgress, [0, 1], [0, 8]);
  const rotateX = useTransform(smoothProgress, [0, 1], [0, -3]);

  // Far left link animations
  const farLeftX = useTransform(smoothProgress, [0, 0.5], [0, -250]);
  const farLeftOpacity = useTransform(smoothProgress, [0, 0.3], [0.4, 0.15]);
  const farLeftScale = useTransform(smoothProgress, [0, 0.4], [0.7, 0.55]);
  const farLeftZ = useTransform(smoothProgress, [0, 0.5], [0, -200]);

  // Far left connector
  const farLeftConnectorOpacity = useTransform(smoothProgress, [0, 0.3], [0.4, 0.15]);
  const farLeftConnectorX = useTransform(smoothProgress, [0, 0.5], [0, -180]);

  // Far right connector
  const farRightConnectorOpacity = useTransform(smoothProgress, [0, 0.3], [0.4, 0.15]);
  const farRightConnectorX = useTransform(smoothProgress, [0, 0.5], [0, 180]);

  // Far right link animations
  const farRightX = useTransform(smoothProgress, [0, 0.5], [0, 250]);
  const farRightOpacity = useTransform(smoothProgress, [0, 0.3], [0.4, 0.15]);
  const farRightScale = useTransform(smoothProgress, [0, 0.4], [0.7, 0.55]);
  const farRightZ = useTransform(smoothProgress, [0, 0.5], [0, -200]);

  // SSR-safe initial render
  if (!mounted) {
    return (
      <div ref={containerRef} className="min-h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="flex items-center">
            <div className="opacity-70" style={{ transform: "scale(0.85)" }}>
              <ChainLink />
            </div>
            <DiamondConnector className="opacity-70" />
            <ChainLink isCenter title={title} subtitle={subtitle} />
            <DiamondConnector className="opacity-70" />
            <div className="opacity-70" style={{ transform: "scale(0.85)" }}>
              <ChainLink />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="flex items-center"
          style={{
            perspective: "1500px",
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
            rotateY,
            rotateX,
          }}
        >
          {/* Far left chain link (hidden on small screens) */}
          <motion.div
            className="hidden lg:block"
            style={{
              x: farLeftX,
              opacity: farLeftOpacity,
              scale: farLeftScale,
              z: farLeftZ,
            }}
          >
            <ChainLink />
          </motion.div>

          {/* Left diamond connector (hidden on small screens) */}
          <motion.div
            className="hidden lg:block"
            style={{
              opacity: farLeftConnectorOpacity,
              x: farLeftConnectorX,
            }}
          >
            <DiamondConnector />
          </motion.div>

          {/* Left chain link */}
          <motion.div
            style={{
              x: leftLinkX,
              opacity: outerOpacity,
              scale: outerScale,
              z: leftLinkZ,
            }}
          >
            <ChainLink />
          </motion.div>

          {/* Left connector */}
          <motion.div style={{ opacity: outerOpacity }}>
            <DiamondConnector />
          </motion.div>

          {/* Center chain link with title - FRONT AND LARGEST */}
          <motion.div
            style={{
              scale: centerScale,
              zIndex: 10,
            }}
            className="relative z-10"
          >
            <ChainLink isCenter title={title} subtitle={subtitle} />
          </motion.div>

          {/* Right connector */}
          <motion.div style={{ opacity: outerOpacity }}>
            <DiamondConnector />
          </motion.div>

          {/* Right chain link */}
          <motion.div
            style={{
              x: rightLinkX,
              opacity: outerOpacity,
              scale: outerScale,
              z: rightLinkZ,
            }}
          >
            <ChainLink />
          </motion.div>

          {/* Right diamond connector (hidden on small screens) */}
          <motion.div
            className="hidden lg:block"
            style={{
              opacity: farRightConnectorOpacity,
              x: farRightConnectorX,
            }}
          >
            <DiamondConnector />
          </motion.div>

          {/* Far right chain link (hidden on small screens) */}
          <motion.div
            className="hidden lg:block"
            style={{
              x: farRightX,
              opacity: farRightOpacity,
              scale: farRightScale,
              z: farRightZ,
            }}
          >
            <ChainLink />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Static version for non-scrolling contexts
export function RealisticChainStatic({
  title = "Point Labs",
  subtitle
}: RealisticChainProps) {
  return (
    <div className="flex items-center justify-center py-16 overflow-hidden">
      <div className="flex items-center scale-75 md:scale-100">
        <div className="opacity-35 scale-75 hidden md:block">
          <ChainLink />
        </div>
        <DiamondConnector className="opacity-35 hidden md:block" />
        <div className="opacity-60 scale-85">
          <ChainLink />
        </div>
        <DiamondConnector className="opacity-60" />
        <ChainLink isCenter title={title} subtitle={subtitle} />
        <DiamondConnector className="opacity-60" />
        <div className="opacity-60 scale-85">
          <ChainLink />
        </div>
        <DiamondConnector className="opacity-35 hidden md:block" />
        <div className="opacity-35 scale-75 hidden md:block">
          <ChainLink />
        </div>
      </div>
    </div>
  );
}

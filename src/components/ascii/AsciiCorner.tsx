"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CORNER_TOP_LEFT,
  CORNER_TOP_RIGHT,
  CORNER_BOTTOM_LEFT,
  CORNER_BOTTOM_RIGHT,
  CORNER_SIMPLE_TL,
  CORNER_SIMPLE_TR,
  CORNER_SIMPLE_BL,
  CORNER_SIMPLE_BR,
} from "./patterns";

type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const fullCornerPatterns: Record<CornerPosition, string> = {
  "top-left": CORNER_TOP_LEFT,
  "top-right": CORNER_TOP_RIGHT,
  "bottom-left": CORNER_BOTTOM_LEFT,
  "bottom-right": CORNER_BOTTOM_RIGHT,
};

const simpleCornerPatterns: Record<CornerPosition, string> = {
  "top-left": CORNER_SIMPLE_TL,
  "top-right": CORNER_SIMPLE_TR,
  "bottom-left": CORNER_SIMPLE_BL,
  "bottom-right": CORNER_SIMPLE_BR,
};

const positionClasses: Record<CornerPosition, string> = {
  "top-left": "top-2 left-2 sm:top-4 sm:left-4 md:top-8 md:left-8",
  "top-right": "top-2 right-2 sm:top-4 sm:right-4 md:top-8 md:right-8",
  "bottom-left": "bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-8 md:left-8",
  "bottom-right": "bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-8 md:right-8",
};

interface AsciiCornerProps {
  position: CornerPosition;
  variant?: "full" | "simple";
  className?: string;
  opacity?: number;
  animate?: boolean;
  delay?: number;
}

export function AsciiCorner({
  position,
  variant = "full",
  className,
  opacity = 0.35,
  animate = true,
  delay = 0,
}: AsciiCornerProps) {
  const prefersReducedMotion = useReducedMotion();
  const patterns = variant === "full" ? fullCornerPatterns : simpleCornerPatterns;
  const pattern = patterns[position];

  const shouldAnimate = animate && !prefersReducedMotion;

  return (
    <motion.pre
      className={cn(
        "ascii-art fixed select-none pointer-events-none z-0",
        "text-[6px] sm:text-[8px] md:text-[12px]",
        "text-foreground-muted",
        positionClasses[position],
        className
      )}
      style={{ opacity: shouldAnimate ? 0 : opacity }}
      initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : undefined}
      animate={
        shouldAnimate
          ? {
              opacity,
              scale: 1,
              transition: {
                duration: 0.8,
                delay,
                ease: [0.25, 1, 0.5, 1],
              },
            }
          : undefined
      }
      aria-hidden
    >
      {pattern}
    </motion.pre>
  );
}

// Convenience component for all four corners
interface AsciiCornersProps {
  variant?: "full" | "simple";
  opacity?: number;
  animate?: boolean;
  staggerDelay?: number;
}

export function AsciiCorners({
  variant = "full",
  opacity = 0.35,
  animate = true,
  staggerDelay = 0.1,
}: AsciiCornersProps) {
  const positions: CornerPosition[] = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ];

  return (
    <>
      {positions.map((position, index) => (
        <AsciiCorner
          key={position}
          position={position}
          variant={variant}
          opacity={opacity}
          animate={animate}
          delay={index * staggerDelay}
        />
      ))}
    </>
  );
}

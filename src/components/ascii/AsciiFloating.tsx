"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FLOATING_SMALL_1,
  FLOATING_SMALL_2,
  FLOATING_SMALL_3,
  FLOATING_MEDIUM_1,
  FLOATING_MEDIUM_2,
  FLOATING_MEDIUM_3,
} from "./patterns";

type FloatingSize = "small" | "medium";

const smallPatterns = [FLOATING_SMALL_1, FLOATING_SMALL_2, FLOATING_SMALL_3];
const mediumPatterns = [FLOATING_MEDIUM_1, FLOATING_MEDIUM_2, FLOATING_MEDIUM_3];

interface FloatingElementConfig {
  pattern: string;
  position: { x: string; y: string };
  animationDuration: number;
  animationDelay: number;
  opacity: number;
}

interface AsciiFloatingProps {
  pattern?: string;
  className?: string;
  opacity?: number;
  animationDuration?: number;
  animationDelay?: number;
  position?: { x: string; y: string };
}

export function AsciiFloating({
  pattern = FLOATING_SMALL_1,
  className,
  opacity = 0.25,
  animationDuration = 8,
  animationDelay = 0,
  position = { x: "0%", y: "0%" },
}: AsciiFloatingProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.pre
      className={cn(
        "ascii-art absolute select-none pointer-events-none",
        "text-[5px] sm:text-[7px] md:text-[10px]",
        "text-foreground-muted",
        className
      )}
      style={{
        left: position.x,
        top: position.y,
        opacity: prefersReducedMotion ? opacity : 0,
      }}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 0, x: 0 }}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              opacity,
              y: [0, -12, 0],
              x: [0, 4, 0],
              transition: {
                opacity: { duration: 1, delay: animationDelay },
                y: {
                  duration: animationDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: animationDelay,
                },
                x: {
                  duration: animationDuration * 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: animationDelay,
                },
              },
            }
      }
      aria-hidden
    >
      {pattern}
    </motion.pre>
  );
}

interface AsciiFloatingGroupProps {
  size?: FloatingSize;
  count?: number;
  className?: string;
  baseOpacity?: number;
}

// Generate positioned floating elements
export function AsciiFloatingGroup({
  size = "small",
  count = 3,
  className,
  baseOpacity = 0.22,
}: AsciiFloatingGroupProps) {
  const prefersReducedMotion = useReducedMotion();
  const patterns = size === "small" ? smallPatterns : mediumPatterns;

  // Predefined positions for floating elements - moved away from edges for mobile
  const positions = [
    { x: "12%", y: "20%" },
    { x: "75%", y: "15%" },
    { x: "15%", y: "68%" },
    { x: "78%", y: "62%" },
    { x: "50%", y: "45%" },
    { x: "8%", y: "45%" },
    { x: "82%", y: "40%" },
  ];

  const elements = Array.from({ length: Math.min(count, positions.length) }, (_, i) => ({
    pattern: patterns[i % patterns.length],
    position: positions[i],
    animationDuration: 6 + (i * 2),
    animationDelay: i * 0.5,
    opacity: baseOpacity - (i * 0.03),
  }));

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none hidden sm:block", className)}>
      {elements.map((element, index) => (
        <AsciiFloating
          key={index}
          pattern={element.pattern}
          position={element.position}
          animationDuration={element.animationDuration}
          animationDelay={prefersReducedMotion ? 0 : element.animationDelay}
          opacity={element.opacity}
        />
      ))}
    </div>
  );
}

// Scattered dots/symbols background
interface AsciiScatterProps {
  className?: string;
  density?: "low" | "medium" | "high";
  opacity?: number;
}

export function AsciiScatter({
  className,
  density = "medium",
  opacity = 0.08,
}: AsciiScatterProps) {
  const prefersReducedMotion = useReducedMotion();
  const symbols = ["·", "●", "○", "◇", "+"];

  const counts = {
    low: 15,
    medium: 25,
    high: 40,
  };

  const elements = Array.from({ length: counts[density] }, (_, i) => ({
    symbol: symbols[i % symbols.length],
    x: `${5 + (i * 17) % 90}%`,
    y: `${10 + (i * 23) % 80}%`,
    delay: i * 0.1,
    duration: 5 + (i % 5) * 2,
  }));

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {elements.map((el, index) => (
        <motion.span
          key={index}
          className="absolute ascii-art text-foreground-faint text-xs"
          style={{
            left: el.x,
            top: el.y,
            opacity: prefersReducedMotion ? opacity : 0,
          }}
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: [opacity * 0.5, opacity, opacity * 0.5],
                  transition: {
                    duration: el.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: el.delay,
                  },
                }
          }
          aria-hidden
        >
          {el.symbol}
        </motion.span>
      ))}
    </div>
  );
}

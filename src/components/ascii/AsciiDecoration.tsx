"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Animation variants for ASCII decorations
export type AsciiAnimationType =
  | "none"
  | "float"
  | "pulse"
  | "glitch"
  | "parallax"
  | "typing"
  | "fadeIn";

export const asciiFloat: Variants = {
  initial: { y: 0, x: 0 },
  animate: {
    y: [0, -12, 0],
    x: [0, 4, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    },
  },
};

export const asciiPulse: Variants = {
  initial: { opacity: 0.4 },
  animate: {
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    },
  },
};

export const asciiGlitch: Variants = {
  initial: { x: 0 },
  animate: {
    x: [0, -2, 2, -1, 1, 0],
    transition: {
      duration: 0.15,
      repeat: Infinity,
      repeatDelay: 4,
      ease: "easeInOut"
    },
  },
};

export const asciiFadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const asciiTyping: Variants = {
  initial: {
    clipPath: "inset(0 100% 0 0)"
  },
  animate: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1.5,
      ease: "easeOut"
    },
  },
};

// Map animation types to variants
const animationVariants: Record<AsciiAnimationType, Variants | undefined> = {
  none: undefined,
  float: asciiFloat,
  pulse: asciiPulse,
  glitch: asciiGlitch,
  parallax: undefined, // Parallax is handled via useTransform, not variants
  typing: asciiTyping,
  fadeIn: asciiFadeIn,
};

interface AsciiDecorationProps {
  pattern: string;
  animation?: AsciiAnimationType;
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
  scale?: number;
  color?: "default" | "accent" | "muted";
  glow?: boolean;
  "aria-hidden"?: boolean;
}

export function AsciiDecoration({
  pattern,
  animation = "none",
  className,
  style,
  opacity = 1,
  scale = 1,
  color = "default",
  glow = false,
  "aria-hidden": ariaHidden = true,
}: AsciiDecorationProps) {
  const prefersReducedMotion = useReducedMotion();

  const colorClasses = {
    default: "text-foreground-muted",
    accent: "text-accent",
    muted: "text-foreground-faint",
  };

  const variants = prefersReducedMotion ? undefined : animationVariants[animation];

  return (
    <motion.pre
      className={cn(
        "ascii-art select-none pointer-events-none",
        colorClasses[color],
        glow && "ascii-glow",
        className
      )}
      style={{
        opacity,
        transform: `scale(${scale})`,
        ...style,
      }}
      variants={variants}
      initial={variants ? "initial" : undefined}
      animate={variants ? "animate" : undefined}
      aria-hidden={ariaHidden}
    >
      {pattern}
    </motion.pre>
  );
}

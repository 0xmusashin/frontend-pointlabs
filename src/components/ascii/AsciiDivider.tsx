"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  DIVIDER_NODES,
  DIVIDER_BINARY,
  DIVIDER_ARROWS,
  DIVIDER_GIT,
  DIVIDER_GIT_SIMPLE,
  DIVIDER_DATA_FLOW,
  DIVIDER_WAVE,
} from "./patterns";

type DividerVariant =
  | "nodes"
  | "binary"
  | "arrows"
  | "git"
  | "git-simple"
  | "data-flow"
  | "wave";

const dividerPatterns: Record<DividerVariant, string> = {
  nodes: DIVIDER_NODES,
  binary: DIVIDER_BINARY,
  arrows: DIVIDER_ARROWS,
  git: DIVIDER_GIT,
  "git-simple": DIVIDER_GIT_SIMPLE,
  "data-flow": DIVIDER_DATA_FLOW,
  wave: DIVIDER_WAVE,
};

type AnimationType = "none" | "typing" | "fadeIn" | "slideIn";

interface AsciiDividerProps {
  variant?: DividerVariant;
  animation?: AnimationType;
  className?: string;
  opacity?: number;
  centered?: boolean;
  color?: "default" | "accent" | "muted";
}

export function AsciiDivider({
  variant = "nodes",
  animation = "fadeIn",
  className,
  opacity = 0.3,
  centered = true,
  color = "default",
}: AsciiDividerProps) {
  const ref = useRef<HTMLPreElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const pattern = dividerPatterns[variant];
  const shouldAnimate = animation !== "none" && !prefersReducedMotion;

  const colorClasses = {
    default: "text-foreground-muted",
    accent: "text-accent",
    muted: "text-foreground-faint",
  };

  const getAnimationProps = () => {
    if (!shouldAnimate) {
      return { style: { opacity } };
    }

    switch (animation) {
      case "typing":
        return {
          initial: { clipPath: "inset(0 100% 0 0)" },
          animate: isInView
            ? { clipPath: "inset(0 0% 0 0)" }
            : { clipPath: "inset(0 100% 0 0)" },
          transition: { duration: 1.2, ease: "easeOut" as const },
          style: { opacity },
        };
      case "slideIn":
        return {
          initial: { opacity: 0, x: -20 },
          animate: isInView ? { opacity, x: 0 } : { opacity: 0, x: -20 },
          transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const },
        };
      case "fadeIn":
      default:
        return {
          initial: { opacity: 0 },
          animate: isInView ? { opacity } : { opacity: 0 },
          transition: { duration: 0.8, ease: "easeOut" as const },
        };
    }
  };

  return (
    <motion.pre
      ref={ref}
      className={cn(
        "ascii-art select-none pointer-events-none overflow-hidden",
        "text-[6px] sm:text-[8px] md:text-xs",
        "scale-[0.85] sm:scale-100",
        colorClasses[color],
        centered && "text-center mx-auto",
        className
      )}
      {...getAnimationProps()}
      aria-hidden
    >
      {pattern}
    </motion.pre>
  );
}

// Wrapper component for section dividers with spacing
interface SectionDividerProps extends AsciiDividerProps {
  spacing?: "sm" | "md" | "lg";
}

export function SectionDivider({
  spacing = "md",
  className,
  ...props
}: SectionDividerProps) {
  const spacingClasses = {
    sm: "py-2 sm:py-4",
    md: "py-4 sm:py-8",
    lg: "py-8 sm:py-12",
  };

  return (
    <div className={cn("w-full overflow-hidden", spacingClasses[spacing], className)}>
      <AsciiDivider {...props} />
    </div>
  );
}

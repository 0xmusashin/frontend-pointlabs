"use client";

import { useScroll, useSpring, useVelocity, MotionValue } from "framer-motion";
import { RefObject } from "react";

interface UseScrollProgressOptions {
  target?: RefObject<HTMLElement | null>;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

interface UseScrollProgressResult {
  /** Smoothed scroll progress (0-1) */
  progress: MotionValue<number>;
  /** Raw unsmoothed scroll progress */
  rawProgress: MotionValue<number>;
  /** Scroll velocity (pixels per second) */
  velocity: MotionValue<number>;
  /** Smoothed velocity for animations */
  smoothVelocity: MotionValue<number>;
}

/**
 * Custom hook for scroll-synced animations with spring physics.
 * Returns smoothed progress value that reverses when scrolling up.
 */
export function useScrollProgress(
  options: UseScrollProgressOptions = {}
): UseScrollProgressResult {
  const {
    target,
    springConfig = {
      stiffness: 100,
      damping: 30,
      mass: 0.8,
    },
  } = options;

  // Get scroll progress from Framer Motion
  const { scrollYProgress } = useScroll({
    target,
  });

  // Smooth the progress with spring physics for fluid motion
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Track velocity for dynamic effects
  const velocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(velocity, {
    stiffness: 200,
    damping: 50,
  });

  return {
    progress: smoothProgress,
    rawProgress: scrollYProgress,
    velocity,
    smoothVelocity,
  };
}

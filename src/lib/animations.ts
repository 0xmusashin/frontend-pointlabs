import { Variants } from "framer-motion";

// Timing constants
export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
};

export const EASE = {
  out: [0.25, 1, 0.5, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  spring: { type: "spring", stiffness: 300, damping: 30 } as const,
};

// Fade up - default reveal animation
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE.out,
    },
  },
};

// Fade in (no movement)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASE.out,
    },
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE.out,
    },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE.out,
    },
  },
};

// Scale up
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.normal,
      ease: EASE.out,
    },
  },
};

// Pop in (more dramatic scale)
export const popIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.fast,
      ease: EASE.out,
    },
  },
};

// Stagger container - wraps children for staggered animations
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Slower stagger for bigger elements
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// Card hover animation props (not variants - use directly)
export const cardHover = {
  whileHover: {
    y: -4,
    transition: { duration: 0.2, ease: EASE.out },
  },
};

// Parallax helper - use with useScroll and useTransform
export const parallaxRange = {
  slow: [0, 1, 0.5, 1.5] as const,
  medium: [0, 1, 0.3, 1.7] as const,
  fast: [0, 1, 0, 2] as const,
};

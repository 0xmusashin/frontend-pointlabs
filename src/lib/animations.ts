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

// ASCII decoration animations
export const asciiFloat: Variants = {
  initial: { y: 0, x: 0 },
  animate: {
    y: [0, -12, 0],
    x: [0, 4, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
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
      ease: "easeInOut",
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
      ease: "easeInOut",
    },
  },
};

export const asciiTyping: Variants = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  animate: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1.5,
      ease: "easeOut",
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

// Terminal-specific animations
export const terminalChrome: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASE.out,
    },
  },
};

export const terminalLine: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: EASE.out,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export const terminalCursor: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [1, 0],
    transition: {
      duration: 1.06,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

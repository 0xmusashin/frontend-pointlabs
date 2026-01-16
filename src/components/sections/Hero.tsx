"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { staggerContainer, fadeUp, scaleUp } from "@/lib/animations";
import {
  HERO_PATTERN_LARGE,
  HERO_PATTERN_DATA_FLOW,
  MINI_LOGO,
} from "@/components/ascii/patterns";
import { AsciiCorners } from "@/components/ascii/AsciiCorner";
import { AsciiFloatingGroup } from "@/components/ascii/AsciiFloating";

const tags = ["AI Research", "Zero-Knowledge ML", "Decentralized Training", "On-chain Agents"];

// Individual tag animation variant
const tagVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] as const },
  },
};

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Parallax effect for ASCII background layers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Multi-layer parallax with different speeds
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, 50]); // Far layer - slow
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, 100]); // Mid layer - medium
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, 180]); // Near layer - fast

  // Opacity fade on scroll
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.4], [0.08, 0]);
  const layer2Opacity = useTransform(scrollYProgress, [0, 0.5], [0.15, 0]);
  const layer3Opacity = useTransform(scrollYProgress, [0, 0.6], [0.25, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Corner decorations */}
      <AsciiCorners variant="simple" opacity={0.35} animate={!prefersReducedMotion} staggerDelay={0.15} />

      {/* Layer 1: Far background (dots pattern - slowest parallax) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          y: prefersReducedMotion ? 0 : layer1Y,
          opacity: prefersReducedMotion ? 0.08 : layer1Opacity,
        }}
      >
        <pre className="ascii-art text-[5px] sm:text-[6px] md:text-[10px] scale-[1.5] sm:scale-[2] md:scale-[4] text-foreground-faint">
          {HERO_PATTERN_DATA_FLOW}
        </pre>
      </motion.div>

      {/* Layer 2: Mid background (medium parallax) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          y: prefersReducedMotion ? 0 : layer2Y,
          opacity: prefersReducedMotion ? 0.15 : layer2Opacity,
        }}
      >
        <pre className="ascii-art text-[5px] sm:text-[7px] md:text-xs scale-[1.5] sm:scale-[2] md:scale-[2.5]">
          {HERO_PATTERN_DATA_FLOW}
        </pre>
      </motion.div>

      {/* Layer 3: Near background - main ASCII pattern (fastest parallax) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          y: prefersReducedMotion ? 0 : layer3Y,
          opacity: prefersReducedMotion ? 0.25 : layer3Opacity,
        }}
      >
        <pre className="ascii-art text-[5px] sm:text-[8px] md:text-xs scale-[1.5] sm:scale-[2.5] md:scale-[3] text-accent/20">
          {HERO_PATTERN_LARGE}
        </pre>
      </motion.div>

      {/* Floating node clusters - hidden on mobile */}
      <div className="hidden sm:block">
        <AsciiFloatingGroup size="small" count={4} baseOpacity={0.18} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      {/* Content with staggered animations */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center space-y-6 sm:space-y-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* ASCII Logo */}
        <motion.div variants={scaleUp}>
          <pre className="ascii-art text-accent text-xs inline-block">
            {MINI_LOGO}
          </pre>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance"
          variants={fadeUp}
        >
          Building the future of{" "}
          <span className="text-accent">decentralized intelligence</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg sm:text-xl text-foreground-secondary max-w-xl mx-auto text-balance"
          variants={fadeUp}
        >
          Point Labs is an AI research lab exploring the intersection of machine learning and Web3.
        </motion.p>

        {/* Tags with individual stagger */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2"
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: 0.3 },
            },
          }}
        >
          {tags.map((tag) => (
            <motion.span
              key={tag}
              variants={tagVariant}
              className="px-3 py-1.5 sm:py-1 text-xs font-mono text-foreground-secondary border border-border rounded-md bg-background-subtle hover:border-accent/50 hover:text-accent transition-colors duration-200"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-foreground-muted"
        >
          <span className="text-xs font-mono">scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

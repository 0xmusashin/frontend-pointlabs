"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { staggerContainer, fadeUp, scaleUp } from "@/lib/animations";

// ASCII art pattern - abstract neural network / data flow
const asciiPattern = `
    ╭──────────────────────────────────────────────────────────────╮
    │  ·  ·  ·  ╭───╮  ·  ·  ·  ╭───╮  ·  ·  ·  ╭───╮  ·  ·  ·   │
    │  ·  ╭───╮ │ ○ │──────────▶│ ◇ │──────────▶│ □ │ ╭───╮  ·   │
    │  ·  │ ● │─┴───┴──╮  ·  ·  └─┬─┘  ·  ·  ╭──┴───┴─│ ◆ │  ·   │
    │  ·  └─┬─┘  ·  ·  │  ·  ·  · │ ·  ·  ·  │  ·  ·  └─┬─┘  ·   │
    │  ·  · │ ·  ·  ·  ▼  ·  ·  · ▼ ·  ·  ·  ▼  ·  ·  · │ ·  ·   │
    │  ·  · │ ·  ·  ╭───╮  ·  ╭───╮  ·  ╭───╮  ·  ·  · │ ·  ·   │
    │  ·  · └──────▶│ ◎ │────▶│ ⬡ │────▶│ ◈ │◀─────────┘ ·  ·   │
    │  ·  ·  ·  ·  └───┘  ·  └───┘  ·  └───┘  ·  ·  ·  ·  ·   │
    ╰──────────────────────────────────────────────────────────────╯
`;

const miniAscii = `╭─╮ ╭─╮ ╭─╮
│●│─│◇│─│□│
╰─╯ ╰─╯ ╰─╯`;

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

  // Parallax effect for ASCII background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const asciiY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const asciiOpacity = useTransform(scrollYProgress, [0, 0.5], [0.03, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* ASCII Background with parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: asciiY, opacity: asciiOpacity }}
      >
        <pre className="ascii-art text-[8px] sm:text-[10px] md:text-xs scale-150 md:scale-[2]">
          {asciiPattern}
        </pre>
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      {/* Content with staggered animations */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center space-y-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* ASCII Logo */}
        <motion.div variants={scaleUp}>
          <pre className="ascii-art text-accent text-xs inline-block">
            {miniAscii}
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
              className="px-3 py-1 text-xs font-mono text-foreground-secondary border border-border rounded-md bg-background-subtle hover:border-accent/50 hover:text-accent transition-colors duration-200"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
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

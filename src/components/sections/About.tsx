"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Shield, Network, Zap } from "lucide-react";
import { fadeUp, slideInLeft, staggerContainer } from "@/lib/animations";

const focusAreas = [
  {
    icon: Brain,
    title: "AI Research",
    description: "Advancing the frontiers of machine learning with novel architectures and training methodologies.",
  },
  {
    icon: Shield,
    title: "Privacy-Preserving ML",
    description: "Zero-knowledge proofs for verifiable and private AI inference at scale.",
  },
  {
    icon: Network,
    title: "Decentralized Infrastructure",
    description: "Building protocols for distributed model training and inference networks.",
  },
  {
    icon: Zap,
    title: "On-chain Agents",
    description: "Autonomous AI systems that interact with blockchain environments.",
  },
];

// Card variant with slide and scale
const cardVariant = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
  },
};

// Terminal reveal animation
const terminalVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const, delay: 0.4 },
  },
};

export function About() {
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const terminalRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });
  const terminalInView = useInView(terminalRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          className="max-w-2xl mb-16"
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span
            className="font-mono text-sm text-accent mb-2 block"
            variants={fadeUp}
          >
            // about
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            variants={fadeUp}
          >
            Research at the edge
          </motion.h2>
          <motion.p
            className="text-foreground-secondary text-lg"
            variants={fadeUp}
          >
            We believe the next wave of AI innovation will be built on open, decentralized infrastructure. Our research focuses on making this future a reality.
          </motion.p>
        </motion.div>

        {/* Focus areas grid with staggered slide-in */}
        <motion.div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {focusAreas.map((area) => (
            <motion.div
              key={area.title}
              className="group p-6 border border-border rounded-lg bg-background-subtle hover:bg-background-muted hover:border-border-strong transition-all duration-200"
              variants={cardVariant}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="p-2 rounded-md bg-accent-muted text-accent"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <area.icon className="w-5 h-5" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                    {area.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Terminal-style quote */}
        <motion.div
          ref={terminalRef}
          className="mt-16 p-6 border border-border rounded-lg bg-background-subtle font-mono overflow-hidden"
          initial="hidden"
          animate={terminalInView ? "visible" : "hidden"}
          variants={terminalVariant}
        >
          <div className="flex items-center gap-2 text-foreground-muted text-xs mb-4">
            <motion.span
              className="w-3 h-3 rounded-full bg-error/50"
              initial={{ scale: 0 }}
              animate={terminalInView ? { scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.2 }}
            />
            <motion.span
              className="w-3 h-3 rounded-full bg-warning/50"
              initial={{ scale: 0 }}
              animate={terminalInView ? { scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.2 }}
            />
            <motion.span
              className="w-3 h-3 rounded-full bg-success/50"
              initial={{ scale: 0 }}
              animate={terminalInView ? { scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.2 }}
            />
            <motion.span
              className="ml-2"
              initial={{ opacity: 0 }}
              animate={terminalInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              terminal
            </motion.span>
          </div>
          <div className="space-y-1 text-sm">
            <motion.p
              className="text-foreground-muted"
              initial={{ opacity: 0, x: -10 }}
              animate={terminalInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.3 }}
            >
              <span className="text-accent">$</span> cat mission.txt
            </motion.p>
            <motion.p
              className="text-foreground-secondary pl-2"
              initial={{ opacity: 0 }}
              animate={terminalInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              &quot;The future of AI is open, verifiable, and owned by everyone.&quot;
            </motion.p>
            <motion.p
              className="text-foreground-muted"
              initial={{ opacity: 0 }}
              animate={terminalInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.3 }}
            >
              <span className="text-accent">$</span>{" "}
              <span className="animate-pulse">▊</span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

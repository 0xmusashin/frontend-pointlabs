"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Shield, Network, Zap } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionDivider } from "@/components/ascii/AsciiDivider";
import { AsciiFloatingGroup } from "@/components/ascii/AsciiFloating";
import { InteractiveTerminal } from "@/components/terminal/InteractiveTerminal";

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

export function About() {
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
      {/* Binary divider at top */}
      <SectionDivider variant="binary" spacing="sm" opacity={0.40} animation="typing" />

      {/* Floating background elements */}
      <AsciiFloatingGroup size="small" count={3} baseOpacity={0.15} />

      <div className="relative max-w-6xl mx-auto">
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
              className="group p-6 border border-border rounded-lg bg-background-subtle
                         hover:bg-background-muted hover:border-border-strong
                         hover:scale-[1.02] hover:-translate-y-1
                         transition-all duration-200"
              variants={fadeUp}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-md bg-accent-muted text-accent
                                group-hover:scale-110 transition-transform duration-200">
                  <area.icon className="w-5 h-5" />
                </div>
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

        {/* Interactive Terminal */}
        <InteractiveTerminal className="mt-16" />
      </div>
    </section>
  );
}

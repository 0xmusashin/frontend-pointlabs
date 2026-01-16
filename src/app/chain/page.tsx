"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header, Footer, SmoothScroll } from "@/components/layout";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ScrollChainSystem, ScrollChainHero } from "@/components/blockchain";

export default function ChainPage() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <SmoothScroll>
      {/* Scroll-synced chain animation background - plays forward on scroll down, reverses on scroll up */}
      <ScrollChainSystem />

      <Header onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <ScrollChainHero
          title="Point Labs"
          subtitle="Building the future of blockchain"
        />

        {/* Content sections */}
        <section className="relative">
          <div className="max-w-4xl mx-auto px-4 py-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-6">
                Research & Development
              </h2>
              <p className="text-foreground-secondary text-lg leading-relaxed mb-8">
                We focus on advancing blockchain technology through rigorous
                research and innovative development practices.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                title="Smart Contracts"
                description="Developing secure and efficient smart contract architectures"
                delay={0}
              />
              <FeatureCard
                title="Consensus Protocols"
                description="Researching next-generation consensus mechanisms"
                delay={0.1}
              />
              <FeatureCard
                title="Scalability"
                description="Building solutions for high-throughput blockchain networks"
                delay={0.2}
              />
              <FeatureCard
                title="Security"
                description="Ensuring robust security through formal verification"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Additional content section */}
        <section className="relative">
          <div className="max-w-4xl mx-auto px-4 py-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-6">
                Our Approach
              </h2>
              <p className="text-foreground-secondary text-lg leading-relaxed mb-8">
                We combine academic rigor with practical implementation to deliver
                cutting-edge blockchain solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard number="50+" label="Research Papers" delay={0} />
              <StatCard number="12" label="Active Projects" delay={0.1} />
              <StatCard number="100%" label="Open Source" delay={0.2} />
            </div>
          </div>
        </section>

        {/* Scroll indicator - only visible at top */}
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-foreground-muted uppercase tracking-widest">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-foreground-muted"
              >
                <path
                  d="M12 5v14M5 12l7 7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </SmoothScroll>
  );
}

function FeatureCard({
  title,
  description,
  delay = 0,
}: {
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="p-6 border border-border rounded-lg bg-background/80 backdrop-blur-sm hover:border-border-strong transition-colors duration-200"
    >
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-foreground-secondary">{description}</p>
    </motion.div>
  );
}

function StatCard({
  number,
  label,
  delay = 0,
}: {
  number: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="p-6 border border-border rounded-lg bg-background/80 backdrop-blur-sm text-center"
    >
      <div className="text-4xl font-bold text-foreground mb-2 font-mono">
        {number}
      </div>
      <div className="text-sm text-foreground-secondary">{label}</div>
    </motion.div>
  );
}

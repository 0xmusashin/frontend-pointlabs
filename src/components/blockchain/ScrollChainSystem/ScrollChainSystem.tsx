"use client";

import { useRef, useState, useEffect } from "react";
import { useScrollProgress } from "./useScrollProgress";
import { ChainLayer } from "./ChainLayer";
import { CHAIN_LAYERS } from "./chainConfig";

/**
 * Main orchestrator for the scroll-synced chain animation system.
 * Manages multiple depth layers that animate based on scroll position.
 *
 * Key features:
 * - True scroll-sync: Scrolling down plays forward, scrolling up reverses
 * - 5 depth layers with parallax rotation
 * - Single continuous 3D rotation animation
 * - Chains always visible (no fading)
 */
export function ScrollChainSystem() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle client-side mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get scroll progress with spring physics
  const { progress } = useScrollProgress({
    springConfig: {
      stiffness: 100,
      damping: 30,
      mass: 0.5,
    },
  });

  // Don't render on server to avoid hydration issues
  if (!mounted) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      />
    );
  }

  // Sort layers back-to-front (render back layers first)
  const sortedLayers = [...CHAIN_LAYERS].sort(
    (a, b) => b.blurAmount - a.blurAmount
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        perspective: "1500px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* Chain layers - always visible */}
      <div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {sortedLayers.map((config, index) => (
          <ChainLayer
            key={config.id}
            config={config}
            progress={progress}
            layerIndex={index}
          />
        ))}
      </div>

      {/* Subtle gradient overlays for depth focus */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/40 to-transparent" />
      </div>
    </div>
  );
}

/**
 * Hero section with scroll-synced chain as a title backdrop.
 * Centers content over the chain animation.
 */
export function ScrollChainHero({
  title = "Point Labs",
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Content overlay */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

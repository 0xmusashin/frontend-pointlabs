"use client";

import { memo, useMemo } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { MetallicChainLink } from "./MetallicChainLink";
import { ChainConnector } from "./ChainConnector";
import { getChainTransform, getLinkTwist, getLinkPosition } from "./chainConfig";
import type { ChainLayerConfig } from "./types";

interface ChainLayerProps {
  config: ChainLayerConfig;
  progress: MotionValue<number>;
  layerIndex: number;
}

/**
 * A single layer of connected chain links.
 * The entire chain moves as one unit horizontally.
 * Each link twists around the chain's centerline with a phase offset.
 */
export const ChainLayer = memo(function ChainLayer({
  config,
  progress,
}: ChainLayerProps) {
  const {
    id,
    yPosition,
    scale: baseScale,
    opacity: baseOpacity,
    blurAmount,
    linkCount,
    rotationBias,
    linkSpacing,
    twistPhaseSpread,
  } = config;

  // Create array of link indices
  const links = useMemo(
    () => Array.from({ length: linkCount }, (_, i) => i),
    [linkCount]
  );

  // Calculate chain-level horizontal position (moves entire chain)
  const chainX = useTransform(progress, (p) => {
    const { chainX } = getChainTransform(p, config);
    return chainX;
  });

  // Calculate base twist angle for the chain
  const twistBase = useTransform(progress, (p) => {
    const { twistBase } = getChainTransform(p, config);
    return twistBase;
  });

  return (
    <div
      className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
      style={{
        top: `${yPosition}%`,
        transform: "translateY(-50%)",
        opacity: baseOpacity,
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
      }}
    >
      {/* Chain container - moves horizontally as one unit */}
      <motion.div
        className="flex items-center justify-center"
        style={{
          x: chainX,
          transformStyle: "preserve-3d",
          transform: `scale(${baseScale}) rotate(${rotationBias}deg)`,
        }}
      >
        {/* Links maintain fixed positions within the chain */}
        {links.map((i) => {
          const linkX = getLinkPosition(i, linkCount, linkSpacing);

          return (
            <TwistingLink
              key={`${id}-link-${i}`}
              linkIndex={i}
              linkCount={linkCount}
              layerId={id}
              linkX={linkX}
              twistBase={twistBase}
              phaseSpread={twistPhaseSpread}
              showConnector={i < linkCount - 1}
            />
          );
        })}
      </motion.div>
    </div>
  );
});

interface TwistingLinkProps {
  linkIndex: number;
  linkCount: number;
  layerId: string;
  linkX: number;
  twistBase: MotionValue<number>;
  phaseSpread: number;
  showConnector: boolean;
}

/**
 * Individual link that twists around the chain's centerline.
 * Position is fixed relative to chain, only rotation changes.
 */
const TwistingLink = memo(function TwistingLink({
  linkIndex,
  linkCount,
  layerId,
  linkX,
  twistBase,
  phaseSpread,
  showConnector,
}: TwistingLinkProps) {
  // Calculate this link's twist angle (base + phase offset)
  const twistAngle = useTransform(twistBase, (base) =>
    getLinkTwist(linkIndex, linkCount, base, phaseSpread)
  );

  // For passing to MetallicChainLink (needs raw number, not MotionValue)
  // We use useTransform to create a derived value
  const twistAngleForLighting = useTransform(twistAngle, (angle) => angle);

  const linkId = `${layerId}-${linkIndex}`;
  const connectorId = `${layerId}-connector-${linkIndex}`;

  return (
    <motion.div
      className="flex items-center flex-shrink-0 absolute"
      style={{
        left: "50%",
        x: linkX,
        marginLeft: -80, // Half of link width to center
        rotateX: twistAngle,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        willChange: "transform",
      }}
    >
      <DynamicMetallicLink
        id={linkId}
        twistAngle={twistAngleForLighting}
      />

      {showConnector && (
        <div style={{ marginLeft: -4 }}>
          <ChainConnector id={connectorId} scale={1} />
        </div>
      )}
    </motion.div>
  );
});

/**
 * Wrapper to pass MotionValue twist angle to MetallicChainLink.
 * Uses motion component to track the value.
 */
const DynamicMetallicLink = memo(function DynamicMetallicLink({
  id,
  twistAngle,
}: {
  id: string;
  twistAngle: MotionValue<number>;
}) {
  // Convert MotionValue to component that re-renders with angle
  return (
    <motion.div
      style={{
        // We need to track twistAngle to trigger re-renders
        // Using a custom approach with useTransform
      }}
    >
      <MetallicLinkWithAngle id={id} twistAngle={twistAngle} />
    </motion.div>
  );
});

/**
 * MetallicChainLink wrapper that subscribes to twist angle changes.
 */
import { useState, useEffect } from "react";

const MetallicLinkWithAngle = memo(function MetallicLinkWithAngle({
  id,
  twistAngle,
}: {
  id: string;
  twistAngle: MotionValue<number>;
}) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const unsubscribe = twistAngle.on("change", (latest) => {
      setAngle(latest);
    });
    return unsubscribe;
  }, [twistAngle]);

  return <MetallicChainLink id={id} scale={1} twistAngle={angle} />;
});

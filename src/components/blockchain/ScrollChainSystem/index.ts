// Scroll-synced chain animation system exports

export { ScrollChainSystem, ScrollChainHero } from "./ScrollChainSystem";
export { ChainLayer } from "./ChainLayer";
export { MetallicChainLink } from "./MetallicChainLink";
export { ChainConnector } from "./ChainConnector";
export { useScrollProgress } from "./useScrollProgress";
export {
  CHAIN_LAYERS,
  getChainTransform,
  getLinkTwist,
  getLinkPosition,
  getRotationTransform,
  getTransformForProgress,
} from "./chainConfig";
export type {
  LinkTransform,
  ChainPhase,
  ChainLayerConfig,
  ScrollProgressResult,
} from "./types";

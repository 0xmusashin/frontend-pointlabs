export interface Project {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "upcoming";
  tags: string[];
  link?: string;
}

// Sample projects data
export const projects: Project[] = [
  {
    id: "neural-consensus",
    title: "Neural Consensus",
    description: "Decentralized model validation using novel consensus mechanisms for AI inference verification.",
    status: "active",
    tags: ["AI", "Consensus", "Research"],
  },
  {
    id: "zkml-framework",
    title: "zkML Framework",
    description: "Open-source toolkit for building zero-knowledge machine learning applications.",
    status: "active",
    tags: ["ZK", "ML", "Open Source"],
    link: "https://github.com/point-labs/zkml",
  },
  {
    id: "distributed-training",
    title: "Distributed Training Protocol",
    description: "Protocol for incentivized collaborative model training across decentralized networks.",
    status: "upcoming",
    tags: ["Protocol", "Training", "Web3"],
  },
  {
    id: "ai-agents-research",
    title: "Autonomous Agent Research",
    description: "Exploring the intersection of AI agents and on-chain execution environments.",
    status: "active",
    tags: ["Agents", "Research", "Blockchain"],
  },
];

import { VirtualFile, TypewriterItem } from './types';

// Animation timing constants (ui-skill compliant)
export const TIMING = {
  cursorBlink: 530,
  microInteraction: 150,
  lineReveal: 200,
  modeTransition: 250,
  typingNormal: 40,
  typingFast: 25,
  lineDelay: 200,
  commandDelay: 400,
  chromeDelay: 100,
} as const;

export const EASING = [0.25, 1, 0.5, 1] as const;

// Virtual filesystem content
export const FILE_SYSTEM: Record<string, VirtualFile> = {
  'mission.txt': {
    name: 'mission.txt',
    type: 'file',
    content: `Point Labs Mission Statement
============================

The future of AI is open, verifiable, and owned by everyone.

We believe that transformative AI should not be controlled by a handful
of corporations. Our mission is to build the infrastructure that makes
decentralized, privacy-preserving AI not just possible, but inevitable.

Core Focus Areas:
- Zero-knowledge machine learning (ZKML)
- Decentralized inference networks
- On-chain autonomous agents
- Open-source research and tooling

We ship code. We publish research. We build in public.`,
  },
  'values.txt': {
    name: 'values.txt',
    type: 'file',
    content: `Point Labs Core Values
======================

1. RESEARCH FIRST
   Every product decision is grounded in rigorous research.
   We publish our findings, even when inconvenient.

2. RADICAL TRANSPARENCY
   Open source by default. Open research by default.
   Our code, our methods, our reasoning—all public.

3. LONG-TERM THINKING
   We optimize for decades, not quarters.
   The infrastructure we build must outlast us.

4. TECHNICAL EXCELLENCE
   No shortcuts. No hype. Ship working code that scales.
   Complexity is the enemy; simplicity is the goal.

5. DECENTRALIZATION AS PRINCIPLE
   Not just a feature—a fundamental design constraint.
   Power must be distributed, not concentrated.`,
  },
  '.config/system.json': {
    name: 'system.json',
    type: 'file',
    content: `{
  "name": "pointlabs-terminal",
  "version": "0.3.1",
  "build": "2024.12.001",
  "network": {
    "status": "operational",
    "nodes": 47,
    "latency_ms": 12,
    "uptime": "99.97%"
  },
  "features": {
    "zkml": true,
    "federated": "beta",
    "agents": "alpha"
  }
}`,
  },
};

// Directory listings
export const DIRECTORY_CONTENTS: Record<string, string[]> = {
  '~': ['pointlabs/'],
  '~/pointlabs': ['mission.txt', 'values.txt', '.config/'],
  '~/pointlabs/.config': ['system.json'],
};

// Network status output
export const NETWORK_STATUS = `
Network Status: OPERATIONAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Active Nodes     47
Avg Latency      12ms
Uptime           99.97%
━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZKML Proofs      1,247,892
Inferences/day   89,421
Active Agents    156
`.trim();

// Version output
export const VERSION_OUTPUT = `pointlabs v0.3.1 (build 2024.12.001)
Protocol: zkml-v2
Network: mainnet-beta`;

// Git log output
export const GIT_LOG_OUTPUT = `a3f7c21 feat: add cross-chain agent routing
b8e4d92 fix: zkml proof verification edge case
c1a5f30 docs: update protocol specification
d9b2e14 refactor: optimize inference batching
e4c8a67 feat: federated learning coordinator`;

// Help output
export const HELP_OUTPUT = `Available commands:

  cat <file>              Display file contents
  ls [dir]                List directory contents
  help                    Show this help message
  clear                   Clear terminal
  pointlabs --version     Show version info
  pointlabs network status Show network statistics
  git log --oneline -5    Show recent commits

Files available:
  mission.txt    values.txt
  .config/system.json`;

// Compact typewriter sequence for initial animation
export const TYPEWRITER_SEQUENCE: TypewriterItem[] = [
  { type: 'command', content: 'pointlabs --version', delay: 600 },
  { type: 'output', content: VERSION_OUTPUT, typingSpeed: TIMING.typingFast },
  { type: 'command', content: 'echo "The future of AI is open, verifiable, and owned by everyone."', delay: 600 },
  { type: 'output', content: '"The future of AI is open, verifiable, and owned by everyone."', typingSpeed: TIMING.typingFast },
];

// Suggested commands to show as chips
export const SUGGESTED_COMMANDS = [
  'cat values.txt',
  'clear',
  'help',
  'ls',
];

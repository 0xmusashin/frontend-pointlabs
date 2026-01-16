// ASCII Art Patterns for Point Labs
// Large patterns for hero section, smaller ones for decorative elements

export const HERO_PATTERN_LARGE = `
╔══════════════════════════════════════════════════════════════════════════╗
║  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·   ║
║  ·  ╭────────╮     ╭────────╮     ╭────────╮     ╭────────╮  ·  ·  ·   ║
║  ·  │ INPUT  │═════│ HIDDEN │═════│ HIDDEN │═════│ OUTPUT │  ·  ·  ·   ║
║  ·  │  ●●●   │     │  ◇◇◇◇  │     │  ◈◈◈◈  │     │  □□□   │  ·  ·  ·   ║
║  ·  ╰───┬────╯     ╰───┬────╯     ╰───┬────╯     ╰───┬────╯  ·  ·  ·   ║
║  ·  ·   │   ╭──────────┼──────────────┼──────────╮   │   ·  ·  ·  ·   ║
║  ·  ·   ▼   ▼          ▼              ▼          ▼   ▼   ·  ·  ·  ·   ║
║  ·  ╭───────────╮  ╭───────────╮  ╭───────────╮  ╭───────────╮  ·  ·   ║
║  ·  │  ○ ─── ◎  │══│  ◆ ─── ⬡  │══│  ■ ─── ◇  │══│  ● ─── □  │  ·  ·   ║
║  ·  ╰───────────╯  ╰───────────╯  ╰───────────╯  ╰───────────╯  ·  ·   ║
║  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·   ║
╚══════════════════════════════════════════════════════════════════════════╝`;

// Alternative hero pattern - data flow visualization
export const HERO_PATTERN_DATA_FLOW = `
    ╭──────────────────────────────────────────────────────────────╮
    │  ·  ·  ·  ╭───╮  ·  ·  ·  ╭───╮  ·  ·  ·  ╭───╮  ·  ·  ·   │
    │  ·  ╭───╮ │ ○ │──────────▶│ ◇ │──────────▶│ □ │ ╭───╮  ·   │
    │  ·  │ ● │─┴───┴──╮  ·  ·  └─┬─┘  ·  ·  ╭──┴───┴─│ ◆ │  ·   │
    │  ·  └─┬─┘  ·  ·  │  ·  ·  · │ ·  ·  ·  │  ·  ·  └─┬─┘  ·   │
    │  ·  · │ ·  ·  ·  ▼  ·  ·  · ▼ ·  ·  ·  ▼  ·  ·  · │ ·  ·   │
    │  ·  · │ ·  ·  ╭───╮  ·  ╭───╮  ·  ╭───╮  ·  ·  · │ ·  ·   │
    │  ·  · └──────▶│ ◎ │────▶│ ⬡ │────▶│ ◈ │◀─────────┘ ·  ·   │
    │  ·  ·  ·  ·  └───┘  ·  └───┘  ·  └───┘  ·  ·  ·  ·  ·   │
    ╰──────────────────────────────────────────────────────────────╯`;

// Corner decorations - 4 variants for each corner
export const CORNER_TOP_LEFT = `╭─────────────
│ ┌──┐  ╭──╮
│ │01│──│>>│
│ └──┘  ╰──╯
│    ╲
│     ◇    `;

export const CORNER_TOP_RIGHT = `─────────────╮
    ╭──╮  ┌──┐ │
    │<<│──│10│ │
    ╰──╯  └──┘ │
         ╱     │
        ◇      │`;

export const CORNER_BOTTOM_LEFT = `│     ◇
│    ╱
│ ┌──┐  ╭──╮
│ │00│──│>>│
│ └──┘  ╰──╯
╰─────────────`;

export const CORNER_BOTTOM_RIGHT = `        ◇      │
         ╲     │
    ╭──╮  ┌──┐ │
    │<<│──│11│ │
    ╰──╯  └──┘ │
─────────────╯`;

// Simplified corners for smaller screens
export const CORNER_SIMPLE_TL = `╭───┬──
│ ○ │
├───┘  `;

export const CORNER_SIMPLE_TR = `──┬───╮
  │ ○ │
  └───┤`;

export const CORNER_SIMPLE_BL = `├───┐
│ ○ │
╰───┴──`;

export const CORNER_SIMPLE_BR = `  ┌───┤
  │ ○ │
──┴───╯`;

// Floating node clusters - small
export const FLOATING_SMALL_1 = `╭─╮   ╭─╮
│●│───│◇│
╰─╯   ╰─╯`;

export const FLOATING_SMALL_2 = `  ╭─╮
  │◎│
╭─┴─┴─╮
│ ● ● │
╰─────╯`;

export const FLOATING_SMALL_3 = `╭─╮
│○│──◇
╰─╯`;

// Floating node clusters - medium
export const FLOATING_MEDIUM_1 = `╭───╮     ╭───╮
│ ● │═════│ ◎ │
╰─┬─╯     ╰─┬─╯
  │    ◇    │
  ╰────┬────╯
       ▼`;

export const FLOATING_MEDIUM_2 = `    ╭───╮
╭───┤ ● ├───╮
│   ╰─┬─╯   │
◇     │     ◇
│   ╭─┴─╮   │
╰───┤ ◎ ├───╯
    ╰───╯`;

export const FLOATING_MEDIUM_3 = `╭─────────╮
│ ○ ─ ◎ ─ ● │
│ │   │   │ │
│ ◇ ─ ⬡ ─ ◆ │
╰─────────╯`;

// Section dividers
export const DIVIDER_NODES = `──────●──────●──────●──────●──────`;

export const DIVIDER_BINARY = `═══ 01101001 ═══ 01101110 ═══ 01110100 ═══`;

export const DIVIDER_ARROWS = `▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶`;

export const DIVIDER_GIT = `──●────●────●────●────●──
  │    │    │    │    │
 v1   v2   v3   v4  HEAD`;

export const DIVIDER_GIT_SIMPLE = `──●────●────●────●──`;

export const DIVIDER_DATA_FLOW = `○───▶───◇───▶───□───▶───◆───▶───●`;

export const DIVIDER_WAVE = `∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿`;

// Mini decorative elements
export const MINI_LOGO = `╭─╮ ╭─╮ ╭─╮
│●│─│◇│─│□│
╰─╯ ╰─╯ ╰─╯`;

export const MINI_NODE = `╭─╮
│●│
╰─╯`;

export const MINI_CONNECTION = `●───◇`;

export const MINI_ARROW = `──▶`;

// Background scatter elements
export const SCATTER_ELEMENTS = [
  '●',
  '◇',
  '○',
  '◎',
  '□',
  '◆',
  '⬡',
  '◈',
  '·',
  '+',
] as const;

// Pattern for creating layered depth effect
export const LAYER_FAR = `·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·`;

export const LAYER_MID = `  +     +     +     +     +     +
     +     +     +     +     +
  +     +     +     +     +     +`;

// Bracket decorations for content framing
export const BRACKET_LEFT = `╭──
│
│
│
╰──`;

export const BRACKET_RIGHT = `──╮
  │
  │
  │
──╯`;

"use client";

import { useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { TIMING, EASING, SUGGESTED_COMMANDS } from './constants';

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onHistoryNavigate: (direction: 'up' | 'down') => void;
  onClear: () => void;
  enabled: boolean;
  reducedMotion?: boolean;
}

const inputVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.modeTransition / 1000,
      ease: EASING,
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMING.microInteraction / 1000,
      ease: EASING,
    },
  },
};

export function TerminalInput({
  value,
  onChange,
  onSubmit,
  onHistoryNavigate,
  onClear,
  enabled,
  reducedMotion = false,
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when enabled
  useEffect(() => {
    if (enabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [enabled]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!enabled) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (value.trim()) {
          onSubmit(value);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        onHistoryNavigate('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        onHistoryNavigate('down');
        break;
      case 'c':
        if (e.ctrlKey) {
          e.preventDefault();
          onChange('');
        }
        break;
      case 'l':
        if (e.ctrlKey) {
          e.preventDefault();
          onClear();
        }
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleChipClick = (command: string) => {
    onSubmit(command);
  };

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      variants={reducedMotion ? {} : inputVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {/* Input line */}
      <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm">
        <span className="text-accent select-none">$</span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-foreground outline-none caret-accent"
            placeholder="Type a command..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
          {/* Blinking cursor when empty */}
          {!value && (
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 text-accent animate-pulse pointer-events-none"
              aria-hidden="true"
            >
              ▊
            </span>
          )}
        </div>
      </div>

      {/* Command suggestion chips */}
      <motion.div
        className="flex flex-wrap gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {SUGGESTED_COMMANDS.map((cmd) => (
          <motion.button
            key={cmd}
            variants={reducedMotion ? {} : chipVariants}
            onClick={() => handleChipClick(cmd)}
            className="px-3 py-2 sm:py-1 min-h-[44px] sm:min-h-0 text-xs font-mono rounded-md
              bg-background-muted border border-border
              text-foreground-secondary
              hover:bg-accent-muted hover:text-accent hover:border-accent/30
              transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-accent/50"
            type="button"
          >
            {cmd}
          </motion.button>
        ))}
      </motion.div>

      {/* Keyboard hints - hidden on mobile */}
      <div className="hidden sm:block text-[10px] text-foreground-muted font-mono opacity-60">
        <span>↑↓ history</span>
        <span className="mx-2">·</span>
        <span>Ctrl+L clear</span>
        <span className="mx-2">·</span>
        <span>Ctrl+C cancel</span>
      </div>
    </motion.div>
  );
}

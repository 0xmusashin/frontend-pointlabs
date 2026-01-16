"use client";

import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTerminalState } from './useTerminalState';
import { useTypewriterQueue } from './useTypewriterQueue';
import { TerminalHistory } from './TerminalHistory';
import { TerminalInput } from './TerminalInput';
import { executeCommand } from './CommandRegistry';
import { TYPEWRITER_SEQUENCE, TIMING, EASING } from './constants';

interface InteractiveTerminalProps {
  className?: string;
}

const chromeVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASING,
    },
  },
};

const dotVariants = {
  hidden: { scale: 0 },
  visible: (delay: number) => ({
    scale: 1,
    transition: {
      delay,
      duration: 0.2,
      ease: EASING,
    },
  }),
};

export function InteractiveTerminal({ className = '' }: InteractiveTerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion ?? false;

  const [hasStarted, setHasStarted] = useState(false);
  const [chromeVisible, setChromeVisible] = useState(false);

  const {
    state,
    addLine,
    setInput,
    setTyping,
    addToHistory,
    navigateHistory,
    clear,
    setTypewriterComplete,
  } = useTerminalState();

  const handleTypewriterComplete = useCallback(() => {
    setTypewriterComplete();
  }, [setTypewriterComplete]);

  const { runSequence, skipToEnd } = useTypewriterQueue({
    addLine,
    setTyping,
    onComplete: handleTypewriterComplete,
    reducedMotion,
  });

  // Start typewriter sequence when terminal comes into view
  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);

      // Show chrome first, then start typewriter
      const chromeDelay = reducedMotion ? 0 : TIMING.chromeDelay * 10;

      setTimeout(() => {
        setChromeVisible(true);
      }, chromeDelay);

      // Start typewriter after chrome animation
      const typewriterDelay = reducedMotion ? 0 : chromeDelay + 1000;

      setTimeout(() => {
        if (reducedMotion) {
          // If reduced motion, skip animation and show all content
          skipToEnd(TYPEWRITER_SEQUENCE);
        } else {
          runSequence(TYPEWRITER_SEQUENCE);
        }
      }, typewriterDelay);
    }
  }, [isInView, hasStarted, runSequence, skipToEnd, reducedMotion]);

  // Handle command submission
  const handleSubmit = useCallback(
    (input: string) => {
      const trimmed = input.trim();
      if (!trimmed) return;

      // Add command to history display
      addLine('command', `$ ${trimmed}`);
      addToHistory(trimmed);
      setInput('');

      // Execute command
      const { result, shouldClear } = executeCommand(trimmed, state);

      if (shouldClear) {
        clear();
        return;
      }

      // Add output lines
      if (result.output.length > 0) {
        result.output.forEach((line) => {
          addLine(result.isError ? 'error' : 'output', line);
        });
      }
    },
    [addLine, addToHistory, clear, setInput, state]
  );

  // Skip to end on click during typewriter phase
  const handleContainerClick = useCallback(() => {
    if (state.mode === 'typewriter' && !state.typewriterComplete) {
      skipToEnd(TYPEWRITER_SEQUENCE);
    }
  }, [state.mode, state.typewriterComplete, skipToEnd]);

  return (
    <motion.div
      ref={containerRef}
      className={`
        p-4 sm:p-6 border border-border rounded-md sm:rounded-lg bg-background-subtle
        font-mono overflow-hidden cursor-default
        ${className}
      `}
      variants={chromeVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onClick={handleContainerClick}
      role="region"
      aria-label="Interactive terminal"
    >
      {/* Terminal window chrome */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-foreground-muted text-[11px] sm:text-xs mb-4">
        <motion.span
          className="w-3 h-3 rounded-full bg-error/50"
          variants={dotVariants}
          initial="hidden"
          animate={chromeVisible ? 'visible' : 'hidden'}
          custom={0}
        />
        <motion.span
          className="w-3 h-3 rounded-full bg-warning/50"
          variants={dotVariants}
          initial="hidden"
          animate={chromeVisible ? 'visible' : 'hidden'}
          custom={0.1}
        />
        <motion.span
          className="w-3 h-3 rounded-full bg-success/50"
          variants={dotVariants}
          initial="hidden"
          animate={chromeVisible ? 'visible' : 'hidden'}
          custom={0.2}
        />
        <motion.span
          className="ml-2"
          initial={{ opacity: 0 }}
          animate={chromeVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          terminal — ~/pointlabs
        </motion.span>

        {/* Skip hint during typewriter - hidden on mobile */}
        {state.mode === 'typewriter' && !state.typewriterComplete && (
          <motion.span
            className="ml-auto text-[10px] text-foreground-muted/50 hidden sm:inline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            click to skip
          </motion.span>
        )}
      </div>

      {/* Terminal content */}
      <div className="space-y-2 min-h-[160px] sm:min-h-[200px]">
        <TerminalHistory
          history={state.history}
          isTyping={state.isTyping}
          reducedMotion={reducedMotion}
        />

        <TerminalInput
          value={state.inputValue}
          onChange={setInput}
          onSubmit={handleSubmit}
          onHistoryNavigate={navigateHistory}
          onClear={clear}
          enabled={state.inputEnabled}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Screen reader skip link */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-background focus:text-foreground"
      >
        Skip terminal section
      </a>
    </motion.div>
  );
}

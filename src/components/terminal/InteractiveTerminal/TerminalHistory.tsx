"use client";

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalLine } from './types';
import { TIMING, EASING } from './constants';

interface TerminalHistoryProps {
  history: TerminalLine[];
  isTyping: boolean;
  reducedMotion?: boolean;
}

const lineVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.lineReveal / 1000,
      ease: EASING,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const instantVariants = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0 },
};

function TerminalLineComponent({
  line,
  reducedMotion,
}: {
  line: TerminalLine;
  reducedMotion: boolean;
}) {
  const isCommand = line.type === 'command';
  const isError = line.type === 'error';

  return (
    <motion.div
      key={line.id}
      variants={reducedMotion ? instantVariants : lineVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`
        font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-all sm:break-words
        ${isCommand ? 'text-foreground-muted' : ''}
        ${isError ? 'text-error' : ''}
        ${!isCommand && !isError ? 'text-foreground-secondary pl-1.5 sm:pl-2' : ''}
      `}
    >
      {isCommand && (
        <span className="text-accent">{line.content.startsWith('$') ? '' : '$ '}</span>
      )}
      <span>{line.content}</span>
      {line.isTyping && (
        <span className="animate-pulse ml-0.5">▊</span>
      )}
    </motion.div>
  );
}

export function TerminalHistory({
  history,
  isTyping,
  reducedMotion = false,
}: TerminalHistoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      // Use smooth scrolling only if not reduced motion
      container.scrollTo({
        top: container.scrollHeight,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [history, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="space-y-0.5 sm:space-y-1 overflow-y-auto max-h-[200px] sm:max-h-[300px] terminal-scrollbar"
      data-lenis-prevent
      role="log"
      aria-live="polite"
      aria-label="Terminal output"
    >
      <AnimatePresence mode="popLayout">
        {history.map((line) => (
          <TerminalLineComponent
            key={line.id}
            line={line}
            reducedMotion={reducedMotion}
          />
        ))}
      </AnimatePresence>

      {/* Typing indicator when processing */}
      {isTyping && history.length > 0 && !history[history.length - 1]?.isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-foreground-muted font-mono text-xs sm:text-sm"
        >
          <span className="text-accent">$</span>{' '}
          <span className="animate-pulse">▊</span>
        </motion.div>
      )}
    </div>
  );
}

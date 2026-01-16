import { useCallback, useRef, useEffect } from 'react';
import { TypewriterItem } from './types';
import { TIMING } from './constants';

interface UseTypewriterQueueProps {
  addLine: (type: 'command' | 'output' | 'error' | 'system', content: string, isTyping?: boolean) => void;
  setTyping: (isTyping: boolean) => void;
  onComplete: () => void;
  reducedMotion?: boolean;
}

export function useTypewriterQueue({
  addLine,
  setTyping,
  onComplete,
  reducedMotion = false,
}: UseTypewriterQueueProps) {
  const isRunningRef = useRef(false);
  const abortRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const delay = useCallback(
    (ms: number): Promise<void> =>
      new Promise((resolve) => {
        if (abortRef.current) {
          resolve();
          return;
        }
        const timeout = setTimeout(resolve, ms);
        timeoutsRef.current.push(timeout);
      }),
    []
  );

  const typeText = useCallback(
    async (text: string, speed: number = TIMING.typingNormal): Promise<string> => {
      if (reducedMotion || abortRef.current) {
        return text;
      }

      let result = '';
      for (const char of text) {
        if (abortRef.current) {
          return text;
        }
        result += char;
        await delay(speed);
      }
      return result;
    },
    [delay, reducedMotion]
  );

  const processItem = useCallback(
    async (item: TypewriterItem): Promise<void> => {
      if (abortRef.current) return;

      // Pre-delay before the item
      if (item.delay && !reducedMotion) {
        await delay(item.delay);
      }

      if (abortRef.current) return;

      const typingSpeed = item.typingSpeed ?? TIMING.typingNormal;

      if (item.type === 'command') {
        setTyping(true);

        if (reducedMotion) {
          addLine('command', `$ ${item.content}`);
        } else {
          // Type the command character by character
          let typed = '$ ';
          addLine('command', typed, true);

          for (const char of item.content) {
            if (abortRef.current) {
              addLine('command', `$ ${item.content}`, false);
              break;
            }
            typed += char;
            // We need to update the last line, so we track this differently
            await delay(typingSpeed);
          }
        }

        setTyping(false);
        await delay(TIMING.commandDelay);
      } else if (item.type === 'output') {
        // For output, we can either type it all at once or line by line
        if (reducedMotion) {
          // Split into lines and add each
          const lines = item.content.split('\n');
          for (const line of lines) {
            addLine('output', line);
          }
        } else {
          // Add lines with slight delays between them
          const lines = item.content.split('\n');
          for (const line of lines) {
            if (abortRef.current) break;
            addLine('output', line);
            await delay(TIMING.lineDelay);
          }
        }
      }
    },
    [addLine, delay, reducedMotion, setTyping]
  );

  const runSequence = useCallback(
    async (sequence: TypewriterItem[]): Promise<void> => {
      if (isRunningRef.current) return;

      isRunningRef.current = true;
      abortRef.current = false;

      for (const item of sequence) {
        if (abortRef.current) break;
        await processItem(item);
      }

      isRunningRef.current = false;

      if (!abortRef.current) {
        onComplete();
      }
    },
    [processItem, onComplete]
  );

  const skipToEnd = useCallback(
    (sequence: TypewriterItem[]): void => {
      abortRef.current = true;
      clearTimeouts();

      // Instantly add all remaining content
      for (const item of sequence) {
        if (item.type === 'command') {
          addLine('command', `$ ${item.content}`);
        } else {
          const lines = item.content.split('\n');
          for (const line of lines) {
            addLine('output', line);
          }
        }
      }

      isRunningRef.current = false;
      setTyping(false);
      onComplete();
    },
    [addLine, clearTimeouts, onComplete, setTyping]
  );

  const abort = useCallback(() => {
    abortRef.current = true;
    clearTimeouts();
    isRunningRef.current = false;
  }, [clearTimeouts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current = true;
      clearTimeouts();
    };
  }, [clearTimeouts]);

  return {
    runSequence,
    skipToEnd,
    abort,
    isRunning: isRunningRef.current,
  };
}

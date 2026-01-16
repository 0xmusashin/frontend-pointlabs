// Terminal line types
export type LineType = 'command' | 'output' | 'error' | 'system';

export interface TerminalLine {
  id: string;
  type: LineType;
  content: string;
  timestamp: number;
  isTyping?: boolean;
}

// Terminal state
export type TerminalMode = 'typewriter' | 'interactive';

export interface TerminalState {
  mode: TerminalMode;
  history: TerminalLine[];
  isTyping: boolean;
  inputEnabled: boolean;
  inputValue: string;
  commandHistory: string[];
  commandHistoryIndex: number;
  currentDirectory: string;
  typewriterComplete: boolean;
}

// Terminal actions
export type TerminalAction =
  | { type: 'ADD_LINE'; payload: Omit<TerminalLine, 'id' | 'timestamp'> }
  | { type: 'UPDATE_LINE'; payload: { id: string; content: string; isTyping?: boolean } }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SET_MODE'; payload: TerminalMode }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'ENABLE_INPUT'; payload: boolean }
  | { type: 'ADD_TO_HISTORY'; payload: string }
  | { type: 'NAVIGATE_HISTORY'; payload: 'up' | 'down' }
  | { type: 'CLEAR' }
  | { type: 'SET_TYPEWRITER_COMPLETE' };

// Command types
export interface CommandResult {
  output: string[];
  isError?: boolean;
}

export interface CommandHandler {
  execute: (args: string[], state: TerminalState) => CommandResult;
  description: string;
  usage?: string;
}

export type CommandRegistry = Record<string, CommandHandler>;

// Typewriter queue types
export interface TypewriterItem {
  type: 'command' | 'output';
  content: string;
  delay?: number;
  typingSpeed?: number;
}

export interface TypewriterSequence {
  items: TypewriterItem[];
  onComplete?: () => void;
}

// Virtual filesystem
export interface VirtualFile {
  name: string;
  content: string;
  type: 'file' | 'directory';
  children?: Record<string, VirtualFile>;
}

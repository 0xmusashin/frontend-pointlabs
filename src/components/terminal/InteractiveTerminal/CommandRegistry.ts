import { CommandHandler, CommandResult, TerminalState } from './types';
import {
  FILE_SYSTEM,
  DIRECTORY_CONTENTS,
  VERSION_OUTPUT,
  NETWORK_STATUS,
  GIT_LOG_OUTPUT,
  HELP_OUTPUT,
} from './constants';

// Helper to resolve file path
function resolveFile(filename: string): string | null {
  // Direct match
  if (FILE_SYSTEM[filename]) {
    return FILE_SYSTEM[filename].content;
  }

  // Try with common path prefixes removed
  const cleanName = filename.replace(/^(\.\/|~\/pointlabs\/)/, '');
  if (FILE_SYSTEM[cleanName]) {
    return FILE_SYSTEM[cleanName].content;
  }

  return null;
}

// Helper to resolve directory
function resolveDirectory(dirname: string): string[] | null {
  const normalized = dirname.replace(/\/$/, '') || '~/pointlabs';

  if (DIRECTORY_CONTENTS[normalized]) {
    return DIRECTORY_CONTENTS[normalized];
  }

  // Try with ~/pointlabs prefix
  const withPrefix = `~/pointlabs/${dirname}`.replace(/\/+/g, '/');
  if (DIRECTORY_CONTENTS[withPrefix]) {
    return DIRECTORY_CONTENTS[withPrefix];
  }

  return null;
}

// Command handlers
const catCommand: CommandHandler = {
  description: 'Display file contents',
  usage: 'cat <filename>',
  execute: (args: string[]): CommandResult => {
    if (args.length === 0) {
      return {
        output: ['cat: missing file operand'],
        isError: true,
      };
    }

    const filename = args[0];
    const content = resolveFile(filename);

    if (!content) {
      return {
        output: [`cat: ${filename}: No such file or directory`],
        isError: true,
      };
    }

    return {
      output: content.split('\n'),
    };
  },
};

const lsCommand: CommandHandler = {
  description: 'List directory contents',
  usage: 'ls [directory]',
  execute: (args: string[], state: TerminalState): CommandResult => {
    const dirname = args[0] || state.currentDirectory;
    const contents = resolveDirectory(dirname);

    if (!contents) {
      return {
        output: [`ls: cannot access '${dirname}': No such file or directory`],
        isError: true,
      };
    }

    // Format output in columns
    const formatted = contents.join('  ');
    return {
      output: [formatted],
    };
  },
};

const helpCommand: CommandHandler = {
  description: 'Show available commands',
  usage: 'help',
  execute: (): CommandResult => {
    return {
      output: HELP_OUTPUT.split('\n'),
    };
  },
};

const clearCommand: CommandHandler = {
  description: 'Clear the terminal',
  usage: 'clear',
  execute: (): CommandResult => {
    // Special case: return empty output with a clear flag
    return {
      output: [],
    };
  },
};

// Complex commands with subcommands
const pointlabsCommand: CommandHandler = {
  description: 'Point Labs CLI',
  usage: 'pointlabs [--version | network status]',
  execute: (args: string[]): CommandResult => {
    if (args.length === 0) {
      return {
        output: ['Usage: pointlabs [--version | network status]'],
      };
    }

    if (args[0] === '--version' || args[0] === '-v') {
      return {
        output: VERSION_OUTPUT.split('\n'),
      };
    }

    if (args[0] === 'network' && args[1] === 'status') {
      return {
        output: NETWORK_STATUS.split('\n'),
      };
    }

    return {
      output: [`pointlabs: unknown command '${args.join(' ')}'`],
      isError: true,
    };
  },
};

const gitCommand: CommandHandler = {
  description: 'Git commands (limited)',
  usage: 'git log --oneline -5',
  execute: (args: string[]): CommandResult => {
    if (args[0] === 'log' && args.includes('--oneline')) {
      return {
        output: GIT_LOG_OUTPUT.split('\n'),
      };
    }

    return {
      output: ['Only "git log --oneline -5" is available in this demo'],
      isError: true,
    };
  },
};

const echoCommand: CommandHandler = {
  description: 'Display a line of text',
  usage: 'echo [text]',
  execute: (args: string[]): CommandResult => {
    return {
      output: [args.join(' ')],
    };
  },
};

const pwdCommand: CommandHandler = {
  description: 'Print working directory',
  usage: 'pwd',
  execute: (_args: string[], state: TerminalState): CommandResult => {
    return {
      output: [state.currentDirectory],
    };
  },
};

// Registry of all commands
export const COMMANDS: Record<string, CommandHandler> = {
  cat: catCommand,
  ls: lsCommand,
  help: helpCommand,
  clear: clearCommand,
  pointlabs: pointlabsCommand,
  git: gitCommand,
  echo: echoCommand,
  pwd: pwdCommand,
};

// Parse and execute a command string
export function executeCommand(
  input: string,
  state: TerminalState
): { result: CommandResult; shouldClear: boolean } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { result: { output: [] }, shouldClear: false };
  }

  // Parse command and arguments
  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Check for clear command
  if (command === 'clear') {
    return { result: { output: [] }, shouldClear: true };
  }

  // Find and execute command
  const handler = COMMANDS[command];
  if (!handler) {
    return {
      result: {
        output: [`command not found: ${command}`],
        isError: true,
      },
      shouldClear: false,
    };
  }

  const result = handler.execute(args, state);
  return { result, shouldClear: false };
}

// Get command suggestions for autocomplete
export function getCommandSuggestions(partial: string): string[] {
  const trimmed = partial.trim().toLowerCase();
  if (!trimmed) return Object.keys(COMMANDS);

  return Object.keys(COMMANDS).filter((cmd) => cmd.startsWith(trimmed));
}

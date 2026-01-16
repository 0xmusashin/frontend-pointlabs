import { useReducer, useCallback } from 'react';
import { TerminalState, TerminalAction, TerminalLine } from './types';

const initialState: TerminalState = {
  mode: 'typewriter',
  history: [],
  isTyping: false,
  inputEnabled: false,
  inputValue: '',
  commandHistory: [],
  commandHistoryIndex: -1,
  currentDirectory: '~/pointlabs',
  typewriterComplete: false,
};

function generateId(): string {
  return `line-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function terminalReducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case 'ADD_LINE': {
      const newLine: TerminalLine = {
        ...action.payload,
        id: generateId(),
        timestamp: Date.now(),
      };
      return {
        ...state,
        history: [...state.history, newLine],
      };
    }

    case 'UPDATE_LINE': {
      return {
        ...state,
        history: state.history.map((line) =>
          line.id === action.payload.id
            ? { ...line, content: action.payload.content, isTyping: action.payload.isTyping }
            : line
        ),
      };
    }

    case 'SET_INPUT':
      return {
        ...state,
        inputValue: action.payload,
        commandHistoryIndex: -1,
      };

    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
      };

    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload,
      };

    case 'ENABLE_INPUT':
      return {
        ...state,
        inputEnabled: action.payload,
      };

    case 'ADD_TO_HISTORY':
      return {
        ...state,
        commandHistory: [action.payload, ...state.commandHistory].slice(0, 50),
        commandHistoryIndex: -1,
        inputValue: '',
      };

    case 'NAVIGATE_HISTORY': {
      const { commandHistory, commandHistoryIndex } = state;
      if (commandHistory.length === 0) return state;

      let newIndex: number;
      if (action.payload === 'up') {
        newIndex = Math.min(commandHistoryIndex + 1, commandHistory.length - 1);
      } else {
        newIndex = Math.max(commandHistoryIndex - 1, -1);
      }

      const newValue = newIndex === -1 ? '' : commandHistory[newIndex];
      return {
        ...state,
        commandHistoryIndex: newIndex,
        inputValue: newValue,
      };
    }

    case 'CLEAR':
      return {
        ...state,
        history: [],
      };

    case 'SET_TYPEWRITER_COMPLETE':
      return {
        ...state,
        typewriterComplete: true,
        mode: 'interactive',
        inputEnabled: true,
      };

    default:
      return state;
  }
}

export function useTerminalState() {
  const [state, dispatch] = useReducer(terminalReducer, initialState);

  const addLine = useCallback(
    (type: TerminalLine['type'], content: string, isTyping?: boolean) => {
      dispatch({ type: 'ADD_LINE', payload: { type, content, isTyping } });
    },
    []
  );

  const updateLine = useCallback(
    (id: string, content: string, isTyping?: boolean) => {
      dispatch({ type: 'UPDATE_LINE', payload: { id, content, isTyping } });
    },
    []
  );

  const setInput = useCallback((value: string) => {
    dispatch({ type: 'SET_INPUT', payload: value });
  }, []);

  const setMode = useCallback((mode: TerminalState['mode']) => {
    dispatch({ type: 'SET_MODE', payload: mode });
  }, []);

  const setTyping = useCallback((isTyping: boolean) => {
    dispatch({ type: 'SET_TYPING', payload: isTyping });
  }, []);

  const enableInput = useCallback((enabled: boolean) => {
    dispatch({ type: 'ENABLE_INPUT', payload: enabled });
  }, []);

  const addToHistory = useCallback((command: string) => {
    dispatch({ type: 'ADD_TO_HISTORY', payload: command });
  }, []);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    dispatch({ type: 'NAVIGATE_HISTORY', payload: direction });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const setTypewriterComplete = useCallback(() => {
    dispatch({ type: 'SET_TYPEWRITER_COMPLETE' });
  }, []);

  return {
    state,
    dispatch,
    addLine,
    updateLine,
    setInput,
    setMode,
    setTyping,
    enableInput,
    addToHistory,
    navigateHistory,
    clear,
    setTypewriterComplete,
  };
}

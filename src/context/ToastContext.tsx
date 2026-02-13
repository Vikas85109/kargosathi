import { createContext, useCallback, useContext, useReducer, type ReactNode } from 'react';
import type { Toast, ToastType } from '../types';

interface State {
  toasts: Toast[];
}

type Action =
  | { type: 'ADD'; toast: Toast }
  | { type: 'REMOVE'; id: string };

const ToastContext = createContext<{
  toasts: Toast[];
  toast: (type: ToastType, message: string) => void;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { toasts: [...state.toasts, action.toast] };
    case 'REMOVE':
      return { toasts: state.toasts.filter((t) => t.id !== action.id) };
    default:
      return state;
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { toasts: [] });

  const toast = useCallback((type: ToastType, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    dispatch({ type: 'ADD', toast: { id, type, message } });
    setTimeout(() => dispatch({ type: 'REMOVE', id }), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, toast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
}

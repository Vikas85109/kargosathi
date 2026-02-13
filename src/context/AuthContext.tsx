import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { SessionUser } from '../types';
import * as api from '../services/api';

interface State {
  user: SessionUser | null;
  loading: boolean;
}

type Action =
  | { type: 'SET_USER'; user: SessionUser | null }
  | { type: 'LOADED' };

interface AuthContextValue extends State {
  loginBroker: (phone: string, name: string) => Promise<void>;
  loginAdmin: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user, loading: false };
    case 'LOADED':
      return { ...state, loading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { user: null, loading: true });

  useEffect(() => {
    const saved = api.getSession();
    dispatch({ type: 'SET_USER', user: saved });
  }, []);

  const loginBroker = async (phone: string, name: string) => {
    const user = await api.loginBroker(phone, name);
    dispatch({ type: 'SET_USER', user });
  };

  const loginAdmin = async (username: string, password: string) => {
    const user = await api.loginAdmin(username, password);
    dispatch({ type: 'SET_USER', user });
  };

  const logout = () => {
    api.logout();
    dispatch({ type: 'SET_USER', user: null });
  };

  return (
    <AuthContext.Provider value={{ ...state, loginBroker, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}

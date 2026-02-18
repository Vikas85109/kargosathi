import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserRole } from '../types';
import { users } from '../mock/data';

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  userName: string;
  userId: string;
}

interface AuthContextValue extends AuthState {
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const roleUserMap: Record<UserRole, string> = {
  broker: 'U001',
  shipper: 'U002',
  transporter: 'U003',
  driver: 'U004',
  admin: 'U005',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    userName: '',
    userId: '',
  });

  const login = (role: UserRole) => {
    const user = users.find((u) => u.id === roleUserMap[role]);
    setState({
      isAuthenticated: true,
      role,
      userName: user?.name ?? role,
      userId: user?.id ?? '',
    });
  };

  const logout = () => {
    setState({ isAuthenticated: false, role: null, userName: '', userId: '' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}

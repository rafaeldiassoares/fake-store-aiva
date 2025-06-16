import { create } from 'zustand';
import { getToken, removeToken, setToken } from '../services/hooks/useToken';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>(set => ({
  token: getToken(),
  isAuthenticated: !!getToken(),
  login: (token: string) => {
    setToken(token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    removeToken();
    set({ token: null, isAuthenticated: false });
  },
}));

export function useAuthState() {
  const { token, isAuthenticated, login, logout } = useAuthStore();
  return { token, isAuthenticated, login, logout };
}

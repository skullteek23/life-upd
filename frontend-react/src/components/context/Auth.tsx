import { createContext, useContext, useState } from 'react';
import BrowserStorage from '../../utils/storage';

export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

type AuthContextType = {
  isLogged: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLogged, setIsLogged] = useState(() => Boolean(BrowserStorage.get(TOKEN_KEY)));

  const login = (token: string) => {
    setIsLogged(true);
    BrowserStorage.save(TOKEN_KEY, token);
  };
  const logout = () => {
    setIsLogged(false);
    BrowserStorage.remove(TOKEN_KEY);
    BrowserStorage.remove(USER_KEY);
  };

  return <AuthContext.Provider value={{ isLogged, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export default AuthProvider;

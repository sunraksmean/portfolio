// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';

const SESSION_KEY  = 'portfolio-admin-session';
const PASSWORD_KEY = 'portfolio-owner-pw';
const DEFAULT_PASSWORD = 'Admin@168';   // owner's password

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (newPw: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
  changePassword: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // sessionStorage → session resets when the browser tab is closed
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === 'true'; }
    catch { return false; }
  });

  const getPassword = () =>
    localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;

  const login = (password: string): boolean => {
    if (password === getPassword()) {
      setIsAdmin(true);
      sessionStorage.setItem(SESSION_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const changePassword = (newPw: string) =>
    localStorage.setItem(PASSWORD_KEY, newPw);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  authModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// localStorage-backed store (no backend)
type StoredUser = { name: string; email: string; phone: string; password: string };

const STORAGE_KEY = "tpr_users";
const SESSION_KEY = "tpr_session";

function loadUsers(): Map<string, StoredUser> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Map(JSON.parse(raw));
  } catch {}
  return new Map();
}

function saveUsers(users: Map<string, StoredUser>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...users]));
}

function loadSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(loadSession);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = useCallback(() => setAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), []);

  const register = useCallback((name: string, email: string, phone: string, password: string): boolean => {
    const users = loadUsers();
    if (users.has(email)) return false;
    users.set(email, { name, email, phone, password });
    saveUsers(users);
    const session = { name, email, phone };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return true;
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const users = loadUsers();
    const u = users.get(email);
    if (!u || u.password !== password) return false;
    const session = { name: u.name, email: u.email, phone: u.phone };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout, authModalOpen, openAuthModal, closeAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

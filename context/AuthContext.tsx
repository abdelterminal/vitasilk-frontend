"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi, setToken, removeToken, getToken, type User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  userData: User | null; // alias for backward compatibility
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    authApi.me()
      .then((res) => setUser(res.data))
      .catch(() => removeToken())
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const res = await authApi.login(email, password);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await authApi.register(name, email, password);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const refreshUser = async () => {
    const res = await authApi.me();
    setUser(res.data);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, userData: user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.jsx

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";

const AUTH_STORAGE_KEY = "msq-polyglot-auth";

export const USER_ROLES = {
  GUEST: "guest",
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
};

const AuthContext = createContext(undefined);

const getStoredSession = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredSession);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback(async ({ email, role = USER_ROLES.STUDENT }) => {
    setIsAuthLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const nextUser = {
        id: crypto.randomUUID(),
        email,
        role,
        name: email.split("@")[0],
      };
      setUser(nextUser);
      return nextUser;
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const register = useCallback(async ({ name, email, role = USER_ROLES.STUDENT }) => {
    setIsAuthLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const nextUser = {
        id: crypto.randomUUID(),
        email,
        role,
        name,
      };
      setUser(nextUser);
      return nextUser;
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      role: user?.role ?? USER_ROLES.GUEST,
      isAuthenticated: Boolean(user),
      isAuthLoading,
      login,
      register,
      logout,
    }),
    [user, isAuthLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
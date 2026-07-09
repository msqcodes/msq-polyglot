// src/context/ThemeContext.jsx

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { THEME_MODES, THEME_VARIABLES, DEFAULT_THEME_MODE } from "../config/theme";

const THEME_STORAGE_KEY = "msq-polyglot-theme";

const ThemeContext = createContext(undefined);

const getInitialTheme = () => {
  if (typeof window === "undefined") return DEFAULT_THEME_MODE;

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === THEME_MODES.LIGHT || stored === THEME_MODES.DARK) {
    return stored;
  }

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? THEME_MODES.DARK : THEME_MODES.LIGHT;
};

const applyThemeVariables = (mode) => {
  const root = document.documentElement;
  const variables = THEME_VARIABLES[mode];

  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  root.dataset.theme = mode;
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialTheme);

  useEffect(() => {
    applyThemeVariables(mode);
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((current) => (current === THEME_MODES.LIGHT ? THEME_MODES.DARK : THEME_MODES.LIGHT));
  }, []);

  const setTheme = useCallback((nextMode) => {
    if (nextMode === THEME_MODES.LIGHT || nextMode === THEME_MODES.DARK) {
      setMode(nextMode);
    }
  }, []);

  const value = useMemo(
    () => ({
      mode,
      isDark: mode === THEME_MODES.DARK,
      toggleTheme,
      setTheme,
    }),
    [mode, toggleTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

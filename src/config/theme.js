// src/config/theme.js

/**
 * Design tokens shared across the application.
 * Tailwind utility classes should reference these same values
 * via the Tailwind theme configuration (assumed already wired up).
 * This file exists for programmatic access (charts, inline SVGs,
 * dynamic styles, canvas-based UI, etc.) where Tailwind classes
 * are not applicable.
 */

export const COLORS = {
  primary: "#0F766E",
  secondary: "#14B8A6",
  accent: "#F59E0B",
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  dark: "#0F172A",
};

export const TYPOGRAPHY = {
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  sizes: {
    hero: "48px",
    h1: "36px",
    h2: "30px",
    h3: "24px",
    body: "16px",
    caption: "14px",
  },
};

export const SPACING_UNIT = 8;

export const spacing = (multiplier) => `${SPACING_UNIT * multiplier}px`;

export const RADIUS = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  full: "9999px",
};

export const SHADOWS = {
  sm: "0 1px 2px 0 rgb(15 23 42 / 0.05)",
  md: "0 4px 12px -2px rgb(15 23 42 / 0.08)",
  lg: "0 12px 32px -8px rgb(15 23 42 / 0.14)",
};

export const BREAKPOINTS = {
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
  largeDesktop: 1536,
};

export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
};

export const THEME_VARIABLES = {
  [THEME_MODES.LIGHT]: {
    "--color-background": COLORS.background,
    "--color-surface": COLORS.surface,
    "--color-text": COLORS.dark,
    "--color-border": "#E2E8F0",
  },
  [THEME_MODES.DARK]: {
    "--color-background": "#0B1220",
    "--color-surface": "#111827",
    "--color-text": "#F1F5F9",
    "--color-border": "#1E293B",
  },
};

export const DEFAULT_THEME_MODE = THEME_MODES.LIGHT;
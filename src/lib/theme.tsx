/* eslint-disable react-refresh/only-export-components -- ThemeProvider and useTheme form one public API. */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "dark" | "light";
const STORAGE_KEY = "radarme.theme";

type ThemeCtx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

function applyThemeClass(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default to dark. Client-only read from localStorage in an effect to
  // avoid SSR hydration mismatches.
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
        applyThemeClass(saved);
      } else {
        applyThemeClass("dark");
      }
    } catch {
      applyThemeClass("dark");
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    applyThemeClass(t);
    try {
      window.localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

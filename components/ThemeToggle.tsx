'use client';

import { useEffect, useState } from 'react';

type ThemeMode = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredThemeMode(): ThemeMode {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
  } catch (_error) {
    // Ignore localStorage access errors and fall back to system.
  }
  return 'system';
}

function setStoredThemeMode(mode: ThemeMode) {
  try {
    localStorage.setItem('theme', mode);
  } catch (_error) {
    // Ignore localStorage access errors.
  }
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  useEffect(() => {
    const root = document.documentElement;
    const initialMode = getStoredThemeMode();
    const initialResolved = initialMode === 'system' ? getSystemTheme() : initialMode;

    root.classList.toggle('dark', initialResolved === 'dark');
    setMode(initialMode);
    setResolvedTheme(initialResolved);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (getStoredThemeMode() === 'system') {
        const next = getSystemTheme();
        root.classList.toggle('dark', next === 'dark');
        setResolvedTheme(next);
      }
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, []);

  const setTheme = (nextMode: ThemeMode) => {
    const root = document.documentElement;
    const nextResolved = nextMode === 'system' ? getSystemTheme() : nextMode;
    root.classList.toggle('dark', nextResolved === 'dark');
    setStoredThemeMode(nextMode);
    setMode(nextMode);
    setResolvedTheme(nextResolved);
  };

  return (
    <div
      className="inline-flex items-center rounded-full border border-tp-line bg-white/70 p-1 text-xs font-medium text-tp-slate shadow-sm dark:bg-slate-900/70 sm:text-sm"
      role="group"
      aria-label={`Theme mode (currently ${mode}, ${resolvedTheme})`}
    >
      <button
        type="button"
        onClick={() => setTheme('system')}
        aria-pressed={mode === 'system'}
        className={`rounded-lg px-2.5 py-1.5 transition-colors ${
          mode === 'system'
            ? 'rounded-full bg-tp-teal text-white shadow-sm'
            : 'rounded-full text-tp-muted hover:bg-white/75 hover:text-tp-ink dark:hover:bg-slate-800/60'
        }`}
      >
        <span className="sm:hidden">S</span>
        <span className="hidden sm:inline">System</span>
      </button>
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={mode === 'light'}
        className={`rounded-lg px-2.5 py-1.5 transition-colors ${
          mode === 'light'
            ? 'rounded-full bg-tp-teal text-white shadow-sm'
            : 'rounded-full text-tp-muted hover:bg-white/75 hover:text-tp-ink dark:hover:bg-slate-800/60'
        }`}
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={mode === 'dark'}
        className={`rounded-lg px-2.5 py-1.5 transition-colors ${
          mode === 'dark'
            ? 'rounded-full bg-tp-teal text-white shadow-sm'
            : 'rounded-full text-tp-muted hover:bg-white/75 hover:text-tp-ink dark:hover:bg-slate-800/60'
        }`}
      >
        Dark
      </button>
    </div>
  );
}

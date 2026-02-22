'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch (_error) {
    // Ignore localStorage access errors and fall back to system.
  }
  return getSystemTheme();
}

function setStoredTheme(theme: Theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (_error) {
    // Ignore localStorage access errors.
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = document.documentElement;
    const initialTheme = getStoredTheme();
    root.classList.toggle('dark', initialTheme === 'dark');
    setTheme(initialTheme);
  }, []);

  const onToggle = () => {
    const root = document.documentElement;
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    root.classList.toggle('dark', nextTheme === 'dark');
    setStoredTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-tp-line bg-white/70 px-2 py-1 text-xs font-medium text-tp-slate shadow-sm transition-colors hover:bg-white dark:bg-slate-900/70 dark:hover:bg-slate-900 sm:text-sm"
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label={theme === 'dark' ? 'Disable dark mode' : 'Enable dark mode'}
    >
      <span className="hidden sm:inline">{theme === 'dark' ? 'Dark' : 'Light'}</span>
      <span
        className={`inline-flex h-5 w-10 items-center rounded-full border border-tp-line transition-colors ${
          theme === 'dark' ? 'justify-end bg-tp-teal' : 'justify-start bg-slate-300'
        }`}
      >
        <span className="mx-0.5 h-3.5 w-3.5 rounded-full bg-white shadow-sm" />
      </span>
    </button>
  );
}

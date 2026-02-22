import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tp: {
          bg: 'hsl(var(--tp-bg))',
          ink: 'hsl(var(--tp-ink))',
          muted: 'hsl(var(--tp-muted))',
          teal: 'hsl(var(--tp-teal))',
          slate: 'hsl(var(--tp-slate))',
          line: 'hsl(var(--tp-line))',
        },
      },
      borderRadius: {
        glass: '1.35rem',
      },
      boxShadow: {
        soft: '0 20px 40px rgba(15, 23, 42, 0.08)',
        glass: '0 16px 36px rgba(8, 47, 73, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;

import type { CSSProperties, ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function GlassCard({ children, className = '', style }: GlassCardProps) {
  return (
    <div
      style={style}
      className={`rounded-glass border border-white/55 bg-white/60 p-6 shadow-glass backdrop-blur-xl transition-transform duration-200 md:hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-900/45 ${className}`}
    >
      {children}
    </div>
  );
}

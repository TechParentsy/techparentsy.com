import type { ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`rounded-glass border border-white/55 bg-white/55 p-6 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/45 ${className}`}
    >
      {children}
    </div>
  );
}

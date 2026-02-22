import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'disabled';
  className?: string;
  title?: string;
  disabled?: boolean;
};

const base =
  'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition-colors duration-200';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-tp-teal text-white hover:bg-teal-700',
  secondary:
    'border border-tp-line bg-white/80 text-tp-slate hover:bg-white dark:bg-slate-900/70 dark:hover:bg-slate-900/95',
  ghost:
    'border border-transparent bg-white/35 text-tp-ink hover:bg-white/65 dark:bg-slate-900/40 dark:hover:bg-slate-900/75',
  disabled: 'cursor-not-allowed border border-tp-line bg-slate-100 text-slate-400 dark:bg-slate-900/55 dark:text-slate-500',
};

export function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  title,
  disabled = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} title={title}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} title={title} disabled={disabled} aria-disabled={disabled}>
      {children}
    </button>
  );
}

import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, title, children, className = '' }: SectionHeadingProps) {
  return (
    <header className={`max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-tp-muted">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-tp-ink sm:text-4xl">{title}</h2>
      {children ? <div className="mt-4 text-pretty text-lg leading-relaxed text-tp-muted">{children}</div> : null}
    </header>
  );
}

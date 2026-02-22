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
      <h2 className="tp-h2">{title}</h2>
      {children ? <div className="tp-body mt-4 text-pretty">{children}</div> : null}
    </header>
  );
}

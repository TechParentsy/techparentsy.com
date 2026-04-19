'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';

import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';

type LayerCard = {
  title: string;
  description: string;
};

type LayersSectionProps = {
  cards: LayerCard[];
};

/* Each card's scattered start position and stagger delay (ms). */
const SCATTER = [
  { x: -34, y: 28, r: -3.2, delay: 0 },
  { x: 38, y: 44, r: 2.6, delay: 150 },
  { x: -28, y: 60, r: -2, delay: 300 },
  { x: 24, y: 76, r: 1.5, delay: 450 },
];

/* Progressive shadow depth — higher layers cast deeper shadows. */
const SHADOWS = [
  '0 2px 12px rgba(8,47,73,.06), 0 1px 4px rgba(8,47,73,.04)',
  '0 4px 20px rgba(8,47,73,.08), 0 2px 6px rgba(8,47,73,.05)',
  '0 8px 28px rgba(8,47,73,.11), 0 3px 8px rgba(8,47,73,.06)',
  '0 14px 40px rgba(8,47,73,.14), 0 4px 12px rgba(8,47,73,.07)',
];

export function LayersSection({ cards }: LayersSectionProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-20 pb-8 sm:pt-24 sm:pb-10" aria-label="Layered framework">
      <Container>
        <SectionHeading eyebrow="Framework" title="A layered approach." className="mb-10" />
        <div
          ref={stackRef}
          className="relative mx-auto w-full max-w-[46rem]"
          style={{ perspective: '1000px' }}
        >
          {/* Ambient teal glow behind the stack */}
          <div
            className="pointer-events-none absolute -inset-12 -z-10 rounded-[2rem] transition-opacity duration-[1200ms]"
            style={{
              opacity: revealed ? 1 : 0,
              background:
                'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(20,184,166,.09), transparent)',
            }}
          />

          {cards.map((layer, index) => {
            const s = SCATTER[index] ?? SCATTER[0];
            const shadow = SHADOWS[index] ?? SHADOWS[0];

            const style: CSSProperties = {
              position: 'relative',
              zIndex: index + 1,
              opacity: revealed ? 1 : 0,
              boxShadow: revealed ? shadow : 'none',
              transform: revealed
                ? 'translate3d(0,0,0) rotate(0deg) scale(1)'
                : `translate3d(${s.x}px,${s.y}px,0) rotate(${s.r}deg) scale(0.94)`,
              transition: [
                `transform 720ms cubic-bezier(0.22,1.3,0.36,1) ${s.delay}ms`,
                `opacity 480ms ease-out ${s.delay}ms`,
                `box-shadow 600ms ease-out ${s.delay}ms`,
              ].join(', '),
            };

            return (
              <div
                key={layer.title}
                className={index > 0 ? '-mt-5 sm:-mt-6' : ''}
                style={style}
              >
                <div className="relative overflow-hidden rounded-glass border border-white/55 bg-white/92 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90">
                  {/* Teal gradient accent bar */}
                  <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-teal-400 to-teal-600 dark:from-teal-400/80 dark:to-teal-600/60" />

                  <div className="flex items-start gap-4 pl-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-tp-teal/10 text-xs font-bold tabular-nums text-tp-teal dark:bg-tp-teal/15">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="tp-h3">{layer.title}</h3>
                      <p className="tp-small mt-2">{layer.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

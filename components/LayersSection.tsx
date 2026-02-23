'use client';

import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

import { Container } from '@/components/Container';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeading } from '@/components/SectionHeading';
import { useScrollSectionProgress } from '@/hooks/useScrollSectionProgress';

type LayerCard = {
  title: string;
  description: string;
};

type LayersSectionProps = {
  cards: LayerCard[];
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

export function LayersSection({ cards }: LayersSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const jumpedRef = useRef(false);
  const lastProgressRef = useRef(0);
  const jumpTimeoutRef = useRef<number | null>(null);

  const progress = useScrollSectionProgress(listRef);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [offsets, setOffsets] = useState<number[]>([]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const setFromMedia = () => setReducedMotion(media.matches);
    setFromMedia();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', setFromMedia);
      return () => media.removeEventListener('change', setFromMedia);
    }

    media.addListener(setFromMedia);
    return () => media.removeListener(setFromMedia);
  }, []);

  useEffect(() => {
    const measure = () => {
      const nodes = cardRefs.current;
      if (!nodes.length || !nodes[0]) return;

      const firstTop = nodes[0].offsetTop;
      const nextOffsets = nodes.map((node) => {
        if (!node) return 0;
        return node.offsetTop - firstTop;
      });
      setOffsets(nextOffsets);
    };

    const raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [cards.length]);

  useEffect(() => {
    if (reducedMotion) return;

    const previous = lastProgressRef.current;
    const crossedDownward = progress < previous;
    const crossedThreshold = previous < 0.78 && progress >= 0.78;
    lastProgressRef.current = progress;

    // Trigger only once, only when crossing threshold while scrolling down.
    if (jumpedRef.current || crossedDownward || !crossedThreshold) return;

    const current = sectionRef.current;
    const nextSection = current?.nextElementSibling as HTMLElement | null;
    if (!nextSection) return;

    jumpedRef.current = true;
    jumpTimeoutRef.current = window.setTimeout(() => {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      jumpTimeoutRef.current = null;
    }, 360);
  }, [progress, reducedMotion]);

  useEffect(() => {
    return () => {
      if (jumpTimeoutRef.current !== null) {
        window.clearTimeout(jumpTimeoutRef.current);
      }
    };
  }, []);

  const cardStyles = useMemo(() => {
    if (reducedMotion) {
      return cards.map(() => ({} as CSSProperties));
    }

    // Explicit stagger windows tuned for readable, sequential stacking.
    const timing = [
      { start: 0, duration: 0 }, // card 1 stays base
      { start: 0.2, duration: 0.22 }, // card 2
      { start: 0.45, duration: 0.22 }, // card 3
      { start: 0.62, duration: 0.12 }, // card 4
    ];

    return cards.map((_, index) => {
      if (index === 0) {
        return {
          zIndex: 1,
          transition: 'transform 320ms ease-out, opacity 280ms ease-out, box-shadow 320ms ease-out',
        } as CSSProperties;
      }

      const { start, duration } = timing[index] ?? { start: 0.72 + (index - 3) * 0.14, duration: 0.14 };
      const end = start + duration;
      const rawT = clamp((progress - start) / (end - start), 0, 1);
      const cardT = smoothstep(rawT);

      const targetOffset = offsets[index] ?? index * 220;
      const translateY = -targetOffset * cardT;
      const scale = 1 - (cards.length - 1 - index) * 0.003 * cardT;
      const shadowAlpha = clamp(0.1 + index * 0.024 * cardT, 0.08, 0.2);

      return {
        transform: `translateY(${translateY.toFixed(1)}px) scale(${scale.toFixed(4)})`,
        zIndex: index + 1,
        boxShadow: `0 18px 36px rgba(15, 23, 42, ${shadowAlpha.toFixed(3)})`,
        transition: 'transform 320ms ease-out, box-shadow 320ms ease-out',
      } as CSSProperties;
    });
  }, [cards, offsets, progress, reducedMotion]);

  return (
    <section ref={sectionRef} className="pt-20 pb-8 sm:pt-24 sm:pb-10" aria-label="Layered framework">
      <Container>
        <div ref={listRef} className={reducedMotion ? 'relative' : 'relative min-h-[300vh]'}>
          <div className={reducedMotion ? '' : 'sticky top-16'}>
            <SectionHeading eyebrow="Framework" title="A layered approach." className="mb-8" />
            <div className="mx-auto flex w-full max-w-[46rem] flex-col gap-4">
              {cards.map((layer, index) => (
                <div
                  key={layer.title}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className="relative will-change-transform"
                  style={cardStyles[index]}
                >
                  <GlassCard className="min-h-[200px] bg-white/90 dark:bg-slate-900/86">
                    <h3 className="tp-h3">{layer.title}</h3>
                    <p className="tp-small mt-3 max-w-prose">{layer.description}</p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

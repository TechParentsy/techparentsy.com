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

  const progressPinned = useScrollSectionProgress(listRef);
  const progressFlow = useScrollSectionProgress(sectionRef);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [offsets, setOffsets] = useState<number[]>([]);
  const usePin = !reducedMotion && !isMobile;
  const progress = usePin ? progressPinned : progressFlow;

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
    const media = window.matchMedia('(max-width: 767px)');
    const setFromMedia = () => setIsMobile(media.matches);
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

  const cardStyles = useMemo(() => {
    if (reducedMotion || isMobile) {
      return cards.map(() => ({} as CSSProperties));
    }

    const timing = usePin
      ? [
          { start: 0, duration: 0 }, // card 1 stays base
          { start: 0.2, duration: 0.22 }, // card 2
          { start: 0.45, duration: 0.22 }, // card 3
          { start: 0.62, duration: 0.12 }, // card 4
        ]
      : [
          { start: 0, duration: 0 },
          { start: 0.34, duration: 0.22 },
          { start: 0.52, duration: 0.2 },
          { start: 0.68, duration: 0.18 },
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
      const scale = usePin ? 1 - (cards.length - 1 - index) * 0.003 * cardT : 1;
      const shadowAlpha = usePin ? clamp(0.1 + index * 0.024 * cardT, 0.08, 0.2) : 0.12;

      return {
        transform: `translateY(${translateY.toFixed(1)}px) scale(${scale.toFixed(4)})`,
        zIndex: index + 1,
        boxShadow: `0 18px 36px rgba(15, 23, 42, ${shadowAlpha.toFixed(3)})`,
        transition: usePin
          ? 'transform 320ms ease-out, box-shadow 320ms ease-out'
          : 'transform 220ms linear, box-shadow 220ms linear',
      } as CSSProperties;
    });
  }, [cards, isMobile, offsets, progress, reducedMotion, usePin]);

  return (
    <section ref={sectionRef} className="pt-20 pb-8 sm:pt-24 sm:pb-10" aria-label="Layered framework">
      <Container>
        <div ref={listRef} className={usePin ? 'relative min-h-[300vh]' : 'relative'}>
          <div className={usePin ? 'sticky top-16' : ''}>
            <SectionHeading eyebrow="Framework" title="A layered approach." className="mb-8" />
            <div className="mx-auto flex w-full max-w-[46rem] flex-col gap-4">
              {cards.map((layer, index) => (
                <div
                  key={layer.title}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className={usePin ? 'relative will-change-transform' : 'relative'}
                  style={cardStyles[index]}
                >
                  <GlassCard className="min-h-[200px] bg-white/90 dark:bg-slate-900/86">
                    <h3 className="tp-h3">{layer.title}</h3>
                    <p className="tp-small mt-3">{layer.description}</p>
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

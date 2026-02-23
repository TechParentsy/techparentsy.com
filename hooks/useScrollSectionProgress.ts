'use client';

import { RefObject, useEffect, useState } from 'react';

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

export function useScrollSectionProgress(sectionRef: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reducedMotion = media.matches;
    if (reducedMotion) {
      setProgress(0);
      return;
    }

    let frame = 0;
    let inView = false;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      // Progress starts as section enters viewport and reaches 1 when it fully passes.
      const next = clamp01((viewportHeight - rect.top) / (viewportHeight + rect.height));

      setProgress((prev) => (Math.abs(prev - next) > 0.001 ? next : prev));
    };

    const scheduleUpdate = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (inView) {
          updateProgress();
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        inView = entry.isIntersecting;

        if (inView) {
          updateProgress();
        } else {
          setProgress(0);
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
      }
    );

    observer.observe(section);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [sectionRef]);

  return progress;
}

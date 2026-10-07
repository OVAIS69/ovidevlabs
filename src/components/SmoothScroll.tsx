import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    // Only enable Lenis smooth wheel on devices with mouse/pointer
    // On touchscreens/mobile, use native 120Hz GPU touch scrolling
    const isTouchDevice = 'ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches;
    if (isTouchDevice) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      syncTouch: false,
      prevent: (node) => {
        return (
          !!node?.closest?.('[data-lenis-prevent]') ||
          !!node?.closest?.('#case-study-modal') ||
          !!node?.closest?.('.lenis-prevent') ||
          !!node?.closest?.('.modal-container')
        );
      },
    });

    (window as any).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return null;
}

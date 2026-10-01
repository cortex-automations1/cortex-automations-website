"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Digits after the decimal point, so "5.0" stays "5.0" rather than "5". */
  decimals?: number;
  className?: string;
}

/**
 * Renders the real value by default — on the server, for crawlers and link
 * previews, and for anyone whose browser never runs the animation — and only
 * counts up from zero once the element scrolls into view.
 */
export function AnimatedCounter({
  target,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let settle = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const ms = duration * 1000;
        function tick(now: number) {
          const t = Math.min((now - start) / ms, 1);
          // ease-out-cubic — same shape as framer's default spring tail
          setValue((1 - Math.pow(1 - t, 3)) * target);
          if (t < 1) raf = requestAnimationFrame(tick);
        }
        setValue(0);
        raf = requestAnimationFrame(tick);
        // Browsers throttle animation frames in background tabs; make sure the
        // count always lands on the real value instead of stalling midway.
        settle = window.setTimeout(() => {
          cancelAnimationFrame(raf);
          setValue(target);
        }, ms + 250);
      },
      { rootMargin: "-40px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

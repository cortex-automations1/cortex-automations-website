"use client";

import { useState, useEffect, useCallback } from "react";
import { Pause, Play } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Honor prefers-reduced-motion: auto-pause and stay paused on
  // preference change.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing to a client-only media-query default on mount
      setAutoPlay(false);
    }
    function onChange(e: MediaQueryListEvent) {
      if (e.matches) setAutoPlay(false);
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    setAutoPlay(false);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <section className="section-padding bg-surface-0 border-t border-surface-200">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold text-heading mb-12">
            What Clients <span className="brand-underline">Say</span>
          </h2>
        </ScrollReveal>

        <div className="relative min-h-[240px]">
          {/* React `key` on activeIndex unmounts/remounts this div, which
              retriggers the .testimonial-fade CSS animation. Replaces
              framer-motion's AnimatePresence for a much smaller bundle. */}
          <div key={activeIndex} className="testimonial-fade">
            <span className="text-accent-400 text-7xl font-serif leading-none select-none block mb-4">
              &ldquo;
            </span>
            <p className="text-subtle text-lg md:text-xl leading-relaxed mb-8">
              {TESTIMONIALS[activeIndex].quote}
            </p>
            <div>
              <p className="text-heading font-semibold">
                {TESTIMONIALS[activeIndex].author}
              </p>
              <p className="text-muted text-sm">
                {TESTIMONIALS[activeIndex].role},{" "}
                {TESTIMONIALS[activeIndex].company}
              </p>
            </div>
          </div>
        </div>

        {/* Dot indicators + pause/play (WCAG 2.2.2) */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
              className={`w-2.5 h-2.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 ${
                i === activeIndex ? "bg-brand-500" : "bg-surface-300"
              }`}
            />
          ))}
          <button
            type="button"
            onClick={() => setAutoPlay((p) => !p)}
            aria-label={
              autoPlay ? "Pause testimonial carousel" : "Resume testimonial carousel"
            }
            aria-pressed={!autoPlay}
            className="ml-2 p-1.5 rounded-full text-body hover:text-heading hover:bg-surface-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </section>
  );
}

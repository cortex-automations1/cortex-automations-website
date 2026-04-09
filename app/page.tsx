"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES, PROJECTS, PROCESS_STEPS, TESTIMONIALS } from "@/lib/constants";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/scroll-reveal";
import { Smartphone, Monitor, Brain } from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "saas-platforms": Layers,
  "mobile-apps": Smartphone,
  "web-design": Monitor,
  "ai-automation": Brain,
};

const TRUST_ITEMS = ["Next.js", "TypeScript", "React", "PostgreSQL", "Tailwind CSS"];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setAutoPlay(false);
    },
    []
  );

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <>
      {/* ——— HERO ——— */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden section-padding bg-surface-0">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          {/* Left — 60 % */}
          <ScrollReveal className="w-full lg:w-[60%]">
            <span className="inline-block px-4 py-1.5 rounded-full border border-surface-300 bg-surface-100/50 text-neutral-300 text-sm font-medium mb-8">
              Software that works as hard as you do
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              We build the software your business{" "}
              <span className="brand-underline">runs&nbsp;on</span>
            </h1>

            <p className="text-neutral-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              From custom platforms to client-facing websites, we help businesses
              automate, grow, and look great doing it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 group"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-surface-100 text-white font-medium rounded-lg border border-surface-200 hover:bg-surface-200 transition-colors flex items-center justify-center gap-2"
              >
                See Our Work
              </Link>
            </div>
          </ScrollReveal>

          {/* Right — 40 % decorative */}
          <div className="hidden lg:flex w-[40%] items-center justify-center">
            <div className="bg-brand-500/10 border border-brand-500/20 rounded-3xl w-full aspect-square rotate-12" />
          </div>
        </div>
      </section>

      {/* ——— TRUST BAR ——— */}
      <section className="border-y border-surface-200 bg-surface-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-6">
            Built with tools that scale
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-3 text-neutral-300 font-medium">
            {TRUST_ITEMS.map((item, i) => (
              <span key={item} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-surface-300 select-none" aria-hidden="true">
                    &middot;
                  </span>
                )}
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ——— VALUE PROPS ——— */}
      <section className="section-padding bg-surface-0">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            What Makes Us <span className="brand-underline">Different</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mb-12">
            We build custom software from scratch. No templates, no shortcuts
            &mdash; just clean code that does exactly what your business needs.
          </p>

          <div className="flex flex-col md:flex-row gap-10">
            {[
              {
                Icon: Layers,
                title: "Custom Architecture",
                desc: "Every project is purpose-built — no cookie-cutter templates or bloated frameworks.",
              },
              {
                Icon: ShieldCheck,
                title: "Security by Default",
                desc: "Encrypted data, OWASP best practices, and role-based access from day one.",
              },
              {
                Icon: Zap,
                title: "Built to Scale",
                desc: "Infrastructure designed for growth so you never outpace your own product.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— SERVICES TEASER ——— */}
      <section className="section-padding bg-surface-50 border-t border-surface-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                What We <span className="brand-underline">Build</span>
              </h2>
              <p className="text-neutral-400 text-lg max-w-xl">
                Apps, websites, and automations that help you get more done
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center text-brand-400 hover:text-brand-300 font-medium transition-colors group"
            >
              See all services
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.slice(0, 4).map((service) => {
              const Icon = SERVICE_ICONS[service.slug] ?? Layers;
              return (
                <StaggerItem key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block p-6 rounded-xl bg-surface-50 border border-surface-200 hover:border-brand-500/50 transition-colors group h-full"
                  >
                    <div className="w-10 h-10 rounded-lg bg-surface-200 border border-surface-300 flex items-center justify-center mb-4 group-hover:bg-brand-500/10 transition-colors">
                      <Icon className="w-5 h-5 text-brand-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {service.name}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {service.shortDescription}
                    </p>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ——— HOW WE WORK (horizontal stepper) ——— */}
      <section className="section-padding bg-surface-0 border-t border-surface-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-500 mb-4">Process</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              How We <span className="brand-underline">Work</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              From first call to production deployment &mdash; a clear process
              with no surprises.
            </p>
          </div>

          {/* Desktop: horizontal stepper */}
          <div className="hidden lg:flex items-start relative">
            {/* Connecting line */}
            <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-surface-300" />

            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="flex-1 flex flex-col items-center text-center px-4 relative"
              >
                <div className="w-12 h-12 rounded-full bg-surface-100 border-2 border-brand-500/40 text-brand-400 font-bold text-lg flex items-center justify-center mb-5 relative z-10">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: stacked */}
          <div className="flex flex-col gap-8 lg:hidden">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-surface-100 border-2 border-brand-500/40 text-brand-400 font-bold flex items-center justify-center">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— FEATURED PROJECTS ——— */}
      <section className="section-padding bg-surface-50 border-t border-surface-200">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Recent <span className="brand-underline">Projects</span>
              </h2>
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                A few things we&apos;ve built recently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.slice(0, 2).map((project) => (
                <div
                  key={project.slug}
                  className="p-8 rounded-2xl bg-surface-50 border border-surface-200"
                >
                  <span className="text-brand-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {project.name}
                  </h3>
                  <p className="text-neutral-400 mb-8">{project.tagline}</p>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center px-5 py-2.5 rounded-lg bg-surface-200 text-white font-medium hover:bg-surface-300 transition-colors gap-2 group"
                  >
                    See the Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/portfolio"
                className="inline-flex items-center text-brand-400 hover:text-brand-300 font-medium transition-colors group"
              >
                Explore all projects
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ——— TESTIMONIALS (carousel) ——— */}
      <section className="section-padding bg-surface-0 border-t border-surface-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
              What Clients <span className="brand-underline">Say</span>
            </h2>
          </ScrollReveal>

          <div className="relative min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-accent-400 text-7xl font-serif leading-none select-none block mb-4">
                  &ldquo;
                </span>
                <p className="text-neutral-200 text-lg md:text-xl leading-relaxed mb-8">
                  {TESTIMONIALS[activeIndex].quote}
                </p>
                <div>
                  <p className="text-white font-semibold">
                    {TESTIMONIALS[activeIndex].author}
                  </p>
                  <p className="text-neutral-500 text-sm">
                    {TESTIMONIALS[activeIndex].role},{" "}
                    {TESTIMONIALS[activeIndex].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === activeIndex ? "bg-brand-500" : "bg-surface-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

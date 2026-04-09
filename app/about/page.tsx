import type { Metadata } from "next";
import { VALUES, PROCESS_STEPS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "Meet the team behind Cortex Automations. Built by engineers, driven by results.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-surface-0 border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-heading mb-6 tracking-tight max-w-4xl leading-tight">
            The People Behind the <span className="brand-underline">Code</span>
          </h1>
          <p className="text-body text-lg md:text-xl max-w-2xl leading-relaxed">
            Cortex Automations is a small, focused dev shop. We build custom software for
            businesses that need more than a template.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-24 bg-surface-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-heading">
                  How We Think About Software
                </h2>
                <p className="text-body leading-relaxed text-lg">
                  Good software should be invisible — it just works. That&apos;s what we aim for
                  every time. We care about the backend being as solid as the frontend looks,
                  because a beautiful interface on top of fragile infrastructure helps nobody.
                </p>
                <p className="text-body leading-relaxed text-lg">
                  We&apos;ve built everything from multi-tenant SaaS platforms to local business
                  websites. The common thread? We listen first, build second, and don&apos;t stop
                  until it works exactly the way you need it to.
                </p>
              </div>
            </ScrollReveal>

            {/* Inline stats paragraph */}
            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl bg-surface-100 border border-surface-200">
                <p className="text-subtle leading-loose text-lg">
                  We&apos;ve shipped{" "}
                  <AnimatedCounter
                    target={50}
                    suffix="+"
                    className="text-3xl font-bold text-brand-400"
                  />{" "}
                  projects with a{" "}
                  <AnimatedCounter
                    target={99}
                    suffix=".9%"
                    className="text-3xl font-bold text-brand-400"
                  />{" "}
                  uptime SLA and a{" "}
                  <AnimatedCounter
                    target={4}
                    suffix=".9/5"
                    className="text-3xl font-bold text-brand-400"
                  />{" "}
                  client satisfaction rating.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <ScrollReveal>
        <section className="py-24 bg-surface-0 relative z-10 border-t border-surface-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-heading mb-4">
                What We Care About
              </h2>
              <p className="text-body text-lg max-w-2xl mx-auto">
                The stuff that matters to us beyond the code
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {VALUES.map(function (value) {
                return (
                  <div
                    key={value.title}
                    className="p-8 rounded-2xl bg-surface-50 border border-surface-200 border-l-4 border-l-brand-500"
                  >
                    <h3 className="text-xl font-bold text-heading mb-3">{value.title}</h3>
                    <p className="text-body leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* METHODOLOGY / PROCESS */}
      <section className="py-24 bg-surface-50 relative z-10 border-y border-surface-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-heading mb-4">
              The Cortex Methodology
            </h2>
            <p className="text-body text-lg max-w-2xl">
              A systematic approach to building resilient software.
            </p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-300 before:to-transparent">
            {PROCESS_STEPS.map(function (step) {
              return (
                <div
                  key={step.number}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface-50 bg-surface-200 text-brand-400 font-mono text-sm font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    {step.number}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-surface-100 border border-surface-200 shadow-lg">
                    <h3 className="text-xl font-bold text-heading mb-2">{step.title}</h3>
                    <p className="text-body leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <ScrollReveal>
        <section className="py-24 bg-surface-0 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-heading mb-4">Meet the founder</h2>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-3xl">
                <div className="p-8 md:p-12 rounded-3xl bg-surface-50 border border-surface-200 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
                  {/* Avatar */}
                  <div className="shrink-0 relative">
                    <div className="absolute inset-0 bg-brand-500/20 blur-2xl rounded-full" />
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl border border-brand-500/30 bg-surface-100/80 backdrop-blur-sm text-4xl font-bold text-brand-400 shadow-xl shadow-surface-0/50">
                      DP
                    </div>
                  </div>

                  {/* Bio Content */}
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold text-heading mb-1">David Perez</h3>
                    <p className="text-brand-400 font-medium mb-6">Founder &amp; Lead Engineer</p>
                    <p className="text-body leading-relaxed text-lg mb-8">
                      Full-stack developer who loves building things that work. Started Cortex
                      Automations to help businesses get the custom software they actually need —
                      not another template with a logo swap. When I&apos;m not coding, you&apos;ll
                      find me exploring new tech, working on side projects, or figuring out how to
                      automate something that shouldn&apos;t take as long as it does.
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      <span className="px-3 py-1.5 rounded-lg bg-surface-100 border border-surface-200 text-subtle text-xs font-medium">
                        Full-Stack Architecture
                      </span>
                      <span className="px-3 py-1.5 rounded-lg bg-surface-100 border border-surface-200 text-subtle text-xs font-medium">
                        UI/UX Design
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}

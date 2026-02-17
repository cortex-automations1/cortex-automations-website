import type { Metadata } from "next";
import { CheckCircle, Layers, Smartphone, Monitor, Brain, MessageSquare, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { CTASection } from "@/components/sections/cta-section";
import { SERVICES, PROCESS_STEPS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Full-stack development services: SaaS platforms, mobile apps, web design, AI automation, and technical consulting.",
  path: "/services",
});

const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Smartphone,
  Monitor,
  Brain,
  MessageSquare,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-padding">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-brand-500/8 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
            From SaaS platforms to AI integrations, we offer end-to-end
            development services for businesses that need reliable, scalable software.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      {SERVICES.map(function (service, index) {
        const Icon = ICON_MAP[service.icon] || Layers;
        const reversed = index % 2 !== 0;

        return (
          <section
            key={service.slug}
            id={service.slug}
            className="relative section-padding"
          >
            <div className="absolute inset-0 -z-10 border-t border-white/5" />
            {index % 2 !== 0 && (
              <div className="absolute inset-0 -z-10 bg-surface-50" />
            )}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div
                className={`flex flex-col items-center gap-12 lg:gap-16 ${
                  reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                {/* Features card */}
                <div className="w-full lg:w-1/2">
                  <div className="card-gradient-border p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
                      Key Features
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {service.features.map(function (feature) {
                        return (
                          <li key={feature} className="flex items-start gap-2.5">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                            <span className="text-sm text-neutral-300">{feature}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Text content */}
                <div className="w-full lg:w-1/2">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    {service.name}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-neutral-400">
                    {service.description}
                  </p>

                  {/* Tech stack pills */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-neutral-500">
                      Technologies
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {service.techStack.map(function (tech) {
                        return (
                          <span
                            key={tech}
                            className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-300"
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Process */}
      <section className="relative section-padding">
        <div className="absolute inset-0 -z-10 border-t border-white/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Process"
            subtitle="Every project follows a proven four-step process."
          />
          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent lg:block" />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map(function (step) {
                return (
                  <div key={step.number} className="relative text-center">
                    <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-brand-500/30 bg-surface-100 text-xl font-bold text-brand-400 glow-brand-sm">
                      {step.number}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-400">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Have a project in mind?"
        subtitle="Let's discuss your requirements and find the right solution."
      />
    </>
  );
}

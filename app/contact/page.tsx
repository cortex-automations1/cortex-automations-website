import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { LeadForm } from "@/components/ui/lead-form";
import { CTASection } from "@/components/sections/cta-section";
import { CAL_LINK, SOCIAL_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with Cortex Automations. Book a discovery call or tell us about your project.",
  path: "/contact",
});

export default function ContactPage() {
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
            Let&apos;s <span className="text-gradient">Talk</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
            Have a project in mind? Book a call or send us a message
            and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="relative section-padding">
        <div className="absolute inset-0 -z-10 border-t border-white/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Lead Form */}
            <div>
              <h2 className="text-2xl font-bold text-white">
                Tell us about your project
              </h2>
              <p className="mt-2 text-neutral-400">
                Fill out the form below and we&apos;ll reach out to discuss your needs.
              </p>
              <div className="mt-8">
                <LeadForm />
              </div>
            </div>

            {/* Right: Cal.com Embed + Info */}
            <div>
              <h2 className="text-2xl font-bold text-white">
                Book a discovery call
              </h2>
              <p className="mt-2 text-neutral-400">
                Prefer to talk live? Schedule a free 30-minute call at a time that works for you.
              </p>
              <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-surface-100">
                <iframe
                  src={`${CAL_LINK}?embed=true&theme=dark&layout=month_view`}
                  title="Book a discovery call"
                  className="h-[600px] w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="relative py-16">
        <div className="absolute inset-0 -z-10 border-t border-white/5 bg-surface-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card-gradient-border p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-white">Email</h3>
              <a
                href="mailto:hello@cortexautomations.ai"
                className="mt-1 text-sm text-brand-400 hover:text-brand-300"
              >
                hello@cortexautomations.ai
              </a>
            </div>
            {SOCIAL_LINKS.map(function (social) {
              return (
                <div
                  key={social.label}
                  className="card-gradient-border p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                    <span className="text-lg font-bold">{social.label[0]}</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{social.label}</h3>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-brand-400 hover:text-brand-300"
                  >
                    {social.label === "GitHub" ? "cortex-automations1" : "cortex-automations"}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}

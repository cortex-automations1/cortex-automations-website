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
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white section-padding">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-100/40 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s <span className="text-gradient">Talk</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Have a project in mind? Book a call or send us a message
            and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Lead Form */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Tell us about your project
              </h2>
              <p className="mt-2 text-slate-600">
                Fill out the form below and we&apos;ll reach out to discuss your needs.
              </p>
              <div className="mt-8">
                <LeadForm />
              </div>
            </div>

            {/* Right: Cal.com Embed + Info */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Book a discovery call
              </h2>
              <p className="mt-2 text-slate-600">
                Prefer to talk live? Schedule a free 30-minute call at a time that works for you.
              </p>
              <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <iframe
                  src={`${CAL_LINK}?embed=true&theme=light&layout=month_view`}
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
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">Email</h3>
              <a
                href="mailto:hello@cortexautomations.ai"
                className="mt-1 text-sm text-brand-600 hover:text-brand-700"
              >
                hello@cortexautomations.ai
              </a>
            </div>
            {SOCIAL_LINKS.map(function (social) {
              return (
                <div
                  key={social.label}
                  className="rounded-xl border border-slate-200 bg-white p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <span className="text-lg font-bold">{social.label[0]}</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">{social.label}</h3>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-brand-600 hover:text-brand-700"
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

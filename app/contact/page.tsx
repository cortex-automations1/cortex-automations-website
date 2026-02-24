import type { Metadata } from "next";
import { Mail, Calendar, Terminal } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { LeadForm } from "@/components/ui/lead-form";
import { CalendarWidget } from "@/components/ui/calendar-widget";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Connect with our engineering team to architect your custom software solution, CRM, or specialized automated workflow.",
  path: "/contact",
});

type Props = { searchParams: Promise<{ scope?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { scope } = await searchParams;
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-surface-0 border-b border-surface-200">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[600px] h-[400px] glow-brand opacity-20 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Initialize <span className="text-gradient">Project</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you need a full-scale enterprise build or a specialized workflow automation,
            our engineering team is ready to scope your architecture.
          </p>
        </div>
      </section>

      {/* MAIN SPLIT SECTION */}
      <section className="py-16 md:py-24 bg-surface-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">

            {/* Left Column: Direct Inquiry */}
            <div className="animate-fade-in-up">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-3 flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-brand-500" />
                  Direct Inquiry
                </h2>
                <p className="text-neutral-400">
                  Submit your technical requirements below. We review all scoping requests within
                  24 hours.
                </p>
              </div>

              <div className="p-1 rounded-2xl bg-surface-100/50 border border-surface-200 card-gradient-border shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 glow-brand opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <LeadForm initialService={scope} />
                </div>
              </div>
            </div>

            {/* Right Column: Discovery Call */}
            <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-3 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-brand-500" />
                  Discovery Call
                </h2>
                <p className="text-neutral-400">
                  Prefer to talk it through? Book a direct architectural review with our technical
                  founders.
                </p>
              </div>

              {/* Calendar.com Inline Widget */}
              <div className="rounded-2xl bg-surface-100 border border-surface-200 overflow-hidden shadow-2xl">
                <CalendarWidget />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="pb-24 bg-surface-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            {/* Email Card */}
            <a
              href="mailto:hello@cortexautomations.ai"
              className="p-8 rounded-2xl bg-surface-100 border border-surface-200 hover:border-brand-500/50 transition-colors group flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-200 border border-surface-300 flex items-center justify-center mb-4 group-hover:bg-brand-500/10 transition-colors">
                <Mail className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Email</h3>
              <p className="text-neutral-400 text-sm">hello@cortexautomations.ai</p>
            </a>

            {/* Social Link Cards */}
            {SOCIAL_LINKS.map(function (link) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-8 rounded-2xl bg-surface-100 border border-surface-200 hover:border-brand-500/50 transition-colors group flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-200 border border-surface-300 flex items-center justify-center mb-4 group-hover:bg-brand-500/10 transition-colors text-brand-400 text-lg font-bold">
                    {link.label[0]}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{link.label}</h3>
                  <p className="text-neutral-400 text-sm">Connect on {link.label}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

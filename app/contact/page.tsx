import type { Metadata } from "next";
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
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Get in <span className="brand-underline">Touch</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Tell us about your project, or book a call and we&apos;ll figure it out together.
          </p>
        </div>
      </section>

      {/* MAIN SPLIT SECTION */}
      <section className="py-16 md:py-24 bg-surface-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">

            {/* Left Column: Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Send Us a Message
                </h2>
                <p className="text-neutral-400">
                  Tell us what you&apos;re working on. We&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <div className="p-1 rounded-2xl bg-surface-100/50 border border-surface-200 shadow-2xl">
                <LeadForm initialService={scope} />
              </div>
            </div>

            {/* Right Column: Calendar */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Book a Call
                </h2>
                <p className="text-neutral-400">
                  Prefer to talk it through? Pick a time that works for you.
                </p>
              </div>

              {/* Cal.com Inline Widget */}
              <div className="rounded-2xl bg-surface-100 border border-surface-200 overflow-hidden shadow-2xl">
                <CalendarWidget />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

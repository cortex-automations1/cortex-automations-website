import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: "Terms and conditions governing use of Cortex Automations services.",
  path: "/terms",
});

export default function TermsPage() {
  const lastUpdated = "February 2026";

  return (
    <div className="relative bg-surface-0 pt-32 pb-24">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <header className="mb-12">
          <p className="text-sm font-mono text-brand-400 uppercase tracking-widest mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-neutral-500 text-sm">Last updated: {lastUpdated}</p>
        </header>

        <div className="prose prose-invert max-w-none space-y-10 text-neutral-400 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Cortex Automations website (cortexautomations.ai) or
              engaging our services, you agree to be bound by these Terms of Service. If you do not
              agree, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Services</h2>
            <p>
              Cortex Automations provides custom software development services including but not
              limited to SaaS platform development, mobile applications, web design, AI integration,
              and technical consulting. Specific deliverables, timelines, and payment terms for any
              engagement are defined in a separate Statement of Work (SOW) or project agreement
              signed by both parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Intellectual Property</h2>
            <p>
              Upon receipt of full payment for a project, the client receives full ownership of all
              custom code, designs, and deliverables created specifically for that engagement.
              Cortex Automations retains the right to use general methodologies, frameworks, and
              non-proprietary components developed during the engagement for future projects.
            </p>
            <p className="mt-4">
              Any open-source libraries or third-party tools incorporated into a project remain
              subject to their respective licenses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential any proprietary information shared during an
              engagement. This includes business logic, technical architecture, API keys, and any
              other non-public information. Confidentiality obligations survive the termination of
              any project agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Payment Terms</h2>
            <p>
              Payment terms are specified per engagement in the project agreement. Generally,
              projects require a deposit before work begins, with remaining payments tied to
              defined milestones. Late payments may result in work being paused until the account
              is brought current.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p>
              Cortex Automations shall not be liable for any indirect, incidental, or consequential
              damages arising from the use of our services or deliverables. Our total liability for
              any claim arising from a project shall not exceed the total amount paid for that
              specific engagement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Website Use</h2>
            <p>
              You may use this website for lawful purposes only. You agree not to attempt to gain
              unauthorized access to any part of the website, disrupt its operation, or use it to
              transmit any harmful or malicious content. We reserve the right to terminate access
              for any user who violates these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">8. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of Florida, United States. Any
              disputes arising from these terms or our services shall be resolved in the courts of
              Florida.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time. The "last updated" date at
              the top of this page reflects the most recent revision. Continued use of our website
              or services after any changes constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">10. Contact</h2>
            <p>
              For any questions regarding these terms, contact us at{" "}
              <a
                href="mailto:hello@cortexautomations.ai"
                className="text-brand-400 hover:text-brand-300 transition-colors"
              >
                hello@cortexautomations.ai
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

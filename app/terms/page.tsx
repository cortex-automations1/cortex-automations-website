import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: "Terms and conditions governing use of Cortex Automations services.",
  path: "/terms",
});

export default function TermsPage() {
  const lastUpdated = "May 2026";

  return (
    <div className="relative bg-surface-0 pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <header className="mb-12">
          <p className="text-sm font-medium text-brand-400 uppercase tracking-widest mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-muted text-sm">Last updated: {lastUpdated}</p>
        </header>

        <div className="prose prose-invert max-w-none space-y-10 text-body leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Cortex Automations website (cortexautomations.ai),
              the Cortex Command Center application and client portal, or by engaging our
              services, you agree to be bound by these Terms of Service. If you do not
              agree, please do not use our website, application, or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">2. Services</h2>
            <p>
              Cortex Automations provides custom software development services including
              but not limited to SaaS platform development, mobile applications, web
              design, AI integration, and technical consulting. Specific deliverables,
              timelines, and payment terms for any engagement are defined in a separate
              Statement of Work or project agreement signed by both parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">
              3. The Cortex Command Center Application and Client Portal
            </h2>
            <p>
              Clients and their authorized users may be given access to the Cortex
              Command Center client portal to view proposals, projects, and invoices, to
              make payments, and to review and sign documents. Access is provided for the
              client&rsquo;s authorized users only. You are responsible for keeping your
              account credentials secure and for activity that occurs under your account.
              We may suspend or revoke access for non-payment, suspected unauthorized
              use, or violation of these Terms. The application is provided to support our
              engagements and may change as we continue to improve it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">4. Electronic Signatures</h2>
            <p>
              You may review and sign proposals, agreements, and other documents
              electronically through the client portal. By signing electronically, you
              consent to the use of electronic records and signatures and agree that your
              electronic signature is legally binding to the same extent as a handwritten
              signature, consistent with the U.S. ESIGN Act and applicable state law. You
              may request a paper copy of any signed document, and you may withdraw
              consent to electronic signatures for future documents, by contacting us. We
              retain a record of each signed document, including the signing timestamp
              and related metadata, as evidence of the agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">5. Payment Terms</h2>
            <p>
              Payment terms for an engagement are specified in the applicable project
              agreement. Generally, projects require a deposit before work begins, with
              remaining payments tied to defined milestones. Invoices may be issued and
              paid through the client portal; portal payments are processed by our
              payment provider, Stripe, and by submitting a payment you authorize the
              corresponding charge. Late payments may result in work being paused, and
              access to the application being suspended, until the account is brought
              current.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">6. Intellectual Property</h2>
            <p>
              Upon receipt of full payment for a project, the client receives full
              ownership of all custom code, designs, and deliverables created
              specifically for that engagement. Cortex Automations retains the right to
              use general methodologies, frameworks, and non-proprietary components
              developed during the engagement for future projects.
            </p>
            <p className="mt-4">
              Any open-source libraries or third-party tools incorporated into a project
              remain subject to their respective licenses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">7. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential any proprietary information shared
              during an engagement. This includes business logic, technical architecture,
              API keys, and any other non-public information. Confidentiality obligations
              survive the termination of any project agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">8. Warranties and Disclaimers</h2>
            <p>
              We provide our services with reasonable skill and care. Except as expressly
              stated in a signed project agreement, our services, the website, and the
              Cortex Command Center application are provided on an &ldquo;as is&rdquo; and
              &ldquo;as available&rdquo; basis. To the fullest extent permitted by law, we
              disclaim all implied warranties, including implied warranties of
              merchantability, fitness for a particular purpose, and non-infringement. We
              do not warrant that the website or application will be uninterrupted,
              error-free, or secure against every threat.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">9. Limitation of Liability</h2>
            <p>
              Cortex Automations shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of our services or deliverables.
              Our total liability for any claim arising from a project shall not exceed
              the total amount paid for that specific engagement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold Cortex Automations harmless from any claims,
              damages, or expenses arising from content or materials you provide, your use
              of the application in violation of these Terms or applicable law, or your
              infringement of the rights of a third party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">11. Termination</h2>
            <p>
              Either party may end an engagement in accordance with the terms of the
              applicable project agreement. We may suspend or terminate access to the
              website or the Cortex Command Center application if you breach these Terms
              or fail to pay amounts due. Provisions that by their nature should survive
              termination — including Intellectual Property, Confidentiality, Warranties
              and Disclaimers, Limitation of Liability, and Indemnification — survive.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">12. Acceptable Use</h2>
            <p>
              You may use our website and the Cortex Command Center application for lawful
              purposes only. You agree not to attempt to gain unauthorized access to any
              part of the website or application, disrupt their operation, interfere with
              the access of another user, or use them to transmit harmful, malicious, or
              unlawful content. We reserve the right to suspend or terminate access for
              any user who violates these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">
              13. Governing Law and Dispute Resolution
            </h2>
            <p>
              These terms are governed by the laws of the State of Wyoming, without regard
              to its conflict-of-laws principles. Any dispute arising out of or relating
              to these terms, our services, or the application that cannot be resolved
              informally shall be brought exclusively in the state or federal courts
              located in the State of Wyoming, and you and Cortex Automations consent to
              the personal jurisdiction of those courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">14. General</h2>
            <p>
              These terms, together with any signed project agreement, constitute the
              entire agreement between you and Cortex Automations regarding their subject
              matter. If any provision is found unenforceable, the remaining provisions
              remain in full effect. You may not assign these terms without our consent;
              we may assign them in connection with a merger, acquisition, or sale of
              assets. Neither party is liable for delays or failures caused by events
              beyond its reasonable control. Our failure to enforce a provision is not a
              waiver of it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">15. Changes to These Terms</h2>
            <p>
              We reserve the right to update these terms at any time. The &ldquo;last
              updated&rdquo; date at the top of this page reflects the most recent
              revision. Continued use of our website, application, or services after any
              changes constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">16. Contact</h2>
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

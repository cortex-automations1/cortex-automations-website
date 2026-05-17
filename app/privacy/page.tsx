import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: "How Cortex Automations collects, uses, and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const lastUpdated = "May 2026";

  return (
    <div className="relative bg-surface-0 pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <header className="mb-12">
          <p className="text-sm font-medium text-brand-400 uppercase tracking-widest mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-muted text-sm">Last updated: {lastUpdated}</p>
        </header>

        <div className="prose prose-invert max-w-none space-y-10 text-body leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">1. Overview and Scope</h2>
            <p>
              Cortex Automations operates the website at cortexautomations.ai and the
              Cortex Command Center application, which includes a client portal used by
              our clients. This Privacy Policy explains what information we collect across
              both, how we use it, how it is protected, and the choices you have. It
              applies to visitors to our website and to clients and their authorized
              users of the Cortex Command Center application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">2. Information We Collect</h2>
            <h3 className="text-base font-semibold text-heading mt-2 mb-2">
              Website visitors and inquiries
            </h3>
            <p>
              When you submit an inquiry through our contact form, we collect your name,
              work email address, company name, phone number (optional), service
              interest, and project details. We do not collect information beyond what
              you voluntarily provide through the form.
            </p>
            <h3 className="text-base font-semibold text-heading mt-6 mb-2">
              Cortex Command Center application and client portal
            </h3>
            <p>
              When you are a client of Cortex Automations and use the Cortex Command
              Center application, we collect and maintain:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
              <li>account and contact details for you and your authorized users;</li>
              <li>business information relating to your engagement;</li>
              <li>invoices, billing records, and payment history;</li>
              <li>
                records of proposals, agreements, and other documents you review and sign
                through the portal, including signature timestamps and related metadata;
              </li>
              <li>project, milestone, and engagement information;</li>
              <li>files and materials uploaded to or generated within the application;</li>
              <li>communications sent through or about the application.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
              <li>respond to inquiries and scope prospective engagements;</li>
              <li>create client accounts and operate the application and client portal;</li>
              <li>prepare, send, and collect invoices and process payments;</li>
              <li>manage projects, proposals, and agreements;</li>
              <li>obtain and record electronic signatures on documents;</li>
              <li>communicate with you about active engagements;</li>
              <li>
                meet our legal, tax, and accounting obligations and protect our legal
                rights.
              </li>
            </ul>
            <p className="mt-4">
              We do not sell or rent personal data, we do not share it for advertising,
              and we do not use it for marketing without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">4. Payments</h2>
            <p>
              Payments made through the client portal are processed by Stripe, our
              payment processor. Card details are entered directly with Stripe and are
              handled under the security standards Stripe maintains; we do not receive or
              store full card numbers. We retain payment records — such as amount, date,
              status, and the last four digits of the card — for billing, accounting, and
              tax purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">
              5. Third-Party Services and Subprocessors
            </h2>
            <p>
              We rely on the following service providers to operate our website and
              application. Each processes data only as needed to provide its service and
              under its own privacy terms:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
              <li>
                <span className="text-heading font-medium">Vercel</span> — website and
                application hosting
              </li>
              <li>
                <span className="text-heading font-medium">Neon</span> — managed database
                hosting for application data
              </li>
              <li>
                <span className="text-heading font-medium">Cloudflare</span> — file and
                document storage and related infrastructure
              </li>
              <li>
                <span className="text-heading font-medium">Stripe</span> — payment
                processing
              </li>
              <li>
                <span className="text-heading font-medium">Resend</span> — transactional
                and notification email
              </li>
              <li>
                <span className="text-heading font-medium">Cal.com</span> — discovery-call
                scheduling
              </li>
              <li>
                <span className="text-heading font-medium">Vercel Analytics</span> —
                privacy-friendly, cookie-free website analytics
              </li>
            </ul>
            <p className="mt-4">
              We also integrate with QuickBooks Online; that integration is described in
              the next section. We encourage you to review the privacy policies of these
              providers independently.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">6. QuickBooks Online Integration</h2>
            <p>
              Cortex Automations operates an internal business-management application,
              Cortex Command Center, which we use to run our own client engagements,
              invoicing, and accounting. This application connects to QuickBooks Online
              through the official Intuit API so that our financial records stay
              consistent between the two systems.
            </p>
            <p className="mt-4">
              Through this integration we read and write the following records within our
              own QuickBooks Online company: invoices, customers, products and services,
              income accounts, and payments. We connect only our own QuickBooks Online
              company. We do not access, request, or store QuickBooks data belonging to
              our clients or to any other party.
            </p>
            <p className="mt-4">
              QuickBooks data and the credentials used to access it are handled as
              follows:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
              <li>
                All communication with Intuit takes place over encrypted HTTPS
                connections.
              </li>
              <li>
                OAuth access and refresh tokens issued by Intuit are stored encrypted at
                rest and are never exposed to any third party.
              </li>
              <li>
                QuickBooks data is used solely for bookkeeping and payment reconciliation.
                It is never sold, rented, or shared.
              </li>
              <li>
                The QuickBooks connection can be revoked at any time, which removes the
                stored Intuit credentials.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">
              7. Data Storage, Security, and Retention
            </h2>
            <p>
              All data is transmitted over encrypted HTTPS connections and stored on
              infrastructure operated by the providers listed above. Access to
              application data is restricted to authorized Cortex Automations personnel,
              and sensitive credentials, such as integration access tokens, are encrypted
              at rest.
            </p>
            <p className="mt-4">
              Inquiry and lead data submitted through the website contact form is
              retained for up to 24 months unless an active client relationship exists.
              Client, billing, project, and signed-document records are retained for the
              duration of the engagement and for as long afterward as required to meet
              legal, tax, and accounting obligations, after which they are deleted or
              anonymized.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">8. Cookies</h2>
            <p>
              This website does not use tracking cookies or analytics beyond what is
              necessary for core functionality. Vercel may set cookies for performance
              and security purposes as part of their hosting infrastructure. The Cortex
              Command Center application uses a session cookie that is strictly necessary
              to keep signed-in users authenticated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">9. Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
              <li>request access to the personal data we hold about you;</li>
              <li>request correction or deletion of that data;</li>
              <li>
                withdraw consent for any processing that is based on consent, at any time.
              </li>
            </ul>
            <p className="mt-4">
              Where deletion would conflict with a legal, tax, or accounting obligation,
              we will retain only the minimum data required and delete the rest.
              California residents have the right to know what personal information we
              collect, to request its deletion, and not to be discriminated against for
              exercising these rights; as stated above, we do not sell personal
              information. To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:hello@cortexautomations.ai"
                className="text-brand-400 hover:text-brand-300 transition-colors"
              >
                hello@cortexautomations.ai
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">10. Data Breach Notification</h2>
            <p>
              In the event of a data breach affecting your personal information, we will
              notify affected individuals and, where applicable, the relevant
              authorities, without undue delay and as required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">11. Children&rsquo;s Privacy</h2>
            <p>
              Our website and application are intended for businesses and are not directed
              to children. We do not knowingly collect personal information from anyone
              under the age of 18. If we learn that we have collected such information, we
              will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">12. Changes to This Policy</h2>
            <p>
              We may update this policy as our services evolve. Material changes will be
              reflected by updating the &ldquo;last updated&rdquo; date at the top of this
              page. Continued use of our website or application following any changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-heading mb-4">13. Contact</h2>
            <p>
              For any privacy-related questions, please reach out to us at{" "}
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

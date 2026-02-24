import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: "How Cortex Automations collects, uses, and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-neutral-500 text-sm">Last updated: {lastUpdated}</p>
        </header>

        <div className="prose prose-invert max-w-none space-y-10 text-neutral-400 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>
              When you submit an inquiry through our contact form, we collect the following
              information: your name, work email address, company name, phone number (optional),
              service interest, and project details. We do not collect any information beyond what
              you voluntarily provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p>We use the information you provide solely to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
              <li>Respond to your project inquiry and scope your requirements</li>
              <li>Schedule discovery calls and follow-up communications</li>
              <li>Send project-related communications during an active engagement</li>
            </ul>
            <p className="mt-4">
              We do not use your information for marketing purposes without your explicit consent,
              and we do not sell or rent your personal data to any third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Data Storage & Security</h2>
            <p>
              Inquiry data submitted through our contact form is forwarded to our internal CRM
              (SignFlow) for lead management. All data is transmitted over HTTPS and stored
              securely. We retain lead data for up to 24 months, after which it is permanently
              deleted unless an active client relationship exists.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Third-Party Services</h2>
            <p>This website uses the following third-party services:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
              <li>
                <span className="text-white font-medium">Vercel</span> — hosting and serverless
                functions
              </li>
              <li>
                <span className="text-white font-medium">Calendar.com</span> — scheduling widget
                for discovery calls
              </li>
              <li>
                <span className="text-white font-medium">SignFlow</span> — CRM for lead and client
                management
              </li>
            </ul>
            <p className="mt-4">
              Each of these services operates under their own privacy policies. We encourage you to
              review them independently.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Cookies</h2>
            <p>
              This website does not use tracking cookies or analytics beyond what is necessary for
              core functionality. Vercel may set cookies for performance and security purposes as
              part of their hosting infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw consent for any data processing at any time</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us at{" "}
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
            <h2 className="text-xl font-bold text-white mb-4">7. Changes to This Policy</h2>
            <p>
              We may update this policy as our services evolve. Material changes will be reflected
              by updating the "last updated" date at the top of this page. Continued use of our
              website following any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">8. Contact</h2>
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

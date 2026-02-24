import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Terminal,
  CheckCircle2,
  Layers,
  Smartphone,
  Monitor,
  Brain,
  MessageSquare,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, PROJECTS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Smartphone,
  Monitor,
  Brain,
  MessageSquare,
};

const IDEAL_FOR: Record<string, string[]> = {
  "saas-platforms": [
    "Founders building a SaaS product from scratch",
    "Teams migrating legacy software to a multi-tenant platform",
    "Businesses that need subscription billing, user management, and a client portal",
  ],
  "mobile-apps": [
    "Startups launching on iOS and Android simultaneously",
    "Businesses extending their web platform to mobile",
    "Teams that need internal workforce or field-ops tools",
  ],
  "web-design": [
    "Companies needing a high-converting marketing or landing page",
    "Startups establishing their brand online for the first time",
    "Businesses with an outdated site that needs a full rebuild",
  ],
  "ai-automation": [
    "Teams spending hours on manual, repetitive workflows",
    "Products that need LLM-powered features like chat or document processing",
    "Companies looking to reduce operational overhead with intelligent automation",
  ],
  consulting: [
    "CTOs and engineering leads evaluating architecture decisions",
    "Startups preparing for technical due diligence or scale",
    "Teams that need expert guidance without a full-time hire",
  ],
};

const RELATED_PROJECTS: Record<string, string[]> = {
  "saas-platforms": ["signflow-pro", "cloud-x"],
  "mobile-apps": [],
  "web-design": ["signflow-pro", "liquidlogic"],
  "ai-automation": ["liquidlogic", "livemonitor"],
  consulting: ["cloud-x", "livemonitor"],
};

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return createMetadata({
    title: service.name,
    description: service.shortDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const IconComponent = ICON_MAP[service.icon] ?? Terminal;
  const idealFor = IDEAL_FOR[service.slug] ?? [];
  const relatedSlugs = RELATED_PROJECTS[service.slug] ?? [];
  const relatedProjects = PROJECTS.filter((p) => relatedSlugs.includes(p.slug));

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-surface-0 border-b border-surface-200">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] glow-brand opacity-15 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 animate-fade-in">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-medium mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Services
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-surface-100 border border-surface-200 text-brand-500 shrink-0">
              <IconComponent className="w-7 h-7" />
            </div>
            <p className="text-sm font-mono text-brand-400 uppercase tracking-widest">Service</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight max-w-4xl leading-tight">
            {service.name}
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            {service.description}
          </p>
          <div className="mt-10">
            <Link
              href={`/contact?scope=${service.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors group"
            >
              Start This Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CAPABILITIES + IDEAL FOR */}
      <section className="py-24 bg-surface-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Key Capabilities */}
          <div className="p-8 rounded-2xl bg-surface-100 border border-surface-200 card-gradient-border">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-brand-500" /> Key Capabilities
            </h2>
            <ul className="space-y-4">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-neutral-300">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal For */}
          <div className="p-8 rounded-2xl bg-surface-100 border border-surface-200 card-gradient-border">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-500" /> Who Is This For?
            </h2>
            <ul className="space-y-4">
              {idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-neutral-300">
                  <ArrowRight className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-16 bg-surface-0 border-t border-surface-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-6">
            Technologies &amp; Tools
          </p>
          <div className="flex flex-wrap gap-3">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-surface-100 border border-surface-200 text-neutral-300 text-sm font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
        <section className="py-24 bg-surface-50 border-t border-surface-200 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Related Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/portfolio/${project.slug}`}
                  className="group p-6 rounded-2xl bg-surface-100 border border-surface-200 hover:border-brand-500/40 transition-colors card-gradient-border"
                >
                  <p className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{project.tagline}</p>
                  <div className="flex items-center gap-1 mt-4 text-brand-400 text-sm font-medium">
                    View Case Study{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-surface-0 border-t border-surface-200 relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] glow-brand opacity-10 blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to build your {service.name.toLowerCase()}?
          </h2>
          <p className="text-neutral-400 text-lg mb-8">
            Book a free discovery call and let&apos;s scope out your project.
          </p>
          <Link
            href={`/contact?scope=${service.slug}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors group"
          >
            Initialize Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}

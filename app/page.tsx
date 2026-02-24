import Link from 'next/link';
import { ArrowRight, Terminal, Layers, Smartphone, Monitor, Brain, Cpu, Code2, Database, ShieldCheck, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SERVICES, PROJECTS, PROCESS_STEPS, TESTIMONIALS, CAL_LINK } from '@/lib/constants';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'saas-platforms': Layers,
  'mobile-apps': Smartphone,
  'web-design': Monitor,
  'ai-automation': Brain,
};

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden section-padding">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] glow-brand opacity-20 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-300 bg-surface-100/50 backdrop-blur-sm text-neutral-300 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Engineering scalable digital infrastructure
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight max-w-4xl mx-auto leading-tight">
            We Build High-Performance <br className="hidden md:block" />
            <span className="text-gradient">Software Systems</span>
          </h1>

          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Cortex Automations is a premier full-stack development partner. We engineer seamless UIs, robust APIs, and complex automation workflows for modern enterprises.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 group"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-8 py-4 bg-surface-100 text-white font-medium rounded-lg border border-surface-200 hover:bg-surface-200 transition-colors flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4 text-neutral-400" />
              View Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* TECH STACK TRUST BAR */}
      <section className="border-y border-surface-200 bg-surface-50 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">Powered by the modern stack</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-white font-medium"><Code2 className="w-5 h-5" /> Next.js 15</div>
            <div className="flex items-center gap-2 text-white font-medium"><Terminal className="w-5 h-5" /> TypeScript</div>
            <div className="flex items-center gap-2 text-white font-medium"><Cpu className="w-5 h-5" /> Node.js</div>
            <div className="flex items-center gap-2 text-white font-medium"><Database className="w-5 h-5" /> PostgreSQL</div>
            <div className="flex items-center gap-2 text-white font-medium"><Zap className="w-5 h-5" /> Tailwind 4</div>
          </div>
        </div>
      </section>

      {/* VALUE PROP / WHY CORTEX */}
      <section className="section-padding bg-surface-0 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Beyond Basic Web Development</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              We don&apos;t use templates. We architect custom solutions designed to handle complex business logic, secure data, and scale effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-surface-50 border border-surface-200 card-gradient-border relative group overflow-hidden animate-fade-in-up">
              <div className="absolute top-0 right-0 w-32 h-32 glow-brand opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <Layers className="w-10 h-10 text-brand-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Multi-Tenant Platforms</h3>
              <p className="text-neutral-400 leading-relaxed">
                From high-performance CRMs to enterprise SaaS products, we build scalable architectures with robust role-based access controls and seamless data isolation.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface-50 border border-surface-200 card-gradient-border relative group overflow-hidden animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="absolute top-0 right-0 w-32 h-32 glow-brand opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <ShieldCheck className="w-10 h-10 text-brand-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Specialized Workflows</h3>
              <p className="text-neutral-400 leading-relaxed">
                We handle heavily regulated and complex logic, including healthcare EHR integrations, secure API endpoints, and automated data pipelines.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface-50 border border-surface-200 card-gradient-border relative group overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="absolute top-0 right-0 w-32 h-32 glow-brand opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <Zap className="w-10 h-10 text-brand-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Premium UI/UX</h3>
              <p className="text-neutral-400 leading-relaxed">
                Powerful backend infrastructure means nothing if the frontend is difficult to use. We prioritize frictionless, accessible, and high-converting user interfaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="section-padding bg-surface-50 border-t border-surface-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Core Capabilities</h2>
              <p className="text-neutral-400 text-lg max-w-xl">
                End-to-end engineering for platforms that demand reliability.
              </p>
            </div>
            <Link href="/services" className="inline-flex items-center text-brand-400 hover:text-brand-300 font-medium transition-colors group">
              View All Services <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.slice(0, 4).map(function (service) {
              const Icon = SERVICE_ICONS[service.slug] ?? Terminal;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} className="p-6 rounded-xl bg-surface-100 border border-surface-200 hover:border-brand-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-surface-200 border border-surface-300 flex items-center justify-center mb-4 group-hover:bg-brand-500/10 transition-colors">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-neutral-400 text-sm">{service.shortDescription}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="section-padding bg-surface-0 border-t border-surface-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-brand-400 uppercase tracking-widest mb-4">Process</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How We Work</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              From first call to production deployment — a clear process with no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[14%] right-[14%] h-px bg-gradient-to-r from-transparent via-surface-300 to-transparent pointer-events-none" />
            {PROCESS_STEPS.map(function (step, index) {
              return (
                <div
                  key={step.number}
                  className="relative p-6 rounded-2xl bg-surface-50 border border-surface-200 card-gradient-border text-center animate-fade-in-up group overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 glow-brand opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  <div className="w-12 h-12 rounded-full bg-surface-100 border border-brand-500/30 text-brand-400 font-mono font-bold text-lg flex items-center justify-center mx-auto mb-5 relative z-10 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS TEASER */}
      <section className="section-padding bg-surface-0 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Architecture</h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              A look at the systems powering modern businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.slice(0, 2).map(function (project) {
              return (
                <div key={project.slug} className="p-8 rounded-2xl bg-surface-50 border border-surface-200 card-gradient-border relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 glow-brand opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <span className="text-brand-400 text-xs font-mono uppercase tracking-wider mb-2 block">{project.category}</span>
                    <h3 className="text-3xl font-bold text-white mb-4">{project.name}</h3>
                    <p className="text-neutral-400 mb-8">{project.tagline}</p>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center px-5 py-2.5 rounded-lg bg-surface-200 text-white font-medium hover:bg-surface-300 transition-colors"
                    >
                      Read Case Study
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/portfolio" className="inline-flex items-center text-brand-400 hover:text-brand-300 font-medium transition-colors">
              Explore All Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-surface-0 border-t border-surface-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-brand-400 uppercase tracking-widest mb-4">Client Results</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What Clients Say</h2>
            <p className="text-neutral-400 text-sm italic">Testimonials coming soon — replace with real client quotes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(function (testimonial, index) {
              return (
                <div
                  key={testimonial.author}
                  className="p-8 rounded-2xl bg-surface-50 border border-surface-200 card-gradient-border relative group overflow-hidden flex flex-col animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 glow-brand opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  <div className="text-brand-500/20 text-7xl font-serif leading-none mb-2 select-none">&ldquo;</div>
                  <p className="text-neutral-300 leading-relaxed mb-8 flex-1 relative z-10">
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-surface-200 pt-6 relative z-10">
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-neutral-500 text-sm">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL BOTTOM CTA */}
      <section className="py-24 bg-surface-50 border-t border-surface-200 relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] glow-brand opacity-10 blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Ready to build?</h2>
          <p className="text-neutral-400 text-xl mb-10 max-w-2xl mx-auto">
            Stop settling for off-the-shelf solutions. Let&apos;s engineer a custom platform that scales with your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Initialize Project <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-surface-100 text-white font-medium rounded-lg border border-surface-300 hover:bg-surface-200 transition-colors"
            >
              Book Discovery Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

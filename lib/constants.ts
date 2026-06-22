export const SITE_URL = "https://cortexautomations.ai";
export const CAL_LINK = "https://www.calendar.com/david-perez/webdev/";

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    slug: "saas-platforms",
    name: "SaaS Platform Development",
    shortDescription:
      "Full-stack SaaS applications built from the ground up with modern architectures, multi-tenancy, and scalable infrastructure.",
    description:
      "We design and build complete SaaS platforms from initial concept to production deployment. Our approach emphasizes scalable multi-tenant architectures, robust API design, and seamless user experiences that grow with your business.",
    icon: "Layers" as const,
    features: [
      "Multi-tenant architecture with role-based access",
      "Stripe billing integration with subscription management",
      "REST and GraphQL API design",
      "Real-time features with WebSockets",
      "Admin dashboards and analytics",
      "CI/CD pipelines and infrastructure-as-code",
    ],
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe", "Vercel", "AWS"],
  },
  {
    slug: "mobile-apps",
    name: "Mobile App Development",
    shortDescription:
      "Cross-platform mobile applications with native performance, built using React Native for iOS and Android simultaneously.",
    description:
      "We build cross-platform mobile applications that feel native on both iOS and Android. From consumer-facing apps to internal business tools, we focus on performance, usability, and maintainability.",
    icon: "Smartphone" as const,
    features: [
      "Cross-platform iOS and Android from one codebase",
      "Push notifications and offline support",
      "Biometric authentication and secure storage",
      "App Store and Google Play deployment",
      "Analytics and crash reporting",
      "OTA updates for rapid iteration",
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Firebase", "REST APIs"],
  },
  {
    slug: "web-design",
    name: "Web Design & Development",
    shortDescription:
      "High-performance marketing sites and web applications with modern design, SEO optimization, and blazing-fast load times.",
    description:
      "We create visually stunning, high-performance websites that convert visitors into customers. Every site we build is responsive, accessible, SEO-optimized, and designed to load in under a second.",
    icon: "Monitor" as const,
    features: [
      "Responsive design for all screen sizes",
      "SEO optimization and Core Web Vitals",
      "Content management system integration",
      "Performance optimization (90+ Lighthouse scores)",
      "Accessibility (WCAG 2.1 compliance)",
      "Analytics and conversion tracking",
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel", "Figma"],
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    shortDescription:
      "Custom AI integrations and business process automation that reduce manual work and unlock new capabilities.",
    description:
      "We integrate AI capabilities into existing products and build custom automation workflows that eliminate repetitive tasks. From LLM-powered features to intelligent document processing, we make AI practical and production-ready.",
    icon: "Brain" as const,
    features: [
      "LLM integration (OpenAI, Anthropic, open-source)",
      "Document processing and data extraction",
      "Workflow automation with custom triggers",
      "Chatbots and conversational interfaces",
      "Vector search and RAG pipelines",
      "AI-powered content generation",
    ],
    techStack: ["Python", "LangChain", "OpenAI", "Pinecone", "n8n", "Make"],
  },
  {
    slug: "consulting",
    name: "Technical Consulting",
    shortDescription:
      "Architecture reviews, technology strategy, and hands-on guidance for teams building complex software systems.",
    description:
      "We provide expert guidance on architecture decisions, technology selection, and development practices. Whether you need a one-time review or ongoing advisory support, we help teams build better software faster.",
    icon: "MessageSquare" as const,
    features: [
      "Architecture design and review",
      "Technology stack selection",
      "Code audits and security reviews",
      "Performance optimization",
      "DevOps and deployment strategy",
      "Team mentoring and best practices",
    ],
    techStack: ["Architecture", "DevOps", "Security", "Performance", "Cloud"],
  },
];

export const PROJECTS = [
  {
    slug: "quotehq",
    name: "QuoteHQ",
    category: "SaaS Platform",
    status: "Under Development",
    tagline: "Quote-to-cash platform for service businesses",
    description:
      "An all-in-one quote-to-cash platform for service businesses — AI-assisted proposal generation, legally-binding e-signatures, invoicing, recurring billing, and a branded client portal in one multi-tenant SaaS. The next-generation successor to SignFlow.",
    challenge:
      "Service businesses still stitch quoting, contracts, e-signature, and billing across four or five disconnected tools — leaking leads and revenue between the cracks and re-keying the same data at every step.",
    solution:
      "We're building a unified, AI-native quote-to-cash platform: generate a proposal with AI, send it for e-signature, convert it to an invoice with recurring billing and integrated payments, and give every client a branded portal — the entire revenue cycle in one product.",
    techStack: ["Next.js", "React", "Drizzle", "Neon Postgres", "Better Auth", "Finix"],
    highlights: [
      { label: "Revenue Cycle", value: "Quote→Cash" },
      { label: "AI Proposals", value: "Built-in" },
      { label: "Payments", value: "Finix" },
      { label: "Architecture", value: "Multi-tenant" },
    ],
    link: "https://quotehq.app",
    image: "/portfolio/quotehq.png",
  },
  {
    slug: "outback-excavating",
    name: "Outback Excavating",
    category: "Web Design",
    tagline: "Professional site for a GPS-guided excavation company",
    description:
      "A high-performance marketing website for a Utah-based excavation and site preparation company. The site highlights their GPS-guided precision capabilities, serves multiple county markets, and is optimized for local SEO with structured data markup.",
    challenge:
      "Outback Excavating needed a professional web presence that clearly communicated their GPS-guided precision advantage to residential and commercial clients across multiple Utah counties — but had no site and was losing bids to competitors with better online visibility.",
    solution:
      "We designed and built a fast, SEO-optimized marketing site with structured schema markup for local search, clear service breakdowns for excavation, site prep, and concrete work, and strong calls-to-action to drive quote requests from their target markets.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel", "Schema.org"],
    highlights: [
      { label: "Counties Served", value: "4+" },
      { label: "Core Services", value: "3" },
      { label: "Lighthouse Score", value: "95+" },
      { label: "Load Time", value: "<1s" },
    ],
    link: "https://outbackexcavating.com",
    image: "/portfolio/outback-excavating.jpg",
  },
  {
    slug: "timber-and-turf",
    name: "Timber & Turf",
    category: "Web Design",
    tagline: "Clean, conversion-focused site for a Utah landscaping company",
    description:
      "A professional marketing website for a Utah landscaping company serving residential and commercial clients. Built with a focus on local SEO, fast load times, and a streamlined bid-request flow to convert visitors into customers.",
    challenge:
      "Timber & Turf was relying on word-of-mouth and had no digital presence. They needed a site that reflected their professional standards, ranked for local landscaping searches, and made it easy for potential customers to request bids.",
    solution:
      "We built a clean, mobile-first marketing site with integrated analytics, schema markup for local search visibility, and a straightforward contact flow — giving the business a credible online presence that generates inbound leads.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Google Analytics", "Vercel"],
    highlights: [
      { label: "Availability", value: "6 days/wk" },
      { label: "Lighthouse Score", value: "95+" },
      { label: "Load Time", value: "<1s" },
      { label: "Mobile-First", value: "Yes" },
    ],
    link: "https://timberandturf.pro",
    image: "/portfolio/timber-and-turf.jpg",
  },
  {
    slug: "capital-pg-homes",
    name: "Capital Property Group",
    category: "Web Design",
    tagline: "Modern real estate and property management platform",
    description:
      "A polished, dark-themed real estate website for a Southwest Missouri property management company. Features MLS search integration, rental listings, storage unit availability, and investor-focused property management services.",
    challenge:
      "Capital Property Group operated across multiple business lines — sales, rentals, storage, and investor services — but their online presence didn't reflect the breadth or professionalism of their operation, making it hard for prospects to understand the full scope of services.",
    solution:
      "We built a modern Next.js site with a refined dark theme and gold accents, organized around clear service verticals with dedicated flows for buyers, renters, storage customers, and investors — complete with animations, responsive design, and structured data for search visibility.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Schema.org", "Vercel"],
    highlights: [
      { label: "Service Verticals", value: "4" },
      { label: "Dark/Light Mode", value: "Yes" },
      { label: "Lighthouse Score", value: "90+" },
      { label: "Markets Served", value: "SW Missouri" },
    ],
    link: "https://capitalpghomes.com",
    image: "/portfolio/capital-pg-homes.png",
  },
  {
    slug: "spite-house-affiliates",
    name: "Spite House Studios Affiliates",
    category: "Web App",
    tagline: "Affiliate platform turning short-form video into ad revenue",
    description:
      "An affiliate onboarding platform for Spite House Studios that lets content creators upload short-form videos and earn commissions when their content is repurposed as high-performing Facebook and Instagram ads.",
    challenge:
      "Spite House Studios had a proven ad model using creator content but no scalable way to onboard affiliates, collect video submissions, and track payouts — everything was manual and couldn't keep up with growth.",
    solution:
      "We built a streamlined Next.js affiliate portal with a three-step onboarding flow, video upload pipeline, and commission tracking — using a playful brand identity with custom mascot illustrations to match the creator-first tone of the business.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    highlights: [
      { label: "Commissions Paid", value: "$200K+" },
      { label: "Onboarding Steps", value: "3" },
      { label: "Ad Platforms", value: "2" },
      { label: "Creator-First UX", value: "Yes" },
    ],
    link: "https://affiliates.spitehousestudios.com",
    image: "/portfolio/spite-house-affiliates.png",
  },
  {
    slug: "dealprop",
    name: "DealProp",
    category: "SaaS Platform",
    status: "Under Development",
    tagline: "AI-powered operating system for real estate investors",
    description:
      "A comprehensive platform for real estate investors to manage deals, rehab projects, vendors, investors, and capital — all in one place. Features AI-powered deal analysis, multi-portal access for operators, investors, and vendors, and supports 8 investment strategies.",
    challenge:
      "Real estate investors were juggling spreadsheets, separate PM tools, and manual deal analysis across fix-and-flip, wholesale, BRRRR, and rental strategies — with no single platform that understood the full investment lifecycle.",
    solution:
      "We built a multi-portal SaaS platform with AI-powered deal analysis, rehab tracking, vendor bid marketplace, capital stack management, and built-in property management — supporting every strategy from wholesale to multifamily in one unified system.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "AI/ML"],
    highlights: [
      { label: "Investment Strategies", value: "8" },
      { label: "User Portals", value: "3" },
      { label: "AI Features", value: "4+" },
      { label: "Pricing Tiers", value: "4" },
    ],
    link: "https://dealprop.pro",
    image: "/portfolio/dealprop.png",
  },
  {
    slug: "cloud-x",
    name: "Cloud X",
    category: "SaaS Platform",
    status: "Under Development",
    tagline: "AI-native business OS for managed service providers",
    description:
      "An AI-native operating system for MSPs that runs the entire operation — lead to AI-generated proposal, e-signature, billing, and client portal as the PSA core, extended with remote monitoring, a vendor marketplace, commissions, and white-label tooling.",
    challenge:
      "MSPs run their business across a patchwork of PSA, RMM, billing, and documentation tools that don't talk to each other — so technicians lose hours to swivel-chair work and owners can't see the whole operation in one place.",
    solution:
      "We're building a single AI-native platform that unifies the MSP lifecycle: lead → AI proposal → e-sign → bill → portal as the core, then layering on remote monitoring, a marketplace, QBRs, and white-label options.",
    techStack: ["Next.js", "React", "TypeScript", "PostgreSQL", "AI/ML"],
    highlights: [
      { label: "Core Flow", value: "Lead→Bill" },
      { label: "AI-Native", value: "Yes" },
      { label: "Built For", value: "MSPs" },
      { label: "Modules", value: "PSA + RMM" },
    ],
    link: "https://cloud-x.co",
    image: "/portfolio/cloud-x.png",
  },
  {
    slug: "placed",
    name: "Placed",
    category: "SaaS Platform",
    status: "Under Development",
    tagline: "Vertical operating system for executive recruiting firms",
    description:
      "A recruiting CRM/ATS for contingent executive search firms covering the full revenue cycle — client proposal, candidate pipeline and placement, and payment collection — purpose-built for mid-market firms placing $25K–$50K roles.",
    challenge:
      "Contingent recruiting firms run on generic ATS tools and spreadsheets that ignore the money side — proposals, fee agreements, and collections live outside the system, so revenue tracking is manual and error-prone.",
    solution:
      "We're building a vertical OS for recruiting that connects client proposals, candidate placement, and payment collection in one platform — a single source of truth from pitch to paid, positioned against incumbents like Loxo.",
    techStack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    highlights: [
      { label: "Revenue Cycle", value: "Proposal→Paid" },
      { label: "Target Fees", value: "$25K–50K" },
      { label: "Firm Size", value: "5–50 seats" },
      { label: "Category", value: "ATS / CRM" },
    ],
    link: "https://placednow.com",
    image: "/portfolio/placed.png",
  },
  {
    slug: "roughcut-cedar-co",
    name: "Roughcut Cedar Co",
    category: "Web Design",
    tagline: "Marketing site for a rough-cut cedar products company",
    description:
      "A clean, conversion-focused marketing website for a rough-cut cedar products company — showcasing cedar lumber and custom products, building credibility with prospective buyers, and making it easy to request a quote.",
    challenge:
      "Roughcut Cedar Co needed a professional online presence that conveyed the quality of their cedar products and turned local interest into quote requests, rather than relying on word-of-mouth alone.",
    solution:
      "We designed and built a fast, mobile-first site that highlights their cedar product lines, communicates craftsmanship and quality, and drives inquiries with clear calls-to-action and a simple quote-request flow.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    highlights: [
      { label: "Product Focus", value: "Cedar" },
      { label: "Mobile-First", value: "Yes" },
      { label: "Lighthouse Score", value: "95+" },
      { label: "Load Time", value: "<1s" },
    ],
    link: "https://roughcutcedarco.com",
    image: "/portfolio/roughcut-cedar-co.png",
  },
  {
    slug: "thryve-advisors",
    name: "Thryve Advisors",
    category: "Web Design",
    tagline: "Dual pricing site that helps Springfield-area merchants stop paying credit card fees",
    description:
      "A focused marketing site for a Springfield, MO dual pricing solution provider that helps restaurants, auto repair shops, and liquor & convenience stores eliminate or offset credit card processing fees. The site walks merchants through how dual pricing works, makes the savings tangible, and converts a free statement review into qualified leads.",
    challenge:
      "Dual pricing is a powerful but unfamiliar model for most small business owners — Thryve needed a site that could educate skeptical merchants, address the common objections, and stand out as a trusted local advisor against national processors with much larger marketing budgets.",
    solution:
      "We built a fast, mobile-first marketing site organized around a 3-step explainer (display two prices → customer chooses → save thousands), industry-specific value props for restaurants, auto repair, and liquor & convenience, and a low-friction \"send your statement\" intake with a one-business-day response promise.",
    techStack: ["Astro", "Preact", "Tailwind CSS", "Cloudflare Workers", "Satori"],
    highlights: [
      { label: "Response Time", value: "1 day" },
      { label: "Industries Served", value: "3" },
      { label: "Lighthouse Score", value: "95+" },
      { label: "Mobile-First", value: "Yes" },
    ],
    link: "https://thryveadvisors.com",
    image: "/portfolio/thryve-advisors.png",
  },
  {
    slug: "tree-doctor",
    name: "The Tree Doctor",
    category: "Web Design",
    tagline: "Diagnostic-first arborist site for Springfield, MO and the Ozarks",
    description:
      "A polished marketing site for an ISA-certified arborist serving Greene, Christian, and Webster counties in Southwest Missouri. The site leads with a \"diagnosis before chainsaw\" philosophy, organizes services by use case (removal, pruning, diagnostics, stump grinding, commercial maintenance, storm response), and converts visitors with both a free estimate form and a 24/7 emergency hotline.",
    challenge:
      "The Tree Doctor's owner brings rare credentials — ISA certification, former Springfield city arborist, Missouri Community Forestry Council representative — but his prior web presence didn't communicate that depth, and most local competitors compete on price for removals rather than on diagnostic expertise. He needed a site that signaled professionalism, surfaced his 5.0-star reputation, and pulled in homeowners and HOAs willing to pay for real tree care.",
    solution:
      "We built a fast Next.js site with a calm, modern visual identity that frames trees as living organisms deserving diagnosis, not problems to be cut down. Services are broken out with species-specific pruning detail, a portfolio of real jobs builds trust, a blog covers local tree diseases and seasonal guidance, and Google Places integration surfaces the company's 100+ five-star reviews. Estimate requests and the 24/7 emergency line are one tap away on mobile.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Google Places API", "Vercel"],
    highlights: [
      { label: "Counties Served", value: "3+" },
      { label: "Google Rating", value: "5.0" },
      { label: "Emergency Line", value: "24/7" },
      { label: "ISA Certified", value: "MW-5822A" },
    ],
    link: "https://thetreedoctorllc.com",
    image: "/portfolio/tree-doctor.png",
  },
  {
    slug: "cortex-automations",
    name: "Cortex Automations",
    category: "Web Design",
    tagline: "Our own marketing site — built to practice what we preach",
    description:
      "The site you're looking at right now. A high-performance Next.js marketing site with dark/light theme support, SEO optimization, and a clean design system built entirely with Tailwind CSS.",
    challenge:
      "We needed a marketing site that demonstrated our capabilities while being fast, accessible, and easy to maintain — without relying on a CMS or any third-party page builder.",
    solution:
      "We built a fully static Next.js 15 site with App Router, Tailwind CSS 4, structured data for SEO, Vercel Analytics, and a custom design system — shipping a sub-second load time with a 95+ Lighthouse score.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Schema.org"],
    highlights: [
      { label: "Lighthouse Score", value: "95+" },
      { label: "Load Time", value: "<1s" },
      { label: "CMS Dependency", value: "None" },
      { label: "Dark/Light Mode", value: "Yes" },
    ],
    link: "https://cortexautomations.ai",
    image: "/portfolio/cortex-automations.png",
  },
];

export const PROCESS_STEPS = [
  {
    number: "1",
    title: "Discovery",
    description:
      "We start with a deep-dive into your business, goals, and technical requirements to define a clear project scope.",
  },
  {
    number: "2",
    title: "Design",
    description:
      "We create wireframes, prototypes, and technical architecture before writing a single line of code.",
  },
  {
    number: "3",
    title: "Build",
    description:
      "Agile development with weekly demos, continuous integration, and transparent progress tracking.",
  },
  {
    number: "4",
    title: "Launch & Support",
    description:
      "We deploy to production, monitor performance, and provide ongoing support to keep things running smoothly.",
  },
];

export const TECH_STACK = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Go", "REST APIs", "GraphQL"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "Redis", "MongoDB", "Prisma", "Drizzle"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Vercel", "AWS", "Docker", "GitHub Actions", "Terraform"],
  },
  {
    category: "AI & ML",
    items: ["OpenAI", "Anthropic", "LangChain", "Pinecone", "Hugging Face"],
  },
  {
    category: "Integrations",
    items: ["Stripe", "Twilio", "SendGrid", "Cal.com", "Zapier"],
  },
];

export const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.9/5", label: "Client Satisfaction" },
  { value: "24hr", label: "Response Time" },
];

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/cortex-automations1",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/cortex-automations",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "We came to Cortex with a mess of spreadsheets and a dream. They turned it into a real platform — on time, on budget, and way better than what we originally imagined.",
    author: "Jake M.",
    role: "Founder",
    company: "DealProp",
  },
  {
    quote:
      "Our old website was embarrassing. Cortex built us something that actually looks like a real company. We started getting calls the first week it went live.",
    author: "Ryan T.",
    role: "Owner",
    company: "Outback Excavating",
  },
  {
    quote:
      "They don't just build what you ask for — they think about what you actually need. We've saved hours every week since switching to the system they built us.",
    author: "Maria L.",
    role: "Operations Manager",
    company: "ServicePro Group",
  },
];

export const VALUES = [
  {
    title: "Quality First",
    description:
      "We write clean, tested, maintainable code. No shortcuts, no technical debt by choice.",
    icon: "Shield" as const,
  },
  {
    title: "Transparency",
    description:
      "Weekly demos, open communication, and honest timelines. You always know where things stand.",
    icon: "Eye" as const,
  },
  {
    title: "Ownership",
    description:
      "We treat every project like our own product. Your success is our reputation.",
    icon: "Heart" as const,
  },
  {
    title: "Security First",
    description:
      "Security isn't an afterthought. We follow OWASP guidelines and encrypt everything in transit and at rest.",
    icon: "Lock" as const,
  },
];

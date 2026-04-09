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
    slug: "signflow-pro",
    name: "SignFlow Pro",
    category: "SaaS Platform",
    tagline: "The all-in-one CRM for service businesses",
    description:
      "A full-featured CRM platform with proposal building, e-signatures, invoicing, recurring billing, and a client portal. Built from scratch with multi-tenant architecture supporting hundreds of businesses.",
    challenge:
      "Service businesses were managing proposals, contracts, invoicing, and client communication across 4–5 disconnected tools — leading to dropped leads, billing delays, and excessive manual data re-entry.",
    solution:
      "We architected a unified multi-tenant SaaS platform with a drag-and-drop proposal builder, legally-binding e-signatures via BoldSign, Stripe-powered recurring billing, and a white-labeled client portal — consolidating the entire client lifecycle into one product.",
    techStack: ["Next.js", "React", "Prisma", "PostgreSQL", "Stripe", "BoldSign"],
    highlights: [
      { label: "Block Types", value: "18+" },
      { label: "Industry Templates", value: "8" },
      { label: "Uptime", value: "99.9%" },
      { label: "API Endpoints", value: "40+" },
    ],
    link: "https://signflow.pro",
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
      "Cortex built what every other agency told us was too complex. The platform handles our entire client workflow — proposals to recurring billing — without a single integration failure.",
    author: "Marcus T.",
    role: "Operations Director",
    company: "ServicePro Group",
  },
  {
    quote:
      "Their ability to understand both the technical constraints and the business logic behind them is rare. We didn't just get code — we got a partner who thought through the architecture with us.",
    author: "Dr. Sarah K.",
    role: "Practice Owner",
    company: "Clarity Eye Care",
  },
  {
    quote:
      "We went from scattered spreadsheets and manual follow-ups to a fully automated workflow in 6 weeks. The ROI was immediate. I wish we had found Cortex Automations sooner.",
    author: "James R.",
    role: "CEO",
    company: "Apex Operations",
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

export const SITE_URL = "https://cortexautomations.ai";
export const CAL_LINK = "https://cal.com/cortex-automations/discovery";

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
    slug: "cloud-x",
    name: "Cloud-X",
    category: "IT Management",
    tagline: "Cloud infrastructure monitoring and management",
    description:
      "A cloud infrastructure management platform that provides real-time monitoring, automated scaling, cost optimization, and multi-cloud visibility for DevOps teams.",
    techStack: ["React", "Node.js", "AWS", "Terraform", "Grafana", "Docker"],
    highlights: [
      { label: "Cloud Providers", value: "3" },
      { label: "Metrics Tracked", value: "200+" },
      { label: "Alert Rules", value: "50+" },
      { label: "Cost Savings", value: "30%" },
    ],
  },
  {
    slug: "livemonitor",
    name: "LiveMonitor",
    category: "Real-Time Analytics",
    tagline: "Live application monitoring and alerting",
    description:
      "A real-time application performance monitoring tool with custom dashboards, intelligent alerting, error tracking, and distributed tracing for microservices architectures.",
    techStack: ["React", "Go", "ClickHouse", "Redis", "WebSockets", "Kubernetes"],
    highlights: [
      { label: "Events/sec", value: "100K+" },
      { label: "Data Retention", value: "90 days" },
      { label: "Alert Channels", value: "10+" },
      { label: "Latency", value: "<50ms" },
    ],
  },
  {
    slug: "liquidlogic",
    name: "LiquidLogic",
    category: "Workflow Automation",
    tagline: "Visual workflow builder for business automation",
    description:
      "A no-code workflow automation platform that lets businesses design, test, and deploy complex automations using a visual drag-and-drop interface with 50+ pre-built integrations.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Bull MQ", "React Flow"],
    highlights: [
      { label: "Integrations", value: "50+" },
      { label: "Workflow Runs", value: "1M+/mo" },
      { label: "Avg. Execution", value: "2.3s" },
      { label: "Uptime", value: "99.95%" },
    ],
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

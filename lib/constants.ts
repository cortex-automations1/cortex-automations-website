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
    slug: "cloud-x",
    name: "Cloud-X",
    category: "IT Management",
    tagline: "Cloud infrastructure monitoring and management",
    description:
      "A cloud infrastructure management platform that provides real-time monitoring, automated scaling, cost optimization, and multi-cloud visibility for DevOps teams.",
    challenge:
      "DevOps teams managing infrastructure across AWS, GCP, and Azure had no unified visibility. Siloed monitoring tools created alert fatigue and caused critical incidents to be missed.",
    solution:
      "We built a multi-cloud management dashboard with real-time metric aggregation, intelligent alert grouping, automated scaling policies, and cost attribution per service — reducing infrastructure costs by 30% and mean time to resolution by half.",
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
    challenge:
      "Engineering teams running microservices architectures lacked a lightweight, purpose-built observability tool. Existing solutions were too heavy, too expensive, or required weeks of configuration to get meaningful signal.",
    solution:
      "We built a real-time APM platform using Go for the data ingestion pipeline and ClickHouse for sub-50ms query performance at 100K events/sec — with customizable dashboards, multi-channel alerting, and distributed tracing out of the box.",
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
    challenge:
      "Operations teams at mid-market companies were spending 15+ hours per week on repetitive, rule-based tasks — approvals, data sync, notifications, and report generation — that required no human judgment but couldn't be handled by existing tools without heavy engineering work.",
    solution:
      "We built a no-code visual workflow builder using React Flow with 50+ pre-built integration nodes, a Bull MQ-powered execution engine, and a visual run debugger for tracing automation workflows in real time — putting automation in the hands of ops teams, not just engineers.",
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

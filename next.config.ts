import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // Conservative CSP: blocks clickjacking, base-tag injection, form
    // hijacking, and plugins. Scripts/styles/images are left permissive so
    // Vercel Analytics, next/font, next/image, and the Cal.com embed keep
    // working. Tighten further once a nonce pipeline is wired up.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://*.vercel-scripts.com https://assets.calendar.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://va.vercel-scripts.com https://*.vercel-scripts.com https://*.calendar.com",
      "frame-src 'self' https://*.calendar.com",
    ].join("; "),
  },
];

const ELEVATE = "https://elevateitpro.com";
const MAP: [string, string][] = [
  ["/", "/"],
  ["/about", "/about"],
  ["/contact", "/contact"],
  ["/privacy", "/privacy"],
  ["/terms", "/terms"],
  ["/services", "/solutions/build"],
  ["/services/saas-platforms", "/services/custom-development"],
  ["/services/mobile-apps", "/services/custom-development"],
  ["/services/web-design", "/services/website-design"],
  ["/services/ai-automation", "/solutions/automation-ai"],
  ["/services/consulting", "/services/technology-strategy"],
  ["/portfolio", "/work"],
  ["/portfolio/outback-excavating", "/work/outback-excavating"],
  ["/portfolio/timber-and-turf", "/work/timber-and-turf"],
  ["/portfolio/capital-pg-homes", "/work/capital-property-group"],
  ["/portfolio/roughcut-cedar-co", "/work/roughcut-cedar-co"],
  ["/portfolio/thryve-advisors", "/work/thryve-advisors"],
  ["/portfolio/tree-doctor", "/work/the-tree-doctor"],
  ["/portfolio/rons-outdoor-maintenance", "/work/rons-outdoor-maintenance"],
  ["/portfolio/elevate-it-solutions", "/"],
  ["/blog/custom-software-vs-templates", "/services/custom-development"],
  ["/blog/local-service-business-websites", "/services/website-design"],
  ["/blog/why-astro-preact-cloudflare-for-thryve-advisors", "/work/thryve-advisors"],
  ["/blog", "/solutions/build"],
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Cortex Automations has moved to Elevate IT Solutions (David, 2026-11-11; Elevate D-044, ADR 0012). Every path
  // forwards permanently to its closest Elevate page; anything unmapped goes to the Build hub. Email and the domain
  // itself are untouched. The table and its live check are in docs/redirect-map.md.
  async redirects() {
    return [
      ...MAP.map(([source, path]) => ({ source, destination: `${ELEVATE}${path}`, permanent: true })),
      { source: "/portfolio/:slug*", destination: `${ELEVATE}/work`, permanent: true },
      { source: "/:path*", destination: `${ELEVATE}/solutions/build`, permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

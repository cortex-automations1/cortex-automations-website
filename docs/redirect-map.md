# cortexautomations.ai → elevateitpro.com

Cortex Automations moved to Elevate IT Solutions (David, 2026-11-11; Elevate repo D-044, ADR 0012). Every path on
cortexautomations.ai (and www) forwards with a permanent 308 to its closest Elevate page. Email and the domain itself
are untouched. The map lives in `next.config.ts`.

- Mapped one to one: home, about, contact, privacy, terms, the five service pages, the seven client websites, the
  Elevate portfolio entry, and three blog posts.
- `/portfolio/*` not listed (products: QuoteHQ, DealProp, Saldera PSA, Spite House; and Cortex itself) → `/work`.
- Everything else, including the other blog posts, `/admin` and `/api/leads` (the old contact form) → `/solutions/build`.
  Web and software enquiries now come through Elevate's contact form into Elevate OS.

Search traffic before the move (Search Console, sc-domain:cortexautomations.ai, last 16 months, read 2026-11-11):
34 clicks, 667 impressions. Clicks: `/` 31, `/services/saas-platforms` 2, `/contact` 1. All three map to their Elevate
equivalents.

The live check of every URL in the old sitemap is recorded below after the deploy.

## Live check (2026-11-11, after merge d6a434a)

Every URL in the old sitemap plus www, a query string, /nope and /api/leads: 308 to the Elevate URL below, and the destination returns 200. Plain `http://` first gets Vercel's https upgrade, then the same 308 (two hops).

| Cortex URL | Status | Goes to | Destination |
|---|---|---|---|
| `https://cortexautomations.ai` | 308 | https://elevateitpro.com/ | 200 |
| `https://cortexautomations.ai/about` | 308 | https://elevateitpro.com/about | 200 |
| `https://cortexautomations.ai/services` | 308 | https://elevateitpro.com/solutions/build | 200 |
| `https://cortexautomations.ai/portfolio` | 308 | https://elevateitpro.com/work | 200 |
| `https://cortexautomations.ai/contact` | 308 | https://elevateitpro.com/contact | 200 |
| `https://cortexautomations.ai/privacy` | 308 | https://elevateitpro.com/privacy | 200 |
| `https://cortexautomations.ai/terms` | 308 | https://elevateitpro.com/terms | 200 |
| `https://cortexautomations.ai/services/saas-platforms` | 308 | https://elevateitpro.com/services/custom-development | 200 |
| `https://cortexautomations.ai/services/mobile-apps` | 308 | https://elevateitpro.com/services/custom-development | 200 |
| `https://cortexautomations.ai/services/web-design` | 308 | https://elevateitpro.com/services/website-design | 200 |
| `https://cortexautomations.ai/services/ai-automation` | 308 | https://elevateitpro.com/solutions/automation-ai | 200 |
| `https://cortexautomations.ai/services/consulting` | 308 | https://elevateitpro.com/services/technology-strategy | 200 |
| `https://cortexautomations.ai/portfolio/quotehq` | 308 | https://elevateitpro.com/work | 200 |
| `https://cortexautomations.ai/portfolio/outback-excavating` | 308 | https://elevateitpro.com/work/outback-excavating | 200 |
| `https://cortexautomations.ai/portfolio/timber-and-turf` | 308 | https://elevateitpro.com/work/timber-and-turf | 200 |
| `https://cortexautomations.ai/portfolio/capital-pg-homes` | 308 | https://elevateitpro.com/work/capital-property-group | 200 |
| `https://cortexautomations.ai/portfolio/spite-house-affiliates` | 308 | https://elevateitpro.com/work | 200 |
| `https://cortexautomations.ai/portfolio/dealprop` | 308 | https://elevateitpro.com/work | 200 |
| `https://cortexautomations.ai/portfolio/saldera-psa` | 308 | https://elevateitpro.com/work | 200 |
| `https://cortexautomations.ai/portfolio/roughcut-cedar-co` | 308 | https://elevateitpro.com/work/roughcut-cedar-co | 200 |
| `https://cortexautomations.ai/portfolio/thryve-advisors` | 308 | https://elevateitpro.com/work/thryve-advisors | 200 |
| `https://cortexautomations.ai/portfolio/tree-doctor` | 308 | https://elevateitpro.com/work/the-tree-doctor | 200 |
| `https://cortexautomations.ai/portfolio/rons-outdoor-maintenance` | 308 | https://elevateitpro.com/work/rons-outdoor-maintenance | 200 |
| `https://cortexautomations.ai/portfolio/elevate-it-solutions` | 308 | https://elevateitpro.com/ | 200 |
| `https://cortexautomations.ai/portfolio/cortex-automations` | 308 | https://elevateitpro.com/work | 200 |
| `https://cortexautomations.ai/blog` | 308 | https://elevateitpro.com/solutions/build | 200 |
| `https://cortexautomations.ai/blog/building-quotehq-quote-to-cash` | 308 | https://elevateitpro.com/solutions/build | 200 |
| `https://cortexautomations.ai/blog/dual-pricing-explained-for-small-businesses` | 308 | https://elevateitpro.com/solutions/build | 200 |
| `https://cortexautomations.ai/blog/local-service-business-websites` | 308 | https://elevateitpro.com/services/website-design | 200 |
| `https://cortexautomations.ai/blog/why-astro-preact-cloudflare-for-thryve-advisors` | 308 | https://elevateitpro.com/work/thryve-advisors | 200 |
| `https://cortexautomations.ai/blog/building-signflow-pro-crm-case-study` | 308 | https://elevateitpro.com/solutions/build | 200 |
| `https://cortexautomations.ai/blog/how-we-built-dealprop` | 308 | https://elevateitpro.com/solutions/build | 200 |
| `https://cortexautomations.ai/blog/why-nextjs-15` | 308 | https://elevateitpro.com/solutions/build | 200 |
| `https://cortexautomations.ai/blog/custom-software-vs-templates` | 308 | https://elevateitpro.com/services/custom-development | 200 |
| `https://www.cortexautomations.ai/` | 308 | https://elevateitpro.com/ | 200 |
| `https://www.cortexautomations.ai/portfolio/tree-doctor` | 308 | https://elevateitpro.com/work/the-tree-doctor | 200 |
| `https://cortexautomations.ai/nope` | 308 | https://elevateitpro.com/solutions/build | 200 |
| `https://cortexautomations.ai/services/web-design?utm_source=x` | 308 | https://elevateitpro.com/services/website-design?utm_source=x | 200 |
| `https://cortexautomations.ai/api/leads` | 308 | https://elevateitpro.com/solutions/build | 200 |

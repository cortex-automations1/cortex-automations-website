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

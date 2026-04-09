# Blog Content

- `published/` — MDX files that appear on the live site at `/blog`
- `drafts/` — Draft MDX files visible in `/admin/blog` for review before publishing

## Frontmatter schema

Every `.mdx` file must start with YAML frontmatter:

```yaml
---
title: "Post title"
slug: "post-url-slug"
description: "One-sentence meta description for SEO (~160 chars)"
publishedAt: "2026-04-09"
updatedAt: "2026-04-09"
tags: ["case-study", "nextjs"]
author: "David Perez"
featured: false
---
```

// Pings IndexNow with the homepage, blog index, and every published blog
// post after a production Vercel build. IndexNow notifies Bing, Yandex,
// Naver, Seznam, and Yep on submission; Bing's bot then re-crawls and
// discovers the rest of the site via /sitemap.xml. Google does not
// participate in IndexNow.
//
// Runs only when VERCEL_ENV === "production". Failures never break the
// build — IndexNow is fire-and-forget signal, not a deploy gate.

import fs from "node:fs";
import path from "node:path";

const KEY = "7197e0990eddcc727e716076581fcae0";
const HOST = "cortexautomations.ai";
const SITE = `https://${HOST}`;

if (process.env.VERCEL_ENV !== "production") {
  console.log("[indexnow] not a production deploy — skipping");
  process.exit(0);
}

const blogDir = path.join(process.cwd(), "content/blog/published");
const blogUrls = fs.existsSync(blogDir)
  ? fs
      .readdirSync(blogDir)
      .filter((f) => f.endsWith(".mdx"))
      .map(
        (f) =>
          `${SITE}/blog/${f.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.mdx$/, "")}`,
      )
  : [];

const urlList = [`${SITE}/`, `${SITE}/blog`, ...blogUrls];

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${SITE}/${KEY}.txt`,
  urlList,
};

try {
  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(
    `[indexnow] submitted ${urlList.length} URLs — HTTP ${res.status}`,
  );
} catch (err) {
  console.error("[indexnow] ping failed:", err.message);
}

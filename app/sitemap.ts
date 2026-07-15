import type { MetadataRoute } from "next";
import { SITE_URL, PROJECTS, SERVICES } from "@/lib/constants";
import { getAllPublishedPosts } from "@/lib/blog";

// Google's guidance: "Google uses the <lastmod> value if it's consistently
// and verifiably accurate. The <changefreq> and <priority> values are
// ignored." So we only emit lastmod where we actually know it (blog posts,
// from frontmatter). Static/service/project URLs omit it — emitting `new
// Date()` on every build was telling Google every page changed every crawl,
// which dilutes the signal.

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/contact",
    "/privacy",
    "/terms",
  ].map(
    function (route) {
      return { url: `${SITE_URL}${route}` };
    },
  );

  const serviceRoutes = SERVICES.map(function (service) {
    return { url: `${SITE_URL}/services/${service.slug}` };
  });

  const projectRoutes = PROJECTS.map(function (project) {
    return { url: `${SITE_URL}/portfolio/${project.slug}` };
  });

  const posts = getAllPublishedPosts();
  const blogIndex = {
    url: `${SITE_URL}/blog`,
    lastModified: posts.length
      ? new Date(posts[0].updatedAt ?? posts[0].publishedAt)
      : undefined,
  };

  const blogPostRoutes = posts.map(function (post) {
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
    };
  });

  return [
    ...baseRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    blogIndex,
    ...blogPostRoutes,
  ];
}

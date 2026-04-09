import type { MetadataRoute } from "next";
import { SITE_URL, PROJECTS, SERVICES } from "@/lib/constants";
import { getAllPublishedPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = ["", "/about", "/services", "/portfolio", "/contact"].map(
    function (route) {
      return {
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
      };
    },
  );

  const serviceRoutes = SERVICES.map(function (service) {
    return {
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  const projectRoutes = PROJECTS.map(function (project) {
    return {
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };
  });

  const blogIndex = {
    url: `${SITE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  };

  const blogPostRoutes = getAllPublishedPosts().map(function (post) {
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
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

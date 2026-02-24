import type { MetadataRoute } from "next";
import { SITE_URL, PROJECTS, SERVICES } from "@/lib/constants";

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

  return [...baseRoutes, ...serviceRoutes, ...projectRoutes];
}

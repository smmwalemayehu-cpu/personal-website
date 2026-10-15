import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/experience", "/education", "/research", "/projects", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    // Placeholder projects are excluded until real content is added.
    ...projects.filter((p) => !p.placeholder).map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, priority: 0.6 })),
  ];
}

import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { languages, site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/projects",
    ...projects.map((p) => `/projects/${p.slug}`),
    "/blog",
    ...posts.map((p) => `/blog/${p.slug}`),
    "/contact",
  ];
  return pages.flatMap((p) =>
    languages.map((lang) => ({
      url: `${site.url}/${lang}${p}`,
      lastModified: new Date("2026-10-28"),
      alternates: { languages: Object.fromEntries(languages.map((l) => [l, `${site.url}/${l}${p}`])) },
    })),
  );
}

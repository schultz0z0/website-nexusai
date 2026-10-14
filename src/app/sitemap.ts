import type { MetadataRoute } from "next";
import { COMPANY } from "../lib/content.ts";
import { SERVICES, servicePath } from "../lib/service-content.ts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = COMPANY.url;

  return [
    {
      url: baseUrl,
      lastModified: "2026-10-14",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: "2026-10-14",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacidade`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/servicos`,
      lastModified: "2026-10-14",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...SERVICES.map((service) => ({
      url: `${baseUrl}${servicePath(service)}`,
      lastModified: service.updatedAt,
      images: service.slug === "prometeus-rastro"
        ? ["demo-inventory-original", "demo-movement-original", "demo-history-original"].map(name => `${baseUrl}/images/rastro/${name}.webp`)
        : service.slug === "desenvolvimento-web"
          ? ["jotape", "foxstage"].map(name => `${baseUrl}/images/portfolio/${name}-poster.webp`)
          : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

import type { MetadataRoute } from "next";
import { COMPANY } from "../lib/content.ts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = COMPANY.url;

  return [
    { url: `${baseUrl}/` },
    { url: `${baseUrl}/contato` },
    { url: `${baseUrl}/privacidade` },
    { url: `${baseUrl}/cookies` },
  ];
}

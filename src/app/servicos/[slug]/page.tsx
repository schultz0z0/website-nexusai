import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service-detail";
import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";
import { SERVICES, getService, servicePath } from "@/lib/service-content";
import { buildServiceSchemas } from "@/lib/service-schema";
import { SITE_OG_IMAGE } from "@/lib/site-metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) notFound();
  const title = `${service.name} | ${COMPANY.name}`;
  return {
    title,
    description: service.description,
    alternates: { canonical: servicePath(service) },
    robots: { index: true, follow: true },
    openGraph: { title, description: service.description, url: `${COMPANY.url}${servicePath(service)}`, siteName: COMPANY.name, locale: "pt_BR", type: "website", images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description: service.description, images: [SITE_OG_IMAGE] },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return <><JsonLd schema={buildServiceSchemas(service)} /><ServiceDetail service={service} /></>;
}

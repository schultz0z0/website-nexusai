import { COMPANY } from "./content.ts";
import { servicePath, type ServiceContent } from "./service-content.ts";

export function buildServiceSchemas(service: ServiceContent): Record<string, unknown>[] {
  const url = `${COMPANY.url}${servicePath(service)}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.name,
      description: service.description,
      serviceType: service.shortName,
      url,
      areaServed: { "@type": "Country", name: "Brasil" },
      provider: { "@id": `${COMPANY.url}/#organization`, "@type": "Organization", name: COMPANY.name, url: COMPANY.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: COMPANY.url },
        { "@type": "ListItem", position: 2, name: "Serviços", item: `${COMPANY.url}/servicos` },
        { "@type": "ListItem", position: 3, name: service.shortName, item: url },
      ],
    },
  ];
}

import { COMPANY } from "./content.ts";
import { servicePath, type ServiceContent } from "./service-content.ts";
import { WEB_MAINTENANCE, WEB_OFFERS, webOfferPrices } from "./web-offers.ts";

export function buildServiceSchemas(service: ServiceContent): Record<string, unknown>[] {
  const url = `${COMPANY.url}${servicePath(service)}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.name,
      description: service.description,
      serviceType: service.category,
      category: service.category,
      url,
      mainEntityOfPage: { "@id": `${url}#webpage` },
      areaServed: { "@type": "Country", name: "Brasil" },
      provider: { "@id": `${COMPANY.url}/#organization`, "@type": "Organization", name: COMPANY.name, url: COMPANY.url },
      ...(service.slug === "desenvolvimento-web" ? {
        offers: WEB_OFFERS.map(offer => {
          const prices = webOfferPrices(offer);
          return {
            "@type": "Offer",
            "@id": `${url}#oferta-${offer.id}`,
            name: offer.name,
            url: `${url}#ofertas`,
            price: prices.totalCents / 100,
            priceCurrency: "BRL",
            description: `Criação por R$ ${prices.totalCents / 100}, em ${prices.installments} parcelas sem juros, ou R$ ${prices.pixTotalCents / 100} no Pix. Pacote obrigatório adicional de R$ ${WEB_MAINTENANCE.monthlyCents / 100}/mês: hospedagem, domínio, manutenção da infraestrutura e ${WEB_MAINTENANCE.monthlyAdjustments} ajustes mensais. O checkout é uma simulação e não realiza cobranças.`,
            seller: { "@id": `${COMPANY.url}/#organization` },
          };
        }),
      } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: COMPANY.url },
        { "@type": "ListItem", position: 2, name: "Serviços", item: `${COMPANY.url}/servicos` },
        { "@type": "ListItem", position: 3, name: service.shortName, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: service.seoTitle,
      description: service.description,
      inLanguage: "pt-BR",
      dateModified: service.updatedAt,
      isPartOf: { "@id": `${COMPANY.url}/#website` },
      publisher: { "@id": `${COMPANY.url}/#organization` },
      mainEntity: { "@id": `${url}#service` },
      breadcrumb: { "@id": `${url}#breadcrumbs` },
    },
  ];
}

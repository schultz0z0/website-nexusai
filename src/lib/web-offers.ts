export interface WebOffer {
  id: "site" | "loja-virtual";
  name: string;
  description: string;
  totalCents: number;
  installments: number;
  pixDiscountPercent: number;
}

export const WEB_OFFERS: readonly WebOffer[] = [
  {
    id: "site",
    name: "Criação de site",
    description: "Apresente sua empresa, seus serviços e os caminhos para entrar em contato.",
    totalCents: 150000,
    installments: 10,
    pixDiscountPercent: 5,
  },
  {
    id: "loja-virtual",
    name: "Criação de loja virtual",
    description: "Apresente seus produtos e prepare sua loja para receber pedidos pela internet.",
    totalCents: 150000,
    installments: 10,
    pixDiscountPercent: 5,
  },
];

export const WEB_MAINTENANCE = {
  monthlyCents: 5000,
  required: true,
  monthlyAdjustments: 3,
  includes: ["Hospedagem do site", "Domínio", "Manutenção da infraestrutura", "3 ajustes mensais para manter o site atualizado"],
} as const;

export function webOfferPrices(offer: WebOffer) {
  return {
    totalCents: offer.totalCents,
    installments: offer.installments,
    installmentCents: offer.totalCents / offer.installments,
    pixDiscountPercent: offer.pixDiscountPercent,
    pixTotalCents: Math.round(offer.totalCents * (100 - offer.pixDiscountPercent) / 100),
  };
}

export function getWebOffer(value: unknown): WebOffer | undefined {
  return WEB_OFFERS.find((offer) => offer.id === value);
}

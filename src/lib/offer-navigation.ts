import { SERVICES, servicePath } from "./service-content.ts";

const labels: Record<string, string> = {
  "prometeus-copiloto": "Copiloto",
  "prometeus-rastro": "Rastro",
  "prometeus-soft-phone": "Soft Phone",
  "atendimento-ia-whatsapp": "IA no WhatsApp",
  "desenvolvimento-sob-medida": "Software sob medida",
  "desenvolvimento-web": "Sites e lojas virtuais",
};

export const OFFER_NAVIGATION = [
  { label: "Produtos", items: SERVICES.filter((service) => service.kind === "product") },
  { label: "Soluções", items: SERVICES.filter((service) => service.kind !== "product") },
].map((group) => ({
  label: group.label,
  items: group.items.map((service) => ({ href: servicePath(service), label: labels[service.slug] ?? service.name })),
}));

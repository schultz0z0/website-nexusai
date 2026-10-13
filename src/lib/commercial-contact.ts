export const COMMERCIAL_WHATSAPP = "5521973231943";

export function whatsappContact(offer?: string, demonstration = false): string {
  const message = offer
    ? demonstration
      ? `Olá! Gostaria de agendar uma demonstração do ${offer} e conversar sobre a personalização para minha empresa.`
      : `Olá! Gostaria de conversar sobre ${offer} para minha empresa.`
    : "Olá! Gostaria de conhecer os produtos e soluções da Prometeus.";
  return `https://wa.me/${COMMERCIAL_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

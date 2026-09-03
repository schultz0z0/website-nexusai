import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soluções de IA e automação sob medida | Prometeus",
  description: "Conheça aplicações de IA para atendimento, marketing, vendas, estoque, análise de dados e operações internas.",
  robots: { index: false, follow: true },
};

export default function SolucoesRedirectPage() {
  permanentRedirect("/#aplicacoes");
}

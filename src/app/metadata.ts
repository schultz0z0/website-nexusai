import type { Metadata } from "next";
import { COMPANY } from "@/lib/content";

const TITLE = "Nexus AI · IA que multiplica sua equipe";
const DESCRIPTION =
  "Plataformas e agentes de IA sob medida. Diagnóstico antes de proposta, entrega em 4-12 semanas, operação contínua. Resposta humana em até 24h úteis.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: COMPANY.url },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: COMPANY.url,
    siteName: COMPANY.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

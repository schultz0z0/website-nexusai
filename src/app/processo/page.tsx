import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Processo de implementação de IA | Prometeus",
  description: "Do diagnóstico à implementação e ao suporte contínuo: veja como a Prometeus coloca soluções de IA em produção.",
  robots: { index: false, follow: true },
};

export default function ProcessoRedirectPage() {
  permanentRedirect("/#como-trabalhamos");
}

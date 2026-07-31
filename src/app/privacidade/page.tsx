import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, Mail, ArrowLeft } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";

const TITLE = "Política de Privacidade · Nexus AI";
const DESCRIPTION =
  "Saiba como a Nexus AI coleta, utiliza, armazena e protege seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${COMPANY.url}/privacidade` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${COMPANY.url}/privacidade`,
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

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: TITLE,
  description: DESCRIPTION,
  url: `${COMPANY.url}/privacidade`,
  publisher: {
    "@type": "Organization",
    name: COMPANY.name,
    url: COMPANY.url,
  },
};

export default function PrivacidadePage() {
  return (
    <>
      <JsonLd schema={privacySchema} />
      <main className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-foreground/60 hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Voltar ao início
          </Link>
        </div>

        {/* Header Hero */}
        <header className="mb-12 border-b border-border/40 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>LGPD & Transparência</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Política de Privacidade
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 max-w-2xl">
            Sua privacidade e a segurança dos seus dados são fundamentais na Nexus AI. Esta política descreve como tratamos suas informações.
          </p>
          <div className="mt-4 text-xs text-foreground/50">
            Última atualização: 31 de julho de 2026
          </div>
        </header>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base text-foreground/80 leading-relaxed">
          {/* Section 1 */}
          <section className="p-6 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-3 text-foreground font-semibold text-lg">
              <Eye className="w-5 h-5 text-primary" />
              <h2>1. Coleta de Dados Pessoais</h2>
            </div>
            <p>
              Coletamos informações pessoais que você nos fornece voluntariamente ao preencher nosso formulário de contato ou diagnóstico inicial no site:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 pl-2">
              <li><strong>Dados de identificação:</strong> Nome completo, endereço de e-mail corporativo e nome da empresa.</li>
              <li><strong>Dados profissionais:</strong> Cargo e setor de atuação principal da sua empresa.</li>
              <li><strong>Contexto operacional:</strong> Informações sobre gargalos operacionais e desafios informados no campo de mensagem.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="p-6 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-3 text-foreground font-semibold text-lg">
              <FileText className="w-5 h-5 text-primary" />
              <h2>2. Finalidade do Tratamento dos Dados</h2>
            </div>
            <p>
              Utilizamos os dados coletados estritamente para os seguintes propósitos legítimos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 pl-2">
              <li>Analisar o contexto da sua operação e preparar o retorno do diagnóstico inicial.</li>
              <li>Entrar em contato via e-mail para agendar conversas de alinhamento técnico.</li>
              <li>Elaborar propostas técnicas e estimativas de ROI personalizadas para o seu cenário.</li>
              <li>Cumprir obrigações legais e regulatórias vigentes.</li>
            </ul>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-xs sm:text-sm text-foreground/80 font-medium">
              💡 <strong>Importante:</strong> A Nexus AI <strong>não vende, aluga nem compartilha</strong> seus dados com terceiros para fins de marketing ou publicidade.
            </div>
          </section>

          {/* Section 3 */}
          <section className="p-6 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-3 text-foreground font-semibold text-lg">
              <Lock className="w-5 h-5 text-primary" />
              <h2>3. Segurança e Armazenamento</h2>
            </div>
            <p>
              Adotamos medidas técnicas e organizacionais de segurança para proteger seus dados contra acesso não autorizado, perda, alteração ou divulgação:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 pl-2">
              <li>Comunicação criptografada via HTTPS (SSL/TLS).</li>
              <li>Processamento de requisições em ambiente de servidor seguro com controle de acesso restrito.</li>
              <li>Armazenamento de respostas em infraestrutura corporativa protegida com autenticação em dois fatores.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="p-6 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-3 text-foreground font-semibold text-lg">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h2>4. Seus Direitos Sob a LGPD</h2>
            </div>
            <p>
              Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você possui direitos garantidos em relação aos seus dados pessoais:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-background/50 border border-border/30 text-xs">
                <strong>Confirmação e Acesso:</strong> Confirmar a existência de tratamento e acessar seus dados.
              </div>
              <div className="p-3 rounded-xl bg-background/50 border border-border/30 text-xs">
                <strong>Correção:</strong> Solicitar a correção de dados incompletos ou desatualizados.
              </div>
              <div className="p-3 rounded-xl bg-background/50 border border-border/30 text-xs">
                <strong>Eliminação:</strong> Solicitar a exclusão definitiva dos seus dados de nossos registros.
              </div>
              <div className="p-3 rounded-xl bg-background/50 border border-border/30 text-xs">
                <strong>Revogação:</strong> Revogar o consentimento para tratamento dos dados a qualquer momento.
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="p-6 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-3 text-foreground font-semibold text-lg">
              <Mail className="w-5 h-5 text-primary" />
              <h2>5. Contato sobre Privacidade e DPO</h2>
            </div>
            <p>
              Para exercer qualquer um dos seus direitos ou tirar dúvidas sobre esta Política de Privacidade, entre em contato direto com nossa equipe:
            </p>
            <div className="inline-flex items-center gap-3 p-4 rounded-xl bg-card border border-border text-sm font-medium">
              <Mail className="w-4 h-4 text-primary" />
              <a href={`mailto:${COMPANY.email}`} className="hover:underline text-foreground">
                {COMPANY.email}
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

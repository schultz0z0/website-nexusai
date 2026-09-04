import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Eye, FileText, Lock, Mail, ShieldCheck } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";
import { SITE_OG_IMAGE } from "@/lib/site-metadata";

const TITLE = "Política de Privacidade | Prometeus";
const DESCRIPTION = "Saiba como a Prometeus coleta, utiliza, protege e trata dados pessoais enviados pelo site, incluindo seus direitos previstos na LGPD.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${COMPANY.url}/privacidade`, siteName: COMPANY.name, locale: "pt_BR", type: "website", images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: "Política de Privacidade da Prometeus" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [SITE_OG_IMAGE] },
};

const privacySchema = { "@context": "https://schema.org", "@type": "WebPage", name: TITLE, description: DESCRIPTION, url: `${COMPANY.url}/privacidade`, publisher: { "@type": "Organization", name: COMPANY.name, url: COMPANY.url } };

export default function PrivacidadePage() {
  return (
    <>
      <JsonLd schema={privacySchema} />
      <main className="relative mx-auto min-h-screen max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-2 text-xs font-medium text-foreground/60 transition-colors hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />Voltar ao início</Link>
        <header className="mt-8 border-b border-border/40 pb-8"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"><ShieldCheck className="h-3.5 w-3.5" /> LGPD & transparência</div><h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Política de Privacidade</h1><p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">Esta página explica, de forma objetiva, quais dados entram no site, para que servem e quais escolhas estão disponíveis.</p><p className="mt-4 text-xs text-foreground/50">Última atualização: 31 de agosto de 2026</p></header>
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/80 sm:text-base">
          <section className="space-y-4 rounded-2xl border border-border/50 bg-card/40 p-6"><h2 className="flex items-center gap-3 text-lg font-semibold text-foreground"><Eye className="h-5 w-5 text-primary" />1. Quem trata os dados</h2><p>A Prometeus é responsável pelo site <strong>{COMPANY.url}</strong>. O canal para dúvidas ou solicitações relacionadas a dados pessoais é <a className="underline underline-offset-2" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Não publicamos CNPJ, endereço ou encarregado sem uma informação real e confirmada.</p></section>
          <section className="space-y-4 rounded-2xl border border-border/50 bg-card/40 p-6"><h2 className="flex items-center gap-3 text-lg font-semibold text-foreground"><FileText className="h-5 w-5 text-primary" />2. Dados que recebemos</h2><p>Quando você envia o formulário de contato, recebemos somente os campos exibidos nele:</p><ul className="list-disc space-y-2 pl-5"><li>nome, e-mail e telefone ou WhatsApp;</li><li>empresa, quando informado;</li><li>contexto escrito na mensagem, para entender a solicitação.</li></ul><p>O hosting também pode manter logs técnicos necessários à segurança e à operação, como endereço IP, navegador e data de acesso, conforme as configurações e prazos do provedor.</p></section>
          <section className="space-y-4 rounded-2xl border border-border/50 bg-card/40 p-6"><h2 className="flex items-center gap-3 text-lg font-semibold text-foreground"><ShieldCheck className="h-5 w-5 text-primary" />3. Finalidades e bases</h2><ul className="list-disc space-y-2 pl-5"><li>Responder ao pedido de contato e organizar um diagnóstico solicitado, com base na execução de medidas pré-contratuais ou no interesse legítimo aplicável.</li><li>Prevenir abuso, manter a segurança e operar o site, com base no interesse legítimo e em obrigações aplicáveis.</li><li>Medir navegação, otimizar a experiência e mensurar campanhas somente após consentimento específico para Analytics ou Marketing.</li></ul><p>O formulário não exige consentimento genérico de marketing para ser enviado. O consentimento de cookies pode ser alterado a qualquer momento no rodapé.</p></section>
          <section className="space-y-4 rounded-2xl border border-border/50 bg-card/40 p-6"><h2 className="flex items-center gap-3 text-lg font-semibold text-foreground"><Lock className="h-5 w-5 text-primary" />4. Compartilhamento e retenção</h2><p>As respostas do formulário são encaminhadas ao Google Forms para recebimento pela equipe. O tratamento também fica sujeito aos controles e políticas desse fornecedor, que pode processar dados fora do Brasil. Ferramentas de Analytics ou Marketing não recebem o texto livre do formulário e só são carregadas após a categoria correspondente ser autorizada e um ID real ser configurado.</p><p>Conservamos as respostas pelo período necessário para responder e conduzir a conversa, além de eventuais obrigações legais. Como ainda não há prazo operacional fechado, não apresentamos um número rígido; a rotina de retenção deve ser formalizada antes de uma operação em escala.</p></section>
          <section className="space-y-4 rounded-2xl border border-border/50 bg-card/40 p-6"><h2 className="text-lg font-semibold text-foreground">5. Seus direitos</h2><p>Nos termos da LGPD, você pode solicitar confirmação e acesso, correção, anonimização, bloqueio ou eliminação quando cabível, portabilidade quando aplicável, informações sobre compartilhamento, revogação do consentimento e oposição nos casos previstos. Também é possível peticionar perante a ANPD. Envie a solicitação para <a className="underline underline-offset-2" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>; poderemos pedir dados mínimos para confirmar a identidade e evitar atendimento indevido.</p></section>
          <section className="space-y-4 rounded-2xl border border-border/50 bg-card/40 p-6"><h2 className="flex items-center gap-3 text-lg font-semibold text-foreground"><Mail className="h-5 w-5 text-primary" />6. Cookies e mudanças</h2><p>O site usa armazenamento local first-party para guardar sua escolha de cookies. Analytics e Marketing ficam desligados por padrão. Detalhes, fornecedores e como revogar estão na <Link className="underline underline-offset-2" href="/cookies">Política de Cookies</Link>. Esta política será atualizada quando a operação, os fornecedores ou as finalidades mudarem.</p></section>
        </div>
      </main>
    </>
  );
}

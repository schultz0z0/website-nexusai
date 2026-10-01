import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Cookie, ShieldCheck } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { COMPANY } from "@/lib/content";
import { SITE_OG_IMAGE } from "@/lib/site-metadata";

const TITLE = "Política de Cookies | Prometeus";
const DESCRIPTION = "Entenda quais cookies e tecnologias de rastreamento podem ser utilizados pela Prometeus e como gerenciar suas preferências.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/cookies",
    siteName: COMPANY.name,
    locale: "pt_BR",
    type: "website",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: "Política de Cookies da Prometeus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: SITE_OG_IMAGE, alt: "Política de Cookies da Prometeus" }],
  },
};

const cookieSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: TITLE,
  description: DESCRIPTION,
  url: `${COMPANY.url}/cookies`,
  publisher: { "@type": "Organization", name: COMPANY.name, url: COMPANY.url },
};

export default function CookiesPage() {
  return (
    <>
      <JsonLd schema={cookieSchema} />
      <main className="relative mx-auto min-h-screen max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-2 text-xs font-medium text-foreground/60 transition-colors hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Voltar ao início
        </Link>
        <header className="mt-8 border-b border-border/40 pb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"><Cookie className="h-3.5 w-3.5" /> Transparência</div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Política de Cookies</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">Explicamos o que é armazenado no seu navegador, o que depende da sua escolha e como mudar essa decisão depois.</p>
          <p className="mt-4 text-xs text-foreground/50">Última atualização: 1 de outubro de 2026</p>
        </header>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/80 sm:text-base">
          <section className="space-y-3 rounded-2xl border border-border/50 bg-card/40 p-6"><h2 className="flex items-center gap-3 text-lg font-semibold text-foreground"><ShieldCheck className="h-5 w-5 text-primary" /> 1. O que são cookies</h2><p>Cookies e tecnologias semelhantes são pequenos identificadores armazenados pelo navegador para manter preferências e, quando autorizado, medir o uso do site. A Prometeus não usa cookies não essenciais antes da sua escolha.</p></section>
          <section className="space-y-3 rounded-2xl border border-border/50 bg-card/40 p-6"><h2 className="text-lg font-semibold text-foreground">2. Categorias e estado atual</h2><ul className="list-disc space-y-2 pl-5"><li><strong>Necessários:</strong> a preferência de consentimento é guardada em armazenamento local first-party para o site funcionar. Não depende de autorização.</li><li><strong>Analytics:</strong> desligado por padrão. Após sua autorização, o Microsoft Clarity mede navegação e interações para gerar mapas de calor e gravações de sessão. GA4 ou GTM também podem carregar quando configurados.</li><li><strong>Marketing/Publicidade:</strong> desligado por padrão. A autorização desta categoria controla o armazenamento de publicidade do Clarity, quando Analytics também está autorizado. Meta Pixel ou ferramentas equivalentes só carregam após autorização e configuração.</li></ul></section>
          <section className="space-y-3 rounded-2xl border border-border/50 bg-card/40 p-6"><h2 className="text-lg font-semibold text-foreground">3. Fornecedor, nome e duração</h2><p>O mecanismo próprio usa a chave de armazenamento local <code className="rounded bg-background/70 px-1.5 py-0.5 text-xs">nexus-cookie-consent</code>, com a versão da política, categorias escolhidas e data/hora. Ela permanece até ser substituída, removida pelo navegador ou revogada no painel.</p><p>O Microsoft Clarity usa os cookies próprios <code>_clck</code> para manter o identificador e as preferências do visitante e <code>_clsk</code> para associar páginas a uma sessão. Cookies de terceiros da Microsoft, como MUID, dependem também da escolha de Marketing e das configurações do navegador. Os cookies efetivamente gravados e seus prazos podem variar conforme o serviço; consulte a <a className="underline underline-offset-2" href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies" target="_blank" rel="noopener noreferrer">documentação de cookies do Clarity</a>. Se GA4, GTM ou Meta Pixel forem habilitados, esta política deverá ser atualizada com seus fornecedores, nomes e prazos.</p></section>
          <section className="space-y-3 rounded-2xl border border-border/50 bg-card/40 p-6"><h2 className="text-lg font-semibold text-foreground">4. Como alterar ou revogar</h2><p>Use o link <strong>Preferências de cookies</strong> no rodapé para reabrir o painel e salvar uma nova escolha. A revogação impede novos carregamentos opcionais e remove os scripts opcionais inseridos pelo site. Se o Clarity já estava carregado, a página é recarregada para encerrar a gravação. A nova preferência também é comunicada ao Clarity; cookies de terceiros já gravados podem exigir limpeza manual no navegador.</p><p>Esta política complementa a <Link className="underline underline-offset-2" href="/privacidade">Política de Privacidade</Link>.</p></section>
          <section className="space-y-3 rounded-2xl border border-border/50 bg-card/40 p-6"><h2 className="text-lg font-semibold text-foreground">5. Atualizações</h2><p>Atualizaremos esta página quando uma nova tecnologia, fornecedor ou finalidade for adicionada. A data no topo indica a revisão mais recente.</p></section>
        </div>
      </main>
    </>
  );
}

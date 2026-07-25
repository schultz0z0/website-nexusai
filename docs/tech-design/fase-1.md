# Desenho Técnico — Fase 1

> Implementação concreta da Fase 1. Cada mudança aqui vira 1 commit.

## Mudanças por arquivo

### 1. `src/components/nexus-nav.tsx`

**Hoje:** nav mobile e desktop hardcoded com links para `#solucoes`, `#cases`, `#processo`, `#contato`.

**Mudar:**
- Item "Cases" removido do array `ITEMS`
- `href` de cada item vira rota real:
  - `{ label: "Soluções", href: "/solucoes" }`
  - `{ label: "Processo", href: "/processo" }`
  - `{ label: "Contato", href: "/contato" }`
- CTA "Falar" no nav desktop: `href="/contato"` (mantém idêntico o resto)
- CTA "Falar com a equipe" no drawer mobile: `href="/contato"` (mantém)
- Remover o `onClick={() => setOpen(false)}` redundante? Não — `<Link>` já navega, mas o `setOpen(false)` ainda é necessário pra fechar o drawer antes da navegação completar. Manter.

**Não muda:** layout visual, glass, sheen, divider do logo.

### 2. `src/components/ui/pixel-perfect-hero.tsx`

**Hoje:** o hero tem o bloco da marquee na seção center (`block md:hidden w-full mt-8`) e a seção desktop-only da marquee embaixo (`hidden md:flex absolute bottom-8`).

**Mudar:** remover as duas seções inteiras. Não deletar a constante `BRAND_LOGOS` ainda — YAGNI deletar agora (Fase 2 pode querer para ilustração de stack, não clientes).

**Cuidado:** ao remover a marquee desktop (`absolute bottom-8`), o footer precisa preencher esse vazio. Footer entra no `<body>` depois de `{children}` no layout, vai aparecer normalmente embaixo.

### 3. `src/components/site-footer.tsx` (novo)

Componente novo. Estrutura:

```tsx
import Link from "next/link";

const ITEMS = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Processo", href: "/processo" },
  { label: "Contato", href: "/contato" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 mt-12 md:mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand block */}
          <Link href="/" className="inline-flex items-center gap-2 text-foreground/90 hover:text-foreground">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="6" className="fill-foreground" />
              <path d="M7 17 V7 L17 17 V7" stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" className="text-background" />
            </svg>
            <span className="text-sm font-semibold tracking-tight">
              Nexus<span className="text-foreground/60 font-medium"> AI</span>
            </span>
          </Link>
          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70">
            {ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ))}
            <a href="mailto:contato@nexusai.com.br" className="hover:text-foreground transition-colors">
              contato@nexusai.com.br
            </a>
          </nav>
        </div>
        <div className="mt-6 pt-6 border-t border-border/40 text-xs text-foreground/50">
          © {year} Nexus AI. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
```

**Decisões dentro do componente:**
- Email: `contato@nexusai.com.br` é placeholder. Confirmar com usuário antes de finalizar (PRD lista isso como ponto a confirmar).
- Sem ícone social (LinkedIn, X). YAGNI — não tem conteúdo.
- Sem coluna "Sobre" extra. Mínimo pra fase 1.
- `border-t border-border/40` + `mt-12 md:mt-20` pra dar respiro entre última seção da home e o footer.

### 4. `src/app/layout.tsx`

**Hoje:** `<body><NexusNav />{children}</body>`

**Mudar:** adicionar `<SiteFooter />` depois de `{children}`.

```tsx
<body className="min-h-full flex flex-col">
  <NexusNav />
  <div className="flex-1">{children}</div>
  <SiteFooter />
</body>
```

**Por que `flex-1`:** garante que páginas com pouco conteúdo (placeholder) o footer cola no fundo da viewport, não sobe pro meio.

### 5. `src/app/solucoes/page.tsx` (novo)

Página placeholder mínima:

```tsx
import { PixelHero } from "@/components/ui/pixel-perfect-hero";

export const metadata = { title: "Soluções · Nexus AI" };

export default function SolucoesPage() {
  return (
    <div className="w-full min-h-[80vh] bg-background flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-2xl">
        <span className="tahoe-glass-text block text-5xl md:text-7xl leading-[0.95] mb-6">
          Soluções
        </span>
        <p className="text-lg md:text-xl font-normal text-foreground max-w-xl mx-auto leading-snug">
          Conteúdo em construção. Voltamos em breve com as áreas onde a Nexus AI entrega resultado.
        </p>
      </div>
    </div>
  );
}
```

**Decisão:** NÃO usar `PixelHero` inteiro (com canvas, badge, CTAs) na página placeholder. É peso desnecessário. Versão "lite" sem canvas — só o título com efeito tahoe.

**Lazy:** se precisar reusar o hero completo depois (Fase 2 quando tiver conteúdo), fatorar `PixelHero` em 2 componentes: `<HeroCanvas>` + `<HeroLayout>`. Por ora, duplicar o estilo nos placeholders.

### 6. `src/app/processo/page.tsx` (novo)

Mesma estrutura do placeholder, copy:

```tsx
export const metadata = { title: "Processo · Nexus AI" };
// ... mesmo shell, com word1="Processo", word2=" claro.", descrição="Como trabalhamos: do diagnóstico à entrega."
```

Copy placeholder: `"Do diagnóstico à entrega. Conteúdo em construção."`

### 7. `src/app/contato/page.tsx` (novo)

Placeholder. Form vem na Fase 3. Por ora, mesmo shell com word1="Contato" + descrição "Pronto para começar? Conteúdo em construção."

### 8. `src/app/page.tsx`

**Hoje:** CTA primário da home é `<button>` (sem href), faz `console.log`.

**Mudar:** envolver com `<Link href="/contato">` em vez de button, OU trocar pra `<a href="/contato">`. Recomendo `<Link>` (Next navega client-side, mais rápido).

```tsx
<Link
  href="/contato"
  className="relative inline-flex h-12 md:h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-6 md:px-8 text-sm md:text-sm font-semibold text-primary-foreground shadow-[...] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
>
  <span className="inline md:hidden">{primaryCtaMobile}</span>
  <span className="hidden md:inline">{primaryCta}</span>
  <ArrowRight className="w-4 h-4" />
</Link>
```

**Decisão:** remover o `onPrimaryClick` prop do `PixelHero` agora ou deixar como prop opcional? **Deixar como prop opcional** (default `undefined`). Mantém compat pra quem usar o componente sem onClick. Não deletar pra evitar breaking change sem necessidade.

**NÃO mudar:** copy, layout, qualquer outro elemento.

### 9. `src/components/ui/pixel-perfect-hero.tsx` — assinatura

A prop `onPrimaryClick` continua existindo (Fase 1 não toca nela). É usada opcional.

## Ordem de execução (dentro do commit único)

1. Criar `site-footer.tsx` (novo arquivo, isolado)
2. Editar `layout.tsx` (importar footer, plugar)
3. Editar `nexus-nav.tsx` (rotas reais + remover Cases)
4. Editar `pixel-perfect-hero.tsx` (remover marquee blocks)
5. Criar 3 páginas placeholder (`solucoes`, `processo`, `contato`)
6. Editar `page.tsx` (CTA primário vira Link)

**Por que essa ordem:** arquivos novos não dependem de ninguém; edits no hero dependem do nav ter mudado antes (pra eu validar que mobile drawer não quebrou); CTA primário da home depende do footer já estar no layout pra eu testar scroll até o fim.

## Validação depois do commit

```bash
cd "C:\Users\rapha\Desktop\website"
npm run build
```

Esperado: `✓ Compiled successfully` + 4 rotas listadas (`/`, `/_not-found`, `/solucoes`, `/processo`, `/contato`).

## Não-objetivos explícitos desta fase

- Não deletar a constante `BRAND_LOGOS` em `pixel-perfect-hero.tsx` (pode virar ilustração de stack na Fase 2)
- Não trocar o `PixelHero` em si (Fase 2 vai precisar dele inteiro nas páginas internas)
- Não adicionar hover states novos ou animações novas
- Não tocar em `globals.css` (efeitos visuais já estão fechados)
- Não atualizar `docs/design-system.json` (sem token novo)

## Commit message

```
feat(fase-1): nav navegável, footer global, marquee removida

- Remove fake social proof marquee (AWS/Next/Tailwind/Framer)
- Update nav: Soluções/Processo/Contato + Falar pointing to real routes
- Add SiteFooter with logo, links, email, copyright
- Create /solucoes, /processo, /contato route stubs with light hero
- Primary CTA on home now navigates to /contato
- Per-route <title> via Next metadata API
```

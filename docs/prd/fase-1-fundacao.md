# PRD — Fase 1: Fundação

## Objetivo

Tirar o site do estado "só tem hero" e tornar navegável. Remover social proof falso. Preparar terreno pras próximas fases sem escrever código delas ainda.

## Problema

O site hoje é uma single-page com:
- Hero forte (já OK)
- Marquee com logos de **empresas que não são clientes da Nexus AI** (AWS, Next.js, Tailwind, Framer) → social proof falso. Empresa nova no mercado não pode mentir sobre clientes.
- Nav com link "Cases" → ancora morta, link `#cases` não leva a nada.
- Footer ausente → site acaba abruptamente no fim do hero.
- Sem rotas → só `/`.

## Usuários impactados

Visitante B2B (gerente/coordenador/superintendente) que chega pelo Google ou referral. Hoje ele:
1. Vê o hero, fica curioso
2. Tenta clicar em "Cases" → nada acontece
3. Tenta scroll pra ver mais → acha só a marquee com logos
4. Sai sem CTA alternativo acessível

## Escopo

### Dentro
1. **Remover marquee** (mobile + desktop) do hero e da seção desktop-only.
2. **Atualizar nav** (`src/components/nexus-nav.tsx`):
   - Remove item "Cases"
   - Atualiza itens pra apontar pras rotas reais: `Soluções` (`/solucoes`), `Processo` (`/processo`), `Contato` (`/contato`)
   - CTA "Falar" aponta pra `/contato` (mesmo destino do CTA primário)
   - Mobile drawer espelha o mesmo conjunto
3. **Criar componente footer** (`src/components/site-footer.tsx`):
   - Logo Nexus AI + wordmark
   - 3 links (Soluções, Processo, Contato)
   - Email de contato (`contato@nexusai.com.br` — confirmar com usuário antes de fixar)
   - Copyright dinâmico (`© {ano} Nexus AI`)
   - Mesmo visual: rounded-xl, glass sutil
4. **Plugar footer no layout** (`src/app/layout.tsx`) — fica embaixo de `{children}`, antes do fechamento do `<body>`
5. **Criar 3 rotas com placeholder** (páginas vazias com hero compacto):
   - `src/app/solucoes/page.tsx` → usa `PixelHero` com word1=word2=null ou copy curto
   - `src/app/processo/page.tsx` → idem
   - `src/app/contato/page.tsx` → idem
6. **Ajustar copy da home** (`src/app/page.tsx`):
   - CTA primário continua "Solicitar Proposta", agora link externo `href="#"` (vira `href="/contato"` na fase 2 quando o form existir)
   - Por ora pode permanecer como botão sem ação OU apontar pra `/contato` mesmo que seja placeholder — UX coerente
7. **Atualizar `<title>` por rota** (Next metadata API):
   - `/` → "Soluções Nexus AI" (mantém)
   - `/solucoes` → "Soluções · Nexus AI"
   - `/processo` → "Processo · Nexus AI"
   - `/contato` → "Contato · Nexus AI"

### Fora (YAGNI desta fase)
- Conteúdo real das 3 páginas internas (cards de soluções, etapas do processo, form funcional) → Fase 2
- Email real chegando no inbox → Fase 3
- Página "Sobre" / time → sem pedido, sem cases, sem página
- Light mode → design system é dark only
- i18n → pt-BR only
- Analytics → pós-MVP
- Sitemap/robots → pós-MVP

## Acceptance criteria

Funcional:
- [ ] `/` carrega sem a marquee (mobile e desktop)
- [ ] `/` tem footer visível no fim do scroll
- [ ] Click em "Soluções" no nav desktop **OU** mobile drawer navega pra `/solucoes`
- [ ] Click em "Processo" navega pra `/processo`
- [ ] Click em "Contato" navega pra `/contato`
- [ ] Click em "Falar" (CTA da nav) navega pra `/contato`
- [ ] Footer aparece em todas as 4 rotas (`/`, `/solucoes`, `/processo`, `/contato`)
- [ ] Cada rota tem seu `<title>` específico (visível na aba do browser)

Visual/design:
- [ ] Footer usa `rounded-xl`, mesmo background glass da nav, spacing consistente
- [ ] Páginas internas placeholder usam o mesmo `PixelHero` ou wrapper mais simples (a definir no tech-design)
- [ ] Em 375px (mobile), nav continua acessível via hamburger; footer empilha links vertical
- [ ] Em 1440px (desktop), footer renderiza horizontal com 3-4 colunas

Técnico:
- [ ] `npm run build` passa sem erros nem warnings novos
- [ ] Sem nova dependência npm adicionada
- [ ] Sem mexer em `docs/design-system.json` (não muda token nesta fase)
- [ ] Commit único com mensagem `feat(fase-1): nav navegável, footer global, marquee removida`

## Riscos

| Risco | Mitigação |
|---|---|
| Páginas placeholder parecerem "quebradas" pro visitante | Hero compacto com copy "Em construção" ou similar? Decidir no tech-design |
| Footer pesado demais visualmente | Reusar mesmo `bg-card/40 backdrop-blur-md ring-1 ring-border/50` da nav |
| Link "Falar" do nav indo pra mesma rota do CTA primário da home = redundância | Aceitável, ambos convergem pra contato. Unificar depois se necessário |

## Métrica de sucesso da fase

Antes da Fase 1: visitante só vê hero + marca logos sem clicar em nada.
Depois da Fase 1: visitante pode clicar em 4 destinos diferentes e chegar em páginas (mesmo placeholder) sem erro 404.

Não mede conversão (form não existe), mede **fluxo de navegação funcional**.

## Fora-de-escopo explícito

- Conteúdo das páginas internas (Fase 2)
- Form funcional (Fase 3)
- Copy final de marketing das páginas internas (Fase 2)
- Validação com usuários reais (pós-MVP)

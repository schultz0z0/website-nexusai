# PRD — Fase 3: Home cinemática (multiatos pinned)

## Objetivo

Substituir a estrutura atual da home (1 hero + 8 seções scrollando normal) por **9 atos cinemáticos encadeados via scroll-pin contínuo**. Cada ato revela seu conteúdo conforme o usuário rola — todo o site fica "aprisionado" até o usuário chegar no footer. O KV atual (`src/lib/content.ts`) é preservado integralmente: o que muda é **como** cada bloco aparece, não o que ele diz.

## Problema

A home hoje é **estática** dentro do padrão cinematic de mercado (Apple/Linear/Vercel/Stripe). Hero impressiona, mas a partir do Manifesto a leitura volta ao padrão de seções empilhadas. Resultado: quebra de imersão + concorrente que usa pin/scrub ganha a percepção de produto premium.

Outro problema: a home tem **9 seções**. Se cada uma virar um ato pin de 4.000-7.000px (padrão do componente Sobers de referência), a página trava por 60s+. Aceitável **se** cada ato variar visualmente em padrão — caso contrário fica 60s vendo a mesma cena.

## Pesquisa de referências

**Componente de referência (Sobers CinematicHero)** — analisei o source antes de planejar:

| Aspecto | Comportamento |
|---|---|
| Scroll-pin | 1 trigger, 7.000px de scrub |
| Padrão | Tagline hero revela → card azul profundo sobe (y: vh+200 → 0) → card estica fullscreen → mockup iPhone entra com rotation 3D → contadores animam → CTA |
| Mouse parallax | rotationY/X do mockup seguindo cursor via rAF |
| Estilos injetados | premium-depth-card, btn-modern-light/dark, iphone-bezel, floating-ui-badge, film-grain, text-silver-matte |
| libs | gsap + ScrollTrigger (puro, sem framer-motion) |
| Mockup | iPhone CSS/SVG físico com tela interna — **decorativo** (não app real) |
| CTA | App Store + Google Play |

**O que aproveita 100%**:
- INJECTED_STYLES inteiro (puramente visual, agnóstico)
- Lógica GSAP: introTl, mouse parallax com rAF, scrub timeline
- `card-sheen` reativo a mouse (`--mouse-x`/`--mouse-y`)
- Padrões `text-3d-matte`, `text-silver-matte`, `text-card-silver-matte`

**O que NÃO aproveita** (ver §4):
- Mockup iPhone físico → substituído pelos dashboards reais que já existem (`StockMockDashboard`, `CopilotMockDashboard`)
- Tagline "Track the journey, not just the days" → KV Nexus
- CTAs App Store + Google Play → "Solicitar Proposta" + "/processo"

## Decisões de produto (validadas com o usuário)

| Pergunta | Resposta |
|---|---|
| Nível de cinemático | **Total — 9 atos**, todas as seções da home entram |
| Mockup dentro do card profundo do Hero | **StockMockDashboard** (ato Hero); **CopilotMockDashboard** (ato showcase) |
| Scroll-pin | **Sim — global**, todo o scroll entre os atos é pinado. ~60s pra percorrer |

## Padrão de variação visual (regra de variação por ato)

Para evitar "60s vendo a mesma coisa", cada ato usa **mecânica distinta**. Princípio: seção nova ≠ padrão da adjacente.

| Ato | Seção | Mecânica | Pin range (vh) |
|---|---|---|---|
| **1** | Hero | Tagline reveal → card sobe → mockup tilt 3D mouse-reactive → CTA | ~600vh |
| **2** | Manifesto | **Mantido** (já é cinematic, sticky 4 cenas com flip 3D por palavra) | ~500vh (já está) |
| **3** | Métricas | Counters escalonados — números crescem conforme scroll cruza cada um | ~300vh |
| **4** | Pilares | Cards 3D dominó — entram com rotação Y, stagger | ~400vh |
| **5** | Showcases | Rotate Y mantido (já tem); mockup flutua com mouse | ~400vh ×2 |
| **6** | Bento | Cards com `scale + blur` reveal, stagger | ~300vh |
| **7** | Stack | Mantido — logos não precisam de cinematic | 0 (sem pin) |
| **8** | CTA Final | Pulse loop no botão (microinteração, sem pin longo) | ~50vh pin curto |
| **9** | FAQ | Mantido — accordion é a interação | 0 (sem pin) |

**Total estimado de scroll-pin**: ~2.800-3.500vh de pin ativo + ~600vh rolando normal.

## Mapa seção-por-seção

| Ato | Conteúdo (KV usado) | Onde está no `content.ts` |
|---|---|---|
| 1 Hero | word1="Sua equipe", word2="multiplicada", desc, CTAs "Solicitar Proposta" + "Ver processo" | `COMPANY.description`; copy atual está hardcoded no `page.tsx` HeroSection — mover pro `content.ts` |
| 2 Manifesto | MANIFESTO_CHUNKS (01-04) com Compass/Zap/X/Users | `MANIFESTO_CHUNKS` |
| 3 Métricas | METRICAS (12+ implantações, 8 setores, 4-12 sem, 100%) | `METRICAS` |
| 4 Pilares | PILARES (4: diagnóstico, stack aberta, entrega contínua, sua equipe opera) | `PILARES` |
| 5 Showcase Stock | badge/eyebrow/title/subtitle do ProdutoShowcase | inline em `page.tsx` Showcase 1 |
| 5 Showcase Copilot | idem Showcase 2 | inline em `page.tsx` Showcase 2 |
| 6 Bento | CAPABILITIES (4 cards) com ícones Package/Sparkles/Bot/Compass | `CAPABILITIES` |
| 7 Stack | STACK (8 logos/badges) | `STACK` |
| 8 CTA Final | title curto + botão `/contato` | inline em `page.tsx` CtaFinalSection |
| 9 FAQ | FAQ_HOME (3 perguntas) | `FAQ_HOME` |

**Copy/labels**: 100% preservados. O que muda é **como** aparece (reveal direction, timing, easing, perspectiva).

## Usuários impactados

- **Visitante B2B** que chega via SEO/referral: experiência de "produto Apple-style" gera percepção de produto premium (Linear/Stripe fazem isso). Mantém bounce rate baixo.
- **Mobile (375px)**: scroll-pin funciona igual, mas com tempo de pin reduzido. Counters funcionam. 3D tilt do mockup desabilita (`isMobile` já é tratado no componente Sobers — reaproveitar lógica).

## Escopo

### IN
- Novo arquivo `src/components/ui/cinematic-landing-hero.tsx` com componente `CinematicHome` parametrizável (substitui `PixelHero` no ato 1)
- Novo arquivo `src/components/cinematic/cinematic-manifesto.tsx` (mantém lógica atual mas re-exporta com props de pin global)
- Novo arquivo `src/components/cinematic/cinematic-metrics.tsx` (counters escalonados)
- Novo arquivo `src/components/cinematic/cinematic-pillars.tsx` (cards 3D dominó)
- Novo arquivo `src/components/cinematic/cinematic-bento.tsx` (scale+blur reveal)
- Novo arquivo `src/components/cinematic/cinematic-showcase.tsx` (wrapper do `ProductShowcase` com pin)
- Novo arquivo `src/lib/cinematic-timeline.ts` (coordena os 9 atos: cada ato informa seu `start/end` em % do scroll total pra que outros atos possam ler do mesmo ScrollTrigger se necessário)
- Refactor `src/app/page.tsx` para orquestrar os 9 atos
- `npm install gsap` (lib nova — atualizar `docs/roadmap.md` campo "Stack travado")
- Mover CTAs/textos do HeroSection do `page.tsx` para `src/lib/content.ts` (separação de responsabilidades)

### OUT
- Light mode (continua dark only)
- i18n (pt-BR only)
- Cases/blog (sem conteúdo real)
- Resend/Formspree no form (`/contato`) — Fase separada

## Aceite

- [ ] `src/lib/content.ts` continua sendo single source of truth — nada de copy nova hardcoded em componentes
- [ ] 9 atos visíveis conforme scroll, todos com KV preservado (texto idêntico ao atual)
- [ ] Hero cinemático mostra `StockMockDashboard` dentro do card azul profundo (não iPhone)
- [ ] Mockup tilt reativo a mouse (rotação X/Y) — desktop only; mobile ignora
- [ ] Manifesto mantém mecânica atual (flip 3D por palavra) sem regressão visual
- [ ] Pin global funciona: rolando do topo até o footer, todos os 9 atos são atravessados; nenhum ato "pula" nem fica preso depois de passado
- [ ] CTA final do Hero = "Solicitar Proposta" → `/contato`
- [ ] CTA secundário do Hero = "Ver processo" → `/processo`
- [ ] Mobile (375px): scroll-pin funciona; 3D tilt desabilitado; contadores funcionam
- [ ] `prefers-reduced-motion: reduce` desabilita parallax + scrub (counters fazem reveal instantâneo)
- [ ] `next build` passa
- [ ] DevTools → lighthouse mobile ≥ 80 performance (objetivo mínimo, não bloqueante)
- [ ] Visita visual no `localhost:3000` com `browser_vision` confirmando que cada ato renderiza

## Não-objetivos (YAGNI)

- Não criar rota nova
- Não mexer em `/solucoes`, `/processo`, `/contato`
- Não adicionar mais libs (framer-motion continua removível se GSAP cobrir 100% da animação)
- Não internacionalizar
- Não adicionar analytics
- Não criar página de "cases"
- Não mexer no design system global (tokens existentes bastam)

# Roadmap — Web-site NexusAI

> Source of truth: este arquivo. Detalhamento de cada fase em `docs/prd/`. Desenho técnico da fase atual em `docs/tech-design/`.

## Princípios do roadmap

- **MVP enxuto**: 4 páginas, sem blog, sem cases até ter conteúdo real.
- **Cada fase é ship-able**: nada de "preparar terreno pra fase X".
- **Sem dependência de backend**: form de contato envia por email/mailto no MVP. Adotar Resend/Formspree só quando converter de verdade.
- **Marca nova**: zero social proof falso. Sem logos de clientes que não existem.

## Stack travado

- Next.js 16 (App Router, TypeScript strict)
- Tailwind v4 + shadcn (slate base, dark forçado)
- next/font/google: Space Grotesk (display+body), JetBrains Mono (reservado)
- lucide-react (ícones)
- GSAP 3 (ScrollTrigger plugin) — animação pin/scrub da home (Fase 3)
- Sem libs novas sem justificar — adicionar custa

## Estrutura final do site

```
/             Home (hero + serviços + processo + CTA)
/solucoes    Detalhamento da plataforma base + áreas de aplicação
/processo    4 etapas: diagnóstico → proposta → implementação → suporte
/contato     Form "Solicitar Proposta" (mailto no MVP)
```

Total: **4 páginas + footer global + nav atualizada**.

## Fases

### Fase 1 — Fundação: navegação real, marquee fora, footer dentro
**Objetivo:** o site para de ser "só hero" e vira um site navegável. Marca some o social proof fake.

**Escopo:**
- Remover marquee de logos fake (clientes que não existem)
- Atualizar nav: tira "Cases", realinha items
- Adicionar footer global com logo + links + copyright + email
- Criar rotas vazias `/solucoes`, `/processo`, `/contato` com hero compacto
- Atualizar copy da home pra refletir que o site é navegável (CTA principal aponta pra `/contato`, secundário pra GitHub mantem)

**Status:** PRD pronto em `docs/prd/fase-1-fundacao.md`. Desenho técnico em `docs/tech-design/fase-1.md`. Pronto pra implementar.

**Aceite:**
- [ ] Marquee removido da home (mobile + desktop)
- [ ] Nav mostra: Soluções · Processo · Contato · Falar (sem Cases)
- [ ] Footer global aparece em todas as 4 páginas
- [ ] `/solucoes`, `/processo`, `/contato` renderizam com hero compacto (placeholder OK)
- [ ] CTA primário "Solicitar Proposta" aponta pra `/contato`
- [ ] `npm run build` passa sem warnings novos
- [ ] Design system não quebrou

---

### Fase 2 — Conteúdo das páginas internas
**Objetivo:** as 3 páginas param de ser placeholders e ganham corpo real.

**Escopo:**
- `/solucoes`: hero + 4-6 cards de áreas + bloco "sob medida" + CTA
- `/processo`: hero + 4 etapas numeradas + CTA
- `/contato`: hero + form com campos básicos (nome, email, empresa, cargo, setor, mensagem)

**Dependência:** Fase 1. Não inicia antes.

**Aceite (rascunho):**
- [ ] `/solucoes` tem no mínimo 4 áreas listadas
- [ ] `/processo` mostra 4 etapas com descrição de prazo/escopo
- [ ] `/contato` form tem 6 campos + botão submit
- [ ] Todas as páginas usam os mesmos tokens (rounded-xl, gradient, glass, tahoe)
- [ ] Mobile-first em todas (testar em 375px)

---

### Fase 3 — Home cinemática (multiatos pinned)
**Objetivo:** substituir a estrutura atual da home (1 hero + 8 seções scrollando normal) por **9 atos cinemáticos encadeados via scroll-pin contínuo**, preservando o KV atual.

**Escopo:**
- 9 atos: Hero (cinemático puro) → Manifesto (preservado) → Métricas (counter stagger) → Pilares (dominó 3D) → 2 Showcases (preservados) → Bento (scale+blur) → Stack → CTA Final (pulse) → FAQ
- Pin global: ~3.000vh de pin ativo + ~600vh rolando normal entre Stack e FAQ
- GSAP + ScrollTrigger (lib nova — justificável pelo scrub pin)
- `StockMockDashboard` dentro do card profundo do ato Hero (substitui o iPhone da referência)
- Mockup type: `StockMockDashboard` no Hero; `CopilotMockDashboard` no showcase
- Scroll-pin: SIM — todo o scroll da home é pinado entre os atos
- KV preservado integralmente via `src/lib/content.ts` (nenhuma copy nova hardcoded)

**Dependência:** nenhuma técnica; PRD pronto em `docs/prd/fase-3-home-cinematica.md` e desenho técnico em `docs/tech-design/fase-3.md`.

**Aceite:**
- [ ] `src/lib/content.ts` continua sendo single source of truth (sem copy nova hardcoded)
- [ ] 9 atos visíveis com KV idêntico ao atual
- [ ] Hero mostra `StockMockDashboard` dentro do card azul profundo
- [ ] Mockup tilt reativo a mouse (desktop); mobile ignora
- [ ] Manifesto preserva mecânica atual sem regressão visual
- [ ] Pin global funciona do topo ao footer; nenhum ato pula
- [ ] Mobile (375px): scroll-pin funciona; 3D tilt desabilitado
- [ ] `prefers-reduced-motion: reduce` desabilita parallax + scrub
- [ ] `next build` passa
- [ ] `browser_vision` no `localhost:3000` confirma cada ato

---

### Fase 4 — Form funcional
**Objetivo:** lead chega no email, não fica preso no form.

**Escopo:**
- Decidir provider (Resend, Formspree, Brevo ou mailto direto)
- Server action ou API route no Next
- Honeypot anti-spam + rate limit simples
- Mensagem de sucesso/erro

**Dependência:** Fase 2 (form precisa existir visualmente antes de conectar).

**Aceite (rascunho):**
- [ ] Submissão chega no inbox configurado
- [ ] Honeypot bloqueia bots básicos
- [ ] Validação de email + campos obrigatórios
- [ ] UX de sucesso após envio

---

### Fase YAGNI (não fazer até ter motivo)

- **Cases/Blog/Projetos** — só com conteúdo real publicado. Sem logos de clientes que não existem.
- **Light mode** — design system é dark only. Adicionar quando o cliente pedir.
- **Animações extras** — tahoe + pulse já cobrem o "feel". Mais = distração.
- **i18n** — site é PT-BR. Adicionar quando tiver cliente em outro idioma.
- **CMS** — copy vai no código. Adicionar quando a equipe de marketing não-dev quiser editar.
- **Analytics** — só depois do MVP ter tráfego real. Vercel Analytics é o default mais tarde.
- **SEO dinâmico por página** — metadata básica está OK, schema.org só com conteúdo público.
- **Sitemap.xml / robots.txt** — só depois de decidir indexação.

## Convenções de trabalho

- Cada fase vira **1 commit** com mensagem `feat(fase-N): <descrição>`
- Build (`npm run build`) tem que passar antes de cada push
- Atualizar `docs/design-system.json` se adicionar token novo
- Atualizar `docs/design-system.md` se adicionar seção nova
- Não commitar dependência nova sem atualizar este roadmap (campo "Stack travado")

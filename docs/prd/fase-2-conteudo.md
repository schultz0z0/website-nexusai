# PRD — Fase 2: Páginas internas completas (institucional)

## Objetivo

Transformar as 3 páginas internas de placeholder em páginas **institucionais de alta conversão**. Visitante B2B consegue entender **o que** a Nexus AI entrega, **pra quem** é, **como** trabalha, **o que recebe** em cada etapa, e **o que acontece** depois de enviar mensagem — sem precisar ligar pra perguntar nada disso.

## Problema

Hoje, depois da Fase 1:
- Visitante chega em `/solucoes`, `/processo` ou `/contato` → vê "Conteúdo em construção" → sai
- Não tem como qualificar lead pelo site (sem falar com a Nexus AI)
- Hero da home é forte mas site vira "pobre" sem corpo

## Pesquisa de referências

Investiguei 2 sites B2B do mesmo nicho (AI / data infrastructure):
- **Scale AI**: hero + social proof + áreas + cases + 3 pilares credibilidade + CTA
- **Tinybird**: hero + métricas + tabs use case + cases + "como você trabalha" + comparação (sem X / com X) + enterprise ready + social proof + CTA

Padrões triangulados que **se aplicam** à Nexus AI (empresa nova sem cases/compliance reais):
- Áreas de atuação (cards)
- Comparação "Pra quem é / Pra quem não é" (alta conversão sem precisar de cases)
- Processo numerado com prazo + entregáveis
- FAQ / objeções comuns
- "O que acontece depois" no contato (expectativa)

Padrões **descartados** (YAGNI sem cases/compliance reais):
- Métricas de impacto numéricas (sem dados = mentir)
- Cases de cliente (não tem)
- Compliance cards SOC 2 (não tem certificação)
- Quotes de clientes (não tem)
- Cases em carrossel (não tem)

## Usuários impactados

- **Decisor B2B** (gerente/coordenador/superintendente/diretor/sócio) que chega via busca orgânica, referral, LinkedIn
- Persona primária: quer avaliar **se a Nexus AI serve pra empresa dele**, sem precisar marcar call
- Persona secundária: quer mandar mensagem curta sem ter que explicar tudo no email

## Escopo

### `/solucoes` ganha corpo institucional

1. **Hero compacto** (mantém padrão atual)
2. **Seção "Áreas onde entregamos"** — 6 cards com ícone + título + descrição + exemplo concreto:
   - Atendimento ao cliente — agentes que respondem, qualificam e escalam
   - Marketing e vendas — automação de campanhas, nutrição de leads e follow-up
   - Controle de estoque com IA — previsão de demanda, alertas de ruptura, reposição automática
   - Análise de dados — dashboards e relatórios gerados a partir dos seus dados internos
   - Integração de sistemas — pontes entre ferramentas que a empresa já usa
   - Operações internas — automação de processos repetitivos do dia a dia
3. **Seção "Pra quem é"** vs **"Pra quem não é"** — duas colunas com bullets curtos:
   - **Pra quem é** (5 bullets): empresa com processo repetitivo que toma tempo de equipe qualificada; tem dados internos subutilizados; quer integrar ferramentas sem virar projeto de TI; busca resultado mensurável em 3-6 meses; prefere solução sob medida a SaaS engessado
   - **Pra quem não é** (4 bullets): quer solução pronta em 24h sem conversa; quer "IA mágica" sem entender o problema; precisa de escala massiva (>1M req/s, fora do escopo MVP); prefere assinar mensal barato sem compromisso
4. **CTA final**: "Solicitar Proposta" → `/contato`

### `/processo` ganha corpo institucional

1. **Hero compacto**
2. **Seção "4 etapas"** — cada etapa com:
   - Número grande (01-04)
   - Título
   - Prazo
   - **Entregáveis** (o que sai dessa fase — bullets curtos)
   - Descrição de 1-2 frases
3. **Seção "FAQ — perguntas comuns antes de pedir proposta"** — 4-6 perguntas com resposta curta:
   - "Quanto custa?" → "Depende do escopo. Diagnóstico inicial é gratuito, proposta vem com valores claros por etapa."
   - "Quanto tempo até ver resultado?" → "Primeiros ganhos operacionais em 4-8 semanas após implementação começar."
   - "Vocês integram com [ferramenta X]?" → "Integramos com a stack que você já usa — listamos as integrações cobertas na proposta."
   - "E se não funcionar?" → "Cada entrega tem critério de aceite. Se não atender, ajustamos sem custo extra antes de seguir."
   - "Vocês atendem [setor X]?" → "Atendemos qualquer setor com processo repetitivo ou dado subutilizado. Já entregamos em [setores-placeholder]."
   - "Preciso ter equipe técnica?" → "Não. A gente opera. Você acompanha resultado."
4. **CTA final**: "Solicitar Proposta" → `/contato`

### `/contato` ganha corpo institucional

1. **Hero compacto**
2. **Form** (6 campos): Nome, Email, Empresa, Cargo (select), Setor (select), Mensagem — com server action (mock success nesta fase, Fase 3 liga email real)
3. **Seção "O que acontece depois"** — timeline 3 passos numerados:
   - **Em até 24h úteis** — você recebe uma resposta humana confirmando que recebemos
   - **Em 3-5 dias** — marcamos uma call de 30min pra entender melhor seu contexto
   - **Em 1 semana** — você recebe o diagnóstico inicial com escopo, prazo e investimento estimado

### `/` (home) ganha seções-resumo

1. Hero (mantém)
2. **Seção "Áreas onde entregamos"** (resumo): 6 cards compactos, link "Ver todas as soluções" → `/solucoes`
3. **Seção "Como funciona"** (resumo): 4 etapas numeradas compactas, link "Ver processo completo" → `/processo`
4. **Seção "Pra quem é"** (resumo): 3-4 bullets curtos da versão completa, link "Saber se é pra você" → `/solucoes`
5. CTA intermediário: "Solicitar Proposta" → `/contato`

### Fora (YAGNI desta fase)

- Backend de envio real (Fase 3 — Resend)
- Cases/CMS (sem clientes)
- Compliance cards (sem certificação)
- Métricas numéricas (sem dados)
- Animações novas (efeitos visuais já cobrem)
- Página "Sobre" / time
- Validação server-side completa (cliente + servidor mínimo nesta fase)
- i18n
- Analytics

## Acceptance criteria

Funcional — `/solucoes`:
- [ ] Hero compacto mantido
- [ ] Grid de 6 áreas renderiza com ícone, título, descrição e exemplo
- [ ] Mobile: 1 coluna; desktop: 2x3 ou 3x2 (a decidir no tech-design)
- [ ] Seção "Pra quem é / Pra quem não é" com 2 colunas em desktop, empilhada em mobile
- [ ] CTA "Solicitar Proposta" levando a `/contato`

Funcional — `/processo`:
- [ ] Hero compacto mantido
- [ ] 4 etapas numeradas com prazo + entregáveis (bullets)
- [ ] Mobile: 1 coluna; desktop: 2x2 ou 4 colunas
- [ ] FAQ com 4-6 perguntas (acordeão simples, sem JS state — `<details>`)
- [ ] CTA levando a `/contato`

Funcional — `/contato`:
- [ ] Hero compacto mantido
- [ ] Form com 6 campos, validação client-side
- [ ] Server action com mock success
- [ ] Honeypot hidden
- [ ] Timeline "O que acontece depois" com 3 passos
- [ ] Mensagem de sucesso visível após submit

Funcional — `/` (home):
- [ ] Hero mantido
- [ ] Resumo de soluções (6 cards compactos) com CTA "Ver todas"
- [ ] Resumo de processo (4 etapas compactas) com CTA "Ver processo completo"
- [ ] Resumo "Pra quem é" com CTA "Saber se é pra você"
- [ ] CTA intermediário "Solicitar Proposta"

Visual/design:
- [ ] Tudo usa tokens do design system (rounded-xl, glass, gradient CTA)
- [ ] Mobile-first: testar em 375px sem overflow horizontal
- [ ] Desktop: testar em 1440px com respiro adequado
- [ ] Sem animações novas (reusa tahoe + pulse existentes)
- [ ] Sem imagens (copy-first; placeholders só se estritamente necessário)

Técnico:
- [ ] `npm run build` passa sem erros nem warnings novos
- [ ] `framer-motion` adicionado como dep (uma única adição nesta fase)
- [ ] Sem outras dependências npm novas
- [ ] Sem mexer em `globals.css`, `BackgroundCanvas`, `SiteFooter`, `NexusNav`, `PixelHero`
- [ ] Content arrays (`AREAS`, `ETAPAS`, `FAQ_ITEMS`, etc.) em `src/lib/content.ts` (single source of truth)
- [ ] Componentes de animação isolados como client (`<AnimatedSection>` wrapper)
- [ ] FAQ usa `<details>`/`<summary>` nativo do HTML (sem JS state)
- [ ] Metadata completa por página: `title`, `description`, Open Graph, Twitter card
- [ ] Structured data JSON-LD por página (Organization, Service, FAQPage, ContactPage)
- [ ] Single commit `feat(fase-2): páginas internas institucionais`

## SEO avançado (acima do `<title>`)

Cada página ganha:
- `<title>` único e descritivo (≤60 chars)
- `description` única (≤160 chars)
- `openGraph`: title, description, type, locale, siteName
- `twitter`: card, title, description
- Canonical URL (`metadataBase` + `alternates.canonical`)

Structured data (JSON-LD via `<script type="application/ld+json">`):
- `/` → `Organization` + `WebSite` com `SearchAction`
- `/solucoes` → `Service` listando as 6 áreas em `hasOfferCatalog`
- `/processo` → `FAQPage` com as 4-6 perguntas do FAQ
- `/contato` → `ContactPage` com email e tipo de contato

Heading hierarchy:
- 1× `<h1>` por página (no hero)
- `<h2>` para títulos de seção
- `<h3>` para cards/etapas
- Nunca pular nível (`h1 → h3` sem `h2` no meio)

## Animações com Framer Motion (componentes isolados)

Onde usar:
- Cards entrando no scroll (`/solucoes` grid, home resumos) — fade-up stagger
- Etapas do processo (`/processo` e home) — fade-up stagger
- Timeline "O que acontece depois" (`/contato`) — numérico sequencial
- CTA final — hover scale (já temos via CSS; Framer não vai entrar)

Onde NÃO usar (mantém texto puro, respira sozinho):
- Texto corrido (description, FAQ respostas, "Pra quem é" bullets)
- Nav, footer, hero
- Botões estáticos

Pattern: `<AnimatedSection stagger={0.08}>` wrapper que envolve uma grid/lista e aplica `whileInView` aos filhos.

## Riscos

| Risco | Mitigação |
|---|---|
| Copiar muito vira "text wall" | Cada seção respira `py-12` a `py-16`, hierarquia visual via tipografia (tahoe + muted-foreground) |
| FAQ visualmente feio sem JS | Usar `<details>`/`<summary>` nativo do HTML — funciona, acessível, sem JS |
| Server action timeout em dev | Honeypot check + validação leve, return rápido; nenhum await |
| Usuário submete form e espera resposta real (Fase 3) | Mensagem deixa claro "retorno em 24h úteis" — alinha expectativa |
| Conteúdo arrays duplicados entre home e internas | `src/lib/content.ts` é fonte única, ambas as páginas importam |

## Métrica de sucesso da fase

Antes da Fase 2: visitante sai após hero (1 pageview em média).
Depois da Fase 2: visitante navega entre home → soluções → processo → contato (4+ pageviews, expectativa).

Mede **profundidade de navegação**, não conversão (form ainda não envia email na Fase 2).

## Fora-de-escopo explícito

- Backend de email (Fase 3)
- Cases/CMS
- Compliance/certificações
- Métricas numéricas de impacto
- Animações novas
- Página "Sobre"
- i18n
- Analytics
- Refatoração de PixelHero / BackgroundCanvas (engine duplicada é YAGNI refactor)

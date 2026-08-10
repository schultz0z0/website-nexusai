# Desktop Responsiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Garantir que Home, Soluções, Processo e Contato preservem conteúdo, hierarquia e legibilidade em desktops de 1024 a 3840 px de largura, alturas a partir de 560 px, proporções de 4:3 a 32:9, zoom de 100% a 200% e preferência de movimento reduzido.

**Architecture:** Substituir a decisão de animação baseada apenas em largura por um perfil compartilhado de viewport. Desktop regular mantém a experiência cinematográfica; desktop compacto usa timeline e escala reduzidas; desktop extremamente baixo ou com movimento reduzido usa fluxo estático seguro. CSS Modules controlam a geometria e o GSAP alterna estados dentro de zonas que já cabem. Playwright mede a página renderizada, os retângulos reais dos elementos e checkpoints de scroll.

**Tech Stack:** Next.js 16.2.11 App Router, React 19.2.4, TypeScript, CSS Modules, GSAP 3.15, Node Test Runner e Playwright.

## Global Constraints

- Preservar o mobile existente em `max-width: 767px`.
- Manter Space Grotesk como fonte principal e Geist Mono como fonte técnica.
- Não remover conteúdo para fazer um viewport caber; alturas extremas devem usar fluxo estático.
- Critérios globais: `scrollWidth <= clientWidth + 1`, nenhum texto crítico cortado, nenhuma interseção entre zonas incompatíveis e conteúdo completo com movimento reduzido.
- Testes de responsividade devem medir comportamento no navegador. Não criar testes que apenas procurem strings ou regras exatas nos arquivos TSX/CSS.
- Validar a build de produção com servidor Next.js e Playwright antes do handoff.

---

## Task 0: Restaurar uma baseline de testes confiável

**Files:**
- Modify: `tests/route-cinematics.test.mts`

- [ ] Reproduzir `npm test` e confirmar as duas falhas preexistentes de asserções que procuram valores exatos no CSS.
- [ ] Remover somente os dois testes frágeis: o paint box do título de Soluções e o tamanho exato do título de briefing de Contato. A proteção visual será substituída por testes Playwright nas Tasks 2–5.
- [ ] Rodar `npm test` e exigir 23 testes verdes.
- [ ] Commit: `git add tests/route-cinematics.test.mts && git commit -m "test: remove stale cinematic css assertions"`.

## Task 1: Criar o contrato compartilhado de viewport

**Files:**
- Create: `src/lib/viewport-motion.ts`
- Modify: `src/lib/route-cinematics.ts`
- Modify: `src/lib/home-narrative.ts`
- Modify: `tests/route-cinematics.test.mts`
- Modify: `tests/home-narrative.test.mts`

- [ ] Escrever testes de tabela para `mobile`, `static`, `compact` e `cinematic`, cobrindo limites de 767/768 px e 639/640/819/820 px.
- [ ] Rodar `npm test` e observar falha porque o contrato ainda não existe.
- [ ] Criar `ViewportMotionMode`, `ViewportMotionConditions`, `getViewportMotionMode()` e `getViewportMotionModeForSize()` em `src/lib/viewport-motion.ts`.
- [ ] Fazer movimento reduzido vencer qualquer dimensão; mobile vencer perfis desktop; desktop com altura abaixo de 640 ser estático; 640–819 ser compacto; 820 ou mais ser cinematográfico.
- [ ] Fazer `getRouteMotionMode` delegar ao contrato compartilhado e mapear `cinematic` para `scroll`.
- [ ] Atualizar `getHomeMotionMode` e `getBlueStageScrollDistance`: `700` em cinematográfico, `520` em compacto e `0` nos demais.
- [ ] Rodar `npm test` e confirmar a suíte verde.
- [ ] Commit: `git add src/lib/viewport-motion.ts src/lib/route-cinematics.ts src/lib/home-narrative.ts tests/route-cinematics.test.mts tests/home-narrative.test.mts && git commit -m "test: define viewport motion profiles"`.

## Task 2: Instalar o laboratório Playwright de responsividade

**Files:**
- Modify: `package.json`
- Create: `package-lock.json`
- Create: `playwright.config.ts`
- Create: `tests/responsive-desktop.spec.ts`
- Create: `tests/helpers/layout-assertions.ts`

- [ ] Instalar `@playwright/test` e adicionar scripts `test:unit`, `test:responsive` e `test:all`.
- [ ] Configurar `baseURL` em `http://127.0.0.1:3000`, servidor local automático para desenvolvimento e possibilidade de reutilizar uma build de produção via variável de ambiente.
- [ ] Criar helpers reais de DOM para overflow horizontal, conteúdo dentro do viewport e interseção de `DOMRect`s. Ignorar apenas elementos com `display:none`, `visibility:hidden` ou opacidade efetiva abaixo de `0.05`.
- [ ] Criar smoke tests renderizados que devem passar na baseline: `/`, `/solucoes`, `/processo` e `/contato` em `1920×1080`, verificando identidade, conteúdo não vazio, ausência de overlay e ausência de overflow horizontal.
- [ ] Rodar `npx playwright install chromium`.
- [ ] Rodar `npm run test:responsive` e confirmar os smoke tests verdes.
- [ ] Rodar `npm test` para garantir que o glob unitário não captura specs Playwright.
- [ ] Commit: `git add package.json package-lock.json playwright.config.ts tests/responsive-desktop.spec.ts tests/helpers/layout-assertions.ts && git commit -m "test: add rendered responsiveness harness"`.

## Task 3: Aplicar perfis de viewport e fallback estrutural

**Files:**
- Modify: `src/app/solucoes/solucoes-cinematic.tsx`
- Modify: `src/app/processo/processo-cinematic.tsx`
- Modify: `src/app/contato/contato-cinematic.tsx`
- Modify: `src/components/cinematic-value-stage.tsx`
- Modify: `src/components/route-cinematic-shell.module.css`
- Modify: `src/components/conversion-home.module.css`
- Modify: `src/app/solucoes/solucoes-cinematic.module.css`
- Modify: `src/app/processo/processo-cinematic.module.css`
- Modify: `src/app/contato/contato-cinematic.module.css`
- Modify: `tests/responsive-desktop.spec.ts`

- [ ] Adicionar primeiro testes Playwright que esperem `data-motion-mode`: `static` em `1920×600`, `compact` em `2560×720`, `cinematic` em `1920×1080` e `mobile` em `390×844`.
- [ ] Rodar o spec focado e observar falha por ausência do atributo/perfil.
- [ ] Aplicar condições mutuamente exclusivas: desktop regular com altura mínima de 820 px, compacto entre 640 e 819 px, mobile até 767 px e movimento reduzido estático.
- [ ] Gravar o modo calculado na raiz de cada experiência e removê-lo no cleanup.
- [ ] Retornar antes de criar ScrollTriggers em `static`; preservar mobile; ativar pin/scroll apenas em compacto e cinematográfico; usar `invalidateOnRefresh: true`.
- [ ] Criar tokens compartilhados de safe area e tamanho máximo limitado simultaneamente por `vw` e `svh`.
- [ ] Em `max-height:639px`, retirar sticky/posicionamento sobreposto e exibir conteúdo em fluxo; entre 640 e 819 px, remover `min-height` maior que o viewport e reduzir a geometria.
- [ ] Rodar o spec focado, `npm test`, `npm run lint` e `npm run build`.
- [ ] Commit: `git add src tests/responsive-desktop.spec.ts && git commit -m "fix: select cinematic layout by viewport height"`.

## Task 4: Eliminar colisões em Soluções, Processo, Contato e Home

**Files:**
- Modify: `src/app/solucoes/solucoes-cinematic.tsx`
- Modify: `src/app/solucoes/solucoes-cinematic.module.css`
- Modify: `src/app/processo/processo-cinematic.tsx`
- Modify: `src/app/processo/processo-cinematic.module.css`
- Modify: `src/app/contato/contato-cinematic.tsx`
- Modify: `src/app/contato/contato-cinematic.module.css`
- Modify: `src/components/conversion-home.module.css`
- Modify: `tests/responsive-desktop.spec.ts`

- [ ] Adicionar testes Playwright de reprodução para Soluções `1920×600` e `2560×720`, Processo `1920×600`, Contato `1920×600` e Home `1920×600`, usando checkpoints de scroll e `DOMRect`s.
- [ ] Rodar cada caso focado e observar a falha correspondente antes da correção.
- [ ] Soluções compacta: mostrar o intro antes dos cards e encerrá-lo antes da primeira camada; estática: hero, explicação e seis cards em fluxo normal.
- [ ] Processo compacta: limitar títulos pela altura, reduzir insets e garantir descrição completa nas etapas 03/04; estática: painéis em lista vertical sem clip inicial.
- [ ] Contato compacta: ocultar totalmente o hero antes do briefing; estática: remover sticky do briefing e manter formulário em fluxo.
- [ ] Home: limitar altura, padding e tipografia do hero/value stage sem ocultar CTA ou prova social.
- [ ] Rodar os casos focados até ficarem verdes, depois `npm test`, `npm run lint` e `npm run build`.
- [ ] Commit: `git add src tests/responsive-desktop.spec.ts && git commit -m "fix: prevent desktop cinematic collisions"`.

## Task 5: Expandir a matriz de navegadores e acessibilidade

**Files:**
- Modify: `tests/responsive-desktop.spec.ts`
- Modify: `tests/helpers/layout-assertions.ts`

- [ ] Expandir a matriz para `1024×768`, `1280×720`, `1366×768`, `1440×900`, `1600×600`, `1680×1050`, `1920×600`, `1920×1080`, `2560×720`, `2560×1080`, `3440×900`, `3840×1080` e `3840×2160` nas quatro rotas.
- [ ] Medir topo e checkpoints de 25%, 50%, 75% e 100% das cenas, aguardando dois `requestAnimationFrame` após cada scroll.
- [ ] Adicionar movimento reduzido e fonte raiz ampliada em 125%, 150% e 200% para viewports sentinela.
- [ ] Salvar screenshot, trace e identificação do viewport somente quando houver falha.
- [ ] Rodar `npm run test:responsive` e confirmar matriz verde.
- [ ] Commit: `git add tests/responsive-desktop.spec.ts tests/helpers/layout-assertions.ts && git commit -m "test: cover desktop viewport matrix"`.

## Task 6: Documentar o contrato e criar o gate de regressão

**Files:**
- Create: `docs/responsive-desktop-matrix.md`
- Create: `.github/workflows/quality.yml`
- Modify: `README.md`

- [ ] Documentar modos, limites, viewports sentinela e critérios de aceite; explicar que cobertura contínua vem de regras fluidas mais sentinelas automatizadas.
- [ ] Criar workflow que instala dependências e Chromium, executa testes unitários, lint, build e matriz responsiva.
- [ ] Atualizar README com comandos locais e artefatos de falha.
- [ ] Rodar `npm test`, `npm run lint`, `npm run build` e `npm run test:responsive`.
- [ ] Rodar `git diff --check`.
- [ ] Commit: `git add docs/responsive-desktop-matrix.md .github/workflows/quality.yml README.md && git commit -m "docs: define responsive desktop quality gate"`.

## Task 7: Validação visual final no navegador

**Files:**
- Verify only: application routes and generated screenshots

- [ ] Abrir a build de produção no navegador do aplicativo.
- [ ] Validar manualmente as quatro rotas nos 13 viewports da matriz, no topo e nos checkpoints de scroll relevantes.
- [ ] Comparar os cinco estados originalmente falhos com as capturas de auditoria.
- [ ] Fazer smoke test adicional em `390×844` e `430×932` para confirmar que mobile permaneceu intacto.
- [ ] Verificar identidade, conteúdo não vazio, ausência de overlay, console sem erros/avisos relevantes e pelo menos uma interação de navegação.
- [ ] Salvar as capturas finais fora do repositório e registrar a matriz aprovada no relatório de QA.
- [ ] Rodar novamente `npm run test:all` contra a árvore final.


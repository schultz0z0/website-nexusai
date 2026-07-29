# Mobile-first Route Cinematics — Design

## Objetivo

Alinhar `/solucoes`, `/processo` e `/contato` à promessa da Home sem repetir a mesma argumentação, humanizar os três heros e substituir o fallback mobile estático por narrativas cinematográficas próprias. O desktop preserva sua arquitetura de cena atual; o mobile passa a ser uma direção de arte e movimento independente.

## Auditoria de comunicação

### Home

A Home já cumpre o papel de visão geral: promessa central, prova operacional, princípios, produtos, capacidades, stack, CTA e FAQ curta. As páginas internas não devem recontar esse percurso.

### Soluções

**Papel correto:** mostrar onde a Nexus AI assume trabalho e tornar cada frente concreta com um exemplo.

**Problemas atuais:** o hero enumera categorias, a abertura da cena fala em “campo” e “camadas” antes de explicar o ganho, e a CTA é genérica. Não há conflito estrutural com a Home, mas a promessa ainda está abstrata.

**Decisão:** abrir com a transformação (“tirar peso da operação”), manter as seis frentes e seus exemplos como prova de aplicabilidade e usar o bloco de aderência como qualificador comercial. A metáfora de camadas permanece como linguagem visual, não como argumento principal.

### Processo

**Papel correto:** reduzir o risco percebido da compra, mostrando entregas, prazos e critérios de avanço.

**Problemas atuais:** o conteúdo é complementar à Home, mas o hero descreve “quatro etapas” em vez de vender previsibilidade. A FAQ é útil, porém sua introdução não explicita que ela remove objeções de decisão.

**Decisão:** posicionar o processo como clareza antes do código. Cada etapa mantém prazo e entregáveis verificáveis. A FAQ passa a ser introduzida como resolução das dúvidas que normalmente travam a decisão.

### Contato

**Papel correto:** converter com baixa fricção, explicar o que enviar e dar previsibilidade sobre a resposta.

**Problemas atuais:** “humano”, “sem bot” e “sinal” aparecem repetidamente no hero, recibo, briefing, status e timeline. A metáfora ocupa espaço que deveria reduzir ansiedade e orientar a ação.

**Decisão:** manter a ideia de sinal somente no movimento. A copy passa a enfatizar escuta, contexto, prazo e próximo passo. O hero ganha CTA para o briefing; o formulário explica o nível de detalhe necessário; a timeline preserva a previsibilidade.

## Direção visual

Tema: tecnologia em segundo plano, pessoas em primeiro.

- Base visual preservada: preto, azul elétrico, Space Grotesk, Geist Mono, grids e sinais finos.
- Soluções: equipe real em uma operação de estoque, concentrada em resolver um problema.
- Processo: consultor e lideranças mapeando um fluxo antes de construir.
- Contato: conversa com escuta real, sem pose de venda.
- Cada rota usa um WebP horizontal e outro vertical, com composição própria para o breakpoint.
- As fotos entram como plano de cena, com fades de borda para integração ao fundo. O tratamento não deve apagar tons de pele nem criar uma lavagem azul sobre a imagem.

## Arquitetura mobile exclusiva

O breakpoint continua em `768px`.

### Soluções

Uma track sticky exclusiva de sete batidas: promessa inicial e seis capacidades. A fotografia vertical permanece como ambiente, ganha parallax e recua conforme os cards assumem foco. Cada capacidade aparece individualmente, com categoria, descrição e exemplo. Um rail mostra progresso sem exigir interação.

### Processo

Uma track sticky exclusiva de cinco batidas: promessa inicial e quatro checkpoints. A fotografia de workshop começa humana e aberta; ao avançar, a imagem recua e as entregas ganham foco. O rail vertical e os portais leves mantêm a metáfora do corredor sem esconder conteúdo.

### Contato

O hero mobile tem duas batidas: escuta e próximo passo, com CTA direto para `#briefing`. O formulário permanece em fluxo normal. A resposta usa uma segunda track sticky de três batidas, uma por prazo, evitando três cards estáticos consecutivos.

### Redução de movimento

`prefers-reduced-motion: reduce` desativa pin/sticky cinematográfico e apresenta todo o conteúdo em fluxo natural. O conteúdo e a ordem semântica são os mesmos.

## Movimento e desempenho

- GSAP/ScrollTrigger continua restrito aos Client Components das rotas.
- Desktop e mobile recebem timelines diferentes dentro de `gsap.matchMedia`.
- Movimento usa `transform`, `opacity`, `clip-path` e `filter` com parcimônia.
- Fotografias usam WebP local em `public/images/cinematic`, sem requisição externa.
- O rail é `aria-hidden`; títulos, descrições e exemplos continuam no DOM.
- Timelines são limpas por `media.revert()` e `context.revert()`.

## Conversão

- Soluções leva de problema concreto para aderência e proposta.
- Processo leva de redução de risco para diagnóstico.
- Contato coloca o CTA no primeiro viewport mobile e mantém email direto como alternativa.
- CTAs usam verbos claros e apontam para a próxima ação real.

## Validação

- Testes puros cobrem a seleção `desktop | mobile | static` e a densidade das tracks.
- TypeScript, ESLint direcionado, build e `git diff --check`.
- Browser em 1440×900 e 390×844.
- Inspeção de início, meio e fim de cada track, overflow horizontal, console, FAQ, formulário e navegação entre rotas.
- Comparação visual entre os assets gerados e o render final por `view_image`.


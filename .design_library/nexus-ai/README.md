# Nexus AI — Design System

Design system reconstruction da **Nexus AI**, empresa brasileira de plataformas e agentes de inteligência artificial. A marca é tecnológica, direta, premium, cinematográfica e confiável; este sistema foi construído para suportar a narrativa de produto do site institucional e dos pontos de contato de marketing, com uma camada utilitária densa o suficiente para também servir ao produto.

Este documento é wiki interna para designers e engenheiros entrando no projeto. Ele reflete o que está implementado no `globals.css` e nos componentes da home (`route-cinematic-shell.module.css` e afins), espelhado em prosa analítica. Não é um catálogo exaustivo de hex nem um template para preencher; é um briefing de marca.

## Fonte de verdade

Os tokens e padrões abaixo vêm de `colors_and_type.css` (extraído do CSS da aplicação) e da especificação humana em `specs/design-system.md`. Os componentes documentados vêm de `components/index.json` e são complementados por previews em `preview/component-{slug}.html` quando disponíveis. Quando houver divergência entre um Figma futuro e o código, **código vence**. Toda proposta de mudança começa criando PR contra o CSS, nunca editando este README em isolamento.

## 1. Visão geral

A Nexus AI entrega plataformas e agentes que assumem trabalho repetitivo — atendimento, análise, integrações — para liberar a equipe humana do que só humano faz: decidir, criar, crescer. O design system precisa materializar essa promessa em cada pixel: tecnologia sem espetacularização, confiança sem jargão, sofisticação sem frieza.

O tratamento visual é dark-first, com superfícies grafite profundas (`#040507` no mais profundo, subindo para `#07080c`, `#090b10`, `#050609`), acento azul elétrico `#3778ff` reservado para sinal e foco, vidro discreto em overlays de navegação, ruído/grain sutil no canvas do hero e iluminação cinematográfica em CTAs. Movimento é ambientado em loops longos e feedback tátil em janelas curtas. Tipografia em Space Grotesk, com Geist Mono para código e tokens. Voz em pt-BR, direta, sem hype vazio.

A biblioteca atual cobre seis componentes (Botão, Navegação, Campo de formulário, Card, Accordion, Badge), os fundamentos visuais completos e um vocabulário de motion calibrado para a estética cinematográfica da marca.

## 2. Fundamentos de conteúdo

### Voz e tom

A Nexus AI fala como um engenheiro sênior explicando o que construiu: vocabulário concreto, frases curtas, números quando eles agregam, zero adjetivo inflado. A primeira frase de qualquer página cita "Nexus AI" para fixar a marca antes de qualquer promessa. A persona é segunda pessoa do singular ("sua operação", "sua equipe"), o que aproxima sem infantilizar. Em pt-BR, evita-se o travessão na copy de produção — recorre-se a ponto final, a uma reescrita com verbo forte ou a uma separação por ponto e vírgula quando a pausa é necessária. CTAs são imperativos curtos, no máximo duas palavras em mobile e três em desktop. Nada de "vamos", "juntos", "revolucionar", "transformar digitalmente" — a régua é utilidade mensurável.

Há um cuidado deliberado com verbos: preferem-se ações observáveis ("automatizam", "integram", "entregam", "operam") a abstrações motivacionais ("transformam", "potencializam"). A descrição padrão de hero mantém-se em uma linha e abaixo de 120 caracteres para preservar densidade na dobra inicial. A voz técnica da marca convive com uma sobriedade comercial: quando o texto precisa ser humano, ele soa humano sem ser efusivo.

### Exemplos autorizados

Cópias que estão em uso no produto e devem ser preservadas ao expandir páginas:

- Identidade do box de destaque: "Nexus AI — Stack 2026, agentes em produção".
- Pergunta que abre o herói, montada em duas palavras de contraste: "Sua equipe / multiplicada".
- Descrição canônica de hero: "Plataformas e agentes da Nexus AI assumem o trabalho repetitivo, do atendimento à análise. Sua equipe fica livre pro que só humano faz: decidir, criar, crescer."
- CTAs atuais: "Solicitar Proposta" (mobile: "Proposta") e "Ver no GitHub" (mobile: "GitHub").
- Itens de navegação institucional: "Soluções", "Cases", "Processo", "Contato", "Falar".
- Promessas de marca recorrentes: "Diagnóstico antes de proposta", "Stack aberta, sem lock-in", "12+ plataformas operando", "Onde sua operação perde tempo hoje?", "Em quanto tempo vejo resultado?".

### Regras de escrita e nomenclatura de produtos

Toda nova página começa com o nome da empresa na primeira linha de prosa. Os nomes de produto da Nexus AI seguem a convenção "verbo + objeto" quando descrevem capacidade ("Agente de Atendimento", "Plataforma de Integração") e mantêm "Nexus" como prefixo de família quando a capacidade é uma linha de produto estável ("Nexus Agents", "Nexus Stack"). Quando uma capacidade ainda é experimental, ela é apresentada como "em produção" ou "em beta" sem adjetivar. Termos técnicos em inglês (API, webhook, RAG, prompt) são liberados sem aspas, assumindo o público como engenheiro ou operador. Em listas de benefícios, cada item carrega um verbo no infinitivo e um resultado observável. Toda referência a terceiros preserva o nome oficial.

## 3. Fundações visuais

### Cor

A paleta é dark-first e foi construída em três camadas: tokens base shadcn (slate), tokens cinemáticos extraídos do `route-cinematic-shell` (grafite profundo + azul de sinal) e uma camada de aliases semânticos (`--color-*`) para consumo por produto. O modo light existe no CSS para evitar que telas de sistema caiam em branco quando o usuário força tema claro do sistema operacional, mas a aplicação entrega `<html class="dark">` e a recomendação é manter o escuro como padrão.

O acento de marca é o azul elétrico `--signal: #3778ff`, em duas formas: sólida para CTAs primários e foco, e translúcida `--signal-soft: rgba(55, 120, 255, 0.18)` para halos e superfícies de baixa energia. O cinemático constrói uma escada de estágios: `--stage: #050609` é o palco principal, `--stage-raised: #090b10` é a primeira elevação (cards de conteúdo), `--stage-mid: #07080c` e `--stage-deep: #040507` ocupam zonas de respiro e contraste. Bordas sobre dark não são cor cheia: são `--line: rgba(255, 255, 255, 0.10)`, hairlines que desaparecem em monitores mal calibrados e aparecem como sutis em telas de referência.

O texto opera com `--nexus-foreground: #f7f8fb` como primário e `--text-muted: rgba(225, 228, 236, 0.66)` como secundário. O foco de teclado usa `--cta-focus-ring: #8aaeff`, derivado mais claro do azul de sinal para garantir visibilidade em superfícies escuras. A escala de chart (`--chart-1` a `--chart-5`) é uma escada de cinzas que evita roubar atenção do acento azul e mantém neutralidade em dashboards.

Os tokens `--background`, `--card`, `--foreground`, `--primary` e seus pares são **aliases** (Camada 3) que apontam para os tokens base. Em tempo de design, prefira sempre o alias semântico (`--color-background`, `--color-card-foreground`); em tempo de engine, o sistema shadcn consome os tokens base. Não há calor na paleta: nenhum âmbar, nenhum rosa. A única fonte de "calor visual" é o gradiente branco-azulado de iluminação que sobe nos CTAs primários.

### Tipografia

A família principal é **Space Grotesk**, carregada via Google Fonts em pesos 300 a 700 (`--font-sans: 'Space Grotesk', system-ui, -apple-system, sans-serif`). É uma grotesca geométrica com leve personalidade técnica que combina com a estética cinematográfica da marca. A família mono é **Geist Mono**, consumida via fallback do sistema (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`) porque é reservada para tokens, IDs e fragmentos de código — não compõe parágrafos. A itálica serif do hero é uma escolha do `route-cinematic-shell` que usa o fallback genérico do navegador; não há token `--font-serif` autoritativo na biblioteca.

A escala é generosa e escalável por breakpoint. O display principal é `--font-size-display: 96px` com `--line-height-display: 0.95` e tracking `-0.02em`. H1 vai a `72px`, H2 a `56px`, H3 a `32px`, H4 a `24px`. O lead é `18px` com `line-height: 1.6`, o corpo é `16px` com `line-height: 1.5`, o caption é `14px`, e o eyebrow é `11px` em caixa alta com `letter-spacing: 0.18em`. As classes prontas (`.nexus-display`, `.nexus-h1`, ..., `.nexus-eyebrow`, `.nexus-mono`) são atalhos para essas combinações e devem ser usadas como ponto de partida em novos componentes.

O tracking merece atenção: o efeito "tahoe glass" do título hero usa `--letter-spacing-tahoe-stroke: 1.5px`, e o marquee label usa `--letter-spacing-marquee-label: 0.18em` em uppercase. Títulos negativos grandes (`-0.02em` a `-0.03em`) são parte da identidade — não os "corrija" para zero.

### Espaçamento, tamanho e raio

A escala de espaçamento é numerada de `--space-1: 1px` a `--space-22: 128px`, com passos não-uniformes que refletem o uso: 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 64, 72, 80, 96, 112, 128. A base operacional é `8px` (`--space-4`), e o ritmo de seção é `24px` (`--space-12`) a `48px` (`--space-16`). Não há espaçamento menor que `5px` na escala autoritativa — evita-se o ruído de tokens redundantes.

Tamanhos funcionais: altura padrão de botão é `--size-button-height: 48px`, com `--size-cta-min-height: 50px` quando o CTA é o foco absoluto da página. Inputs usam `--size-input-height: 36px` e triggers de navegação usam `--size-nav-trigger: 44px` (alvo de toque). O CTA secundário da nav usa `--size-nav-cta: 36px`. O grid pattern do canvas é `--size-grid-pattern: 80px` no desktop e cai a `--size-grid-pattern-mobile: 48px` no mobile.

A escala de radius é progressiva e contida: `--radius-sm: 6px`, `--radius-md: 8px`, `--radius-lg: 10px` (default `--radius`), `--radius-xl: 14px`, `--radius-2xl: 18px`, `--radius-3xl: 22px`, `--radius-4xl: 26px`, e `--radius-full: 9999px`. A regra é que controles internos (links, badges) fiquem em `8px` ou `10px`, containers (nav pill, CTAs, drawer) fiquem em `12px` a `18px`, e chips de status possam usar pill. Não há `rounded-none` no sistema; mesmo superfícies "duras" ganham um raio mínimo.

### Sombra, borda e fundos

A biblioteca define oito camadas de sombra nomeadas, mas a regra de uso é restrita: sombras aparecem só onde a elevação precisa ser comunicada, nunca como decoração. `--shadow-1` é exclusiva da nav pill (inset branco fino + queda de 16px). `--shadow-2` é exclusiva do drawer mobile. `--shadow-3` e `--shadow-4` descrevem os CTAs primário e secundário, respectivamente, com inset de 1px branco + queda de 24px em preto. `--shadow-5` e `--shadow-6` são reservados para o CTA cinematográfico (mesma queda de preto + halo azul de 14%/16% de opacidade). `--shadow-7` (`drop-shadow(0 22px 60px rgba(0,0,0,0.65))`) é o halo do título hero, e `--shadow-8` (`drop-shadow(0 15px 35px rgba(0,0,0,0.40)) drop-shadow(0 5px 10px rgba(0,0,0,0.20))`) é o glass text do Tahoe. A filosofia é "sombra para elevar, nunca para impressionar".

Bordas seguem o mesmo princípio: `--border: rgba(255, 255, 255, 0.10)` em dark, com `--input` ligeiramente mais opaco (`rgba(255, 255, 255, 0.15)`) para sinalizar interatividade. O foco de teclado não é uma borda mais grossa: é `--ring: #b5b5b5` em light e `--ring: #8e8e8e` em dark, com `--size-outline-offset: 5px` para garantir que o outline não cole no texto.

Fundos são compostos em camadas: o canvas de pixels do hero (pulse respiratório com `--motion-pixel-pulse-step: 0.012` e opacidade `--motion-pixel-canvas-opacity: 0.35`) é a textura ambiente; o `--stage` é o palco principal; cards e pills usam `bg-card/40 backdrop-blur-md` para o vidro sutil. Não há gradientes de cor — apenas o gradiente vertical branco-azulado dos CTAs (`from-primary/90 to-primary`) e os efeitos de sheen.

### Grids e imagens cinematográficas

Os layouts respeitam containers fixos por papel: `--max-section-shell: 1180px` é o shell de seção, `--max-hero-inner: 1080px` é o conteúdo do herói, `--max-hero-copy: 720px` é a largura ideal de leitura do título e descrição, e `--max-section-description: 700px` é o texto de apoio. O CTA destacado usa `--max-cta-content: 820px`. Gutter de página é `--gutter-page-mobile: 16px` e sobe para `--gutter-page-desktop: 24px`. A nav desktop tem `--nav-height-desktop: 36px`.

Breakpoints são apenas três e refletem o que importa: `--breakpoint-sm: 640px` (início do tratamento tipográfico expandido), `--breakpoint-md: 768px` (limiar mobile/desktop — nav pill aparece, hamburger some, marquee desktop entra), `--breakpoint-lg: 1024px` (título sobe para `text-8xl`). Não há breakpoint xl; o conteúdo estabiliza em 1024px.

Imagens cinematográficas seguem três regras: ocupam a cena com proporção consistente, recebem um halo de drop-shadow equivalente ao do título hero, e usam o mesmo accent azul em overlays de modo e dado. Não há tratamento de cor local em fotos: a paleta dark é sustentada pelo palco grafite, não pelo filtro.

## 4. Movimento e interação

Movimento é um pilar narrativo da marca. A regra é "nada é instantâneo, nada é rápido" quando se trata de ambientação: o shimmer do título leva `--motion-tahoe-shimmer: 8s linear infinite`, o sheen da nav leva `--motion-nav-sheen: 12s linear infinite`, e o marquee de logos leva `--motion-marquee: 25s linear infinite`. Esses loops longos criam a sensação de "estar vivo" sem distrair. Feedback de toque e clique, por outro lado, é sempre rápido: `--motion-cta-press: 200ms ease-out`, `--motion-cta-hover: 180ms ease`, `--motion-drawer-open: 300ms ease-out`. Entradas de página (fade-in do hero) usam `--motion-hero-enter: 1000ms ease-out`.

Dois tokens técnicos merecem destaque: `--motion-pixel-pulse-step: 0.012` define o tamanho do pulso dos pixels no canvas (ciclo percebido de 3 a 4 segundos), e `--motion-canvas-gap: 6px` define o espaçamento da grade. Animações abaixo de 200ms ou acima de 30s são desencorajadas — fora dessa janela, o ganho narrativo não compensa o custo cognitivo.

O sistema respeita `prefers-reduced-motion: reduce`. Quando o usuário pede movimento reduzido, o pulso do canvas é executado uma única vez em mount e congelado, o fade-in do hero é suprimido e os loops longos (shimmer, sheen, marquee) podem ser parados. Esse comportamento é parte do contrato do componente de canvas, não uma otimização local.

## 5. Marca

### Uso do nome

Use "Nexus AI" por extenso na primeira frase de qualquer página ou seção. Em repetições dentro do mesmo bloco, "Nexus" sozinho é aceitável. Em tags, breadcrumbs e meta-tags, mantenha "Nexus AI" para preservar consistência com SEO. Em URL, prefira `nexus.ai` e `nexus-ai` slugificado. Nunca abrevie para "NAI" ou "NexusAI" sem ponto.

### Wordmark e mark

O wordmark atual é composto tipograficamente em duas peças: "Nexus" em Space Grotesk `font-semibold` e " AI" em Space Grotesk `font-medium` com `opacity-60`, em `text-sm` e `tracking-tight`. É usado dentro da nav pill no desktop (primeiro filho, separado dos links por um divider vertical de 1px) e em link fixo isolado no mobile (`fixed top-4 left-4`), simétrico ao gatilho do drawer.

O símbolo é um SVG `24×24`: quadrado arredondado com `fill-foreground` e um "N" em chevron `stroke text-background`. **Esse símbolo é um placeholder** — não há logotipo oficial aprovado pela marca nesta biblioteca. Trate-o como recurso interno para protótipos e previews, e sinalize qualquer uso externo (mídia paga, materiais impressos, apresentações para stakeholders externos) com a liderança de marca antes de publicar. O brandbook não autoriza nem proíbe uso legal do símbolo atual; essa definição cabe a um documento de marca separado.

### Clear space

O wordmark exige uma área de respiro equivalente à altura da letra "N" maiúscula em todos os lados, ou ao `padding-y` da nav pill quando o wordmark estiver integrado. O mark isolado pede pelo menos a largura de um traço do "N" em cada lado. Não cruze o wordmark com linhas de grid, bordas de cards ou outros elementos sem essa folga.

### Usos proibidos

- Não distorça o wordmark (esticar, comprimir, rotacionar).
- Não troque o Space Grotesk por outra fonte sem aprovação de marca.
- Não aplique o mark ou wordmark sobre fundos que comprometam contraste (abaixo de `#252525` ou acima de `#fafafa` sem ajuste de cor).
- Não use o mark colorido, com gradiente ou com sombra de drop.
- Não reapresente o wordmark em itálico; o itálico é reservado para o contraste do título hero.
- Não use o símbolo fora de protótipos internos até que um mark oficial seja publicado.

## 6. Componentes

| Componente | Preview | Contrato | Origem CSS | Fatos-chave | Insight de uso |
|---|---|---|---|---|---|
| Botão | `preview/component-button.html` | `components/button.json` | `components.css` (Botão) | 4 variantes (primário, secundário, ghost, ícone); altura `48px`; raio `12-14px`; gradiente branco-azulado; sombra `--shadow-3`/`--shadow-5`; estados hover/active com `scale-[1.02]`/`scale-[0.98]` em `200ms`. | Ações claras com brilho controlado e deslocamento mínimo; reserve o azul de halo para o primário e deixe o secundário em vidro. |
| Navegação | `preview/component-navigation.html` | `components/navigation.json` | `components.css` (Navegação) | 2 variantes (desktop pill, mobile drawer); nav pill em `rounded-full bg-card/40 backdrop-blur-md` com sheen deslizante; drawer em `rounded-2xl bg-card/70 backdrop-blur-xl`; trigger hamburger `44×44`; CTA "Falar" embutido. | Pílula de vidro no desktop e drawer cinematográfico no mobile; o logo mora dentro da pílula no desktop e flutua simétrico ao hamburger no mobile. |
| Campo de formulário | `preview/component-form-field.html` | `components/form-field.json` | `components.css` (Campo) | 4 variantes (texto, e-mail, área de texto, select); altura `36px` (inputs) e textarea com `min-height` superior; borda `rgba(255,255,255,0.15)` em dark; foco `--cta-focus-ring` com `outline-offset: 5px`; mensagem de erro em `--destructive` (`#f53d3d`). | Campos escuros, diretos e com foco azul inequívoco; mantenha `label` acima do campo, nunca dentro como placeholder. |
| Card | `preview/component-card.html` | `components/card.json` | `components.css` (Card) | 4 variantes (destaque, mídia, métrica, citação); `bg-card/40 backdrop-blur-md` ou `bg-stage-raised`; borda `--line`; raio `14-18px`; tipografia editorial; aceita mídia com halo `drop-shadow` equivalente ao hero. | Superfícies profundas com borda luminosa e hierarquia editorial; trate cada card como uma cena, com respiro e peso visual próprios. |
| Accordion | `preview/component-accordion.html` | `components/accordion.json` | `components.css` (Accordion) | 2 variantes (FAQ, processo); sem caixa de fundo, separados por hairlines `--line`; chevron rotaciona em `200ms`; conteúdo anima altura em `300ms ease-out`. | FAQ sem caixa pesada, separado por hairlines e movimento curto; use quando a pergunta é simples e a resposta pode ser longa. |
| Badge | `preview/component-badge.html` | `components/badge.json` | `components.css` (Badge) | 3 variantes (sinal, neutro, status); `text-eyebrow` (caixa alta, tracking `0.18em`); raio `--radius-full`; fundo `--signal-soft` quando ativo. | Sinalização compacta em caixa alta com tracking técnico; limite a uma badge por área para preservar hierarquia. |

Quando um componente novo for proposto, ele deve entrar nesta tabela via adição de slug em `components/index.json` e arquivo correspondente em `components/{slug}.json`, acompanhado de preview em `preview/component-{slug}.html`. O insight de uso é a contribuição mais valiosa da wiki: ele antecipa a pergunta que o designer faria.

## 7. Acessibilidade e responsividade

O sistema nasce em dark, mas reconhece a preferência do sistema operacional: quando o usuário força tema claro, o CSS expõe uma paleta light sem comprometer a leitura. Em qualquer tema, o texto primário sobre o palco principal atinge contraste AAA. O foco de teclado é sempre visível, com `--size-outline-offset: 5px` evitando que o anel grude no glifo. Componentes interativos expõem `aria-expanded`, `aria-controls` e `aria-label` quando o estado não é comunicável apenas visualmente (drawer mobile, accordion, badges dinâmicos).

Movimento é tratado como recurso de acessibilidade: `prefers-reduced-motion: reduce` interrompe loops longos e reduz entradas a transições funcionais. CTAs preservam touch target mínimo de `44px` mesmo em densidade alta (a altura interna é `36px`, mas o padding e o container elevam a área tocável). Inputs nunca dependem apenas de cor para indicar erro — sempre há texto auxiliar ou ícone.

A responsividade é regida por três breakpoints, não quatro. Em `md (768px)`, a navegação troca de drawer para pill, o hamburger desaparece e o marquee desktop entra. Em `lg (1024px)`, o título do herói sobe para `text-8xl`. Não há breakpoint xl; o sistema assume que containers estáveis acima de 1024px usam o mesmo shell.

## 8. Governança do Design System

**Fonte de verdade.** O CSS da aplicação (`src/app/globals.css` e os `*.module.css` de componentes) é a fonte primária. Os tokens em `colors_and_type.css` são a projeção dessa fonte para a biblioteca. Quando divergirem, o código vence; este README e o `specs/design-system.md` são wiki, não contrato.

**Como propor tokens ou componentes novos.** Abra uma issue descrevendo o problema, não a solução. Valide que o token não existe em nenhuma escala (`grep` no CSS) e que o componente proposto não pode ser montado a partir dos seis atuais. Para tokens: justifique o eixo (cor, espaço, raio, sombra), o valor e o uso previsto; sem essa tríade, a proposta não avança. Para componentes: apresente anatomia, variantes, estados e pelo menos um caso de uso real. Sem evidência de uso real, o componente vira candidato a utility class, não a componente.

**Versionamento sugerido.** Use SemVer com escopo de design system. Patch (0.0.x) para ajustes de valor dentro de um token existente. Minor (0.x.0) para novo token, novo componente ou nova variante documentada. Major (x.0.0) para quebras de API de tokens (renomeação, remoção, mudança de semântica). Documente cada release em uma seção de changelog dentro deste README.

**Definição de pronto.** Um token está pronto quando tem nome semântico, valor extraído do código (não inventado), comentário de uso e entrada em `colors_and_type.css`. Um componente está pronto quando tem preview em `preview/`, contrato em `components/{slug}.json`, entrada em `components/index.json`, linha na tabela de componentes deste README e teste de acessibilidade mínimo (foco visível, contraste, navegação por teclado).

**Controle de consistência.** Revisão de PR não aprova mudanças de design sem um diff de tokens. Mudanças em componentes devem atualizar previews e README na mesma PR. Mudanças em tokens devem atualizar README, `css.json` e previews que dependem do token. Designers e engenheiros compartilham responsabilidade pela consistência: designers revisam semântica e uso, engenheiros revisam extração e propagação.

## 9. Índice dos artefatos

- `README.md` — este brandbook humano.
- `SKILL.md` — ponto de entrada para agentes (manifest da biblioteca).
- `colors_and_type.css` — variáveis CSS runtime; importe, não leia para entender.
- `css.json` — fonte estruturada de tokens para consumo programático.
- `components.css` — CSS agregado dos componentes, extraído dos previews.
- `components/index.json` — índice e padrões transversais dos componentes.
- `components/{slug}.json` — contrato por componente (intent e variantes).
- `components/_evidence/` — evidência bruta (quando disponível).
- `preview/component-{slug}.html` — cartões de preview dos componentes.
- `ui_kits/{type}/index.html` — UI kit interativo de referência.
- `specs/design-system.md` — wiki humana complementar ao código.
- `library-consumption.json` — ordem de leitura recomendada para agentes.

## 10. Ressalvas e substituições conhecidas

1. **Geist Mono** é a fonte mono pretendida pela marca, mas o CSS atual cai para a stack do sistema (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`). Em ambientes que não têm Geist Mono instalado, a substituição é funcional; em ambientes que têm (via `next/font/google` ou bundling manual), prefira Geist Mono. Impacto: pequeno, restrito a tokens e fragmentos de código.
2. **O símbolo da marca** (SVG 24×24 com "N" chevron) é placeholder. Não há logotipo oficial publicado nesta biblioteca. Esta ressalva é explícita para evitar que o símbolo atual seja tratado como definitvo em uso externo.
3. **O token `--font-serif`** não está definido na biblioteca; a itálica serif do hero usa o fallback genérico do navegador. Em telas onde a serif do sistema é diferente (Linux, Android), o "contraste" do herói pode variar de peso.
4. **Os valores de chart (`--chart-1` a `--chart-5`)** foram inferidos a partir do shadcn dark slate; não há dashboards implementados ainda, então os números são referência, não evidência. Quando um dashboard real existir, esta nota deve ser revisada.
5. **A escala de espaçamento** vai até `--space-22: 128px`, mas o ritmo documentado da home usa apenas até `--space-16: 48px`. Tokens de `17` a `22` existem para antecipar layouts maiores; não há páginas reais que os consumam ainda.
6. **Os tokens de motion** descrevem durações, mas os `easing` reais das animações (cubic-bezier dos loops longos, easing do sheen, easing do marquee) não estão totalmente explícitos no CSS exportado; presume-se `linear` para os três loops longos e `ease-out` para feedback de toque. Quando um agente for reproduzir fielmente, prefira medir o resultado no navegador.
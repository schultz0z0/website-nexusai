# Auditoria PageSpeed — Mobile

## Identificação

- **Site:** https://agenciaprometeus.com.br/
- **Relatório:** https://pagespeed.web.dev/analysis/https-agenciaprometeus-com-br/jz05kr5yjm?hl=pt_BR&form_factor=mobile
- **Gerado em:** 4 de setembro de 2026, 00:20:51 BRT
- **Ferramenta:** Lighthouse 13.4.1 / Headless Chromium 151
- **Perfil:** Moto G Power emulado, carregamento inicial e limitação de 4G lento
- **Dados reais de usuários (CrUX):** indisponíveis no momento (`Nenhum dado`)

## Resumo executivo

O site apresenta uma base técnica forte no mobile: acessibilidade, práticas recomendadas e SEO receberam nota máxima, e não houve deslocamento visual. A nota de desempenho **65** é reduzida principalmente pelo excesso de trabalho na thread principal e pelo tempo de bloqueio causado por JavaScript. O servidor e a estabilidade visual não são os gargalos principais.

## Pontuações

| Categoria | Resultado | Leitura |
|---|---:|---|
| Desempenho | 65 | Precisa melhorar |
| Acessibilidade | 100 | Excelente |
| Práticas recomendadas | 100 | Excelente |
| SEO | 100 | Excelente |
| Navegação agêntica | 3/3 | Aprovada |

## Métricas de laboratório

| Métrica | Resultado | Avaliação |
|---|---:|---|
| First Contentful Paint (FCP) | 1,5 s | Bom |
| Largest Contentful Paint (LCP) | 2,7 s | Pouco acima do alvo de 2,5 s |
| Total Blocking Time (TBT) | 1.570 ms | Crítico; principal gargalo |
| Cumulative Layout Shift (CLS) | 0 | Excelente |
| Speed Index | 5,7 s | Lento |
| Time to Interactive (TTI) | 4,9 s | Precisa melhorar |
| Time to First Byte (TTFB) | 140 ms | Excelente |

## Diagnóstico principal

### 1. Bloqueio da thread principal

O Lighthouse mediu **5,1 s** de trabalho na thread principal:

| Categoria | Tempo |
|---|---:|
| Avaliação de scripts | 1.934 ms |
| Outros trabalhos | 1.203 ms |
| Estilo e layout | 986 ms |
| Análise e compilação de scripts | 655 ms |
| Renderização | 146 ms |
| Análise de HTML e CSS | 137 ms |
| Coleta de lixo | 73 ms |

Foram encontradas **20 tarefas longas**. O conjunto de tarefas próprias do domínio somou aproximadamente 2.482 ms, incluindo uma tarefa do documento principal de 537 ms e tarefas de chunks JavaScript de até 336 ms.

### 2. JavaScript não utilizado

- Transferência JavaScript analisada: aproximadamente **210,4 KiB**.
- Economia estimada: **125,3 KiB**.
- O relatório identifica quatro chunks próprios com oportunidades individuais entre 26,5 KiB e 41 KiB.

Isto indica que componentes e comportamentos abaixo da dobra estão sendo enviados ou hidratados antes de serem necessários.

### 3. LCP do título, não da imagem

O elemento de LCP é o título do hero:

> Multiplique a capacidade da sua equipe com IA

Detalhamento:

- TTFB: **140 ms**.
- Atraso de renderização do elemento: **2.730 ms**.

Como o tempo está concentrado na renderização do texto, o título deve aparecer no HTML inicial sem depender de animação de entrada, estado de cliente ou hidratação para ficar visível. A imagem do hero não foi identificada como o elemento LCP deste teste.

### 4. Imagens responsivas abaixo da dobra

O Lighthouse estimou uma economia total de **59 KiB**. Imagens da seção de capacidades estão sendo entregues em cerca de 750 × 500 px para uma exibição próxima de 352 × 235 px. O atributo `sizes` e os tamanhos gerados pelo `next/image` devem ser revistos para a largura efetivamente exibida no mobile.

### 5. CSS que bloqueia a renderização

Dois arquivos CSS próprios, somando aproximadamente 23 KiB, permaneceram no caminho crítico e representaram cerca de **620 ms** no teste. É necessário separar o CSS realmente crítico do hero do CSS das seções posteriores e verificar estilos globais excessivos.

### 6. Animações não compostas

Foram encontrados dois elementos:

- brilho do menu (`nexus-nav-sheen`) animando `background-position-x`;
- granulação do hero (`heroGrainDrift`) animando `background-position-x` e `background-position-y`.

Essas animações devem usar preferencialmente `transform` e `opacity`, ou ser desativadas no mobile e em `prefers-reduced-motion`.

### 7. DOM

- Total de elementos: **535**.
- Profundidade máxima: **18**.
- Maior quantidade de filhos diretos: **26** no `body`.

Não é o principal causador da nota 65, mas contribui para os 986 ms gastos em estilo e layout.

## Prioridade recomendada

1. Remover qualquer atraso, opacidade inicial ou dependência de JavaScript do título do hero.
2. Reduzir hidratação e JavaScript inicial, principalmente de seções abaixo da dobra.
3. Dividir ou carregar sob demanda os componentes interativos e animações secundárias.
4. Corrigir as duas animações não compostas.
5. Ajustar `sizes` e breakpoints das imagens da seção de capacidades.
6. Reduzir CSS crítico e evitar carregar antecipadamente estilos específicos de conteúdo fora do viewport.
7. Reavaliar estrutura do DOM apenas depois dos itens acima.

## Critérios para a próxima validação

- Executar pelo menos três medições mobile e usar a mediana.
- Desempenho: **90 ou mais**.
- LCP: **até 2,5 s**.
- TBT: **até 200 ms**, idealmente abaixo disso.
- CLS: manter em **0** ou abaixo de 0,1.
- Confirmar que o título continua visível imediatamente e que o visual aprovado não foi alterado.
- Validar também em larguras de 320, 360, 390, 412 e 430 px.

## Limitação do resultado

O relatório não possui dados reais do Chrome UX Report. Portanto, ainda não é possível afirmar aprovação nos Core Web Vitals de campo. A análise atual representa uma medição de laboratório simulada e pode variar entre execuções.

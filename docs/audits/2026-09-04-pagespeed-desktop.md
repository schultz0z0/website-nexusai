# Auditoria PageSpeed — Desktop

## Identificação

- **Site:** https://agenciaprometeus.com.br/
- **Relatório:** https://pagespeed.web.dev/analysis/https-agenciaprometeus-com-br/jz05kr5yjm?hl=pt_BR&form_factor=desktop
- **Gerado em:** 4 de setembro de 2026, 00:20:51 BRT
- **Ferramenta:** Lighthouse 13.4.1 / Headless Chromium 151
- **Perfil:** computador emulado, carregamento inicial e limitação personalizada
- **Dados reais de usuários (CrUX):** indisponíveis no momento (`Nenhum dado`)

## Resumo executivo

O desktop está consideravelmente melhor que o mobile. O carregamento visual é rápido, o LCP está muito abaixo do limite recomendado e não há instabilidade de layout. A nota de desempenho **84** ainda não chega à faixa verde por causa do Total Blocking Time de 320 ms e de JavaScript que não é necessário durante o carregamento inicial.

## Pontuações

| Categoria | Resultado | Leitura |
|---|---:|---|
| Desempenho | 84 | Bom, mas abaixo da meta 90+ |
| Acessibilidade | 100 | Excelente |
| Práticas recomendadas | 100 | Excelente |
| SEO | 100 | Excelente |
| Navegação agêntica | 3/3 | Aprovada |

## Métricas de laboratório

| Métrica | Resultado | Avaliação |
|---|---:|---|
| First Contentful Paint (FCP) | 0,3 s | Excelente |
| Largest Contentful Paint (LCP) | 0,8 s | Excelente |
| Total Blocking Time (TBT) | 320 ms | Moderado; principal gargalo |
| Cumulative Layout Shift (CLS) | 0 | Excelente |
| Speed Index | 1,6 s | Bom |
| Time to Interactive (TTI) | 1,0 s | Excelente |

## Diagnóstico principal

### 1. JavaScript e tarefas longas

- JavaScript não utilizado: economia estimada de **96 KiB**.
- Tarefas longas encontradas: **3**.
- TBT: **320 ms**.

O mesmo JavaScript inicial que pesa fortemente em um celular também reduz a pontuação no computador, embora o processador emulado consiga concluí-lo muito mais rapidamente. A correção deve ser compartilhada com o mobile: menos componentes de cliente, divisão de código e inicialização tardia do conteúdo fora da dobra.

### 2. Renderização inicial

O relatório estima apenas **80 ms** de economia para recursos que bloqueiam a renderização. Isso é secundário no desktop, mas pode ser revisado junto da separação do CSS crítico feita para o mobile.

### 3. Imagens

A economia estimada é de apenas **13 KiB**. Portanto, comprimir agressivamente o hero ou reduzir sua qualidade não deve ser a primeira ação no desktop. O visual aprovado pode ser preservado; o maior retorno continua vindo do JavaScript.

### 4. LCP

O LCP de **0,8 s** já está muito melhor que o alvo de 2,5 s. Não há evidência neste relatório de que a imagem do hero seja um problema relevante no desktop. Alterações no carregamento do hero devem ser conservadoras para não prejudicar esse resultado.

### 5. Estilo, layout e animações

O relatório registra:

- reflow forçado;
- DOM a otimizar;
- duas animações não compostas.

As animações são as mesmas identificadas no mobile: brilho do menu por `background-position-x` e granulação do hero por `background-position-x/y`. Migrar o efeito para `transform`/`opacity` beneficia os dois perfis e reduz trabalho de pintura.

## Prioridade recomendada

1. Reduzir os 96 KiB de JavaScript não utilizado no carregamento inicial.
2. Eliminar ou dividir as três tarefas longas.
3. Corrigir as animações não compostas e investigar o reflow forçado.
4. Revisar CSS bloqueante, sem sacrificar a renderização inicial já rápida.
5. Otimizar os 13 KiB de imagens apenas como acabamento.

## Critérios para a próxima validação

- Executar pelo menos três medições desktop e usar a mediana.
- Desempenho: **90 ou mais**.
- LCP: manter abaixo de **1,5 s**; limite formal de aprovação até 2,5 s.
- TBT: buscar **até 150 ms** no perfil desktop.
- CLS: manter em **0** ou abaixo de 0,1.
- Confirmar visualmente o hero em 1280 × 720, 1366 × 768, 1440 × 900, 1920 × 1080 e telas ultrawide.

## Relação com o relatório mobile

O desktop não possui um problema visual de carregamento: FCP, LCP, Speed Index e TTI são bons ou excelentes. A diferença entre a nota 84 do desktop e a nota 65 do mobile mostra que o custo de JavaScript e layout escala mal em hardware mais fraco. Assim, a otimização deve ser conduzida com prioridade mobile-first; o desktop deverá melhorar como consequência, sem receber atalhos específicos que ocultem o problema.

## Limitação do resultado

O relatório não possui dados reais do Chrome UX Report. Portanto, ainda não é possível afirmar aprovação nos Core Web Vitals de campo. A análise atual representa uma medição de laboratório simulada e pode variar entre execuções.

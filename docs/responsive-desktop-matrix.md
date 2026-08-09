# Contrato de responsividade desktop

## Objetivo

Preservar a experiência desktop original completa nas rotas `/`, `/solucoes`, `/processo` e `/contato`: mesmos canvas, imagens, órbitas, painéis, cenas fixadas e animações de scroll. A proporção do monitor nunca troca a página por uma versão simplificada.

Em telas largas e baixas, somente os limites internos são adaptados: altura do palco, escala tipográfica, padding, momento de saída do texto anterior e tamanho dos painéis. `prefers-reduced-motion: reduce` continua sendo a única condição que desliga a coreografia por acessibilidade.

## Perfis de viewport

| Perfil | Condição | Comportamento |
| --- | --- | --- |
| `mobile` | largura até 767 px | Mantém a experiência mobile dedicada já aprovada. |
| `cinematic` | qualquer desktop a partir de 768 px | Mantém integralmente a experiência cinematográfica desktop. |
| `static` acessível | `prefers-reduced-motion: reduce` | Exibe o conteúdo completo sem coreografia de scroll. |

Os limites são centralizados em `src/lib/viewport-motion.ts`. As páginas expõem o modo ativo em `data-motion-mode` para diagnóstico e testes. O tamanho ampliado da fonte raiz é medido separadamente em `data-text-scale`; ele ajusta apenas a distância segura entre navegação e hero, sem alterar o modo cinematográfico.

## Correções aplicadas

- Home: o hero original não foi alterado. O palco azul continua pinado e animado; em altura abaixo de 820 px ele recebe altura explícita de `100svh`, remove padding vertical excedente e reduz proporcionalmente apenas o grid interno.
- Soluções: hero, órbitas, núcleo, canvas e seis cards continuam na mesma timeline. Em viewport abaixo de 820 px ou proporção extrema a partir de 3:1, o texto introdutório termina antes do primeiro par de cards entrar.
- Processo: os quatro checkpoints continuam no painel cinematográfico. Em altura abaixo de 820 px, palco, tipografia, espaçamento e lista são limitados por `svh`, preservando título, descrição e entregáveis dentro do painel.
- Contato: a transmissão, receptor, recibo, briefing, formulário e três respostas continuam animados. Em altura abaixo de 820 px, os palcos usam exatamente `100svh`, o hero anterior sai por completo antes do briefing e os painéis de resposta são dimensionados dentro da viewport.
- Fonte ampliada: em 150% e 200%, Processo e Contato afastam o hero da navegação fixa sem desligar a animação.

## Matriz automatizada

Cada combinação abaixo roda nas quatro rotas e mede checkpoints de 0%, 25%, 50%, 75% e 100% do documento.

| Largura × altura | Proporção aproximada | Perfil esperado |
| --- | --- | --- |
| 1024×768 | 4:3 | `cinematic` |
| 1280×720 | 16:9 | `cinematic` |
| 1366×768 | 16:9 | `cinematic` |
| 1440×900 | 16:10 | `cinematic` |
| 1600×600 | 8:3 | `cinematic` |
| 1680×1050 | 16:10 | `cinematic` |
| 1920×600 | 16:5 | `cinematic` |
| 1920×1080 | 16:9 | `cinematic` |
| 2560×720 | 32:9 | `cinematic` |
| 2560×1080 | 21:9 | `cinematic` |
| 3440×900 | ultrawide | `cinematic` |
| 3840×1080 | 32:9 | `cinematic` |
| 3840×2160 | 16:9 | `cinematic` |

Cobertura adicional:

- movimento reduzido em 1920×600, 1920×1080 e 2560×720;
- fonte raiz em 125%, 150% e 200% nos mesmos três viewports;
- sentinelas específicas para Home, Soluções, Processo e Contato nos pontos críticos das timelines;
- validação manual no navegador real em 1600×600, 1920×600, 2560×720, 3440×900 e 1920×1080.

## Critérios de aceite

- `document.documentElement.scrollWidth <= window.innerWidth + 1`;
- todas as rotas desktop permanecem com `data-motion-mode="cinematic"`;
- nenhum heading, parágrafo, link, botão ou campo visível sai horizontalmente da viewport;
- navegação fixa não cruza o hero;
- texto introdutório de Soluções não cruza os cards ativos;
- títulos e descrições de Processo permanecem dentro do painel;
- palco azul da Home e palco de respostas de Contato permanecem dentro da altura visível;
- movimento reduzido continua completo e legível;
- nenhum canvas, mídia, card, etapa ou animação é removido por causa da altura do monitor.

## Comandos

```bash
npm run test:unit
npm run lint
npm run build
npm run test:responsive -- --project=chromium --workers=1
```

Para testar a build standalone, pare antes o servidor de desenvolvimento da porta 3000:

```bash
PLAYWRIGHT_USE_PRODUCTION_BUILD=1 npm run test:responsive -- --project=chromium --workers=1
```

O gate atual é 29 testes unitários e 126 testes de navegador, sem falhas, skips ou flakes.

## Como validar em um monitor que não é baixo

Chrome e Edge emulam a viewport mesmo quando ela é maior que a área física da tela.

1. Abra o site e pressione `F12`.
2. Ative a barra de dispositivos com `Ctrl+Shift+M`.
3. Selecione `Responsive`.
4. Digite `1920` na largura e `600` na altura.
5. No zoom da prévia, escolha `Fit to window` se necessário. Esse zoom só reduz a prévia; o site continua recebendo exatamente 1920×600.
6. Recarregue a página e percorra todo o scroll nas quatro rotas.
7. Repita com `1600×600`, `2560×720`, `3440×900` e `1920×1080`.
8. Confirme que canvas e animações continuam presentes e que textos antigos saem antes da próxima cena entrar.

Diagnóstico para o Console do DevTools:

```js
({
  viewport: `${window.innerWidth}x${window.innerHeight}`,
  scrollWidth: document.documentElement.scrollWidth,
  overflowHorizontal:
    document.documentElement.scrollWidth > window.innerWidth + 1,
  motionMode: document.querySelector("main")?.dataset.motionMode ??
    document.querySelector('[data-home-chapter="value"]')?.dataset.motionMode,
})
```

O resultado esperado em desktop é `overflowHorizontal: false` e `motionMode: "cinematic"`.

Para simular fonte ampliada:

```js
document.documentElement.style.fontSize = "200%"
```

Para restaurar:

```js
document.documentElement.style.removeProperty("font-size")
```

Para movimento reduzido, abra **More tools → Rendering** e, em **Emulate CSS media feature prefers-reduced-motion**, selecione `reduce`.

## Artefatos de falha

Quando um caso falha, o Playwright salva em `.next/playwright-test-results/` screenshot, trace, rota, viewport, checkpoint e contexto DOM. Esses arquivos são ignorados pelo Git.

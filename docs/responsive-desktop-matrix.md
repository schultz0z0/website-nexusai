# Contrato de responsividade desktop

## Objetivo

Preservar conteúdo, hierarquia, legibilidade e interação nas rotas `/`, `/solucoes`, `/processo` e `/contato`, independentemente da proporção do monitor. Telas muito largas e baixas mudam para uma composição segura em vez de comprimir ou sobrepor a experiência cinematográfica.

## Perfis de viewport

| Perfil | Condição | Comportamento |
| --- | --- | --- |
| `mobile` | largura até 767 px | Mantém a experiência mobile dedicada. |
| `static` | desktop com altura até 639 px | Remove pin/sticky sobreposto e coloca o conteúdo completo em fluxo normal. |
| `compact` | desktop com altura entre 640 e 819 px | Mantém movimento, mas reduz distâncias, escalas e zonas de sobreposição. |
| `cinematic` | desktop com altura a partir de 820 px | Mantém a experiência cinematográfica completa. |
| `static` acessível | `prefers-reduced-motion: reduce` | Movimento reduzido vence qualquer dimensão e exibe o conteúdo completo em fluxo seguro. |

Os limites são centralizados em `src/lib/viewport-motion.ts`. As páginas expõem o modo ativo em `data-motion-mode` para diagnóstico e testes.

## Matriz automatizada

Cada combinação abaixo é executada nas quatro rotas. O teste mede o topo e 25%, 50%, 75% e 100% do scroll do documento, aguardando dois frames de renderização após cada deslocamento.

| Largura × altura | Proporção aproximada | Perfil esperado |
| --- | --- | --- |
| 1024×768 | 4:3 | `compact` |
| 1280×720 | 16:9 | `compact` |
| 1366×768 | 16:9 | `compact` |
| 1440×900 | 16:10 | `cinematic` |
| 1600×600 | 8:3 | `static` |
| 1680×1050 | 16:10 | `cinematic` |
| 1920×600 | 16:5 | `static` |
| 1920×1080 | 16:9 | `cinematic` |
| 2560×720 | 32:9 | `compact` |
| 2560×1080 | 21:9 | `cinematic` |
| 3440×900 | 21:9 | `cinematic` |
| 3840×1080 | 32:9 | `cinematic` |
| 3840×2160 | 16:9 | `cinematic` |

Cobertura adicional:

- Movimento reduzido em 1920×600, 1920×1080 e 2560×720.
- Fonte raiz em 125%, 150% e 200% nos mesmos três viewports.
- Smoke mobile em 390×844 e 430×932 durante a auditoria manual final.

## Critérios de aceite

- `document.documentElement.scrollWidth <= window.innerWidth + 1`.
- Identidade “Nexus AI” e conteúdo de `main` presentes.
- Nenhum overlay de erro do framework.
- Nenhum heading, parágrafo, link, botão ou campo visível fora da largura da viewport.
- Nenhum conteúdo crítico visível com dimensão zero.
- Nenhuma interseção entre overlay de erro e conteúdo principal.
- Conteúdo completo com movimento reduzido e fonte ampliada.
- Sem ocultar o defeito com `overflow-x: hidden` ou corte equivalente.

## Comandos

Matriz em desenvolvimento:

```bash
npm run test:responsive -- --project=chromium --workers=4
```

Matriz contra a build standalone:

> Encerre primeiro qualquer servidor de desenvolvimento na porta 3000. Fora do CI, o Playwright pode reutilizar um servidor já existente.

```bash
npm run build
PLAYWRIGHT_USE_PRODUCTION_BUILD=1 npm run test:responsive -- --project=chromium --workers=4
```

O arquivo `playwright.config.ts` usa timeout de 90 segundos por teste. Isso acomoda a compilação e a renderização agregada sem alterar as asserções. O gate local esperado é 130 testes, 0 falhas, 0 skips e 0 flakes.

## Como validar em um monitor que não é baixo

Chrome e Edge conseguem emular uma viewport maior ou mais baixa que a área física disponível. A prévia é reduzida para caber na janela, mas o CSS recebe exatamente a largura e a altura configuradas.

1. Abra o site e pressione `F12`.
2. Ative a barra de dispositivos com `Ctrl+Shift+M`.
3. Selecione `Responsive`.
4. Digite `1920` na largura e `600` na altura. Se necessário, escolha `Fit to window` no zoom da prévia.
5. Recarregue a página e percorra todo o scroll nas quatro rotas.
6. Repita com `1600×600`, `2560×720`, `3440×900` e `1024×768`.
7. Confirme que não existe barra horizontal, texto cortado, cards sobrepostos ou área vazia entre cenas.

No Console do DevTools, este diagnóstico confirma a viewport e o overflow horizontal:

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

Para simular texto ampliado sem depender do tamanho físico do monitor:

```js
document.documentElement.style.fontSize = "200%"
```

Para restaurar:

```js
document.documentElement.style.removeProperty("font-size")
```

Para movimento reduzido, abra o menu do DevTools, escolha **More tools → Rendering** e em **Emulate CSS media feature prefers-reduced-motion** selecione `reduce`.

## Artefatos de falha

Quando um caso falha, o Playwright salva em `.next/playwright-test-results/`:

- screenshot do estado exato;
- trace de navegação;
- rota, viewport e checkpoint;
- contexto DOM da falha.

Esses artefatos são ignorados pelo Git e enviados pela automação de CI apenas quando o gate falha.

# Prometeus — website institucional

Site Next.js da Prometeus, com experiências cinematográficas responsivas nas rotas Home, Soluções, Processo e Contato. O domínio canônico oficial é `https://agenciaprometeus.com.br`.

## Requisitos

- Node.js 22
- npm
- Chromium do Playwright para a suíte responsiva

## Desenvolvimento local

```bash
npm ci
npm run dev
```

O servidor local usa `http://localhost:3000`.

## Microsoft Clarity

O projeto `yjrsmq8w37` é carregado globalmente pelo gerenciador de consentimento,
somente após autorização de **Analytics**. A escolha de **Marketing** controla
separadamente o consentimento para armazenamento de publicidade via `consentv2`.
O formulário de contato usa `data-clarity-mask="true"`.

`NEXT_PUBLIC_CLARITY_ID` permite substituir o ID público; uma variável explicitamente
vazia desativa a integração. O ID é incorporado no build, inclusive no Docker.
Após alterar a configuração, gere e publique um novo build.

Para validar após publicar, aceite Analytics nas preferências de cookies e confira
na aba Network do navegador uma requisição para
`https://www.clarity.ms/tag/yjrsmq8w37` e as requisições `/collect` do Clarity.
Ao recusar Analytics, a tag não carrega. Ao revogar depois de aceitar, o site salva
a escolha e recarrega a página para encerrar o gravador em execução.

Referências: [tutorial do acervo O Setup](https://setup.omatheusdaia.com.br/tutoriais/microsoft-clarity-com-ia)
e [API oficial de consentimento](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2).

## Descoberta em buscadores e respostas de IA

O catálogo `/servicos` e quatro páginas detalhadas são renderizados no servidor, com canonical, Service/BreadcrumbList, links internos, sitemap e resumo em `/llms.txt`. A chave pública em `/indexnow.txt` permite notificar mudanças aos buscadores participantes via `npm run search:submit -- /caminho-alterado`. Use `--dry-run` para conferir sem enviar. Publique e valide as URLs antes da submissão.

Consulte [SEARCH_ENGINE_SETUP.md](SEARCH_ENGINE_SETUP.md) para a ordem de publicação, Bing/Copilot/DuckDuckGo, Brave, acesso de ChatGPT/Perplexity/Google AI e acompanhamento. Código preparado não significa cadastro externo concluído ou presença confirmada nos índices.

## Verificação de qualidade

```bash
npm run test:unit
npm run lint
npm run build
npx playwright install chromium
npm run test:responsive
```

Para executar unitários e responsivos em sequência:

```bash
npm run test:all
```

Para testar a saída standalone de produção:

> Encerre qualquer `npm run dev` que esteja usando a porta 3000 antes deste teste; fora do CI, o Playwright pode reutilizar um servidor já aberto.

```bash
npm run build
PLAYWRIGHT_USE_PRODUCTION_BUILD=1 npm run test:responsive -- --project=chromium --workers=4
```

No PowerShell:

```powershell
npm run build
$env:PLAYWRIGHT_USE_PRODUCTION_BUILD = "1"
npm run test:responsive -- --project=chromium --workers=4
Remove-Item Env:PLAYWRIGHT_USE_PRODUCTION_BUILD
```

Screenshots, traces e contexto de falha são gravados somente quando um teste falha, em `.next/playwright-test-results/`.

## Contrato responsivo

Consulte [docs/responsive-desktop-matrix.md](docs/responsive-desktop-matrix.md) para os modos de viewport, a matriz automatizada, os critérios de aceite e o roteiro de validação manual em Chrome ou Edge.

## Publicação na VPS

A aplicação usa `output: "standalone"`, imagem Docker multi-stage e `docker compose`. O serviço publicado é `website`, exposto ao Traefik pela porta interna 3000.

Consulte [docs/vps-update.md](docs/vps-update.md) para o procedimento de atualização, smoke test e rollback.

# Nexus AI — website institucional

Site Next.js da Nexus AI, com experiências cinematográficas responsivas nas rotas Home, Soluções, Processo e Contato.

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

## Qualidade

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

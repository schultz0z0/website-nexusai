# Atualização da VPS

Este projeto é publicado de `/opt/prometeus-site` como container Next.js standalone. O `docker-compose.yml` define o projeto `prometeus-site`, o serviço `website`, o container `prometeus-website` e as labels usadas pelo Traefik para `agenciaprometeus.com.br` e `www.agenciaprometeus.com.br`.

O build injeta apenas IDs públicos (`NEXT_PUBLIC_*`) como argumentos; segredos de servidor não devem ser colocados nesses argumentos nem no bundle do navegador.

## Antes de acessar a VPS

1. Integre a branch aprovada em `main` e envie `main` ao GitHub.
2. Confirme localmente:

```bash
npm ci
npm run test:unit
npm run lint
npm run build
PLAYWRIGHT_USE_PRODUCTION_BUILD=1 npm run test:responsive -- --project=chromium --workers=4
```

3. Tenha o endereço SSH e o usuário da VPS; o checkout oficial fica em `/opt/prometeus-site`.

## Atualização

Conecte-se e entre no diretório do projeto:

```bash
ssh <usuario>@<ip-ou-host-da-vps>
cd /opt/prometeus-site
```

Confirme que não existem alterações locais na VPS:

```bash
git status --short
```

Se houver qualquer saída, pare e preserve essas alterações antes de atualizar. Com a árvore limpa:

```bash
git switch main
COMMIT_ANTERIOR="$(git rev-parse HEAD)"
printf "Commit anterior: %s\n" "$COMMIT_ANTERIOR"
git fetch origin
git pull --ff-only origin main
git rev-parse HEAD
docker compose config --quiet
docker compose build --pull website
docker compose up -d --no-deps website
```

Guarde `COMMIT_ANTERIOR` até concluir a validação. O SHA final mostrado por `git rev-parse HEAD` identifica exatamente a versão publicada.

## Verificação imediata

```bash
docker compose ps website
docker compose logs --tail=100 website
curl -fsS -o /dev/null -w "%{http_code}  /\n" https://agenciaprometeus.com.br/
curl -fsS -o /dev/null -w "%{http_code}  /solucoes\n" https://agenciaprometeus.com.br/solucoes
curl -fsS -o /dev/null -w "%{http_code}  /processo\n" https://agenciaprometeus.com.br/processo
curl -fsS -o /dev/null -w "%{http_code}  /contato\n" https://agenciaprometeus.com.br/contato
curl -fsSI https://www.agenciaprometeus.com.br/ | grep -i '^location: https://agenciaprometeus.com.br/'
curl -fsSI https://agenciaprometeus.com.br/ | grep -Ei 'strict-origin-when-cross-origin|nosniff|deny'
```

O esperado é o serviço `website` em estado `Up`, logs sem erro de inicialização e HTTP `200` nas quatro rotas. Depois, faça um hard refresh no navegador com `Ctrl+Shift+R` e repita o smoke responsivo descrito em `docs/responsive-desktop-matrix.md`.

## Rollback recuperável

Se a nova versão falhar, use o valor de `COMMIT_ANTERIOR` sem apagar histórico:

```bash
git switch --detach "$COMMIT_ANTERIOR"
docker compose build website
docker compose up -d --no-deps website
docker compose ps website
docker compose logs --tail=100 website
```

Quando a correção estiver pronta e integrada, volte para a linha principal e publique novamente:

```bash
git switch main
git pull --ff-only origin main
docker compose build --pull website
docker compose up -d --no-deps website
```

Não remova a imagem/container anterior nem execute limpeza de imagens antes de terminar a validação do deploy.

## Observações operacionais

- O Traefik continua como reverse proxy e termina TLS; a aplicação não deve ser exposta diretamente na internet pela porta 3000.
- O Dockerfile usa Node 22 Alpine e copia a saída `.next/standalone` para a imagem final.
- O formulário de Contato envia diretamente ao endpoint configurado do Google Forms e não depende de segredo de ambiente na VPS.
- A recriação do único container pode produzir uma janela curta de indisponibilidade. Para zero downtime real, seria necessário manter duas réplicas/imagens versionadas e fazer troca coordenada no proxy, o que não faz parte deste deploy.

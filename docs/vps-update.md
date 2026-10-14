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
for caminho in / /servicos /servicos/prometeus-copiloto /servicos/prometeus-rastro /servicos/prometeus-soft-phone /servicos/atendimento-ia-whatsapp /servicos/desenvolvimento-sob-medida /servicos/desenvolvimento-web /contato /privacidade /cookies; do
  codigo="$(curl -sS -o /dev/null -w '%{http_code}' "https://agenciaprometeus.com.br$caminho")" || break
  printf '%s %s\n' "$codigo" "$caminho"
  [ "$codigo" = "200" ] || break
done
curl -sSI https://agenciaprometeus.com.br/solucoes
curl -sSI https://agenciaprometeus.com.br/processo
curl -sSI https://agenciaprometeus.com.br/servicos/agentes-de-ia
curl -sSI https://agenciaprometeus.com.br/servicos/automacao-de-processos
curl -sSI https://agenciaprometeus.com.br/servicos/integracao-de-sistemas
curl -fsS -o /dev/null -w "%{http_code}  /sitemap.xml\n" https://agenciaprometeus.com.br/sitemap.xml
curl -fsS https://agenciaprometeus.com.br/indexnow.txt
curl -fsSI https://www.agenciaprometeus.com.br/ | grep -i '^location: https://agenciaprometeus.com.br/'
curl -fsSI https://agenciaprometeus.com.br/ | grep -Ei 'strict-origin-when-cross-origin|nosniff|deny'
```

O esperado é o serviço `website` em estado `Up`, logs sem erro de inicialização e todas as **11 linhas** do loop com `200`. Se o loop parar antes disso, investigue a URL que falhou. Os cinco endereços antigos devem retornar `301/308` e `Location` para a home ou a oferta substituta. Não espere `200` em `/servicos/agentes-de-ia`: essa página foi migrada para `/servicos/atendimento-ia-whatsapp`. O sitemap precisa retornar `200`, e a chave em `/indexnow.txt` deve corresponder ao arquivo `public/indexnow.txt` da versão publicada. Depois, faça um hard refresh no navegador e repita o smoke responsivo descrito em `docs/responsive-desktop-matrix.md`.

Após validar a publicação, siga `docs/search-production-release.md` e `SEARCH_ENGINE_SETUP.md` para executar a suíte contra o domínio público, enviar as URLs alteradas ao IndexNow e conferir as propriedades dos buscadores. A imagem inclui o CLI operacional em `scripts/indexnow.mts`; não envia URLs automaticamente no build ou na inicialização do container.

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

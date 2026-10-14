# Verificação da versão para main — 14/10/2026

Pedido do proprietário: integrar toda a entrega aprovada em main, enviar ao GitHub e conferir Compose/Dockerfile antes do deploy na VPS. Domínio: `https://agenciaprometeus.com.br`. Esta etapa não executa publicação na VPS nem inicia Docker Desktop.

## Microsoft Clarity

O layout raiz inclui `ConsentManager` em todas as páginas. A integração usa o projeto `yjrsmq8w37` após consentimento de Analytics, restaura a preferência e interrompe o rastreamento na revogação. O formulário de contato continua mascarado.

`tests/clarity.spec.ts` verifica as 11 páginas canônicas e o ciclo de consentimento, navegação, reload e revogação. O script remoto é substituído no teste: a verificação comprova a integração da aplicação, sem enviar gravações de QA à Microsoft. Bloqueadores, rejeição de consentimento e ID explicitamente vazio podem impedir gravações; o teste não comprova recebimento no painel privado do Clarity.

## Preparação da VPS

- `docker compose config --quiet`: aprovado com configuração padrão e `.env.example`, sem conectar a um Docker Engine.
- Modelo resolvido: projeto/container corretos, domínio HTTPS e www/redirect/Traefik coerentes, porta interna 3000 sem publicação direta, IDs públicos de build e Clarity corretos.
- Dockerfile: Node 22 Alpine, `npm ci`, lockfile coerente com os manifests, saída standalone e execução pelo usuário `nextjs`.
- Healthcheck usa o Node já existente, sem dependência adicional, e exige HTTP 200 na aplicação.
- Arquivos temporários, originais de geração, testes e documentação excluídos do contexto Docker; `.env*` permanece excluído.
- Roteiro da VPS aguarda saúde, preserva imagem anterior antes do build e descreve rollback sem reconstruir a imagem anterior.

## Verificação executada

- Build Next.js de produção: aprovado.
- Lint: aprovado.
- Testes unitários: 54 aprovados.
- Suíte Chromium no standalone de produção: 125 cenários passaram na execução completa; o novo teste com 11 navegações atingiu o limite padrão de 30 segundos sob execução paralela. O limite desse percurso foi ajustado para 90 segundos, com espera explícita pela primeira requisição antes de navegar.
- Reexecução dos dois cenários de Clarity no mesmo build de produção: 2 aprovados, incluindo todas as 11 páginas. Não houve alteração do código da aplicação após o build.
- Revisão independente do diff operacional: sem achados bloqueantes.

Um build de imagem Linux e o funcionamento no Docker Engine/Traefik da VPS ainda precisam ser confirmados durante o deploy. Os comandos de Compose acima validam a configuração, não substituem essa etapa. O estado público permanece anterior à entrega até a publicação. Siga `docs/vps-update.md`, depois `docs/search-production-release.md`.

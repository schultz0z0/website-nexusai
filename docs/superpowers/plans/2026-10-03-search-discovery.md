# Search Discovery Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Expandir conteúdo indexável e preparar descoberta em buscadores e respostas de IA.
**Architecture:** Catálogo tipado alimenta páginas estáticas, sitemap e llms.txt. Script operacional IndexNow usa chave pública e verifica sua publicação antes de avisar os buscadores.
**Tech Stack:** Next.js 16.2.11, React 19, TypeScript, Node.js 22, Playwright.
**Spec:** `docs/superpowers/specs/2026-10-03-search-discovery-design.md`.

## Global Constraints

- Preservar o domínio canônico `https://agenciaprometeus.com.br`, redirecionamentos legados, consentimento e identidade visual.
- Sem dependências adicionais, resultados comerciais inventados ou promessas de indexação.
- Não enviar URLs antes da publicação nem executar alterações autenticadas sem acesso do proprietário.

## Review Focus

- URL desconhecida deve retornar 404; parâmetros de rastreamento não mudam canonical.
- Conteúdo e links devem existir no HTML sem JavaScript e caber em viewport de 320px.
- Chave ausente/incorreta não permite submissão IndexNow; dry-run não acessa rede.
- URLs externas, credenciais, query strings e fragments não devem ser enviados.
- Erros de rede/429 não são anunciados como aceite; HTTP 202 é validação pendente.

## Tasks

### 1. Conteúdo e descoberta
Files: `src/lib/service-content.ts`, `src/lib/service-schema.ts`, `src/app/servicos/page.tsx`, `src/app/servicos/[slug]/page.tsx`, `src/components/service-detail.tsx`, `src/components/services.module.css`, `src/app/sitemap.ts`, `src/app/llms.txt/route.ts`, `src/components/site-footer.tsx`, `src/components/home/custom-capabilities.tsx`.
- [x] Atualizar cobertura esperada do sitemap e adicionar testes de datas estáveis e schemas.
- [x] Observar falha com implementação anterior.
- [x] Implementar catálogo, páginas, metadata, links e descoberta.
- [x] Confirmar testes e conteúdo inicial renderizado no servidor.

### 2. IndexNow
Files: `public/indexnow.txt`, `scripts/lib/indexnow.mts`, `scripts/indexnow.mts`, `package.json`, `Dockerfile`, `tests/indexnow.test.mts`.
- [x] Testar domínio, deduplicação, entradas inválidas, HTTP 200/202/429 e pré-verificação da chave com servidor local.
- [x] Observar falha com módulo ausente; implementar e confirmar sucesso.
- [x] Executar dry-run sem acesso externo. Copiar os arquivos necessários para a imagem Docker.

### 3. Guia e verificação
Files: `SEARCH_ENGINE_SETUP.md`, `README.md`, `tests/search-discovery.spec.ts`.
- [x] Escrever instruções concretas e verificáveis para publicação e contas externas.
- [x] Executar unitários, lint, build e Playwright de descoberta/SEO/redirecionamentos.
- [x] Revisar diff, conteúdo e screenshots; corrigir problemas materiais.

## Execution ledger

Histórico: implementação direta neste checkout na branch temporária `codex/search-discovery`, inicialmente sem commit ou publicação. Em seguida, o usuário autorizou registrar e integrar todas as mudanças em `main`, enviar ao remoto e remover branches temporárias. A publicação na VPS continua como etapa operacional separada.
Ruling: os pontos de aprovação adicionais das skills não interrompem o trabalho — autorização explícita do usuário cobre as melhorias propostas na resposta anterior.

Conteúdo: sitemap antes da implementação falhou por faltar as novas rotas; testes de catálogo e schemas passaram após implementação. IndexNow: módulo ausente antes da implementação; sete testes passaram depois, incluindo servidor HTTP local e bloqueio de chave não publicada. Dry-run da lista inicial executado sem requisição externa. Validação parcial: 46 unitários, lint e build passaram; cinco páginas novas geradas estaticamente.

Validação final: 46/46 unitários, lint e build passaram na versão final. Playwright: 20/20 testes de descoberta/SEO/redirecionamentos passaram contra a saída standalone de produção. Uma asserção inicial de 404 foi corrigida para aceitar e verificar todas as tags noindex emitidas pelo Next; a aplicação já retornava 404 corretamente. Screenshots de 320px e 1440px inspecionados; sem overflow ou problemas de leitura identificados. Revisão independente: nenhum achado acionável.

Regressão adicional do rodapé: 1/1 teste passou em três viewports. Total de navegador: 21 testes. Nenhuma submissão real, cadastro externo ou publicação foi executado. Imagem Docker preparada com o CLI; build de imagem e execução em VPS ficam para publicação conforme guia.

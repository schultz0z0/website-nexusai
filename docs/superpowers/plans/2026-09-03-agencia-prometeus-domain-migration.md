# Agência Prometeus Domain Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar o site com `agenciaprometeus.com.br` como domínio canônico e migrar seu único Compose para `/opt/prometeus-site`.

**Architecture:** A aplicação continuará em Next.js standalone atrás do Traefik. A mudança centraliza o domínio nos metadados e atualiza as labels do Compose; a VPS recebe um checkout novo e validado antes da retirada do projeto antigo.

**Tech Stack:** Next.js 16, TypeScript, Node.js 22, Playwright, Docker Compose, Traefik.

**Spec:** `docs/superpowers/specs/2026-09-03-agencia-prometeus-domain-migration-design.md`

## Global Constraints

- Não alterar DNS.
- Não tocar em nenhum Compose fora do site institucional.
- Trabalhar e publicar pela branch `main`.
- Usar `https://agenciaprometeus.com.br` como único domínio canônico.

---

### Task 1: Contrato automatizado de domínio

**Files:**
- Create: `tests/domain-migration.test.mts`
- Modify: `tests/seo-lgpd.test.mts`
- Modify: `tests/seo-lgpd.spec.ts`

- [x] Escrever asserções para o novo domínio, para o nome do Compose e para ausência do endereço legado.
- [x] Executar os testes e confirmar a falha causada pela configuração atual.

### Task 2: Configuração canônica e operacional

**Files:**
- Modify: `src/lib/site-metadata.ts`
- Modify: `src/lib/content.ts`
- Modify: `src/app/llms.txt/route.ts`
- Modify: `docker-compose.yml`
- Modify: documentação que contém o endereço anterior

- [x] Substituir o domínio em todas as superfícies textuais versionadas.
- [x] Definir `name: prometeus-site` no Compose e labels Traefik para raiz e `www`.
- [x] Executar testes unitários, lint, build e matriz Playwright de produção.

### Task 3: Publicação cirúrgica na VPS

**Files:**
- Create remotely: `/opt/prometeus-site`
- Remove after validation: `/opt/site-nexus`

- [x] Enviar o commit verificado para `main`.
- [x] Auditar o projeto atual e clonar o novo checkout.
- [x] Construir a imagem `prometeus-site-website` antes da troca.
- [x] Parar somente `site-nexus` e iniciar somente `prometeus-site`.
- [x] Validar o contêiner e a resposta HTTP interna com cabeçalhos Host do novo domínio.
- [x] Arquivar o Compose anterior e remover o checkout e a imagem antigos.
- [x] Confirmar pelo inventário da Hostinger que o projeto do site aparece apenas como `prometeus-site`.

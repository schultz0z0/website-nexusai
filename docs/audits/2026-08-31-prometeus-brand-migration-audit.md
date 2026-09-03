# Auditoria de migração de marca — Prometeus

Status: planejamento e validação local — nenhuma alteração de código foi executada neste documento.

Data: 31 de agosto de 2026  
Projeto: site institucional Next.js standalone  
Marca atual: Nexus AI  
Marca proposta: Prometeus  
Domínio mantido por enquanto: `https://solucoes-nexus.tech`

## 1. Decisão de linguagem recomendada

### Recomendação

Usar **Prometeus** sem artigo no logotipo, nos títulos curtos e nos nomes de produto. Na comunicação em frases completas, usar **a Prometeus**.

Exemplos:

- “A Prometeus transforma problemas operacionais em soluções sob medida.”
- “Converse com a Prometeus.”
- “Soluções da Prometeus para operações reais.”
- Marca no header: `Prometeus`.
- Nome de solução: `Prometeus Stock` ou `Stock, da Prometeus`.

### Por que “a Prometeus”

O negócio se apresenta como uma empresa/agência de soluções digitais sob demanda, e não como uma plataforma única ou um produto fechado. O artigo feminino reforça esse papel institucional e consultivo: uma equipe que entende o contexto, projeta e implementa.

“O Prometeus” soaria mais como um sistema, agente, produto ou personagem tecnológico. Pode funcionar para um produto específico, mas cria uma expectativa diferente da proposta principal da empresa.

Regra editorial: não forçar artigo em toda ocorrência. Em chamadas e títulos, “Prometeus” é mais limpo; em texto corrido, “a Prometeus” é a forma preferencial.

## 2. Decisões que precisam ser travadas antes da execução

- Nome público: `Prometeus` ou `Prometeus AI`.
- Capitalização oficial: recomenda-se `Prometeus`, sem caixa alta obrigatória.
- Descrição curta: por exemplo, “automação e IA sob medida para empresas”.
- Tratamento dos exemplos atuais:
  - opção A: `Prometeus Stock` e `Prometeus Copilot`;
  - opção B (recomendada): `Stock` e `Copilot`, apresentados como exemplos de soluções da Prometeus.
- Domínio: manter `solucoes-nexus.tech` nesta etapa. A migração para um domínio Prometeus fica para uma fase posterior, quando houver domínio escolhido e registrado.
- E-mail institucional definitivo.
- Logo horizontal, símbolo reduzido e favicon da Prometeus.
- Razão social, CNPJ, endereço, canal de privacidade e demais dados legais reais.

Sem essas decisões, não é seguro executar um replace global: o texto pode ficar inconsistente e a migração SEO pode ser feita duas vezes.

## 3. Inventário de impacto no repositório

O levantamento local encontrou aproximadamente 271 ocorrências relacionadas a Nexus, Nexus AI ou ao domínio antigo. Elas se dividem em camadas diferentes e não devem ser tratadas todas com a mesma regra.

### 3.1 Fonte central de marca e copy

- `src/lib/content.ts`
  - `COMPANY.name`, `legalName`, `description` e URL.
  - copy da home, FAQ, demonstrações e contato.
  - nomes “Nexus Stock” e “Nexus Copilot”.
- `src/lib/site-metadata.ts`
  - domínio canônico, title, description e imagem social.

### 3.2 Interface e acessibilidade

- `src/components/nexus-nav.tsx`
  - componente, aria-label, alt text e asset do wordmark.
- `src/components/site-footer.tsx`
  - logo, copyright e aria-label.
- `src/components/nexus-mark.tsx`
  - símbolo vetorial atual baseado na letra N.
- `src/app/apple-icon.tsx` e `src/app/icon.svg`
  - ícones/favicons atuais.
- `src/app/contato/contact-hero.tsx`
  - lettering “NEXUS” dentro do hero.
- Classes internas `nexus-*`
  - podem ser renomeadas por consistência, mas não são texto público.

### 3.3 SEO e descoberta

- metadata da home, contato, privacidade, cookies, processo, soluções e 404.
- `src/app/robots.ts` e `src/app/sitemap.ts`.
- `src/app/llms.txt/route.ts`.
- JSON-LD de `Organization`, `WebSite` e `ContactPage`.
- `public/og-image.svg` e `public/og-image.png`.
- titles e descrições usados por redes sociais e compartilhamentos.

### 3.4 Privacidade, consentimento e tracking

- `src/app/privacidade/page.tsx`.
- `src/app/cookies/page.tsx`.
- `src/lib/consent.ts`.
- Chave `nexus-cookie-consent`.
- Eventos e atributos técnicos `nexus:*` e `data-nexus-tracking`.

Recomendação: manter a chave de consentimento e os eventos técnicos durante a primeira migração. Eles são internos e mantê-los evita que visitantes antigos recebam o banner novamente sem necessidade.

### 3.5 Infraestrutura e domínio

- `docker-compose.yml`
  - nome do container;
  - routers e service labels do Traefik;
  - domínio apex e `www`;
  - redirect e headers.
- `Dockerfile`
  - não contém marca pública, mas deve continuar reproduzível.
- `docs/vps-update.md`
  - comandos de deploy, smoke tests e domínio.
- `.env.example`
  - IDs públicos e tokens de verificação, sem segredos.

### 3.6 Testes e documentação

- testes de brand/logo, metadata, sitemap, titles, redirects e conteúdo.
- `README.md`.
- `SEARCH_ENGINE_SETUP.md`.
- `SEO_LGPD_IMPLEMENTATION_REPORT.md`.
- `docs/design-system.*`, `docs/tech-design/*`, `docs/prd/*` e planos históricos.

Documentos históricos podem continuar mencionando Nexus quando servirem como registro de decisões anteriores. Documentação operacional ativa deve usar Prometeus.

## 4. Plano de execução seguro

### Fase 0 — pré-voo de marca

1. Confirmar o nome legal e a disponibilidade de uso da marca com apoio jurídico.
2. Confirmar domínio e e-mail definitivos.
3. Receber logo horizontal, símbolo e favicon em formatos adequados.
4. Definir se Stock/Copilot continuam como nomes de exemplo.
5. Registrar o texto institucional aprovado e a regra “a Prometeus”.

### Fase 1 — identidade visual

1. Substituir wordmark e alt text.
2. Recriar favicon, Apple icon e símbolo reduzido com a identidade Prometeus.
3. Atualizar OG image em PNG 1200×630.
4. Validar contraste, proporção e nitidez em 320 px, tablet e desktop ultrawide.

### Fase 2 — fonte de conteúdo

1. Atualizar `COMPANY` e o dicionário de copy.
2. Atualizar home, contato, FAQ, rodapé e textos legais.
3. Revisar cada ocorrência de artigo: “a Prometeus” em frases; “Prometeus” em títulos.
4. Remover a impressão de catálogo: os exemplos devem continuar descritos como demonstrações, não como portfólio de clientes.
5. Não inserir clientes, resultados ou provas sociais que não existam.

### Fase 3 — SEO e dados estruturados

1. Atualizar title, description, canonical, Open Graph, Twitter e JSON-LD.
2. Atualizar `robots.txt`, `sitemap.xml` e `llms.txt`.
3. Validar que nenhum canonical aponta para o domínio antigo.
4. Validar que a 404 continua com `noindex` e sem canonical indevido.
5. Testar JSON-LD em Rich Results Test e Schema Markup Validator.

### Fase 4 — domínio e VPS

Nesta etapa, o domínio `solucoes-nexus.tech` permanece ativo. A infraestrutura deve apenas continuar apontando para ele, enquanto a marca visível, metadata e copy passam a usar Prometeus.

Quando um domínio Prometeus for definido em uma fase posterior:

1. Criar DNS para apex e `www`.
2. Atualizar labels Traefik, TLS e redirect canônico.
3. Manter redirects 301 do domínio antigo para URLs equivalentes no novo domínio.
4. Atualizar sitemap, robots, OG URLs e links absolutos.
5. Configurar a propriedade nova no Google Search Console e Bing Webmaster Tools.
6. Monitorar erros 404, cobertura e perda de indexação.

Enquanto o domínio antigo for mantido, registrar a diferença entre marca e endereço como decisão consciente. Não criar redirects ou alterar canonical para um domínio ainda não escolhido.

### Fase 5 — serviços externos

- Google Forms: nome do formulário, e-mails de notificação e mensagens automáticas.
- E-mail institucional e caixa de privacidade.
- Google Analytics, GTM e Meta Pixel, somente com IDs reais e consentimento configurado.
- Search Console, Bing e eventual perfil comercial, usando dados reais.

### Fase 6 — validação local

Executar:

```bash
npm ci
npm run lint
npx tsc --noEmit
npm run test:unit
PLAYWRIGHT_USE_PRODUCTION_BUILD=1 npm run test:responsive -- --workers=1
npm run build
docker compose config
docker compose build website
```

Validar no navegador:

- 320×568, 390×844, 412×915;
- 768×1024;
- 1366×768, 1440×900;
- 1920×1080 e ultrawide até 3440×1440;
- reduced motion;
- rotas `/`, `/contato`, `/privacidade`, `/cookies`;
- 404 real;
- banner e modal de cookies;
- foco, teclado, labels e ausência de overflow horizontal.

### Fase 7 — publicação e pós-publicação

1. Fazer backup do estado atual e guardar o SHA publicado.
2. Publicar a imagem/container aprovado na VPS.
3. Executar smoke tests HTTP e verificar headers.
4. Conferir o domínio canônico, redirect `www` e OG image.
5. Rodar PageSpeed Insights e iniciar acompanhamento de Core Web Vitals.
6. Testar iPhone/Safari e Android/Chrome reais.

## 5. Critérios de aceite

A migração só deve ser considerada concluída quando:

- não houver Nexus visível em nenhuma rota pública, salvo menções históricas explicitamente marcadas;
- a logo e o favicon forem da Prometeus;
- o nome aparecer como Prometeus nos títulos e como “a Prometeus” no texto institucional;
- Stock/Copilot tiverem nomenclatura aprovada e não parecerem catálogo de produtos fechados;
- nenhum cliente, número, depoimento ou prova social for inventado;
- canonical, sitemap, robots, `llms.txt`, OG e JSON-LD usarem o domínio e a marca corretos;
- o domínio antigo, se substituído, responder com redirect 301 equivalente;
- políticas de privacidade e cookies refletirem a entidade correta;
- tracking permanecer condicionado ao consentimento e sem PII;
- lint, TypeScript, unit, Playwright, build e Docker passarem;
- QA visual for aprovado em mobile first, tablet, desktop baixo e ultrawide;
- Search Console/Bing e validação jurídica forem concluídos por pessoas com acesso às contas.

## 6. Apoio humano necessário

- aprovação final de naming e tom (“a Prometeus”);
- logo, símbolo e assets oficiais;
- decisão e compra/controle do domínio;
- acesso à VPS/DNS/Traefik;
- e-mail institucional e conta do formulário;
- IDs de analytics e tokens de verificação reais, se forem usados;
- dados jurídicos reais e revisão de privacidade/cookies;
- Search Console, Bing e validação de dados estruturados;
- teste em aparelhos físicos.

## 7. Estratégia de rollback

- manter o domínio antigo ativo durante a janela de transição;
- guardar a versão anterior do container e o SHA publicado;
- reverter o deploy sem apagar a imagem anterior;
- preservar a chave de consentimento local;
- se a troca de domínio apresentar perda de tráfego, restaurar temporariamente o host anterior enquanto os redirects são corrigidos.

## 8. Regra contra replace cego

Não executar `replace-all Nexus → Prometeus` sem revisão. Isso alteraria indiscriminadamente:

- nomes técnicos de componentes e eventos;
- caminhos de arquivos e testes;
- documentação histórica;
- chaves de consentimento;
- URLs que precisam de redirect, não de substituição;
- nomes de produto que talvez devam permanecer independentes da marca.

A execução correta deve partir de uma fonte central de conteúdo, substituir identidade visual e SEO de forma explícita e só depois atualizar documentação e testes.

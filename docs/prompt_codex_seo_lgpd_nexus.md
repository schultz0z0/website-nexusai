# Prompt para Codex — SEO técnico, indexação, analytics, LGPD e performance da Nexus AI

## Papel

Você é o engenheiro responsável por **auditar e implementar** SEO técnico, indexação, dados estruturados, analytics, consentimento/LGPD, performance e qualidade de publicação no site da Nexus AI.

Não entregue apenas recomendações. **Inspecione o repositório, implemente as mudanças cabíveis, teste e documente o que depende de credenciais/ações externas.**

---

# 1. Fonte da verdade e contexto

A **fonte da verdade do conteúdo e posicionamento** é o site publicado:

- Produção: `https://solucoes-nexus.tech/`

Rotas públicas atualmente conhecidas:

- `/`
- `/solucoes`
- `/processo`
- `/contato`
- `/privacidade`

Antes de alterar qualquer coisa:

1. Inspecione o repositório inteiro.
2. Identifique framework, versão, roteamento, estratégia de renderização, package manager e hosting/deploy.
3. Identifique como o `<head>`/metadata são implementados no framework atual.
4. Identifique o fluxo real do formulário de `/contato`, seu backend/API e tratamento de erros.
5. Identifique assets existentes, favicon, logo, fontes, imagens e design tokens.
6. Identifique scripts de terceiros já carregados.
7. Identifique se já existem `robots.txt`, `sitemap.xml`, metadata, JSON-LD, Analytics, GTM, Pixel, consent manager ou uma página 404.
8. Preserve o design, copy, animações e identidade visual atual. **Este trabalho não é um redesign.**

Se o repositório divergir do site publicado, preserve como referência de conteúdo o que estiver em produção, salvo quando a divergência for claramente um bug ou placeholder.

---

# 2. Regras obrigatórias

## 2.1 Não inventar dados

Nunca invente:

- CNPJ;
- razão social;
- endereço físico;
- telefone;
- encarregado/DPO;
- IDs de Google Analytics;
- GTM ID;
- Meta Pixel ID;
- tokens do Search Console;
- tokens do Bing Webmaster Tools;
- perfis sociais;
- avaliações, depoimentos ou cases;
- números de resultado;
- cookies que não foram realmente encontrados/implementados.

**Atenção importante:** o site publicado hoje exibe `CNPJ 00.000.000/0001-00`. Isso é placeholder e não deve continuar sendo apresentado como dado real. Se não houver CNPJ real configurado no projeto, remova o placeholder da interface e deixe a pendência documentada, sem inventar um número.

## 2.2 Não quebrar o site

- Não alterar a proposta comercial, arquitetura visual ou copy principal sem necessidade técnica.
- Não quebrar formulário, navegação, animações ou responsividade.
- Não substituir tecnologias/frameworks sem justificativa forte.
- Não adicionar bibliotecas pesadas quando a solução nativa do framework resolver.
- Não carregar scripts de terceiros sem necessidade.
- Não enviar PII ou conteúdo livre do formulário para ferramentas de analytics/pixel.

## 2.3 Privacidade primeiro

Por padrão, considere **cookies/scripts não essenciais desativados** até a escolha do usuário.

Analytics e publicidade devem respeitar o mecanismo de consentimento descrito neste documento.

---

# 3. Resultado esperado

Ao final, o projeto deve possuir, no mínimo:

1. Página 404 real e adequada.
2. Metadata SEO específica para cada rota pública.
3. Open Graph e Twitter/X Cards.
4. Canonical URLs.
5. Mapeamento semântico de palavras-chave por página.
6. JSON-LD válido e coerente com o conteúdo real.
7. `robots.txt` válido.
8. `sitemap.xml` válido.
9. `llms.txt` válido e conservador.
10. Preparação para Google Search Console.
11. Preparação para Bing Webmaster Tools.
12. Checklist para Google Business Profile, se a empresa for elegível.
13. GA4/GTM preparado corretamente.
14. Meta Pixel preparado corretamente.
15. Consentimento de cookies compatível com boas práticas da LGPD.
16. Política de Privacidade revisada para refletir o tratamento real.
17. Política de Cookies específica.
18. Tracking dos principais eventos do funil no site.
19. Testes de responsividade.
20. Auditoria de performance/Lighthouse/PageSpeed.
21. Relatório final com tudo que foi implementado e tudo que depende de acesso externo.

---

# 4. Auditoria inicial obrigatória

Antes de implementar, gere uma tabela interna com:

| Item | Estado atual | Ação necessária |
|---|---|---|
| title por rota |  |  |
| meta description |  |  |
| canonical |  |  |
| Open Graph |  |  |
| Twitter Card |  |  |
| favicon |  |  |
| robots.txt |  |  |
| sitemap.xml |  |  |
| llms.txt |  |  |
| JSON-LD |  |  |
| 404 |  |  |
| GA4 |  |  |
| GTM |  |  |
| Meta Pixel |  |  |
| banner de cookies |  |  |
| política de privacidade |  |  |
| política de cookies |  |  |
| formulário |  |  |
| UTMs |  |  |
| responsividade |  |  |
| Lighthouse |  |  |
| Core Web Vitals |  |  |

Não pare na auditoria: use-a para orientar a implementação.

---

# 5. Página 404

Criar uma página 404 consistente com o design da Nexus.

## Requisitos

- Retornar **HTTP 404 real** para URLs inexistentes sempre que a arquitetura/hosting permitir.
- Não fazer redirect automático de URL inexistente para `/`.
- Usar título: `Página não encontrada | Nexus AI`.
- Incluir `noindex, follow`.
- Manter navegação principal.
- Ter CTA para voltar ao início.
- Opcionalmente oferecer links para:
  - Soluções;
  - Processo;
  - Contato.
- Ser responsiva e acessível.
- Não incluir a rota 404 no sitemap.

## Teste

Validar uma URL inexistente, por exemplo:

`/teste-404-nexus-que-nao-existe`

Confirmar:

- status HTTP correto;
- layout correto;
- `noindex`;
- nenhum erro de console.

---

# 6. SEO on-page e metadata

Implementar metadata **por rota**, usando a API nativa do framework sempre que possível.

Cada página pública deve ter:

- `<title>` único;
- `<meta name="description">` única;
- canonical absoluta HTTPS;
- `meta robots` apropriada;
- Open Graph;
- Twitter/X Card;
- URL correta;
- imagem social válida;
- `og:locale="pt_BR"`;
- nome do site/marca consistente;
- favicon/ícones adequados;
- `lang="pt-BR"` no documento por acessibilidade e semântica.

Evite gerar metadata exclusivamente depois do carregamento via JavaScript quando o framework permitir renderização no HTML inicial.

## 6.1 Sugestões de títulos e descriptions

Use o conteúdo publicado como fonte da verdade. Audite os textos abaixo e aplique-os se continuarem coerentes com a página real.

### Home `/`

**Title sugerido**

`Nexus AI | Automação e IA sob medida para empresas`

**Description sugerida**

`Automações, agentes de IA e integrações sob medida para reduzir tarefas repetitivas, conectar processos e ampliar a capacidade da sua equipe.`

### Soluções `/solucoes`

**Title sugerido**

`Soluções de IA e automação sob medida | Nexus AI`

**Description sugerida**

`Conheça soluções de IA para atendimento, marketing, vendas, estoque, análise de dados, integração de sistemas e operações internas.`

### Processo `/processo`

**Title sugerido**

`Processo de implementação de IA | Nexus AI`

**Description sugerida**

`Do diagnóstico à implementação e ao suporte contínuo: veja como a Nexus mapeia gargalos, define escopo e coloca soluções de IA em produção.`

### Contato `/contato`

**Title sugerido**

`Diagnóstico de automação com IA | Nexus AI`

**Description sugerida**

`Conte onde sua operação perde tempo. A Nexus analisa o contexto e organiza o próximo passo para um diagnóstico de automação com IA.`

### Privacidade `/privacidade`

**Title sugerido**

`Política de Privacidade | Nexus AI`

**Description sugerida**

`Saiba como a Nexus AI coleta, utiliza, protege e trata dados pessoais enviados pelo site, incluindo seus direitos previstos na LGPD.`

### Cookies `/cookies`

**Title sugerido**

`Política de Cookies | Nexus AI`

**Description sugerida**

`Entenda quais cookies e tecnologias de rastreamento podem ser utilizados pela Nexus AI e como gerenciar suas preferências.`

---

# 7. Palavras-chave: implementar semanticamente, não com meta keywords

O objetivo é trabalhar as palavras-chave do negócio no conteúdo, títulos, headings, links internos e contexto semântico.

**Não use `<meta name="keywords">` como estratégia de SEO. O Google ignora essa meta tag.**

Não fazer keyword stuffing.

## Mapa inicial de intenção

### Home

Prioridade:

- automação com IA;
- soluções de IA para empresas;
- automação de processos;
- agentes de IA;
- IA aplicada a negócios.

### Soluções

Prioridade:

- automação empresarial;
- chatbot para empresas;
- agente de IA para atendimento;
- automação de marketing e vendas;
- controle de estoque com IA;
- análise de dados com IA;
- integração de sistemas;
- automação de operações.

### Processo

Prioridade:

- implementação de IA;
- diagnóstico de automação;
- consultoria de automação com IA;
- projeto de IA sob medida;
- integração de IA em empresas.

### Contato

Prioridade:

- diagnóstico de automação com IA;
- consultoria de IA para empresas;
- automação sob medida.

## Regras

- Uma intenção principal por página.
- O H1 deve refletir o assunto real da página.
- Keywords devem surgir de forma natural no corpo.
- Links internos devem usar âncoras descritivas quando fizer sentido.
- Não alterar frases fortes da marca apenas para repetir keyword.
- Não criar páginas artificiais/doorway pages.

---

# 8. Open Graph e compartilhamento social

Adicionar metadata Open Graph em todas as páginas relevantes:

- `og:title`
- `og:description`
- `og:type=website`
- `og:url`
- `og:image`
- `og:image:width`
- `og:image:height`
- `og:image:alt`
- `og:site_name`
- `og:locale=pt_BR`

Adicionar Twitter/X Card:

- `twitter:card=summary_large_image`
- `twitter:title`
- `twitter:description`
- `twitter:image`
- `twitter:image:alt`

## Imagem OG

- Preferência: 1200×630.
- Usar asset real da marca já presente no repositório.
- Se não existir imagem social adequada, criar uma composição simples usando **somente** identidade/logo/assets existentes no projeto.
- Não inventar nova identidade visual.
- A URL da imagem precisa ser absoluta e publicamente acessível.

---

# 9. Canonical e URLs

Definir um padrão canônico único para todas as rotas públicas.

Base:

`https://solucoes-nexus.tech`

Requisitos:

- canonical absoluta;
- HTTPS;
- evitar duplicidade com slash final versus sem slash;
- evitar duplicidade por parâmetros UTM;
- páginas com UTM devem continuar apontando canonical para a URL limpa;
- sitemap deve conter apenas URLs canônicas;
- redirects permanentes coerentes entre versões duplicadas, se aplicável.

---

# 10. JSON-LD / dados estruturados

Implementar JSON-LD validado e **sem inventar dados**.

## 10.1 Home

Adicionar, quando aplicável:

- `Organization`;
- `WebSite`.

Campos possíveis do `Organization`, somente quando verdadeiros:

- `@type`;
- `name`;
- `url`;
- `logo`;
- `description`;
- `email`;
- `sameAs` apenas para perfis sociais reais fornecidos/configurados;
- `address` somente se houver endereço comercial real que possa ser publicado;
- `contactPoint` somente com dados reais.

**Não usar `LocalBusiness` com endereço fictício.** Só utilizar subtipo local se a empresa realmente for elegível, possuir dados adequados e fizer sentido para o modelo de atendimento.

## 10.2 `/solucoes`

Usar `Service` apenas quando a marcação representar corretamente os serviços realmente descritos na página.

Não criar avaliações, preço, aggregateRating ou ofertas falsas.

## 10.3 Breadcrumbs

Se o design/navegação comportar breadcrumb real, considerar `BreadcrumbList` nas páginas internas.

Não criar breadcrumb apenas invisível para SEO se não fizer sentido na experiência.

## 10.4 Validação

Validar com:

- Google Rich Results Test quando aplicável;
- Schema.org Validator;
- inspeção do HTML final.

JSON-LD deve estar serializado com segurança e não pode receber conteúdo livre do usuário.

---

# 11. robots.txt

Criar/ajustar:

`https://solucoes-nexus.tech/robots.txt`

Objetivo:

- permitir rastreamento das páginas públicas;
- não bloquear CSS, JS ou assets necessários à renderização;
- bloquear somente rotas internas/técnicas sem valor de indexação, se elas realmente existirem;
- não usar robots.txt como substituto de autenticação ou segurança;
- incluir a localização do sitemap.

Base mínima esperada, adaptando ao framework:

```txt
User-agent: *
Allow: /

Sitemap: https://solucoes-nexus.tech/sitemap.xml
```

Se existirem rotas administrativas, preview, endpoints ou páginas privadas publicamente expostas, trate cada caso corretamente. Para páginas HTML que não devem aparecer no Google, prefira `noindex` quando apropriado.

Validar sintaxe após a implementação.

---

# 12. sitemap.xml

Criar sitemap XML no root:

`https://solucoes-nexus.tech/sitemap.xml`

Deve conter somente páginas:

- públicas;
- indexáveis;
- canônicas;
- retornando HTTP 200.

Incluir no mínimo, se continuarem públicas:

- `https://solucoes-nexus.tech/`
- `https://solucoes-nexus.tech/solucoes`
- `https://solucoes-nexus.tech/processo`
- `https://solucoes-nexus.tech/contato`
- `https://solucoes-nexus.tech/privacidade`
- `https://solucoes-nexus.tech/cookies`

Não incluir:

- 404;
- endpoints de API;
- rotas de build;
- páginas `noindex`;
- URLs com UTMs;
- parâmetros de tracking;
- duplicatas.

Use geração nativa/dinâmica do framework se isso reduzir manutenção.

`lastmod` só deve ser usado se refletir uma data confiável.

Não invente `changefreq`/`priority` achando que isso melhorará ranking.

Adicionar referência no `robots.txt`.

---

# 13. llms.txt

Criar:

`https://solucoes-nexus.tech/llms.txt`

Observação: `llms.txt` ainda é uma proposta/convenção emergente, não um fator garantido de SEO. Implementar porque foi solicitado, sem tratá-lo como substituto de sitemap, robots, HTML semântico ou dados estruturados.

O arquivo deve:

- ser texto/Markdown simples;
- estar disponível sem autenticação;
- não conter segredos;
- não conter prompts internos;
- não conter informações não públicas;
- não contradizer o site;
- apontar apenas para páginas canônicas reais.

Estrutura sugerida:

```md
# Nexus AI

> A Nexus AI desenvolve automações, agentes de IA, integrações e soluções sob medida para reduzir trabalho repetitivo e ampliar a capacidade operacional de empresas.

## Site

- [Início](https://solucoes-nexus.tech/): visão geral da proposta da Nexus AI.
- [Soluções](https://solucoes-nexus.tech/solucoes): áreas e exemplos de aplicação de IA e automação.
- [Processo](https://solucoes-nexus.tech/processo): diagnóstico, proposta, implementação e suporte.
- [Contato](https://solucoes-nexus.tech/contato): solicitação de diagnóstico inicial.

## Legal

- [Política de Privacidade](https://solucoes-nexus.tech/privacidade)
- [Política de Cookies](https://solucoes-nexus.tech/cookies)
```

Antes de publicar, ajuste o texto para refletir exatamente o site no momento da implementação.

---

# 14. Google Search Console

O código deve ficar preparado para verificação, mas **não invente token** e não finja que a propriedade foi verificada sem acesso à conta.

## Preferência

Para propriedade de domínio, documentar como opção principal a verificação via DNS/TXT, pois cobre o domínio e variações.

## Alternativa via meta tag

Se o responsável optar por verificação HTML, dar suporte a variável de ambiente, por exemplo:

```env
PUBLIC_GOOGLE_SITE_VERIFICATION=
```

ou equivalente correto para o framework.

Gerar a tag somente quando o valor existir:

```html
<meta name="google-site-verification" content="...">
```

Nunca commitar token real se o projeto não usar variáveis apropriadas.

## Documentar passo manual

Criar `SEARCH_ENGINE_SETUP.md` com:

1. Criar/adicionar propriedade `solucoes-nexus.tech` no Google Search Console.
2. Preferir propriedade de domínio e verificar via DNS TXT.
3. Confirmar HTTPS/canonical.
4. Enviar `https://solucoes-nexus.tech/sitemap.xml`.
5. Inspecionar as URLs principais.
6. Solicitar indexação após o deploy quando necessário.
7. Acompanhar:
   - páginas indexadas;
   - erros de rastreamento;
   - consultas;
   - impressões;
   - CTR;
   - posição média;
   - Core Web Vitals.

Não declarar que o site foi "aplicado no Search Console" se o Codex não possuir sessão/autorização para fazer isso.

---

# 15. Bing Webmaster Tools

Preparar o site e documentar a ação externa.

Dar suporte opcional a token de verificação do Bing, sem valor fake:

```env
PUBLIC_BING_SITE_VERIFICATION=
```

Quando configurado, renderizar a verificação adequada, por exemplo `msvalidate.01`, conforme o método escolhido no Bing.

No `SEARCH_ENGINE_SETUP.md`, documentar:

1. Adicionar/importar `solucoes-nexus.tech` no Bing Webmaster Tools.
2. Verificar propriedade.
3. Enviar `https://solucoes-nexus.tech/sitemap.xml`.
4. Confirmar que o sitemap também está referenciado no `robots.txt`.
5. Monitorar crawl/indexação.

Se o Bing oferecer importação a partir do Search Console no momento da execução, documentar essa alternativa.

IndexNow pode ser citado como melhoria futura, mas **não é requisito obrigatório desta tarefa** e não deve adicionar complexidade sem necessidade.

---

# 16. Google Business Profile / "Google Meu Negócio"

Esta etapa é majoritariamente externa ao código.

No relatório, incluir checklist:

- verificar se a Nexus é elegível a um Google Business Profile;
- criar/reivindicar o perfil somente com dados comerciais reais;
- conectar o domínio oficial;
- manter nome, categoria, telefone/endereço/área de atendimento e horário coerentes com a operação real;
- não publicar endereço fictício apenas para SEO;
- não criar marcação `LocalBusiness` que contradiga o perfil real.

Se não houver local elegível ou informações suficientes, documentar como pendência e não inventar nada.

---

# 17. Analytics, GTM e camada de tracking

Objetivo: acompanhar tráfego e conversões sem comprometer LGPD.

## 17.1 Arquitetura preferencial

Preferir **Google Tag Manager** como camada de gerenciamento de tags se isso se encaixar no projeto, pois teremos:

- GA4;
- campanhas Google;
- Meta Pixel;
- eventos de conversão;
- consentimento.

Porém, não force GTM se o projeto já tiver uma arquitetura direta consistente e mais simples.

Suportar IDs via variável de ambiente/configuração, sem valores falsos:

```env
PUBLIC_GTM_ID=
PUBLIC_GA4_MEASUREMENT_ID=
PUBLIC_META_PIXEL_ID=
PUBLIC_GOOGLE_SITE_VERIFICATION=
PUBLIC_BING_SITE_VERIFICATION=
```

Ajuste os nomes ao framework, por exemplo `NEXT_PUBLIC_*`, `VITE_*`, etc.

Atualizar `.env.example` sem secrets.

## 17.2 Consentimento antes de tracking

Por padrão:

- Analytics: negado/desativado.
- Ads/Marketing: negado/desativado.
- Meta Pixel: não carregar.

Somente carregar/ativar tags de acordo com a escolha do usuário.

Para Google, se usar Consent Mode, adotar implementação conservadora e compatível com o mecanismo de consentimento do site.

Preferência para este projeto: **modo básico/conservador**, impedindo tags não essenciais antes da autorização correspondente.

## 17.3 Eventos

Implementar uma camada central de eventos, evitando chamadas espalhadas pelo código.

Exemplo de interface:

```ts
trackEvent(name, params)
```

Instrumentar, quando existirem na jornada:

### `cta_click`

Disparar no clique em CTAs relevantes.

Parâmetros sugeridos:

- `cta_id`
- `cta_text`
- `page_path`
- `destination`

Não enviar email, nome, empresa, mensagem ou qualquer PII.

### `form_start`

Disparar uma única vez quando o usuário começar a interagir com o formulário de contato.

### `form_submit`

Disparar no envio técnico do formulário.

### `lead_captured`

Disparar **somente após confirmação real de sucesso do backend**.

Não contar clique no botão como lead.

### Outros eventos

Se já existirem no produto/jornada e forem mensuráveis no site, manter compatibilidade com:

- `conversation_started`
- `lead_qualified`
- `diagnostic_scheduled`
- `diagnostic_completed`
- `pilot_proposed`

Não simular eventos que acontecem fora do site sem integração real.

## 17.4 Meta Pixel

Após consentimento de Marketing/Publicidade:

- carregar Pixel;
- `PageView` somente quando permitido;
- evento `Lead` somente após sucesso real do formulário, se isso estiver de acordo com a configuração de mídia;
- não enviar texto livre do formulário;
- não enviar dados sensíveis;
- não enviar PII bruta em parâmetros de evento.

## 17.5 GA4

Após consentimento de Analytics:

- page views;
- origem/mídia/campanha;
- eventos definidos acima;
- navegação SPA corretamente tratada, se for SPA;
- evitar duplicação de pageviews/eventos.

Testar em DebugView/Tag Assistant quando IDs reais forem fornecidos.

---

# 18. UTMs e atribuição

O site receberá tráfego orgânico e campanhas pagas.

Padrão desejado:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term` quando aplicável

Requisitos:

- analytics deve capturar UTMs quando consentido;
- canonical nunca deve incluir UTM;
- URLs com UTM não devem gerar páginas duplicadas;
- se o formulário já comportar campos ocultos de atribuição, preservar a origem de forma compatível com a política/consentimento;
- não incluir UTMs no sitemap;
- não vazar parâmetros em logs desnecessários.

Se for necessário persistir atribuição entre páginas, faça isso somente dentro da arquitetura de consentimento definida e documente o comportamento.

---

# 19. Banner de cookies e LGPD

Implementar um mecanismo de consentimento claro, acessível e sem dark patterns.

## 19.1 Primeiro nível

Na primeira visita, exibir banner com, no mínimo:

- breve explicação;
- link para Política de Cookies;
- botão `Aceitar todos`;
- botão `Rejeitar não necessários`;
- botão `Gerenciar cookies`.

Os botões de rejeitar/gerenciar não podem ser escondidos de forma enganosa.

Cookies não necessários devem estar **desativados por padrão**.

A recusa não pode bloquear o acesso ao conteúdo normal do site.

## 19.2 Segundo nível / preferências

Categorias mínimas:

### Necessários

- sempre ativos;
- apenas o que for necessário para funcionamento/segurança/preferência de consentimento.

### Analytics

Exemplos:

- GA4;
- métricas de navegação.

Default: OFF.

### Marketing/Publicidade

Exemplos:

- Meta Pixel;
- Google Ads/remarketing, se vier a existir.

Default: OFF.

Adicionar categoria funcional somente se houver tecnologia real que justifique.

## 19.3 Preferência persistente

Guardar de forma enxuta:

- versão da política/consentimento;
- categorias escolhidas;
- data/hora quando tecnicamente adequado.

Preferir armazenamento first-party.

Não enviar a preferência para um serviço externo sem necessidade.

## 19.4 Revogação

Adicionar no footer link persistente:

`Preferências de cookies`

Ao clicar, reabrir o painel.

Ao revogar:

- impedir novos carregamentos de tags não permitidas;
- atualizar o estado de consentimento;
- remover cookies próprios conhecidos criados pelo mecanismo quando tecnicamente possível;
- documentar limitações sobre cookies de terceiros já existentes.

## 19.5 Acessibilidade

- foco correto;
- navegação por teclado;
- `aria` quando necessário;
- contraste adequado;
- modal não pode prender o usuário indevidamente;
- ESC/fechamento conforme o fluxo escolhido, sem interpretar fechamento como consentimento.

---

# 20. Política de Privacidade

A página atual `/privacidade` precisa ser revisada para refletir o tratamento real após Analytics/Pixel.

Hoje, o site informa que não compartilha dados com terceiros para marketing/publicidade. **Essa afirmação não pode permanecer com a mesma redação se Meta Pixel ou outras tecnologias publicitárias forem efetivamente ativadas**, pois a política deve explicar os terceiros envolvidos e as respectivas finalidades.

Não transforme o texto em aconselhamento jurídico absoluto. A implementação deve ser tecnicamente transparente e o relatório deve recomendar revisão jurídica final antes de mídia paga em escala.

## Conteúdo mínimo a revisar/incluir

### 20.1 Controlador

- nome empresarial real, se disponível;
- domínio/site;
- canal de contato de privacidade;
- CNPJ somente se real;
- encarregado/DPO somente se realmente designado e aplicável.

Nunca usar placeholder.

### 20.2 Dados fornecidos pelo usuário

Com base no formulário real de `/contato`, documentar apenas campos existentes, por exemplo:

- nome;
- email;
- empresa;
- cargo;
- setor;
- contexto/gargalo informado.

Se o formulário mudar, atualizar a política.

### 20.3 Dados técnicos e de navegação

Quando realmente coletados:

- endereço IP em logs/infraestrutura;
- user agent/dispositivo/navegador;
- páginas acessadas;
- referenciador;
- UTMs;
- eventos de interação;
- identificadores/cookies de analytics;
- identificadores publicitários/pixel após consentimento.

### 20.4 Finalidades

Separar claramente finalidades, como:

- responder solicitação/diagnóstico;
- preparar contato comercial solicitado;
- segurança e prevenção de abuso;
- operação técnica;
- métricas de uso;
- otimização do site;
- mensuração de campanhas;
- remarketing/publicidade, somente se realmente utilizado e com base jurídica adequada.

### 20.5 Base legal

Não aplicar uma única base legal genérica para tudo.

Mapear cada finalidade à hipótese aplicável após revisar o fluxo real. Quando o tratamento depender de consentimento, garantir revogação.

### 20.6 Compartilhamento/operadores

Descrever categorias de prestadores realmente utilizados, por exemplo:

- hospedagem/infraestrutura;
- serviço de envio/processamento do formulário;
- Google, se GA/GTM/Ads ativos;
- Meta, se Pixel ativo;
- CRM/email, se integrado no projeto.

Não listar fornecedor que não existe.

Não afirmar "nunca compartilhamos com terceiros" se ferramentas de terceiros processarem dados.

### 20.7 Transferência internacional

Se algum fornecedor processar dados fora do Brasil, refletir isso de modo coerente com a operação real e a legislação aplicável.

### 20.8 Retenção

Informar critérios/prazos de retenção de forma realista.

Não inventar prazo que o sistema não cumpre.

Se não houver política definida, documentar a pendência e propor configuração operacional antes de publicar prazo rígido.

### 20.9 Direitos do titular

Cobrir, conforme aplicável, direitos previstos na LGPD, incluindo:

- confirmação;
- acesso;
- correção;
- anonimização/bloqueio/eliminação quando cabível;
- portabilidade quando aplicável;
- informação sobre compartilhamento;
- revogação do consentimento;
- oposição nos casos previstos;
- peticionamento perante a ANPD quando cabível.

### 20.10 Data de atualização

Atualizar automaticamente ou manualmente com a data real da revisão.

---

# 21. Política de Cookies

Criar rota pública:

`/cookies`

Adicionar link no footer.

Conteúdo mínimo:

1. O que são cookies/tecnologias semelhantes.
2. Categorias utilizadas.
3. Quais são necessários e quais dependem de escolha.
4. Finalidade de cada categoria.
5. Fornecedor.
6. Nome do cookie quando conhecido.
7. Duração quando conhecida.
8. Como alterar/revogar preferências.
9. Relação com a Política de Privacidade.
10. Data da última atualização.

A lista de cookies precisa refletir o ambiente real após a implementação.

Se um identificador exato variar por propriedade/configuração, documentar isso corretamente sem inventar.

---

# 22. Formulário e privacidade por design

Auditar `/contato`.

Requisitos:

- coletar somente dados necessários;
- labels associados aos inputs;
- indicação clara de obrigatórios;
- mensagens de erro acessíveis;
- consentimento comercial/marketing separado do simples pedido de contato, caso newsletters/campanhas futuras exijam consentimento específico;
- não criar checkbox genérico obrigatório de "aceito tudo" para permitir o contato;
- link visível para Política de Privacidade;
- se houver checkbox de ciência/consentimento, texto específico sobre a finalidade real;
- não enviar campo de mensagem a GA4/Meta/GTM;
- não registrar PII em console de produção;
- sucesso do formulário deve ser confirmado pelo backend antes do evento `lead_captured`.

Se houver proteção anti-spam/captcha, verificar impacto de privacidade e consentimento antes de adicionar terceiros.

---

# 23. Performance e PageSpeed

Auditar **desktop e mobile**, antes e depois.

Usar:

- Lighthouse;
- PageSpeed Insights na produção após deploy;
- DevTools Performance/Network quando necessário.

## Metas de qualidade

Tratar como objetivo, não como motivo para quebrar funcionalidade:

- Performance: ideal >= 90 em mobile e desktop;
- Accessibility: >= 95;
- Best Practices: >= 95;
- SEO: ideal 100.

Core Web Vitals alvo:

- LCP <= 2.5s;
- INP <= 200ms;
- CLS <= 0.1.

## Investigar principalmente

- imagens grandes;
- imagens sem dimensões;
- formatos inadequados;
- fontes externas;
- JavaScript inicial excessivo;
- animações pesadas;
- CSS bloqueante;
- third-party scripts;
- bundle duplicado;
- hydration excessiva;
- componentes client-side que poderiam ser estáticos/server;
- recursos sem cache;
- layout shift;
- preloads desnecessários;
- requests para trackers antes do consentimento.

## Otimizações possíveis

Aplicar somente quando fizer sentido:

- AVIF/WebP;
- width/height ou `aspect-ratio` para imagens;
- lazy loading abaixo da dobra;
- preload apenas de recurso crítico;
- self-host/subset de fontes quando adequado;
- `font-display` apropriado;
- code splitting;
- dynamic import;
- redução de dependências;
- tree-shaking;
- minificação;
- cache headers;
- compressão;
- `preconnect` apenas quando necessário e consentido;
- adiar scripts de analytics/marketing até consentimento.

Não remover efeitos visuais importantes sem antes tentar otimização técnica.

## Relatório

Registrar:

- baseline;
- resultado final;
- principais gargalos;
- melhorias aplicadas;
- pontos que dependem do hosting/CDN.

---

# 24. Responsividade em celular real

Codex não pode assumir que emulação equivale a celular real.

Faça duas camadas de QA:

## 24.1 Automática/emulada

Testar pelo menos:

- 320×568;
- 360×800;
- 375×812;
- 390×844;
- 412×915;
- 768×1024;
- desktop 1366×768;
- desktop 1440×900.

Validar:

- sem overflow horizontal;
- menu utilizável;
- CTAs clicáveis;
- fonte legível;
- formulário sem zoom/layout quebrado;
- teclado virtual não destrói o fluxo;
- modais de cookies não cobrem controles essenciais;
- animações não causam scroll horizontal;
- tabelas/cards se adaptam;
- targets de toque adequados.

## 24.2 Checklist manual para aparelho físico

Adicionar ao relatório uma seção para testar após deploy em pelo menos:

- um iPhone/Safari real;
- um Android/Chrome real.

Checklist:

- carregamento inicial;
- menu;
- scroll;
- CTAs;
- formulário;
- teclado;
- banner de cookies;
- rejeitar/aceitar/reabrir preferências;
- rotação;
- links externos/email;
- ausência de console/layout perceptivelmente quebrado.

---

# 25. Acessibilidade básica que impacta qualidade/SEO

Sem redesenhar, corrigir problemas evidentes:

- um H1 principal por página quando adequado;
- hierarquia H2/H3 coerente;
- landmarks (`header`, `nav`, `main`, `footer`);
- alt text útil para imagens de conteúdo;
- alt vazio para imagens decorativas;
- labels de formulário;
- foco visível;
- navegação por teclado;
- contraste;
- `aria-expanded` em acordeões/menu;
- `prefers-reduced-motion` quando as animações atuais exigirem.

---

# 26. Segurança e tracking

Requisitos mínimos:

- nenhuma chave privada no bundle frontend;
- IDs públicos de analytics podem ser públicos, secrets não;
- não registrar dados do formulário em analytics;
- não interpolar conteúdo do usuário em JSON-LD;
- sanitizar dados onde aplicável;
- evitar `dangerouslySetInnerHTML` desnecessário;
- se JSON-LD exigir HTML bruto no framework, serializar de forma segura;
- auditar headers básicos de segurança do hosting quando possível;
- não usar robots.txt como proteção de endpoints sensíveis.

---

# 27. Validação técnica após implementação

Executar os comandos adequados ao projeto.

No mínimo:

1. instalar dependências pelo package manager já utilizado;
2. lint;
3. typecheck, se existir;
4. testes, se existirem;
5. build de produção;
6. servir/buildar localmente;
7. verificar cada rota;
8. verificar 404;
9. verificar metadata no HTML final;
10. verificar canonical;
11. verificar JSON-LD;
12. verificar `robots.txt`;
13. verificar `sitemap.xml`;
14. verificar `llms.txt`;
15. testar banner de cookies nos três fluxos:
   - aceitar tudo;
   - rejeitar não necessários;
   - escolher categorias;
16. testar revogação/reabertura;
17. confirmar que trackers não carregam antes de consentimento;
18. confirmar formulário;
19. rodar Lighthouse mobile;
20. rodar Lighthouse desktop.

Se houver Playwright/Cypress no projeto, adicionar testes E2E relevantes. Se não houver, não adicionar uma stack enorme apenas para esta tarefa sem necessidade.

---

# 28. Testes específicos de consentimento

Use Network/DevTools ou automação para comprovar:

## Estado inicial / sem interação

- nenhum request de GA4 que dependa de Analytics;
- nenhum Meta Pixel;
- nenhum cookie de marketing;
- apenas cookies/storage estritamente necessários.

## Rejeitar não necessários

- site continua funcionando;
- GA4/Pixel permanecem desativados conforme a arquitetura definida;
- preferência persiste.

## Aceitar Analytics apenas

- GA4 pode carregar;
- Meta Pixel não carrega;
- eventos GA4 funcionam.

## Aceitar Marketing

- Meta Pixel pode carregar;
- tags de Ads podem carregar se configuradas;
- consent state é atualizado.

## Revogar

- novas coletas cessam;
- preferência é atualizada;
- UI reflete o estado atual.

---

# 29. Arquivos/documentação a entregar

Além das alterações de código, gerar:

## `SEO_LGPD_IMPLEMENTATION_REPORT.md`

Com:

### Resumo

- o que existia;
- o que foi implementado;
- o que mudou.

### SEO

- metadata por rota;
- canonical;
- OG/Twitter;
- JSON-LD;
- robots;
- sitemap;
- llms.

### Analytics

- arquitetura de tracking;
- eventos;
- variáveis de ambiente;
- como validar GA4/GTM/Pixel.

### LGPD

- mecanismo de consentimento;
- políticas criadas/alteradas;
- categorias de cookies;
- riscos/pendências.

### Performance

- baseline;
- resultado final;
- principais melhorias.

### Responsividade

- breakpoints testados;
- pendência de teste em aparelho físico.

### Pendências externas

Separar claramente itens que exigem ação humana:

- token/validação Search Console;
- envio do sitemap ao Google;
- Bing Webmaster Tools;
- Google Business Profile;
- GA4 property;
- GTM container;
- Meta Pixel;
- revisão jurídica final;
- CNPJ/razão social reais, se ainda não fornecidos;
- eventual email institucional de privacidade.

## `SEARCH_ENGINE_SETUP.md`

Passo a passo curto para:

- Search Console;
- Bing Webmaster Tools;
- sitemap;
- inspeção de URL;
- verificação.

## `.env.example`

Adicionar somente variáveis necessárias e vazias/exemplos seguros.

---

# 30. Critérios de aceite

A tarefa só pode ser considerada concluída quando:

- [ ] todas as rotas públicas têm title e description únicos;
- [ ] canonical está correto;
- [ ] OG/Twitter estão corretos;
- [ ] OG image existe e abre publicamente;
- [ ] JSON-LD é válido e não inventa informações;
- [ ] 404 funciona como 404 real;
- [ ] `robots.txt` responde corretamente;
- [ ] `sitemap.xml` responde corretamente e lista somente URLs válidas;
- [ ] `llms.txt` responde corretamente;
- [ ] Search Console está tecnicamente preparado;
- [ ] Bing está tecnicamente preparado;
- [ ] GA4/GTM não usa IDs falsos;
- [ ] Meta Pixel não usa ID falso;
- [ ] trackers não essenciais respeitam consentimento;
- [ ] há opção clara de rejeitar cookies não necessários;
- [ ] cookies não essenciais estão OFF por padrão;
- [ ] preferências podem ser reabertas/revogadas;
- [ ] `/privacidade` reflete o tratamento real;
- [ ] `/cookies` existe e reflete cookies reais;
- [ ] o formulário não envia PII para analytics;
- [ ] `lead_captured` só dispara após sucesso real;
- [ ] nenhuma URL com UTM é canonical;
- [ ] nenhuma URL com UTM aparece no sitemap;
- [ ] mobile não tem overflow/layout quebrado;
- [ ] build/lint/testes passam;
- [ ] Lighthouse foi executado em mobile e desktop;
- [ ] relatório final foi criado;
- [ ] pendências externas estão claramente listadas.

---

# 31. Pontos críticos específicos do site atual

Durante a auditoria, trate estes pontos com prioridade:

1. O site atual já possui página de Privacidade, mas ela precisa ser reavaliada antes de ativar Meta Pixel/GA4 e outros terceiros.
2. A frase atual indicando que a Nexus não compartilha dados com terceiros para marketing/publicidade não pode contradizer a futura ativação de Meta Pixel ou ferramentas equivalentes.
3. O footer atual exibe um CNPJ placeholder (`00.000.000/0001-00`). Não publicar isso como identificação jurídica real.
4. O formulário de contato já coleta contexto comercial. Esse texto livre jamais deve ser enviado ao GA4, GTM ou Meta Pixel.
5. Preserve as rotas e a narrativa comercial atual da Nexus.
6. Não transforme `llms.txt` em prioridade maior do que metadata, conteúdo, sitemap, performance e indexabilidade.
7. Não usar `meta keywords`; trabalhar keywords semanticamente nas páginas.
8. Não criar `LocalBusiness`/Google Business Profile com endereço inexistente.

---

# 32. Referências técnicas/jurídicas para consulta

Use as versões atuais dessas fontes durante a implementação:

## LGPD / ANPD

- Lei Geral de Proteção de Dados — texto compilado: `https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm`
- ANPD — Guia Orientativo Cookies e Proteção de Dados Pessoais: `https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais`

## Google Search

- Search Console verification: `https://support.google.com/webmasters/answer/9008080`
- Sitemap: `https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap`
- robots.txt: `https://developers.google.com/search/docs/crawling-indexing/robots/intro`
- Titles: `https://developers.google.com/search/docs/appearance/title-link`
- Meta tags: `https://developers.google.com/search/docs/crawling-indexing/special-tags`
- Organization structured data: `https://developers.google.com/search/docs/appearance/structured-data/organization`
- LocalBusiness structured data: `https://developers.google.com/search/docs/appearance/structured-data/local-business`

## Google Analytics / Consent

- Consent Mode: `https://support.google.com/analytics/answer/14009635`

## Bing

- Bing Webmaster Tools — Sitemaps: `https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed`

## Open Graph

- Open Graph Protocol: `https://ogp.me/`

## llms.txt

- Proposta/especificação: `https://llmstxt.org/`

---

# 33. Forma de execução

Faça o trabalho em ordem:

1. Audite o repositório e o site.
2. Liste rapidamente o plano técnico.
3. Implemente primeiro base de SEO/metadata/canonical.
4. Implemente 404, sitemap, robots e llms.
5. Implemente JSON-LD.
6. Implemente consent manager.
7. Atualize Privacidade e crie Cookies.
8. Implemente tracking desacoplado e condicionado ao consentimento.
9. Instrumente formulário/CTAs.
10. Otimize performance sem alterar a identidade.
11. Rode testes e build.
12. Rode Lighthouse.
13. Gere documentação final.
14. Mostre um resumo objetivo das alterações realizadas, arquivos alterados e pendências externas.

**Não finalize com uma lista genérica do que deveria ser feito. Finalize com evidência do que foi de fato implementado e validado no repositório.**

# Auditoria SEO, GEO e AIO — Prometeus

Data: **14/10/2026**. Domínio: **https://agenciaprometeus.com.br**.

Escopo: todas as 11 páginas canônicas, redirects, 404, descoberta por imagem, arquivos de rastreamento, conteúdo comercial e procedimentos pós-publicação. A implementação usa a estrutura Next.js existente. Não altera preços, identidade visual, regras de consentimento ou infraestrutura em execução.

## Resultado da inspeção pública inicial

A VPS ainda serve a versão anterior ao catálogo atual. Foram feitas requisições HTTPS reais ao domínio, não inferências a partir do ambiente de desenvolvimento.

| Endereço | Resposta inicial | Decisão |
| --- | --- | --- |
| `/` | 200 | Ampliar título/descrição para software, automação e ofertas atuais |
| `/servicos` | 200, catálogo anterior | Publicar catálogo atual, com categorias e entidades das seis ofertas |
| `/servicos/prometeus-copiloto` | **404** | Requer deploy; não solicitar indexação antes |
| `/servicos/prometeus-rastro` | **404** | Requer deploy; não solicitar indexação antes |
| `/servicos/prometeus-soft-phone` | **404** | Requer deploy; não solicitar indexação antes |
| `/servicos/atendimento-ia-whatsapp` | **404** | Requer deploy; não solicitar indexação antes |
| `/servicos/desenvolvimento-sob-medida` | 200, oferta anterior | Atualizar intenção e metadados |
| `/servicos/desenvolvimento-web` | 200, oferta anterior | Publicar portfólio/preços e conteúdo aprovados |
| `/contato` | 200 | Refletir todas as ofertas, não somente diagnóstico de automação |
| `/privacidade` e `/cookies` | 200 | Preservar páginas legais e canonicals próprios |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/indexnow.txt` | 200 | Atualizar conteúdo pelo deploy; preservar acesso e chave |
| `/solucoes`, `/processo` | 308 | Preservar consolidação na home |
| `/servicos/agentes-de-ia` | 200 antigo | Nova versão redireciona para atendimento WhatsApp |
| URL desconhecida de serviço | 404 | Preservar status real e noindex |

As variantes HTTP e www redirecionaram permanentemente para HTTPS sem www, preservando caminho e query. Os headers públicos incluíam HSTS, nosniff e proteção de frame. Isso não comprova a configuração de todos os IPs de crawlers ou acesso aos relatórios privados dos buscadores.

**P0 externo:** integrar a entrega aprovada em main e publicar na VPS. A auditoria não executa deploy nem notifica URLs ainda não publicadas. A suíte pública deve ser repetida depois da publicação; o teste contra a versão antiga falhou como esperado por diferenças de metadados, catálogo, schema, redirects e páginas inexistentes.

## Pesquisa de termos: evidência e limite

Foram pesquisadas consultas comerciais em português e páginas públicas de fornecedores por categoria. Isso permite reconhecer a intenção atendida e evitar consultas incompatíveis com a oferta. **Não foi obtido um ranking quantitativo de volume de busca.** Não há acesso autenticado ao Keyword Planner/Search Console nesta sessão; a página comparativa do Google Trends não forneceu dados utilizáveis. Não foram inventados volumes, dificuldade de palavras-chave ou posições.

No Trends, os números são relativos e normalizados; termos de pouco volume podem aparecer como zero. O Keyword Planner usa estimativas de buscas mensais conforme região, período e rede. Para completar a priorização quantitativa, o proprietário deve comparar os grupos abaixo com Brasil/Google/12 meses e depois validar com consultas e leads reais. [Trends](https://support.google.com/trends/answer/4365533), [Keyword Planner](https://support.google.com/google-ads/answer/3022575).

### Matriz de intenção por página

Os termos abaixo são **alvos editoriais propostos**, baseados na correspondência da oferta e na linguagem observada no mercado. A ordem não representa volume comprovado.

| Página | Categoria principal | Termos complementares coerentes | Pergunta de compra / diferenciação |
| --- | --- | --- | --- |
| Home | Software sob medida, automação e IA para empresas | empresa de desenvolvimento de software; soluções de IA para empresas; automação de processos | Que solução a Prometeus constrói para minha operação? |
| Catálogo | Produtos e soluções para empresas | CRM; controle de estoque; softphone; agente de IA; sites profissionais | Qual das seis ofertas atende minha necessidade? |
| Copiloto | CRM para marketing e gestão de campanhas | plataforma de marketing com IA; planejamento de campanhas; CRM personalizado | Como reunir contatos, campanhas e planejamento? |
| Rastro | Controle de estoque e rastreabilidade de ativos | sistema de inventário; gestão de ativos; controle de ferramentas; localização e responsável | Onde está o item, com quem está e qual o histórico? |
| Soft Phone | Softphone com CRM para vendas | telefonia integrada ao CRM; CRM para equipe comercial; acompanhamento de ligações | Como aproximar ligações, contatos e continuidade da venda? |
| WhatsApp | Atendimento com IA no WhatsApp | agente de IA para WhatsApp; atendimento automatizado; chatbot para empresas | Como responder com contexto e encaminhar para uma pessoa? |
| Web | Criação de sites profissionais e lojas virtuais | criação de site institucional; criação de loja virtual; e-commerce; landing page; preço de site | Quanto custa, quais projetos existem e qual a manutenção? |
| Software sob medida | Desenvolvimento de software sob medida | sistema personalizado para empresas; ferramentas internas; integrações e automações | Adaptar ferramenta existente ou desenvolver uma aplicação? |
| Contato | Contato Prometeus / demonstração | demonstração CRM, estoque e softphone; orçamento de site e software | Como conversar com a equipe ou agendar? |
| Privacidade | Política de Privacidade Prometeus | dados pessoais; contato do responsável | Como meus dados são tratados? |
| Cookies | Política de Cookies Prometeus | preferências de cookies; consentimento | Como escolho e revogo minhas preferências? |

As palavras SEO/GEO/AIO explicam uma parte da entrega web, mas não substituem a intenção “criação de sites/lojas virtuais”. Não foram escolhidos “ERP completo”, “rastreio GPS”, “softphone grátis”, “disparador de WhatsApp” ou “agência de tráfego pago”: poderiam atrair expectativas não atendidas. Também não foram criadas páginas de cidade sem comprovação de presença local.

### Fontes comerciais consultadas

- [Omie — controle de estoque](https://www.omie.com.br/funcionalidades/gerenciamento-de-estoque/): confirma a categoria; o Rastro não passa a prometer recursos fiscais/ERP da concorrente.
- [RD Station](https://www.rdstation.com/) e [HubSpot — CRM e marketing](https://br.hubspot.com/blog/service/crm-e-marketing-digital-como-a-ia-muda-tudo): linguagem das categorias de CRM/marketing, não comprovação de demanda numérica ou funcionalidades do Copiloto.
- [3CX — webphone](https://www.3cx.com.br/central-telefonica/webphone/): categoria telefonia/CRM. Não foram importadas promessas de economia, integrações ou funções desse fornecedor.
- [Nuvemshop — contratar loja pronta](https://www.nuvemshop.com.br/loja-virtual/loja-virtual-pronta): distinção entre montar uma loja e contratar sua criação; não foram copiados preços/planos.
- [Senior — desenvolvimento sob medida](https://www.senior.com.br/blog/saiba-tudo-sobre-desenvolvimento-de-software-sob-medida): intenção de aplicações adaptadas aos processos da empresa.
- [Blip — agentes de IA](https://www.blip.ai/blog/wp-content/uploads/2025/03/EBOOK_-AIAGENT_ADS_LP.pdf): vocabulário da categoria de atendimento.
- [Runtask](https://runtask.com/), concorrente indicado pelo proprietário: proposta ampla de operação integrada e demonstração comercial. A diferenciação escolhida é a clareza de seis ofertas e personalização, com evidências reais da própria Prometeus. Nenhuma afirmação de cliente/resultado concorrente foi reproduzida ou validada como fato da Prometeus.

## Achados e implementação

| Prioridade | Achado | Implementação / situação |
| --- | --- | --- |
| Alta | Quatro ofertas novas indisponíveis publicamente | Registrado como dependência de publicação; verificação pública reutilizável cobre as 11 páginas |
| Alta | Títulos das plataformas só identificavam marcas | Títulos por categoria + marca; descrições exclusivas, sem mudar slugs |
| Alta | Web escondia intenção de compra atrás de SEO/GEO/AIO | Título sites/lojas/preço, descrição com mensalidade obrigatória, FAQ sobre site institucional/landing page/e-commerce |
| Alta | ContactPage continuava exclusiva de diagnóstico IA | Title, description e entidade agora abrangem ofertas e demonstrações |
| Alta | Resumo auxiliar atribuía consultas de IA ao Rastro e chamava todas as prévias de ilustrativas | Corrigido para o demonstrativo real e rascunhos assistidos; outros usos de IA dependem do projeto |
| Média | Categorias do Service pouco específicas | `serviceType`/`category` claros; WebPage relaciona serviço, breadcrumb e website por identificadores estáveis |
| Média | Preço público web não tinha representação semântica correspondente | Duas ofertas Service/Offer, preço real e descrição explícita do adicional mensal e checkout simulado |
| Média | Catálogo sem lista ordenada de ofertas e breadcrumb semântico | CollectionPage + ItemList das seis ofertas e BreadcrumbList |
| Média | Entidade corporativa não informava telefone confirmado | Organization/ContactPoint com contato oficial, atendimento Brasil e WebSite em pt-BR |
| Média | Sitemap tinha datas anteriores às mudanças editoriais | Datas estáveis de 14/10/2026 para conteúdos alterados; 11 URLs e imagens reais de demonstração/portfólio |
| Média | Links dos exemplos da home levavam só ao contato | Agora conectam Rastro/Copiloto; rótulo conceitual evita confundir o mock com captura do produto |
| Média | Previews de Google não explicitavam imagens grandes | Diretiva googlebot permite previews e snippets sem limitar conteúdo comercial |
| Média | Roteiro VPS esperava páginas antigas em 200 e ignorava novas | Atualizado para 11 URLs, migrações e teste público separado |
| Preservado | Robots aberto, conteúdo SSR, canonicals HTTPS, FAQ nativa | Não criados blocos redundantes de bots, texto oculto ou arquivos especiais sem finalidade |
| Preservado | Qualidade/peso das imagens corrigidos anteriormente | Mantidos WebP responsivo, lazy loading e telas/logos sem perda; nenhum script externo de SEO adicionado |

Schema válido não garante rich results. Não foi criado preço zero para demonstrativos privados, avaliação fictícia, SearchAction sem busca interna, endereço comercial inventado, nem Product/SoftwareApplication apenas para tentar forçar enriquecimento. FAQs permanecem conteúdo útil e legível, sem depender de exibição especial nas pesquisas.

## Por que essa abordagem serve a SEO, GEO e AIO

Google orienta priorizar conteúdo útil e original, acessibilidade, indexabilidade e correspondência entre schema e página. Não exige arquivos de IA nem schema especial. `llms.txt` foi mantido como resumo complementar, sem tratá-lo como fator de ranking. Não foram criadas variantes artificiais para cada pergunta ou consulta. [Guia de IA do Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [AI features](https://developers.google.com/search/docs/appearance/ai-features).

Para ChatGPT e Perplexity, o acesso dos crawlers de pesquisa precisa atravessar também firewall/CDN. O código já permite rastreamento geral; mudanças de treinamento não foram presumidas. [OpenAI](https://developers.openai.com/api/docs/bots), [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).

Bing combina sitemap com notificações de alterações pelo IndexNow; a entrega reaproveita o CLI existente. Brave tem índice próprio e requer que a página também possa ser rastreada pelo Googlebot. [Bing](https://blogs.bing.com/webmaster/2025/7/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search/), [Brave](https://search.brave.com/help/brave-search-crawler).

## Validação e limites

A verificação inclui build de produção, testes unitários e navegação sem JavaScript: title/description exclusivos, canonical limpo, og:url, H1, schema parseável, conteúdo e links internos, sitemap, imagens, redirects, 404 e respostas a user-agents de pesquisa. A mesma suíte pode consultar o domínio público depois do deploy, limitada a leitura.

Resultados da execução em 14/10/2026:

- `npm run build`: aprovado, 20 saídas estáticas/rotas geradas pelo Next, incluindo metadados e redirects.
- `npm run lint`: aprovado.
- `npm run test:unit`: **54/54 aprovados**.
- Suíte Chromium no standalone de produção: **124/125 aprovados** na primeira execução. A única falha foi uma expectativa antiga do título da home em `seo-lgpd.spec.ts`; foi atualizada para a nova copy. A suíte desse arquivo foi repetida: **7/7 aprovados**. Nenhuma alteração de produto foi necessária depois do build.
- Os **6 cenários da nova suíte de SEO** passaram, cobrindo as 11 páginas sem JavaScript, canonicals, ofertas, sitemap, imagens, redirects, 404 e entrega por user-agent.
- A mesma suíte consultou o domínio público antes do deploy: **6 falhas esperadas**, pois a VPS ainda apresenta a versão anterior. Essa execução não é registrada como validação da nova publicação.
- Revisão independente de código, conteúdo, testes e roteiro: sem achados bloqueantes.

Os testes do build não comprovam publicação na VPS, indexação ou resultados de busca. Search Console/Keyword Planner/Bing autenticados, Rich Results Test externo, logs da infraestrutura, métricas de campo de Core Web Vitals e IPs reais de crawlers não foram validados nesta sessão. Não há promessa de prazo ou posição.

Os passos manuais e comandos estão em [search-production-release.md](../search-production-release.md). Para evolução editorial, priorizar cases autorizados, dados medidos e demonstrações reais por produto; o proprietário controla evidências e autorizações. Não foi criado blog em massa para preencher lacunas de autoridade.

## Referências técnicas

- [Titles](https://developers.google.com/search/docs/appearance/title-link), [sitemap e lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization).
- [Schema.org Service](https://schema.org/Service), [Offer](https://schema.org/Offer).
- Guias instalados do Next.js 16.2.11: generate-metadata, sitemap, robots e Image.
- Reaproveitados componentes/CLI/testes existentes. O MCP `setup-agent` não estava disponível na sessão para uma nova consulta ao acervo; nenhum plugin, MCP, biblioteca ou skill foi criado/instalado/recomendado nesta auditoria.

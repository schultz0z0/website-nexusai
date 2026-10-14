# Auditoria e implementação de descoberta em produção

**Objetivo:** preparar todas as páginas canônicas da Prometeus para buscas comerciais, rastreamento e interpretação por buscadores e plataformas de IA, no domínio público `https://agenciaprometeus.com.br`.

**Escopo autorizado:** auditoria + implementação solicitadas pelo proprietário. Preservar visual, preços e seis ofertas aprovados. Trabalhar na branch temporária atual; integração em main e deploy não estão incluídos nesta etapa. Sem Docker Desktop, dependências novas, conteúdo oculto ou promessa de ranking.

**Abordagem:** aproveitar metadados, conteúdo editorial, JSON-LD, sitemap, robots e CLI IndexNow existentes. Corrigir descrições por intenção comercial, relações semânticas e a documentação de publicação. Não criar páginas duplicadas para variações de termos.

## Entregas e verificações

- [x] Consultar referências oficiais de Google, OpenAI, Bing, Brave, Perplexity e Schema.org; pesquisar categorias comerciais e registrar limites dos dados de demanda.
- [x] Capturar respostas HTTP reais do domínio público antes das alterações e comparar com as rotas atuais do repositório.
- [x] Vincular os seis serviços a categorias comerciais claras, com títulos e descrições próprios e respostas úteis às dúvidas de compra, sem aumentar artificialmente o texto.
- [x] Atualizar entidades Organization/WebSite/WebPage/Service, navegação semântica e condições reais da oferta web. Sem avaliações fictícias, preço zero ou schema especial para IA.
- [x] Revisar previews de busca, canonicals, sitemap, datas editoriais e llms.txt. Preservar redirects e erros 404 reais.
- [x] Atualizar roteiro pós-deploy para todas as páginas, sitemap, IndexNow, propriedades autenticadas e verificação de firewall da VPS.
- [x] Validar HTML de produção sem JavaScript, metadados, schemas, links, imagens, responsividade, build e testes. Revisão independente concluída sem bloqueios antes de commit e push.
- [x] Preparar relatório com achados, implementação, fontes, matriz de termos e pendências que exigem dados/acesso do proprietário.

## Critérios

Todas as 11 páginas canônicas devem retornar 200 na versão de produção testada, com title/description exclusivos, canonical público, H1 único, conteúdo legível sem JS e links rastreáveis. URLs antigas devem redirecionar permanentemente; URLs desconhecidas devem retornar 404 sem canonical e com noindex. Sitemap não inclui aliases, parâmetros, checkout simulado ou 404. Preços e mensalidade ficam coerentes entre página, respostas e schema. Os quatro produtos/serviços novos ainda retornavam 404 na VPS na coleta inicial; essa pendência só é resolvida com publicação e nova verificação externa.

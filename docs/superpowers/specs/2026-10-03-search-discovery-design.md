# Descoberta da Prometeus em busca e respostas de IA

Objetivo: tornar o conteúdo público da Prometeus acessível e específico para buscas sobre seus serviços, com instruções operacionais para os cadastros externos. A solicitação autoriza implementar as melhorias necessárias e explicar o trabalho manual.

## Escopo

- Criar `/servicos` e quatro páginas estáticas em `/servicos/[slug]`: `automacao-de-processos`, `agentes-de-ia`, `integracao-de-sistemas`, `desenvolvimento-sob-medida`.
- Apresentar aplicações, processo, requisitos, limites e dúvidas por serviço. Exemplos são ilustrativos; nenhum cliente, resultado, preço, prazo ou certificação é inventado.
- Reutilizar Space Grotesk, cores escuras e acentos da marca. Layout editorial legível com navegação por breadcrumbs, conteúdo servido no HTML e foco de teclado visível. Sem dependências adicionais.
- Vincular o catálogo a partir da home e do rodapé; preservar os redirecionamentos legados de `/solucoes` e `/processo`.
- Publicar canonical, Open Graph, Service e BreadcrumbList consistentes com conteúdo visível. Unificar a identidade Organization com `@id` estável.
- Atualizar sitemap e llms.txt a partir do catálogo; usar datas editoriais reais, sem datas artificiais a cada build.
- Manter rastreamento aberto a todos os buscadores em robots.txt. Grupos específicos são desnecessários quando `*` já permite acesso. Não alterar políticas de treinamento existentes.
- Publicar chave IndexNow pública em `/indexnow.txt`, com script de submissão de URLs explicitamente alteradas, dry-run, pré-verificação da chave, timeout e mensagens distintas de aceite e indexação. Nenhum endpoint público de submissão.
- Disponibilizar o script também na imagem Docker. Não submeter URLs novas antes do deploy.
- Atualizar SEARCH_ENGINE_SETUP.md com deploy, Bing/Copilot, Brave, DuckDuckGo, ChatGPT, Perplexity, Google AI e acompanhamento.

## Validação

Testes de cobertura do sitemap e conteúdo, submissão IndexNow usando servidor HTTP local, teste de HTML sem JavaScript, metadata, 404 e layout mobile/desktop. Executar unitários, lint, build e regressões de SEO, redirecionamentos e rodapé.

## Limites externos

Preparação técnica não confirma indexação, ranking ou citações. Cadastros autenticados, DNS, firewall/CDN e publicação na VPS dependem da conta e infraestrutura do proprietário. Casos reais ficam para uma atualização com evidências fornecidas pela empresa.

## Acervo

O Setup consultado: Web Quality Audit atende auditoria técnica; nenhuma integração IndexNow foi encontrada. A implementação usa o protocolo oficial diretamente, sem criar uma skill ou instalar um plugin equivalente.

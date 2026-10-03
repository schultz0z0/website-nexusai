# Configuração de mecanismos de busca — Prometeus

Domínio canônico: `https://agenciaprometeus.com.br`

## Roteiro desta entrega — SEO, GEO e AIO

Preparação local concluída nesta entrega; publicação, propriedades autenticadas e presença nos índices ainda precisam ser verificadas. Não existe um cadastro único que assegure ranking ou citações em todas as plataformas.

### 1. Publicar a nova versão

A versão para publicação está na branch `main`. Na VPS, atualize o checkout com `git pull --ff-only origin main` e siga `docs/vps-update.md` para reconstruir e iniciar o container. Depois de publicar, abra estas URLs e confirme HTTP 200:

- `https://agenciaprometeus.com.br/servicos`
- `https://agenciaprometeus.com.br/servicos/automacao-de-processos`
- `https://agenciaprometeus.com.br/servicos/agentes-de-ia`
- `https://agenciaprometeus.com.br/servicos/integracao-de-sistemas`
- `https://agenciaprometeus.com.br/servicos/desenvolvimento-sob-medida`
- `https://agenciaprometeus.com.br/sitemap.xml` — nove URLs canônicas, incluindo as cinco novas.
- `https://agenciaprometeus.com.br/robots.txt` — `User-Agent: *`, `Allow: /` e o endereço do sitemap.
- `https://agenciaprometeus.com.br/llms.txt` — links para os quatro serviços.
- `https://agenciaprometeus.com.br/indexnow.txt` — a mesma chave do arquivo `public/indexnow.txt` deste checkout.

O sitemap omite `lastmod` quando a data editorial antiga não foi confirmada. Para novos conteúdos, mantenha a data real em `src/lib/service-content.ts`. Não substitua datas por `new Date()` em todos os builds.

### 2. Bing, Copilot e DuckDuckGo

1. Acesse [Bing Webmaster Tools](https://www.bing.com/webmasters/) com sua conta.
2. Escolha **Importar do Google Search Console**, autorize a leitura das propriedades e selecione `agenciaprometeus.com.br`. Se não quiser conectar as contas, use a verificação manual descrita abaixo.
3. Em **Sitemaps**, confirme ou envie `https://agenciaprometeus.com.br/sitemap.xml`.
4. Em **Inspeção de URL**, verifique a home, `/servicos` e as quatro páginas detalhadas. Solicite indexação onde a interface permitir; acompanhe os erros até serem resolvidos.
5. Confira **Search Performance** para impressões/cliques e **AI Performance**, quando disponível, para citações no Copilot, Bing e experiências parceiras compatíveis.
6. Guarde a data de envio e a situação de cada URL. Propriedade verificada, sitemap recebido e página indexada são estados diferentes.

O DuckDuckGo utiliza múltiplas fontes; grande parte dos links tradicionais vem do Bing. O trabalho no Bing amplia essa possibilidade de descoberta, mas não confirma inclusão ou a mesma posição no DuckDuckGo. Não é necessário um cadastro separado para cada página nele.

Fontes: [configuração do Bing](https://blogs.bing.com/webmaster/2025/6/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility/), [AI Performance](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/), [fontes do DuckDuckGo](https://duckduckgo.com/duckduckgo-help-pages/results/sources).

### 3. Avisar os participantes do IndexNow

O protocolo usa uma chave pública de comprovação de domínio, já criada em `public/indexnow.txt`. Ela não é senha, token da sua conta Microsoft nem credencial de acesso. Não precisa de cadastro ou chave paga. Não coloque credenciais privadas nesse arquivo.

Antes do deploy, é possível conferir a simulação no checkout local:

```bash
npm run search:submit -- --dry-run / /servicos /servicos/automacao-de-processos /servicos/agentes-de-ia /servicos/integracao-de-sistemas /servicos/desenvolvimento-sob-medida
```

Depois de publicar e conferir as páginas, envie uma vez as URLs criadas/alteradas nesta entrega:

```bash
npm run search:submit -- / /servicos /servicos/automacao-de-processos /servicos/agentes-de-ia /servicos/integracao-de-sistemas /servicos/desenvolvimento-sob-medida
```

Pode executar no checkout local com Node.js 22 ou superior. Na VPS, a imagem Docker também inclui o script; use:

```bash
docker compose exec -T website node --experimental-strip-types scripts/indexnow.mts / /servicos /servicos/automacao-de-processos /servicos/agentes-de-ia /servicos/integracao-de-sistemas /servicos/desenvolvimento-sob-medida
```

O script verifica a chave no domínio publicado antes do envio. Se ela não corresponder, interrompe. As URLs precisam pertencer ao domínio oficial, sem UTMs, fragmentos ou credenciais. O envio é feito ao endpoint oficial, que compartilha os avisos com os buscadores participantes.

- HTTP **200**: pedido recebido; não significa página indexada.
- HTTP **202**: pedido recebido, com validação da chave pendente.
- HTTP **403/422**: confira a chave, sua publicação e as URLs.
- HTTP **429**: aguarde antes de repetir. Não faça envios contínuos da mesma lista.
- Falha de rede: confira a conectividade e tente novamente depois; o script retorna erro.

Nas próximas atualizações, envie somente as URLs com mudanças substanciais, inclusive removidas quando aplicável. Continue usando sitemap para o inventário completo. IndexNow não substitui o rastreamento do Google ou Brave e não promete citações no ChatGPT ou Perplexity.

Fonte: [protocolo IndexNow](https://www.indexnow.org/documentation).

### 4. Brave Search

1. Depois do deploy, pesquise o domínio, o nome da empresa e consultas como `site:agenciaprometeus.com.br` no [Brave Search](https://search.brave.com/). O operador é uma checagem aproximada, não um inventário completo do índice.
2. Mantenha os links oficiais da empresa apontando para o domínio correto. As páginas de serviços já estarão vinculadas pela home e pelo rodapé.
3. Se precisar solicitar novo rastreamento de uma página já conhecida, confira [Submit URL](https://search.brave.com/submit-url). A documentação do Brave apresenta esse fluxo especialmente para atualizar/remover páginas; não o trate como um Search Console nem como garantia de inclusão de páginas novas.
4. Se páginas não aparecerem, confira acessibilidade, links públicos e conteúdo. A indexação pelo Google ou Bing não comprova presença no Brave.

O Brave usa crawler próprio, sem um user-agent diferenciado anunciado. Segundo sua documentação, ele não rastreia páginas que não podem ser rastreadas pelo Googlebot. Não crie uma regra fictícia `Bravebot` nem faça listas de IPs por suposição.

Fonte: [crawler do Brave](https://search.brave.com/help/brave-search-crawler).

### 5. ChatGPT Search, Perplexity e Google AI

O `robots.txt` do projeto já permite acesso a todos os rastreadores. Não é necessário repetir um bloco `Allow` para cada marca. A hospedagem/CDN/firewall, porém, pode bloquear uma requisição antes de ela alcançar a aplicação.

Confira na infraestrutura:

- **ChatGPT Search:** permitir o rastreador `OAI-SearchBot` e o acesso solicitado por usuários via `ChatGPT-User`, usando a documentação e os IPs oficiais quando houver regras de segurança.
- **Perplexity:** permitir `PerplexityBot` e o acesso de `Perplexity-User`, combinando user-agent e IPs oficiais no firewall quando necessário.
- **Google AI Overviews/AI Mode:** manter Googlebot autorizado e páginas indexáveis com snippets permitidos. Não há cadastro adicional nem schema especial obrigatório para esses recursos.
- **Bing:** garantir que Bingbot possa acessar as páginas, sem login ou CAPTCHA.

Se usar Cloudflare ou outro serviço com bloqueio de bots de IA, confira o painel e os logs. Faça exceções para rastreadores legítimos verificados; não desligue a segurança do site inteiro. Um teste com user-agent simulado não prova que os IPs reais dos provedores têm acesso.

Pesquisa, navegação por solicitação e treinamento têm finalidades diferentes. Liberar `GPTBot` não é requisito para aparecer no ChatGPT Search. Este trabalho preserva a política aberta existente; uma futura escolha sobre treinamento pode ser feita separadamente.

`llms.txt` está disponível como resumo adicional, mas não é um requisito universal nem um fator comprovado de ranking. Os textos úteis continuam nas páginas HTML públicas.

Fontes: [OpenAI crawlers](https://developers.openai.com/api/docs/bots), [FAQ para editores](https://help.openai.com/pt-br/articles/12627856-publishers-and-developers-faq), [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), [Google AI e sites](https://developers.google.com/search/docs/appearance/ai-features).

### 6. Atualizar também a propriedade Google existente

No Google Search Console, confira o sitemap atualizado e inspecione as cinco páginas novas. Verifique o canonical selecionado e solicite indexação quando necessário. A propriedade já estar cadastrada não significa que as URLs novas já tenham sido descobertas.

### 7. Acompanhar resultados e desenvolver autoridade

Use uma lista de consultas reais, como `automação de processos para empresas`, `agentes de IA para atendimento`, `integração entre CRM e ERP` e `desenvolvimento de ferramentas internas`. Comece registrando o estado atual; não use apenas pesquisas pelo nome da própria empresa.

Uma vez por semana, confira:

- Páginas indexadas, erros, impressões e cliques no Google e Bing.
- Citações e páginas referenciadas no relatório AI Performance do Bing, sem interpretar contagem de citações como posição.
- Tráfego de referência de Brave, Bing, DuckDuckGo, ChatGPT e Perplexity no analytics já configurado, respeitando consentimento. ChatGPT usa `utm_source=chatgpt.com` nos links de referência; esses parâmetros não mudam o canonical.
- Contatos qualificados gerados e qual conteúdo ajudou a decisão. Uma citação pode acontecer sem clique; as ferramentas de analytics também podem perder visitas por falta de consentimento.

Depois, publique cases verdadeiros com contexto, solução, resultado medido, período e autorização do cliente. Mantenha os perfis oficiais coerentes e busque referências legítimas em parceiros e publicações relevantes. Os exemplos atuais estão identificados como ilustrativos. Não publique métricas inventadas nem compre links em massa.

## Consulta ao acervo O Setup

Consultado `setup-agent`: encontrado [Web Quality Audit](https://setup.omatheusdaia.com.br/skills/web-quality-audit) para auditorias de qualidade técnica. Não foram encontrados recursos específicos de IndexNow/Bing nas buscas realizadas. Nenhuma skill ou plugin novo foi criado/instalado; o envio utiliza diretamente o protocolo oficial sem dependências adicionais.

## Google Search Console

1. Adicione a propriedade de domínio `agenciaprometeus.com.br`.
2. Prefira a verificação por registro DNS TXT, pois ela cobre HTTPS e possíveis subdomínios.
3. Se optar pela meta tag, copie apenas o valor do atributo `content` para `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` no ambiente de produção e faça um novo deploy.
4. Confirme que a URL inspecionada usa HTTPS e aponta canonical para a versão sem parâmetros.
5. Envie `https://agenciaprometeus.com.br/sitemap.xml`.
6. Inspecione `/`, `/contato`, `/privacidade` e `/cookies`; solicite indexação depois do deploy quando necessário.
7. Acompanhe páginas indexadas, erros de rastreamento, consultas, impressões, CTR, posição média e Core Web Vitals.

## Bing Webmaster Tools

1. Adicione `agenciaprometeus.com.br` ou importe a propriedade do Google Search Console, se essa opção estiver disponível na conta.
2. Verifique a propriedade. Para a alternativa por meta tag, configure `NEXT_PUBLIC_BING_SITE_VERIFICATION` com o valor real e faça um novo deploy.
3. Envie `https://agenciaprometeus.com.br/sitemap.xml`.
4. Confirme que o sitemap também aparece em `https://agenciaprometeus.com.br/robots.txt`.
5. Monitore rastreamento, indexação e erros reportados pelo Bing.

## Antes de considerar a configuração concluída

- Não coloque tokens reais no repositório; use variáveis do ambiente de deploy.
- Teste a imagem social em `https://agenciaprometeus.com.br/og-image.png` após a publicação.
- Valide o JSON-LD no Schema.org Validator e, quando aplicável, no Google Rich Results Test.
- A propriedade, o DNS, o envio do sitemap e a solicitação de indexação são ações externas: o código apenas deixou o site preparado.

## Google Business Profile

Verifique primeiro se a Prometeus é elegível. Crie ou reivindique um perfil somente com nome, categoria, telefone, endereço ou área de atendimento e horários reais. Não publique endereço fictício e não adicione `LocalBusiness` ao site sem dados comerciais confirmados e coerentes.

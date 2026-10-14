# Publicação e indexação — Prometeus

Domínio oficial: **https://agenciaprometeus.com.br**. Atualizado em 14/10/2026.

## 1. Publicar antes de solicitar indexação

A auditoria e as alterações podem ser concluídas antes do deploy. Primeiro integre a branch aprovada em `main`, envie ao GitHub e siga [vps-update.md](vps-update.md). Não envie páginas ainda não publicadas aos buscadores. Na coleta inicial desta auditoria, Copiloto, Rastro, Soft Phone e atendimento com IA no WhatsApp retornavam 404 na VPS.

O sitemap desta versão tem **11 páginas**:

```text
https://agenciaprometeus.com.br
https://agenciaprometeus.com.br/servicos
https://agenciaprometeus.com.br/servicos/prometeus-copiloto
https://agenciaprometeus.com.br/servicos/prometeus-rastro
https://agenciaprometeus.com.br/servicos/prometeus-soft-phone
https://agenciaprometeus.com.br/servicos/atendimento-ia-whatsapp
https://agenciaprometeus.com.br/servicos/desenvolvimento-sob-medida
https://agenciaprometeus.com.br/servicos/desenvolvimento-web
https://agenciaprometeus.com.br/contato
https://agenciaprometeus.com.br/privacidade
https://agenciaprometeus.com.br/cookies
```

## 2. Verificar o domínio público

Em um checkout com dependências de desenvolvimento instaladas (`npm ci`), execute:

```bash
SEARCH_AUDIT_PUBLIC=1 npm run search:verify
```

No PowerShell:

```powershell
$env:SEARCH_AUDIT_PUBLIC='1'
npm run search:verify
Remove-Item Env:SEARCH_AUDIT_PUBLIC
```

Esse modo usa somente a suíte de SEO de leitura no domínio oficial. Não inicia servidor, envia formulários ou compra nada. O container de produção não precisa instalar Playwright. O teste verifica metadados e conteúdo, não apenas um código 200. Antes do deploy, falhar contra a VPS antiga é esperado; depois, todos os checks devem passar.

No navegador, abra também `/sitemap.xml`, `/robots.txt`, `/llms.txt` e `/indexnow.txt` no domínio público. Não pode haver login, CAPTCHA, modo de manutenção, `noindex` ou bloqueio de conteúdo comercial. Em `docs/vps-update.md` estão os checks por curl, inclusive redirects.

## 3. Google Search Console

1. Abra a propriedade correta em [Search Console](https://search.google.com/search-console/). A propriedade já existente pode continuar sendo usada; confira se ela cobre o domínio canônico.
2. Em **Sitemaps**, envie `https://agenciaprometeus.com.br/sitemap.xml`.
3. Em **Inspeção de URL**, teste ao vivo `/servicos` e cada uma das seis ofertas. Confirme rastreamento permitido e HTML da oferta.
4. Solicite indexação das páginas novas ou substancialmente alteradas, respeitando as cotas do painel.
5. Depois confira a versão indexada, o canonical selecionado pelo Google e os relatórios de páginas. Cadastro não significa indexação imediata; `site:` não é uma contagem exata.

Também valide os dados em [Rich Results Test](https://search.google.com/test/rich-results). `Service` e outras entidades válidas não necessariamente possuem um resultado especial reconhecido pela ferramenta; isso não equivale a erro. Não há garantia de exibição de rich results.

## 4. Bing e IndexNow

1. Em [Bing Webmaster Tools](https://www.bing.com/webmasters/), importe a propriedade do Google ou verifique a propriedade existente.
2. Envie o mesmo sitemap e use a inspeção de URL.
3. Acompanhe indexação e **AI Performance**, quando disponível. Contagem de citações não é uma posição de ranking.
4. Na VPS, após validar a publicação, simule as notificações:

```bash
docker compose exec -T website node --experimental-strip-types scripts/indexnow.mts --dry-run / /servicos /contato /servicos/prometeus-copiloto /servicos/prometeus-rastro /servicos/prometeus-soft-phone /servicos/atendimento-ia-whatsapp /servicos/desenvolvimento-sob-medida /servicos/desenvolvimento-web /servicos/agentes-de-ia /servicos/automacao-de-processos /servicos/integracao-de-sistemas
```

Confira as URLs e repita sem `--dry-run`. As três últimas notificam migrações de endereços antigos; não entram no sitemap. Privacidade e cookies continuam no sitemap, mas não precisam ser notificadas como alterações nesta entrega. O CLI verifica a chave pública antes do envio. HTTP 200/202 do protocolo não comprova indexação.

**DuckDuckGo:** usa múltiplas fontes e obtém grande parte dos links tradicionais do Bing. Manter Bing atualizado ajuda essa descoberta, mas não assegura a mesma cobertura ou posição no DuckDuckGo. Confira também resultados e acesso de seus crawlers no domínio público. [Fontes oficiais dos resultados](https://duckduckgo.com/duckduckgo-help-pages/results/sources).

Fontes: [IndexNow](https://www.indexnow.org/documentation), [AI Performance do Bing](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/).

## 5. Brave Search

Confira buscas pelo domínio e pelas ofertas no [Brave Search](https://search.brave.com/). Mantenha as páginas vinculadas e acessíveis ao Googlebot: segundo o Brave, essa permissão também é necessária para seu crawler. Não há user-agent exclusivo anunciado para inventar uma regra `Bravebot`.

O [formulário de atualização](https://search.brave.com/submit-url) é documentado para re-fetch/remoção de páginas conhecidas; não é equivalente a um Search Console nem garante inclusão de novas páginas. Presença no Google/Bing não comprova presença no Brave. [Fonte oficial](https://search.brave.com/help/brave-search-crawler).

## 6. ChatGPT, Perplexity, Google AI e Copilot

- **ChatGPT Search:** permita `OAI-SearchBot` e seus IPs oficiais. `GPTBot` é uma escolha separada sobre treinamento; não é requisito para busca. `ChatGPT-User` pode acessar páginas em ações solicitadas por usuários. [OpenAI](https://developers.openai.com/api/docs/bots).
- **Perplexity:** permita `PerplexityBot` e seus IPs publicados. O acesso de `Perplexity-User` atende ações de usuários e também precisa passar pelo firewall. [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).
- **Google AI Overviews/AI Mode:** Googlebot, conteúdo indexável e snippets permitidos continuam sendo a base. Não há inscrição ou schema adicional obrigatório. [Google](https://developers.google.com/search/docs/appearance/ai-features).
- **Microsoft Copilot:** acompanhe também as páginas e referências no ecossistema Bing; não há garantia de recomendação por cadastrar um sitemap. [Bing](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/).

O `robots.txt` existente permite `/` para todos; não precisa de um bloco repetido por marca. Em Traefik, firewall e eventual CDN, confirme por logs se crawlers legítimos conseguem acessar o conteúdo. Verifique IPs pelos métodos oficiais; um user-agent pode ser falsificado. Não desative a segurança inteira do site.

`llms.txt` continua como resumo auxiliar coerente. Não substitui HTML/sitemap, nem tem ganho comprovado de ranking no Google. Não existe um botão para garantir presença em todas as respostas de IA. [Guia oficial de IA do Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## 7. Fechar a priorização de termos com dados reais

A [matriz da auditoria](audits/2026-10-14-search-production.md) separa intenção e oferta. A pesquisa pública não forneceu um ranking quantitativo dos termos mais buscados. Para completar essa etapa:

1. No Keyword Planner da conta Google Ads, compare os grupos da matriz com **Brasil**, rede **Google**, últimos **12 meses**. Registre buscas mensais, tendência e CPC como métricas diferentes. A concorrência de anúncios não mede dificuldade orgânica. Não é necessário comprar mídia para implementar o SEO desta entrega.
2. Em Search Console, acompanhe consultas e páginas por grupo, separando marca de buscas sem marca. Compare períodos equivalentes após as novas páginas serem descobertas.
3. Priorize contatos qualificados. “Loja virtual grátis” e “softphone grátis para download” podem trazer uma intenção diferente da oferta paga e personalizada da Prometeus.

O Google Trends normaliza interesse relativo, não fornece volume absoluto; termos com pouco volume podem aparecer como zero. O Keyword Planner oferece estimativas e exige acesso à conta. Fontes: [Trends](https://support.google.com/trends/answer/4365533), [métricas do Keyword Planner](https://support.google.com/google-ads/answer/3022575).

## 8. Autoridade e acompanhamento

Mantenha os perfis oficiais apontando para o domínio, publique cases autorizados com problema, solução e resultado medido, e use telas/demonstrações reais sempre que disponíveis. O portfólio web deve distinguir projeto publicado de projeto em desenvolvimento. Não invente clientes, avaliações ou números.

Semanalmente, registre indexação, consultas, cliques, leads qualificados e referências de IA. ChatGPT acrescenta `utm_source=chatgpt.com`; o canonical permanece limpo. Analytics depende do consentimento e pode não contar todas as visitas; uma citação também pode acontecer sem clique. [FAQ da OpenAI](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq).

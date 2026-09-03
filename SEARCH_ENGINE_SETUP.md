# Configuração de mecanismos de busca — Prometeus

Domínio canônico: `https://agenciaprometeus.com.br`

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

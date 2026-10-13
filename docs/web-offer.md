# Oferta de sites e lojas virtuais

## Condições informadas pelo responsável

- Criação de site: R$ 1.500, em 10× de R$ 150 sem juros.
- Pix: 5% de desconto apenas sobre a criação, total de R$ 1.425.
- Loja virtual: mesmo valor por enquanto. O preço definitivo ainda será definido.
- Pacote mensal obrigatório para ambos: R$ 50 adicionais, com hospedagem, domínio, manutenção da infraestrutura e 3 ajustes mensais.

Os valores ficam centralizados em `src/lib/web-offers.ts`. A página explica SEO, GEO e AIO como preparação de conteúdo e estrutura técnica para descoberta, sem promessa de indexação, posição ou recomendação de IA.

## Portfólio

As apresentações usam gravações da navegação real, com movimentos presentes nos sites, aceleradas para aproximadamente 30 segundos. Arquivos MP4 locais em `public/videos/portfolio/` e capas em `public/images/portfolio/` evitam incorporar páginas externas na visita. O Remotion Player carrega somente quando o visitante escolhe assistir.

- Jotape Publicidade: publicado em https://jotapepublicidade.com.br/.
- Foxstage: projeto em desenvolvimento, capturado no ambiente local. A página pública não oferece um link para localhost.

## Pagamento

O checkout é uma simulação declarada, sem coleta de dados de cartão, criação de pedido ou cobrança. InfinitePay ainda não está integrado.

Antes de ativar o pagamento real, definir o início e a forma de cobrança da mensalidade, cancelamento, quais alterações cabem nos três ajustes e escopo de entrega de cada produto. A página não inventa essas condições.

## Verificação local

O ambiente utiliza Node.js diretamente, sem Docker Desktop. `npm run build` gera o standalone. Os testes de navegador aceitam `PLAYWRIGHT_PORT` e `PLAYWRIGHT_USE_PRODUCTION_BUILD=1` para verificar a versão de produção em uma porta livre.

## Remotion

O Player usa Remotion 4.0.534. Conforme a [licença oficial](https://www.remotion.dev/docs/license/pricing), indivíduos e equipes de até três pessoas podem utilizar a licença gratuita; empresas e colaborações com quatro ou mais pessoas precisam da licença comercial. Confirmar o enquadramento da Prometeus antes da publicação. Nenhuma licença foi comprada e o aviso de licença do Player não foi suprimido.

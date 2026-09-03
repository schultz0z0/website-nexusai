# Agência Prometeus — migração definitiva de domínio

## Objetivo

Adotar `https://agenciaprometeus.com.br` como endereço canônico único da Prometeus e reorganizar exclusivamente o projeto do site na VPS sob o nome `prometeus-site`.

## Escopo

- Atualizar URLs canônicas, metadados, sitemap, robots, `llms.txt`, JSON-LD, documentação e testes.
- Configurar o Traefik apenas para `agenciaprometeus.com.br` e `www.agenciaprometeus.com.br`.
- Redirecionar `www` para o domínio raiz.
- Publicar o Compose como projeto `prometeus-site`, com imagem `prometeus-site-website` e contêiner `prometeus-website`.
- Migrar o checkout remoto de `/opt/site-nexus` para `/opt/prometeus-site` sem alterar qualquer outro Compose da VPS.
- Não alterar DNS nesta execução.

## Sequência segura de publicação

1. Validar a mudança localmente e enviar a `main`.
2. Clonar a revisão aprovada em `/opt/prometeus-site` e construir a nova imagem enquanto o serviço atual permanece ativo.
3. Preservar o Compose anterior em um backup dentro do novo checkout.
4. Parar somente o projeto antigo e iniciar somente `prometeus-site`.
5. Validar processo, identidade, rotas internas e configuração do Traefik sem depender da propagação de DNS.
6. Remover `/opt/site-nexus` e a imagem antiga apenas depois da validação.

## Critérios de aceite

- Nenhum arquivo textual versionado contém o endereço legado.
- O domínio canônico é `https://agenciaprometeus.com.br` em todas as superfícies públicas.
- O Compose resolve como projeto `prometeus-site` e não anuncia o endereço legado.
- A VPS mantém somente o projeto do site com a nova nomenclatura.
- Nenhum Compose fora do site é alterado, parado ou reiniciado.


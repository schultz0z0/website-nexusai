# Qualidade e entrega de imagens

As fotografias da home, contato, catálogo e páginas individuais foram recuperadas dos PNGs originais. Os WebPs anteriores já tinham perdido detalhes antes da otimização responsiva. Os novos arquivos preservam a resolução nativa, sem ampliação artificial, com qualidade 95 como fonte para publicação.

## Entrega

- Fotos em cards e seções: Next Image responsivo, qualidade 85.
- Banners cinematográficos: qualidade 90. `sizes` considera a altura do recorte com `object-fit: cover`, inclusive no celular; usar apenas `100vw` nesse caso pode solicitar uma foto pequena demais.
- Logos e capturas de telas do Rastro: WebP sem perda, entrega direta. As telas mantêm 1920×1080 para leitura ampliada.
- Capas dos vídeos do portfólio: primeiro quadro dos próprios vídeos, WebP sem perda, 1280×800 nativos.
- O contato usa as fotos específicas para desktop e celular como fundo CSS.
- Carregamento sob demanda continua ativo fora dos banners. As fotos restauradas usam uma versão explícita na URL para evitar reutilizar derivados antigos do cache.

Os arquivos fonte WebP das fotografias ficam aproximadamente entre 70 e 295 KB; o navegador recebe uma variante adequada à tela nos componentes responsivos. Não há desativação global da otimização nem publicação de PNGs grandes como fotografias.

## Próximas imagens

Partir sempre do original, evitar recomprimir arquivos já reduzidos e manter a composição na resolução nativa. Reservar compressão sem perda para marcas e interfaces com texto. Conferir tamanho transferido e detalhe visual juntos; aumentar `quality` não recupera informação que o arquivo fonte já perdeu.

Validação automatizada: `tests/image-quality.spec.ts` percorre home, catálogo, seis ofertas e contato em desktop e celular, verifica carregamento, política de qualidade, dimensões dos recortes, logos e fundo de contato. A legibilidade e aparência final também exigem inspeção visual.

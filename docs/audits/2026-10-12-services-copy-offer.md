# Auditoria de copy, clareza da oferta e heroes de serviços

Data: 12 de outubro de 2026.

## Escopo e método

Catálogo `/servicos` e cinco páginas: automação de processos, agentes de IA, integração de sistemas, software sob medida e desenvolvimento web. Home como referência de identidade; contato como destino das chamadas para ação.

Duas avaliações independentes: leitura editorial e visual por `copy_offer_audit`; evidência de navegador e detector por `hero_browser_evidence`. Inspeção do código e da versão local atual. Ambiente executado diretamente com Node.js; sem Docker Desktop. Nenhum formulário foi enviado. As propostas abaixo não foram aplicadas ao site nesta auditoria.

As prioridades são julgamentos editoriais e visuais. Não há dados de conversão, entrevistas com compradores ou testes A/B nesta análise; não se atribuem percentuais de impacto.

### Evidência de navegador e detector

Inspeção das oito rotas (home, catálogo, cinco detalhes e contato), em desktop 1440 × 1000 e celular 390 × 844, com 16 capturas em aba isolada. A aba foi fechada ao concluir; o ambiente Node.js existente permaneceu ativo.

Na largura de 390 px, nenhuma dessas rotas apresentou overflow horizontal. Nos detalhes, o título começa aproximadamente em y=154 e o CTA em y=364–432; a fotografia aparece depois, por volta de y=497–538. Home e catálogo dão mais espaço inicial à cena, com título aproximadamente em y=380–386. As posições são observações nessas dimensões, não uma exigência de replicar coordenadas.

O detector retornou zero achados no escopo de marcação inspecionado. Isso não avalia clareza de oferta, qualidade de argumento comercial ou equivalência visual entre heroes. Não houve overlay nem alteração da página durante a inspeção.

Evidências brutas temporárias: `.next/services-audit-evidence.json`, `.next/services-audit-detector.json` e `.next/services-audit-*.jpg`.

## Diagnóstico

O conteúdo explica com cuidado como a Prometeus avalia e constrói projetos. A oferta comercial fica menos explícita: o visitante precisa deduzir qual problema cada serviço resolve, qual solução pode receber e o que acontece depois do contato.

As páginas individuais têm um hero estrutural, porém a composição é uma abertura em duas colunas com fotografia e mockup. A home usa a imagem como cena do banner inteiro. Cores e tipografia aproximam as páginas; a composição de abertura ainda as separa.

## O que preservar

- Identidade da home: fundo escuro, iluminação azul, fotografia humana, tipografia ampla e CTA com destaque.
- Aplicações concretas já descritas: atualizar CRM, consultar documentos, validar registros, reunir solicitações e apresentar serviços.
- Identificação dos exemplos como ilustrativos. Os mockups explicam uma possibilidade de solução; não comprovam resultado de cliente.
- Transparência sobre acessos, decisões humanas, limites, custos de terceiros e definição de escopo.

## Prioridades gerais

### Alta: tornar a entrega visível

O template apresenta aplicações, exemplo, processo, requisitos e FAQ, mas não reúne uma síntese de entrega. “Desenhamos e construímos” explica a atividade da agência; o comprador ainda precisa entender o objeto da compra.

Adicionar, por serviço, um bloco curto com: problema reconhecível; solução que podemos construir; componentes possíveis; o que precisa ser confirmado. Os componentes devem vir das capacidades já descritas e de um escopo comercial confirmado. Não apresentar documentação, suporte, manutenção, hospedagem ou integrações como inclusões universais sem confirmação.

Fonte: `src/components/service-detail.tsx:37` e `src/lib/service-content.ts`.

### Alta: diferenciar os serviços antes de explicar suas combinações

Automação, integração e software usam solicitações, responsáveis e aprovações como exemplos. Essa semelhança dificulta escolher a categoria adequada.

Mapa recomendado para o catálogo:

| Situação da empresa | Serviço | Função principal |
|---|---|---|
| A equipe repete cópias, conferências e encaminhamentos | Automação de processos | Executar etapas repetitivas de uma rotina |
| Atendimento e equipe procuram as mesmas informações | Agentes de IA | Interpretar perguntas, consultar fontes e apoiar tarefas |
| Os mesmos dados precisam ser digitados em ferramentas diferentes | Integração de sistemas | Fazer dados circularem entre ferramentas |
| Nenhuma ferramenta atende ao trabalho da equipe | Software sob medida | Construir a interface e as funções que faltam |
| A empresa precisa apresentar seus serviços e facilitar o contato | Desenvolvimento Web | Criar um site ou uma landing page |

Depois desse mapa, explicar que um projeto pode combinar serviços. O mapa não deve exigir que o visitante conheça a tecnologia antes de reconhecer seu problema.

Fonte: `src/app/servicos/page.tsx:47` e `src/lib/service-presentation.ts`.

### Alta: manter a intenção do visitante até o contato

Web abre com “Conversar sobre meu site”, mas o encerramento pede “rotina” e “sistemas envolvidos”. A página de contato anuncia “Vamos entender onde sua operação perde tempo”, com título de diagnóstico de automação com IA. A pessoa que quer criar um site precisa adaptar sua necessidade a esse vocabulário.

Recomendação: contato geral abrangente, com contexto do serviço de origem preservado. Exemplo geral: “Conte o que você quer melhorar ou construir”. Para Web: empresa, site atual, serviços que precisa apresentar e objetivo de contato. Para integração: sistemas e dados; para agentes: tarefas, fontes e canais.

O encerramento também deve acompanhar cada oferta. Informar o próximo passo real: a equipe lê a solicitação e avalia a conversa seguinte. Não chamar de orçamento imediato se o processo exige avaliação prévia.

Fonte: `src/components/service-detail.tsx:29`, `src/components/service-closing.tsx:10`, `src/app/contato/contact-hero.tsx:20` e `src/lib/content.ts:196`.

### Média: aproximar os heroes do padrão cinematográfico da home

Home: imagem integrada ao fundo do banner, cena dominante, título e CTA como parte da mesma composição. Detalhes: foto dentro de um bloco e painel de interface sobreposto. A abertura dos detalhes se parece mais com uma seção de demonstração.

Recomendação: banner próprio para cada oferta na mesma direção visual da home. Mover o mockup principal para a seção que explica a aplicação. Usar o mesmo sistema de composição, contraste, tipografia, espaçamento, botão e movimento, com imagens específicas para cada serviço.

Web e software reutilizam `build.webp`; imagens diferentes ajudam a reconhecer as duas ofertas. Não repetir a foto humano/robô da home em todas as páginas.

Fonte: `src/components/service-detail.tsx:17`, `src/components/service-artwork.tsx:8`, `src/components/services.module.css:19` e `src/components/conversion-home.tsx`.

### Média: reduzir repetição e linguagem administrativa

Expressões como “definimos”, “avaliamos”, “pode fazer parte” e “no escopo” aparecem em vários trechos. São condições válidas, mas a repetição reduz a força e a velocidade da leitura.

Organizar cada ideia uma vez: capacidade na oferta; aplicação no exemplo; dependência em “O que precisamos confirmar”; objeção na FAQ. Manter condições essenciais perto da promessa que elas qualificam.

Exemplo: substituir “rastreabilidade” por “registros para acompanhar o que foi enviado”, quando a explicação técnica não for necessária.

“Ver na prática” pode virar “Explorar exemplo” ou “Ver exemplo do fluxo”: o destino demonstra estados predeterminados de um conceito. Quando houver demonstração funcional ou caso autorizado, apresentá-lo com contexto, escopo e evidência próprios.

## Auditoria e proposta por página

Os textos seguintes são direções editoriais. Não constituem garantia de resultado, pacote fechado ou novo compromisso comercial.

### Catálogo de serviços

**Hoje:** o título “ampliar a capacidade da sua equipe” expressa a promessa operacional da home. A entrada de sites ampliou a oferta para presença digital, enquanto o CTA e a seção de combinação continuam centrados em processos internos.

**Ajuste:** apresentação abrangente seguida de mapa de problemas. Texto de apoio sugerido: “Criamos automações, agentes de IA, integrações, ferramentas internas e sites. Conheça o que podemos construir para o seu negócio.” CTA geral: “Falar sobre meu projeto”. Dar acesso rápido às cinco ofertas antes das apresentações extensas.

A seção “As peças se conectam” deve contemplar sites quando pertinente, por exemplo um site ligado ao atendimento ou ao CRM, sem afirmar que toda entrega precisa dessa combinação.

### Automação de processos

**Hoje:** categoria clara, mas o benefício depende de interpretar “da entrada de um pedido à próxima ação”. O exemplo é útil, porém a abertura não nomeia suficientemente o trabalho repetitivo.

**Título sugerido:** “Automatize as etapas repetitivas da sua rotina.”

**Texto de apoio:** “Receber pedidos, conferir informações e encaminhar tarefas: construímos fluxos para essas etapas, com aprovação humana onde ela é necessária.”

**Solução possível a explicar:** fluxo, regras, conexões com ferramentas, caminhos para exceções e acompanhamento das execuções. **CTA:** “Conversar sobre minha rotina”.

### Agentes de IA

**Hoje:** “contexto”, “ferramentas” e “limites claros” explicam o desenho técnico antes de deixar evidente a utilidade. “Tarefas reais” é amplo demais.

**Título sugerido:** “Agentes de IA para responder dúvidas e apoiar sua equipe.”

**Texto de apoio:** “Criamos agentes que consultam informações do negócio, apoiam o atendimento e preparam contexto para sua equipe continuar a conversa.”

**Solução possível a explicar:** tarefa definida, fontes aprovadas, canais e ferramentas autorizadas, critérios de encaminhamento e avaliação. Diferenciar atendimento externo e consulta interna. **CTA:** “Conversar sobre meu agente”.

### Integração de sistemas

**Hoje:** “os sistemas que você já usa, trabalhando juntos” é uma boa abertura. Falta explicitar com igual força a redução de redigitação e a conexão entregue.

**Título sugerido:** “Conecte seus sistemas sem redigitar as mesmas informações.”

**Texto de apoio:** “Integramos CRM, sistemas de gestão, planilhas e APIs para transferir dados com validação e registros de acompanhamento.”

**Solução possível a explicar:** origem e destino, campos, regras de envio, validação, registros e tratamento das falhas previstas. Manter a avaliação de viabilidade de cada ferramenta. **CTA:** “Conversar sobre minhas integrações”.

### Software sob medida

**Hoje:** o benefício de reunir solicitações é compreensível, mas se aproxima das outras demonstrações. A necessidade de construir uma ferramenta nova fica menos evidente que a metodologia de construção.

**Título sugerido:** “Uma ferramenta para o processo que seus sistemas não atendem.”

**Texto de apoio:** “Desenvolvemos ferramentas internas, painéis e aplicações web para organizar o trabalho, os dados e as decisões da sua equipe.”

**Solução possível a explicar:** interface, funções, dados, perfis de acesso e integrações; critérios de validação e responsabilidades da entrega. **CTA:** “Conversar sobre minha ferramenta”.

### Desenvolvimento Web

**Hoje:** é a oferta com objeto de compra mais reconhecível. “Desenvolvimento Web” é um rótulo amplo; “criação de sites” deve permanecer evidente. SEO e presença no Google precisam de uma expectativa concreta de preparação e acompanhamento.

**Título sugerido:** “Sites que apresentam sua empresa e facilitam o próximo contato.”

**Texto de apoio:** “Criamos sites institucionais e landing pages com a identidade da sua marca, navegação no celular e estrutura técnica preparada para o Google.”

**Solução possível a explicar:** páginas previstas, conteúdo, layout, canais de contato, publicação e SEO técnico. Confirmar produção de textos, domínio, hospedagem, manutenção e configuração de contas antes de declarar inclusões. **CTA:** “Conversar sobre meu site”.

O encerramento precisa falar sobre empresa, serviços e presença digital. Preservar a distinção entre SEO técnico, indexação, posição e mídia paga; tratar Perfil da Empresa conforme elegibilidade e escopo.

## Padrão recomendado de hero e sequência da página

1. Nome do serviço identificável.
2. Headline com benefício específico, conservando a categoria em contexto visível.
3. Texto curto que diga o que construímos e para qual situação.
4. CTA coerente com o próximo passo e link secundário para exemplo.
5. Fotografia contextual integrada ao banner; contraste e composição derivados da home.

No celular, mensagem, imagem e CTA devem compor uma entrada legível, sem exigir atravessar um painel extenso para reconhecer a oferta. Animação ambiental discreta, com alternativa estática para redução de movimento. Não usar ícones decorativos ou mockups como substituto de uma cena principal.

Depois do banner: reconhecimento do problema → solução/entrega possível → exemplo → como construímos → condições e FAQ → CTA específico. Manter conteúdo rastreável, URLs e dados de SEO ao trocar a apresentação.

## Pontos comerciais a confirmar antes de prometer

- Política de código, dados e documentação: a home afirma que ficam com a empresa; a FAQ de software diz que esses pontos serão definidos no escopo. Uniformizar com a política real.
- Quais itens compõem cada entrega e quais são opcionais ou contratados à parte.
- Como funciona acompanhamento, manutenção e suporte depois da publicação.
- Quais demonstrações ou resultados podem ser publicados como evidência autorizada.

## Achado no destino de contato

O hero mostra “Contexto recebido” antes do envio. A confirmação real aparece no formulário após envio bem-sucedido. O card inicial deveria explicar uma expectativa futura: “Depois do envio, uma pessoa lê seu contexto”. Isso evita confundir apresentação do processo com confirmação de uma ação.

Fonte: `src/app/contato/contact-hero.tsx:32` e `src/app/contato/contact-form.tsx:44`.

## Ordem de implementação recomendada

1. Fixar a mensagem e os componentes de oferta de cada serviço.
2. Ajustar catálogo, CTAs, encerramentos e destino de contato para essa mensagem.
3. Aplicar um hero cinematográfico compartilhado, com imagens próprias por oferta.
4. Enxugar repetições e colocar demonstrações e evidências no lugar adequado.
5. Validar leitura em desktop e celular, entendimento da oferta, contato e preservação de SEO.

Questions skipped: o pedido é uma auditoria; as informações disponíveis permitem entregá-la sem uma nova etapa de aprovação. Confirmações comerciais acima são decisões para a implementação, não bloqueios desta análise.

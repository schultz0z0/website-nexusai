# Nexus AI — Home de conversão consolidada

Data: 2026-08-25  
Status: design aprovado em conversa; revisão final do documento pendente  
Escopo: Home, navegação, contato e consolidação das rotas Soluções/Processo

## 1. Objetivo

Transformar o site em uma experiência direta de conversão que posicione a Nexus AI como uma empresa que entende problemas operacionais e constrói soluções digitais sob medida. A Home deve conter todo o argumento necessário para o visitante compreender a proposta, reconhecer aplicações possíveis, reduzir risco percebido e iniciar uma conversa.

A persuasão deve vir de clareza, ritmo, demonstrações funcionais, transparência e especificidade. Não serão usados clientes, resultados, métricas ou depoimentos inexistentes.

## 2. Posicionamento central

Mensagem estratégica:

> Você traz o problema. A Nexus constrói o que ele exige.

Categoria:

> Soluções digitais sob medida para problemas reais de operação.

Explicação:

> A solução pode ser uma automação, um agente, uma integração, um dashboard ou um produto inteiramente novo. A forma muda. O objetivo é resolver.

A Nexus não será apresentada como catálogo de dois produtos nem como fornecedora genérica que “faz qualquer coisa”. O limite de atuação é claro: problemas de operação, atendimento, vendas, dados, integração e produtos digitais que possam ser resolvidos com software, automação e IA.

## 3. Restrições aprovadas

- O design, a composição e o comportamento do Hero permanecem intactos.
- A copy do Hero permanece intacta.
- O design, a composição 3D, o painel e a animação da seção azul permanecem intactos.
- A copy da seção azul pode ser revisada.
- A partir da terceira seção, design, estrutura, 3D, animações e microinterações podem mudar.
- Não usar a palavra anteriormente rejeitada pelo usuário na copy pública.
- Não apresentar demonstrações como cases de clientes.
- Não exibir métricas de clientes, setores atendidos, implantações em clientes ou resultados não comprováveis.
- Não fazer commit nem push; todo o trabalho permanece local.

## 4. Arquitetura de informação

### Rotas públicas principais

- `/` — narrativa completa de conversão.
- `/contato` — página curta, focada e sem narrativa cinematográfica longa.
- `/privacidade` — política de privacidade acessível pelo rodapé.

### Rotas consolidadas

- `/solucoes` redireciona permanentemente para `/#aplicacoes`.
- `/processo` redireciona permanentemente para `/#como-trabalhamos`.

O conteúdo útil dessas rotas será absorvido pela Home antes dos redirecionamentos. As rotas não permanecerão na navegação principal.

### Navegação

Desktop:

```text
[logo]                                      [Falar com a equipe →]
```

Mobile:

```text
[logo]                                                   [Falar]
```

- Remover links “Soluções” e “Processo”.
- Remover o menu hambúrguer, pois não haverá menu principal para expandir.
- Manter uma tarja flutuante translúcida no mobile.
- No desktop, usar uma barra horizontal discreta alinhada ao shell da Home, com logo à esquerda e CTA à direita.
- Links utilitários e legais permanecem no rodapé.

## 5. Narrativa final da Home

### Seção 1 — Hero

Estado: congelada.

Nenhuma mudança visual ou textual.

### Seção 2 — Transformação operacional

Estado: design congelado; copy revisável.

Eyebrow:

> DO TRABALHO REPETITIVO AO RESULTADO

Título:

> Trabalho repetitivo vira  
> capacidade.

Lead:

> Não encaixamos sua empresa em um produto pronto. Entendemos o problema, conectamos o que já existe e construímos a solução necessária.

Resultados:

1. **Tempo recuperado** — Horas voltam para atendimento, decisão e crescimento.
2. **Menos retrabalho** — Dados circulam entre sistemas sem copiar, colar ou conferir duas vezes.
3. **Mais capacidade para crescer** — O volume aumenta sem a equipe crescer na mesma proporção.

Fluxo:

1. **Localizamos onde o tempo se perde** — Tarefas, volume, exceções, sistemas e custo manual.
2. **Automatizamos com controle** — Integrações, regras e aprovações humanas dentro da rotina atual.
3. **Medimos o que mudou** — Tempo poupado, erros evitados e capacidade entregue.

O rodapé do painel mantém a objeção “Sem trocar toda a sua operação”.

### Seção 3 — Amplitude sob medida

ID: `aplicacoes`

Substitui a seção de métricas não comprováveis.

Eyebrow:

> SOB MEDIDA, DE VERDADE

Título:

> Seu problema não precisa caber numa ferramenta pronta.

Texto:

> A solução pode ser uma automação, um agente, uma integração, um dashboard ou um produto inteiramente novo. A forma muda. O objetivo é resolver.

Capacidades exibidas:

- **Automatizar o repetitivo.** Para a equipe voltar ao trabalho que exige decisão.
- **Conectar o que está separado.** Sistemas, dados e pessoas operando no mesmo fluxo.
- **Transformar dados em decisão.** Menos relatório manual. Mais contexto na hora certa.
- **Construir o que ainda não existe.** Ferramentas internas e produtos digitais desenhados para a realidade da empresa.

Design:

- Composição escura e respirada para funcionar como descanso após a seção azul.
- Núcleo visual central que muda de forma conforme cada capacidade entra em foco: agente, integração, dashboard e produto.
- Microinteração de hover/foco no desktop e controle por toque em abas no mobile.
- Sem pinning longo.
- Informações essenciais sempre visíveis sem depender de hover.

### Seção 4 — Demonstrações funcionais

Eyebrow:

> DA IDEIA À OPERAÇÃO

Título:

> Dois exemplos. Não um catálogo.

Texto:

> Nexus Stock e Nexus Copilot mostram como transformamos contextos diferentes em soluções funcionais. O próximo projeto começa no problema da sua empresa.

Tratamento de cada exemplo:

- Rótulo obrigatório: “Demonstração funcional”.
- Nunca usar “case”, “cliente”, “resultado comprovado” ou linguagem equivalente.
- Explicar contexto, solução construída e decisões que continuam humanas.
- Remover links para `/solucoes`.
- Cada demonstração termina com “Falar sobre algo parecido”, direcionando a `/contato`.

Design e movimento:

- Uma única seção de maior investimento cinemático depois da seção azul.
- Desktop: galeria horizontal entre os dois dashboards controlada por scroll.
- Dashboards com perspectiva 3D, tilt leve, spotlight e profundidade reativa ao cursor.
- Mobile: cards empilhados em fluxo natural, sem conteúdo escondido em hover e sem tilt de ponteiro.
- `prefers-reduced-motion` remove scrub, parallax e tilt, mantendo as duas demonstrações legíveis.
- Referência principal: `referencias-animações/secoes/HorizontalCasesGsap.tsx`.
- Referência secundária: `referencias-animações/microinteracoes/ProjectHoverPreview.tsx`.

### Seção 5 — Como trabalhamos e redução de risco

ID: `como-trabalhamos`

Absorve o conteúdo realmente útil da rota Processo e substitui os cards genéricos atuais.

Eyebrow:

> PERSONALIZADO, NÃO IMPROVISADO

Título:

> Antes de construir, deixamos quatro coisas claras.

Blocos:

1. **Começa pelo contexto.** Entendemos processo, pessoas, dados, volume e impacto antes de definir tecnologia.
2. **Integra com o que já funciona.** A solução entra na operação sem exigir que tudo seja substituído.
3. **Mantém decisões sob controle.** Regras, aprovações, registros e limites fazem parte do sistema.
4. **Continua sendo seu.** Código, dados e documentação ficam com a empresa.

Design e movimento:

- Manter o contraste de superfície clara como mudança de ritmo, mas abandonar o grid SaaS genérico.
- Usar uma composição editorial: título forte e cartões que se revelam como camadas de um documento de decisão.
- Revelação por scroll curta e natural; não criar um terceiro pinning extenso.
- Cada item responde a uma objeção real e expande detalhes no clique/foco.
- Referência: `referencias-animações/secoes/StickyStorySection.tsx`, adaptada sem scroll-jacking.

### Seção 6 — CTA e FAQ

Eyebrow:

> CONVERSA INICIAL

Título:

> Tem um problema que nenhuma ferramenta pronta resolveu?

Texto:

> Conte o contexto. A gente ajuda a descobrir qual solução faz sentido construir. Se não houver uma oportunidade real, você também saberá.

CTA:

> Falar com a equipe

Microcopy:

> Sem compromisso · uma pessoa responde · retorno em até 1 dia útil

FAQ:

- Porte é menos importante que volume, repetição e impacto do processo.
- Como a Nexus integra ferramentas já existentes.
- Como decisões humanas, limites e registros entram na solução.
- Como código, dados e documentação são entregues.
- Como prazo e investimento são definidos depois do contexto inicial.
- Como segurança e LGPD são tratadas, apenas com afirmações que representem práticas reais.

Não prometer faixa de preço, ROI, prazo de implementação ou garantia enquanto esses compromissos não estiverem comercialmente definidos.

## 6. Página de contato

Objetivo: reduzir o intervalo entre intenção e envio do contexto.

Estrutura:

1. Headline direta.
2. Explicação curta do que será feito com a mensagem.
3. Formulário imediatamente visível.
4. Três próximos passos compactos.
5. Alternativa de contato por email.

Headline:

> Conte o problema. A gente começa pelo contexto.

Texto:

> Não precisa escrever um projeto. Explique o que consome tempo, quem é impactado e o que você gostaria que funcionasse melhor.

Campos:

- Nome — obrigatório.
- Email — obrigatório.
- Empresa — opcional.
- Contexto — obrigatório.

Remover os campos Cargo e Setor. A classificação atual de “Setor” contém áreas/departamentos e aumenta atrito sem ser necessária antes da conversa.

Manter confirmação de leitura humana e retorno em até 24 horas úteis somente se esse prazo puder ser cumprido.

O contato não terá pinning, corredor cinematográfico ou narrativa extensa antes do formulário. Movimento será limitado a entrada, feedback de campos, envio e sucesso.

## 7. Honestidade e prova de capacidade

Remover da experiência pública:

- “12+ plataformas operando”.
- “Em cliente, com uso real”.
- “8 setores atendidos”.
- “100% suporte contínuo” apresentado como estatística.
- Qualquer número, cliente, depoimento ou resultado não verificável.

Substitutos permitidos:

- Demonstrações funcionais claramente identificadas.
- Fluxos e interfaces navegáveis.
- Explicação do raciocínio e das decisões técnicas.
- Transparência sobre propriedade de código e dados.
- Descrição do processo proposto, sem fingir histórico de clientes.
- Compromissos comerciais apenas quando forem verdadeiros e sustentáveis.

## 8. Sistema visual e movimento

- Preservar Space Grotesk, dark mode, azul elétrico, superfícies glass e profundidade cinematográfica atuais.
- Uma função por efeito: demonstrar relação, mostrar mudança de estado, direcionar atenção ou reforçar ação.
- Seção azul continua sendo o primeiro momento 3D/pinned.
- Demonstrações são o segundo e último pinning extenso.
- Seção de amplitude usa microinterações, não pinning.
- Seção de redução de risco usa revelação editorial curta.
- CTA usa magnetismo leve no desktop e feedback de pressão convencional no mobile.
- Nunca combinar vídeo pesado, cursor com partículas e múltiplas cenas pinned.
- Todo loop visual pausa fora da viewport.
- Mobile não depende de hover nem usa tilt de cursor.
- Toda animação possui modo estático para `prefers-reduced-motion`.

## 9. Conteúdo e implementação

- Centralizar a nova copy em `src/lib/content.ts`, preservando uma única fonte de conteúdo comercial.
- Evitar novos textos comerciais extensos hardcoded dentro dos componentes.
- Reutilizar dashboards existentes como demonstrações.
- Reaproveitar GSAP e Framer Motion já instalados; não adicionar biblioteca de animação.
- Atualizar metadata e dados estruturados para refletir “soluções digitais sob medida”, sem alegações de clientes.
- Atualizar sitemap após os redirecionamentos.
- O rodapé usa a logo oficial e remove links para as rotas consolidadas.

## 10. Verificação

### Testes de conteúdo

- Hero continua com texto e estrutura atuais.
- Seção azul mantém os elementos visuais existentes e recebe apenas copy nova.
- Nenhuma página pública contém a palavra rejeitada.
- Nenhuma página pública contém as alegações de clientes removidas.
- Demonstrações são identificadas como demonstrações, não cases.

### Testes de navegação

- Desktop contém apenas logo e CTA principal.
- Mobile contém apenas logo e CTA compacto, sem botão hambúrguer.
- `/solucoes` redireciona para `/#aplicacoes`.
- `/processo` redireciona para `/#como-trabalhamos`.
- `/contato` e `/privacidade` permanecem acessíveis.

### Testes visuais e responsivos

- Viewports mobile, tablet, desktop, ultrawide e desktop de baixa altura.
- Nenhuma colisão entre navegação, hero ou títulos.
- Cards e dashboards permanecem dentro do viewport.
- Conteúdo essencial legível com movimento reduzido.
- Formulário de contato aparece sem scroll excessivo.

### Verificações técnicas

- Testes unitários.
- Testes Playwright específicos da narrativa e navegação.
- ESLint nos arquivos alterados.
- Build de produção, registrando separadamente qualquer falha preexistente fora do escopo.

## 11. Critérios de aceite

- A Home comunica explicitamente que a Nexus constrói soluções sob medida.
- Stock e Copilot não parecem os únicos produtos disponíveis.
- Nenhuma prova social ou métrica de cliente é inventada.
- Hero e design da seção azul permanecem visualmente intactos.
- A seção azul não usa a palavra rejeitada.
- As seções posteriores formam a sequência amplitude → demonstração → redução de risco → conversa.
- Navegação oferece apenas logo e CTA.
- Contato fica mais curto e direto.
- Soluções e Processo deixam de competir como rotas principais.
- A experiência continua premium, acessível e funcional em mobile e movimento reduzido.

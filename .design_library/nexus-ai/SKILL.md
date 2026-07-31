---
name: nexus-ai-design
description: Use este skill para criar interfaces e ativos da Nexus AI, empresa brasileira de soluções digitais com IA. Reúne decisões essenciais, tokens e seis contratos de componentes para experiências web dark-first.
user-invocable: true
---
# Nexus AI Design Skill

Use esta entrada para produzir interfaces tecnológicas, diretas, premium, cinematográficas e confiáveis em pt-BR. Consulte `README.md` para contexto completo antes de entregas extensas.

## Quick Map
- `README.md` — narrativa da marca, voz e fundamentos visuais.
- `css.json` — fonte estruturada para compreender tokens; leia antes de decidir valores.
- `colors_and_type.css` — fonte de variáveis em runtime; vincule ao artefato, não use no lugar de `css.json` para interpretar tokens.
- `components/index.json` — índice dos seis componentes e prioridades.
- `components/{slug}.json` — intenção, variantes e estados por componente.
- `preview/component-{slug}.html` — primeira fonte para DOM e CSS; contratos informam intenção e variantes, e `_evidence/{slug}.json` é apenas fallback quando existir e o preview for insuficiente.
- `uikit-plan.json` — whitelist e ordem dos componentes, nunca fonte de estilo.
- `ui_kits/website/` — UI Kit de referência quando disponível; pode consultar `_evidence/` se o preview não bastar, mantendo o preview como primeira fonte.
- `library-consumption.json` — ordem recomendada de leitura para agentes.

## Essentials at a glance
- A assinatura é o azul elétrico `#3778ff` sobre palco `#050609`, com superfícies elevadas `#090b10` e linhas `rgba(255, 255, 255, 0.10)`.
- Tipografia principal **Space Grotesk** em pesos `300–700`; títulos chegam a `96px`, enquanto texto mono usa **Geist Mono** com fallback técnico e base de `14px`.
- Raios vão de `6px` a `26px`; `10px` é a base e `9999px` fica reservado para pílulas, equilibrando precisão e vidro sutil.
- Controles usam `48px` para botões, `36px` para inputs e `44px` para gatilhos de navegação; a escala de espaço parte de `1px` e usa `8px` como passo recorrente.
- Sombras são profundas e contextuais: navegação usa `0 4px 16px rgba(0,0,0,0.30)`; o CTA cinematográfico combina elevação com halo azul `rgba(55,120,255,0.14)`.
- Movimento é deliberado: hover de CTA em `180ms ease`, pressão em `200ms ease-out`, drawer em `300ms ease-out` e entrada de hero em `1000ms ease-out`.
- Voz em pt-BR, concreta e sem hype vazio: verbos diretos, CTAs curtos e nenhuma construção com travessão; exemplos autorizados incluem “Soluções”, “Processo” e “Falar com a equipe”.
- Padrão de assinatura: vidro grafite discreto, hairlines claras e brilho azul controlado, nunca gradientes decorativos sem função.

## Componentes
| Componente | Slug | Preview | Contrato | Uso-chave |
|---|---|---|---|---|
| Botão | `button` | `preview/component-button.html` | `components/button.json` | Ações claras com brilho controlado e deslocamento mínimo. |
| Navegação | `navigation` | `preview/component-navigation.html` | `components/navigation.json` | Pílula de vidro no desktop e drawer cinematográfico no mobile. |
| Campo de formulário | `form-field` | `preview/component-form-field.html` | `components/form-field.json` | Campos escuros, diretos e foco azul inequívoco. |
| Card | `card` | `preview/component-card.html` | `components/card.json` | Superfícies profundas, borda luminosa e hierarquia editorial. |
| Accordion | `accordion` | `preview/component-accordion.html` | `components/accordion.json` | FAQ leve com hairlines e movimento curto. |
| Badge | `badge` | `preview/component-badge.html` | `components/badge.json` | Sinalização compacta em caixa alta e tracking técnico. |

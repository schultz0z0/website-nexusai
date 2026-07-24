# Nexus AI — Design System

> Tokens, padrões e guia de uso extraídos do que está **implementado** no hero.
> A fonte da verdade é o código (`src/app/globals.css` + `src/components/`).
> Este documento é o espelho legível para humanos.

Versão: 0.1.0 · Última atualização: 2026-07-24

---

## 1. KV (Key Visual)

**Identidade**: marca de soluções digitais com IA. Visual noturno, técnico, refinado.
**Tema**: dark forçado (`<html class="dark">` em `layout.tsx`).
**Tipografia com peso**: Space Grotesk extrabold no título, serif italic na palavra de contraste.
**Fricção visual intencional**: canvas de pixels que respira (radial pulse), título com efeito "tahoe glass" (gradient animado), nav com sheen deslizante.

---

## 2. Cores

### Base (shadcn dark, slate base)

| Token | Valor | Uso |
|---|---|---|
| `background` | `oklch(0.145 0 0)` | Fundo da página (canvas principal) |
| `foreground` | `oklch(0.985 0 0)` | Texto primário |
| `card` | `oklch(0.205 0 0)` | Superfícies elevadas (nav pill, CTA secundário) |
| `card-foreground` | `oklch(0.985 0 0)` | Texto em superfícies elevadas |

### Brand

| Token | Valor | Uso |
|---|---|---|
| `primary` | `oklch(0.922 0 0)` | Preenchimento do CTA primário (quase branco) |
| `primary-foreground` | `oklch(0.205 0 0)` | Texto sobre CTA primário (quase preto) |
| `muted-foreground` | `oklch(0.708 0 0)` | Dots do canvas, texto secundário |

### Border / Focus

| Token | Valor | Uso |
|---|---|---|
| `border` | `oklch(1 0 0 / 10%)` | Hairlines em dark |
| `ring` | `oklch(0.556 0 0)` | Foco de teclado |

### Decorativas (efeitos visuais, não usar fora do hero/KV)

| Token | Valor | Uso |
|---|---|---|
| `tahoe-glass-stops` | gradient 6 stops, branco com α 0.1 → 1.0 | Título hero |
| `nav-sheen-stops` | gradient 5 stops, branco com α 0 → 0.28 | Sheen da nav pill |

---

## 3. Tipografia

**Famílias** (via `next/font/google`):

- **Sans** — Space Grotesk (todos os pesos)
- **Mono** — Geist Mono (reservado, pouco usado)
- **Serif** — fallback do browser (itálico no título do hero)

**Hierarquia do hero**:

| Elemento | Mobile | sm (640+) | md (768+) | lg (1024+) |
|---|---|---|---|---|
| Título | `2.65rem` / `leading 0.95` | `3rem` (text-5xl) | `4.5rem` (text-7xl) | `6rem` (text-8xl) |
| Descrição | `0.875rem` (text-sm) | `1.125rem` (text-lg) | `1.25rem` (text-xl) | mesmo |
| CTA | `0.875rem` (text-sm) | mesmo | mesmo | mesmo |
| Nav link | n/a (escondido) | `0.875rem` (text-sm) | mesmo | mesmo |
| Marquee label | `10px` | n/a | `0.75rem` | mesmo |

**Pesos em uso**: 300 (description), 400 (default), 500 (nav/marquee), 600 (CTA), 800 (título sans extrabold).

**Tracking**: tahoe `1.5px` (efeito). Marquee label `0.18em` (uppercase).

---

## 4. Espaçamento

| Uso | Valor | Classe |
|---|---|---|
| Padding página mobile | `1rem` | `px-4` |
| Padding página desktop | `1.5rem` | `sm:px-6` |
| Gap entre seções (mobile) | `1.75rem` | `gap-7` |
| Gap entre seções (desktop) | `1.5rem` | `md:gap-6` |
| Padding vertical hero (mobile) | `5rem` | `py-20` (reserva pro hamburger flutuante) |
| Altura de CTA (touch target) | `3rem` | `h-12` |
| Gap entre CTAs | `0.75rem` | `gap-3` |
| Gap entre logos no marquee | `4rem` (desktop) / `2rem` (mobile) | `gap-16` / `gap-8` |
| `pr-16` entre grupos duplicados do marquee | `4rem` | `pr-16` — costureira do loop |

---

## 5. Raios

Base shadcn: `0.625rem` (10px).

| Token | Valor | Uso |
|---|---|---|
| `rounded-full` | `9999px` | Nav pill, CTA arredondado total |
| `rounded-2xl` | `0.875rem` (14px) | Botões CTA, drawer mobile |
| `rounded-xl` | `0.75rem` (12px) | Não usado ainda, disponível |

---

## 6. Sombras

| Token | Valor | Uso |
|---|---|---|
| Nav pill | `inset 0 1px 1px rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.3)` | Profundidade flutuante |
| Drawer mobile | `0 8px 32px rgba(0,0,0,0.4)` | Elevação acima do scrim |
| CTA primário | `inset 0 1px 1px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.15)` | Botão "iluminado" |
| CTA secundário | `inset 0 1px 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.05), 0 12px 24px rgba(0,0,0,0.05)` | Variante mais discreta |

---

## 7. Movimento

| Token | Valor | Uso |
|---|---|---|
| `tahoe-shimmer` | `8s linear infinite` | Sweep de gradient no título |
| `nav-sheen` | `12s linear infinite` | Sheen deslizando pela nav pill |
| `marquee` | `25s linear infinite` | Scroll horizontal das logos |
| `cta-press` | `200ms ease-out` | Scale em hover/active |
| `drawer-open` | `300ms ease-out` | Fade + scale do drawer mobile |
| `hero-enter` | `1000ms ease-out` | Fade-in dos elementos ao montar |
| Canvas pulse step | `maxSize * 0.012` por frame | Respiração dos pixels (ciclo ~3-4s) |
| Canvas opacity | `0.35` | Dots do background do hero |

**Princípio de movimento**: nada é instantâneo, nada é rápido. Movimentos longos (8-25s) para ambientar, curtos (200-300ms) só para feedback de toque/clique.

---

## 8. Breakpoints

| Nome | Valor | Comportamento |
|---|---|---|
| `sm` | 640px | (não usado pra layout no hero) |
| `md` | **768px** | Limite mobile ↔ desktop: nav pill aparece, hamburger some, CTAs ficam side-by-side, marquee desktop aparece |
| `lg` | 1024px | Título sobe pra `text-8xl` |

---

## 9. Componentes

### Nav desktop (`md:block`)

```
container  rounded-full bg-card/40 backdrop-blur-md px-2 py-2 ring-1 ring-border/50
link       px-4 py-2 text-sm font-medium text-foreground/85 hover:text-foreground rounded-full
cta        ml-1 h-9 px-4 rounded-full bg-gradient-to-b from-primary/90 to-primary text-xs font-semibold
```

### Nav mobile (`md:hidden`)

```
trigger    fixed top-4 right-4 h-11 w-11 rounded-full bg-card/60 backdrop-blur-md (Menu/X icon)
drawer     rounded-2xl bg-card/70 backdrop-blur-xl ring-1 ring-border/50
link       px-4 py-3.5 text-base font-medium text-foreground/90
cta        px-4 py-3 rounded-xl bg-gradient-to-b from-primary/90 to-primary
```

### CTA primário

```
shape   h-12 px-6 md:px-8 rounded-xl
fill    bg-gradient-to-b from-primary/90 to-primary
text    text-sm font-semibold text-primary-foreground
shadow  inset 0 1px 1px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.15)
ring    ring-1 ring-primary/20
press   hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200
```

### CTA secundário

```
shape   h-12 px-6 md:px-8 rounded-xl
fill    bg-gradient-to-b from-card/80 to-card backdrop-blur-md
text    text-sm font-semibold text-card-foreground
shadow  inset 0 1px 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.05), 0 12px 24px rgba(0,0,0,0.05)
ring    ring-1 ring-border/50
```

### Título hero

Classe `.tahoe-glass-text` (definida em `globals.css @layer components`).

```
font-serif italic font-medium  (word1, contraste)
font-sans font-extrabold tracking-tighter  (word2, principal)
text-[2.65rem] leading-[0.95] sm:text-5xl md:text-7xl lg:text-8xl
gap-1.5 sm:gap-3 md:gap-5 lg:gap-6
```

### Canvas de pixels

```
wrapper    absolute inset-0 z-0 pointer-events-none
classes    .pixel-canvas-fade (opacity 0.35, fade-in 1.2s on mount)
animation  pulse() — radial wave expand → contract → expand forever
           respeita prefers-reduced-motion (mostra apenas uma vez)
```

---

## 10. Voz & Copy

| Aspecto | Diretriz |
|---|---|
| Idioma | **pt-BR** |
| Tom | Tecnológico, direto, confiante. Sem hype vazio. |
| Nome | Citar **Nexus AI** na primeira frase sempre que possível |
| Verbos | Concretos (automatizam, integram, entregam) > abstratos (transformam, revolucionam) |
| Pontuação | Sem travessão decorativo — preferir ponto final |
| CTAs | ≤2 palavras no mobile, ≤3 no desktop |
| Descrição | 1 linha, ≤120 chars |

**Exemplos prontos**:

| Campo | Copy atual |
|---|---|
| word1 | `Soluções` |
| word2 | `Nexus AI` |
| descrição | `Plataformas e agentes de IA que automatizam processos, integram dados e entregam produtos digitais prontos pra escalar.` |
| CTA primário | `Solicitar Proposta` (mobile: `Proposta`) |
| CTA secundário | `Ver no GitHub` (mobile: `GitHub`) |
| Nav | Soluções · Cases · Processo · Contato · Falar |
| Title do documento | `Soluções Nexus AI` |

---

## 11. Acessibilidade

- `prefers-reduced-motion: reduce` desativa o pulse do canvas e o fade-in
- Foco visível via `outline-ring/50` no `@layer base`
- Nav mobile drawer: `aria-expanded`, `aria-label`, fecha ao clicar fora ou em link
- Contraste mínimo verificado: texto foreground sobre background ≈ 17:1 (AAA)

---

## 12. Como continuar a partir daqui

Quando for adicionar uma seção nova (cases, processo, sobre):

1. **Reuse tokens**: nada de hex hardcoded, sempre `bg-card`, `text-foreground`, `rounded-2xl`, etc.
2. **Reuse componentes**: `.tahoe-glass-text` é reutilizável em qualquer título de seção (não usar em texto pequeno)
3. **Siga o ritmo**: `gap-6` a `gap-10` entre seções, `py-20` mobile
4. **Mantenha dark forçado** até ter sistema de tema completo
5. **Adicione ao JSON** qualquer token novo, atualize este MD

Padrões a NÃO introduzir sem revisar:
- Outra fonte (sempre Space Grotesk)
- Cantos `rounded-none` ou `rounded-sm` (sempre `rounded-xl` ou mais)
- Animações < 200ms ou > 30s
- Cores fora da paleta shadcn slate

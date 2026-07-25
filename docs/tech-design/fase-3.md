# Tech Design — Fase 3: Home cinemática (multiatos pinned)

> Diagrama primeiro, código depois. Este doc é a **fonte de verdade** da implementação. PRD em `docs/prd/fase-3-home-cinematica.md`.

## Visão geral da arquitetura

```
┌────────────────────────────────────────────────────────────────────┐
│ <RootLayout> — html.dark, Space Grotesk, Geist Mono               │
│   ├ <NexusNav />                                                   │
│   ├ <main>                                                         │
│   │   └ <CinematicHome>   ← NOVO — "use client"                    │
│   │       ├ <Ato1_Hero />      GSAP introTl + scrub pin ~600vh    │
│   │       ├ <Ato2_Manifesto /> wrapper do atual ManifestoSection  │
│   │       ├ <Ato3_Metrics />   Scrub ~300vh — counters escalonados │
│   │       ├ <Ato4_Pillars />   Scrub ~400vh — dominó 3D           │
│   │       ├ <Ato5_ShowcaseStock />  Scrub ~400vh                  │
│   │       ├ <Ato5_ShowcaseCopilot /> Scrub ~400vh                 │
│   │       ├ <Ato6_Bento />     Scrub ~300vh — scale+blur          │
│   │       ├ <Ato7_Stack />     SEM pin (renderiza inline)        │
│   │       ├ <Ato8_CtaFinal />  Pin curto ~50vh — pulse loop       │
│   │       ├ <Ato9_Faq />       SEM pin (accordion inline)         │
│   │       └ <GSAPMaster>      coordena timeline global           │
│   └ <SiteFooter />                                                 │
└────────────────────────────────────────────────────────────────────┘
```

**Decisão chave**: o ato Manifesto (que hoje já é sticky scroll-pinned via framer-motion) ganha **wrapper de integração com o GSAP master** mas mantém a mecânica interna. Não reescrevemos ele.

## Coordenação dos pinos (orquestrador)

Três abordagens possíveis. **Decidi por uma** antes de ver trade-offs:

| Opção | Pro | Contra | Decisão |
|---|---|---|---|
| A) 1 ScrollTrigger com `pin: true` cobrindo 100% da home, 9 sub-timelines dentro | Simples | 1 timeout gigante, 1 reflow, GSAP não reciclando | ❌ |
| B) N ScrollTriggers encadeados (cada ato é um trigger próprio) | Reciclagem natural | Sincronização entre eles se virar inferno | ✅ (escolhida) |
| C) Snap Scroll (CSS `scroll-snap-type`) | Mobile-friendly | Substitui scrub, perde controle fino | ❌ |

### Opção B em detalhe

```ts
// src/lib/cinematic-timeline.ts
export type AtoBounds = { id: string; el: HTMLElement; vh: number };

export function useCinematicMaster(atoRefs: React.RefObject<HTMLElement>[]) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const atoEls = atoRefs.map(r => r.current).filter(Boolean) as HTMLElement[];
    if (atoEls.length === 0) return;

    const ctx = gsap.context(() => {
      atoEls.forEach((el, i) => {
        const next = atoEls[i + 1];
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: next ? `bottom top` : "bottom bottom",
          pin: true,
          pinSpacing: true,    // reserva espaço entre atos
          anticipatePin: 1,
        });
      });
    });
    ctxRef.current = ctx;
    return () => ctx.revert();
  }, [atoRefs]);

  return ctxRef;
}
```

**Cada ato declara seu próprio scrub interno** (ex: ato Hero tem scrub pin de 600vh onde a animação acontece). O `pinSpacing: true` é o que faz o scroll "andar" entre os atos — sem isso, o usuário fica preso no primeiro ato pra sempre.

### Sincronização entre atos

O caso que **pode dar ruim**: ato N termina revelando algo e ato N+1 começa com a animação já em estado final. Mitigação:
- Cada ato reseta seu próprio estado no `useEffect` mount (já é o padrão com `gsap.set` no início do timeline)
- Quando ato N termina o pin, ato N+1 já deve estar visível no `pinSpacing`; transição é mecânica, não cross-fade

## Estrutura de arquivos (delta)

```
src/
├── app/
│   └── page.tsx                            (REFACTOR — orquestra 9 atos)
├── components/
│   ├── cinematic/
│   │   ├── cinematic-home.tsx              (NOVO — master "use client")
│   │   ├── ato-hero.tsx                    (NOVO — ato 1)
│   │   ├── ato-manifesto.tsx               (NOVO — wrapper do atual)
│   │   ├── ato-metrics.tsx                 (NOVO — ato 3)
│   │   ├── ato-pillars.tsx                 (NOVO — ato 4)
│   │   ├── ato-showcase.tsx                (NOVO — wrapper do ProductShowcase)
│   │   ├── ato-bento.tsx                   (NOVO — wrapper do BentoCapabilities)
│   │   ├── ato-stack.tsx                   (NOVO — wrapper do StackSection)
│   │   ├── ato-cta-final.tsx               (NOVO — ato 8)
│   │   ├── ato-faq.tsx                     (NOVO — wrapper do FaqSection)
│   │   └── _styles.ts                      (NOVO — INJECTED_STYLES do SobersHero)
│   ├── mock-dashboards.tsx                 (MANTIDO — usado dentro do ato Hero)
│   ├── product-showcase.tsx                (MANTIDO)
│   ├── bento-capabilities.tsx              (MANTIDO)
│   └── ... (demais existentes, mantidos)
├── lib/
│   ├── cinematic-timeline.ts               (NOVO — orquestrador)
│   ├── cinematic-reduced-motion.ts         (NOVO — helper)
│   └── content.ts                          (REFACTOR — mover copy do Hero pra cá)
└── components/ui/cinematic-landing-hero.tsx (DELETAR após migração)
```

## INJECTED_STYLES — onde ficam

Não ficam em `<style dangerouslySetInnerHTML>` em cada componente (DRY).

**Solução**: arquivo `src/components/cinematic/_styles.ts` exporta constante `CINEMATIC_INJECTED_CSS`. **`CinematicHome`** injeta 1 vez no `<style>` global do `<head>` via `useLayoutEffect`. Cada componente ato usa só `className`.

```ts
// src/components/cinematic/_styles.ts
export const CINEMATIC_INJECTED_CSS = `
  /* copiado verbatim do SobersHero — sem modificação */
  .gsap-reveal { visibility: hidden; }
  .film-grain { ... }
  .bg-grid-theme { ... }
  .premium-depth-card { ... }
  /* etc */
`;
```

```tsx
// src/components/cinematic/cinematic-home.tsx
useLayoutEffect(() => {
  const id = "cinematic-styles";
  if (document.getElementById(id)) return; // idempotente
  const el = document.createElement("style");
  el.id = id;
  el.textContent = CINEMATIC_INJECTED_CSS;
  document.head.appendChild(el);
  return () => { document.getElementById(id)?.remove(); };
}, []);
```

**Caveat**: SSR. `document` não existe no server. Por isso `useLayoutEffect` é a escolha certa (executa só client-side, após hidratação). Alternativa era `<style>` inline em `layout.tsx`, mas isso injeta em **todas** as rotas (não queremos — outras rotas não usam isso).

## Ato 1 — Hero (cinematic puro)

### Sub-componente: `<AtoHero />`

```tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronRight } from "lucide-react";
import { StockMockDashboard } from "@/components/mock-dashboards";
import { HERO_COPY, COMPANY } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/cinematic-reduced-motion";
import { isMobile } from "@/lib/cinematic-mobile";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AtoHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  // Mouse parallax (verbatim da Sobers)
  useEffect(() => {
    if (reducedMotion) return;
    const handle = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (!cardRef.current || !mockupRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(mockupRef.current, {
          rotationY: x * 12,
          rotationX: -y * 12,
          ease: "power3.out",
          duration: 1.2,
        });
      });
    };
    window.addEventListener("mousemove", handle);
    return () => {
      window.removeEventListener("mousemove", handle);
      cancelAnimationFrame(requestRef.current);
    };
  }, [reducedMotion]);

  // Scroll timeline (verbatim da Sobers, com ajustes nos textos)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set(".hero-tagline", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)" });
      gsap.set(".hero-tagline-2", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set([".hero-badge-float", ".hero-cta", ".hero-mockup"], { autoAlpha: 0 });

      // Intro
      gsap.timeline({ delay: 0.3 })
        .to(".hero-tagline", { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.8, ease: "expo.out" })
        .to(".hero-tagline-2", { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power4.inOut" }, "-=1.0");

      // Scrub pin
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: "top top", end: "+=6000", pin: true, scrub: 1, anticipatePin: 1 },
      });
      tl.to(".hero-tagline", { scale: 1.15, filter: "blur(20px)", opacity: 0.2, duration: 2 }, 0)
        .to(".hero-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".hero-card", { width: "100%", height: "100%", borderRadius: "0px", duration: 1.5 })
        .fromTo(".hero-mockup",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, duration: 2.5, ease: "expo.out" },
          "-=0.8")
        .fromTo(".hero-badge-float", { y: 100, autoAlpha: 0, scale: 0.7 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.2, duration: 1.5, ease: "back.out(1.5)" }, "-=2.0")
        .to({}, { duration: 2.5 })
        .set(".hero-tagline", { autoAlpha: 0 })
        .set(".hero-cta", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to(".hero-mockup", { scale: 0.9, y: -40, z: -200, autoAlpha: 0, duration: 1.2, ease: "power3.in" })
        .to(".hero-card", {
          width: isMobile() ? "92vw" : "85vw",
          height: isMobile() ? "92vh" : "85vh",
          borderRadius: isMobile() ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8,
        }, "pullback")
        .to(".hero-cta", { scale: 1, filter: "blur(0px)", duration: 1.8, ease: "expo.inOut" }, "pullback")
        .to(".hero-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-background text-foreground">
      {/* Background layers */}
      <div className="film-grain" aria-hidden />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden />

      {/* Tagline (revela em intro, borra no scrub) */}
      <div className="hero-tagline absolute z-10 text-center px-4">
        <h1 className="text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          {HERO_COPY.word1}
        </h1>
        <h1 className="hero-tagline-2 text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          {HERO_COPY.word2}
        </h1>
      </div>

      {/* Card profundo (sobe, estica, revela mockup, recolhe) */}
      <div ref={cardRef} className="hero-card premium-depth-card pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px] absolute z-20 overflow-hidden">
        <div className="card-sheen" aria-hidden />
        {/* Substituindo iPhone mockup pelo dashboard real */}
        <div ref={mockupRef} className="hero-mockup absolute inset-0 flex items-center justify-center will-change-transform">
          <div className="w-full max-w-5xl px-4 lg:px-8">
            <StockMockDashboard />
          </div>
        </div>
        {/* Floating badges (substituir copy da Sobers pela nossa) */}
        <div className="hero-badge-float absolute top-12 left-[-80px] floating-ui-badge rounded-2xl p-4 flex items-center gap-4 z-30">
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 flex items-center justify-center border border-emerald-400/30">
            <span className="text-xl">📦</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold tracking-tight">Previsão de ruptura</p>
            <p className="text-blue-200/50 text-xs">7 dias antes de acontecer</p>
          </div>
        </div>
        <div className="hero-badge-float absolute bottom-20 right-[-80px] floating-ui-badge rounded-2xl p-4 flex items-center gap-4 z-30">
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-blue-500/20 to-blue-900/10 flex items-center justify-center border border-blue-400/30">
            <span className="text-lg">🤖</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold tracking-tight">Agente ativo</p>
            <p className="text-blue-200/50 text-xs">3 processos automatizados</p>
          </div>
        </div>
      </div>

      {/* CTA final (visível no fim do scrub) */}
      <div className="hero-cta absolute z-30 flex flex-col items-center text-center px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-silver-matte">
          Pronto pra liberar sua equipe?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contato" className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem]">
            {HERO_COPY.primaryCta}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/processo" className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem]">
            {HERO_COPY.secondaryCta}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Diferenças em relação à Sobers**:
- `tagline1="Sua equipe"`, `tagline2="multiplicada"` (não "Track the journey")
- Mockup interno = `<StockMockDashboard />` (não iPhone físico)
- Floating badges com copy Nexus AI (não "1 Year Streak")
- CTA final = 2 botões `/contato` + `/processo` (não App Store + Google Play)
- `cardDescription` (texto lateral no card) **removido** — o dashboard fala por si

## Ato 2 — Manifesto (preservado)

Componente atual `ManifestoSection` está em `src/app/page.tsx` linhas 162-230. Extrair pra `src/components/cinematic/ato-manifesto.tsx` **sem mudar mecânica**. Único ajuste: registrar ScrollTrigger global pra que o master saiba dos bounds.

```tsx
// src/components/cinematic/ato-manifesto.tsx
"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MANIFESTO_CHUNKS } from "@/lib/content";
// ... (lógica idêntica à atual)

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AtoManifesto() {
  const ref = useRef<HTMLDivElement>(null);

  // Notifica o master
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        id: "ato-manifesto",
        start: "top top",
        end: "bottom bottom",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // ... resto idêntico
}
```

## Ato 3 — Métricas (counter escalonado)

```tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CountUp } from "@/components/count-up";
import { METRICAS } from "@/lib/content";
import { AnimatedItem } from "@/components/animated-section";

export function AtoMetrics() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top 80%",
        onEnter: () => {
          // CountUp component já tem duration: 1.4 — basta ele entrar em viewport
          // NADA extra aqui; a "pin" é leve: a entrada é o evento
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="px-4 sm:px-6 py-16 md:py-24 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-foreground/55">
          Onde estamos hoje
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {METRICAS.map((m, i) => (
          <AnimatedItem key={m.label} delay={i * 0.15} className="rounded-xl bg-card/40 backdrop-blur-md p-6 ring-1 ring-border/50 text-center">
            <div className="text-3xl md:text-5xl font-semibold tracking-tighter tabular-nums">
              <CountUp to={m.value} suffix={m.suffix} duration={1.4} />
            </div>
            <div className="text-xs md:text-sm text-foreground/65 mt-2">{m.label}</div>
          </AnimatedItem>
        ))}
      </div>
    </section>
  );
}
```

**Mecânica diferenciada**: este ato **NÃO** usa scrub pin longo (já que é um grid estático). Usamos `CountUp` existente — só mudamos o `delay` por item para criar stagger no reveal. O "pin" aqui é leve: o `ScrollTrigger` não pina, só registra `onEnter` que dispara o efeito visual.

## Ato 4 — Pilares (cards dominó 3D)

```tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PILARES, PILLAR_ICONS_FROM_LUCIDE } from "@/lib/content";

export function AtoPillars() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".pillar-card", { rotateY: -90, autoAlpha: 0, x: -100 });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(".pillar-card", {
            rotateY: 0,
            autoAlpha: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // ... renderiza grid 2x2 com .pillar-card className em cada
}
```

**Mecânica diferenciada**: rotação Y de -90° → 0° por card, com stagger. Diferente do Manifesto (flip 3D de palavras) porque os pilares são unidades maiores — cards girando, não palavras individuais.

## Ato 5 — Showcases (wrapper)

```tsx
"use client";
import { ProductShowcase } from "@/components/product-showcase";
import { StockMockDashboard, CopilotMockDashboard } from "@/components/mock-dashboards";

export function AtoShowcaseStock() {
  return (
    <ProductShowcase
      badge="01 / 02"
      eyebrow="Produto em produção"
      title="Nexus Stock"
      subtitle="Gestão de estoque com IA. Previsão de demanda, alertas de ruptura antes de acontecer, controle de capital e sugestão automática de compra. Sem planilha, sem achismo."
      mock={<StockMockDashboard />}
    />
  );
}
// ... AtoShowcaseCopilot similar com badge "02/02" e Copilot mock
```

`ProductShowcase` já existe e já tem rotate 3D no scroll. **Não mudamos** — só envelopamos pra ficar claro no orquestrador que é "ato 5".

## Ato 6 — Bento (scale+blur reveal)

```tsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BentoCapabilities } from "@/components/bento-capabilities";
import { CAPABILITIES, COMPANY } from "@/lib/content";

export function AtoBento() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".bento-card", { scale: 0.85, filter: "blur(20px)", autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(".bento-card", {
            scale: 1,
            filter: "blur(0px)",
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <BentoCapabilities
        eyebrow="Capacidades"
        title="Outros sistemas que entregamos"
        subtitle="Estoque e marketing são dois produtos-âncora. A plataforma Nexus AI cobre outras frentes com a mesma abordagem sob medida."
        cards={/* vide page.tsx atual — passar bentoCards com ícones resolvidos */}
      />
    </div>
  );
}
```

**Mecânica diferenciada**: scale+blur (não rotação Y). Diferente dos Pilares pra não ficar redundante.

## Ato 7 — Stack (sem cinematic)

```tsx
// src/components/cinematic/ato-stack.tsx
// Apenas re-exporta o StackSection atual (linhas 580-637 do page.tsx)
```

## Ato 8 — CTA Final (pulse loop curto)

```tsx
"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export function AtoCtaFinal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".cta-final", { y: 60, autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(".cta-final", { y: 0, autoAlpha: 1, duration: 1.0, ease: "power3.out" });
          // Pulse loop no botão após entrar
          gsap.to(".cta-final-btn", { scale: 1.03, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="px-4 sm:px-6 py-16 md:py-24 max-w-6xl mx-auto text-center">
      <div className="cta-final">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Pronto pra ver o gargalo da sua operação?
        </h2>
        <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
          Diagnóstico inicial é gratuito. Você sai com clareza do que automatizar e quanto custa.
        </p>
        <Link href="/contato" className="cta-final-btn inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground">
          Solicitar Proposta
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
```

## Ato 9 — FAQ (sem cinematic)

Re-exporta `<FaqSection />` atual sem mudanças.

## Orquestrador

```tsx
// src/components/cinematic/cinematic-home.tsx
"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AtoHero } from "./ato-hero";
import { AtoManifesto } from "./ato-manifesto";
import { AtoMetrics } from "./ato-metrics";
import { AtoPillars } from "./ato-pillars";
import { AtoShowcaseStock } from "./ato-showcase-stock";
import { AtoShowcaseCopilot } from "./ato-showcase-copilot";
import { AtoBento } from "./ato-bento";
import { AtoStack } from "./ato-stack";
import { AtoCtaFinal } from "./ato-cta-final";
import { AtoFaq } from "./ato-faq";
import { CINEMATIC_INJECTED_CSS } from "./_styles";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function CinematicHome() {
  const atoRefs = {
    hero: useRef<HTMLDivElement>(null),
    manifesto: useRef<HTMLDivElement>(null),
    metrics: useRef<HTMLDivElement>(null),
    pillars: useRef<HTMLDivElement>(null),
    showcaseStock: useRef<HTMLDivElement>(null),
    showcaseCopilot: useRef<HTMLDivElement>(null),
    bento: useRef<HTMLDivElement>(null),
    stack: useRef<HTMLDivElement>(null),
    ctaFinal: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
  };

  // Injeta CSS uma vez
  useLayoutEffect(() => {
    const id = "cinematic-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = CINEMATIC_INJECTED_CSS;
    document.head.appendChild(el);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <>
      <JsonLd schema={[/* org + site */]} />
      <section ref={atoRefs.hero}><AtoHero /></section>
      <section ref={atoRefs.manifesto}><AtoManifesto /></section>
      <section ref={atoRefs.metrics}><AtoMetrics /></section>
      <section ref={atoRefs.pillars}><AtoPillars /></section>
      <section ref={atoRefs.showcaseStock}><AtoShowcaseStock /></section>
      <section ref={atoRefs.showcaseCopilot}><AtoShowcaseCopilot /></section>
      <section ref={atoRefs.bento}><AtoBento /></section>
      <section ref={atoRefs.stack}><AtoStack /></section>
      <section ref={atoRefs.ctaFinal}><AtoCtaFinal /></section>
      <section ref={atoRefs.faq}><AtoFaq /></section>
    </>
  );
}
```

`page.tsx` vira:

```tsx
import { CinematicHome } from "@/components/cinematic/cinematic-home";
export default function Home() { return <CinematicHome />; }
```

## Reduced motion + mobile helpers

```ts
// src/lib/cinematic-reduced-motion.ts
"use client";
import { useEffect, useState } from "react";
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// src/lib/cinematic-mobile.ts
export const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;
```

## Migração de conteúdo

Adicionar em `src/lib/content.ts`:

```ts
export const HERO_COPY = {
  word1: "Sua equipe",
  word2: "multiplicada",
  description: "Plataformas e agentes da Nexus AI assumem o trabalho repetitivo, do atendimento à análise. Sua equipe fica livre pro que só humano faz: decidir, criar, crescer.",
  primaryCta: "Solicitar Proposta",
  primaryCtaMobile: "Proposta",
  secondaryCta: "Ver processo",
  secondaryCtaMobile: "Processo",
} as const;

export const CTA_FINAL_COPY = {
  title: "Pronto pra ver o gargalo da sua operação?",
  description: "Diagnóstico inicial é gratuito. Você sai com clareza do que automatizar e quanto custa.",
  cta: "Solicitar Proposta",
} as const;
```

Remover o `HeroSection` inline do `page.tsx` (atualmente passa `word1`/`word2` hardcoded em `PixelHero`).

## Dependências

- `npm install gsap` — lib nova. Atualizar `docs/roadmap.md` campo "Stack travado":
  ```
  - GSAP 3 (ScrollTrigger plugin) — animação pin/scrub da home
  ```

Não removemos `framer-motion` (usado ainda no ato Manifesto, ato FAQ accordion se houver). Custaria reescrever mais do que vale.

## Validação (gate obrigatório, do skill `b2b-institutional-pages`)

Após codar:

1. `npx tsc --noEmit` — tipos limpos
2. `npm run build` — build limpo (pega RSC/SSR que tsc perde)
3. `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` — confirmar 200
4. `curl -s http://localhost:3000 | grep -i "Sua equipe"` — confirmar copy atual (não stale)
5. `browser_navigate http://localhost:3000` + `browser_vision` — inspecionar cada ato:
   - Ato 1: tagline revela + card azul sobe + StockDashboard aparece + CTA
   - Ato 2: manifesto pinado 4 cenas (já validado antes)
   - Ato 3: 4 contadores animam em sequência
   - Ato 4: 4 cards pilares giram 3D
   - Ato 5: 2 showcases rotacionam Y
   - Ato 6: 4 cards bento scale+blur
   - Ato 7: stack badges aparece sem cinemático
   - Ato 8: CTA pulse
   - Ato 9: FAQ accordion
6. Mobile 375px: cada ato cabe sem overflow horizontal

## Riscos conhecidos

| Risco | Mitigação |
|---|---|
| GSAP pin cobrindo 100% da home derruba Lighthouse | `prefers-reduced-motion` desabilita scrub + pin; `useLayoutEffect` guard para SSR |
| framer-motion + gsap ScrollTrigger competindo pelos mesmos eventos scroll | ato Manifesto usa framer local; ato Hero/Pilares/etc usam GSAP — sem overlap de trigger |
| 9 atos em sequência pode dar timeout único | dividimos em 10 `ScrollTrigger`s separados, cada um se limpa no unmount |
| StockDashboard dentro do card profundo distorce layout | o `StockMockDashboard` já é responsivo; envelopamos em `max-w-5xl mx-auto` |
| `useLayoutEffect` warning de SSR | uso dentro de guard `typeof window !== "undefined"` em helpers; principais efeitos usam `useEffect` |

## Fora de escopo (Fase YAGNI explícita)

- Adicionar case studies reais → YAGNI até ter conteúdo
- Light mode → YAGNI até o cliente pedir
- Internacionalização → YAGNI até ter cliente em outro idioma
- i18n no ato Manifesto → mesmo
- Formspree/Resend → Fase separada já documentada (Fase "Form funcional")

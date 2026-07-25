# Desenho Técnico — Fase 2

> Implementação concreta da Fase 2. Cada mudança aqui vira 1 commit único.

## Mudanças por arquivo

### 1. `src/app/solucoes/page.tsx` (substitui o placeholder)

Estrutura:

```tsx
import { BackgroundCanvas } from "@/components/background-canvas";
import {
  MessageCircle, BarChart3, Plug, Cog,
} from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Soluções · Nexus AI" };

const AREAS = [
  {
    icon: MessageCircle,
    title: "Atendimento ao cliente",
    desc: "Agentes que respondem, qualificam e escalam conversas.",
    example: "Chatbot no WhatsApp que filtra leads antes de passar pro time comercial.",
  },
  {
    icon: BarChart3,
    title: "Análise de dados",
    desc: "Relatórios e dashboards que processam dados sem planilha.",
    example: "Relatório semanal de vendas gerado automaticamente a partir do CRM.",
  },
  {
    icon: Plug,
    title: "Integração de sistemas",
    desc: "Pontes entre as ferramentas que sua equipe já usa.",
    example: "Sincronizar pedidos do e-commerce com o ERP sem digitação manual.",
  },
  {
    icon: Cog,
    title: "Operações internas",
    desc: "Automação de processos repetitivos do dia a dia.",
    example: "Aprovação de cadastros e follow-up de clientes que pararam de responder.",
  },
] as const;

export default function SolucoesPage() {
  return (
    <div className="relative w-full min-h-[100dvh] bg-background">
      <BackgroundCanvas variant="solucoes" />

      {/* Hero compacto */}
      <section className="relative z-10 px-4 sm:px-6 pt-32 md:pt-40 pb-12 text-center">
        <span className="tahoe-glass-text block text-5xl md:text-7xl leading-[0.95] mb-6">
          Soluções
        </span>
        <p className="text-lg md:text-xl font-normal text-foreground max-w-2xl mx-auto leading-snug">
          Quatro áreas onde a Nexus AI entrega resultado. Cada uma, sob medida pro seu contexto.
        </p>
      </section>

      {/* Grid de áreas */}
      <section className="relative z-10 px-4 sm:px-6 py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <div key={area.title} className="rounded-xl bg-card/40 backdrop-blur-md p-6 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.3)]">
                <Icon className="w-6 h-6 text-foreground/85 mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-foreground mb-1.5">
                  {area.title}
                </h3>
                <p className="text-sm text-foreground/85 mb-3">{area.desc}</p>
                <p className="text-xs text-muted-foreground italic">
                  Exemplo: {area.example}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sob medida */}
      <section className="relative z-10 px-4 sm:px-6 py-12 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Sob medida
        </h2>
        <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-2">
          Cada empresa começa com um diagnóstico. A gente entende o que trava sua operação, propõe o escopo e entrega uma solução customizada pra resolver aquele caso.
        </p>
        <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
          Nada de template genérico. O entregável é seu.
        </p>
      </section>

      {/* CTA final */}
      <section className="relative z-10 px-4 sm:px-6 py-16 text-center">
        <Link
          href="/contato"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-8 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Solicitar Proposta
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
```

**Decisões dentro do componente:**
- Layout vertical scroll, não grid centralizado. Cada seção respira o próprio `py-12`/`py-16`.
- Grid 2 colunas no desktop (4 áreas × 2) — 4 colunas ficaria apertado em 1440px.
- Exemplo concreto em cada card com `italic text-muted-foreground text-xs` — ancoragem sem inflar a copy.
- CTA final reusa exatamente o styling do CTA primário do PixelHero.

### 2. `src/app/processo/page.tsx` (substitui o placeholder)

Estrutura:

```tsx
import { BackgroundCanvas } from "@/components/background-canvas";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Processo · Nexus AI" };

const ETAPAS = [
  {
    n: "01",
    title: "Diagnóstico",
    prazo: "1 a 2 semanas",
    desc: "Conversa com a equipe, mapeamento de gargalos, definição de escopo. Saímos com um diagnóstico escrito do que dá pra automatizar.",
  },
  {
    n: "02",
    title: "Proposta",
    prazo: "1 semana",
    desc: "Escopo detalhado, prazo estimado, investimento e ROI esperado. Sem letra miúda, sem cláusula escondida.",
  },
  {
    n: "03",
    title: "Implementação",
    prazo: "4 a 12 semanas",
    desc: "Desenvolvimento, integração com sistemas da empresa, testes com sua equipe. Você acompanha de perto.",
  },
  {
    n: "04",
    title: "Suporte contínuo",
    prazo: "Mensal",
    desc: "Monitoramento do que está rodando, ajustes, evolução conforme o uso real aparece.",
  },
] as const;

export default function ProcessoPage() {
  return (
    <div className="relative w-full min-h-[100dvh] bg-background">
      <BackgroundCanvas variant="processo" />

      <section className="relative z-10 px-4 sm:px-6 pt-32 md:pt-40 pb-12 text-center">
        <span className="tahoe-glass-text block text-5xl md:text-7xl leading-[0.95] mb-6">
          Processo
        </span>
        <p className="text-lg md:text-xl font-normal text-foreground max-w-2xl mx-auto leading-snug">
          Do diagnóstico à entrega. Em quatro etapas, com prazos claros.
        </p>
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-12 max-w-6xl mx-auto">
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ETAPAS.map((etapa) => (
            <li
              key={etapa.n}
              className="rounded-xl bg-card/40 backdrop-blur-md p-6 ring-1 ring-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.3)]"
            >
              <div className="text-3xl font-semibold text-foreground/30 mb-3 leading-none tracking-tighter">
                {etapa.n}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                {etapa.title}
              </h3>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {etapa.prazo}
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                {etapa.desc}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-16 text-center">
        <Link
          href="/contato"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-8 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Solicitar Proposta
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
```

**Decisões:**
- `01..04` numerais com `text-foreground/30` — números "fantasma" grandes, dão ritmo visual sem competir com o título.
- `grid-cols-2 lg:grid-cols-4` — em tablet fica 2x2, em desktop 1x4. Mobile vira coluna única automaticamente (1 coluna).
- Prazo em `uppercase tracking-wider text-xs muted-foreground` — hierarquia visual sem peso extra.

### 3. `src/app/contato/page.tsx` (substitui o placeholder)

**Decisão chave:** form com Server Action do Next 15, sem provider de email. Quando usuário submete:
1. Server action valida campos (re-checa)
2. Honeypot: se `formData.get("website")` vier preenchido, retorna sucesso silencioso (bot acha que mandou)
3. Honeypot OK + validação OK: por enquanto **simula sucesso** retornando `{ ok: true }`
4. Futura Fase 3 troca o "simula sucesso" por envio real via Resend

Estrutura:

```tsx
// server action inline no mesmo arquivo
async function enviarMensagem(formData: FormData) {
  "use server";
  // honeypot
  if (formData.get("website")) return { ok: true };

  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const empresa = String(formData.get("empresa") ?? "").trim();
  const cargo = String(formData.get("cargo") ?? "").trim();
  const setor = String(formData.get("setor") ?? "").trim();
  const mensagem = String(formData.get("mensagem") ?? "").trim();

  // validação mínima (server-side echo do client)
  if (!nome || !email || !empresa || !mensagem) {
    return { ok: false, error: "Preencha nome, email, empresa e mensagem." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Email inválido." };
  }
  if (mensagem.length < 10 || mensagem.length > 500) {
    return { ok: false, error: "Mensagem deve ter entre 10 e 500 caracteres." };
  }

  // ponytail: Fase 3 will wire Resend here. For now simulate success.
  return { ok: true };
}

const CARGOS = ["Gerente", "Coordenador", "Superintendente", "Diretor", "Sócio/Dono", "Outro"] as const;
const SETORES = ["Atendimento", "Operações", "Vendas", "Marketing", "TI/Tech", "Financeiro", "RH", "Outro"] as const;

export const metadata = { title: "Contato · Nexus AI" };

// Página em si usa useActionState pra UX de sucesso/erro
```

Para o JSX da página, layout:

```tsx
<form action={enviarMensagem} className="...">
  {/* honeypot — invisível pro humano, bots preenchem */}
  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Field label="Nome" name="nome" required />
    <Field label="Email" name="email" type="email" required />
    <Field label="Empresa" name="empresa" required />
    <SelectField label="Cargo" name="cargo" options={CARGOS} />
    <SelectField label="Setor" name="setor" options={SETORES} />
  </div>
  <TextareaField label="Mensagem" name="mensagem" required minLength={10} maxLength={500} />
  <SubmitButton />
  <StatusMessage state={state} />
</form>
```

**Componentes auxiliares (lazy — inline na página):**

- `Field`, `SelectField`, `TextareaField`, `SubmitButton`, `StatusMessage` — todos definidos no mesmo arquivo `page.tsx`. YAGNI extrair pra arquivo separado.

**Razões:**
- `useActionState` (React 19) gerencia estado de erro/sucesso sem `useState`+`useEffect`
- Server action retorna `{ ok, error? }`, client renderiza baseado nisso
- Validação duplica client+server (defense in depth)
- Honeypot bloqueia 90% dos bots sem CAPTCHAs

### 4. `src/app/page.tsx` (home ganha seções-resumo)

Adicionar ANTES do `<PixelHero>` (entre o canvas e o hero), ou DEPOIS (depois do hero, antes do footer)?

**Decisão: DEPOIS do hero, antes do footer.** Razão:
- Hero é a primeira impressão, deixa ele respirar
- Resumos abaixo dão "next step" pro visitante que scrollou
- Funciona como funil natural: hero (impacto) → soluções (o que) → processo (como) → CTA contato

Estrutura:

```tsx
<div className="relative w-full min-h-screen bg-background">
  <BackgroundCanvas variant="home" />
  <PixelHero {...} />

  {/* Seção Soluções-resumo */}
  <section className="relative z-10 px-4 sm:px-6 py-16 md:py-24 max-w-5xl mx-auto">
    <h2 className="tahoe-glass-text block text-3xl md:text-5xl text-center leading-[0.95] mb-10">
      Soluções
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {AREAS.map((area) => (
        <div key={area.title} className="rounded-xl bg-card/40 backdrop-blur-md p-4 ring-1 ring-border/50">
          <area.icon className="w-5 h-5 text-foreground/85 mb-2" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-foreground">{area.title}</h3>
          <p className="text-xs text-foreground/70 mt-1">{area.desc}</p>
        </div>
      ))}
    </div>
    <Link href="/solucoes" className="...">
      Ver todas as soluções →
    </Link>
  </section>

  {/* Seção Processo-resumo */}
  <section className="relative z-10 px-4 sm:px-6 py-16 md:py-24 max-w-5xl mx-auto">
    <h2 className="tahoe-glass-text block text-3xl md:text-5xl text-center leading-[0.95] mb-10">
      Como funciona
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {ETAPAS.slice(0, 3).map((etapa) => (
        <div key={etapa.n} className="rounded-xl bg-card/40 backdrop-blur-md p-5 ring-1 ring-border/50">
          <div className="text-2xl font-semibold text-foreground/30 leading-none tracking-tighter mb-2">
            {etapa.n}
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">{etapa.title}</h3>
          <p className="text-xs text-muted-foreground">{etapa.prazo}</p>
        </div>
      ))}
    </div>
    <Link href="/processo" className="...">
      Ver processo completo →
    </Link>
  </section>
</div>
```

**Refator opcional (se copy virar fonte de verdade duplicada):**
Mover `AREAS` e `ETAPAS` pra `src/lib/content.ts` e importar nas 3 páginas. YAGNI nesta fase — duplicação é só 1 array vs 1 array. Faz quando virar problema de manutenção.

### 5. `src/components/ui/pixel-perfect-hero.tsx`

Nenhuma mudança nesta fase.

## Ordem de execução

1. `solucoes/page.tsx` (substitui placeholder, ganha conteúdo real)
2. `processo/page.tsx` (substitui placeholder, ganha conteúdo real)
3. `contato/page.tsx` (substitui placeholder, ganha form com server action)
4. `page.tsx` (home ganha seções-resumo após o hero)
5. `npm run build` valida
6. Commit único

**Razão da ordem:** páginas internas primeiro, home depois (home depende de elas existirem pra fazer os links).

## Validação depois do commit

```bash
cd "C:\Users\rapha\Desktop\website"
npm run build
```

Esperado: `✓ Compiled successfully` + 5 rotas prerendered + 0 warnings novos. Build size deve crescer modestamente (lucide icons + form).

## Não-objetivos explícitos desta fase

- Não adicionar nova dependência npm
- Não mexer em `globals.css`
- Não mexer em `BackgroundCanvas`, `SiteFooter`, `nexus-nav`, `PixelHero`
- Não adicionar animações novas
- Não adicionar imagens (texto puro, copy-first)
- Não adicionar página "Sobre"
- Não fazer upload de assets

## Commit message

```
feat(fase-2): conteúdo das páginas internas + home resumos

- /solucoes: 4 cards de áreas (atendimento, dados, integração, operações) + bloco "sob medida" + CTA
- /processo: 4 etapas numeradas (diagnóstico, proposta, implementação, suporte) com prazo
- /contato: form com 6 campos + server action (mock success) + honeypot anti-spam
- / (home): adiciona seções-resumo de soluções (4 cards) + processo (3 etapas) com CTAs pras internas
- Componentes auxiliares do form (Field, SelectField, TextareaField, StatusMessage) inline em contato/page.tsx
```

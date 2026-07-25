"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* -----------------------------------------------------------------------------
 * BACKGROUND CANVAS — reusable pixel-pulse background for every route.
 * Same engine as the hero's canvas (radial wave, breathing pulse), with
 * knobs to vary per-page texture without forking the component.
 * ponytail: duplicated engine from PixelHero for now — refactor when third
 * consumer appears.
 * -------------------------------------------------------------------------- */

type Pixel = {
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInt: number;
  maxSize: number;
  restSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;
  draw: () => void;
  appear: () => void;
  disappear: () => void;
  shimmer: () => void;
  pulse: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  const p: Pixel = {
    x, y, color, ctx,
    speed: rand(0.08, 0.4) * baseSpeed,
    size: 0,
    sizeStep: rand(0.12, 0.28),
    minSize: 0.5,
    maxSizeInt: 2,
    maxSize: rand(0.5, 2),
    restSize: 0,
    delay,
    counter: 0,
    counterStep: rand(1.8, 3.2) + (canvas.width + canvas.height) * 0.008,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
    },
    appear() {
      p.isIdle = false;
      if (p.counter <= p.delay) {
        p.counter += p.counterStep;
        return;
      }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer();
      else p.size += p.sizeStep;
      p.draw();
    },
    disappear() {
      p.isShimmer = false;
      p.counter = 0;
      if (p.size <= 0) { p.isIdle = true; return; }
      p.size -= 0.1;
      p.draw();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed;
      else p.size += p.speed;
    },
    pulse() {
      p.isIdle = false;
      if (p.restSize === 0) p.restSize = p.maxSize * 0.25;
      if (p.counter <= p.delay) {
        p.counter += p.counterStep;
        return;
      }
      const step = p.maxSize * 0.012;
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.restSize) p.isReverse = false;
      if (p.isReverse) p.size -= step;
      else p.size += step;
      p.draw();
    },
  };
  return p;
}

export type BackgroundCanvasVariant = "home" | "solucoes" | "processo" | "contato";

export interface BackgroundCanvasProps {
  variant?: BackgroundCanvasVariant;
  /** Override individual knobs; useful for testing. */
  gap?: number;
  speed?: number;
  opacity?: number;
  /** Ratio of `primary` color among dots (0 = all muted, 1 = all primary). */
  accentRatio?: number;
  /** Where the radial vignette focuses. */
  radialPosition?: "center" | "top" | "bottom";
}

const VARIANT_PRESETS: Record<
  BackgroundCanvasVariant,
  Required<Omit<BackgroundCanvasProps, "variant">>
> = {
  home: { gap: 6, speed: 30, opacity: 0.35, accentRatio: 0.2, radialPosition: "center" },
  solucoes: { gap: 5, speed: 35, opacity: 0.3, accentRatio: 0.4, radialPosition: "top" },
  processo: { gap: 7, speed: 25, opacity: 0.28, accentRatio: 0, radialPosition: "bottom" },
  contato: { gap: 4, speed: 45, opacity: 0.32, accentRatio: 0.6, radialPosition: "center" },
};

const RADIAL_POSITION_BG: Record<"center" | "top" | "bottom", string> = {
  center: "radial-gradient(circle at center, transparent 0%, var(--background) 100%)",
  top: "radial-gradient(circle at 50% 33%, transparent 0%, var(--background) 100%)",
  bottom: "radial-gradient(circle at 50% 67%, transparent 0%, var(--background) 100%)",
};

export function BackgroundCanvas({
  variant = "home",
  gap: gapOverride,
  speed: speedOverride,
  opacity: opacityOverride,
  accentRatio: accentOverride,
  radialPosition: radialOverride,
}: BackgroundCanvasProps) {
  const preset = VARIANT_PRESETS[variant];
  const gap = gapOverride ?? preset.gap;
  const speed = speedOverride ?? preset.speed;
  const opacity = opacityOverride ?? preset.opacity;
  const accentRatio = accentOverride ?? preset.accentRatio;
  const radialPosition = radialOverride ?? preset.radialPosition;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());
  const reducedMotionRef = useRef(false);
  const [themeColors, setThemeColors] = useState<string[]>([]);

  // Resolve colors from theme (muted-foreground + primary) once mounted.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.className = "text-muted-foreground";
    const muted = getComputedStyle(div).color;
    div.className = "text-primary";
    const primary = getComputedStyle(div).color;
    document.body.removeChild(div);
    const total = 20;
    const primaryCount = Math.max(0, Math.min(total, Math.round(total * accentRatio)));
    const colors = Array<string>(total)
      .fill(muted)
      .map((c, i) => (i < primaryCount ? primary : c));
    setThemeColors(colors);
  }, [accentRatio]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || themeColors.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const effectiveSpeed = reducedMotionRef.current ? 0 : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];
    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = themeColors[Math.floor(Math.random() * themeColors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = reducedMotionRef.current
          ? 0
          : Math.sqrt(dx * dx + dy * dy) * 0.65;
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay));
      }
    }
    pixelsRef.current = pixels;
  }, [themeColors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear" | "pulse") => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;
    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);
      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();
      if (mode !== "pulse" && pixels.every((p) => p.isIdle)) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    init();
    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);
    if (!reducedMotionRef.current) {
      animate("pulse");
    } else {
      animate("appear");
    }
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [init, animate]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        ref={wrapRef}
        className="absolute inset-0"
        style={{ opacity, transition: "opacity 600ms ease-out" }}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
      <div
        className={cn("absolute inset-0 pointer-events-none opacity-80")}
        style={{ background: RADIAL_POSITION_BG[radialPosition] }}
      />
    </div>
  );
}

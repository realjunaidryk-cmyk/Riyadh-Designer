"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import type { Lang } from "@/content/site";
import type { UI } from "@/content/ui";
import { ArrowIcon, WhatsAppIcon } from "./Icons";

// The hero holds while the visitor scrolls, and the client's transformation film plays frame by frame with the
// scroll: an empty shell becomes a finished living room. Frames are drawn to a canvas, cover-fitted.

const SETS = {
  desktop: { dir: "/media/hero/d", count: 109 },
  mobile: { dir: "/media/hero/m", count: 73 },
};
const frameUrl = (dir: string, i: number) => `${dir}/${String(i + 1).padStart(3, "0")}.webp`;

type Props = { lang: Lang; t: Pick<UI, "hero" | "cta">; projectsHref: string; whatsappHref: string };

export function HeroScrub({ lang, t, projectsHref, whatsappHref }: Props) {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const meter = useRef<HTMLSpanElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>([]);
  const current = useRef(0);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<"before" | "after">("before");
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  useEffect(() => {
    if (reduce) return;
    const set = window.matchMedia("(max-width: 760px)").matches ? SETS.mobile : SETS.desktop;
    frames.current = new Array(set.count).fill(null);
    let cancelled = false;

    // first frame, then a coarse pass, then fill in, so scrubbing works early and sharpens as it loads
    const order: number[] = [0];
    for (const step of [12, 4, 1]) for (let i = 0; i < set.count; i += step) if (!order.includes(i)) order.push(i);
    order.push(set.count - 1);

    let next = 0;
    const loadNext = () => {
      if (cancelled || next >= order.length) return;
      const i = order[next++];
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        frames.current[i] = img;
        if (i === 0) setReady(true);
        draw();
        loadNext();
      };
      img.onerror = loadNext;
      img.src = frameUrl(set.dir, i);
    };
    for (let k = 0; k < 4; k++) loadNext();

    const ro = new ResizeObserver(() => draw());
    if (canvas.current) ro.observe(canvas.current);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  function nearest(i: number) {
    const list = frames.current;
    for (let d = 0; d < list.length; d++) {
      if (list[i - d]) return list[i - d];
      if (list[i + d]) return list[i + d];
    }
    return null;
  }

  function draw() {
    const c = canvas.current;
    if (!c) return;
    const img = nearest(current.current);
    if (!img) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth;
    const h = c.clientHeight;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    ctx.drawImage(img, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);
  }

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // the film plays over the first 85% of the hold; the finished room rests for the remainder
    const k = Math.min(1, p / 0.85);
    const n = frames.current.length;
    const i = Math.round(k * (n - 1));
    if (i !== current.current) {
      current.current = i;
      requestAnimationFrame(draw);
    }
    if (meter.current) meter.current.style.transform = `scaleX(${k})`;
    setStage(k > 0.55 ? "after" : "before");
  });

  return (
    <section className="hero" ref={section} aria-labelledby="hero-title" style={reduce ? { height: "100svh" } : undefined}>
      <div className="hero-stage">
        {/* the still under the canvas: shown until the first frame loads, and on its own with reduced motion */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-still"
          src={reduce ? "/media/hero/final.jpg" : "/media/hero/first.jpg"}
          alt={reduce ? t.hero.after : ""}
          fetchPriority="high"
        />
        {!reduce && <canvas className="hero-canvas" ref={canvas} aria-hidden="true" style={{ opacity: ready ? 1 : 0 }} />}
        <div className="hero-scrim" />

        {!reduce && (
          <div className="hero-meter" aria-hidden="true">
            <div className="meter-row">
              <span>{t.hero.before}</span>
              <span className="meter-track">
                <span className="meter-fill" ref={meter} style={{ transform: "scaleX(0)" }} />
              </span>
              <span>{t.hero.after}</span>
            </div>
            <span className="meter-hint">{t.hero.scroll}</span>
          </div>
        )}
        <p className="visually-hidden" aria-live="polite">
          {stage === "after" ? t.hero.after : ""}
        </p>

        <div className="hero-copy">
          <div className="container">
            <p className="label">{t.hero.eyebrow}</p>
            <h1 className="serif" id="hero-title">
              {t.hero.title.map((line, i) => (
                <span className="line" key={i}>
                  <span className="rise" style={{ ["--i" as string]: i }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <div className="hero-row">
              <p className="hero-lead fade-in">{t.hero.lead}</p>
              <div className="hero-ctas fade-in on-image" style={{ ["--i" as string]: 1 }}>
                <Link className="btn btn-primary" href={projectsHref}>
                  {t.cta.projects}
                  <ArrowIcon />
                </Link>
                <a className="btn btn-outline" href={whatsappHref} target="_blank" rel="noopener" data-track="whatsapp_click">
                  <WhatsAppIcon />
                  {t.cta.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

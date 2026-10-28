"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary, Lang } from "@/content/dictionary";
import type { ResolvedSlot } from "@/content/media";
import { Placeholder } from "./Media";

// A row of short films bent like the inside of a cylinder: cards near the edges grow taller and lean,
// their outer edge taller than the inner. The row drifts on its own, follows a drag 1:1 and coasts after.

const PITCH = 196;
const HALF = 706;

export function Reels({ t, clips, lang }: { t: Dictionary["reels"]; clips: ResolvedSlot[]; lang: Lang }) {
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
    track.current?.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
      if (paused) v.pause();
      else v.play().catch(() => {});
    });
  }, [paused]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dir = lang === "ar" ? -1 : 1;
    const n = clips.length;
    let offset = 0;
    let velocity = 0;
    let dragging = false;
    let lastX = 0;
    let lastT = 0;
    let raf = 0;
    let prev = performance.now();
    let visible = false;

    const layout = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      const phone = cw < 820;
      const u = cw / (phone ? 640 : 1440);
      const centre = cw / 2;
      const margin = Math.min(32, Math.max(16, cw * 0.022));
      const span = PITCH * n * u;
      const maxH = (280 + 92) * u;
      const fit = Math.min(1, ch / (maxH * 1.04));
      const k = u * fit;
      for (let i = 0; i < n; i++) {
        const card = cards.current[i];
        if (!card) continue;
        let tpx = (i * PITCH * u - offset) % span;
        if (tpx < -span / 2) tpx += span;
        if (tpx > span / 2) tpx -= span;
        const t = tpx / u;
        const x = t * (1 + 0.083 * (t / HALF) ** 2);
        const d = Math.min(1.4, Math.abs(x) / HALF);
        const w = (170 + 48 * d * d) * k;
        const cx = centre + x * k;
        const left = cx - w / 2;
        const qL = Math.min(1.4, Math.abs(left - centre) / k / HALF);
        const qR = Math.min(1.4, Math.abs(left + w - centre) / k / HALF);
        const hL = (280 + 92 * qL ** 2.6) * k;
        const hR = (280 + 92 * qR ** 2.6) * k;
        const h = Math.max(hL, hR);
        const cy = ch / 2 - 12 * d * d * k;
        const top = cy - h / 2;
        const insetL = (h - hL) / 2;
        const insetR = (h - hR) / 2;
        card.style.width = `${w}px`;
        card.style.height = `${h}px`;
        card.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        card.style.clipPath = `polygon(0 ${insetL}px, 100% ${insetR}px, 100% ${h - insetR}px, 0 ${h - insetL}px)`;
        const show = left + w > -40 && left < cw + 40;
        card.style.visibility = show ? "visible" : "hidden";
        // a caption reads only while its card sits inside the page margins
        const cap = card.querySelector<HTMLElement>(".reel-cap");
        if (cap) cap.style.opacity = left >= margin && left + w <= cw - margin ? "1" : "0";
        const v = card.querySelector("video");
        if (v) {
          if (show && !pausedRef.current && visible) {
            if (v.paused) v.play().catch(() => {});
          } else if (!v.paused) v.pause();
        }
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const u = el.clientWidth / (el.clientWidth < 820 ? 640 : 1440);
      if (!dragging) {
        if (Math.abs(velocity) > 1) {
          offset += velocity * dt;
          velocity *= Math.pow(0.05, dt);
        } else if (!reduce && !pausedRef.current) {
          offset += 50 * u * dt * dir;
        }
      }
      layout();
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      cancelAnimationFrame(raf);
      prev = performance.now();
      if (visible) raf = requestAnimationFrame(tick);
      else layout();
    });
    io.observe(el);

    const down = (e: PointerEvent) => {
      dragging = true;
      velocity = 0;
      lastX = e.clientX;
      lastT = performance.now();
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      offset -= dx;
      const dts = Math.max(1, now - lastT) / 1000;
      velocity = (-dx / dts) * 0.8 + velocity * 0.2;
      lastX = e.clientX;
      lastT = now;
      if (!visible) layout();
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      if (performance.now() - lastT > 80) velocity = 0;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };
    const key = (e: KeyboardEvent) => {
      const u = el.clientWidth / (el.clientWidth < 820 ? 640 : 1440);
      if (e.key === "ArrowRight") velocity = 900 * u;
      if (e.key === "ArrowLeft") velocity = -900 * u;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("keydown", key);
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    layout();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("keydown", key);
    };
  }, [clips.length, lang]);

  return (
    <section className="reels section" id="films" aria-labelledby="reels-title">
      <div className="reels-head">
        <h2 className="head" id="reels-title" data-reveal>
          {t.title}
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <p data-reveal style={{ ["--i" as string]: 1 }}>
            {t.lead}
          </p>
          <button type="button" className="reel-toggle" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
            {paused ? t.play : t.pause}
          </button>
        </div>
      </div>
      <div
        className="reel-track"
        ref={track}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={t.title}
        dir="ltr"
      >
        {clips.map((c, i) => (
          <div
            className="reel"
            key={c.src}
            ref={(node) => {
              cards.current[i] = node;
            }}
            role="group"
            aria-label={t.clips[i]}
          >
            {c.ready ? (
              <video
                src={c.src}
                poster={c.posterReady ? c.poster : undefined}
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
            ) : c.posterReady ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.poster} alt="" loading="lazy" />
            ) : (
              <Placeholder seed={40 + i} ratio={9 / 16} label={t.clips[i]} />
            )}
            <span className="reel-cap" lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
              {t.clips[i]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

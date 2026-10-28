"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/content/dictionary";
import type { ResolvedSlot } from "@/content/media";
import { Media } from "./Media";

const drops = [120, 80, 140, 96, 128, 84, 112];

export function Process({ t, pics }: { t: Dictionary["process"]; pics: ResolvedSlot[] }) {
  const row = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = row.current!;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? Math.abs(el.scrollLeft) / max : 1;
      const share = el.clientWidth / el.scrollWidth;
      bar.current?.style.setProperty("--p", String(share + (1 - share) * p));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // mouse drag; touch scrolls natively
    let down = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.scrollSnapType = "none";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.style.scrollSnapType = "";
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const go = (sign: 1 | -1) => {
    const el = row.current!;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: sign * (rtl ? -1 : 1) * 312, behavior: "smooth" });
  };

  return (
    <section className="process section" id="process" aria-labelledby="process-title">
      <div className="process-head">
        <h2 className="head" id="process-title" data-reveal>
          {t.title}
        </h2>
        <div className="process-buttons">
          <button type="button" className="square" aria-label={t.back} onClick={() => go(-1)}>
            <Arrow back />
          </button>
          <button type="button" className="square" aria-label={t.forward} onClick={() => go(1)}>
            <Arrow />
          </button>
        </div>
      </div>
      <div className="progress" aria-hidden="true">
        <span ref={bar} />
      </div>
      <ol className="row" ref={row}>
        {t.steps.map((s, i) => (
          <li className="moment" key={s.name} style={{ ["--drop" as string]: `${drops[i % drops.length]}px` }}>
            <h3 data-reveal style={{ ["--i" as string]: i % 4 }}>
              {s.name}
            </h3>
            <p data-reveal style={{ ["--i" as string]: (i % 4) + 1 }}>
              {s.text}
            </p>
            <div data-reveal="wipe" style={{ ["--i" as string]: (i % 4) + 1 }}>
              <Media slot={pics[i]} alt={s.name} seed={60 + i} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Arrow({ back }: { back?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {back ? <path d="M15 5l-7 7 7 7M8 12h13" /> : <path d="M9 5l7 7-7 7M16 12H3" />}
    </svg>
  );
}

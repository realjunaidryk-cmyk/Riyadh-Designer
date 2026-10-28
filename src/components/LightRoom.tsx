"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary, Lang } from "@/content/dictionary";
import { dayTimes, formatClock, riyadhNow } from "@/lib/sun";
import { Placeholder } from "./Media";

type FinishId = "plaster" | "travertine" | "athl" | "lime";

const swatches: Record<FinishId, string> = {
  plaster: "#b48a62",
  travertine: "#d6cab3",
  athl: "#6f4b31",
  lime: "#e7e2d7",
};

type SceneApi = {
  setSun: (minutes: number) => void;
  setFinish: (id: FinishId) => void;
  dispose: () => void;
};

export function LightRoom({ t, lang }: { t: Dictionary["light"]; lang: Lang }) {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<SceneApi | null>(null);
  const today = useMemo(() => new Date(), []);
  const times = useMemo(() => dayTimes(today), [today]);
  const min = Math.ceil(times.sunrise + 10);
  const max = Math.floor(times.sunset - 10);

  const [minutes, setMinutes] = useState(() => Math.round((times.noon + max) / 2));
  const [finish, setFinish] = useState<FinishId>("plaster");
  const [webgl, setWebgl] = useState<"pending" | "on" | "off">("pending");
  const swept = useRef(false);
  const touched = useRef(false);

  // Build the scene once the section is near the viewport.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting || api.current) return;
        io.disconnect();
        try {
          const { createMajlis } = await import("@/lib/majlis");
          if (cancelled) return;
          api.current = await createMajlis(el, today);
          api.current.setFinish(finish);
          api.current.setSun(minutes);
          setWebgl("on");
        } catch {
          setWebgl("off");
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      api.current?.dispose();
      api.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The signature move: when the room first comes into view, the sun crosses from morning to now.
  useEffect(() => {
    if (webgl !== "on") return;
    const el = host.current!;
    const now = riyadhNow();
    const target = now > min + 30 && now < max - 10 ? now : Math.round(times.noon + 200);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || swept.current) return;
        swept.current = true;
        io.disconnect();
        if (reduce || touched.current) {
          setMinutes(target);
          return;
        }
        const from = min + 20;
        const start = performance.now();
        const dur = 2600;
        const step = (time: number) => {
          if (touched.current) return;
          const k = Math.min(1, (time - start) / dur);
          const e = 1 - Math.pow(1 - k, 4);
          setMinutes(Math.round(from + (target - from) * e));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [webgl, min, max, times.noon]);

  useEffect(() => {
    api.current?.setSun(minutes);
  }, [minutes]);

  useEffect(() => {
    api.current?.setFinish(finish);
  }, [finish]);

  const clock = formatClock(minutes, lang);
  const pct = (v: number) => `${((v - min) / (max - min)) * 100}%`;

  return (
    <section className="light section" id="light" aria-labelledby="light-title">
      <div className="light-head">
        <h2 className="head" id="light-title" data-reveal>
          {t.title}
        </h2>
        <p data-reveal style={{ ["--i" as string]: 1 }}>
          {t.text}
        </p>
      </div>

      <div className="room" ref={host} role="img" aria-label={t.canvasLabel} data-reveal="wipe">
        {webgl !== "on" && <Placeholder seed={3} ratio={16 / 9} label={t.canvasLabel} />}
      </div>

      <div className="room-controls">
        <div>
          <label className="control-label" htmlFor="sun-time">
            <span>{t.timeLabel}</span>
            <output className="clock" htmlFor="sun-time" dir="ltr">
              {clock}
            </output>
          </label>
          <input
            id="sun-time"
            className="sun-range"
            type="range"
            min={min}
            max={max}
            step={1}
            value={minutes}
            aria-valuetext={clock}
            dir="ltr"
            onChange={(e) => {
              touched.current = true;
              setMinutes(Number(e.target.value));
            }}
          />
          <div className="ticks" dir="ltr" aria-hidden="true">
            <span>
              {t.sunrise} {formatClock(times.sunrise, lang)}
            </span>
            <span style={{ position: "relative", left: `calc(${pct(times.noon)} - 50%)` }}>
              {t.noon} {formatClock(times.noon, lang)}
            </span>
            <span>
              {t.sunset} {formatClock(times.sunset, lang)}
            </span>
          </div>
        </div>
        <div>
          <span className="control-label" id="finish-label">
            {t.finishLabel}
          </span>
          <div className="chips" role="group" aria-labelledby="finish-label">
            {t.finishes.map((f) => (
              <button
                key={f.id}
                type="button"
                className="chip"
                aria-pressed={finish === f.id}
                onClick={() => setFinish(f.id as FinishId)}
              >
                <span className="swatch" style={{ ["--swatch" as string]: swatches[f.id as FinishId] }} />
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="light-note">{t.note}</p>
    </section>
  );
}

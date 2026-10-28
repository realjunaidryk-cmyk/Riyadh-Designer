"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Lang } from "@/content/site";
import { dayTimes, formatClock, riyadhNow } from "@/lib/sun";

type FinishId = "plaster" | "travertine" | "athl" | "lime";

const copy = {
  en: {
    time: "Time in Riyadh",
    finish: "Wall finish",
    sunrise: "Sunrise",
    noon: "Noon",
    sunset: "Sunset",
    label: "A 3D majlis with triangular openings. The light moves with the time you choose.",
    finishes: { plaster: "Mud plaster", travertine: "Travertine", athl: "Timber", lime: "White lime" },
  },
  ar: {
    time: "الوقت في الرياض",
    finish: "تشطيب الجدار",
    sunrise: "الشروق",
    noon: "الظهر",
    sunset: "الغروب",
    label: "مجلس ثلاثي الأبعاد بفتحات مثلثة. يتحرك الضوء مع الوقت الذي تختاره.",
    finishes: { plaster: "لياسة طينية", travertine: "ترافرتين", athl: "خشب", lime: "جير أبيض" },
  },
};

const swatches: Record<FinishId, string> = {
  plaster: "#b48a62",
  travertine: "#d6cab3",
  athl: "#6f4b31",
  lime: "#e7e2d7",
};

type SceneApi = { setSun: (m: number) => void; setFinish: (id: FinishId) => void; dispose: () => void };

// A live 3D majlis lit by the real sun path over Riyadh for today's date.
export function LightRoom({ lang, initialFinish = "plaster" }: { lang: Lang; initialFinish?: FinishId }) {
  const t = copy[lang];
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<SceneApi | null>(null);
  const today = useMemo(() => new Date(), []);
  const times = useMemo(() => dayTimes(today), [today]);
  const min = Math.ceil(times.sunrise + 10);
  const max = Math.floor(times.sunset - 10);
  const [minutes, setMinutes] = useState(() => Math.round((times.noon + max) / 2));
  const [finish, setFinish] = useState<FinishId>(initialFinish);
  const [on, setOn] = useState(false);
  const touched = useRef(false);
  const swept = useRef(false);

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
          setOn(true);
        } catch {
          setOn(false);
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

  // when the room first comes into view, the sun travels from morning to the time it is now in Riyadh
  useEffect(() => {
    if (!on) return;
    const now = riyadhNow();
    const target = now > min + 30 && now < max - 10 ? now : Math.round(times.noon + 200);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || swept.current) return;
        swept.current = true;
        io.disconnect();
        if (reduce || touched.current) return setMinutes(target);
        const from = min + 20;
        const start = performance.now();
        const step = (time: number) => {
          if (touched.current) return;
          const k = Math.min(1, (time - start) / 2600);
          setMinutes(Math.round(from + (target - from) * (1 - Math.pow(1 - k, 4))));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.45 },
    );
    io.observe(host.current!);
    return () => io.disconnect();
  }, [on, min, max, times.noon]);

  useEffect(() => api.current?.setSun(minutes), [minutes]);
  useEffect(() => api.current?.setFinish(finish), [finish]);

  const clock = formatClock(minutes, lang);

  return (
    <div>
      <div className="room" ref={host} role="img" aria-label={t.label} />
      <div className="room-controls">
        <div>
          <label className="control-label" htmlFor="sun-time">
            <span>{t.time}</span>
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
            <span>
              {t.noon} {formatClock(times.noon, lang)}
            </span>
            <span>
              {t.sunset} {formatClock(times.sunset, lang)}
            </span>
          </div>
        </div>
        <div>
          <span className="control-label" id="finish-label">
            {t.finish}
          </span>
          <div className="chips" role="group" aria-labelledby="finish-label">
            {(Object.keys(swatches) as FinishId[]).map((id) => (
              <button key={id} type="button" className="chip" aria-pressed={finish === id} onClick={() => setFinish(id)}>
                <span className="swatch" style={{ ["--swatch" as string]: swatches[id] }} />
                {t.finishes[id]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

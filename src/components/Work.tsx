"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Dictionary } from "@/content/dictionary";
import type { ResolvedSlot } from "@/content/media";
import { Media } from "./Media";

type Project = Dictionary["work"]["projects"][number];

export function Work({ t, pics }: { t: Dictionary["work"]; pics: Record<string, ResolvedSlot> }) {
  const firstWork = t.projects.findIndex((p) => p.kind === "work");
  const items: ReactNode[] = [];
  t.projects.forEach((p, i) => {
    items.push(<ProjectItem key={p.id} p={p} place={i % 3} slot={pics[p.id]} anchor={i === firstWork} seed={20 + i} />);
    if (i === 1) {
      items.push(
        <p className="remark" key="remark" data-reveal>
          {t.remark}
        </p>,
      );
    }
  });

  return (
    <section className="work section" id="work" aria-labelledby="work-title">
      <h2 className="head work-title" id="work-title" data-reveal>
        {t.title}
      </h2>
      <div className="grid">{items}</div>
    </section>
  );
}

function ProjectItem({
  p,
  place,
  slot,
  anchor,
  seed,
}: {
  p: Project;
  place: number;
  slot: ResolvedSlot;
  anchor: boolean;
  seed: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // the picture drifts inside its frame, under 8% of its height
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"]);

  return (
    <article className="project" data-place={place} ref={ref} id={anchor ? "work-commercial" : undefined}>
      <h3 className="project-name" data-reveal>
        {p.name}
      </h3>
      <div data-reveal="wipe">
        <ParallaxFrame slot={slot} alt={`${p.name}. ${p.line}`} seed={seed} y={y} />
      </div>
      <p className="project-line" data-reveal style={{ ["--i" as string]: 2 }}>
        {p.line}
      </p>
    </article>
  );
}

function ParallaxFrame({
  slot,
  alt,
  seed,
  y,
}: {
  slot: ResolvedSlot;
  alt: string;
  seed: number;
  y: MotionValue<string>;
}) {
  return (
    <div className="frame" style={{ ["--ratio" as string]: slot.ratio }}>
      <motion.div style={{ y, position: "absolute", inset: "-5% 0", height: "110%" }}>
        <Media slot={slot} alt={alt} seed={seed} style={{ height: "100%", aspectRatio: "auto" }} />
      </motion.div>
    </div>
  );
}

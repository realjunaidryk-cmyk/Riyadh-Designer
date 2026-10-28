"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Dictionary } from "@/content/dictionary";
import type { ResolvedSlot } from "@/content/media";
import { Media } from "./Media";

// The staircase statement. Each word fills from 45% to full ink as the sentence passes the middle of the screen.
export function Intro({ t, pics }: { t: Dictionary["intro"]; pics: [ResolvedSlot, ResolvedSlot] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });

  const words = t.lines.map((line) => line.split(" "));
  const total = words.flat().length;
  let index = 0;

  return (
    <section className="intro" aria-label={t.lines.join(" ")}>
      <p className="stair" ref={ref}>
        {words.map((line, li) => (
          <span className="step" key={li}>
            {line.map((word, wi) => {
              const i = index++;
              return (
                <span key={wi}>
                  {reduce ? word : <Word progress={scrollYProgress} start={i / total} end={(i + 1) / total} word={word} />}
                  {wi < line.length - 1 ? " " : ""}
                </span>
              );
            })}
          </span>
        ))}
      </p>
      <div className="intro-pics">
        <Media slot={pics[0]} alt={t.alt[0]} seed={11} className="drift" />
        <Media slot={pics[1]} alt={t.alt[1]} seed={12} className="drift" />
      </div>
      <p className="intro-note">{t.note}</p>
    </section>
  );
}

function Word({ progress, start, end, word }: { progress: MotionValue<number>; start: number; end: number; word: string }) {
  const opacity = useTransform(progress, [start, end], [0.45, 1]);
  return <motion.span style={{ opacity }}>{word}</motion.span>;
}

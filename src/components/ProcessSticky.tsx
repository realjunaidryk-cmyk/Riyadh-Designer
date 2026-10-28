"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Desktop: one sticky picture beside the steps, changing as each step reaches the middle of the screen.
// Phone: the steps stack, each with its own picture (CSS).
export function ProcessSticky({ visuals, steps }: { visuals: ReactNode[]; steps: ReactNode[] }) {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = Array.from(list.current?.children ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(items.indexOf(e.target));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="process">
      <div className="process-visual" aria-hidden="true">
        {visuals.map((v, i) => (
          <div className="layer" key={i} data-on={i === active}>
            {v}
          </div>
        ))}
      </div>
      <ol ref={list}>
        {steps.map((s, i) => (
          <li className="step" key={i} aria-current={i === active ? "step" : undefined}>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

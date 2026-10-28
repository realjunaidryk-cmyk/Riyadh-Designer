"use client";

import { useEffect, useState } from "react";
import type { Dictionary, Lang } from "@/content/dictionary";

export function Nav({ t, lang }: { t: Dictionary["nav"]; lang: Lang }) {
  const [hidden, setHidden] = useState(false);

  // Steps out of the way while reading down, returns as soon as the visitor scrolls up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const other = lang === "en" ? "ar" : "en";

  return (
    <header className="nav" data-hidden={hidden}>
      <a className="wordmark" href={`/${lang}`} aria-label={t.home}>
        {lang === "ar" ? "رياض ديزاينر" : "Riyadh Designer"}
      </a>
      <nav aria-label="Main">
        <ul className="nav-links">
          {t.links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="nav-end">
        <a className="lang link" href={`/${other}`} hrefLang={other} lang={other} aria-label={t.switchName}>
          {t.switchLabel}
        </a>
        <a className="button" href="#contact">
          {t.action}
        </a>
      </div>
    </header>
  );
}

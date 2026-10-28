"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { path, site, whatsappLink, type Lang } from "@/content/site";
import type { UI } from "@/content/ui";
import { CloseIcon, WhatsAppIcon } from "./Icons";

const links = [
  ["", "home"],
  ["/about", "about"],
  ["/services", "services"],
  ["/projects", "projects"],
  ["/blog", "blog"],
  ["/contact", "contact"],
] as const;

export function Header({ lang, t }: { lang: Lang; t: Pick<UI, "nav" | "cta"> }) {
  const pathname = usePathname() ?? `/${lang}`;
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // over the held hero the bar stays transparent; once the hero starts to scroll away it turns solid
      const heroEnd = isHome
        ? (document.querySelector(".hero")?.getBoundingClientRect().bottom ?? 0) + y - window.innerHeight
        : 40;
      setScrolled(y > (isHome ? heroEnd : 40));
      setHidden(y > 400 && y > last + 6 && !(isHome && y < heroEnd));
      if (y < last - 6) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      menuBtn.current?.focus();
    };
  }, [open]);

  const other: Lang = lang === "en" ? "ar" : "en";
  const otherPath = pathname.replace(new RegExp(`^/${lang}`), `/${other}`);
  const isCurrent = (p: string) => (p === "" ? isHome : pathname.startsWith(path(lang, p)));

  return (
    <>
      <header className="header" data-over={isHome && !scrolled} data-solid={!isHome || scrolled} data-hidden={hidden && !open}>
        <div className="container header-inner">
          <Link className="brand" href={path(lang)} aria-label={site.name[lang]}>
            <span className="brand-name">RIYADH</span>
            <span className="brand-sub">Interior Decor</span>
          </Link>
          <nav aria-label={t.nav.menu}>
            <ul className="nav-list">
              {links.map(([p, key]) => (
                <li key={key}>
                  <Link href={path(lang, p)} aria-current={isCurrent(p) ? "page" : undefined}>
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-actions">
            <Link className="lang-link" href={otherPath} hrefLang={other} lang={other} aria-label={t.nav.languageName}>
              {t.nav.language}
            </Link>
            <a className="btn btn-outline" href={whatsappLink()} target="_blank" rel="noopener" data-track="whatsapp_click">
              <WhatsAppIcon />
              {t.cta.whatsappShort}
            </a>
            <button
              ref={menuBtn}
              className="menu-btn"
              type="button"
              aria-expanded={open}
              aria-controls="drawer"
              aria-label={t.nav.menu}
              onClick={() => setOpen(true)}
            >
              <span className="bars" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="drawer" id="drawer" role="dialog" aria-modal="true" aria-label={t.nav.menu}>
          <div className="drawer-top">
            <span className="brand">
              <span className="brand-name">RIYADH</span>
              <span className="brand-sub">Interior Decor</span>
            </span>
            <button ref={closeBtn} className="close" type="button" aria-label={t.nav.close} onClick={() => setOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <nav aria-label={t.nav.menu}>
            <ul>
              {links.map(([p, key]) => (
                <li key={key}>
                  <Link href={path(lang, p)} aria-current={isCurrent(p) ? "page" : undefined} onClick={() => setOpen(false)}>
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="drawer-actions">
            <a className="btn btn-primary" href={whatsappLink()} target="_blank" rel="noopener" data-track="whatsapp_click">
              <WhatsAppIcon />
              {t.cta.whatsapp}
            </a>
            <a className="btn btn-outline" href={site.phoneHref} data-track="phone_click">
              {t.cta.call} <span className="ltr">{site.phone}</span>
            </a>
            <Link className="lang-link" href={otherPath} hrefLang={other} lang={other}>
              {t.nav.language}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

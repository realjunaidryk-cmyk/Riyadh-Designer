import Link from "next/link";
import { categories } from "@/content/categories";
import { services } from "@/content/services";
import { path, site, whatsappLink, type Lang } from "@/content/site";
import type { UI } from "@/content/ui";

const socialNames = { instagram: "Instagram", tiktok: "TikTok", x: "X", facebook: "Facebook", linkedin: "LinkedIn" };

export function Footer({ lang, t }: { lang: Lang; t: UI }) {
  const socials = Object.entries(site.socials).filter(([, url]) => url) as [keyof typeof socialNames, string][];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link className="brand" href={path(lang)}>
              <span className="brand-name">RIYADH</span>
              <span className="brand-sub">Interior Decor</span>
            </Link>
            <p className="statement">{t.footer.statement}</p>
          </div>
          <div>
            <h2>{t.footer.services}</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={path(lang, `/services/${s.slug}`)}>{s.title[lang]}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t.footer.rooms}</h2>
            <ul>
              {categories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={path(lang, `/projects?category=${c.slug}`)}>{c.title[lang]}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t.footer.studio}</h2>
            <ul>
              <li>
                <Link href={path(lang, "/about")}>{t.nav.about}</Link>
              </li>
              <li>
                <Link href={path(lang, "/projects")}>{t.nav.projects}</Link>
              </li>
              <li>
                <Link href={path(lang, "/blog")}>{t.nav.blog}</Link>
              </li>
              <li>
                <Link href={path(lang, "/contact")}>{t.nav.contact}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>{t.footer.contact}</h2>
            <ul>
              <li>
                <a href={site.phoneHref} data-track="phone_click">
                  <span className="ltr">{site.phone}</span>
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener" data-track="whatsapp_click">
                  {t.cta.whatsapp}
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              )}
              <li>
                <span className="muted">{site.area[lang]}</span>
              </li>
              {socials.map(([k, url]) => (
                <li key={k}>
                  <a href={url} target="_blank" rel="noopener">
                    {socialNames[k]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <svg className="footer-mark" viewBox="0 0 1000 78" aria-hidden="true" focusable="false" style={{ direction: "ltr" }}>
          <text x="0" y="68" fontSize="86" textLength="1000" lengthAdjust="spacingAndGlyphs">
            RIYADH INTERIOR DECOR
          </text>
        </svg>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name[lang]}. {t.footer.rights}
          </span>
          <span>{site.area[lang]}</span>
        </div>
      </div>
    </footer>
  );
}

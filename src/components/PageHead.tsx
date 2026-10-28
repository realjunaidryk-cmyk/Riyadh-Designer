import Link from "next/link";
import { path, type Lang } from "@/content/site";
import { ui } from "@/content/ui";

export function PageHead({
  lang,
  title,
  lead,
  crumbs = [],
}: {
  lang: Lang;
  title: string;
  lead?: string;
  crumbs?: { href: string; label: string }[];
}) {
  const t = ui[lang];
  return (
    <header className="page-head container">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href={path(lang)}>{t.nav.home}</Link>
        {crumbs.map((c) => (
          <span key={c.href}>
            <span aria-hidden="true">/ </span>
            <Link href={c.href}>{c.label}</Link>
          </span>
        ))}
      </nav>
      <h1 className="serif h1" data-reveal>
        {title}
      </h1>
      {lead && (
        <p className="lead" style={{ marginTop: 20 }} data-reveal>
          {lead}
        </p>
      )}
    </header>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { img } from "@/content/images";
import { projects } from "@/content/projects";
import { getService, services } from "@/content/services";
import { isLang, languages, path, whatsappLink } from "@/content/site";
import { ui } from "@/content/ui";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon, WhatsAppIcon } from "@/components/Icons";
import { Img } from "@/components/Img";
import { PageHead } from "@/components/PageHead";
import { ProjectCard } from "@/components/ProjectCard";

export function generateStaticParams() {
  return languages.flatMap((lang) => services.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = getService(slug);
  if (!isLang(lang) || !s) return {};
  return { title: s.title[lang], description: s.short[lang], alternates: { canonical: `/${lang}/services/${slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const s = getService(slug);
  if (!isLang(lang) || !s) notFound();
  const t = ui[lang];
  const related = projects.filter((p) => s.related.includes(p.category)).slice(0, 2);
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHead
        lang={lang}
        title={s.title[lang]}
        lead={s.short[lang]}
        crumbs={[{ href: path(lang, "/services"), label: t.nav.services }]}
      />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <div className="split" style={{ alignItems: "start" }}>
          <div data-reveal="clip">
            <Img img={img(s.image)} lang={lang} sizes="(max-width: 860px) 100vw, 50vw" priority />
          </div>
          <div>
            <p className="prose" data-reveal>
              {s.intro[lang]}
            </p>
            <h2 className="serif h3" style={{ marginTop: 40, marginBottom: 8 }}>
              {t.services.includes}
            </h2>
            <ul className="sub-list">
              {s.subs.map((x, i) => (
                <li key={x.title.en} data-reveal style={{ ["--i" as string]: i }}>
                  <h3>{x.title[lang]}</h3>
                  <p>{x.text[lang]}</p>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
              <a
                className="btn btn-primary"
                href={whatsappLink(`${t.cta.discuss}: ${s.title[lang]}`)}
                target="_blank"
                rel="noopener"
                data-track="whatsapp_click"
              >
                <WhatsAppIcon />
                {t.cta.discuss}
              </a>
              <Link className="btn btn-outline" href={path(lang, "/contact")}>
                {t.cta.quote}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section band" aria-labelledby="related-title">
          <div className="container">
            <h2 className="serif h2" id="related-title" style={{ marginBottom: 48 }}>
              {t.services.related}
            </h2>
            <div className="proj-grid">
              {related.map((p, i) => (
                <ProjectCard key={p.slug} p={p} lang={lang} t={t} i={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="others-title">
        <div className="container">
          <h2 className="serif h2" id="others-title" style={{ marginBottom: 32 }}>
            {t.services.others}
          </h2>
          <ul className="svc-list">
            {others.map((o) => (
              <li className="svc" key={o.slug}>
                <h3>
                  <Link href={path(lang, `/services/${o.slug}`)}>{o.title[lang]}</Link>
                </h3>
                <p>{o.short[lang]}</p>
                <span className="text-link" aria-hidden="true">
                  {t.cta.readMore}
                  <ArrowIcon className="icon arrow" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand lang={lang} t={t} />
    </>
  );
}

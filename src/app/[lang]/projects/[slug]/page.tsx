import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory } from "@/content/categories";
import { img } from "@/content/images";
import { getProject, projects } from "@/content/projects";
import { isLang, languages, path } from "@/content/site";
import { ui } from "@/content/ui";
import { CtaBand } from "@/components/CtaBand";
import { Img } from "@/components/Img";
import { PageHead } from "@/components/PageHead";
import { ProjectCard } from "@/components/ProjectCard";

export function generateStaticParams() {
  return languages.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!isLang(lang) || !p) return {};
  return { title: p.title[lang], description: p.summary[lang], alternates: { canonical: `/${lang}/projects/${slug}` } };
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!isLang(lang) || !p) notFound();
  const t = ui[lang];
  const cat = getCategory(p.category);
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 2);
  const labels = {
    type: lang === "ar" ? "النوع" : "Type",
    location: lang === "ar" ? "الموقع" : "Location",
    category: lang === "ar" ? "التصنيف" : "Category",
    status: lang === "ar" ? "الحالة" : "Status",
  };

  return (
    <>
      <PageHead
        lang={lang}
        title={p.title[lang]}
        lead={p.summary[lang]}
        crumbs={[{ href: path(lang, "/projects"), label: t.nav.projects }]}
      />
      <section className="container detail-hero" data-reveal="clip">
        <Img img={img(p.hero)} lang={lang} sizes="100vw" priority />
      </section>
      <section className="container">
        <dl className="facts">
          <div>
            <dt>{labels.type}</dt>
            <dd>{p.type[lang]}</dd>
          </div>
          <div>
            <dt>{labels.location}</dt>
            <dd>{p.location[lang]}</dd>
          </div>
          {cat && (
            <div>
              <dt>{labels.category}</dt>
              <dd>{cat.title[lang]}</dd>
            </div>
          )}
          <div>
            <dt>{labels.status}</dt>
            <dd>{p.status === "concept" ? t.projects.concept : lang === "ar" ? "منفذ" : "Completed"}</dd>
          </div>
        </dl>
        {p.status === "concept" && (
          <p className="note" style={{ marginTop: 24 }}>
            {t.projects.conceptNote}
          </p>
        )}
      </section>

      <section className="section container">
        <div className="split" style={{ alignItems: "start" }}>
          <div className="prose">
            <h2 className="serif h3">{t.projects.overview}</h2>
            <p style={{ marginTop: 14 }}>{p.overview[lang]}</p>
            <h2 className="serif h3" style={{ marginTop: 40 }}>
              {t.projects.approach}
            </h2>
            <p style={{ marginTop: 14 }}>{p.approach[lang]}</p>
          </div>
          <div>
            <h2 className="serif h3" style={{ marginBottom: 16 }}>
              {t.projects.materials}
            </h2>
            <ul className="material-list">
              {p.materials.map((m) => (
                <li key={m.en}>{m[lang]}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container" aria-labelledby="gallery-title" style={{ paddingBottom: "var(--section)" }}>
        <h2 className="serif h2" id="gallery-title" style={{ marginBottom: 32 }}>
          {t.projects.gallery}
        </h2>
        <div className="gallery">
          {p.gallery.map((key, i) => (
            <div key={key} data-reveal="clip" style={{ ["--i" as string]: i }}>
              <Img img={img(key)} lang={lang} sizes={i === 2 ? "100vw" : "(max-width: 760px) 100vw, 50vw"} />
            </div>
          ))}
        </div>
      </section>

      <section className="section band" aria-labelledby="related-title">
        <div className="container">
          <h2 className="serif h2" id="related-title" style={{ marginBottom: 48 }}>
            {t.projects.related}
          </h2>
          <div className="proj-grid">
            {related.map((x, i) => (
              <ProjectCard key={x.slug} p={x} lang={lang} t={t} i={i} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand lang={lang} t={t} />
    </>
  );
}

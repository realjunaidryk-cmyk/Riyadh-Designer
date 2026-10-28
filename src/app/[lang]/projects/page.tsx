import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, groups } from "@/content/categories";
import { projects } from "@/content/projects";
import { isLang, path } from "@/content/site";
import { ui } from "@/content/ui";
import { CtaBand } from "@/components/CtaBand";
import { PageHead } from "@/components/PageHead";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsBrowser } from "@/components/ProjectsBrowser";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: ui[lang].projects.title, description: ui[lang].projects.lead, alternates: { canonical: `/${lang}/projects` } };
}

const counts = {
  en: ["No projects", "1 project", "{n} projects"],
  ar: ["لا توجد مشاريع", "مشروع واحد", "مشروعان", "{n} مشاريع"],
};

export default async function Projects({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = ui[lang];
  const groupsOf = (slug: string) => categories.find((c) => c.slug === slug)?.groups ?? [];

  return (
    <>
      <PageHead lang={lang} title={t.projects.title} lead={t.projects.lead} />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <p className="note" style={{ marginBottom: 40 }}>
          {t.projects.conceptNote}
        </p>
        <ProjectsBrowser
          items={projects.map((p, i) => ({
            slug: p.slug,
            category: p.category,
            groups: groupsOf(p.category),
            card: <ProjectCard p={p} lang={lang} t={t} i={i} />,
          }))}
          groups={groups.map((g) => ({ id: g.id, label: g.label[lang] }))}
          categories={Object.fromEntries(categories.map((c) => [c.slug, c.title[lang]]))}
          labels={{
            filterLabel: t.projects.filterLabel,
            empty: t.projects.empty,
            emptyCta: t.projects.emptyCta,
            count: counts[lang],
            all: groups[0].label[lang],
          }}
          contactHref={path(lang, "/contact")}
        />
      </section>
      <CtaBand lang={lang} t={t} />
    </>
  );
}

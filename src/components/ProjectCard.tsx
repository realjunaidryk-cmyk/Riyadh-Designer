import Link from "next/link";
import { img } from "@/content/images";
import type { Project } from "@/content/projects";
import { path, type Lang } from "@/content/site";
import type { UI } from "@/content/ui";
import { Img } from "./Img";

export function ProjectCard({ p, lang, t, i = 0 }: { p: Project; lang: Lang; t: UI; i?: number }) {
  return (
    <article className="proj">
      <Link href={path(lang, `/projects/${p.slug}`)}>
        <div data-reveal="clip" style={{ ["--i" as string]: i % 2 }}>
          <Img img={img(p.hero)} lang={lang} sizes="(max-width: 860px) 100vw, 50vw">
            {p.status === "concept" && <span className="tag">{t.projects.concept}</span>}
          </Img>
        </div>
        <div className="proj-meta">
          <span>{p.type[lang]}</span>
          <span>{p.location[lang]}</span>
        </div>
        <h3 className="proj-title">{p.title[lang]}</h3>
        <p className="proj-summary">{p.summary[lang]}</p>
      </Link>
    </article>
  );
}

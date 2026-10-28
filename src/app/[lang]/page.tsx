import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { categories } from "@/content/categories";
import { img } from "@/content/images";
import { process } from "@/content/process";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { isLang, path, whatsappLink } from "@/content/site";
import { ui } from "@/content/ui";
import { CtaBand } from "@/components/CtaBand";
import { HeroScrub } from "@/components/HeroScrub";
import { ArrowIcon } from "@/components/Icons";
import { Img } from "@/components/Img";
import { LightRoom } from "@/components/LightRoom";
import { ProcessSticky } from "@/components/ProcessSticky";
import { ProjectCard } from "@/components/ProjectCard";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = ui[lang];
  const pad = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <>
      <HeroScrub lang={lang} t={{ hero: t.hero, cta: t.cta }} projectsHref={path(lang, "/projects")} whatsappHref={whatsappLink()} />

      {/* Interior categories */}
      <section className="section" aria-labelledby="cat-title">
        <div className="container">
          <div className="section-head">
            <h2 className="serif h1" id="cat-title" data-reveal>
              {t.categories.title}
            </h2>
            <p className="lead" data-reveal>
              {t.categories.lead}
            </p>
          </div>
          <div className="cat-grid">
            {categories.map((c, i) => (
              <Link
                className="cat"
                key={c.slug}
                href={path(lang, `/projects?category=${c.slug}`)}
                data-reveal
                style={{ ["--i" as string]: i % 3 }}
              >
                <Img img={img(c.image)} lang={lang} fill sizes="(max-width: 520px) 100vw, (max-width: 960px) 50vw, 40vw" />
                <span className="cat-body">
                  <span className="cat-title">{c.title[lang]}</span>
                  <span className="cat-text">
                    <span>{c.text[lang]}</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="section band" aria-labelledby="proj-title">
        <div className="container">
          <div className="section-head">
            <h2 className="serif h1" id="proj-title" data-reveal>
              {t.projects.title}
            </h2>
            <p className="lead" data-reveal>
              {t.projects.conceptNote}
            </p>
          </div>
          <div className="proj-grid">
            {projects.slice(0, 4).map((p, i) => (
              <ProjectCard key={p.slug} p={p} lang={lang} t={t} i={i} />
            ))}
          </div>
          <div style={{ marginTop: 64 }}>
            <Link className="btn btn-outline" href={path(lang, "/projects")}>
              {t.cta.viewAll}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" aria-labelledby="svc-title">
        <div className="container">
          <div className="section-head">
            <h2 className="serif h1" id="svc-title" data-reveal>
              {t.services.title}
            </h2>
            <p className="lead" data-reveal>
              {t.services.lead}
            </p>
          </div>
          <ul className="svc-list">
            {services.map((s, i) => (
              <li className="svc" key={s.slug} data-reveal style={{ ["--i" as string]: i % 3 }}>
                <h3>
                  <Link href={path(lang, `/services/${s.slug}`)}>{s.title[lang]}</Link>
                </h3>
                <p>{s.short[lang]}</p>
                <span className="text-link" aria-hidden="true">
                  {t.cta.readMore}
                  <ArrowIcon className="icon arrow" />
                </span>
                <div className="thumb" aria-hidden="true">
                  <Img img={img(s.image)} lang={lang} sizes="180px" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="section band" aria-labelledby="process-title">
        <div className="container">
          <div className="section-head">
            <h2 className="serif h1" id="process-title" data-reveal>
              {t.process.title}
            </h2>
            <p className="lead" data-reveal>
              {t.process.lead}
            </p>
          </div>
          <ProcessSticky
            visuals={process.map((s) => (
              <Img key={s.image} img={img(s.image)} lang={lang} fill sizes="45vw" />
            ))}
            steps={process.map((s, i) => (
              <Fragment key={s.image}>
                <span className="step-num" aria-hidden="true">
                  {pad(i)}
                </span>
                <h3>{s.title[lang]}</h3>
                <p>{s.text[lang]}</p>
                <Img img={img(s.image)} lang={lang} sizes="100vw" />
              </Fragment>
            ))}
          />
        </div>
      </section>

      {/* 3D visualisation */}
      <section className="section dark" aria-labelledby="majlis-title">
        <div className="container">
          <div className="section-head">
            <h2 className="serif h1" id="majlis-title" data-reveal>
              {t.majlis.title}
            </h2>
            <p className="lead" data-reveal>
              {t.majlis.text}
            </p>
          </div>
          <LightRoom lang={lang} />
        </div>
      </section>

      <CtaBand lang={lang} t={t} />
    </>
  );
}

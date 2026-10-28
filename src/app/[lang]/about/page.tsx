import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { img } from "@/content/images";
import { isLang, type Lang } from "@/content/site";
import { ui } from "@/content/ui";
import { CtaBand } from "@/components/CtaBand";
import { Img } from "@/components/Img";
import { PageHead } from "@/components/PageHead";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: ui[lang].about.title, description: ui[lang].about.body[0], alternates: { canonical: `/${lang}/about` } };
}

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  if (!isLang(lang)) notFound();
  const t = ui[lang];
  return (
    <>
      <PageHead lang={lang} title={t.about.title} lead={t.about.lead} />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <div className="split">
          <div data-reveal="clip">
            <Img img={img("about-studio")} lang={lang} sizes="(max-width: 860px) 100vw, 50vw" priority />
          </div>
          <div className="prose">
            {t.about.body.map((p, i) => (
              <p key={i} data-reveal style={{ ["--i" as string]: i }}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <ul className="values">
          {t.about.values.map((v, i) => (
            <li key={v.title} data-reveal style={{ ["--i" as string]: i }}>
              <h2 className="h3">{v.title}</h2>
              <p>{v.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand lang={lang} t={t} />
    </>
  );
}

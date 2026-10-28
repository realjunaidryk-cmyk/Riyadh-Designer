import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { img } from "@/content/images";
import { services } from "@/content/services";
import { isLang, path } from "@/content/site";
import { ui } from "@/content/ui";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon } from "@/components/Icons";
import { Img } from "@/components/Img";
import { PageHead } from "@/components/PageHead";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: ui[lang].services.title, description: ui[lang].services.page, alternates: { canonical: `/${lang}/services` } };
}

export default async function Services({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = ui[lang];
  return (
    <>
      <PageHead lang={lang} title={t.services.title} lead={t.services.page} />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <ul className="svc-cards">
          {services.map((s, i) => (
            <li className="svc-card" key={s.slug} data-reveal style={{ ["--i" as string]: i % 3 }}>
              <Link href={path(lang, `/services/${s.slug}`)}>
                <Img img={img(s.image)} lang={lang} sizes="(max-width: 720px) 100vw, 33vw" />
                <h2>{s.title[lang]}</h2>
                <p>{s.short[lang]}</p>
                <ul aria-label={t.services.includes}>
                  {s.subs.map((x) => (
                    <li className="tag" key={x.title.en}>
                      {x.title[lang]}
                    </li>
                  ))}
                </ul>
                <span className="text-link">
                  {t.cta.readMore}
                  <ArrowIcon className="icon arrow" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand lang={lang} t={t} />
    </>
  );
}

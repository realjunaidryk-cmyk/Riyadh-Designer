import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/content/blog";
import { getService } from "@/content/services";
import { isLang, languages, path } from "@/content/site";
import { ui } from "@/content/ui";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon } from "@/components/Icons";
import { PageHead } from "@/components/PageHead";

export function generateStaticParams() {
  return languages.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getPost(slug);
  if (!isLang(lang) || !p) return {};
  return {
    title: p.title[lang],
    description: p.excerpt[lang],
    alternates: { canonical: `/${lang}/blog/${slug}` },
    openGraph: { type: "article", publishedTime: p.date },
  };
}

export default async function PostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const p = getPost(slug);
  if (!isLang(lang) || !p) notFound();
  const t = ui[lang];
  const service = p.service ? getService(p.service) : undefined;
  const fmt = new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-GB", { dateStyle: "long" });

  return (
    <>
      <PageHead lang={lang} title={p.title[lang]} lead={p.excerpt[lang]} crumbs={[{ href: path(lang, "/blog"), label: t.nav.blog }]} />
      <article className="container article" style={{ paddingBottom: "var(--section)" }}>
        <div className="prose">
          <p className="muted">
            <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
          </p>
          {p.body.map((b, i) => (
            <div key={i}>
              {b.heading && <h2>{b.heading[lang]}</h2>}
              <p>{b.text[lang]}</p>
            </div>
          ))}
          {service && (
            <p style={{ marginTop: 48 }}>
              <span className="muted">{t.blog.service}: </span>
              <Link className="text-link" href={path(lang, `/services/${service.slug}`)}>
                {service.title[lang]}
                <ArrowIcon className="icon arrow" />
              </Link>
            </p>
          )}
        </div>
      </article>
      <CtaBand lang={lang} t={t} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/blog";
import { isLang, path } from "@/content/site";
import { ui } from "@/content/ui";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon } from "@/components/Icons";
import { PageHead } from "@/components/PageHead";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: ui[lang].blog.title, description: ui[lang].blog.lead, alternates: { canonical: `/${lang}/blog` } };
}

export default async function Blog({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = ui[lang];
  const fmt = new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-GB", { dateStyle: "long" });
  return (
    <>
      <PageHead lang={lang} title={t.blog.title} lead={t.blog.lead} />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <ul className="post-list">
          {posts.map((p, i) => (
            <li className="post-item" key={p.slug} data-reveal style={{ ["--i" as string]: i }}>
              <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
              <div>
                <h2>
                  <Link href={path(lang, `/blog/${p.slug}`)}>{p.title[lang]}</Link>
                </h2>
                <p>{p.excerpt[lang]}</p>
              </div>
              <Link className="text-link" href={path(lang, `/blog/${p.slug}`)} aria-label={`${t.blog.read}: ${p.title[lang]}`}>
                {t.blog.read}
                <ArrowIcon className="icon arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand lang={lang} t={t} />
    </>
  );
}

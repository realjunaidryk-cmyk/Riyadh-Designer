import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/content/categories";
import { isLang, site, whatsappLink } from "@/content/site";
import { ui } from "@/content/ui";
import { ContactForm } from "@/components/ContactForm";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { PageHead } from "@/components/PageHead";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: ui[lang].nav.contact, description: ui[lang].contact.lead, alternates: { canonical: `/${lang}/contact` } };
}

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = ui[lang];
  return (
    <>
      <PageHead lang={lang} title={t.contact.title} lead={t.contact.lead} />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <div className="contact-grid">
          <div>
            <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
              <a className="btn btn-primary" href={whatsappLink()} target="_blank" rel="noopener" data-track="whatsapp_click">
                <WhatsAppIcon />
                {t.cta.whatsapp}
              </a>
              <a className="btn btn-outline" href={site.phoneHref} data-track="phone_click">
                <PhoneIcon />
                <span className="ltr">{site.phone}</span>
              </a>
            </div>
            <dl className="contact-list">
              <div>
                <dt>{t.contact.phone}</dt>
                <dd>
                  <a href={site.phoneHref} data-track="phone_click">
                    <span className="ltr">{site.phone}</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt>{t.contact.whatsapp}</dt>
                <dd>
                  <a href={whatsappLink()} target="_blank" rel="noopener" data-track="whatsapp_click">
                    <span className="ltr">{site.phone}</span>
                  </a>
                </dd>
              </div>
              {site.email && (
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </dd>
                </div>
              )}
              <div>
                <dt>{t.contact.area}</dt>
                <dd>{site.address ? site.address[lang] : site.area[lang]}</dd>
              </div>
            </dl>
          </div>
          <ContactForm lang={lang} types={categories.map((c) => ({ value: c.slug, label: c.title[lang] }))} />
        </div>
      </section>
    </>
  );
}

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isLang, languages, site, whatsappLink } from "@/content/site";
import { ui } from "@/content/ui";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveals } from "@/components/Reveals";
import { Analytics } from "@/components/Analytics";
import { WhatsAppIcon } from "@/components/Icons";
import "../globals.css";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name[lang]} | ${site.short[lang]}`, template: `%s | ${site.name[lang]}` },
    description: ui[lang].hero.lead,
    alternates: { canonical: `/${lang}`, languages: { en: "/en", ar: "/ar" } },
    openGraph: { siteName: site.name[lang], locale: lang === "ar" ? "ar_SA" : "en_US", type: "website", images: ["/media/hero/final.jpg"] },
    verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: "#f8f4ee",
  width: "device-width",
  initialScale: 1,
};

const fonts = {
  en: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400..700&family=Josefin+Sans:wght@300..700&display=swap",
  ar: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400..700&family=Reem+Kufi:wght@400..700&family=Noto+Sans+Arabic:wght@300..700&display=swap",
};

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = ui[lang];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InteriorDesigner",
    name: site.name.en,
    telephone: site.phone,
    areaServed: "Riyadh, Saudi Arabia",
    url: site.url,
  };

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={fonts[lang]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip" href="#main">
          {t.skip}
        </a>
        <Header lang={lang} t={{ nav: t.nav, cta: t.cta }} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={t} />
        <a className="wa-float" href={whatsappLink()} target="_blank" rel="noopener" aria-label={t.whatsappFloat} data-track="whatsapp_click">
          <WhatsAppIcon />
          <span>{t.cta.whatsappShort}</span>
        </a>
        <Reveals />
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getDictionary, isLang, languages } from "@/content/dictionary";
import "../globals.css";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { en: "/en", ar: "/ar" } },
  };
}

export const viewport: Viewport = {
  themeColor: "#161c1a",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href={
            lang === "ar"
              ? "https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300..800&family=TikTok+Sans:wdth,wght@75..150,300..900&display=swap"
              : "https://fonts.googleapis.com/css2?family=TikTok+Sans:wdth,wght@75..150,300..900&display=swap"
          }
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

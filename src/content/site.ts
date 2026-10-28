// Business facts. Only verified details go here; anything still unconfirmed is null and is hidden on the site.

export type Lang = "en" | "ar";
export const languages: Lang[] = ["en", "ar"];
export const isLang = (v: string): v is Lang => (languages as string[]).includes(v);

/** a string in both languages */
export type T = { en: string; ar: string };
export const tr = (t: T, lang: Lang) => t[lang];

export const site = {
  name: { en: "Riyadh Interior Decor", ar: "رياض إنتيريور ديكور" } as T,
  short: { en: "Interior design, decoration and fit-out in Riyadh", ar: "تصميم داخلي وديكور وتشطيبات في الرياض" } as T,
  // from the client's homepage audit
  phone: "+966 56 876 3611",
  phoneHref: "tel:+966568763611",
  whatsapp: "966568763611",
  // to confirm with the client before launch
  email: null as string | null,
  address: null as T | null,
  area: { en: "Riyadh, Saudi Arabia", ar: "الرياض، المملكة العربية السعودية" } as T,
  socials: {
    instagram: null,
    tiktok: null,
    x: null,
    facebook: null,
    linkedin: null,
  } as Record<"instagram" | "tiktok" | "x" | "facebook" | "linkedin", string | null>,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",
};

export function whatsappLink(text?: string) {
  return `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function path(lang: Lang, p = "") {
  return `/${lang}${p}`;
}

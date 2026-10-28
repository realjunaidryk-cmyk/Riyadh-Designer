"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** send a GA4 event when analytics is configured; a no-op otherwise */
export function track(name: string, params: Record<string, unknown> = {}) {
  window.gtag?.("event", name, params);
}

// GA4 (set NEXT_PUBLIC_GA_ID) plus click tracking for WhatsApp, phone and anything marked data-track.
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLElement>("a, button");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const name =
        a.dataset.track ?? (href.startsWith("tel:") ? "phone_click" : href.includes("wa.me/") ? "whatsapp_click" : null);
      if (name) track(name, { link_url: href, page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (GA_ID) window.gtag?.("config", GA_ID, { page_path: pathname });
  }, [pathname]);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}

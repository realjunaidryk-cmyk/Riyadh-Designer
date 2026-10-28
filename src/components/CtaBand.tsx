import Link from "next/link";
import { path, site, whatsappLink, type Lang } from "@/content/site";
import type { UI } from "@/content/ui";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

// "Request a quote": prices depend on the project, so the close of every page asks for the brief instead.
export function CtaBand({ lang, t }: { lang: Lang; t: UI }) {
  return (
    <section className="section dark" aria-labelledby="quote-title">
      <div className="container cta-band">
        <div>
          <h2 className="serif h2" id="quote-title" data-reveal>
            {t.quote.title}
          </h2>
          <p className="lead" style={{ marginTop: 20, maxWidth: "58ch" }} data-reveal>
            {t.quote.text}
          </p>
        </div>
        <div className="cta-actions" data-reveal>
          <a className="btn btn-primary" href={whatsappLink()} target="_blank" rel="noopener" data-track="whatsapp_click">
            <WhatsAppIcon />
            {t.cta.whatsapp}
          </a>
          <a className="btn btn-outline" href={site.phoneHref} data-track="phone_click">
            <PhoneIcon />
            <span className="ltr">{site.phone}</span>
          </a>
          <Link className="text-link" href={path(lang, "/contact")} style={{ color: "#e2c19a" }}>
            {t.cta.quote}
            <ArrowIcon className="icon arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import { notFound } from "next/navigation";
import { getDictionary, isLang } from "@/content/dictionary";
import { resolve, slots } from "@/content/media";
import { Media } from "@/components/Media";
import { Nav } from "@/components/Nav";
import { Intro } from "@/components/Intro";
import { LightRoom } from "@/components/LightRoom";
import { Work } from "@/components/Work";
import { Reels } from "@/components/Reels";
import { Process } from "@/components/Process";
import { Reveals } from "@/components/Reveals";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDictionary(lang);

  const doors = [resolve(slots.heroHomes), resolve(slots.heroWork)];
  const materials = [slots.matPlaster, slots.matAthl, slots.matTravertine, slots.matSadu].map(resolve);
  const work = Object.fromEntries(Object.entries(slots.work).map(([k, v]) => [k, resolve(v)]));
  const mail = `mailto:hello@riyadhdesigner.sa?subject=${encodeURIComponent(t.contact.mailSubject)}&body=${encodeURIComponent(
    t.contact.mailBody,
  )}`;
  const whatsapp = "https://wa.me/966110000000";

  return (
    <>
      <a className="skip" href="#main">
        {lang === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}
      </a>
      <div className="page">
        <Nav t={t.nav} lang={lang} />
        <main id="main">
          {/* Hero: two doors on a dark wall */}
          <section className="hero" aria-labelledby="hero-title">
            <h1 className="display" id="hero-title">
              {t.hero.title.map((line, i) => (
                <span className="line" key={i}>
                  <span style={{ ["--i" as string]: i }}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="hero-lead">{t.hero.lead}</p>
            <div className="doors">
              {t.hero.doors.map((d, i) => (
                <a className="door" href={d.href} key={d.name} style={{ ["--i" as string]: i }}>
                  <Media slot={doors[i]} alt={`${d.name}. ${d.line}`} seed={i + 1} priority />
                  <span className="door-name">{d.name}</span>
                  <span className="door-line">{d.line}</span>
                </a>
              ))}
            </div>
          </section>

          <Intro t={t.intro} pics={[resolve(slots.introOpening), resolve(slots.introPlaster)]} />

          <LightRoom t={t.light} lang={lang} />

          {/* Materials: band of unequal panels */}
          <section className="materials section" aria-labelledby="materials-title">
            <h2 className="head materials-title" id="materials-title" data-reveal>
              {t.materials.title}
            </h2>
            <div className="band">
              {t.materials.panels.map((p, i) => (
                <figure className="panel" key={p.name} style={{ ["--grow" as string]: [5, 2, 3, 2][i] }}>
                  <MediaFill slot={materials[i]} alt={p.alt} seed={30 + i} />
                  {i === 0 && (
                    <p className="panel-title">
                      {t.materials.panelTitle[0]}
                      <br />
                      {t.materials.panelTitle[1]}
                    </p>
                  )}
                  <figcaption className="panel-name">{p.name}</figcaption>
                </figure>
              ))}
            </div>
            <p className="materials-caption">{t.materials.caption}</p>
          </section>

          <Work t={t.work} pics={work} />

          <Reels t={t.reels} clips={slots.reels.map(resolve)} lang={lang} />

          <Process t={t.process} pics={slots.process.map(resolve)} />

          {/* FAQ: questions beside a tall photograph */}
          <section className="faq" aria-labelledby="faq-title">
            <div className="grid">
              <div className="faq-text">
                <h2 className="head" id="faq-title" data-reveal>
                  {t.faq.title}
                </h2>
                <ul className="facts" data-reveal style={{ ["--i" as string]: 1 }}>
                  {t.faq.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="qa">
                  {t.faq.items.map((item, i) => (
                    <details key={item.q} name="faq" open={i === 0} data-reveal style={{ ["--i" as string]: i % 3 }}>
                      <summary>
                        {item.q}
                        <span className="chev" aria-hidden="true" />
                      </summary>
                      <p>{item.a}</p>
                    </details>
                  ))}
                </div>
                <div className="faq-actions">
                  <a className="button" href={mail}>
                    {t.faq.action}
                  </a>
                  <a className="link" href={whatsapp} rel="noopener" target="_blank">
                    {t.faq.link}
                  </a>
                </div>
              </div>
              <div className="faq-pics">
                <div data-reveal="wipe">
                  <Media slot={resolve(slots.faqTall)} alt={t.faq.alt[0]} seed={70} />
                </div>
                <div className="square-pic" data-reveal="wipe" style={{ ["--i" as string]: 2 }}>
                  <Media slot={resolve(slots.faqSquare)} alt={t.faq.alt[1]} seed={71} />
                </div>
              </div>
            </div>
          </section>

          {/* Contact: visit card on a photograph */}
          <section className="contact" id="contact" aria-labelledby="contact-title">
            <div className="contact-pic">
              <Media slot={resolve(slots.contactStreet)} alt={t.contact.alt} seed={80} />
            </div>
            <div className="card-wrap">
              <div className="card-sticky">
                <div className="card">
                  <h2 id="contact-title">{t.contact.title}</h2>
                  <address>
                    {t.contact.address[0]}
                    <br />
                    {t.contact.address[1]}
                  </address>
                  <dl className="hours">
                    {t.contact.hours.map((h) => (
                      <div key={h.days}>
                        <dt>{h.days}</dt>
                        <dd>{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                  <a className="phone" href={`tel:${t.contact.phone.replace(/\s/g, "")}`}>
                    {t.contact.phone}
                  </a>
                  <a className="button" href={mail}>
                    {t.contact.action}
                    <Arrow />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="footer">
        <div className="grid footer-cols">
          {t.footer.columns.map((c) => (
            <div key={c.title}>
              <span className="first">{c.title}</span>
              {"lines" in c && c.lines?.map((l) => <span key={l}>{l}</span>)}
              {"links" in c &&
                c.links?.map(([href, label]) => (
                  <a key={label} href={href}>
                    {label}
                  </a>
                ))}
            </div>
          ))}
        </div>
        <div />
        <div>
          <svg className="footer-mark" viewBox="0 0 1000 118" role="img" aria-label={t.footer.wordmark}>
            <text
              x={lang === "ar" ? 1000 : 0}
              y="100"
              fontSize="128"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              direction={lang === "ar" ? "rtl" : "ltr"}
            >
              {t.footer.wordmark}
            </text>
          </svg>
          <div className="legal">
            <span>{t.footer.legal}</span>
          </div>
        </div>
      </footer>
      <Reveals />
    </>
  );
}

function MediaFill(props: Parameters<typeof Media>[0]) {
  return <Media {...props} style={{ position: "absolute", inset: 0, aspectRatio: "auto", height: "100%" }} />;
}

function Arrow() {
  return (
    <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9 5l7 7-7 7M16 12H3" />
    </svg>
  );
}

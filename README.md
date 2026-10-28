# Riyadh Interior Decor

Bilingual (English / Arabic RTL) website for an interior design, decoration and fit-out company in Riyadh.
Next.js 15 (App Router), Motion and three.js.

```bash
npm install
npm run dev                         # http://localhost:3000 → /en, Arabic at /ar
npm run build && npm start          # production
STATIC_EXPORT=1 npm run build       # plain static site in out/ (any static host)
```

## Pages

Home · About · Services (+ 7 service pages) · Projects (filters + project pages) · Blog (+ articles) · Contact.
Every page exists at `/en/...` and `/ar/...`. `sitemap.xml` and `robots.txt` are generated.

## Where things live

| What | File |
|---|---|
| Phone, WhatsApp, email, address, social links | `src/content/site.ts` |
| The 7 services and sub-services | `src/content/services.ts` |
| The 12 room categories and project filters | `src/content/categories.ts` |
| Projects (currently design concepts) | `src/content/projects.ts` |
| Process steps | `src/content/process.ts` |
| Blog articles | `src/content/blog.ts` |
| All other text, both languages | `src/content/ui.ts` |
| Every image and its alt text | `src/content/images.ts` (files in `public/media/`; brief in `MEDIA.md`) |
| Design tokens | `src/app/globals.css`, documented in `design-system/riyadh-interior-decor/MASTER.md` |

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SITE_URL`: the live domain, used for the sitemap, canonical links and social previews.
- `NEXT_PUBLIC_GA_ID`: GA4 Measurement ID (`G-…`). When set, page views and these events are sent:
  `whatsapp_click`, `phone_click` and `generate_lead` (enquiry form).
- `NEXT_PUBLIC_GSC_VERIFICATION`: Google Search Console HTML-tag verification code.

After deploying, submit `https://<domain>/sitemap.xml` in Search Console.

## Contact form

There is no form backend yet. A valid enquiry opens WhatsApp with a ready-written message to the studio's number,
and the visitor sends it from there. To send enquiries by email or to a CRM instead, post the form to an endpoint in
`src/components/ContactForm.tsx`.

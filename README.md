# Riyadh Designer

Bilingual (English / Arabic) homepage for an interior design studio in Riyadh. Next.js 15, Motion and three.js.

```bash
npm install
npm run dev      # http://localhost:3000 → /en, Arabic at /ar
npm run build && npm start
```

- Copy for both languages: `src/content/dictionary.ts`
- Picture and film slots: `src/content/media.ts`. Drop files into `public/media/` (see `MEDIA.md` for the brief and AI prompts).
- The live 3D majlis with the Riyadh sun: `src/lib/majlis.ts` and `src/lib/sun.ts`

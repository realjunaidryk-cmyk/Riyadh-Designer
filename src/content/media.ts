import { existsSync } from "node:fs";
import path from "node:path";

// Every picture and film slot on the homepage. Drop a file at `src` (under /public) and it replaces
// the drawn placeholder on the next build. MEDIA.md has the brief for each one.

export type Slot = {
  src: string;
  /** width / height */
  ratio: number;
  /** still frame for a video */
  poster?: string;
  kind: "image" | "video";
};

const img = (name: string, ratio: number): Slot => ({ src: `/media/${name}.jpg`, ratio, kind: "image" });
const vid = (name: string, ratio: number): Slot => ({
  src: `/media/${name}.mp4`,
  poster: `/media/${name}.jpg`,
  ratio,
  kind: "video",
});

export const slots = {
  heroHomes: vid("hero-homes", 3 / 4),
  heroWork: vid("hero-work", 3 / 4),
  introOpening: img("intro-opening", 3 / 2),
  introPlaster: img("intro-plaster", 3 / 2),
  matPlaster: img("mat-plaster", 2 / 3),
  matAthl: img("mat-athl", 2 / 3),
  matTravertine: img("mat-travertine", 2 / 3),
  matSadu: img("mat-sadu", 2 / 3),
  work: {
    nakheel: img("work-nakheel", 3 / 2),
    diriyah: img("work-diriyah", 4 / 5),
    olaya: img("work-olaya", 16 / 9),
    hittin: img("work-hittin", 3 / 2),
    malqa: img("work-malqa", 4 / 5),
    kafd: img("work-kafd", 16 / 9),
  },
  reels: Array.from({ length: 10 }, (_, i) => vid(`reel-${String(i + 1).padStart(2, "0")}`, 9 / 16)),
  process: Array.from({ length: 7 }, (_, i) => img(`process-${i + 1}`, 4 / 5)),
  faqTall: img("faq-tall", 3 / 4),
  faqSquare: img("faq-square", 1),
  contactStreet: img("contact-street", 16 / 9),
};

export type ResolvedSlot = Slot & { ready: boolean; posterReady: boolean };

const publicDir = path.join(process.cwd(), "public");
const has = (p?: string) => !!p && existsSync(path.join(publicDir, p));

export function resolve(slot: Slot): ResolvedSlot {
  return { ...slot, ready: has(slot.src), posterReady: has(slot.poster) };
}

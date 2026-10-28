import { existsSync } from "node:fs";
import path from "node:path";
import type { T } from "./site";

// Every picture on the site, in one place. A key whose file does not exist yet renders a neutral placeholder,
// never a broken image. Replace a file (same name) or change `src` to swap a picture. MEDIA.md lists them all.

type Entry = { src: string; alt: T; ratio: number };

const e = (src: string, ratio: number, en: string, ar: string): Entry => ({ src, ratio, alt: { en, ar } });

export const images: Record<string, Entry> = {
  // hero: frames of the client's transformation film
  "hero-first": e("/media/hero/first.jpg", 16 / 9, "An empty high-floor living room with marble floors and city views", "غرفة معيشة فارغة في طابق مرتفع بأرضيات رخامية وإطلالة على المدينة"),
  "hero-final": e("/media/hero/final.jpg", 16 / 9, "The same living room furnished with a curved sofa, armchairs, rug and chandelier", "غرفة المعيشة نفسها مؤثثة بأريكة منحنية وكراسي وسجادة وثريا"),

  // services
  "svc-residential": e("/media/services/residential.jpg", 4 / 5, "A furnished villa living room", "غرفة معيشة مؤثثة في فيلا"),
  "svc-commercial": e("/media/services/commercial.jpg", 4 / 5, "A designed office reception", "استقبال مكتب مصمم"),
  "svc-kitchen": e("/media/services/kitchen.jpg", 4 / 5, "A contemporary kitchen with an island", "مطبخ عصري بجزيرة"),
  "svc-office": e("/media/services/office.jpg", 4 / 5, "An office floor during fit-out", "طابق مكاتب أثناء التجهيز"),
  "svc-turnkey": e("/media/services/turnkey.jpg", 4 / 5, "Material samples laid out for a project", "عينات خامات مجهزة لمشروع"),
  "svc-renovation": e("/media/services/renovation.jpg", 4 / 5, "A room being renovated", "غرفة أثناء الترميم"),
  "svc-finishing": e("/media/services/finishing.jpg", 4 / 5, "Gypsum ceiling and wall finishing detail", "تفصيل سقف جبس وتشطيب جدار"),

  // categories
  "cat-living": e("/media/stills/penthouse-seating.jpg", 1, "Living room with a curved sofa facing tall windows", "غرفة معيشة بأريكة منحنية تواجه نوافذ عالية"),
  "cat-bedroom": e("/media/categories/bedroom.jpg", 4 / 5, "A calm bedroom with an upholstered headboard wall", "غرفة نوم هادئة بجدار سرير منجّد"),
  "cat-kitchen": e("/media/categories/kitchen.jpg", 4 / 3, "A kitchen with a stone island", "مطبخ بجزيرة حجرية"),
  "cat-bathroom": e("/media/categories/bathroom.jpg", 4 / 5, "A stone bathroom with soft lighting", "حمام حجري بإضاءة ناعمة"),
  "cat-home-office": e("/media/categories/home-office.jpg", 1, "A home office with a timber desk", "مكتب منزلي بمكتب خشبي"),
  "cat-dining": e("/media/categories/dining.jpg", 4 / 3, "A dining room set for guests", "غرفة طعام مجهزة للضيوف"),
  "cat-majlis": e("/media/renders/majlis-1.jpg", 16 / 9, "3D visualisation of a Najdi-style majlis", "تصور ثلاثي الأبعاد لمجلس بطابع نجدي"),
  "cat-closet": e("/media/categories/closet.jpg", 4 / 5, "A walk-in closet with lit shelving", "غرفة ملابس برفوف مضاءة"),
  "cat-villa": e("/media/categories/villa.jpg", 4 / 3, "A villa entrance hall", "صالة مدخل فيلا"),
  "cat-apartment": e("/media/stills/penthouse-chair.jpg", 4 / 5, "Apartment corner with an armchair and city view", "زاوية شقة بكرسي وإطلالة على المدينة"),
  "cat-office": e("/media/categories/office.jpg", 4 / 3, "An executive office interior", "تصميم داخلي لمكتب تنفيذي"),
  "cat-hospitality": e("/media/categories/hospitality.jpg", 4 / 5, "A hotel-style reception lounge", "صالة استقبال بطابع فندقي"),

  // projects
  "proj-penthouse-hero": e("/media/hero/final.jpg", 16 / 9, "Modern Penthouse concept: furnished living room with city views", "فكرة البنتهاوس العصري: غرفة معيشة مؤثثة بإطلالة على المدينة"),
  "proj-penthouse-1": e("/media/stills/penthouse-seating.jpg", 1, "Curved sofa and marble coffee table under a crystal chandelier", "أريكة منحنية وطاولة رخامية تحت ثريا كريستال"),
  "proj-penthouse-2": e("/media/stills/penthouse-chair.jpg", 4 / 5, "Walnut-toned armchair beside full-height glazing", "كرسي بلون الجوز بجوار زجاج بارتفاع كامل"),
  "proj-penthouse-3": e("/media/stills/penthouse-progress.jpg", 16 / 9, "The room mid-transformation, furniture arriving", "الغرفة أثناء التحول ووصول الأثاث"),
  "proj-villa-hero": e("/media/projects/villa-hero.jpg", 16 / 9, "Contemporary villa reception", "استقبال فيلا معاصرة"),
  "proj-villa-1": e("/media/projects/villa-1.jpg", 1, "Villa family living room", "غرفة معيشة العائلة في الفيلا"),
  "proj-villa-2": e("/media/projects/villa-2.jpg", 4 / 5, "Oak staircase and limestone floor", "درج من البلوط وأرضية حجر جيري"),
  "proj-villa-3": e("/media/projects/villa-3.jpg", 16 / 9, "Shaded courtyard seen from the living room", "الفناء المظلل من غرفة المعيشة"),
  "proj-majlis-hero": e("/media/renders/majlis-1.jpg", 16 / 9, "3D visualisation: Najdi majlis with triangular openings", "تصور ثلاثي الأبعاد: مجلس نجدي بفتحات مثلثة"),
  "proj-majlis-1": e("/media/renders/majlis-2.jpg", 16 / 9, "3D visualisation: the majlis in travertine", "تصور ثلاثي الأبعاد: المجلس بالترافرتين"),
  "proj-majlis-2": e("/media/renders/majlis-3.jpg", 16 / 9, "3D visualisation: the majlis with timber walls", "تصور ثلاثي الأبعاد: المجلس بجدران خشبية"),
  "proj-majlis-3": e("/media/renders/majlis-4.jpg", 16 / 9, "3D visualisation: the majlis in white lime", "تصور ثلاثي الأبعاد: المجلس بالجير الأبيض"),
  "proj-bedroom-hero": e("/media/projects/bedroom-hero.jpg", 16 / 9, "Master bedroom with upholstered wall", "غرفة نوم رئيسية بجدار منجّد"),
  "proj-bedroom-1": e("/media/projects/bedroom-1.jpg", 1, "Bedside detail with warm light", "تفصيل جانب السرير بإضاءة دافئة"),
  "proj-bedroom-2": e("/media/projects/bedroom-2.jpg", 4 / 5, "Flush wardrobe wall", "جدار خزائن مستوية"),
  "proj-bedroom-3": e("/media/projects/bedroom-3.jpg", 16 / 9, "Bedroom seating by the window", "جلسة غرفة النوم بجوار النافذة"),
  "proj-kitchen-hero": e("/media/projects/kitchen-hero.jpg", 16 / 9, "Kitchen with a long stone island", "مطبخ بجزيرة حجرية طويلة"),
  "proj-kitchen-1": e("/media/projects/kitchen-1.jpg", 1, "Walnut cabinetry detail", "تفصيل خزائن الجوز"),
  "proj-kitchen-2": e("/media/projects/kitchen-2.jpg", 4 / 5, "Display shelving and bronze handles", "رفوف عرض ومقابض برونزية"),
  "proj-kitchen-3": e("/media/projects/kitchen-3.jpg", 16 / 9, "Prep kitchen behind a pocket door", "مطبخ التحضير خلف باب منزلق"),
  "proj-office-hero": e("/media/projects/office-hero.jpg", 16 / 9, "Office reception with a travertine desk", "استقبال مكتب بمكتب من الترافرتين"),
  "proj-office-1": e("/media/projects/office-1.jpg", 1, "Boardroom with acoustic ceiling", "قاعة اجتماعات بسقف عازل للصوت"),
  "proj-office-2": e("/media/projects/office-2.jpg", 4 / 5, "Oak and glass partitions", "قواطع من البلوط والزجاج"),
  "proj-office-3": e("/media/projects/office-3.jpg", 16 / 9, "Executive office overlooking the city", "مكتب تنفيذي يطل على المدينة"),

  // about and process
  "about-studio": e("/media/about/studio.jpg", 4 / 5, "The design studio with material samples", "استوديو التصميم مع عينات الخامات"),
  "process-1": e("/media/process/1.jpg", 4 / 5, "Consultation at the client's home", "استشارة في منزل العميل"),
  "process-2": e("/media/process/2.jpg", 4 / 5, "Moodboard with fabric and stone samples", "لوحة إلهام بعينات أقمشة وحجر"),
  "process-3": e("/media/process/3.jpg", 4 / 5, "Floor plan with furniture layout", "مخطط أرضي بتوزيع الأثاث"),
  "process-4": e("/media/process/4.jpg", 4 / 5, "Material and finish samples", "عينات الخامات والتشطيبات"),
  "process-5": e("/media/renders/majlis-2.jpg", 4 / 5, "3D visualisation of a room before it is built", "تصور ثلاثي الأبعاد لغرفة قبل تنفيذها"),
  "process-6": e("/media/hero/final.jpg", 4 / 5, "A finished, styled living room", "غرفة معيشة مكتملة ومنسّقة"),
};

export type Img = Entry & { key: string; ready: boolean };

const publicDir = path.join(process.cwd(), "public");

export function img(key: string): Img {
  const entry = images[key];
  if (!entry) throw new Error(`Unknown image key: ${key}`);
  return { ...entry, key, ready: existsSync(path.join(publicDir, entry.src)) };
}

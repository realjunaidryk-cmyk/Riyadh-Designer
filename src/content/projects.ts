import type { T } from "./site";

// Design concepts shown until the studio's completed projects are added. Each is marked as a concept on the
// site. To add a real project, copy an entry, set `status: "completed"` and point the images at its photos.

export type Project = {
  slug: string;
  status: "concept" | "completed";
  title: T;
  type: T;
  location: T;
  category: string;
  summary: T;
  overview: T;
  approach: T;
  materials: T[];
  hero: string;
  gallery: string[];
};

const riyadh: T = { en: "Riyadh", ar: "الرياض" };

export const projects: Project[] = [
  {
    slug: "modern-penthouse",
    status: "concept",
    title: { en: "Modern Penthouse", ar: "بنتهاوس عصري" },
    type: { en: "Living room · Apartment", ar: "غرفة معيشة · شقة" },
    location: riyadh,
    category: "apartment",
    summary: {
      en: "A high-floor living room turned from bare shell into a warm, light-filled lounge with city views.",
      ar: "غرفة معيشة في طابق مرتفع تحولت من هيكل فارغ إلى صالة دافئة مليئة بالضوء تطل على المدينة.",
    },
    overview: {
      en: "The shell had everything a living room needs except warmth: full-height glazing, marble floors and a double-height wall. The concept keeps the view as the main feature and builds a calm seating area around it.",
      ar: "كان الهيكل يحتوي كل ما تحتاجه غرفة المعيشة عدا الدفء: زجاج بارتفاع كامل وأرضيات رخام وجدار بارتفاع مزدوج. تحافظ الفكرة على الإطلالة كعنصر رئيسي وتبني حولها جلسة هادئة.",
    },
    approach: {
      en: "A layered cove ceiling with hidden lighting softens the volume. A curved sofa faces the window, two walnut-toned armchairs close the circle, and a traditional rug anchors the seating on the marble.",
      ar: "سقف متدرج بإضاءة مخفية يلطّف الحجم. أريكة منحنية تواجه النافذة، وكرسيان بلون الجوز يغلقان الدائرة، وسجادة تقليدية تثبّت الجلسة على الرخام.",
    },
    materials: [
      { en: "Book-matched white marble floor", ar: "أرضية رخام أبيض متناظر" },
      { en: "Layered gypsum ceiling with LED cove", ar: "سقف جبس متدرج بإضاءة LED مخفية" },
      { en: "Bouclé upholstery and walnut-brown velvet", ar: "تنجيد بوكليه ومخمل بلون الجوز" },
      { en: "Crystal chandelier and brass wall lights", ar: "ثريا كريستال وإضاءة جدارية نحاسية" },
    ],
    hero: "proj-penthouse-hero",
    gallery: ["proj-penthouse-1", "proj-penthouse-2", "proj-penthouse-3"],
  },
  {
    slug: "contemporary-luxury-villa",
    status: "concept",
    title: { en: "Contemporary Luxury Villa", ar: "فيلا فاخرة معاصرة" },
    type: { en: "Full villa interior", ar: "تصميم داخلي كامل لفيلا" },
    location: riyadh,
    category: "full-villa",
    summary: {
      en: "A family villa with one material palette carried from the entrance to the private floors.",
      ar: "فيلا عائلية بلوحة خامات واحدة تمتد من المدخل حتى الطوابق الخاصة.",
    },
    overview: {
      en: "A two-storey villa with separate guest and family zones. The brief is a home that feels generous for gatherings and private for daily life.",
      ar: "فيلا من طابقين بمناطق منفصلة للضيوف والعائلة. المطلوب منزل يتسع للتجمعات ويحفظ خصوصية الحياة اليومية.",
    },
    approach: {
      en: "Limestone, oak and soft plaster run through every room. The formal majlis and dining room sit near the entrance; the family living room opens to a shaded courtyard.",
      ar: "يمتد الحجر الجيري والبلوط واللياسة الناعمة عبر كل الغرف. يقع المجلس الرسمي وغرفة الطعام قرب المدخل، وتنفتح غرفة معيشة العائلة على فناء مظلل.",
    },
    materials: [
      { en: "Honed limestone flooring", ar: "أرضيات حجر جيري مطفي" },
      { en: "Oak joinery and wall panelling", ar: "نجارة وتكسيات جدران من البلوط" },
      { en: "Lime plaster walls", ar: "جدران بلياسة الجير" },
      { en: "Bronze metalwork details", ar: "تفاصيل معدنية برونزية" },
    ],
    hero: "proj-villa-hero",
    gallery: ["proj-villa-1", "proj-villa-2", "proj-villa-3"],
  },
  {
    slug: "luxury-saudi-majlis",
    status: "concept",
    title: { en: "Luxury Saudi Majlis", ar: "مجلس سعودي فاخر" },
    type: { en: "Majlis · 3D visualisation", ar: "مجلس · تصور ثلاثي الأبعاد" },
    location: riyadh,
    category: "majlis",
    summary: {
      en: "A guest majlis inspired by Najdi architecture, with triangular openings and low seating.",
      ar: "مجلس ضيوف مستوحى من العمارة النجدية، بفتحات مثلثة وجلسات أرضية.",
    },
    overview: {
      en: "A majlis for receiving guests that keeps the character of Najdi houses: thick plaster walls, timber beams and sunlight entering through small triangular openings.",
      ar: "مجلس لاستقبال الضيوف يحافظ على طابع البيوت النجدية: جدران لياسة سميكة وجسور خشبية وضوء شمس يدخل من فتحات مثلثة صغيرة.",
    },
    approach: {
      en: "Seating runs along three walls around a Sadu-pattern carpet and a low table for coffee. The openings are placed high so light reaches the floor while heat stays out.",
      ar: "تمتد الجلسات على ثلاثة جدران حول سجادة بنقشة السدو وطاولة منخفضة للقهوة. وُضعت الفتحات عالياً ليصل الضوء إلى الأرض وتبقى الحرارة خارجاً.",
    },
    materials: [
      { en: "Mud-tone plaster", ar: "لياسة بلون الطين" },
      { en: "Timber ceiling beams", ar: "جسور سقف خشبية" },
      { en: "Sadu-pattern textiles", ar: "منسوجات بنقشة السدو" },
      { en: "Brass coffee service", ar: "أدوات قهوة نحاسية" },
    ],
    hero: "proj-majlis-hero",
    gallery: ["proj-majlis-1", "proj-majlis-2", "proj-majlis-3"],
  },
  {
    slug: "minimalist-master-bedroom",
    status: "concept",
    title: { en: "Minimalist Master Bedroom", ar: "غرفة نوم رئيسية بسيطة" },
    type: { en: "Bedroom", ar: "غرفة نوم" },
    location: riyadh,
    category: "bedroom",
    summary: {
      en: "A quiet master suite with a padded headboard wall, hidden storage and warm indirect light.",
      ar: "جناح رئيسي هادئ بجدار سرير منجّد وتخزين مخفي وإضاءة غير مباشرة دافئة.",
    },
    overview: {
      en: "The brief is a bedroom with nothing on show: clothes, screens and clutter all have a place, so the room stays calm.",
      ar: "المطلوب غرفة نوم لا يظهر فيها شيء: الملابس والشاشات والأغراض لها أماكنها، لتبقى الغرفة هادئة.",
    },
    approach: {
      en: "A full-width upholstered wall frames the bed, flush cabinetry hides storage, and lighting is layered from cove to bedside so the room never needs the main light at night.",
      ar: "جدار منجّد بعرض كامل يؤطر السرير، وخزائن مستوية تخفي التخزين، وإضاءة متدرجة من السقف حتى جانب السرير فلا تحتاج الغرفة للإضاءة الرئيسية ليلاً.",
    },
    materials: [
      { en: "Upholstered headboard wall", ar: "جدار سرير منجّد" },
      { en: "Flush lacquered cabinetry", ar: "خزائن مستوية مطلية" },
      { en: "Wool carpet", ar: "سجاد صوف" },
      { en: "Linen curtains with blackout lining", ar: "ستائر كتان مع بطانة معتمة" },
    ],
    hero: "proj-bedroom-hero",
    gallery: ["proj-bedroom-1", "proj-bedroom-2", "proj-bedroom-3"],
  },
  {
    slug: "contemporary-designer-kitchen",
    status: "concept",
    title: { en: "Contemporary Designer Kitchen", ar: "مطبخ عصري مميز" },
    type: { en: "Kitchen", ar: "مطبخ" },
    location: riyadh,
    category: "kitchen",
    summary: {
      en: "An open kitchen with a stone island for family cooking and a separate prep kitchen behind.",
      ar: "مطبخ مفتوح بجزيرة حجرية لطبخ العائلة ومطبخ تحضير منفصل خلفه.",
    },
    overview: {
      en: "Many Riyadh homes cook in two kitchens: a show kitchen for family and guests and a working kitchen for heavy cooking. This concept designs both together.",
      ar: "تطبخ كثير من منازل الرياض في مطبخين: مطبخ مفتوح للعائلة والضيوف ومطبخ عمل للطبخ الثقيل. تصمم هذه الفكرة الاثنين معاً.",
    },
    approach: {
      en: "The front kitchen has a long stone island, integrated appliances and display shelving; a pocket door leads to the prep kitchen with extraction and heavy-duty surfaces.",
      ar: "يضم المطبخ الأمامي جزيرة حجرية طويلة وأجهزة مدمجة ورفوف عرض، ويقود باب منزلق إلى مطبخ التحضير بشفط قوي وأسطح متينة.",
    },
    materials: [
      { en: "Quartzite island and worktops", ar: "جزيرة وأسطح عمل من الكوارتزيت" },
      { en: "Walnut and matte lacquer cabinets", ar: "خزائن من الجوز والطلاء المطفي" },
      { en: "Porcelain wall cladding", ar: "تكسية جدران بورسلان" },
      { en: "Brushed bronze handles", ar: "مقابض برونزية مصقولة" },
    ],
    hero: "proj-kitchen-hero",
    gallery: ["proj-kitchen-1", "proj-kitchen-2", "proj-kitchen-3"],
  },
  {
    slug: "executive-office-interior",
    status: "concept",
    title: { en: "Executive Office Interior", ar: "تصميم مكتب تنفيذي" },
    type: { en: "Office · Commercial", ar: "مكتب · تجاري" },
    location: riyadh,
    category: "commercial-office",
    summary: {
      en: "A reception, boardroom and executive suite designed as one calm, confident workplace.",
      ar: "استقبال وقاعة اجتماعات وجناح تنفيذي مصممة كمكان عمل واحد هادئ وواثق.",
    },
    overview: {
      en: "An office floor where clients are received, meetings are held and senior staff work. The space needs to be welcoming at the front and private at the back.",
      ar: "طابق مكاتب يُستقبل فيه العملاء وتُعقد فيه الاجتماعات ويعمل فيه كبار الموظفين. يجب أن يكون المكان مرحباً في الأمام وخاصاً في الخلف.",
    },
    approach: {
      en: "A stone reception desk faces the lift lobby; glass and timber partitions keep daylight moving through the floor; acoustic ceilings and carpet keep the boardroom quiet.",
      ar: "مكتب استقبال حجري يواجه ردهة المصاعد، وقواطع زجاجية وخشبية تمرر ضوء النهار عبر الطابق، وأسقف صوتية وسجاد يحافظان على هدوء قاعة الاجتماعات.",
    },
    materials: [
      { en: "Travertine reception desk", ar: "مكتب استقبال من الترافرتين" },
      { en: "Oak and glass partitions", ar: "قواطع من البلوط والزجاج" },
      { en: "Acoustic ceiling panels", ar: "ألواح سقف عازلة للصوت" },
      { en: "Leather and wool upholstery", ar: "تنجيد جلد وصوف" },
    ],
    hero: "proj-office-hero",
    gallery: ["proj-office-1", "proj-office-2", "proj-office-3"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

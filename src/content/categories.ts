import type { T } from "./site";

// Interior categories. Each links to the projects page filtered to that category.

export type Group = "residential" | "living" | "kitchens" | "bedrooms" | "commercial";

export type Category = {
  slug: string;
  title: T;
  text: T;
  image: string;
  groups: Group[];
};

export const categories: Category[] = [
  {
    slug: "living-room",
    title: { en: "Living Room Design", ar: "تصميم غرف المعيشة" },
    text: {
      en: "Seating, light and proportion arranged for family evenings and guests.",
      ar: "جلسات وإضاءة ونسب مدروسة لأمسيات العائلة واستقبال الضيوف.",
    },
    image: "cat-living",
    groups: ["residential", "living"],
  },
  {
    slug: "bedroom",
    title: { en: "Bedroom Design", ar: "تصميم غرف النوم" },
    text: {
      en: "Quiet rooms with soft light, good storage and materials that feel warm.",
      ar: "غرف هادئة بإضاءة ناعمة وتخزين جيد وخامات دافئة الملمس.",
    },
    image: "cat-bedroom",
    groups: ["residential", "bedrooms"],
  },
  {
    slug: "kitchen",
    title: { en: "Kitchen Design", ar: "تصميم المطابخ" },
    text: {
      en: "Working kitchens with islands, custom cabinets and durable surfaces.",
      ar: "مطابخ عملية بجزر وخزائن حسب الطلب وأسطح متينة.",
    },
    image: "cat-kitchen",
    groups: ["residential", "kitchens"],
  },
  {
    slug: "bathroom",
    title: { en: "Bathroom Design", ar: "تصميم الحمامات" },
    text: {
      en: "Stone, porcelain and considered lighting for calm, easy-to-clean bathrooms.",
      ar: "حجر وبورسلان وإضاءة مدروسة لحمامات هادئة وسهلة التنظيف.",
    },
    image: "cat-bathroom",
    groups: ["residential"],
  },
  {
    slug: "home-office",
    title: { en: "Home Office Design", ar: "تصميم المكتب المنزلي" },
    text: {
      en: "A focused place to work at home, with storage, acoustics and daylight.",
      ar: "مكان مركّز للعمل من المنزل، مع التخزين والعزل الصوتي وضوء النهار.",
    },
    image: "cat-home-office",
    groups: ["residential", "living"],
  },
  {
    slug: "dining-room",
    title: { en: "Dining Room Design", ar: "تصميم غرف الطعام" },
    text: {
      en: "Tables, lighting and serving space sized for the way you host.",
      ar: "طاولات وإضاءة ومساحات تقديم بمقاسات تناسب طريقة استضافتك.",
    },
    image: "cat-dining",
    groups: ["residential", "living"],
  },
  {
    slug: "majlis",
    title: { en: "Luxury Majlis Design", ar: "تصميم المجالس الفاخرة" },
    text: {
      en: "Formal and family majlis with Saudi character and contemporary comfort.",
      ar: "مجالس رسمية وعائلية بطابع سعودي وراحة عصرية.",
    },
    image: "cat-majlis",
    groups: ["residential", "living"],
  },
  {
    slug: "walk-in-closet",
    title: { en: "Walk-in Closet & Dressing Room", ar: "غرف الملابس والتبديل" },
    text: {
      en: "Made-to-measure wardrobes, display and lighting for every item you own.",
      ar: "خزائن مفصّلة وعرض وإضاءة لكل قطعة تملكها.",
    },
    image: "cat-closet",
    groups: ["residential", "bedrooms"],
  },
  {
    slug: "full-villa",
    title: { en: "Full Villa Interior Design", ar: "التصميم الداخلي الكامل للفلل" },
    text: {
      en: "One design language carried through every floor, room and detail of a villa.",
      ar: "لغة تصميم واحدة تمتد عبر كل طابق وغرفة وتفصيل في الفيلا.",
    },
    image: "cat-villa",
    groups: ["residential"],
  },
  {
    slug: "apartment",
    title: { en: "Apartment Interior Design", ar: "التصميم الداخلي للشقق" },
    text: {
      en: "Smart layouts and finishes that make every square metre count.",
      ar: "توزيع ذكي وتشطيبات تستفيد من كل متر مربع.",
    },
    image: "cat-apartment",
    groups: ["residential", "living"],
  },
  {
    slug: "commercial-office",
    title: { en: "Commercial & Office Interiors", ar: "التصاميم التجارية والمكتبية" },
    text: {
      en: "Offices and commercial spaces planned for teams, clients and brand.",
      ar: "مكاتب ومساحات تجارية مخططة للفرق والعملاء والعلامة التجارية.",
    },
    image: "cat-office",
    groups: ["commercial"],
  },
  {
    slug: "hospitality-reception",
    title: { en: "Hospitality & Reception Interiors", ar: "تصاميم الضيافة والاستقبال" },
    text: {
      en: "Lobbies, receptions and lounges that welcome guests with confidence.",
      ar: "ردهات واستقبالات وصالات تستقبل الضيوف بثقة.",
    },
    image: "cat-hospitality",
    groups: ["commercial"],
  },
];

export const groups: { id: Group | "all"; label: T }[] = [
  { id: "all", label: { en: "All", ar: "الكل" } },
  { id: "residential", label: { en: "Residential", ar: "سكني" } },
  { id: "living", label: { en: "Living Spaces", ar: "مساحات المعيشة" } },
  { id: "kitchens", label: { en: "Kitchens", ar: "المطابخ" } },
  { id: "bedrooms", label: { en: "Bedrooms", ar: "غرف النوم" } },
  { id: "commercial", label: { en: "Commercial", ar: "تجاري" } },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

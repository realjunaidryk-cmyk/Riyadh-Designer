import type { T } from "./site";

// The seven main services and their sub-services, as listed in the client's Website Redesign Brief.

export type SubService = { title: T; text: T };
export type Service = {
  slug: string;
  title: T;
  short: T;
  intro: T;
  subs: SubService[];
  image: string;
  /** project categories shown as related work */
  related: string[];
};

export const services: Service[] = [
  {
    slug: "residential-interior-design",
    title: { en: "Residential Interior Design", ar: "التصميم الداخلي السكني" },
    short: {
      en: "Villas, apartments, living rooms and bedrooms designed around how your family lives.",
      ar: "فلل وشقق وغرف معيشة ونوم مصممة حول طريقة حياة عائلتك.",
    },
    intro: {
      en: "We design homes room by room and as a whole: the layout, the materials, the lighting and the furniture, so every space works for the people who use it every day and still feels calm when guests arrive.",
      ar: "نصمم المنازل غرفة غرفة وككل متكامل: التوزيع والخامات والإضاءة والأثاث، لتعمل كل مساحة لمن يستخدمها كل يوم وتبقى هادئة عند وصول الضيوف.",
    },
    subs: [
      {
        title: { en: "Villa Design", ar: "تصميم الفلل" },
        text: {
          en: "Complete interiors for villas: reception and family areas, majlis, bedrooms, kitchens and outdoor living.",
          ar: "تصميم داخلي متكامل للفلل: مناطق الاستقبال والعائلة والمجلس وغرف النوم والمطابخ والجلسات الخارجية.",
        },
      },
      {
        title: { en: "Apartment Design", ar: "تصميم الشقق" },
        text: {
          en: "Space-efficient layouts, storage and finishes that make an apartment feel larger and work harder.",
          ar: "توزيع ذكي للمساحة وتخزين وتشطيبات تجعل الشقة تبدو أوسع وأكثر عملية.",
        },
      },
      {
        title: { en: "Living Room & Bedroom Design", ar: "تصميم غرف المعيشة والنوم" },
        text: {
          en: "Seating, lighting, joinery and soft furnishings for the rooms you spend the most time in.",
          ar: "الجلسات والإضاءة والنجارة والمفروشات للغرف التي تقضي فيها معظم وقتك.",
        },
      },
    ],
    image: "svc-residential",
    related: ["living-room", "bedroom", "full-villa", "apartment", "majlis"],
  },
  {
    slug: "commercial-interior-design",
    title: { en: "Commercial Interior Design", ar: "التصميم الداخلي التجاري" },
    short: {
      en: "Offices, shops, showrooms and receptions that express your brand and serve your customers.",
      ar: "مكاتب ومحلات وصالات عرض واستقبالات تعبّر عن علامتك وتخدم عملاءك.",
    },
    intro: {
      en: "A commercial interior has to work for staff, impress visitors and carry the brand. We plan the flow of people first, then shape the finishes, lighting and furniture around it.",
      ar: "يجب أن يخدم التصميم التجاري الموظفين ويترك انطباعاً لدى الزوار ويحمل هوية العلامة. نخطط حركة الأشخاص أولاً، ثم نشكّل التشطيبات والإضاءة والأثاث حولها.",
    },
    subs: [
      {
        title: { en: "Office Design", ar: "تصميم المكاتب" },
        text: {
          en: "Workspaces, meeting rooms and executive offices planned for focus, collaboration and growth.",
          ar: "مساحات عمل وغرف اجتماعات ومكاتب تنفيذية مخططة للتركيز والتعاون والتوسع.",
        },
      },
      {
        title: { en: "Shop & Showroom Design", ar: "تصميم المحلات وصالات العرض" },
        text: {
          en: "Display, circulation and lighting that put the product first and guide the customer through the space.",
          ar: "عرض وحركة وإضاءة تضع المنتج أولاً وتقود العميل داخل المكان.",
        },
      },
      {
        title: { en: "Reception Design", ar: "تصميم الاستقبالات" },
        text: {
          en: "Reception desks, waiting areas and entrances that make a clear first impression.",
          ar: "مكاتب استقبال ومناطق انتظار ومداخل تترك انطباعاً أولياً واضحاً.",
        },
      },
    ],
    image: "svc-commercial",
    related: ["commercial-office", "hospitality-reception"],
  },
  {
    slug: "kitchen-design-remodeling",
    title: { en: "Kitchen Design & Remodeling", ar: "تصميم وتجديد المطابخ" },
    short: {
      en: "Kitchens planned for real cooking and hosting, from layout to custom cabinets.",
      ar: "مطابخ مخططة للطبخ والضيافة الفعلية، من التوزيع حتى الخزائن حسب الطلب.",
    },
    intro: {
      en: "We design kitchens around the way you cook and entertain: the working triangle, storage for everything you own, durable worktops and lighting that works at night.",
      ar: "نصمم المطابخ حول طريقة طبخك واستضافتك: مثلث العمل، وتخزين لكل ما تملك، وأسطح عمل متينة، وإضاءة مناسبة في المساء.",
    },
    subs: [
      {
        title: { en: "Kitchen Design", ar: "تصميم المطابخ" },
        text: {
          en: "Layouts, islands, appliances and finishes chosen together so the kitchen works and looks right.",
          ar: "التوزيع والجزر والأجهزة والتشطيبات تُختار معاً ليعمل المطبخ ويبدو متناسقاً.",
        },
      },
      {
        title: { en: "Custom Cabinets", ar: "خزائن حسب الطلب" },
        text: {
          en: "Made-to-measure cabinetry with the storage, hardware and finish you choose.",
          ar: "خزائن مفصّلة على المقاس بالتخزين والإكسسوارات والتشطيب الذي تختاره.",
        },
      },
      {
        title: { en: "Kitchen Renovation", ar: "تجديد المطابخ" },
        text: {
          en: "Updating an existing kitchen: new layout, cabinets, worktops, lighting and finishes.",
          ar: "تحديث مطبخ قائم: توزيع جديد وخزائن وأسطح عمل وإضاءة وتشطيبات.",
        },
      },
    ],
    image: "svc-kitchen",
    related: ["kitchen", "dining-room"],
  },
  {
    slug: "office-design-fit-out",
    title: { en: "Office Design & Fit-Out", ar: "تصميم وتجهيز المكاتب" },
    short: {
      en: "From space planning to a finished, furnished office ready for your team.",
      ar: "من تخطيط المساحة حتى مكتب مكتمل ومؤثث وجاهز لفريقك.",
    },
    intro: {
      en: "We plan the office around your team and how it works, then carry it through fit-out and interior finishing so you move into a space that is ready on day one.",
      ar: "نخطط المكتب حول فريقك وطريقة عمله، ثم ننفذ التجهيز والتشطيب الداخلي لتنتقل إلى مساحة جاهزة من اليوم الأول.",
    },
    subs: [
      {
        title: { en: "Office Planning", ar: "تخطيط المكاتب" },
        text: {
          en: "Space planning, zoning and furniture layouts based on headcount and how teams work.",
          ar: "تخطيط المساحة وتقسيم المناطق وتوزيع الأثاث بناءً على عدد الموظفين وطريقة عمل الفرق.",
        },
      },
      {
        title: { en: "Office Fit-Out", ar: "تجهيز المكاتب" },
        text: {
          en: "Partitions, ceilings, flooring, lighting and joinery delivered as one coordinated fit-out.",
          ar: "قواطع وأسقف وأرضيات وإضاءة ونجارة تُنفذ كتجهيز واحد منسّق.",
        },
      },
      {
        title: { en: "Interior Finishing", ar: "التشطيب الداخلي" },
        text: {
          en: "Paint, wall finishes, doors and final details that complete the space.",
          ar: "الدهانات وتشطيبات الجدران والأبواب واللمسات النهائية التي تكمل المكان.",
        },
      },
    ],
    image: "svc-office",
    related: ["commercial-office", "home-office"],
  },
  {
    slug: "turnkey-interior-design-execution",
    title: { en: "Turnkey Interior Design & Execution", ar: "التصميم والتنفيذ المتكامل (تسليم مفتاح)" },
    short: {
      en: "One team from the first design to the finished space: design, materials and execution.",
      ar: "فريق واحد من أول تصميم حتى المكان المكتمل: التصميم والخامات والتنفيذ.",
    },
    intro: {
      en: "With turnkey projects we take responsibility for the whole journey: the design and planning, choosing and ordering materials, and executing the work until the space is handed over complete.",
      ar: "في مشاريع تسليم المفتاح نتحمل مسؤولية الرحلة كاملة: التصميم والتخطيط، واختيار الخامات وطلبها، وتنفيذ الأعمال حتى تسليم المكان مكتملاً.",
    },
    subs: [
      {
        title: { en: "Design & Planning", ar: "التصميم والتخطيط" },
        text: {
          en: "Concept, layouts, 3D visualisation and detailed drawings for every room.",
          ar: "الفكرة والمخططات والتصور ثلاثي الأبعاد والرسومات التفصيلية لكل غرفة.",
        },
      },
      {
        title: { en: "Material Selection", ar: "اختيار الخامات" },
        text: {
          en: "Flooring, wall finishes, lighting, fabrics and furniture chosen with you and sourced for the project.",
          ar: "الأرضيات وتشطيبات الجدران والإضاءة والأقمشة والأثاث نختارها معك ونوفرها للمشروع.",
        },
      },
      {
        title: { en: "Complete Project Execution", ar: "تنفيذ المشروع بالكامل" },
        text: {
          en: "Site work, coordination and quality checks through to the final handover.",
          ar: "أعمال الموقع والتنسيق ومراقبة الجودة حتى التسليم النهائي.",
        },
      },
    ],
    image: "svc-turnkey",
    related: ["full-villa", "apartment", "majlis"],
  },
  {
    slug: "renovation-remodeling",
    title: { en: "Renovation & Remodeling", ar: "الترميم وإعادة التصميم" },
    short: {
      en: "Bringing villas, apartments and commercial spaces up to date without starting from scratch.",
      ar: "تحديث الفلل والشقق والمساحات التجارية دون البدء من الصفر.",
    },
    intro: {
      en: "Renovation starts with what is already there. We assess the space, keep what works and redesign what does not, then manage the work so you can see the change room by room.",
      ar: "يبدأ الترميم بما هو موجود. نقيّم المكان ونحتفظ بما يصلح ونعيد تصميم ما لا يصلح، ثم ندير الأعمال لترى التغيير غرفة غرفة.",
    },
    subs: [
      {
        title: { en: "Villa Renovation", ar: "ترميم الفلل" },
        text: {
          en: "Updating layouts, finishes and services in an existing villa.",
          ar: "تحديث التوزيع والتشطيبات والخدمات في فيلا قائمة.",
        },
      },
      {
        title: { en: "Apartment Renovation", ar: "ترميم الشقق" },
        text: {
          en: "Kitchens, bathrooms, flooring and finishes renewed for modern living.",
          ar: "تجديد المطابخ والحمامات والأرضيات والتشطيبات لحياة عصرية.",
        },
      },
      {
        title: { en: "Commercial Renovation", ar: "ترميم المساحات التجارية" },
        text: {
          en: "Refreshing offices, shops and receptions with minimal disruption to business.",
          ar: "تجديد المكاتب والمحلات والاستقبالات بأقل تأثير على سير العمل.",
        },
      },
    ],
    image: "svc-renovation",
    related: ["apartment", "full-villa", "commercial-office"],
  },
  {
    slug: "interior-decoration-finishing-works",
    title: { en: "Interior Decoration & Finishing Works", ar: "الديكور الداخلي وأعمال التشطيب" },
    short: {
      en: "Flooring, ceilings, lighting and wall finishes that complete a space.",
      ar: "الأرضيات والأسقف والإضاءة وتشطيبات الجدران التي تكمل المكان.",
    },
    intro: {
      en: "The finishing works are what you see and touch every day. We handle each trade with the same care as the design, so the details are clean and the materials last.",
      ar: "أعمال التشطيب هي ما تراه وتلمسه كل يوم. ننفذ كل حرفة بنفس عناية التصميم، لتكون التفاصيل نظيفة وتدوم الخامات.",
    },
    subs: [
      {
        title: { en: "Tiles & Flooring", ar: "البلاط والأرضيات" },
        text: {
          en: "Floor tiles, wall tiles, porcelain finishes, and flooring installation.",
          ar: "بلاط الأرضيات والجدران وتشطيبات البورسلان وتركيب الأرضيات.",
        },
      },
      {
        title: { en: "Ceiling & Gypsum Works", ar: "الأسقف وأعمال الجبس" },
        text: {
          en: "False ceilings, gypsum designs, and ceiling finishes.",
          ar: "الأسقف المستعارة وتصاميم الجبس وتشطيبات الأسقف.",
        },
      },
      {
        title: { en: "Lighting & Electrical Finishes", ar: "الإضاءة والتشطيبات الكهربائية" },
        text: {
          en: "Decorative lighting, LED lights, spotlights, and lighting installation.",
          ar: "الإضاءة الديكورية وإضاءة LED والسبوت لايت وتركيب الإضاءة.",
        },
      },
      {
        title: { en: "Wall Finishes & Decoration", ar: "تشطيبات وديكورات الجدران" },
        text: {
          en: "Wall panels, wallpaper, decorative paint, and wall cladding.",
          ar: "ألواح الجدران وورق الجدران والدهانات الديكورية وتكسيات الجدران.",
        },
      },
    ],
    image: "svc-finishing",
    related: ["living-room", "bathroom", "walk-in-closet"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

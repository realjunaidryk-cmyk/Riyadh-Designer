import type { T } from "./site";

// Starter articles. Practical guidance only; no claims about the company's own projects or results.

export type Post = {
  slug: string;
  date: string;
  title: T;
  excerpt: T;
  body: { heading?: T; text: T }[];
  service?: string;
};

export const posts: Post[] = [
  {
    slug: "choosing-finishes-for-riyadh-climate",
    date: "2026-10-28",
    title: {
      en: "Choosing interior finishes for Riyadh's climate",
      ar: "اختيار التشطيبات الداخلية لمناخ الرياض",
    },
    excerpt: {
      en: "Heat, strong sun and fine dust are hard on interiors. Here is how to choose floors, walls and fabrics that stay beautiful.",
      ar: "الحرارة والشمس القوية والغبار الناعم تؤثر على الديكور. إليك كيف تختار أرضيات وجدراناً وأقمشة تحافظ على جمالها.",
    },
    service: "interior-decoration-finishing-works",
    body: [
      {
        text: {
          en: "A Riyadh home lives with three things most of the year: intense sunlight through the windows, long periods of air conditioning, and fine dust that finds its way inside. Finishes that suit these conditions keep their colour, stay easy to clean and age well.",
          ar: "يعيش منزل الرياض معظم العام مع ثلاثة أمور: أشعة شمس قوية عبر النوافذ، وتشغيل طويل للتكييف، وغبار ناعم يجد طريقه للداخل. التشطيبات المناسبة لهذه الظروف تحافظ على لونها وتبقى سهلة التنظيف وتتقدم في العمر بشكل جميل.",
        },
      },
      {
        heading: { en: "Floors", ar: "الأرضيات" },
        text: {
          en: "Large-format porcelain and honed natural stone handle heavy use and are simple to clean. Matte or honed surfaces hide dust better than high gloss. In bedrooms, wool carpet or rugs over stone add warmth and absorb sound.",
          ar: "البورسلان كبير المقاس والحجر الطبيعي المطفي يتحملان الاستخدام الكثيف وتنظيفهما سهل. الأسطح المطفية تخفي الغبار أفضل من اللامعة. وفي غرف النوم يضيف السجاد الصوفي فوق الحجر دفئاً ويمتص الصوت.",
        },
      },
      {
        heading: { en: "Walls", ar: "الجدران" },
        text: {
          en: "Washable matte paints, lime and mineral plasters, and wall panels are all practical choices. Keep very dark colours for walls away from strong afternoon sun, where they can look patchy over time.",
          ar: "الدهانات المطفية القابلة للغسل ولياسة الجير والمعادن وألواح الجدران كلها خيارات عملية. أبعد الألوان الداكنة جداً عن الجدران التي تتعرض لشمس العصر القوية، فقد يظهر فيها تفاوت مع الوقت.",
        },
      },
      {
        heading: { en: "Fabrics and furniture", ar: "الأقمشة والأثاث" },
        text: {
          en: "Choose light-fast fabrics for seating near windows and add sheer curtains to soften the light. Performance fabrics with removable covers make majlis seating far easier to keep fresh.",
          ar: "اختر أقمشة مقاومة لبهتان اللون للجلسات القريبة من النوافذ، وأضف ستائر شفافة لتلطيف الضوء. والأقمشة العملية ذات الأغطية القابلة للفك تجعل جلسات المجلس أسهل في العناية.",
        },
      },
    ],
  },
  {
    slug: "planning-a-majlis",
    date: "2026-10-28",
    title: { en: "Planning a majlis: layout, seating and lighting", ar: "تخطيط المجلس: التوزيع والجلسات والإضاءة" },
    excerpt: {
      en: "A good majlis makes every guest feel welcome. These are the decisions that shape it.",
      ar: "المجلس الجيد يشعر كل ضيف بالترحيب. هذه هي القرارات التي تشكّله.",
    },
    service: "residential-interior-design",
    body: [
      {
        text: {
          en: "The majlis is often the most important room for hosting. Before choosing colours or furniture, decide how many guests it should seat comfortably, whether it is formal or for family, and how coffee and food will be served.",
          ar: "غالباً ما يكون المجلس أهم غرفة للاستقبال. قبل اختيار الألوان أو الأثاث، حدّد عدد الضيوف الذين يجب أن يجلسوا براحة، وهل هو رسمي أم عائلي، وكيف ستُقدم القهوة والطعام.",
        },
      },
      {
        heading: { en: "Layout", ar: "التوزيع" },
        text: {
          en: "Seating along the walls keeps everyone in one conversation. Leave a clear route from the door to the host's seat, and plan a serving point close to the entrance so coffee can be served without crossing the room.",
          ar: "الجلسات على امتداد الجدران تجمع الجميع في حديث واحد. اترك ممراً واضحاً من الباب إلى مكان المضيف، وخطط لنقطة تقديم قريبة من المدخل لتُقدم القهوة دون عبور الغرفة.",
        },
      },
      {
        heading: { en: "Seating", ar: "الجلسات" },
        text: {
          en: "Floor seating, low sofas or a mix of both all work; what matters is comfortable depth, firm cushions and fabrics that are easy to clean.",
          ar: "الجلسات الأرضية أو الكنب المنخفض أو المزج بينهما كلها مناسبة؛ المهم عمق مريح ووسائد متماسكة وأقمشة سهلة التنظيف.",
        },
      },
      {
        heading: { en: "Lighting", ar: "الإضاءة" },
        text: {
          en: "Layer the light: hidden cove lighting for a soft glow, wall lights at seated eye level, and a central fixture that can be dimmed. Avoid bright downlights directly above seating.",
          ar: "اجعل الإضاءة متدرجة: إضاءة مخفية لتوهج ناعم، وإضاءة جدارية بمستوى نظر الجالس، وإضاءة مركزية قابلة للتعتيم. وتجنب السبوت القوي فوق الجلسات مباشرة.",
        },
      },
    ],
  },
  {
    slug: "kitchen-renovation-checklist",
    date: "2026-10-28",
    title: { en: "Kitchen renovation: what to decide before you start", ar: "تجديد المطبخ: ما يجب تحديده قبل البدء" },
    excerpt: {
      en: "A short checklist that saves time and money on a kitchen renovation.",
      ar: "قائمة قصيرة توفر الوقت والمال عند تجديد المطبخ.",
    },
    service: "kitchen-design-remodeling",
    body: [
      {
        text: {
          en: "Most delays in a kitchen renovation come from decisions made late. Settling these points first keeps the project moving.",
          ar: "معظم التأخير في تجديد المطابخ يأتي من قرارات متأخرة. حسم هذه النقاط أولاً يحافظ على سير المشروع.",
        },
      },
      {
        heading: { en: "Layout and appliances", ar: "التوزيع والأجهزة" },
        text: {
          en: "Choose your appliances before the cabinets are drawn. Their sizes, ventilation and power needs decide the layout.",
          ar: "اختر أجهزتك قبل رسم الخزائن. مقاساتها واحتياجاتها من التهوية والكهرباء تحدد التوزيع.",
        },
      },
      {
        heading: { en: "One kitchen or two", ar: "مطبخ واحد أم اثنان" },
        text: {
          en: "If you cook heavily, consider a separate prep kitchen with strong extraction, and keep the open kitchen for light cooking and serving.",
          ar: "إذا كان طبخك كثيفاً، ففكر في مطبخ تحضير منفصل بشفط قوي، واحتفظ بالمطبخ المفتوح للطبخ الخفيف والتقديم.",
        },
      },
      {
        heading: { en: "Surfaces and storage", ar: "الأسطح والتخزين" },
        text: {
          en: "Pick worktops for heat and stain resistance, and plan storage by listing what you actually own: pots, spices, small appliances and serving ware.",
          ar: "اختر أسطح عمل تقاوم الحرارة والبقع، وخطط للتخزين بحصر ما تملكه فعلاً: القدور والبهارات والأجهزة الصغيرة وأدوات التقديم.",
        },
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

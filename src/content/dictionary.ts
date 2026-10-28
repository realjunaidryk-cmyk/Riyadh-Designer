// Every visible string on the homepage, in both languages.
// Project names, addresses, phone and email are sample content for the client to confirm.

export type Lang = "en" | "ar";

export const languages: Lang[] = ["en", "ar"];

export function isLang(value: string): value is Lang {
  return (languages as string[]).includes(value);
}

const en = {
  meta: {
    title: "Riyadh Designer — Interior design studio in Riyadh",
    description:
      "An interior design studio in Riyadh. Villas, majlis, offices and showrooms, from the first visit to handover.",
  },
  nav: {
    home: "Riyadh Designer home",
    links: [
      { href: "#work", label: "Work" },
      { href: "#light", label: "Light" },
      { href: "#process", label: "Process" },
      { href: "#contact", label: "Contact" },
    ],
    switchLabel: "العربية",
    switchName: "Read this page in Arabic",
    action: "Book a visit",
  },
  hero: {
    title: ["Interiors for Riyadh,", "at home and at work."],
    lead: "An interior design studio in Riyadh. We design villas, majlis and offices, from the first sketch to the day you move in.",
    doors: [
      { href: "#work", name: "Homes", line: "Villas, apartments and majlis." },
      { href: "#work-commercial", name: "Workplaces", line: "Offices, clinics and showrooms." },
    ],
  },
  intro: {
    lines: ["Riyadh means gardens.", "We make its rooms", "into shade,", "cool and calm,", "for the people in them."],
    note: "The name comes from rawdah, a green hollow where the rain gathers. We take it as the brief.",
    alt: ["Sunlight through a triangular Najdi opening in a mud wall", "Hand-floated mud plaster in late light"],
  },
  light: {
    title: "Drawn with the sun",
    text: "This majlis is one of our 3D studies. Move the sun across a Riyadh day and watch the light come through the Najdi openings. Change the walls to see how each finish holds it.",
    timeLabel: "Time in Riyadh",
    finishLabel: "Wall finish",
    finishes: [
      { id: "plaster", label: "Mud plaster" },
      { id: "travertine", label: "Travertine" },
      { id: "athl", label: "Athl wood" },
      { id: "lime", label: "White lime" },
    ],
    note: "At noon in June the sun stands almost straight above Riyadh. We set openings high and small, so the light arrives and the heat stays out.",
    canvasLabel: "A 3D majlis with triangular openings. The light moves with the time you choose.",
    sunrise: "Sunrise",
    noon: "Noon",
    sunset: "Sunset",
  },
  materials: {
    title: "Materials of Najd",
    panelTitle: ["Made from", "the ground here"],
    panels: [
      { name: "Mud plaster", alt: "Close view of hand-floated mud plaster" },
      { name: "Athl wood", alt: "Athl wood beams with palm-frond ceiling" },
      { name: "Travertine", alt: "Honed travertine floor in soft light" },
      { name: "Sadu weave", alt: "Red, black and white Sadu weaving" },
    ],
    caption: "Plaster, stone, wood and weaving from the Kingdom, chosen for how they age in the heat.",
  },
  work: {
    title: "Work",
    remark: "Every project begins with a visit at the hour the room is used most.",
    projects: [
      { id: "nakheel", name: "Al Nakheel Villa", line: "A family villa built around a shaded courtyard, Al Nakheel.", kind: "home" },
      { id: "diriyah", name: "Diriyah Majlis", line: "A guest majlis in mud plaster under athl wood beams, Diriyah.", kind: "home" },
      { id: "olaya", name: "Olaya Offices", line: "Three floors for a firm of 120 people, Al Olaya.", kind: "work" },
      { id: "hittin", name: "Hittin Apartment", line: "An apartment for a couple who host every weekend, Hittin.", kind: "home" },
      { id: "malqa", name: "Al Malqa Clinic", line: "A dental clinic that feels like a calm living room, Al Malqa.", kind: "work" },
      { id: "kafd", name: "KAFD Showroom", line: "A furniture showroom on two levels, King Abdullah Financial District.", kind: "work" },
    ],
  },
  reels: {
    title: "Walk through the rooms",
    lead: "Short films from our projects. Pull the row to look around.",
    play: "Play",
    pause: "Pause",
    clips: [
      "Courtyard at dusk",
      "Majlis, morning",
      "Dining room",
      "Office reception",
      "Primary bedroom",
      "Clinic waiting room",
      "Kitchen island",
      "Showroom stair",
      "Guest bathroom",
      "Roof terrace",
    ],
  },
  process: {
    title: "How a project runs",
    back: "Previous step",
    forward: "Next step",
    steps: [
      { name: "We visit", text: "We come at the hour the room is used and note its light, heat and noise." },
      { name: "The brief", text: "One meeting with everyone who will use the space. We write down how each day goes." },
      { name: "Concept", text: "Two directions, with plans, mood boards and samples you can hold." },
      { name: "3D design", text: "Every room in 3D, so you walk through it before anything is built." },
      { name: "Drawings", text: "Technical drawings, lighting and joinery details, and a priced bill of quantities." },
      { name: "Build", text: "Our site team runs the contractors and sends a photo report every week." },
      { name: "Handover", text: "We style the rooms, hand you the keys and come back after three months." },
    ],
  },
  faq: {
    title: "Before you call",
    facts: ["King Fahd Road, Al Olaya, Riyadh", "Sunday to Thursday, 9:00 to 18:00", "Studio visits by appointment"],
    items: [
      { q: "Do you work outside Riyadh?", a: "Yes. Most of our projects are in Riyadh, and we also work in Jeddah, Dammam and Al Khobar." },
      { q: "How long does a villa take?", a: "Design takes eight to twelve weeks. Building and fit-out take four to eight months, depending on size." },
      { q: "Can you design without building?", a: "Yes. You receive full drawings and specifications, and we visit the site while your contractor builds." },
      { q: "How is the fee set?", a: "A design fee per square metre, agreed after the first visit. Building costs are quoted separately, line by line." },
      { q: "Do you design commercial spaces?", a: "Offices, clinics, showrooms, restaurants and hotel suites, from one room to several floors." },
      { q: "Will I see it before it is built?", a: "Every room is shown in 3D, and we walk you through it on screen or in the studio." },
    ],
    action: "Book a visit",
    link: "Message us on WhatsApp",
    alt: ["A majlis corner in evening light", "Detail of a carved Najdi door"],
  },
  contact: {
    title: "Visit the studio",
    address: ["King Fahd Road, Al Olaya", "Riyadh 12211, Saudi Arabia"],
    hours: [
      { days: "Sunday – Thursday", time: "9:00 – 18:00" },
      { days: "Saturday", time: "By appointment" },
      { days: "Friday", time: "Closed" },
    ],
    phone: "+966 11 000 0000",
    action: "Book a consultation",
    alt: "The studio's street in Al Olaya at dusk",
    mailSubject: "Consultation request",
    mailBody: "Hello Riyadh Designer,\n\nI would like to book a consultation.\n\nProject type (home / workplace):\nArea (m²):\nNeighbourhood:\nBest time to call:\n",
  },
  footer: {
    columns: [
      { title: "Studio", lines: ["King Fahd Road, Al Olaya", "Riyadh, Saudi Arabia"] },
      { title: "Pages", links: [["#work", "Work"], ["#light", "Light"], ["#process", "Process"], ["#contact", "Contact"]] },
      { title: "Follow", links: [["#", "Instagram"], ["#", "Pinterest"], ["#", "LinkedIn"]] },
      { title: "Contact", lines: ["hello@riyadhdesigner.sa", "+966 11 000 0000"] },
    ],
    wordmark: "RIYADH DESIGNER",
    legal: "© 2026 Riyadh Designer. Interior design studio, Riyadh.",
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  meta: {
    title: "رياض ديزاينر — استوديو تصميم داخلي في الرياض",
    description: "استوديو تصميم داخلي في الرياض. فلل ومجالس ومكاتب وصالات عرض، من الزيارة الأولى حتى التسليم.",
  },
  nav: {
    home: "الصفحة الرئيسية لرياض ديزاينر",
    links: [
      { href: "#work", label: "أعمالنا" },
      { href: "#light", label: "الضوء" },
      { href: "#process", label: "طريقة العمل" },
      { href: "#contact", label: "تواصل" },
    ],
    switchLabel: "English",
    switchName: "Read this page in English",
    action: "احجز زيارة",
  },
  hero: {
    title: ["تصاميم داخلية للرياض،", "في البيت وفي العمل."],
    lead: "استوديو تصميم داخلي في الرياض. نصمّم الفلل والمجالس والمكاتب، من أول رسمة حتى يوم انتقالك.",
    doors: [
      { href: "#work", name: "المنازل", line: "فلل وشقق ومجالس." },
      { href: "#work-commercial", name: "أماكن العمل", line: "مكاتب وعيادات وصالات عرض." },
    ],
  },
  intro: {
    lines: ["الرياض تعني الحدائق.", "نحوّل غرفها", "إلى ظلٍّ", "هادئ وبارد", "لمن يعيش فيها."],
    note: "الاسم من الروضة، المنخفض الأخضر الذي يجتمع فيه المطر. ونحن نأخذه موجّهاً لعملنا.",
    alt: ["ضوء الشمس عبر فتحة نجدية مثلثة في جدار طيني", "لياسة طينية يدوية في ضوء العصر"],
  },
  light: {
    title: "نرسم بالشمس",
    text: "هذا المجلس إحدى دراساتنا ثلاثية الأبعاد. حرّك الشمس عبر يوم في الرياض وشاهد الضوء يدخل من الفتحات النجدية. غيّر الجدران لترى كيف تحتفظ كل خامة بالضوء.",
    timeLabel: "الوقت في الرياض",
    finishLabel: "تشطيب الجدار",
    finishes: [
      { id: "plaster", label: "لياسة طينية" },
      { id: "travertine", label: "ترافرتين" },
      { id: "athl", label: "خشب الأثل" },
      { id: "lime", label: "جير أبيض" },
    ],
    note: "عند الظهر في يونيو تقف الشمس تقريباً فوق الرياض مباشرة. لذلك نضع الفتحات عالية وصغيرة، فيدخل الضوء وتبقى الحرارة خارجاً.",
    canvasLabel: "مجلس ثلاثي الأبعاد بفتحات مثلثة. يتحرك الضوء مع الوقت الذي تختاره.",
    sunrise: "الشروق",
    noon: "الظهر",
    sunset: "الغروب",
  },
  materials: {
    title: "خامات نجد",
    panelTitle: ["من تراب", "هذه الأرض"],
    panels: [
      { name: "لياسة طينية", alt: "لقطة قريبة للياسة طينية يدوية" },
      { name: "خشب الأثل", alt: "جسور خشب الأثل مع سقف من سعف النخيل" },
      { name: "ترافرتين", alt: "أرضية ترافرتين مصقولة في ضوء خافت" },
      { name: "نسيج السدو", alt: "نسيج السدو بالأحمر والأسود والأبيض" },
    ],
    caption: "لياسة وحجر وخشب ونسيج من المملكة، نختارها لطريقة تقدّمها في العمر تحت الحرارة.",
  },
  work: {
    title: "أعمالنا",
    remark: "يبدأ كل مشروع بزيارة في الساعة التي تُستخدم فيها الغرفة أكثر.",
    projects: [
      { id: "nakheel", name: "فيلا النخيل", line: "فيلا عائلية حول فناء مظلّل، حي النخيل.", kind: "home" },
      { id: "diriyah", name: "مجلس الدرعية", line: "مجلس ضيوف بلياسة طينية تحت جسور الأثل، الدرعية.", kind: "home" },
      { id: "olaya", name: "مكاتب العليا", line: "ثلاثة طوابق لشركة من ١٢٠ موظفاً، حي العليا.", kind: "work" },
      { id: "hittin", name: "شقة حطين", line: "شقة لزوجين يستقبلان الضيوف كل نهاية أسبوع، حي حطين.", kind: "home" },
      { id: "malqa", name: "عيادة الملقا", line: "عيادة أسنان تشبه غرفة جلوس هادئة، حي الملقا.", kind: "work" },
      { id: "kafd", name: "صالة عرض كافد", line: "صالة عرض أثاث على مستويين، مركز الملك عبدالله المالي.", kind: "work" },
    ],
  },
  reels: {
    title: "تجوّل في الغرف",
    lead: "أفلام قصيرة من مشاريعنا. اسحب الصف لتتجول.",
    play: "تشغيل",
    pause: "إيقاف",
    clips: [
      "الفناء عند الغروب",
      "المجلس صباحاً",
      "غرفة الطعام",
      "استقبال المكتب",
      "غرفة النوم الرئيسية",
      "انتظار العيادة",
      "جزيرة المطبخ",
      "درج صالة العرض",
      "حمّام الضيوف",
      "السطح",
    ],
  },
  process: {
    title: "كيف يسير المشروع",
    back: "الخطوة السابقة",
    forward: "الخطوة التالية",
    steps: [
      { name: "نزورك", text: "نأتي في الساعة التي تُستخدم فيها الغرفة ونسجّل ضوءها وحرارتها وضجيجها." },
      { name: "الموجز", text: "اجتماع واحد مع كل من سيستخدم المكان. نكتب كيف يمضي كل يوم." },
      { name: "الفكرة", text: "اتجاهان، مع مخططات ولوحات إلهام وعينات تمسكها بيدك." },
      { name: "التصميم ثلاثي الأبعاد", text: "كل غرفة بثلاثة أبعاد، لتتجول فيها قبل أن يُبنى شيء." },
      { name: "المخططات", text: "مخططات تنفيذية وتفاصيل الإضاءة والنجارة وجدول كميات مسعّر." },
      { name: "التنفيذ", text: "فريق الموقع يدير المقاولين ويرسل تقريراً مصوّراً كل أسبوع." },
      { name: "التسليم", text: "ننسّق الغرف ونسلّمك المفاتيح ونعود بعد ثلاثة أشهر." },
    ],
  },
  faq: {
    title: "قبل أن تتصل",
    facts: ["طريق الملك فهد، حي العليا، الرياض", "من الأحد إلى الخميس، ٩:٠٠ حتى ١٨:٠٠", "زيارة الاستوديو بموعد مسبق"],
    items: [
      { q: "هل تعملون خارج الرياض؟", a: "نعم. معظم مشاريعنا في الرياض، ونعمل أيضاً في جدة والدمام والخبر." },
      { q: "كم تستغرق الفيلا؟", a: "التصميم من ثمانية إلى اثني عشر أسبوعاً. والتنفيذ والتشطيب من أربعة إلى ثمانية أشهر حسب المساحة." },
      { q: "هل يمكن التصميم دون التنفيذ؟", a: "نعم. تستلم المخططات والمواصفات كاملة، ونزور الموقع أثناء عمل مقاولك." },
      { q: "كيف تُحدَّد الأتعاب؟", a: "أتعاب تصميم لكل متر مربع، نتفق عليها بعد الزيارة الأولى. وتكاليف التنفيذ تُسعّر منفصلة بنداً بنداً." },
      { q: "هل تصممون المساحات التجارية؟", a: "مكاتب وعيادات وصالات عرض ومطاعم وأجنحة فندقية، من غرفة واحدة إلى عدة طوابق." },
      { q: "هل أرى التصميم قبل تنفيذه؟", a: "تُعرض كل غرفة بثلاثة أبعاد، ونتجول بك فيها على الشاشة أو في الاستوديو." },
    ],
    action: "احجز زيارة",
    link: "راسلنا على واتساب",
    alt: ["زاوية مجلس في ضوء المساء", "تفصيل باب نجدي منقوش"],
  },
  contact: {
    title: "زر الاستوديو",
    address: ["طريق الملك فهد، حي العليا", "الرياض ١٢٢١١، المملكة العربية السعودية"],
    hours: [
      { days: "الأحد – الخميس", time: "٩:٠٠ – ١٨:٠٠" },
      { days: "السبت", time: "بموعد مسبق" },
      { days: "الجمعة", time: "مغلق" },
    ],
    phone: "+966 11 000 0000",
    action: "احجز استشارة",
    alt: "شارع الاستوديو في العليا عند الغروب",
    mailSubject: "طلب استشارة",
    mailBody: "مرحباً رياض ديزاينر،\n\nأرغب في حجز استشارة.\n\nنوع المشروع (منزل / مكان عمل):\nالمساحة (م²):\nالحي:\nأفضل وقت للاتصال:\n",
  },
  footer: {
    columns: [
      { title: "الاستوديو", lines: ["طريق الملك فهد، حي العليا", "الرياض، المملكة العربية السعودية"] },
      { title: "الصفحات", links: [["#work", "أعمالنا"], ["#light", "الضوء"], ["#process", "طريقة العمل"], ["#contact", "تواصل"]] },
      { title: "تابعنا", links: [["#", "إنستغرام"], ["#", "بنترست"], ["#", "لينكدإن"]] },
      { title: "تواصل", lines: ["hello@riyadhdesigner.sa", "+966 11 000 0000"] },
    ],
    wordmark: "رياض ديزاينر",
    legal: "© ٢٠٢٦ رياض ديزاينر. استوديو تصميم داخلي، الرياض.",
  },
};

const dictionaries: Record<Lang, Dictionary> = { en, ar };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

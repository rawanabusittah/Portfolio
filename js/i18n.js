/*
 * i18n convention:
 *  - Plain-text strings: data-i18n="key" (English stays in the HTML, Arabic lives in AR below).
 *  - Strings that contain markup (links, gradient spans): wrap the two versions in
 *    <span class="ar-only"> / <span class="en-only"> (display is switched by html[dir] in CSS).
 */
(() => {
  const AR = {
    "nav.proj": "تطبيقات الويب",
    "tab.art": "المقالات",
    "tab.book": "الكتب",
    "tab.pres": "العروض التقديمية",
    "nav.data": "تحليل البيانات",
    "nav.writing": "كتاباتي",
    "nav.contact": "تواصل",
    "nav.about": "نبذة",
    "nav.skills": "المهارات",
    "nav.exp": "الخبرة",
    "wr.t": "كتاباتي",
    "wr.s": "مقالات وكتب وعروض تقديمية أكتبها وأنشرها بنفسي",
    skip: "انتقل إلى المحتوى",
    "cat.life": "الحياة والتكنولوجيا",
    "cat.self": "تطوير الذات",
    "cat.ai": "الذكاء الاصطناعي والتكنولوجيا",
    "cat.acad": "أكاديمي ومهني",
    "cat.ai2": "الذكاء الاصطناعي",
    "cat.comp": "مهارات الحاسوب",
    "cat.chem": "الكيمياء",
    "projects.t": "مشاريعي",
    "projects.s":
      "تطبيقات ويب وتحليلات بيانات صمّمتها وطوّرتها، تجمع بين التصميم النظيف والتقنيات الحديثة.",
    "t.pe": "محرر الملصقات الأكاديمية",
    "ov.pe": "الجامعة العربية الدولية · 2026",
    "wb.pe.goal":
      "قوالب موحّدة لملصقات ثماني كليات، مع معرض يعرض مشاريع التخرج.",
    "wb.pe.built":
      "منصة كاملة ثنائية اللغة بثلاث خدمات: الملصقات الأكاديمية (قالب لكل كلية وتصدير PDF وPPTX)، ولوحة تحكم للطلاب والمشرفين، ومعرض مشاريع عام مع تعليقات المشرف.",
    "btn.cv": "تحميل السيرة الذاتية (PDF)",
    "btn.projects": "مشاهدة المشاريع",
    "st.proj": "مشروعًا لعملاء",
    "st.stud": "طالب في مهارات الحاسوب",
    "about.t": "نبذة عنّي",
    "about.s": "مطوّرة ومهندسة حاسوب ومحاضِرة جامعية",
    "fw.alt": "محرر الملصقات الأكاديمية: اختيار قالب الكلية",
    "pe.alt.hero": "الصفحة الرئيسية للمنصة الأكاديمية الرقمية",
    "pe.alt.services": "خدمات المنصة الثلاث",
    "pe.alt.fac1": "قوالب الكليات (1)",
    "pe.alt.fac2": "قوالب الكليات (2)",
    "pe.alt.chart": "إدراج مخطط بياني",
    "pe.alt.smartart": "اختيار مخطط ذكي",
    "proj.more.t": "مشاريع أخرى",
    "pj.alt.cv": "واجهة موقع إنشاء السيرة الذاتية CV Master",
    "pj.alt.dl": "واجهة المكتبة الرقمية",
    "pj.alt.has": "الصفحة الرئيسية لموقع حاسباتي",
    "pj.alt.plan": "واجهة موقع خطط يومك",
    "pj.alt.bn": "الواجهة الرئيسية لمكتبة بانيبال",
    "book.hawajisCover": "غلاف هواجس مظلمة نحو النور",
    "book.excelCover": "غلاف كتاب شرح الإكسل",
    "teach.t": "التدريس والمحتوى التعليمي",
    "teach.s":
      "أدرّس منذ 2023: فيديوهات تعليمية في قناة أديرها، وآراء من الجامعة",
    "teach.n1": "طالب وطالبة في 5 فصول دراسية",
    "teach.n2": "فيديو تعليمي عملي",
    "teach.n3": "نسبة النجاح في المقرر",
    "teach.vt": "قناة الفيديوهات التعليمية",
    "teach.vd":
      "شروحات مصوّرة خطوة بخطوة لمقرر مهارات الحاسوب: Word وExcel وPowerPoint وأساسيات الإنترنت.",
    "teach.vb": "افتح قناة تلغرام",
    "teach.rt": "رسالة توصية",
    "teach.q":
      "أظهرت التزامًا ومهارات تدريس مميزة، وهي محبوبة ومقدَّرة من طلابها ومن الكادر الإداري.",
    "teach.c":
      "د. رنا عوديمة، رئيسة قسم متطلبات الجامعة، الجامعة العربية الدولية (14 أيلول 2025، ترجمة)",
    "teach.rb": "عرض رسالة التوصية",
    "proj.s": "مختارات من أعمالي الحديثة في تطوير الويب",
    view: "عرض المشروع ←",
    "expe.t": "الخبرة والتعليم",
    "skill.t": "المهارات التقنية",
    "skill.s": "الأدوات التي أبني وأحلّل وأدرّس بها",
    "skill.g1": "اللغات الأساسية",
    "skill.g2": "الواجهات الأمامية",
    "skill.g3": "الخلفية وقواعد البيانات",
    "expe.w": "الخبرة العملية",
    "expe.e": "التعليم",
    "teach.note":
      "تغيّرت نسبة النجاح خلال الفترة نفسها التي شهدت تغييرات أخرى في التدريس والتقييم؛ أعرضها كتغيّر ملحوظ لا كأثر للفيديوهات وحدها.",
    "teach.lt": "مخابر جامعية",
    "cert.s":
      "تعلّم الآلة وتطوير الويب وPython أولًا، ثم الأجايل والقيادة والتصميم وأدوات المكتب.",
    "cert.t": "الشهادات والدورات",
    "ct.t": "تواصل معي",
    "ct.send": "إرسال الرسالة",
    "pj.goal": "الهدف:",
    "pj.built": "ما أنجزته:",
    "pj.role": "دوري (ضمن فريق من ثلاث طالبات):",
    "pj.link": "تفاصيل المشروع ←",
    "view.all": "عرض كل المشاريع",
    "ov.resp": "تصميم موقع متجاوب",
    "ov.grad": "مشروع تخرج · جامعة دمشق",
    "ov.gradai": "مشروع تخرج · الذكاء الاصطناعي والإبصار الحاسوبي",
    "ov.lib": "منصة مكتبة على الإنترنت",
    "t.bn": "بانيبال: مكتبة إلكترونية لذوي الهمم (مشروع التخرج)",
    "t.bn.s": "بانيبال: مكتبة إلكترونية لذوي الهمم",
    "t.dl": "المكتبة الرقمية",
    "t.has": "حاسباتي",
    "t.cv": "موقع إنشاء السيرة الذاتية",
    "t.plan": "خطط يومك",
    "wb.bn.goal": "جعل القراءة ممكنة دون استخدام اليدين.",
    "wb.bn.role":
      "الجانب الذكي، وتلخيص الكتب بنموذج DistilBART (BART)، واختبار قسم التحكم بحركات الرأس والعين. والنظام بمجمله مكتبة إلكترونية بنحو 1,000 كتاب مع مساعد صوتي وواجهة خلفية PHP/MySQL، بناها فريقنا.",
    "wb.dl.goal": "توفير مساحة واضحة على الإنترنت لاكتشاف الكتب الرقمية.",
    "wb.dl.built":
      "منصة مكتبة مستقلة لتصفح الكتب وإدارتها بشكل منظم، منفصلة عن مشروع التخرج بانيبال.",
    "wb.has.goal": "موقع ثنائي اللغة واحد للحساب والأنظمة الرقمية والهندسة.",
    "wb.has.built":
      "موقع ثنائي اللغة (عربي/إنجليزي) بإطار Vue.js: آلة حاسبة علمية تعرض مثالًا لكل عملية، ومحوّل للأنظمة الرقمية (ثنائي، ثماني، عشري، سداسي عشر)، وحاسبة هندسية توضح الخطوات. تعمل جميعها دون تسجيل دخول، ويمكن لمن يسجّل الدخول حفظ عملياته وأرشفتها.",
    "wb.cv.goal": "تسريع كتابة السيرة الذاتية المهنية وتنسيقها.",
    "wb.cv.built":
      "تطبيق ويب يُدخل فيه المستخدم بياناته، ويخصص القالب، ويحصل على سيرة ذاتية جاهزة ببضع نقرات.",
    "wb.plan.goal": "مساعدة الناس على تنظيم وقتهم وتحقيق أهدافهم.",
    "wb.plan.built":
      "منصة تضم 20 خطة جاهزة في مجالات مختلفة، مع قوالب قابلة للتخصيص وأدوات بسيطة.",
    "ix.dl":
      "منصة مكتبة رقمية مستقلة لتصفح الكتب وإدارتها عبر الإنترنت بواجهة بسيطة ووصول منظم إلى المحتوى.",
    "ix.has":
      "تطبيق ثنائي اللغة بإطار Vue 3: آلة حاسبة علمية على محلّل تعبيرات كتبتُه من الصفر (بلا eval)، ومحوّل أنظمة بدقة BigInt، وحاسبة هندسية بـ 22 شكلًا مع معادلاتها. قابل للتثبيت ويعمل دون اتصال.",
    "ov.has": "Vue 3 · تطبيق PWA · عربي أولًا",
    "t.has.s": "حاسباتي: أدوات علمية",
    "pj.demo": "تجربة مباشرة ↗",
    "data.t": "مشاريع تحليل البيانات",
    "data.stat.projects": "مشاريع مميزة",
    "data.stat.tools": "منهجية التحليل",
    "data.stat.insights": "رؤى",
    "data.stat.output": "نتائج واضحة وعملية",
    "data.selected": "تحليلات مختارة",
    "data.selectedHint": "اكتشفي القصة الكاملة داخل كل مشروع",
    "data.s": "لوحات ونتائج وقصص عملية مبنية على البيانات.",
    "dp.t": "تحليل عادات القراءة 2026",
    "dp.d":
      "تحليل 83 كتابًا قرأتُها: التصنيفات والتقييمات والأطوال ونوع النسخة، مع رسوم بيانية وأبرز النتائج.",
    "dp.label": "تحليل مميز",
    "dp.tag": "تصوير البيانات",
    "dp.caption": "تحويل الملاحظات الخام إلى قصة بصرية واضحة.",
    "dp.imageAlt": "تصورات بيانية ومخططات على حاسوب محمول وتقرير",
    "dp.aw.label": "تحليل المخزون",
    "dp.aw.t": "تحليل مخاطر المخزون: Adventure Works",
    "dp.aw.d":
      "تحليل عملي لقيمة المخزون ومخاطر إعادة الطلب والمخزون المتوقف ومشكلات جودة البيانات في ملف تجريبي لقطع الدراجات.",
    "dp.aw.imageAlt": "معاينة مشروع تحليل مخاطر المخزون",
    "dp.aw.caption": "تحويل بيانات المخزون إلى مخاطر وإجراءات مقترحة.",
    "dp.sales.label": "تحليل المبيعات",
    "dp.sales.t": "مشروع تحليل المبيعات",
    "dp.sales.d":
      "مشروع عملي لتحليل المبيعات باستخدام Excel، يحوّل بيانات المعاملات إلى اتجاهات ومقارنات ورؤى واضحة قابلة للتطبيق.",
    "dp.sales.imageAlt": "مخططات وتصوّرات بيانية لتحليل المبيعات",
    "dp.sales.caption": "استكشاف بيانات المبيعات لدعم قرارات أفضل.",
    "sales.title": "مشروع تحليل المبيعات",
    "dp.back": "← العودة إلى تحليل البيانات",
  };
  const $ = (s) => [...document.querySelectorAll(s)];
  const els = $("[data-i18n]"),
    phs = $("[data-i18n-ph]"),
    alts = $("[data-i18n-alt]");
  els.forEach((e) => (e.dataset.en = e.textContent.trim()));
  phs.forEach((e) => (e.dataset.en = e.placeholder));
  alts.forEach((e) => (e.dataset.en = e.alt));
  const btn = document.getElementById("langToggle");
  const titleEl = document.querySelector("title[data-title-ar]");
  if (titleEl) titleEl.dataset.en = titleEl.textContent.trim();
  const updatePageTitle = (ar) => {
    if (titleEl || document.querySelector("#home")) return;
    const heading =
      document.querySelector(
        ar
          ? "h1 .ar-only, h2.section-title .ar-only, h3 .ar-only"
          : "h1 .en-only, h2.section-title .en-only, h3 .en-only",
      ) || document.querySelector("h1, h2.section-title");
    if (!heading) return;
    const text = heading.textContent.trim();
    if (text) document.title = `${text} | Rawan Abu Sittah`;
  };
  function apply(l) {
    const ar = l === "ar";
    document.documentElement.lang = l;
    document.documentElement.dir = ar ? "rtl" : "ltr";
    if (titleEl)
      document.title = ar ? titleEl.dataset.titleAr : titleEl.dataset.en;
    els.forEach(
      (e) =>
        (e.textContent =
          ar && AR[e.dataset.i18n] ? AR[e.dataset.i18n] : e.dataset.en),
    );
    phs.forEach(
      (e) =>
        (e.placeholder =
          ar && AR[e.dataset.i18nPh] ? AR[e.dataset.i18nPh] : e.dataset.en),
    );
    alts.forEach(
      (e) =>
        (e.alt =
          ar && AR[e.dataset.i18nAlt] ? AR[e.dataset.i18nAlt] : e.dataset.en),
    );
    updatePageTitle(ar);
    if (btn) btn.textContent = ar ? "EN" : "ع";
    window.dispatchEvent(
      new CustomEvent("languagechange", { detail: { language: l } }),
    );
    try {
      localStorage.setItem("lang", l);
    } catch {}
  }
  let saved = null;
  try {
    saved = localStorage.getItem("lang");
  } catch {}
  apply(saved || ((navigator.language || "").startsWith("ar") ? "ar" : "en"));
  if (btn)
    btn.addEventListener("click", () =>
      apply(document.documentElement.lang === "ar" ? "en" : "ar"),
    );
})();

(() => {
  const root = document.getElementById("readingProject");
  if (!root) return;
  const T = {
    ar: {
      title: "تحليل عادات القراءة 2026",
      sub: "تحليل 83 كتابًا قرأتُها: التصنيفات، التقييمات، الأطوال، ونوع النسخة",
      kpi: ["كتابًا", "صفحة", "متوسط الصفحات", "متوسط التقييم", "مؤلفًا"],
      c1: "عدد الكتب حسب التصنيف",
      c2: "متوسط التقييم حسب التصنيف (من 5)",
      c3: "طول الكتاب مقابل متوسط التقييم",
      c4: "ورقي مقابل إلكتروني",
      paper: "ورقي",
      ebook: "إلكتروني",
      books: "كتاب",
      ins: "أبرز النتائج",
      sourceTitle: "مصدر البيانات وطريقة جمعها",
      source:
        "جُمعت البيانات من سجل قراءتي الشخصية خلال عام 2026. سجّلتُ كل كتاب قرأته، ثم نظّمتُ البيانات في ملف Excel قبل تحليلها ومقارنتها.",
      questionsTitle: "أسئلة التحليل",
      questions: [
        "ما التصنيفات الأكثر حضورًا في قراءتي؟",
        "هل يرتبط طول الكتاب بتقييمي له؟",
        "ما الفرق بين الكتب الورقية والإلكترونية؟",
      ],
      insights: [
        "الكتب الدينية (27) وكتب الغموض والرعب (24) تشكّل أكثر من نصف قراءاتي.",
        "كلما طال الكتاب ارتفع تقييمه: الكتب فوق 400 صفحة حصلت على 5 من 5 في المتوسط، مقابل 2.5 للكتب دون 100 صفحة (معامل الارتباط 0.57).",
        "الكتب الورقية (6 فقط) متوسط تقييمها 4.67 مقابل 3.03 للإلكترونية.",
        "أيمن العتوم أعلى المؤلفين تقييمًا (4.8 في 11 كتابًا)، بينما عبد الوهاب السيد الرفاعي الأكثر قراءةً (28 كتابًا) بمتوسط 2.55.",
      ],
      tools: "الأدوات: Excel (Pivot و صيغ) · Python (pandas) · JavaScript",
      dl: "تحميل ملف البيانات (Excel)",
    },
    en: {
      title: "2026 Reading Habits Analysis",
      sub: "Analysis of 83 books I read: genres, ratings, length and format",
      kpi: ["Books", "Pages", "Avg. pages", "Avg. rating", "Authors"],
      c1: "Books by category",
      c2: "Average rating by category (out of 5)",
      c3: "Book length vs. average rating",
      c4: "Paper vs. e-book",
      paper: "Paper",
      ebook: "E-book",
      books: "books",
      ins: "Key findings",
      sourceTitle: "Data source and collection",
      source:
        "The data comes from my personal reading log for 2026. I recorded every book I read, organized the entries in Excel, and then analyzed and compared the results.",
      questionsTitle: "Analysis questions",
      questions: [
        "Which genres appear most often in my reading?",
        "Is book length related to my rating?",
        "What is the difference between paper and e-books?",
      ],
      insights: [
        "Religious (27) and mystery/horror (24) books make up over half of my reading.",
        "Longer books rate higher: 400+ page books average 5/5 versus 2.5 for books under 100 pages (correlation 0.57).",
        "Paper books (only 6) average 4.67 versus 3.03 for e-books.",
        "Ayman Al-Otum is my highest-rated author (4.8 across 11 books); Abdelwahab Al-Rifai is my most-read (28 books) at 2.55 average.",
      ],
      tools: "Tools: Excel (pivots & formulas) · Python (pandas) · JavaScript",
      dl: "Download dataset (Excel)",
    },
  };
  const cats = [
    ["ديني", "Religious", 27, 3.3],
    ["غموض ورعب", "Mystery & Horror", 24, 2.77],
    ["رواية", "Novels", 11, 3.09],
    ["نفسي وتطوير ذات", "Psychology & Self-dev", 10, 2.9],
    ["تاريخ وسير", "History & Bio", 6, 5],
    ["علمي وثقافي", "Science & Culture", 4, 2.5],
    ["تربوي", "Parenting", 1, 2.5],
  ];
  const lens = [
    ["< 100", 14, 2.46],
    ["100–200", 38, 2.89],
    ["200–300", 16, 3.28],
    ["300–400", 9, 3.78],
    ["400+", 6, 5],
  ];
  const bars = (rows, max, fmt) =>
    `<div class="rp-bars">${rows
      .map(
        ([l, v]) =>
          `<div class="rp-row"><span class="rp-label">${l}</span><div class="rp-track"><i style="width:${(v / max) * 100}%"></i></div><b>${fmt(v)}</b></div>`,
      )
      .join("")}</div>`;
  function render() {
    const ar = document.documentElement.lang === "ar";
    const t = T[ar ? "ar" : "en"];
    const i = ar ? 0 : 1;
    const kv = ["83", "16,938", "204", "3.14", "40"];
    root.innerHTML = `
      <h3 class="rp-title">${t.title}</h3><p class="rp-sub">${t.sub}</p>
      <div class="rp-kpis">${kv.map((v, k) => `<div class="rp-kpi"><b>${v}</b><span>${t.kpi[k]}</span></div>`).join("")}</div>
      <div class="rp-context">
        <section class="rp-card"><h4>${t.sourceTitle}</h4><p>${t.source}</p></section>
        <section class="rp-card"><h4>${t.questionsTitle}</h4><ul>${t.questions.map((q) => `<li>${q}</li>`).join("")}</ul></section>
      </div>
      <div class="rp-grid">
        <div class="rp-card"><h4>${t.c1}</h4>${bars(cats.map((c) => [c[i], c[2]]), 27, (v) => v)}</div>
        <div class="rp-card"><h4>${t.c2}</h4>${bars(cats.map((c) => [c[i], c[3]]), 5, (v) => v.toFixed(1))}</div>
        <div class="rp-card"><h4>${t.c3}</h4>${bars(lens.map((l) => [l[0], l[2]]), 5, (v) => v.toFixed(1))}</div>
        <div class="rp-card"><h4>${t.c4}</h4>${bars([[t.ebook, 3.03], [t.paper, 4.67]], 5, (v) => v.toFixed(2))}<p class="rp-note">77 ${t.ebook} · 6 ${t.paper}</p></div>
      </div>
      <div class="rp-card rp-ins"><h4>${t.ins}</h4><ul>${t.insights.map((s) => `<li>${s}</li>`).join("")}</ul></div>
      <p class="rp-note">${t.tools}</p>
      <p class="rp-dl"><a class="btn btn-primary" href="data/reading_log_2026.xlsx" download>${t.dl}</a></p>`;
  }
  render();
  window.addEventListener("languagechange", render);
})();

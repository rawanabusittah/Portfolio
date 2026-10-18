// Renders the three data-analysis pages. Each block runs only on its own page.
/* ===== Reading habits ===== */
(() => {
  const root = document.getElementById("readingProject");
  if (!root) return;
  const T = {
    ar: {
      title: "تحليل عادات القراءة 2026",
      sub: "تحليل {books} كتابًا قرأتُها: التصنيفات، التقييمات، الأطوال، ونوع النسخة",
      kpi: ["كتابًا", "صفحة", "متوسط الصفحات", "متوسط التقييم", "مؤلفًا"],
      c1: "عدد الكتب حسب التصنيف",
      c2: "متوسط التقييم حسب التصنيف (من 5)",
      catNote: "التصنيفات التي تضم أقل من 5 كتب وصفية فقط ولا يُبنى عليها استنتاج.",
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
        "الكتب الدينية ({religious}) وكتب الغموض والرعب ({mystery}) تشكّل أكثر من نصف قراءاتي.",
        "يميل تقييمي للكتب الأطول إلى الارتفاع: الكتب فوق 400 صفحة حصلت على {longRating} من 5 في المتوسط، مقابل {shortRating} للكتب دون 100 صفحة (معامل بيرسون {correlation}، وسبيرمان {rho}).",
        "لكن الصورة أعقد: بعد استبعاد أعلى المؤلفين تقييمًا ينخفض الارتباط إلى {rWithout} ({nWithout} كتابًا)، وجميع كتب التاريخ والسير الـ{histN} من تأليفه؛ فالطول والمؤلف متداخلان ولا يمكن فصل أثر أحدهما.",
        "الكتب الورقية ({paperCount} فقط) متوسط تقييمها {paperRating} مقابل {ebookRating} للإلكترونية، لكن هذه عيّنة صغيرة وغير متوازنة ولا تكفي لتعميم الفرق.",
        "أيمن العتوم أعلى المؤلفين تقييمًا ({bestRating} في {bestCount} كتابًا)، بينما عبد الوهاب السيد الرفاعي الأكثر قراءةً ({mostCount} كتابًا) بمتوسط {mostRating}.",
      ],
      tools: "الأدوات: Excel (Pivot و صيغ) · Python (pandas) · JavaScript",
      dl: "تحميل ملف البيانات (Excel)",
    },
    en: {
      title: "2026 Reading Habits Analysis",
      sub: "Analysis of {books} books I read: genres, ratings, length and format",
      kpi: ["Books", "Pages", "Avg. pages", "Avg. rating", "Authors"],
      c1: "Books by category",
      c2: "Average rating by category (out of 5)",
      catNote: "Categories with fewer than 5 books are descriptive only and support no conclusion.",
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
        "Religious ({religious}) and mystery/horror ({mystery}) books make up over half of my reading.",
        "Longer books tend to rate higher: 400+ page books average {longRating}/5 versus {shortRating} for books under 100 pages (Pearson r {correlation}, Spearman ρ {rho}).",
        "But it is not that simple: excluding the top-rated author drops the correlation to {rWithout} ({nWithout} books), and all {histN} history/biography books are his, so length and author are entangled.",
        "Paper books ({paperCount} only) average {paperRating} versus {ebookRating} for e-books, but this small and uneven sample is not enough to support a broad conclusion.",
        "Ayman Al-Otum is my highest-rated author ({bestRating} across {bestCount} books); Abdelwahab Al-Rifai is my most-read ({mostCount} books) at {mostRating} average.",
      ],
      tools: "Tools: Excel (pivots & formulas) · Python (pandas) · JavaScript",
      dl: "Download dataset (Excel)",
    },
  };
  const data = window.RD;
  if (!data) return;
  const bars = (rows, max, fmt) =>
    `<div class="rp-bars">${rows
      .map(
        ([l, v]) =>
          `<div class="rp-row"><span class="rp-label"><bdi>${l}</bdi></span><div class="rp-track"><i style="width:${(v / max) * 100}%"></i></div><b>${fmt(v)}</b></div>`,
      )
      .join("")}</div>`;
  function render() {
    const ar = document.documentElement.lang === "ar";
    const t = T[ar ? "ar" : "en"];
    const CAT_EN = { "ديني": "Religious", "غموض ورعب": "Mystery & Horror", "رواية": "Novels", "نفسي وتطوير ذات": "Psychology & Self-dev", "تاريخ وسير": "History & Bio", "علمي وثقافي": "Science & Culture", "تربوي": "Parenting" };
    const categoryNames = data.cats.map((c) => (ar ? c[0] : CAT_EN[c[0]] || c[0]));
    const kv = [
      data.kpi.books,
      data.kpi.pages.toLocaleString("en-US"),
      data.kpi.avg_pages,
      data.kpi.avg_rating,
      data.kpi.authors,
    ];
    const category = (name) => data.cats.find((c) => c[0] === name);
    const insightValues = {
      books: data.kpi.books,
      religious: category("ديني")[1],
      mystery: category("غموض ورعب")[1],
      longRating: data.lens[data.lens.length - 1][2],
      shortRating: data.lens[0][2],
      correlation: data.r,
      rho: data.rho,
      rWithout: data.r_wo_best,
      nWithout: data.n_wo_best,
      histN: data.hist.n,
      paperCount: data.fmt.paper[0],
      paperRating: data.fmt.paper[1],
      ebookRating: data.fmt.ebook[1],
      bestRating: data.best.avg,
      bestCount: data.best.n,
      mostCount: data.most.n,
      mostRating: data.most.avg,
    };
    const formatInsight = (text) =>
      text.replace(/\{(\w+)\}/g, (_, key) => insightValues[key]);
    root.innerHTML = `
      <h2 class="rp-title">${t.title}</h2><p class="rp-sub">${t.sub.replace("{books}", data.kpi.books)}</p>
      <div class="rp-kpis">${kv.map((v, k) => `<div class="rp-kpi"><b>${v}</b><span>${t.kpi[k]}</span></div>`).join("")}</div>
      <div class="rp-context">
        <section class="rp-card"><h4>${t.sourceTitle}</h4><p>${t.source}</p></section>
        <section class="rp-card"><h4>${t.questionsTitle}</h4><ul>${t.questions.map((q) => `<li>${q}</li>`).join("")}</ul></section>
      </div>
      <div class="rp-grid">
        <div class="rp-card"><h4>${t.c1}</h4>${bars(
          data.cats.map((c, k) => [categoryNames[k], c[1]]),
          Math.max(...data.cats.map((c) => c[1])),
          (v) => v,
        )}</div>
        <div class="rp-card"><h4>${t.c2}</h4>${bars(
          data.cats.map((c, k) => [`${categoryNames[k]} (n=${c[1]})`, c[2]]),
          5,
          (v) => v.toFixed(1),
        )}<p class="rp-note">${t.catNote}</p></div>
        <div class="rp-card"><h4>${t.c3}</h4>${bars(
          data.lens.map((l) => [`${l[0]} (n=${l[1]})`, l[2]]),
          5,
          (v) => v.toFixed(1),
        )}</div>
        <div class="rp-card"><h4>${t.c4}</h4>${bars(
          [
            [t.ebook, data.fmt.ebook[1]],
            [t.paper, data.fmt.paper[1]],
          ],
          5,
          (v) => v.toFixed(2),
        )}<p class="rp-note">${data.fmt.ebook[0]} ${t.ebook} · ${data.fmt.paper[0]} ${t.paper}</p></div>
      </div>
      <div class="rp-card rp-ins"><h4>${t.ins}</h4><ul>${t.insights.map((s) => `<li>${formatInsight(s)}</li>`).join("")}</ul></div>
      <p class="rp-note">${t.tools}</p>
      <p class="rp-dl"><a class="btn btn-primary" href="data/reading_log_2026.xlsx" download>${t.dl}</a></p>`;
  }
  render();
  window.addEventListener("languagechange", render);
})();

/* ===== Adventure Works inventory ===== */
(() => {
  const root = document.getElementById("adventureProject");
  const D = window.AW;
  if (!root || !D) return;

  const n = (v) => Math.round(v).toLocaleString("en-US");
  const usd = (v) => "$" + n(v);
  const usd2 = (v) => "$" + v.toFixed(2);
  const pct = (v, d = 0) => (v * 100).toFixed(d) + "%";

  const k = D.kpi, q = D.quality, r = D.replen, ds = D.disc, sp = D.supplier;
  const top = D.cats[0];
  const cat = (c) => D.cats.find((x) => x.cat === c);
  const CAT_AR = {
    Frames: "الهياكل", Tyres: "الإطارات", "Gear Components": "قطع التروس",
    Saddles: "المقاعد", "Brake System": "نظام الفرامل",
  };
  const NAME_AR = { Frames: "الهياكل", Tyres: "الإطارات", Saddles: "المقاعد", "Brake System": "الفرامل", "Gear Components": "قطع التروس" };
  const zeroCats = Object.entries(r.no_reorder_active_by_cat);
  const S = D.sens;
  const th = (x) => S.thresholds.find((t) => t.th === x);
  const lo = S.thresholds[S.thresholds.length - 1], hi = S.thresholds[0];

  const T = {
    en: {
      title: "Inventory Risk Analysis: Adventure Works",
      sub: `A bicycle-parts inventory of ${k.lines} stock lines, checked for tied-up capital, missing reorder triggers and data reliability`,
      sample: "Dataset note",
      sampleText:
        "This is a sample inventory workbook for the fictional Adventure Works company, not data from a real business. I used it to practice and show an inventory analysis workflow: profiling, cleaning decisions, risk metrics and recommendations. There is no sales or demand data in it, so days of cover and turnover cannot be calculated.",
      kpi: ["Stock lines", "Distinct products", "Units in stock", "Inventory value", "Categories"],
      qTitle: "Questions",
      questions: [
        "Where is the inventory value concentrated?",
        "Which stock is not protected by a reorder level, and which is far above it?",
        "How much of the stock is discontinued, and can the data be trusted?",
      ],
      mTitle: "Method",
      method:
        "Inventory value = unit price × units in stock; the file does not say whether the price is cost or selling price, so values are upper bounds if it is a selling price. I analysed the Products sheet (150 lines). The ProductsA sheet holds the same 150 lines in a different order plus a total row, which I verified in code and excluded. Every number on this page is computed by a Python script from the workbook, and the headline results are re-tested against other thresholds and without duplicate rows.",
      c1: "Inventory value by category",
      c2: "Lines by stock vs. reorder level",
      c2note: `Stock ÷ reorder level, for the ${D.kpi.lines - r.no_reorder} lines that have a reorder level. ${r.no_reorder} lines have none.`,
      c3: "Active lines with reorder level 0, by category",
      c3note: `${r.no_reorder_active} of ${r.active_lines} active lines (${pct(r.no_reorder_active / r.active_lines)}) hold ${usd(r.no_reorder_active_value)} with no reorder trigger.`,
      c4: "Discontinued lines still holding stock",
      lines: "lines",
      ins: "Key findings",
      insights: [
        `${pct(top.share)} of inventory value (${usd(top.value)}) is in ${top.cat}, all bought from one supplier, ${sp.top}. That supplier carries ${pct(sp.value_share)} of the total, so one disruption would hit almost half the value.`,
        `${r.over_active} of ${r.active_lines} active lines hold at least ${r.over_threshold}× their reorder level, tying up ${usd(r.over_active_value)} (${pct(r.over_active_value / k.value)} of value). The figure depends on my 20× threshold: ${usd(lo.over_value)} at ${lo.th}× and ${usd(hi.over_value)} at ${hi.th}×. Without demand data I cannot say whether stock is excessive or reorder levels are set too low, but both deserve review.`,
        `${r.no_reorder_active} active lines have a reorder level of 0 (${zeroCats.map(([c, v]) => `${c} ${v}`).join(", ")}). They hold ${usd(r.no_reorder_active_value)}. If they are bought to order this is a policy, not a gap, so the first step is to confirm which it is.`,
        `${ds.with_stock} discontinued lines still hold ${usd(ds.value)} (${pct(ds.share, 1)} of value), or ${usd(S.dedup.disc_value)} if the exact duplicate rows are not real stock. None is on order. Saddles stand out: ${cat("Saddles").disc} of its ${cat("Saddles").lines} lines are discontinued.`,
        `Stock-outs are under control: ${r.stockouts} lines are at zero, ${r.stockouts_disc} of them discontinued. The other ${r.stockouts - r.stockouts_disc} (${r.active_stockouts.join(", ")}) ${r.active_stockouts_on_order ? "already have units on order" : "have no units on order and need attention"}.`,
      ],
      aTitle: "Recommendations",
      aHead: ["Action", "Scope", "Why"],
      actions: [
        ["Confirm and set reorder levels", `${r.no_reorder_active} active lines`, "Decide which are made to order, and give the rest a level so a purchase can trigger."],
        ["Review overstock", `${r.over_active} lines, ${usd(r.over_active_value)}`, "Pause purchasing until stock falls or levels are justified."],
        ["Clear discontinued stock", `${ds.with_stock} lines, ${usd(ds.value)}`, "Release capital; discount or return to supplier."],
        ["Add a unique SKU or batch ID", `${k.lines} lines`, `Only ${k.distinct} distinct product names exist, so duplicates cannot be confirmed.`],
        ["Validate outlier prices", `${q.outlier_lines} lines above ${usd2(q.outlier_fence)}`, `${q.worst_product} ranges from ${usd2(q.worst_min)} to ${usd2(q.worst_max)}.`],
      ],
      watchTitle: "Largest lines to review first",
      watchHead: ["Category", "Product", "Stock", "Reorder level", "Value"],
      watchOver: "Overstock (≥ 20× reorder level)",
      watchDisc: "Discontinued with stock",
      dqTitle: "Data-quality log",
      dqHead: ["Issue", "Size", "How I handled it"],
      dq: [
        ["Exact duplicate rows", `${q.exact_dups} lines, ${usd(q.dup_value)}`, `Kept in the totals because a batch could legitimately repeat. Without them value would be ${usd(q.dedup_value)} (${pct(-q.dup_value / k.value, 1).replace("-", "−")}).`],
        ["No SKU or batch ID", `${k.lines} lines, ${k.distinct} names`, "Treated each line as a stock line, not as a unique product."],
        ["Date Entered uses =TODAY()+n formulas", `${q.formula_dates} lines`, "Dates change every time the file opens, so I did no time analysis."],
        ["Total row in ProductsA", "1 row", `Reading it as data lifts average price from ${usd(q.clean_avg_price)} to ${usd(q.sumrow_avg_price)}; excluded.`],
        ["Price outliers", `${q.outlier_lines} lines`, "Flagged for validation, not removed."],
        ["Inconsistent name casing", q.lower_names.join(", "), "Left as in the source. Supplier name “Imortadores” is also as in the source."],
      ],
      sTitle: "How much do the findings move?",
      sNote: "Overstock and reorder figures count active lines only. Overstock depends on the threshold I chose, and the totals change if the exact duplicate rows are not real stock.",
      sHead: ["Overstock threshold", "Lines", "Value held", "Share of inventory value"],
      dHead: ["Metric", "As reported", "Without duplicate rows", "Change"],
      dRows: ["Stock lines", "Inventory value", "Overstock value (20×)", "Active lines, no reorder level", "Discontinued stock value", "Frames share of value"],
      limTitle: "Limits",
      limits: [
        "Sample data: the findings show a method, not the state of a real company.",
        "Overstock is measured against reorder level, not against demand.",
        "The 20× overstock threshold is my choice. Changing it changes the counts (see the table above).",
        "A reorder level of 0 may be a deliberate made-to-order policy, not a missing setting.",
        "Unit price may be a selling price, so inventory value may be overstated against cost.",
      ],
      tools: "Tools: Python (pandas, openpyxl) · Excel · JavaScript",
      dl: "Download analysis workbook (Excel)",
      script: "Download analysis code (Python)",
    },
    ar: {
      title: "تحليل مخاطر المخزون: Adventure Works",
      sub: `مخزون قطع دراجات من ${k.lines} بند، فُحص من حيث رأس المال المجمَّد وغياب حدود إعادة الطلب وموثوقية البيانات`,
      sample: "ملاحظة عن البيانات",
      sampleText:
        "هذا ملف مخزون تجريبي لشركة Adventure Works الافتراضية وليس بيانات شركة حقيقية. استخدمته لأتدرب وأعرض مسار تحليل المخزون: فحص البيانات، وقرارات التنظيف، ومؤشرات المخاطر، والتوصيات. لا توجد فيه بيانات مبيعات أو طلب، لذلك لا يمكن حساب أيام التغطية أو معدل الدوران.",
      kpi: ["بند مخزون", "منتجًا مختلفًا", "وحدة في المخزون", "قيمة المخزون", "تصنيفات"],
      qTitle: "الأسئلة",
      questions: [
        "أين تتركّز قيمة المخزون؟",
        "أي مخزون غير محمي بحد إعادة طلب، وأيه يفوقه بكثير؟",
        "كم من المخزون متوقَّف الإنتاج، وهل يمكن الوثوق بالبيانات؟",
      ],
      mTitle: "المنهجية",
      method:
        "قيمة المخزون = سعر الوحدة × الوحدات المتوفرة؛ الملف لا يحدد هل السعر تكلفة أم سعر بيع، فالقيم حدٌّ أعلى إن كان سعر بيع. حلّلتُ ورقة Products (150 بندًا). ورقة ProductsA تحوي البنود نفسها بترتيب مختلف مع صف مجاميع، وتحققتُ من ذلك برمجيًا واستبعدتُها. كل رقم في هذه الصفحة يحسبه سكربت Python من ملف الإكسل، وأعدتُ اختبار النتائج الرئيسية بعتبات أخرى وبدون الصفوف المكررة.",
      c1: "قيمة المخزون حسب التصنيف",
      c2: "البنود حسب المخزون مقابل حد إعادة الطلب",
      c2note: `المخزون ÷ حد إعادة الطلب، للبنود التي لها حد (${D.kpi.lines - r.no_reorder} بندًا). ${r.no_reorder} بندًا بلا حد.`,
      c3: "البنود النشطة بحد إعادة طلب 0، حسب التصنيف",
      c3note: `${r.no_reorder_active} من ${r.active_lines} بندًا نشطًا (${pct(r.no_reorder_active / r.active_lines)}) تحمل ${usd(r.no_reorder_active_value)} دون أي محفّز لإعادة الطلب.`,
      c4: "بنود متوقَّفة ما زال لها مخزون",
      lines: "بند",
      ins: "أبرز النتائج",
      insights: [
        `${pct(top.share)} من قيمة المخزون (${usd(top.value)}) في تصنيف ${CAT_AR[top.cat]}، وكله من مورّد واحد هو ${sp.top}. يحمل هذا المورّد ${pct(sp.value_share)} من الإجمالي، فأي تعطّل عنده يطال قرابة نصف القيمة.`,
        `${r.over_active} من ${r.active_lines} بندًا نشطًا تحمل ما لا يقل عن ${r.over_threshold} ضعف حد إعادة الطلب، وتجمّد ${usd(r.over_active_value)} (${pct(r.over_active_value / k.value)} من القيمة). الرقم يعتمد على عتبة الـ 20 ضعفًا التي اخترتُها: ${usd(lo.over_value)} عند ${lo.th} ضعفًا و${usd(hi.over_value)} عند ${hi.th}. دون بيانات طلب لا أستطيع الجزم هل المخزون زائد أم الحدود منخفضة، وكلاهما يستحق المراجعة.`,
        `${r.no_reorder_active} بندًا نشطًا حدّ إعادة الطلب فيها 0 (${zeroCats.map(([c, v]) => `${CAT_AR[c]} ${v}`).join("، ")}). تحمل ${usd(r.no_reorder_active_value)}. إن كانت تُشترى عند الطلب فهذه سياسة لا ثغرة، لذا الخطوة الأولى التأكد من أيّهما.`,
        `${ds.with_stock} بنود متوقَّفة ما زالت تحمل ${usd(ds.value)} (${pct(ds.share, 1)} من القيمة)، أو ${usd(S.dedup.disc_value)} إن لم تكن الصفوف المكررة تمامًا مخزونًا حقيقيًا. لا شيء منها قيد الطلب. المقاعد لافتة: ${cat("Saddles").disc} من ${cat("Saddles").lines} بندًا فيها متوقَّفة.`,
        `النفاد تحت السيطرة: ${r.stockouts} بنود عند الصفر، منها ${r.stockouts_disc} متوقَّفة. أما الباقي (${r.stockouts - r.stockouts_disc}: ${r.active_stockouts.join("، ")}) ${r.active_stockouts_on_order ? "فلها وحدات قيد الطلب" : "فلا وحدات قيد الطلب لها وتحتاج متابعة"}.`,
      ],
      aTitle: "التوصيات",
      aHead: ["الإجراء", "النطاق", "السبب"],
      actions: [
        ["تأكيد حدود إعادة الطلب وضبطها", `${r.no_reorder_active} بندًا نشطًا`, "تحديد ما يُشترى عند الطلب، وإعطاء الباقي حدًّا يطلق الشراء."],
        ["مراجعة المخزون الزائد", `${r.over_active} بندًا، ${usd(r.over_active_value)}`, "إيقاف الشراء حتى ينخفض المخزون أو تُبرَّر الحدود."],
        ["تصريف المخزون المتوقَّف", `${ds.with_stock} بنود، ${usd(ds.value)}`, "تحرير رأس المال بالتخفيض أو الإرجاع للمورّد."],
        ["إضافة معرّف فريد للصنف أو الدفعة", `${k.lines} بندًا`, `لا يوجد سوى ${k.distinct} اسم منتج مختلف، فلا يمكن تأكيد التكرار.`],
        ["التحقق من الأسعار الشاذة", `${q.outlier_lines} بنود فوق ${usd2(q.outlier_fence)}`, `سعر ${q.worst_product} يتراوح من ${usd2(q.worst_min)} إلى ${usd2(q.worst_max)}.`],
      ],
      watchTitle: "أكبر البنود للمراجعة أولًا",
      watchHead: ["التصنيف", "المنتج", "المخزون", "حد إعادة الطلب", "القيمة"],
      watchOver: "مخزون زائد (≥ 20 ضعف حد إعادة الطلب)",
      watchDisc: "متوقَّفة ولها مخزون",
      dqTitle: "سجل جودة البيانات",
      dqHead: ["المشكلة", "الحجم", "كيف تعاملتُ معها"],
      dq: [
        ["صفوف مكررة تمامًا", `${q.exact_dups} بندًا، ${usd(q.dup_value)}`, `أبقيتُها في المجاميع لأن الدفعة قد تتكرر فعلًا. بدونها تصبح القيمة ${usd(q.dedup_value)} (انخفاض ${pct(q.dup_value / k.value, 1)}).`],
        ["لا يوجد معرّف صنف أو دفعة", `${k.lines} بندًا، ${k.distinct} اسمًا`, "عاملتُ كل سطر كبند مخزون لا كمنتج فريد."],
        ["«تاريخ الإدخال» صيغ =TODAY()+n", `${q.formula_dates} بندًا`, "التواريخ تتغير كلما فُتح الملف، فلم أجرِ أي تحليل زمني."],
        ["صف مجاميع في ProductsA", "صف واحد", `قراءته كبيانات ترفع متوسط السعر من ${usd(q.clean_avg_price)} إلى ${usd(q.sumrow_avg_price)}؛ استبعدتُه.`],
        ["أسعار شاذة", `${q.outlier_lines} بنود`, "وُسمت للتحقق ولم تُحذف."],
        ["اختلاف حالة الأحرف في الأسماء", q.lower_names.join("، "), "تركتُها كما في المصدر، وكذلك اسم المورّد «Imortadores»."],
      ],
      sTitle: "كم تتحرك النتائج؟",
      sNote: "أرقام المخزون الزائد وحد إعادة الطلب للبنود النشطة فقط. المخزون الزائد يعتمد على العتبة التي اخترتُها، وتتغير المجاميع إن لم تكن الصفوف المكررة تمامًا مخزونًا حقيقيًا.",
      sHead: ["عتبة المخزون الزائد", "البنود", "القيمة المحتجزة", "من قيمة المخزون"],
      dHead: ["المقياس", "كما في التقرير", "بدون الصفوف المكررة", "التغيّر"],
      dRows: ["بنود المخزون", "قيمة المخزون", "قيمة المخزون الزائد (20 ضعفًا)", "بنود نشطة بلا حد إعادة طلب", "قيمة المخزون المتوقَّف", "حصة الهياكل من القيمة"],
      limTitle: "الحدود",
      limits: [
        "بيانات تجريبية: النتائج تعرض منهجًا لا حال شركة حقيقية.",
        "المخزون الزائد مقيس بحد إعادة الطلب لا بالطلب الفعلي.",
        "عتبة 20 ضعفًا اخترتُها أنا، وتغييرها يغيّر الأعداد (انظر الجدول أعلاه).",
        "حد إعادة طلب 0 قد يكون سياسة «شراء عند الطلب» متعمدة لا إعدادًا ناقصًا.",
        "سعر الوحدة قد يكون سعر بيع، فقد تكون قيمة المخزون مبالغًا فيها قياسًا بالتكلفة.",
      ],
      tools: "الأدوات: Python (pandas, openpyxl) · Excel · JavaScript",
      dl: "تحميل مصنّف التحليل (Excel)",
      script: "تحميل كود التحليل (Python)",
    },
  };

  const bars = (rows, max, fmt) =>
    `<div class="rp-bars">${rows
      .map(([l, v]) => `<div class="rp-row"><span class="rp-label">${l}</span><div class="rp-track"><i style="width:${max ? (v / max) * 100 : 0}%"></i></div><b>${fmt(v)}</b></div>`)
      .join("")}</div>`;
  const table = (head, rows, cls = "") =>
    `<div class="rp-table-wrap"><table class="rp-table ${cls}"><thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows
      .map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join("")}</tr>`)
      .join("")}</tbody></table></div>`;

  function render() {
    const ar = document.documentElement.lang === "ar";
    const t = T[ar ? "ar" : "en"];
    const cn = (c) => (ar ? CAT_AR[c] || c : c);
    const kv = [n(k.lines), n(k.distinct), n(k.units), usd(k.value), n(k.categories)];
    const chg = (a, b) => (b / a - 1 === 0 ? "0%" : ((b / a - 1) * 100).toFixed(1).replace("-", "−") + "%");
    const A = S.all, B = S.dedup;
    const sensRows = S.thresholds.map((x) => [`${x.th}×${x.th === 20 ? (ar ? " (المعتمد)" : " (used)") : ""}`, x.over_lines, usd(x.over_value), pct(x.share)]);
    const dupRows = [
      [t.dRows[0], n(A.lines), n(B.lines), chg(A.lines, B.lines)],
      [t.dRows[1], usd(A.value), usd(B.value), chg(A.value, B.value)],
      [t.dRows[2], usd(A.over_value), usd(B.over_value), chg(A.over_value, B.over_value)],
      [t.dRows[3], n(A.zero_lines), n(B.zero_lines), chg(A.zero_lines, B.zero_lines)],
      [t.dRows[4], usd(A.disc_value), usd(B.disc_value), chg(A.disc_value, B.disc_value)],
      [t.dRows[5], pct(A.frames_share, 1), pct(B.frames_share, 1), "+" + ((B.frames_share - A.frames_share) * 100).toFixed(1) + (ar ? " نقطة" : " pts")],
    ];
    const watch = (list) =>
      table(t.watchHead, list.map((x) => [cn(x.cat), x.name, n(x.stock), n(x.reorder), usd(x.value)]));

    root.innerHTML = `
      <div class="rp-heading"><span class="rp-kicker">${ar ? "تقرير تحليلي" : "Analytics report"}</span><h2 class="rp-title">${t.title}</h2><p class="rp-sub">${t.sub}</p></div>
      <aside class="rp-callout" role="note"><h4>${t.sample}</h4><p>${t.sampleText}</p></aside>
      <div class="rp-kpis">${kv.map((v, i) => `<div class="rp-kpi"><b>${v}</b><span>${t.kpi[i]}</span></div>`).join("")}</div>
      <div class="rp-context">
        <section class="rp-card"><h4>${t.mTitle}</h4><p>${t.method}</p></section>
        <section class="rp-card"><h4>${t.qTitle}</h4><ul>${t.questions.map((x) => `<li>${x}</li>`).join("")}</ul></section>
      </div>
      <div class="rp-grid">
        <div class="rp-card"><h4>${t.c1}</h4>${bars(D.cats.map((c) => [cn(c.cat), c.value]), D.cats[0].value, (v) => usd(v))}</div>
        <div class="rp-card"><h4>${t.c2}</h4>${bars(r.cover.map((c) => [c.bin, c.lines]), Math.max(...r.cover.map((c) => c.lines)), (v) => `${v} ${t.lines}`)}<p class="rp-note">${t.c2note}</p></div>
        <div class="rp-card"><h4>${t.c3}</h4>${bars(zeroCats.map(([c, v]) => [cn(c), v]), Math.max(...zeroCats.map(([, v]) => v)), (v) => `${v} ${t.lines}`)}<p class="rp-note">${t.c3note}</p></div>
        <div class="rp-card"><h4>${t.c4}</h4>${bars(D.cats.filter((c) => c.disc).map((c) => [cn(c.cat), c.disc]), Math.max(...D.cats.map((c) => c.disc)), (v) => `${v} ${t.lines}`)}<p class="rp-note">${ds.with_stock} / ${ds.lines} ${t.lines}: ${usd(ds.value)}</p></div>
      </div>
      <div class="rp-card rp-ins"><h4>${t.ins}</h4><ul>${t.insights.map((s) => `<li>${s}</li>`).join("")}</ul></div>
      <div class="rp-card rp-table-card"><h4>${t.aTitle}</h4>${table(t.aHead, t.actions, "rp-actions-table")}</div>
      <div class="rp-grid">
        <div class="rp-card"><h4>${t.watchTitle}: ${t.watchOver}</h4>${watch(D.action.overstock)}</div>
        <div class="rp-card"><h4>${t.watchTitle}: ${t.watchDisc}</h4>${watch(D.action.disc)}</div>
      </div>
      <div class="rp-card rp-table-card"><h4>${t.sTitle}</h4>${table(t.sHead, sensRows)}<br />${table(t.dHead, dupRows)}<p class="rp-note">${t.sNote}</p></div>
      <div class="rp-card rp-table-card"><h4>${t.dqTitle}</h4>${table(t.dqHead, t.dq, "rp-quality-table")}</div>
      <div class="rp-card rp-ins"><h4>${t.limTitle}</h4><ul>${t.limits.map((s) => `<li>${s}</li>`).join("")}</ul></div>
      <p class="rp-note">${t.tools}</p>
      <p class="rp-dl"><a class="btn btn-primary" href="data/Adventure-Works-Inventory-Analysis.xlsx" download>${t.dl}</a> <a class="btn btn-secondary" href="build_data.py" download>${t.script}</a></p>`;
  }
  render();
  window.addEventListener("languagechange", render);
})();

/* ===== Sales analysis ===== */
(() => {
  const root = document.getElementById("salesProject");
  const D = window.SALES;
  if (!root || !D) return;

  const T = {
    en: {
      title: "Sales Analysis: Al Ofoq Retail",
      intro: "1,500 sales transactions over 12 months, analysed in a 15-sheet Excel workbook with a live dashboard, Pareto, customer segments, targets, forecasting and what-if scenarios.",
      tags: ["Excel", "SUMIFS / VLOOKUP", "Dashboards", "Forecasting"],
      scope: "Scope", synthetic: "Synthetic data for training and presentation", records: "records",
      kpi: ["Net revenue", "Profit", "Profit margin", "Avg completed order", "Return rate", "Annual target reached"],
      find: "Key findings", charts: "Charts", inside: "What the workbook contains",
      monthly: "Monthly revenue (SAR thousands)", cat: "Revenue by category (margin on the right)",
      pareto: "Top products and cumulative share", chan: "Revenue by channel and return rate",
      quality: "Data-quality checks", actions: "Recommendations", download: "Download Excel workbook",
      back: "← Back to Data Analysis", currency: "SAR", peak: "Peak", low: "Low",
      checks: [["Rows", "Enough for monthly trends"], ["Missing values (core columns)", "None"], ["Duplicate order IDs", "None"], ["Date range", "Continuous 12 months"]],
      inside_l: ["Dashboard with filters (region, category, channel)", "Time trend, seasonality and moving average", "Pareto (ABC) product classification", "RFM customer segments", "Targets vs actuals and sales commissions", "Regression, correlation and 3-month forecast", "What-if scenarios (price, volume, cost)", "Automated data-quality and reconciliation checks"],
      f: (x) => [
        `Net revenue reached ${x.rev} with a ${x.margin} margin.`,
        `${x.topCat} leads revenue; ${x.topReg} is the strongest region.`,
        `${x.peak} was the strongest month and ${x.low} the weakest, a ${x.ratio}x gap.`,
        `${x.a} of ${x.n} products (class A) generate about 80% of revenue.`,
        `The top 10 customers account for ${x.top10} of revenue.`,
        `Returns are ${x.ret} overall and highest online (${x.retOn}).`,
        `Discount and margin are negatively correlated (r = ${x.r}); correlation is not proof of cause, so test discount caps before applying them.`],
      acts: ["Stock up and run campaigns before the February peak; add promotions in July.", "Keep class A products first in supply and review volume-without-margin items.", "Cap discounts outside seasons and measure the profit effect.", "Reduce online returns through better descriptions, packaging and exchange policy."]
    },
    ar: {
      title: "تحليل المبيعات: شركة الأفق للتجزئة",
      intro: "1,500 عملية بيع خلال 12 شهرًا، حُلّلت في مصنف Excel من 15 ورقة يضم لوحة مؤشرات تفاعلية، وتحليل باريتو، وشرائح العملاء، والأهداف، والتنبؤ، وسيناريوهات «ماذا لو».",
      tags: ["Excel", "SUMIFS / VLOOKUP", "لوحات مؤشرات", "تنبؤ"],
      scope: "نطاق التحليل", synthetic: "بيانات وهمية لأغراض التدريب والعرض", records: "سجل",
      kpi: ["الإيراد الصافي", "الربح", "هامش الربح", "متوسط الطلب المكتمل", "معدل المرتجعات", "نسبة بلوغ الهدف السنوي"],
      find: "أبرز النتائج", charts: "المخططات", inside: "ماذا يحتوي المصنف",
      monthly: "الإيراد الشهري (بآلاف الريالات)", cat: "الإيراد حسب الفئة (الهامش على اليسار)",
      pareto: "أفضل المنتجات والحصة التراكمية", chan: "الإيراد حسب القناة ومعدل المرتجعات",
      quality: "فحوصات جودة البيانات", actions: "التوصيات", download: "تحميل ملف Excel",
      back: "← العودة إلى تحليل البيانات", currency: "ريال", peak: "الذروة", low: "القاع",
      checks: [["السجلات", "كافية لتحليل الاتجاه الشهري"], ["القيم الناقصة (الأعمدة الأساسية)", "لا يوجد"], ["أرقام طلبات مكررة", "لا يوجد"], ["الفترة", "12 شهرًا متصلة"]],
      inside_l: ["لوحة مؤشرات بفلاتر (المنطقة، الفئة، القناة)", "الاتجاه الزمني والموسمية والمتوسط المتحرك", "تصنيف المنتجات بباريتو (ABC)", "شرائح العملاء RFM", "الأهداف مقابل الفعلي وعمولات المبيعات", "الانحدار والارتباط وتنبؤ 3 أشهر", "سيناريوهات «ماذا لو» (السعر، الحجم، التكلفة)", "فحوصات آلية للجودة ومطابقة الإجماليات"],
      f: (x) => [
        `بلغ الإيراد الصافي ${x.rev} بهامش ربح ${x.margin}.`,
        `تتصدر فئة ${x.topCat} الإيراد، وتأتي المنطقة ${x.topReg} في المقدمة.`,
        `كان ${x.peak} أقوى الأشهر و${x.low} أضعفها، بفارق ${x.ratio} ضعف.`,
        `تحقق ${x.a} منتجًا من أصل ${x.n} (الفئة A) نحو 80% من الإيراد.`,
        `يمثل أكبر 10 عملاء ${x.top10} من الإيراد.`,
        `معدل المرتجعات ${x.ret} إجمالًا، وهو الأعلى في الأونلاين (${x.retOn}).`,
        `يرتبط الخصم عكسيًا بهامش الربح (r = ${x.r})؛ والارتباط لا يثبت السببية، لذا اختبر سقف الخصم قبل تطبيقه.`],
      acts: ["خزّن واطلق الحملات قبل ذروة فبراير، وأضف عروضًا في يوليو.", "أبقِ منتجات الفئة A أولوية في التوريد وراجع المنتجات ذات الحجم بلا ربحية.", "ضع سقفًا للخصم خارج المواسم وقِس أثره على الربح.", "قلّص مرتجعات الأونلاين بتحسين الوصف والتغليف وسياسة الاستبدال."]
    }
  };

  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const lineChart = (L, loc) => {
    const W = 600, H = 250, p = { l: 44, r: 12, t: 16, b: 30 };
    const m = D.monthly, max = Math.ceil(Math.max(...m.map((x) => x.rev)) / 50000) * 50000;
    const X = (i) => p.l + (i * (W - p.l - p.r)) / (m.length - 1);
    const Y = (v) => p.t + (1 - v / max) * (H - p.t - p.b);
    const mon = (s) => new Intl.DateTimeFormat(loc, { month: "short", timeZone: "UTC" }).format(new Date(s + "-01T00:00:00Z"));
    const hi = m.reduce((a, b) => (b.rev > a.rev ? b : a)), lo = m.reduce((a, b) => (b.rev < a.rev ? b : a));
    const grid = [0, 1, 2, 3, 4].map((i) => { const v = (max / 4) * i; return `<line x1="${p.l}" x2="${W - p.r}" y1="${Y(v)}" y2="${Y(v)}" class="sc-grid"/><text x="${p.l - 6}" y="${Y(v) + 4}" text-anchor="end" class="sc-t">${v / 1000}</text>`; }).join("");
    const pts = m.map((x, i) => `${X(i).toFixed(1)},${Y(x.rev).toFixed(1)}`).join(" ");
    const dots = m.map((x, i) => {
      const mark = x === hi || x === lo;
      return `<circle cx="${X(i)}" cy="${Y(x.rev)}" r="${mark ? 5 : 3}" class="${mark ? "sc-dot sc-mark" : "sc-dot"}"><title>${mon(x.m)}: ${Math.round(x.rev).toLocaleString("en-US")} ${L.currency}</title></circle>`
        + (mark ? `<text x="${X(i)}" y="${Y(x.rev) + (x === hi ? -10 : 18)}" text-anchor="middle" class="sc-t sc-b">${x === hi ? L.peak : L.low}</text>` : "")
        + `<text x="${X(i)}" y="${H - 8}" text-anchor="middle" class="sc-t">${mon(x.m)}</text>`;
    }).join("");
    return { svg: `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(L.monthly)}">${grid}<polyline points="${pts}" class="sc-line"/>${dots}</svg>`, hi: mon(hi.m), lo: mon(lo.m), ratio: (hi.rev / lo.rev).toFixed(1) };
  };

  const render = () => {
    const ar = document.documentElement.lang === "ar", L = T[ar ? "ar" : "en"], loc = ar ? "ar" : "en";
    const n = (v) => Math.round(v).toLocaleString("en-US"), money = (v) => `${n(v)} ${L.currency}`;
    const pct = (v, d = 1) => `${(v * 100).toFixed(d)}%`, nm = (x) => x.name[ar ? "ar" : "en"];
    const line = lineChart(L, loc);
    const margin = D.profit / D.revenue, top = (a) => a[0];
    const bars = (rows, extra) => { const max = Math.max(...rows.map((r) => r.rev)); return rows.map((r) => `<div class="rp-row"><span>${esc(nm(r))}</span><div class="rp-track"><i style="width:${(r.rev / max) * 100}%"></i></div><b>${money(r.rev)}${extra ? `<small>${extra(r)}</small>` : ""}</b></div>`).join(""); };
    const ret = D.returnByChannel, cum = []; let run = 0;
    D.products_top.forEach((x) => { run += x.rev; cum.push(run / D.revenue); });
    const findings = L.f({ rev: money(D.revenue), margin: pct(margin), topCat: nm(top(D.categories)), topReg: nm(top(D.regions)), peak: line.hi, low: line.lo, ratio: line.ratio, a: D.pareto_a, n: D.pareto_total, top10: pct(D.top10CustomersShare), ret: pct(D.returned / D.rows), retOn: pct(ret.Online), r: D.discountCorrelation.toFixed(2) });
    const kpis = [money(D.revenue), money(D.profit), pct(margin), money(D.revenue / D.completed), pct(D.returned / D.rows), pct(D.revenue / D.target)];
    const S = ar ? { nav: ["الملخص", "المخططات", "المصنف", "التوصيات"], sum: "الملخص", wb: "المصنف وجودة البيانات", navl: "أقسام الصفحة" } : { nav: ["Summary", "Charts", "Workbook", "Recommendations"], sum: "Summary", wb: "Workbook and data quality", navl: "Page sections" };
    const ids = ["summary", "charts", "workbook", "actions"];
    const qv = [n(D.rows), D.quality.missing, D.quality.duplicates, D.period.join(" → ")];
    root.innerHTML = `<article class="sales-report">
      <header class="sr-head"><h2>${L.title}</h2><p class="sr-intro">${L.intro}</p>
        <ul class="sr-meta"><li>${D.period[0]} → ${D.period[1]}</li><li>${n(D.rows)} ${L.records}</li><li>${D.products} ${ar ? "منتجًا" : "products"}</li><li>${D.customers} ${ar ? "عميلًا" : "customers"}</li><li class="sr-flag">${L.synthetic}</li></ul>
        <div class="project-tags">${L.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div></header>
      <nav class="sr-nav" aria-label="${S.navl}">${ids.map((id, i) => `<a href="#${id}">${S.nav[i]}</a>`).join("")}</nav>
      <section id="summary" class="sr-sec"><div class="rp-kpis">${kpis.map((v, i) => `<div class="rp-kpi"><b>${v}</b><span>${L.kpi[i]}</span></div>`).join("")}</div>
        <div class="rp-card rp-ins"><h4>${L.find}</h4><ul class="sr-findings">${findings.map((x) => `<li>${x}</li>`).join("")}</ul></div></section>
      <section id="charts" class="sr-sec"><h2>${L.charts}</h2>
        <div class="rp-card sales-chart"><h4>${L.monthly}</h4>${line.svg}</div>
        <div class="rp-grid"><div class="rp-card"><h4>${L.cat}</h4>${bars(D.categories, (r) => pct(r.profit / r.rev))}</div>
          <div class="rp-card"><h4>${L.pareto}</h4>${bars(D.products_top, (r) => pct(cum[D.products_top.indexOf(r)], 0))}</div></div>
        <div class="rp-card"><h4>${L.chan}</h4>${bars(D.channels, (r) => pct(ret[r.name.en], 1))}</div></section>
      <section id="workbook" class="sr-sec"><h2>${S.wb}</h2>
        <div class="rp-grid"><div class="rp-card"><h4>${L.inside} <small>(${D.workbook.sheets} ${ar ? "ورقة" : "sheets"} · ${D.workbook.charts} ${ar ? "مخططًا" : "charts"})</small></h4><ul class="sr-checks">${L.inside_l.map((x) => `<li>${x}</li>`).join("")}</ul></div>
          <div class="rp-card"><h4>${L.quality}</h4><dl class="sr-dl">${L.checks.map((c, i) => `<div><dt>${c[0]}</dt><dd><b>${qv[i]}</b><em>${c[1]}</em></dd></div>`).join("")}</dl></div></div></section>
      <section id="actions" class="sr-sec"><h2>${L.actions}</h2><div class="sr-actions">${L.acts.map((x) => `<p class="rp-card">${x}</p>`).join("")}</div></section>
      <div class="page-links"><a class="btn btn-primary" href="data/sales_analysis_project.xlsx" download>${L.download}</a><a class="btn btn-secondary" href="index_data.html">${L.back}</a></div>
    </article>`;
  };
  render();
  window.addEventListener("languagechange", render);
})();

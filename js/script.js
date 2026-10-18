// ============================================
// Shared helpers
// ============================================
const isArabic = () => document.documentElement.lang === "ar";

const storage = {
  get(key, fallback = null) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* private mode or blocked storage: ignore */
    }
  },
};

const MESSAGES = {
  en: {
    fill: "Please fill in all fields.",
    email: "Please enter a valid email address.",
    sending: "Sending...",
    ok: "Thank you for your message!",
    fail: "Your message was not sent. Please try again or email me directly.",
  },
  ar: {
    fill: "يرجى تعبئة جميع الحقول.",
    email: "يرجى إدخال بريد إلكتروني صحيح.",
    sending: "جارٍ الإرسال...",
    ok: "شكرًا لرسالتك!",
    fail: "لم تُرسل رسالتك. حاول مرة أخرى أو راسلني مباشرة بالبريد الإلكتروني.",
  },
};
const t = (key) => MESSAGES[isArabic() ? "ar" : "en"][key];

// ============================================
// Preloader
// ============================================
class Preloader {
  constructor() {
    this.el = document.getElementById("preloader");
    if (!this.el) return;
    const hide = () => this.el.classList.add("hide");
    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide);
    setTimeout(hide, 2500); // failsafe if "load" never fires
  }
}

// ============================================
// Theme
// ============================================
class ThemeManager {
  constructor() {
    this.toggleBtn = document.getElementById("themeToggle");
    const saved =
      storage.get("theme") ||
      (window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    this.setTheme(saved);
    this.toggleBtn?.addEventListener("click", () =>
      this.setTheme(
        document.body.classList.contains("dark-mode") ? "light" : "dark",
      ),
    );
  }
  setTheme(theme) {
    const dark = theme === "dark";
    document.body.classList.toggle("dark-mode", dark);
    this.toggleBtn?.setAttribute("aria-pressed", String(dark));
    storage.set("theme", dark ? "dark" : "light");
  }
}

// ============================================
// In-page anchor links (only for href="#...")
// ============================================
class SmoothScroll {
  constructor() {
    document
      .querySelectorAll('a[href^="#"]:not([href="#"])')
      .forEach((link) => {
        link.addEventListener("click", (e) => {
          const target = document.querySelector(link.getAttribute("href"));
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
          });
        });
      });
  }
}

// ============================================
// Notifications (bilingual, RTL-aware, announced to screen readers)
// ============================================
class Toast {
  static show(message, type = "success") {
    const el = document.createElement("div");
    el.className = `toast toast-${type}`;
    el.setAttribute("role", type === "error" ? "alert" : "status");
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => {
      el.classList.add("toast-out");
      setTimeout(() => el.remove(), 400);
    }, 3500);
  }
}

// ============================================
// Contact form
// ============================================
class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.form?.addEventListener("submit", (e) => this.onSubmit(e));
  }
  onSubmit(e) {
    e.preventDefault();
    const name = this.form.elements.name?.value.trim();
    const email = this.form.elements.email?.value.trim();
    const message = this.form.elements.message?.value.trim();
    if (!name || !email || !message) return Toast.show(t("fill"), "error");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return Toast.show(t("email"), "error");
    this.send(name, email, message);
  }
  async send(name, email, message) {
    const btn = this.form.querySelector('button[type="submit"]');
    const label = btn?.textContent;
    const data = new FormData(this.form);
    data.set("name", name);
    data.set("email", email);
    data.set("message", message);
    if (btn) {
      btn.disabled = true;
      btn.textContent = t("sending");
    }
    try {
      // FormSubmit: the plain endpoint redirects (blocked by CORS when called
      // with fetch). The /ajax/ endpoint supports CORS and replies with JSON.
      const url = this.form.action.replace(
        "formsubmit.co/",
        "formsubmit.co/ajax/",
      );
      const res = await fetch(url, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === "false")
        throw new Error(json.message || `status ${res.status}`);
      Toast.show(t("ok"), "success");
      this.form.reset();
    } catch (err) {
      console.error("Contact form failed:", err);
      Toast.show(t("fail"), "error");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = label;
      }
    }
  }
}

// ============================================
// Mobile menu
// ============================================
class MobileMenu {
  constructor() {
    this.btn = document.getElementById("menuToggle");
    this.menu = document.getElementById("navMenu");
    if (!this.btn || !this.menu) return;
    this.btn.setAttribute("aria-expanded", "false");
    this.btn.setAttribute("aria-controls", "navMenu");
    this.btn.addEventListener("click", () =>
      this.set(!this.menu.classList.contains("active")),
    );
    this.menu
      .querySelectorAll(".nav-link")
      .forEach((l) => l.addEventListener("click", () => this.set(false)));
    document.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && this.set(false),
    );
  }
  set(open) {
    this.menu.classList.toggle("active", open);
    this.btn.setAttribute("aria-expanded", String(open));
  }
}

// ============================================
// Banipal case study (projects/banipal.html):
// scroll reveal, count-up numbers, animated face-control loop.
// Everything is skipped on other pages and honours reduced motion.
// ============================================
class BanipalPage {
  constructor() {
    this.root = document.querySelector(".bn-page");
    if (!this.root) return;
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.reveal();
    this.countUp();
    this.loop();
    this.lightbox();
  }
  lightbox() {
    if (typeof HTMLDialogElement === "undefined") return;
    this.root.querySelectorAll(".bn-shot-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        const src = btn.querySelector("img");
        const dlg = document.createElement("dialog");
        dlg.className = "bn-lightbox";
        const img = document.createElement("img");
        img.src = src.currentSrc || src.src;
        img.alt = src.alt;
        const close = document.createElement("button");
        close.type = "button";
        close.textContent = "×";
        close.setAttribute("aria-label", isArabic() ? "إغلاق" : "Close");
        close.addEventListener("click", () => dlg.close());
        dlg.append(img, close);
        dlg.addEventListener("click", (e) => e.target === dlg && dlg.close());
        dlg.addEventListener("close", () => dlg.remove());
        document.body.appendChild(dlg);
        dlg.showModal();
      }),
    );
  }
  reveal() {
    const items = [...this.root.querySelectorAll(".bn-reveal")];
    if (this.reduced || !("IntersectionObserver" in window)) return;
    // stagger siblings (cards in the same grid enter one after another)
    const seen = new Map();
    items.forEach((el) => {
      const n = seen.get(el.parentNode) || 0;
      seen.set(el.parentNode, n + 1);
      el.style.setProperty("--d", `${n * 90}ms`);
    });
    document.documentElement.classList.add("bn-js");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }),
      { threshold: 0.12 },
    );
    items.forEach((el) => io.observe(el));
  }
  countUp() {
    const nums = [...this.root.querySelectorAll("[data-count]")];
    if (this.reduced || !nums.length || !("IntersectionObserver" in window))
      return;
    const run = (el) => {
      const end = parseInt(el.dataset.count, 10);
      const t0 = performance.now();
      const dur = 1300;
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      el.textContent = "0";
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          run(e.target);
          io.unobserve(e.target);
        }),
      { threshold: 0.6 },
    );
    nums.forEach((el) => io.observe(el));
  }
  loop() {
    const flow = this.root.querySelector(".bn-flow");
    if (!flow) return;
    const nodes = [...flow.querySelectorAll(".ring-n")];
    const steps = [...flow.querySelectorAll(".bn-steps li")];
    if (!nodes.length) return;
    let cur = 0;
    let timer = null;
    const set = (i) => {
      cur = i;
      nodes.forEach((n, k) => n.classList.toggle("on", k === i));
      steps.forEach((s, k) => s.classList.toggle("on", k === i));
    };
    const stop = () => {
      clearInterval(timer);
      timer = null;
    };
    const start = () => {
      if (this.reduced || timer) return;
      timer = setInterval(() => set((cur + 1) % nodes.length), 1800);
    };
    steps.forEach((s) => s.setAttribute("tabindex", "0"));
    [...nodes, ...steps].forEach((el, k) => {
      const i = k % nodes.length;
      const pick = () => {
        stop();
        set(i);
      };
      el.addEventListener("mouseenter", pick);
      el.addEventListener("focus", pick);
      el.addEventListener("click", pick);
      el.addEventListener("mouseleave", start);
      el.addEventListener("blur", start);
    });
    set(0);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
        threshold: 0.3,
      }).observe(flow);
    } else {
      start();
    }
  }
}

// ============================================
// 3D screenshot gallery (projects/hasibati.html)
// Coverflow carousel: arrows, drag/swipe, keyboard, thumbnails, lightbox.
// ============================================
function openLightbox(src, alt) {
  if (typeof HTMLDialogElement === "undefined") return;
  const dlg = document.createElement("dialog");
  dlg.className = "bn-lightbox";
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "";
  const close = document.createElement("button");
  close.type = "button";
  close.textContent = "×";
  close.setAttribute("aria-label", isArabic() ? "إغلاق" : "Close");
  close.addEventListener("click", () => dlg.close());
  dlg.append(img, close);
  dlg.addEventListener("click", (e) => e.target === dlg && dlg.close());
  dlg.addEventListener("close", () => dlg.remove());
  document.body.appendChild(dlg);
  dlg.showModal();
}

class Gallery3D {
  constructor(root) {
    this.root = root;
    this.stage = root.querySelector(".hs-stage");
    this.slides = [...root.querySelectorAll(".hs-slide")];
    this.n = this.slides.length;
    if (!this.stage || this.n < 2) return;
    this.cur = 0;
    this.ar = 1.6; // image aspect ratio, updated once the first image loads
    this.sw = 0;
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.info = root.querySelector(".hs-info");
    this.title = root.querySelector(".hs-title");
    this.desc = root.querySelector(".hs-desc");
    this.count = root.querySelector(".hs-count");
    this.prev = root.querySelector(".hs-prev");
    this.next = root.querySelector(".hs-next");
    this.zoomBtn = root.querySelector(".hs-zoom");
    this.thumbs = root.querySelector(".hs-thumbs");
    this.slides.forEach((s) => this.fallback(s.querySelector("img")));
    this.buildThumbs();
    this.bind();
    root.classList.add("is-ready");
    this.watchAspect();
    this.measure();
    this.labels();
  }
  // If the images are in <site>/images/screenshots instead of projects/images/screenshots
  fallback(img) {
    img.addEventListener("error", () => {
      if (img.dataset.fb) return;
      img.dataset.fb = "1";
      img.src = "../" + img.getAttribute("src");
    });
  }
  buildThumbs() {
    this.thumbBtns = this.slides.map((s, i) => {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button";
      b.className = "hs-thumb";
      const im = document.createElement("img");
      im.src = s.querySelector("img").getAttribute("src");
      im.alt = "";
      im.loading = "lazy";
      im.decoding = "async";
      this.fallback(im);
      b.appendChild(im);
      b.addEventListener("click", () => this.go(i));
      li.appendChild(b);
      this.thumbs.appendChild(li);
      return b;
    });
  }
  watchAspect() {
    const img = this.slides[0].querySelector("img");
    const upd = () => {
      if (!img.naturalWidth) return;
      this.ar = img.naturalWidth / img.naturalHeight;
      this.measure();
    };
    img.addEventListener("load", upd);
    if (img.complete) upd();
  }
  bind() {
    this.prev.addEventListener("click", () => this.go(this.cur - 1));
    this.next.addEventListener("click", () => this.go(this.cur + 1));
    this.zoomBtn.addEventListener("click", () => this.zoom());
    window.addEventListener("resize", () => this.measure());
    window.addEventListener("languagechange", () => this.labels());
    this.stage.addEventListener("keydown", (e) => {
      const act = {
        ArrowLeft: () => this.go(this.cur - 1),
        ArrowRight: () => this.go(this.cur + 1),
        Home: () => this.go(0),
        End: () => this.go(this.n - 1),
        Enter: () => this.zoom(),
        " ": () => this.zoom(),
      }[e.key];
      if (!act) return;
      e.preventDefault();
      act();
    });
    // drag / swipe, tap on a side image to bring it forward, tap on the centre one to enlarge
    let down = false;
    let sx = 0;
    let sy = 0;
    this.stage.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      down = true;
      sx = e.clientX;
      sy = e.clientY;
    });
    this.stage.addEventListener("pointerup", (e) => {
      if (!down) return;
      down = false;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        this.go(this.cur + (dx < 0 ? 1 : -1));
        return;
      }
      if (Math.hypot(dx, dy) > 8) return;
      const s = e.target.closest(".hs-slide");
      if (!s) return;
      const i = this.slides.indexOf(s);
      if (i === this.cur) this.zoom();
      else this.go(i);
    });
    this.stage.addEventListener("pointercancel", () => (down = false));
    // mouse tilt on the centre image
    this.stage.addEventListener("pointermove", (e) => {
      if (this.reduced || e.pointerType !== "mouse") return;
      const r = this.stage.getBoundingClientRect();
      this.stage.style.setProperty(
        "--tx",
        (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3),
      );
      this.stage.style.setProperty(
        "--ty",
        (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3),
      );
    });
    this.stage.addEventListener("pointerleave", () => {
      down = false;
      this.stage.style.setProperty("--tx", "0");
      this.stage.style.setProperty("--ty", "0");
    });
  }
  labels() {
    const ar = isArabic();
    this.prev.setAttribute(
      "aria-label",
      ar ? "اللقطة السابقة" : "Previous screenshot",
    );
    this.next.setAttribute(
      "aria-label",
      ar ? "اللقطة التالية" : "Next screenshot",
    );
    this.stage.setAttribute(
      "aria-label",
      ar ? "لقطات من التطبيق" : "App screenshots",
    );
    this.slides.forEach((s, i) => {
      const t = s
        .querySelector(`strong .${ar ? "ar-only" : "en-only"}`)
        .textContent.trim();
      s.querySelector("img").alt = t;
      this.thumbBtns[i].setAttribute("aria-label", t);
    });
  }
  measure() {
    const w = this.stage.clientWidth;
    if (!w) return;
    this.sw = Math.min(w * (w < 640 ? 0.72 : 0.56), 700);
    this.stage.style.setProperty("--sw", this.sw + "px");
    this.stage.style.height = Math.round(this.sw / this.ar + 72) + "px";
    this.render(false);
  }
  go(i) {
    this.cur = ((i % this.n) + this.n) % this.n;
    this.render(true);
  }
  zoom() {
    const img = this.slides[this.cur].querySelector("img");
    openLightbox(img.currentSrc || img.src, img.alt);
  }
  render(animateInfo) {
    const { n, sw } = this;
    this.slides.forEach((s, i) => {
      let o = i - this.cur;
      if (o > n / 2) o -= n;
      if (o < -n / 2) o += n;
      const a = Math.abs(o);
      const sgn = Math.sign(o);
      s.style.setProperty(
        "--x",
        (a ? sgn * sw * (0.8 + (a - 1) * 0.26) : 0) + "px",
      );
      s.style.setProperty("--z", (a ? -(70 + a * 70) : 0) + "px");
      s.style.setProperty("--r", (a ? -sgn * 48 : 0) + "deg");
      s.style.setProperty("--k", a === 0 ? 1 : 0);
      s.style.zIndex = 10 - a;
      s.style.opacity = a > 2 ? 0 : a === 2 ? 0.55 : 1;
      s.classList.toggle("is-active", a === 0);
      s.classList.toggle("is-far", a > 2);
      s.setAttribute("aria-hidden", a === 0 ? "false" : "true");
    });
    const cap = this.slides[this.cur].querySelector("figcaption");
    this.title.innerHTML = cap.querySelector("strong").innerHTML;
    this.desc.innerHTML = cap.querySelector(".hs-d").innerHTML;
    const pad = (v) => String(v).padStart(2, "0");
    this.count.textContent = `${pad(this.cur + 1)} / ${pad(n)}`;
    this.thumbBtns.forEach((b, i) =>
      b.setAttribute("aria-current", String(i === this.cur)),
    );
    const t = this.thumbBtns[this.cur];
    if (this.thumbs.scrollWidth > this.thumbs.clientWidth) {
      this.thumbs.scrollTo({
        left: t.offsetLeft - (this.thumbs.clientWidth - t.offsetWidth) / 2,
        behavior: this.reduced ? "auto" : "smooth",
      });
    }
    if (animateInfo && !this.reduced) {
      this.info.classList.remove("fade");
      void this.info.offsetWidth;
      this.info.classList.add("fade");
    }
  }
}

// Stagger the CSS entrance animation immediately (the old observer set the
// delay only after the animation had already started, so it had no effect).
function applyAnimationDelays() {
  document.querySelectorAll("[data-aos-delay]").forEach((el) => {
    el.style.animationDelay = `${parseInt(el.dataset.aosDelay, 10) || 0}ms`;
  });
}

const init = () => {
  applyAnimationDelays();
  new Preloader();
  new ThemeManager();
  new SmoothScroll();
  new ContactForm();
  new MobileMenu();
  new BanipalPage();
  document.querySelectorAll(".hs-gallery").forEach((g) => new Gallery3D(g));
};
if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", init);
else init();

// ============================================
// Writing page tabs
// ============================================
// Tabs for writing.html (#articles / #books / #presentations).
// Without JS all panels stay visible.
(() => {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  if (!tabs.length) return;
  const ids = tabs.map((t) => t.dataset.tab);
  const KEY = "writing-tab";
  // Old/alternative hashes -> real tab ids (keeps old links working).
  const ALIASES = { presentation: "presentations", pres: "presentations" };
  const resolve = (id) => {
    id = ALIASES[id] || id;
    return ids.includes(id) ? id : null;
  };
  const read = () => {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  };
  const save = (v) => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* storage blocked */
    }
  };
  // Keep the number on each tab in sync with the cards actually in its panel,
  // and show a friendly note when a panel has none yet.
  tabs.forEach((tab) => {
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    if (!panel) return;
    const n = panel.querySelectorAll(".article-card, .book-showcase").length;
    const count = tab.querySelector(".tab-count");
    if (count) count.textContent = String(n);
    const empty = panel.querySelector(".pres-empty");
    if (empty) empty.hidden = n > 0;
  });
  function show(id, { focus = false, updateHash = true } = {}) {
    id = resolve(id) || ids[0];
    tabs.forEach((tab) => {
      const on = tab.dataset.tab === id;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
      if (on && focus) tab.focus();
    });
    save(id);
    if (updateHash && location.hash !== "#" + id)
      history.replaceState(null, "", "#" + id);
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => show(tab.dataset.tab));
    tab.addEventListener("keydown", (e) => {
      const last = tabs.length - 1;
      const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: last }[
        e.key
      ];
      if (next === undefined) return;
      e.preventDefault();
      show(ids[(next + tabs.length) % tabs.length], { focus: true });
    });
  });
  // Ignore unrelated hashes (e.g. the "skip to content" link -> #main),
  // otherwise they would reset the page to the first tab.
  window.addEventListener("hashchange", () => {
    const id = resolve(location.hash.slice(1));
    if (id) show(id, { updateHash: false });
  });
  const fromHash = resolve(location.hash.slice(1));
  show(fromHash || read(), { updateHash: Boolean(fromHash) });
})();

// ============================================
// Certificates (index.html)
// ============================================
(() => {
  const grid = document.getElementById("certGrid");
  if (!grid) return;
  const $ = (id) => document.getElementById(id);
  const toggle = $("certToggle"),
    filters = $("certFilters");
  const CATS = {
    ai: ["AI & Machine Learning", "الذكاء الاصطناعي وتعلّم الآلة"],
    web: ["Web & Programming", "الويب والبرمجة"],
    lead: ["Leadership & Management", "القيادة وإدارة المشاريع"],
    office: ["Design & Office Skills", "التصميم ومهارات المكتب"],
  };
  const DS = "DeepLearning.AI & Stanford Online",
    UM = "University of Michigan",
    ABS = "AI Business School";
  // Order matters: the first 3-4 are the default view, so web, Python, ML and Agile (closest to the target role) come first.
  // [title, file, issuer (en), issuer (ar, optional), category, date]
  const C = [
    [
      "HTML, CSS and Javascript for Web Developers",
      "HTML,%20CSS%20and%20Javascript%20for%20Web%20Developers",
      "Johns Hopkins University",
      "",
      "web",
      "2026-06-19",
    ],
    [
      "Python Data Structures",
      "Python%20Data%20Structures",
      UM,
      "",
      "web",
      "2026-07-23",
    ],
    [
      "Supervised Machine Learning: Regression and Classification",
      "Supervised Machine Learning",
      DS,
      "",
      "ai",
      "2026-07-28",
    ],
    [
      "Agile Project Management",
      "Agile%20Project%20Management",
      "Edraak",
      "إدراك",
      "lead",
      "2026-03-14",
    ],
    [
      "Unsupervised Learning, Recommenders, Reinforcement Learning",
      "Unsupervised Learning, Recommenders, Reinforcement Learning",
      DS,
      "",
      "ai",
      "2026-08-01",
    ],
    [
      "Programming for Everybody: Getting Started with Python",
      "Programming%20for%20Everybody_%20Getting%20Started%20with%20Python",
      UM,
      "",
      "web",
      "2026-05-06",
    ],
    [
      "Mathematics for Machine Learning",
      "Mathematics%20for%20Machine%20Learning",
      "Imperial College London",
      "",
      "ai",
      "2026-07-24",
    ],
    [
      "AI For Everyone",
      "AI%20For%20Everyone",
      "DeepLearning.AI",
      "",
      "ai",
      "2026-07-19",
    ],
    [
      "Leadership Skills",
      "Leadership%20Skills",
      "IIM Ahmedabad",
      "",
      "lead",
      "2026-06-28",
    ],
    [
      "AI agents and creator tools for HR professionals",
      "AI%20agents%20and%20creator%20tools%20for%20HR%20professionals",
      ABS,
      "",
      "ai",
      "2026-07-08",
    ],
    ["Graphic Design", "Graphic%20Design", "Adobe", "", "office", "2026-07-12"],
    [
      "ICDL",
      "ICDL",
      "Institut European Cooperation Development",
      "",
      "office",
      "2026-03-14",
    ],
  ];
  const T = {
    en: {
      all: "All",
      view: "View certificate",
      more: "Show all certificates",
      less: "Show fewer",
      n: "certificates",
      tr: "tracks",
    },
    ar: {
      all: "الكل",
      view: "عرض الشهادة",
      more: "عرض كل الشهادات",
      less: "عرض أقل",
      n: "شهادة",
      tr: "مسارات",
    },
  };
  const limit = () => (matchMedia("(max-width: 700px)").matches ? 3 : 4);
  let cat = "all",
    open = false;
  const render = () => {
    const ar = document.documentElement.lang === "ar",
      t = T[ar ? "ar" : "en"],
      li = ar ? 1 : 0;
    const fmt = (iso, o) =>
      new Intl.DateTimeFormat(ar ? "ar-u-nu-latn" : "en-GB", {
        timeZone: "UTC",
        ...o,
      }).format(new Date(iso));
    filters.innerHTML = [
      ["all", t.all, C.length],
      ...Object.entries(CATS).map(([k, v]) => [
        k,
        v[li],
        C.filter((c) => c[4] === k).length,
      ]),
    ]
      .map(
        ([k, l, n]) =>
          `<button type="button" class="hx-filter" data-cat="${k}" aria-pressed="${k === cat}">${l} (${n})</button>`,
      )
      .join("");
    const list = C.filter((c) => cat === "all" || c[4] === cat);
    const shown = cat === "all" && !open ? list.slice(0, limit()) : list;
    grid.innerHTML = shown
      .map(
        ([title, file, iss, issAr, k, d]) =>
          `<article class="hx-cert" data-cat="${k}"><small>${CATS[k][li]}</small><h3>${title}</h3><p>${ar && issAr ? issAr : iss}</p><footer><time datetime="${d}">${fmt(d, { day: "numeric", month: "short", year: "numeric" })}</time><a href="certificates/${file}.pdf" target="_blank" rel="noopener" aria-label="${t.view}: ${title}">${t.view} ↗</a></footer></article>`,
      )
      .join("");
    const canToggle = cat === "all" && list.length > limit();
    toggle.hidden = !canToggle;
    filters.hidden = cat === "all" && !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? t.less : `${t.more} (${C.length})`;
  };
  filters.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    cat = b.dataset.cat;
    render();
  });
  toggle.addEventListener("click", () => {
    open = !open;
    render();
    if (!open) $("certifications").scrollIntoView();
  });
  render();
  window.addEventListener("languagechange", render);
  matchMedia("(max-width: 700px)").addEventListener("change", render);
})();

// ============================================
// Teaching plan popup (index.html)
// ============================================
// Course-plan popup (index.html, #teaching). The plan itself lives in PLAN: [ar, en] pairs.
(() => {
  const dlg = document.getElementById("planDialog");
  const open = document.getElementById("planOpen");
  const close = document.getElementById("planClose");
  const body = document.getElementById("planBody");
  if (!dlg || !open || !body) return;
  if (typeof dlg.showModal !== "function") {
    open.hidden = true; // very old browsers: no <dialog>
    return;
  }
  const PLAN = [
    {
      t: ["نظام التشغيل Windows", "Windows operating system"],
      i: [
        [
          "سطح المكتب (الأيقونات، خلفية سطح المكتب، شاشة التوقف)",
          "Desktop (icons, wallpaper, screen saver)",
        ],
        ["قائمة ابدأ وشريط المهام", "Start menu and taskbar"],
        [
          "الملفات والمجلدات (إنشاء، إعادة تسمية، نسخ، قص، لصق، حذف، إنشاء اختصار)",
          "Files and folders (create, rename, copy, cut, paste, delete, create a shortcut)",
        ],
        [
          "لوحة التحكم (التاريخ والوقت، سهولة الوصول، إعدادات الطاقة، الصوت، معلومات النظام)",
          "Control Panel (date and time, accessibility, power settings, sound, system information)",
        ],
        [
          "إدارة الطباعة (تثبيت طابعة، الطابعة الافتراضية، تفضيلات الطباعة)",
          "Printing (install a printer, default printer, printing preferences)",
        ],
        [
          "إدارة المهام (فكرة بسيطة، التعامل مع تطبيق لا يستجيب)",
          "Task management (the basics, handling an app that is not responding)",
        ],
        ["اختصارات لوحة المفاتيح", "Keyboard shortcuts"],
        ["امتدادات الملفات الشائعة", "Common file extensions"],
      ],
    },
    {
      t: ["معالجة النصوص Word", "Word processing (Word)"],
      i: [
        [
          "التعريف بالبرنامج وأهداف تعلمه والمصادر المطلوبة",
          "Definition, objectives and required resources",
        ],
        [
          "واجهة البرنامج واختصارات لوحة المفاتيح",
          "The interface and keyboard shortcuts",
        ],
        ["قائمة ملف وخيارات الحفظ", "The File menu and save options"],
        [
          "الصفحة الرئيسية: الحافظة (نسخ، قص، لصق، نسخ التنسيق)، الخط، الفقرات، الأنماط، البحث والاستبدال",
          "Home: clipboard (copy, cut, paste, format painter), font, paragraphs, styles, find and replace",
        ],
        [
          "إدراج: الصفحات وفاصل الصفحات، الجدول، الصورة والشكل والمخطط ولقطة الشاشة، التعليق، الرأس والتذييل ورقم الصفحة، الارتباط التشعبي، مربع النص",
          "Insert: pages and page breaks, tables, pictures, shapes, charts and screenshots, comments, header, footer and page numbers, hyperlinks, text boxes",
        ],
        [
          "تصميم: الحدود والخلفية الملونة والعلامة المائية",
          "Design: borders, page color and watermark",
        ],
        [
          "تخطيط الصفحة: الهوامش واتجاه الصفحة والتباعد والمسافة البادئة",
          "Layout: margins, orientation, spacing and indentation",
        ],
        [
          "مراجع: جدول المحتويات وإضافة مرجع",
          "References: table of contents and adding a citation",
        ],
        ["مراجعة: التدقيق الإملائي", "Review: spell check"],
        [
          "عرض: أنواع الصفحات والمسطرة والتكبير",
          "View: page views, ruler and zoom",
        ],
        ["تجهيز الملف للطباعة", "Preparing the file for printing"],
      ],
    },
    {
      t: ["العروض التقديمية PowerPoint", "Presentations (PowerPoint)"],
      i: [
        [
          "التعريف بالبرنامج وأهداف تعلمه وواجهته",
          "Definition, objectives and the interface",
        ],
        ["تخطيط الشريحة وإدراج الشرائح", "Slide layout and inserting slides"],
        ["الشريحة الرئيسية", "The slide master"],
        [
          "إدراج عناصر (صورة، جدول...) وصوت وفيديو وتعليق",
          "Inserting elements (picture, table and more), audio, video and comments",
        ],
        ["تصميم الشريحة", "Slide design"],
        ["الانتقالات بين الشرائح", "Transitions between slides"],
        ["الحركات لمحتوى الشرائح", "Animations for slide content"],
        [
          "إضافة مؤثرات صوتية لتقدّم العرض",
          "Adding sound effects as the show progresses",
        ],
        ["عرض الشرائح وتسجيل العرض", "Running and recording the slide show"],
        ["طباعة العرض", "Printing the presentation"],
      ],
    },
    {
      t: ["الجداول الإلكترونية Excel", "Spreadsheets (Excel)"],
      i: [
        [
          "ما هو Excel، وما الجداول الإلكترونية والغاية منها",
          "What Excel is, what spreadsheets are and what they are for",
        ],
        ["واجهة البرنامج", "The interface"],
        ["تنسيق الجدول والخلايا", "Formatting the table and cells"],
        ["التعبئة التلقائية", "AutoFill"],
        [
          "فرز البيانات حسب متغير أو أكثر، والفلترة",
          "Sorting by one or more variables, and filtering",
        ],
        [
          "اتجاه الجدول وتجميد الألواح ودمج الخلايا",
          "Sheet direction, freezing panes and merging cells",
        ],
        ["البحث والاستبدال", "Find and replace"],
        [
          "العمليات الحسابية الأربع وأولوية العمليات",
          "The four arithmetic operations and order of operations",
        ],
        [
          "التوابع: DATE, SUM, AVERAGE, MIN, MAX, COUNT, COUNTIF, COUNTA, SUMIF, IF, والشرط المركّب",
          "Functions: DATE, SUM, AVERAGE, MIN, MAX, COUNT, COUNTIF, COUNTA, SUMIF, IF and nested IF",
        ],
        ["التنسيق الشرطي للخلايا", "Conditional formatting"],
        [
          "رسم المخططات البيانية (دائري، أعمدة...)",
          "Drawing charts (pie, bar and more)",
        ],
        ["تجهيز الملف للطباعة", "Preparing the file for printing"],
      ],
    },
  ];
  const SRC = [
    "المصدر: قسم المتطلبات، الجامعة العربية الدولية (AIU).",
    "Source: Requirements Department, Arab International University (AIU).",
  ];
  const both = ([ar, en]) =>
    `<span class="ar-only">${ar}</span><span class="en-only">${en}</span>`;
  body.innerHTML =
    PLAN.map(
      (u, i) =>
        `<section class="plan-unit"><h4><b>${i + 1}</b>${both(u.t)}</h4><ul>${u.i.map((x) => `<li>${both(x)}</li>`).join("")}</ul></section>`,
    ).join("") + `<p class="plan-src">${both(SRC)}</p>`;
  const label = () =>
    document.documentElement.lang === "ar" ? "إغلاق" : "Close";
  open.addEventListener("click", () => {
    close.setAttribute("aria-label", label());
    dlg.showModal();
    document.body.classList.add("modal-open");
    body.scrollTop = 0;
  });
  close.addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => e.target === dlg && dlg.close());
  dlg.addEventListener("close", () =>
    document.body.classList.remove("modal-open"),
  );
})();

// ============================================
// Home: live counts for writing, copy-email button
// ============================================
(() => {
  const counts = document.querySelectorAll("[data-wd-count]");
  if (counts.length && location.protocol !== "file:") {
    fetch("writing.html")
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((t) => {
        const d = new DOMParser().parseFromString(t, "text/html");
        const c = {
          articles: d.querySelectorAll("#articlesGrid .article-card").length,
          books: d.querySelectorAll(".book-showcase").length,
          presentations: d.querySelectorAll("#presentationsGrid .article-card")
            .length,
        };
        counts.forEach((el) => {
          const n = c[el.dataset.wdCount];
          if (n) el.textContent = n;
        });
      })
      .catch(() => {});
  }
  const copy = document.getElementById("copyMail");
  if (copy)
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("rawanabusittah@gmail.com");
        Toast.show(isArabic() ? "تم نسخ البريد الإلكتروني" : "Email copied");
      } catch {
        Toast.show(isArabic() ? "تعذّر النسخ" : "Copy failed", "error");
      }
    });
})();

// ============================================
// Home: "More experience" toggle
// ============================================
(() => {
  const btn = document.getElementById("expToggle");
  const box = document.getElementById("expMore");
  if (!btn || !box) return;
  btn.addEventListener("click", () => {
    const open = box.hidden;
    box.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    btn.querySelector(".exp-t-more").hidden = open;
    btn.querySelector(".exp-t-less").hidden = !open;
  });
})();

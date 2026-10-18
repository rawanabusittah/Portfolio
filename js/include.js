(() => {
  const me = document.currentScript;
  const root = me.dataset.root || ""; // "" في الجذر، "../" في المجلدات الفرعية
  const base = ["js/script.js?v=20261018-1", "js/i18n.js?v=15"];
  const extra = (me.dataset.scripts || "").split(/\s+/).filter(Boolean);

  // الترويسة والتذييل معرّفان هنا فقط (لا ملفات header.html / footer.html).
  // تعديلهما هنا يظهر في كل الصفحات، وتعمل الصفحات أيضًا عند فتحها مباشرة بدون خادم.
  const HEADER = `<nav class="navbar" id="navbar" data-chrome="2" aria-label="Main">
  <div class="nav-container">
    <a href="index.html" class="logo">
      <img src="images/programming.png" alt="" class="logo-icon" width="40" height="40" />
      <span class="logo-text">Rawan</span>
    </a>
    <button class="menu-toggle" id="menuToggle" type="button" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle menu"><span></span><span></span><span></span></button>
    <ul class="nav-menu" id="navMenu">
      <li><a href="projects/websites.html" class="nav-link" data-nav="projects" data-i18n="nav.proj">Web Applications</a></li>
      <li><a href="writing.html" class="nav-link" data-nav="writing" data-i18n="nav.writing">Writing</a></li>
      <li><a href="data-analysis/index_data.html" class="nav-link" data-nav="data" data-i18n="nav.data">Data Analytics</a></li>
      <li><a href="index.html#skills" class="nav-link" data-nav="skills" data-i18n="nav.skills">Skills</a></li>
      <li><a href="index.html#experience" class="nav-link" data-nav="experience" data-i18n="nav.exp">Experience</a></li>
    </ul>
    <div class="nav-actions">
      <button class="lang-toggle" id="langToggle" type="button" aria-label="Switch language">العربية</button>
      <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle theme">
        <svg class="moon-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"></path></svg>
        <svg class="sun-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
      </button>
    </div>
  </div>
</nav>`;

  const FOOTER = `<footer class="footer footer-slim footer-rich">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="footer-logo">Rawan Abu Sittah</a>
        <p class="footer-tag">
          <span class="ar-only">مهندسة حاسوب ومطوّرة Full Stack، متاحة لفرص Mid Full-Stack.</span><span class="en-only">Computer engineer and full-stack developer, open to Mid Full-Stack roles.</span>
        </p>
      </div>
      <nav class="footer-nav" aria-label="Footer">
        <b class="footer-h"><span class="ar-only">تصفّح</span><span class="en-only">Explore</span></b>
        <ul>
          <li><a href="projects/websites.html"><span class="ar-only">تطبيقات الويب</span><span class="en-only">Web applications</span></a></li>
          <li><a href="writing.html"><span class="ar-only">كتاباتي</span><span class="en-only">Writing</span></a></li>
          <li><a href="data-analysis/index_data.html"><span class="ar-only">تحليل البيانات</span><span class="en-only">Data analysis</span></a></li>
          <li><a href="cv/Rawan_Omar_Abu_Sittah_CV.pdf" target="_blank" rel="noopener"><span class="ar-only">السيرة الذاتية (PDF)</span><span class="en-only">CV (PDF)</span></a></li>
        </ul>
      </nav>
      <div class="footer-ext">
        <b class="footer-h"><span class="ar-only">تواصل</span><span class="en-only">Connect</span></b>
        <ul>
          <li><a href="mailto:rawanabusittah@gmail.com"><span class="ar-only">البريد الإلكتروني</span><span class="en-only">Email</span></a></li>
          <li><a href="https://www.linkedin.com/in/rawan-abu-sittah" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://github.com/rawanabusittah" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://t.me/+rOYFmC822kllYWE0" target="_blank" rel="noopener noreferrer"><span class="ar-only">قناة تلغرام التعليمية</span><span class="en-only">Telegram learning channel</span></a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">
        <span class="ar-only">&copy; 2026 روان أبو ستة · صُمم بـ <span class="heart">♥</span></span><span class="en-only">&copy; 2026 Rawan Abu Sittah · Crafted with <span class="heart">♥</span></span>
      </p>
      <a class="footer-top" href="#main"><span class="ar-only">↑ للأعلى</span><span class="en-only">↑ Top</span></a>
    </div>
  </div>
</footer>`;

  const p = location.pathname;
  const key = /(^|\/)data-analysis\//.test(p)
    ? "data"
    : /(^|\/)projects\//.test(p)
      ? "projects"
      : /(^|\/)(articles|books)\/|writing\.html/.test(p)
        ? "writing"
        : "";

  const mount = (id, html) => {
    const host = document.getElementById(id);
    if (!host) return;
    const t = document.createElement("template");
    t.innerHTML = html;
    // اجعل المسارات نسبية لمكان الصفحة الحالية
    t.content.querySelectorAll("[href],[src]").forEach((el) =>
      ["href", "src"].forEach((a) => {
        const u = el.getAttribute(a);
        if (u && !/^(#|[a-z]+:|\/\/)/i.test(u)) el.setAttribute(a, root + u);
      }),
    );
    // الرابط النشط
    t.content.querySelectorAll(`[data-nav="${key}"]`).forEach((a) => {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    });
    host.replaceWith(t.content);
  };

  const loadScripts = () => {
    [...base, ...extra].forEach((src) => {
      const s = document.createElement("script");
      s.src = root + src;
      s.async = false; // يحافظ على الترتيب
      document.body.appendChild(s);
    });
    // مزامنة aria-expanded للقائمة
    const m = document.getElementById("navMenu"),
      b = document.getElementById("menuToggle");
    if (m && b && window.MutationObserver)
      new MutationObserver(() =>
        b.setAttribute(
          "aria-expanded",
          m.classList.contains("active") ? "true" : "false",
        ),
      ).observe(m, { attributes: true, attributeFilter: ["class"] });
  };

  mount("site-header", HEADER);
  mount("site-footer", FOOTER);
  loadScripts();
})();

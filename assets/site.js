// Measured on the Android 15 emulator, tap to screen on a hosted Next.js app (see /docs#benchmarks).
const RACE = { cold: 3461, warm: 853 };

(function () {
  // ---- hero race: bars fill in real time ----
  const race = document.querySelector(".race");
  if (race) {
    const rows = [
      { el: race.querySelector(".race-cold"), ms: RACE.cold },
      { el: race.querySelector(".race-warm"), ms: RACE.warm },
    ];
    const max = RACE.cold;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const draw = (elapsed) => {
      let running = false;
      rows.forEach(({ el, ms }) => {
        const t = Math.min(elapsed, ms);
        const bar = el.querySelector(".race-bar");
        const out = el.querySelector(".race-ms");
        const pct = (t / max) * 100;
        bar.style.width = pct + "%";
        out.textContent = Math.round(t) + " ms";
        const outside = pct < 24;
        out.classList.toggle("outside", outside);
        out.style.left = outside ? `calc(${pct}% + 12px)` : "auto";
        out.style.right = outside ? "auto" : `calc(${100 - pct}% + 14px)`;
        if (t < ms) running = true;
      });
      return running;
    };

    const run = () => {
      cancelAnimationFrame(raf);
      if (reduce) { draw(max); return; }
      const start = performance.now();
      const tick = (now) => { if (draw(now - start)) raf = requestAnimationFrame(tick); };
      draw(0);
      raf = requestAnimationFrame(tick);
    };

    const replay = race.querySelector("[data-replay]");
    if (replay) replay.addEventListener("click", run);

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { io.disconnect(); setTimeout(run, 400); }
      }, { threshold: 0.4 });
      io.observe(race);
    } else run();
  }

  // ---- code tabs ----
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const tabs = group.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on);
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    }));
  });

  // ---- tiny syntax highlighter for Kotlin / Swift / Groovy snippets ----
  const KW = /\b(function|const|window|val|var|fun|class|object|override|import|private|internal|return|if|else|when|let|func|struct|final|guard|self|init|true|false|null|nil|data|interface|enum|public|static|try|await|async|for|in|implementation|dependencies|android)\b/g;
  document.querySelectorAll("pre code[data-lang]").forEach((code) => {
    const esc = code.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const out = esc.split("\n").map((line) => {
      const ci = line.search(/\/\/|(^|\s)#\s/);
      let src = ci >= 0 ? line.slice(0, ci) : line;
      const com = ci >= 0 ? line.slice(ci) : "";
      const strs = [];
      src = src.replace(/"[^"]*"/g, (m) => { strs.push(m); return `\u0000${strs.length - 1}\u0000`; });
      src = src.replace(KW, '<span class="c-k">$1</span>')
               .replace(/\b([A-Z][A-Za-z0-9]+)\b/g, '<span class="c-t">$1</span>')
               .replace(/\u0000(\d+)\u0000/g, (_, i) => `<span class="c-s">${strs[i]}</span>`);
      return src + (com ? `<span class="c-c">${com}</span>` : "");
    });
    code.innerHTML = out.join("\n");
  });

  // ---- docs: mobile toggle + active section ----
  const nav = document.querySelector(".docs-nav");
  const toggle = document.querySelector(".docs-toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", false); } });
  }
  if (nav && "IntersectionObserver" in window) {
    const links = new Map([...nav.querySelectorAll("a[href^='#']")].map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.remove("active"));
        links.get(e.target.id)?.classList.add("active");
      });
    }, { rootMargin: "-80px 0px -70% 0px" });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }
})();

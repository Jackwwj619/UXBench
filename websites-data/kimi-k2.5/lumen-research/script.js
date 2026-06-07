(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toast ----------
  const toast = $("#toast");
  let toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  // ---------- citation highlighting ----------
  function bindCitations() {
    $$(".cite").forEach((c) => {
      if (c.dataset.bound) return;
      c.dataset.bound = "1";
      const activate = () => {
        const id = c.dataset.cite;
        $$(".src.highlight").forEach((s) => s.classList.remove("highlight"));
        const src = $(`.src[data-cite="${id}"]`);
        if (src) {
          src.classList.add("highlight");
          src.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      };
      c.addEventListener("mouseenter", activate);
      c.addEventListener("focus", activate);
      c.addEventListener("mouseleave", () => {
        $$(".src.highlight").forEach((s) => s.classList.remove("highlight"));
      });
      c.addEventListener("blur", () => {
        $$(".src.highlight").forEach((s) => s.classList.remove("highlight"));
      });
      c.addEventListener("click", (e) => {
        e.preventDefault();
        const id = c.dataset.cite;
        const src = $(`.src[data-cite="${id}"]`);
        if (src) {
          $$(".src.highlight").forEach((s) => s.classList.remove("highlight"));
          src.classList.add("highlight");
          src.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => src.classList.remove("highlight"), 1800);
        }
      });
    });
  }
  bindCitations();

  $$(".src").forEach((s) => {
    s.addEventListener("mouseenter", () => {
      const id = s.dataset.cite;
      $$(`.cite[data-cite="${id}"]`).forEach((c) => c.classList.add("highlight"));
    });
    s.addEventListener("mouseleave", () => {
      $$(".cite").forEach((c) => c.classList.remove("highlight"));
    });
  });

  // ---------- composer ----------
  const ta = $("#prompt");
  const composer = $("#composer");
  const convo = $("#conversation");
  function autosize() {
    ta.style.height = "auto";
    ta.style.height = Math.min(200, ta.scrollHeight) + "px";
  }
  ta.addEventListener("input", autosize);
  ta.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      composer.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }
  });

  function appendMsg(role, html) {
    const article = document.createElement("article");
    article.className = "msg " + role;
    if (role === "assistant") {
      article.innerHTML = `<div class="avatar a">L</div><div class="bubble">${html}</div>`;
    } else {
      article.innerHTML = `<div class="bubble">${html}</div>`;
    }
    convo.appendChild(article);
    article.scrollIntoView({ behavior: "smooth", block: "end" });
    bindCitations();
  }

  function showThinking() {
    const article = document.createElement("article");
    article.className = "msg assistant thinking";
    article.innerHTML = `<div class="avatar a">L</div><div class="bubble"><p class="thinking-dots"><span></span><span></span><span></span></p></div>`;
    convo.appendChild(article);
    article.scrollIntoView({ behavior: "smooth", block: "end" });
    return article;
  }

  function submitPrompt(value) {
    if (!value) return;
    appendMsg("user", `<p>${value.replace(/</g, "&lt;")}</p>`);
    const t = showThinking();
    setTimeout(() => {
      t.remove();
      appendMsg("assistant", `
        <p><em>Thinking out loud while I assemble sources…</em></p>
        <p>Here's a first pass. The most directly relevant body of work is the chronotype × intervention literature; I'll prioritize that and bring in a couple of negative results to keep the picture honest.</p>
        <p>I added 3 new sources to the panel on the right. Want me to dig into any of them in particular?</p>`);
    }, 700);
  }

  composer.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = ta.value.trim();
    if (!value) return;
    submitPrompt(value);
    ta.value = "";
    autosize();
  });

  // suggestion chips — submit directly so user sees a response
  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const q = chip.dataset.q || chip.textContent;
      ta.value = q;
      autosize();
      submitPrompt(q);
      ta.value = "";
      autosize();
    });
  });

  // tabs
  $$(".src-tabs .tab").forEach((t) => {
    t.addEventListener("click", () => {
      $$(".src-tabs .tab").forEach((x) => {
        x.classList.remove("active");
        x.setAttribute("aria-selected", "false");
      });
      t.classList.add("active");
      t.setAttribute("aria-selected", "true");
      showToast(`Filtered: ${t.textContent.trim()}`);
    });
  });

  // ---------- thread switching ----------
  const THREADS = {
    "deep-work": {
      title: "Deep work scheduling literature",
      keep: true,
    },
    "ev-battery": {
      title: "EV battery recycling policy in Norway",
      messages: [
        { role: "user", html: `<p>What's the current Norwegian regulatory framework for EV battery recycling, and how does it compare to the EU Battery Regulation 2023?</p>` },
        { role: "assistant", html: `<p>Norway operates under the EU Battery Regulation (EU 2023/1542) via its EEA membership, with a few national additions. Three things to know:</p>
        <ul>
          <li><strong>Producer-responsibility scheme.</strong> Importers must register with Miljødirektoratet and join an approved take-back scheme (Batteriretur or Renas). Collection target: 70% of mass placed on market.</li>
          <li><strong>Recycled-content thresholds.</strong> 16% Co, 6% Li, 6% Ni minimum recycled content for new EV batteries by 2031, rising thereafter.</li>
          <li><strong>Battery passport.</strong> Mandatory from Feb 2027 — Norway is piloting digital-passport interoperability with three OEMs.</li>
        </ul>
        <p>Want me to focus on the recycled-content audit pathway, or on the second-life regulations?</p>` }
      ],
      sources: [
        { fav: "M", color: "#0a4d6e", title: "EU Battery Regulation 2023/1542 — implementation in EEA states", meta: "EUR-Lex · 2023 · European Commission", rel: 0.94 },
        { fav: "B", color: "#7d2f55", title: "Battery passport pilot results — Norway, 2024–2025", meta: "Miljødirektoratet · 2025 · Solberg & Vik", rel: 0.86 },
        { fav: "R", color: "#2f8a52", title: "Recycled-content compliance pathways for Li-ion EV cells", meta: "J. Industrial Ecology · 2024 · Lindqvist", rel: 0.78 },
      ],
    },
    "seal-flu": {
      title: "Trace prevalence of seal influenza H10N7",
      messages: [
        { role: "user", html: `<p>I'm trying to nail down the prevalence of H10N7 in North Sea harbour seal populations between 2014 and 2023. What's the best evidence?</p>` },
        { role: "assistant", html: `<p>Two outbreak waves dominate the record (2014 and 2021). Between waves, baseline seroprevalence in surveyed harbour seals stays under 4%, but with high regional variance.</p>
        <ol>
          <li><strong>2014 outbreak (Bodewes et al.):</strong> ~10% of stranded seals on the Dutch/German coast tested H10N7-positive by RT-PCR; mortality estimated at &gt;2,000 animals.</li>
          <li><strong>Inter-wave surveys (2016–2020):</strong> Seroprevalence dropped to 1.5–3.8% across Wadden Sea sites.</li>
          <li><strong>2021 resurgence:</strong> Limited Danish data showed a ~6% positivity bump but no mass mortality.</li>
        </ol>
        <p>Heads up: the 2014 sampling was strongly biased toward stranded animals, so true population prevalence is likely lower than reported. Want me to surface the live-capture studies?</p>` }
      ],
      sources: [
        { fav: "P", color: "#5e3aa6", title: "Avian influenza A H10N7 in harbour seals — 2014 European outbreak", meta: "Emerg Infect Dis · 2015 · Bodewes et al.", rel: 0.93 },
        { fav: "W", color: "#1a5e8b", title: "Inter-wave serosurveillance in Wadden Sea pinnipeds", meta: "Vet. Microbiology · 2021 · Krog et al.", rel: 0.81 },
        { fav: "D", color: "#c97c2d", title: "2021 H10N7 resurgence — Danish coastal monitoring", meta: "DTU Aqua report · 2022 · Hansen", rel: 0.74 },
      ],
    },
    "grad-stipends": {
      title: "Comparative grad-school stipends in CS",
      messages: [
        { role: "user", html: `<p>Give me a comparative read on CS PhD stipends in 2024 — US vs. UK vs. EU.</p>` },
        { role: "assistant", html: `<p>Headline numbers (12-month, post-tax-equivalent, USD):</p>
        <ul>
          <li><strong>US R1 (top-25 CS):</strong> $38–48k base, with TA-ship; bay-area programs offer $52–60k via industry partnerships.</li>
          <li><strong>UK (UKRI standard):</strong> £19,237 (~$24.4k) tax-free; London weighting +£2k.</li>
          <li><strong>ETH/EPFL (Switzerland):</strong> CHF 50–60k after social charges (~$56–67k) — outliers, more like junior employment than stipends.</li>
          <li><strong>Germany (TV-L 13, 75%):</strong> ~€35k gross; ~€25k post-tax.</li>
        </ul>
        <p>Caveat: cost-of-living adjustments matter more than headline. Want me to fold in COL multipliers from Numbeo or Mercer?</p>` }
      ],
      sources: [
        { fav: "C", color: "#1a5e8b", title: "CRA Taulbee Survey 2024 — graduate stipends and admissions", meta: "Computing Research Assoc · 2024", rel: 0.9 },
        { fav: "U", color: "#7d2f55", title: "UKRI minimum doctoral stipend levels 2024–25", meta: "UKRI · 2024", rel: 0.83 },
        { fav: "T", color: "#2f8a52", title: "TV-L 13 pay scales for academic staff in Germany", meta: "Öffentlicher Dienst · 2024", rel: 0.7 },
      ],
    },
    "rooftop": {
      title: "Microclimate effects of urban rooftop gardens",
      messages: [
        { role: "user", html: `<p>What's the consensus on how much rooftop gardens actually cool the immediate microclimate in dense urban cores?</p>` },
        { role: "assistant", html: `<p>Effect sizes are real but smaller than green-roof advocacy material suggests, and very design-dependent.</p>
        <ul>
          <li><strong>Surface temperature reduction:</strong> 12–25 °C below bare-membrane roofs in summer (broad consensus).</li>
          <li><strong>Air temperature at street level:</strong> 0.3–1.1 °C reduction within 50 m, only when ≥40% of contiguous rooftop area is greened (Sing &amp; Mancini, 2022).</li>
          <li><strong>UHI mitigation per district:</strong> Modeled at 0.6 °C average for "20% green-roof coverage" scenarios — within margin of measurement noise in many studies.</li>
        </ul>
        <p>The honest summary: significant building-scale energy savings, modest neighborhood cooling, very modest city-wide effect.</p>` }
      ],
      sources: [
        { fav: "S", color: "#2f8a52", title: "Urban green roofs and microclimate — a meta-analysis", meta: "Urban Climate · 2022 · Sing & Mancini", rel: 0.89 },
        { fav: "B", color: "#0a4d6e", title: "Building-scale thermal benefits of extensive green roofs", meta: "Build Environ · 2020 · Akhtar et al.", rel: 0.77 },
      ],
    },
    "shoreline": {
      title: "Late-Holocene shoreline shifts, NW Europe",
      messages: [
        { role: "user", html: `<p>What's the cleanest reconstruction of NW European shoreline shifts during the late Holocene?</p>` },
        { role: "assistant", html: `<p>Two complementary records: Behre's tide-gauge / archaeo-shoreline synthesis for the southern North Sea, and the Shennan team's GIA-corrected sea-level index points for the British Isles. Together they put net relative change between 1000 BCE and 1850 CE at +1.4 to +2.1 m for the Wadden Sea, with significant local variability driven by isostatic uplift in Scotland and subsidence in the southern bight.</p>` }
      ],
      sources: [
        { fav: "B", color: "#8b6a1f", title: "Late Holocene sea-level changes on the southern North Sea coast", meta: "Boreas · 2007 · Behre", rel: 0.88 },
        { fav: "S", color: "#1a5e8b", title: "Sea-level index points and GIA modelling for the British Isles", meta: "Quaternary Science Reviews · 2018 · Shennan et al.", rel: 0.85 },
      ],
    },
    "ringing": {
      title: "Why does ringing happen in step responses",
      messages: [
        { role: "user", html: `<p>Explain why a step input causes ringing in a second-order system.</p>` },
        { role: "assistant", html: `<p>Ringing happens when the system is underdamped (damping ratio ζ &lt; 1). A step contains energy across all frequencies; the system's complex-conjugate poles produce a decaying sinusoid at the damped natural frequency ω_d = ω_n·√(1−ζ²). Practical fix: increase damping, lower bandwidth, or add a notch at ω_d.</p>` }
      ],
      sources: [
        { fav: "F", color: "#3a8bd2", title: "Feedback Control of Dynamic Systems — Ch. 3 step response", meta: "Pearson · 2019 · Franklin et al.", rel: 0.86 },
      ],
    },
    "oss-funding": {
      title: "Survey: open-source funding models 2024",
      messages: [
        { role: "user", html: `<p>Give me the lay of the land on OSS funding models as of 2024.</p>` },
        { role: "assistant", html: `<p>Five funding patterns dominate: foundation grants (Apache, Linux Foundation), corporate sponsorship via SaaS (e.g. dual-license companies), GitHub Sponsors / Open Collective for individuals, public-money programs (NLnet, Sovereign Tech Fund), and consultancy-backed development. The fastest-growing slice in 2023–2024 was government / sovereign tech funding.</p>` }
      ],
      sources: [
        { fav: "G", color: "#2f8a52", title: "GitHub Octoverse 2024 — sustaining open source", meta: "GitHub · 2024", rel: 0.79 },
        { fav: "S", color: "#0a4d6e", title: "Sovereign Tech Fund 2024 annual report", meta: "STF · 2024", rel: 0.81 },
      ],
    },
    "caffeine": {
      title: "Caffeine half-life in slow metabolizers",
      messages: [
        { role: "user", html: `<p>How much longer is caffeine's half-life in CYP1A2 slow metabolizers?</p>` },
        { role: "assistant", html: `<p>Population mean half-life is ~5 hours; CYP1A2 *1F slow-metabolizer homozygotes average 8–9.5 hours, with the highest reported individual estimates near 12 hours. Smoking is a strong inducer and partly masks the genotype effect.</p>` }
      ],
      sources: [
        { fav: "C", color: "#5e3aa6", title: "CYP1A2 polymorphisms and caffeine pharmacokinetics", meta: "Clin Pharmacol · 2017 · Cornelis et al.", rel: 0.9 },
      ],
    },
    "wildfire": {
      title: "Building codes vs wildfire defensible space",
      messages: [
        { role: "user", html: `<p>What does the evidence say — building codes or defensible-space requirements — when only one can be enforced?</p>` },
        { role: "assistant", html: `<p>Defensible-space requirements have a larger marginal effect on home-survival probability than ignition-resistant building codes alone (Cohen's IBHS work, 2019; Syphard 2017). But the two interact strongly: codes without cleared zones underperform; cleared zones without ember-resistant vents still leak fires through attics.</p>` }
      ],
      sources: [
        { fav: "I", color: "#c97c2d", title: "Home survival in wildfire — IBHS field assessments", meta: "IBHS · 2019 · Cohen et al.", rel: 0.92 },
        { fav: "S", color: "#7d2f55", title: "Defensible space and building characteristics in WUI fires", meta: "Int J Wildland Fire · 2017 · Syphard et al.", rel: 0.84 },
      ],
    },
  };

  function renderSources(list) {
    const ul = $("#src-list");
    if (!ul) return;
    ul.innerHTML = "";
    list.forEach((s, i) => {
      const id = i + 1;
      const li = document.createElement("li");
      li.className = "src";
      li.id = `src-${id}`;
      li.dataset.cite = id;
      li.tabIndex = 0;
      const pct = Math.round((s.rel || 0.7) * 100);
      li.innerHTML = `
        <div class="src-top">
          <div class="src-fav" style="background:${s.color}">${s.fav}</div>
          <div>
            <div class="src-title">${s.title}</div>
            <div class="src-meta">${s.meta}</div>
          </div>
          <div class="rel"><span class="bar"><span style="width:${pct}%"></span></span><span class="rel-num">${(s.rel || 0.7).toFixed(2)}</span></div>
        </div>
      `;
      ul.appendChild(li);
    });
    const count = $("#src-count");
    if (count) count.textContent = String(list.length);
  }

  function loadThread(key, opts = {}) {
    const t = THREADS[key];
    if (!t) return;
    $("#thread-title").textContent = t.title;
    if (t.keep) {
      // baseline thread — don't replace conversation/sources
      return;
    }
    convo.innerHTML = "";
    (t.messages || []).forEach((m) => appendMsg(m.role, m.html));
    if (t.sources) renderSources(t.sources);
    showToast(`Loaded "${t.title}"`);
  }

  $$(".thread").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      $$(".thread").forEach((x) => x.classList.remove("active"));
      a.classList.add("active");
      const key = a.dataset.thread;
      if (key) loadThread(key);
    });
  });

  // ---------- new thread ----------
  $("#new-thread-btn").addEventListener("click", () => {
    const id = "new-" + Date.now();
    const title = "New thread";
    const link = document.createElement("a");
    link.href = "#";
    link.className = "thread active";
    link.dataset.thread = id;
    link.textContent = title;
    const threads = $("#threads");
    // insert under the first section header (Today)
    const todaySection = threads.querySelector(".thread-section");
    if (todaySection && todaySection.nextSibling) {
      threads.insertBefore(link, todaySection.nextSibling);
    } else {
      threads.appendChild(link);
    }
    $$(".thread").forEach((x) => { if (x !== link) x.classList.remove("active"); });
    THREADS[id] = {
      title,
      messages: [
        { role: "assistant", html: `<p>New thread started — what would you like to research? You can paste a paper, ask a question, or pick a follow-up below.</p>` },
      ],
      sources: [],
    };
    loadThread(id);
    link.addEventListener("click", (e) => {
      e.preventDefault();
      $$(".thread").forEach((x) => x.classList.remove("active"));
      link.classList.add("active");
      loadThread(id);
    });
    ta.focus();
  });

  // ---------- export PDF ----------
  $("#export-pdf-btn").addEventListener("click", () => {
    showToast("Preparing PDF export…");
    setTimeout(() => {
      showToast("PDF ready — opening print dialog");
      try { window.print(); } catch (e) { /* noop */ }
    }, 600);
  });

  // ---------- share ----------
  const shareBtn = $("#share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const url = window.location.href.split("#")[0] + "#" + ($("#thread-title")?.textContent || "");
      try {
        if (navigator.clipboard) navigator.clipboard.writeText(url);
      } catch (e) { /* noop */ }
      showToast("Share link copied to clipboard");
    });
  }
})();

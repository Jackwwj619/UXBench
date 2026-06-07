(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toast ----------
  const toastEl = $("#toast");
  let toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
  }

  // ---------- citation highlighting ----------
  function bindCitation(c) {
    c.addEventListener("mouseenter", () => {
      const id = c.dataset.cite;
      const src = $(`.src[data-cite="${id}"]`);
      if (src) src.classList.add("highlight");
    });
    c.addEventListener("mouseleave", () => {
      $$(".src.highlight").forEach((s) => s.classList.remove("highlight"));
    });
    c.addEventListener("click", (e) => {
      e.preventDefault();
      const id = c.dataset.cite;
      const src = $(`.src[data-cite="${id}"]`);
      if (!src) return;
      // re-trigger flash animation
      src.classList.remove("highlight");
      void src.offsetWidth;
      src.classList.add("highlight");
      src.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => src.classList.remove("highlight"), 1800);
    });
  }
  $$(".cite").forEach(bindCitation);

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
  const sendBtn = $("#sendBtn");
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

  function appendMsg(role, html, opts = {}) {
    const article = document.createElement("article");
    article.className = "msg " + role + (opts.cls ? " " + opts.cls : "");
    if (role === "assistant") {
      article.innerHTML = `<div class="avatar a">L</div><div class="bubble">${html}</div>`;
    } else {
      article.innerHTML = `<div class="bubble">${html}</div>`;
    }
    convo.appendChild(article);
    article.scrollIntoView({ behavior: "smooth", block: "end" });
    // bind any new citation chips
    $$(".cite", article).forEach(bindCitation);
    return article;
  }

  let pendingTimer = null;
  composer.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = ta.value.trim();
    if (!value) {
      toast("Type a question first.");
      ta.focus();
      return;
    }
    // immediately echo user turn
    const userMsg = appendMsg("user", `<p>${value.replace(/</g, "&lt;")}</p>`, { cls: "pending" });

    // disable + loading state
    sendBtn.disabled = true;
    sendBtn.classList.add("loading");
    const originalLabel = sendBtn.textContent;
    sendBtn.textContent = "Asking…";
    convo.setAttribute("aria-busy", "true");

    // status line
    const status = document.createElement("div");
    status.className = "status-line";
    status.id = "statusLine";
    status.innerHTML = `<span class="dot"></span>Searching sources…`;
    convo.appendChild(status);
    status.scrollIntoView({ behavior: "smooth", block: "end" });

    ta.value = ""; autosize();

    clearTimeout(pendingTimer);
    pendingTimer = setTimeout(() => {
      userMsg.classList.remove("pending");
      status.remove();
      sendBtn.disabled = false;
      sendBtn.classList.remove("loading");
      sendBtn.textContent = originalLabel;
      convo.setAttribute("aria-busy", "false");

      appendMsg(
        "assistant",
        `<p><em>Thinking out loud while I assemble sources…</em></p>
         <p>Here's a first pass. The most directly relevant body of work is the chronotype × intervention literature; I'll prioritize that and bring in a couple of negative results to keep the picture honest.</p>
         <p>I added 3 new sources to the panel on the right. Want me to dig into any of them in particular?</p>`
      );
      toast("Reply ready");
    }, 1200);
  });

  // suggestion chips
  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      ta.value = chip.dataset.q;
      autosize();
      ta.focus();
    });
  });

  // ---------- thread switching (mock content per thread) ----------
  const THREADS = {
    "deep-work": {
      title: "Deep work scheduling literature",
      keep: true,
    },
    "ev-battery": {
      title: "EV battery recycling policy in Norway",
      summary:
        "Norway routes ~97% of end-of-life EV traction batteries through Hydrovolt (Hydro/Northvolt JV). Policy hooks are EPR via the Pollution Control Act + EU Battery Regulation passporting from 2027.",
    },
    "seal-flu": {
      title: "Trace prevalence of seal influenza H10N7",
      summary:
        "H10N7 outbreaks in harbor seals (2014 N. Sea, 2020 Baltic) show ~3–8% seroprevalence in surveyed colonies. Spillover to humans documented but limited.",
    },
    "grad-stipends": {
      title: "Comparative grad-school stipends in CS",
      summary:
        "2024 PhD CS stipends: median US R1 ~$36k, top private ~$50k, ETH/Switzerland ~$78k pre-tax, UK Russell Group ~£19.2k. COL-adjusted, Zurich and Austin lead.",
    },
    "rooftop": {
      title: "Microclimate effects of urban rooftop gardens",
      summary:
        "Extensive green roofs lower roof-surface temps 15–25°C in summer; ambient cooling at street level is small (<0.5°C) but evapotranspiration measurably reduces UHI in dense clusters.",
    },
    "shoreline": {
      title: "Late-Holocene shoreline shifts, NW Europe",
      summary:
        "Post-2 ka transgression in Doggerland margins: 0.6–1.4 m relative sea-level rise + glacio-isostatic rebound asymmetry (S. North Sea subsiding, Scandinavia rising).",
    },
    "ringing": {
      title: "Why does ringing happen in step responses",
      summary:
        "Ringing arises when a system has lightly damped poles (ζ < 1) near the imaginary axis. The step response of an underdamped 2nd-order system contains a decaying sinusoid at ω_d = ω_n√(1−ζ²).",
    },
    "oss-funding": {
      title: "Survey: open-source funding models 2024",
      summary:
        "Tidelift/GitHub Sponsors/OpenCollective dominate retail; foundations (Linux, Apache, CNCF) handle critical infra. ~62% of maintainers report no compensation in the 2024 SOSS survey.",
    },
    "caffeine": {
      title: "Caffeine half-life in slow metabolizers",
      summary:
        "CYP1A2*1F homozygotes ('slow') show t½ ≈ 7.5–9.5 h vs. ~4–5 h in 'fast' phenotype. Clinically relevant for sleep-onset latency after afternoon dosing.",
    },
    "wildfire": {
      title: "Building codes vs wildfire defensible space",
      summary:
        "California Chapter 7A + PRC 4291 mandate Zone 0 (0–5 ft) ember-resistant landscaping. Insurer studies (IBHS 2023) find Zone 0 compliance reduces structure loss ~40%.",
    },
  };

  const threadList = $("#threadList");
  const threadTitle = $("#threadTitle");
  let currentThread = "deep-work";

  function renderThread(key) {
    const t = THREADS[key];
    if (!t) return;
    if (key === currentThread) return;
    currentThread = key;

    // active state
    $$(".thread", threadList).forEach((el) => {
      const isActive = el.dataset.thread === key;
      el.classList.toggle("active", isActive);
      if (isActive) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    });

    // header + canvas
    threadTitle.textContent = t.title;
    document.title = `Lumen Research — ${t.title}`;

    // brief loading state
    convo.setAttribute("aria-busy", "true");
    convo.innerHTML = `<div class="status-line"><span class="dot"></span>Loading thread…</div>`;

    setTimeout(() => {
      convo.setAttribute("aria-busy", "false");
      if (t.keep) {
        // restore original primary thread (re-render is too noisy; just reload page state)
        location.hash = "#" + key;
        window.location.reload();
        return;
      }
      // simple summary view for other threads (stays on this page)
      convo.innerHTML = "";
      appendMsg(
        "user",
        `<p>Open thread: <strong>${t.title.replace(/</g, "&lt;")}</strong></p>`
      );
      appendMsg(
        "assistant",
        `<p><strong>${t.title.replace(/</g, "&lt;")}</strong></p>
         <p>${t.summary.replace(/</g, "&lt;")}</p>
         <p class="cite-hint">This is a short demo summary. Use the composer below to ask a follow-up.</p>`
      );
      // refresh sources status to reflect "new thread" pretense
      const status = $("#srcStatus");
      if (status) status.textContent = "Sources refreshed for this thread";
      toast(`Switched to "${t.title}"`);
      // close mobile rail if open
      closeRail();
    }, 350);
  }

  $$(".thread", threadList).forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      renderThread(el.dataset.thread);
    });
  });

  // ---------- new thread ----------
  $("#newThread").addEventListener("click", () => {
    if (currentThread !== "deep-work" || convo.children.length > 1) {
      const ok = confirm("Start a new blank thread? Your current conversation stays in the list.");
      if (!ok) return;
    }
    // de-select rail items
    $$(".thread", threadList).forEach((el) => {
      el.classList.remove("active");
      el.removeAttribute("aria-current");
    });
    currentThread = "__new__";
    threadTitle.textContent = "New thread";
    document.title = "Lumen Research — New thread";
    convo.innerHTML = `
      <article class="msg assistant">
        <div class="avatar a">L</div>
        <div class="bubble">
          <p>Empty thread. What would you like to research?</p>
          <p class="cite-hint">Try a research question, paste a paper title, or pick a suggested follow-up below.</p>
        </div>
      </article>`;
    ta.focus();
    toast("New blank thread created");
    closeRail();
  });

  // ---------- source filter tabs ----------
  const srcList = $("#srcList");
  const srcStatus = $("#srcStatus");
  const srcCount = $("#srcCount");
  const TYPE_LABEL = { all: "all", paper: "papers", book: "books", web: "web sources", preprint: "preprints" };

  function applyFilter(filter) {
    const items = $$(".src", srcList);
    let shown = 0;
    items.forEach((li) => {
      const match = filter === "all" || li.dataset.type === filter;
      li.classList.toggle("hidden", !match);
      if (match) shown++;
    });
    srcCount.textContent = shown;
    const label = TYPE_LABEL[filter] || filter;
    if (filter === "all") {
      srcStatus.textContent = `Showing all ${shown} sources`;
    } else {
      srcStatus.textContent = `Showing ${shown} ${label}`;
    }
  }

  $$(".src-tabs .tab").forEach((t) => {
    t.addEventListener("click", () => {
      $$(".src-tabs .tab").forEach((x) => {
        x.classList.remove("active");
        x.setAttribute("aria-selected", "false");
      });
      t.classList.add("active");
      t.setAttribute("aria-selected", "true");
      applyFilter(t.dataset.filter);
    });
  });

  // ---------- source sort ----------
  const srcSort = $("#srcSort");
  srcSort.addEventListener("change", () => {
    const mode = srcSort.value;
    const items = $$(".src", srcList);
    const sorted = items.slice().sort((a, b) => {
      if (mode === "date") return Number(b.dataset.date) - Number(a.dataset.date);
      if (mode === "cited") return Number(a.dataset.cite) - Number(b.dataset.cite);
      return Number(b.dataset.rel) - Number(a.dataset.rel);
    });
    sorted.forEach((el) => srcList.appendChild(el));
    const labelMap = { relevance: "by relevance", date: "by date", cited: "by citation order" };
    toast(`Sources sorted ${labelMap[mode] || mode}`);
  });

  // ---------- header actions ----------
  function makeModal({ title, body, html, primary, primaryLabel = "OK", secondaryLabel = "Close" }) {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-label="${title}">
        <h3>${title}</h3>
        ${body ? `<p>${body}</p>` : ""}
        ${html || ""}
        <div class="modal-actions">
          <button type="button" class="secondary">${secondaryLabel}</button>
          ${primary ? `<button type="button" class="primary">${primaryLabel}</button>` : ""}
        </div>
      </div>`;
    document.body.appendChild(backdrop);
    requestAnimationFrame(() => backdrop.classList.add("show"));
    function close() {
      backdrop.classList.remove("show");
      setTimeout(() => backdrop.remove(), 200);
    }
    backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(); });
    backdrop.querySelector(".secondary").addEventListener("click", close);
    if (primary) {
      backdrop.querySelector(".primary").addEventListener("click", () => {
        primary(backdrop);
        close();
      });
    }
    document.addEventListener("keydown", function esc(e) {
      if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); }
    });
    return backdrop;
  }

  $("#shareBtn").addEventListener("click", () => {
    const url = `${location.origin}${location.pathname}#${currentThread}`;
    makeModal({
      title: "Share thread",
      body: "Anyone with this link can view a read-only copy of the conversation.",
      html: `<div class="modal-row">
              <input type="text" id="shareUrl" readonly value="${url}" aria-label="Shareable link" />
            </div>`,
      primary: (root) => {
        const input = root.querySelector("#shareUrl");
        input.select();
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(input.value);
          } else {
            document.execCommand("copy");
          }
          toast("Link copied to clipboard");
        } catch (err) {
          toast("Copy failed — select and copy manually");
        }
      },
      primaryLabel: "Copy link",
      secondaryLabel: "Close",
    });
  });

  $("#exportBtn").addEventListener("click", () => {
    const btn = $("#exportBtn");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Preparing PDF…";
    toast("Preparing PDF…");
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = original;
      toast("PDF ready — opening print dialog");
      try { window.print(); } catch (_) {}
    }, 900);
  });

  // ---------- mobile rail toggle ----------
  const railToggle = $("#railToggle");
  const rail = $("#rail");
  let railBackdrop = null;
  function ensureBackdrop() {
    if (!railBackdrop) {
      railBackdrop = document.createElement("div");
      railBackdrop.className = "rail-backdrop";
      railBackdrop.addEventListener("click", closeRail);
      document.body.appendChild(railBackdrop);
    }
    return railBackdrop;
  }
  function openRail() {
    rail.classList.add("open");
    ensureBackdrop().classList.add("show");
    railToggle.setAttribute("aria-expanded", "true");
  }
  function closeRail() {
    rail.classList.remove("open");
    if (railBackdrop) railBackdrop.classList.remove("show");
    railToggle.setAttribute("aria-expanded", "false");
  }
  railToggle.addEventListener("click", () => {
    if (rail.classList.contains("open")) closeRail(); else openRail();
  });

  // ---------- conversation mode select ----------
  $("#convoMode").addEventListener("change", (e) => {
    toast(`${e.target.value}`);
  });
  $("#depth").addEventListener("change", (e) => {
    toast(`Depth: ${e.target.value}`);
  });

  // initialize source counts
  applyFilter("all");
})();

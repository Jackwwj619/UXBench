(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toast ----------
  const toastHost = $("#toastHost");
  function toast(message) {
    if (!toastHost) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    toastHost.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 250);
    }, 2200);
  }

  // ---------- citation highlighting ----------
  $$(".cite").forEach((c) => {
    c.addEventListener("mouseenter", () => {
      const id = c.dataset.cite;
      const src = $(`.src[data-cite="${id}"]`);
      if (src) {
        src.classList.add("highlight");
        src.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
    c.addEventListener("mouseleave", () => {
      $$(".src.highlight").forEach((s) => s.classList.remove("highlight"));
    });
    c.addEventListener("click", (e) => {
      e.preventDefault();
      const id = c.dataset.cite;
      const src = $(`.src[data-cite="${id}"]`);
      if (src) src.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
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
  const sendBtn = composer.querySelector(".send");
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
    return article;
  }

  composer.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = ta.value.trim();
    if (!value) {
      toast("Type a question first.");
      ta.focus();
      return;
    }
    appendMsg("user", `<p>${value.replace(/</g, "&lt;")}</p>`);
    ta.value = ""; autosize();

    sendBtn.disabled = true;
    sendBtn.classList.add("loading");
    const oldLabel = sendBtn.textContent;
    sendBtn.textContent = "Thinking…";

    const thinking = appendMsg("assistant", `<p><em>Thinking out loud while I assemble sources…</em></p>`);
    setTimeout(() => {
      thinking.remove();
      appendMsg("assistant", `
        <p>Here's a first pass. The most directly relevant body of work is the chronotype × intervention literature; I'll prioritize that and bring in a couple of negative results to keep the picture honest.</p>
        <p>I added 3 new sources to the panel on the right. Want me to dig into any of them in particular?</p>`);
      sendBtn.disabled = false;
      sendBtn.classList.remove("loading");
      sendBtn.textContent = oldLabel;
    }, 700);
  });

  // suggestion chips
  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      ta.value = chip.dataset.q;
      autosize();
      ta.focus();
      toast("Loaded suggestion — press Ask to send.");
    });
  });

  // ---------- source-type tabs (filter list) ----------
  $$(".src-tabs .tab").forEach((t) => {
    t.addEventListener("click", () => {
      $$(".src-tabs .tab").forEach((x) => {
        x.classList.remove("active");
        x.setAttribute("aria-selected", "false");
      });
      t.classList.add("active");
      t.setAttribute("aria-selected", "true");
      const filter = t.dataset.filter || "all";
      let visible = 0;
      $$(".src-list .src").forEach((s) => {
        const match = filter === "all" || s.dataset.type === filter;
        s.style.display = match ? "" : "none";
        if (match) visible++;
      });
      const count = $(".src-count");
      if (count) count.textContent = String(visible);
    });
  });

  // ---------- thread switching (left rail) ----------
  const threadTitle = $("#threadTitle");
  const threadDescriptions = {
    "deep-work": "Deep work scheduling literature",
    "ev-battery": "EV battery recycling policy in Norway",
    "seal-flu": "Trace prevalence of seal influenza H10N7",
    "grad-stipends": "Comparative grad-school stipends in CS",
    "rooftop": "Microclimate effects of urban rooftop gardens",
    "shoreline": "Late-Holocene shoreline shifts, NW Europe",
    "ringing": "Why does ringing happen in step responses",
    "oss-funding": "Survey: open-source funding models 2024",
    "caffeine": "Caffeine half-life in slow metabolizers",
    "wildfire": "Building codes vs wildfire defensible space",
  };
  // remember the original conversation HTML for the deep-work thread
  const originalConvoHTML = convo.innerHTML;

  function switchThread(link) {
    $$(".thread").forEach((x) => {
      x.classList.remove("active");
      x.removeAttribute("aria-current");
    });
    link.classList.add("active");
    link.setAttribute("aria-current", "page");

    const key = link.dataset.thread;
    const title = threadDescriptions[key] || link.textContent.trim();
    if (threadTitle) threadTitle.textContent = title;
    document.title = `${title} — Lumen Research`;

    if (key === "deep-work") {
      convo.innerHTML = originalConvoHTML;
    } else {
      convo.innerHTML = `
        <article class="msg assistant">
          <div class="avatar a">L</div>
          <div class="bubble">
            <p><strong>${title}</strong></p>
            <p>This thread doesn't have a saved conversation yet in the local demo. Ask a question below to start exploring this topic.</p>
          </div>
        </article>`;
    }
    closeMobilePanels();
    convo.scrollTop = 0;
  }

  $$(".thread").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      switchThread(link);
    });
  });

  // ---------- header actions ----------
  const shareBtn = $("#shareBtn");
  const exportBtn = $("#exportBtn");
  const newThreadBtn = $("#newThread");
  const attachBtn = $("#attachBtn");
  const modeSelect = $("#modeSelect");
  const sortSelect = $("#sortSelect");
  const depthSelect = $("#depth");

  if (shareBtn) shareBtn.addEventListener("click", async () => {
    const url = location.href;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        toast("Share link copied to clipboard.");
      } else {
        toast("Share link ready: " + url);
      }
    } catch {
      toast("Share link ready: " + url);
    }
  });

  if (exportBtn) exportBtn.addEventListener("click", () => {
    toast("Preparing PDF export… (demo)");
    exportBtn.disabled = true;
    setTimeout(() => {
      exportBtn.disabled = false;
      toast("Export ready (demo).");
    }, 900);
  });

  if (newThreadBtn) newThreadBtn.addEventListener("click", () => {
    convo.innerHTML = `
      <article class="msg assistant">
        <div class="avatar a">L</div>
        <div class="bubble"><p>New thread started. What would you like to research?</p></div>
      </article>`;
    if (threadTitle) threadTitle.textContent = "New thread";
    $$(".thread").forEach((x) => {
      x.classList.remove("active");
      x.removeAttribute("aria-current");
    });
    ta.focus();
    closeMobilePanels();
    toast("New thread created.");
  });

  if (attachBtn) attachBtn.addEventListener("click", () => {
    toast("File picker not available in local demo.");
  });

  if (modeSelect) modeSelect.addEventListener("change", () => {
    toast("Mode set to " + modeSelect.value.replace(/^Mode:\s*/, "") + ".");
  });
  if (depthSelect) depthSelect.addEventListener("change", () => {
    toast("Depth set to " + depthSelect.value + ".");
  });

  if (sortSelect) sortSelect.addEventListener("change", () => {
    const list = $(".src-list");
    if (!list) return;
    const items = $$(".src", list);
    const choice = sortSelect.value;
    let sorted = items.slice();
    if (/Date/i.test(choice)) {
      sorted.sort((a, b) => {
        const ya = (a.querySelector(".src-meta")?.textContent.match(/\b(19|20)\d{2}\b/) || ["0"])[0];
        const yb = (b.querySelector(".src-meta")?.textContent.match(/\b(19|20)\d{2}\b/) || ["0"])[0];
        return Number(yb) - Number(ya);
      });
    } else if (/Cited/i.test(choice)) {
      sorted.sort((a, b) => Number(a.dataset.cite) - Number(b.dataset.cite));
    } else {
      sorted.sort((a, b) => {
        const va = Number(a.querySelector(".rel-num")?.textContent || 0);
        const vb = Number(b.querySelector(".rel-num")?.textContent || 0);
        return vb - va;
      });
    }
    sorted.forEach((el) => list.appendChild(el));
    toast("Sorted by " + choice.replace(/^Sort:\s*/, "") + ".");
  });

  // ---------- mobile rail/sources toggles ----------
  const rail = $("#rail");
  const sources = $("#sources");
  const railToggle = $("#railToggle");
  const sourcesToggle = $("#sourcesToggle");
  const scrim = $("#scrim");

  function closeMobilePanels() {
    rail?.classList.remove("open");
    sources?.classList.remove("open");
    scrim?.classList.remove("show");
    if (scrim) scrim.hidden = true;
    railToggle?.setAttribute("aria-expanded", "false");
    sourcesToggle?.setAttribute("aria-expanded", "false");
  }
  function openPanel(panel, btn) {
    closeMobilePanels();
    panel.classList.add("open");
    if (scrim) { scrim.hidden = false; scrim.classList.add("show"); }
    btn?.setAttribute("aria-expanded", "true");
  }
  railToggle?.addEventListener("click", () => {
    if (rail.classList.contains("open")) closeMobilePanels();
    else openPanel(rail, railToggle);
  });
  sourcesToggle?.addEventListener("click", () => {
    if (sources.classList.contains("open")) closeMobilePanels();
    else openPanel(sources, sourcesToggle);
  });
  scrim?.addEventListener("click", closeMobilePanels);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobilePanels();
  });
})();

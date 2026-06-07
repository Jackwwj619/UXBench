(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toast helper ----------
  let toastTimer = null;
  const toastEl = document.createElement("div");
  toastEl.className = "toast";
  toastEl.setAttribute("role", "status");
  toastEl.setAttribute("aria-live", "polite");
  document.body.appendChild(toastEl);
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  // ---------- citation highlighting ----------
  function highlightSource(id, scroll) {
    const src = $(`.src[data-cite="${id}"]`);
    if (!src) return;
    $$(".src.highlight").forEach((s) => { if (s !== src) s.classList.remove("highlight"); });
    src.classList.add("highlight");
    if (scroll) src.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  $$(".cite").forEach((c) => {
    c.setAttribute("role", "button");
    c.setAttribute("tabindex", "0");
    c.setAttribute("aria-label", `Show source ${c.dataset.cite} in the sources panel`);
    c.addEventListener("mouseenter", () => highlightSource(c.dataset.cite, false));
    c.addEventListener("mouseleave", () => {
      $$(".src.highlight").forEach((s) => s.classList.remove("highlight"));
    });
    c.addEventListener("focus", () => highlightSource(c.dataset.cite, true));
    c.addEventListener("blur", () => {
      $$(".src.highlight").forEach((s) => s.classList.remove("highlight"));
    });
    c.addEventListener("click", (e) => {
      e.preventDefault();
      highlightSource(c.dataset.cite, true);
      toast(`Highlighting source [${c.dataset.cite}]`);
    });
    c.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        highlightSource(c.dataset.cite, true);
        toast(`Highlighting source [${c.dataset.cite}]`);
      }
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
      toast("Type a question first");
      ta.focus();
      return;
    }
    appendMsg("user", `<p>${value.replace(/</g,"&lt;")}</p>`);
    ta.value = ""; autosize();
    // typing indicator
    const thinking = appendMsg("assistant", `<p class="thinking"><span class="dots"><span></span><span></span><span></span></span> Lumen is searching sources…</p>`);
    setTimeout(() => {
      thinking.remove();
      appendMsg("assistant", `
        <p><em>Thinking out loud while I assemble sources…</em></p>
        <p>Here's a first pass. The most directly relevant body of work is the chronotype × intervention literature; I'll prioritize that and bring in a couple of negative results to keep the picture honest.</p>
        <p>I added 3 new sources to the panel on the right. Want me to dig into any of them in particular?</p>`);
    }, 700);
  });

  // suggestion chips
  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      ta.value = chip.dataset.q;
      autosize();
      ta.focus();
      chip.classList.add("chip-pressed");
      setTimeout(() => chip.classList.remove("chip-pressed"), 350);
      toast("Added to composer — edit or press Ask to send");
    });
  });

  // source tabs (filter by type)
  const srcTypeMap = {
    "All": null,
    "Papers": ["1","2","4","6","7","8"],
    "Books": ["3"],
    "Web": [],
    "Preprints": ["5"],
  };
  $$(".src-tabs .tab").forEach((t) => {
    t.addEventListener("click", () => {
      $$(".src-tabs .tab").forEach((x) => {
        x.classList.remove("active");
        x.setAttribute("aria-selected", "false");
      });
      t.classList.add("active");
      t.setAttribute("aria-selected", "true");
      const label = t.textContent.trim();
      const allowed = srcTypeMap[label];
      let visible = 0;
      $$(".src-list .src").forEach((s) => {
        const show = !allowed || allowed.includes(s.dataset.cite);
        s.style.display = show ? "" : "none";
        if (show) visible++;
      });
      const countEl = $(".src-count");
      if (countEl) countEl.textContent = visible;
      const empty = $(".src-empty");
      if (empty) empty.style.display = visible === 0 ? "block" : "none";
      toast(`Filter: ${label} · ${visible} source${visible === 1 ? "" : "s"}`);
    });
    t.setAttribute("role", "tab");
    t.setAttribute("aria-selected", t.classList.contains("active") ? "true" : "false");
  });

  // header actions
  const headerButtons = $$(".head-actions button");
  headerButtons.forEach((btn) => {
    const label = btn.textContent.trim();
    btn.addEventListener("click", () => {
      btn.classList.add("btn-pressed");
      setTimeout(() => btn.classList.remove("btn-pressed"), 250);
      if (/share/i.test(label)) {
        const url = location.href.split("#")[0] + "#thread-deep-work";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(
            () => toast("Share link copied to clipboard"),
            () => toast("Share link ready: " + url)
          );
        } else {
          toast("Share link ready: " + url);
        }
      } else if (/export/i.test(label)) {
        toast("Preparing PDF export…");
        setTimeout(() => toast("PDF export ready (demo)"), 900);
      }
    });
  });

  // mode select on header
  const modeSel = $(".head-actions select");
  if (modeSel) {
    modeSel.setAttribute("aria-label", "Answer mode (applies to next response)");
    modeSel.addEventListener("change", () => {
      toast(`Mode set: ${modeSel.value} · applies to your next question`);
    });
  }

  // composer depth select
  const depthSel = $("#depth");
  if (depthSel) {
    depthSel.setAttribute("aria-label", "Response depth");
    depthSel.addEventListener("change", () => {
      toast(`Depth: ${depthSel.value}`);
    });
  }

  // sources sort select
  const sortSel = $(".sources-head select");
  if (sortSel) {
    sortSel.setAttribute("aria-label", "Sort sources");
    sortSel.addEventListener("change", () => toast(sortSel.value));
  }

  // attach (paperclip) button
  const toolBtn = $(".composer-pill .tool");
  if (toolBtn) {
    toolBtn.setAttribute("aria-label", "Attach a file");
    toolBtn.addEventListener("click", () => {
      toolBtn.classList.add("btn-pressed");
      setTimeout(() => toolBtn.classList.remove("btn-pressed"), 250);
      toast("Attach: drag a PDF here or use the file picker (demo)");
    });
  }

  // thread switching
  const threadTitleEl = $(".canvas-head h1");
  $$(".thread").forEach((th) => {
    th.addEventListener("click", (e) => {
      e.preventDefault();
      $$(".thread").forEach((x) => x.classList.remove("active"));
      th.classList.add("active");
      const label = th.textContent.trim();
      if (threadTitleEl) {
        threadTitleEl.textContent = label;
        threadTitleEl.classList.remove("title-fade");
        // restart animation
        void threadTitleEl.offsetWidth;
        threadTitleEl.classList.add("title-fade");
      }
      toast(`Opened: ${label}`);
    });
  });

  // new thread button
  const newBtn = $(".new-chat");
  if (newBtn) {
    newBtn.addEventListener("click", () => {
      newBtn.classList.add("btn-pressed");
      setTimeout(() => newBtn.classList.remove("btn-pressed"), 250);
      toast("Started a new thread (demo)");
    });
  }

  // mobile rail toggle
  const railToggle = document.createElement("button");
  railToggle.className = "rail-toggle";
  railToggle.type = "button";
  railToggle.setAttribute("aria-label", "Toggle thread list");
  railToggle.setAttribute("aria-expanded", "false");
  railToggle.innerHTML = "☰ Threads";
  const head = $(".canvas-head");
  if (head) head.insertBefore(railToggle, head.firstChild);
  railToggle.addEventListener("click", () => {
    document.body.classList.toggle("rail-open");
    const open = document.body.classList.contains("rail-open");
    railToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

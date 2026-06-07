(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toast helper ----------
  const toastEl = $("#toast");
  let toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("show");
      setTimeout(() => { toastEl.hidden = true; }, 200);
    }, 2400);
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
  }

  composer.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = ta.value.trim();
    if (!value) return;
    appendMsg("user", `<p>${value.replace(/</g,"&lt;")}</p>`);
    ta.value = ""; autosize();
    setTimeout(() => {
      appendMsg("assistant", `
        <p><em>Thinking out loud while I assemble sources…</em></p>
        <p>Here's a first pass. The most directly relevant body of work is the chronotype × intervention literature; I'll prioritize that and bring in a couple of negative results to keep the picture honest.</p>
        <p>I added 3 new sources to the panel on the right. Want me to dig into any of them in particular?</p>`);
    }, 400);
  });

  // suggestion chips
  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      ta.value = chip.dataset.q;
      autosize();
      ta.focus();
    });
  });

  // tabs
  $$(".src-tabs .tab").forEach((t) => {
    t.addEventListener("click", () => {
      $$(".src-tabs .tab").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
    });
  });

  // ---------- thread switching (demo stubs) ----------
  $$(".thread").forEach((thread) => {
    thread.addEventListener("click", (e) => {
      e.preventDefault();
      if (thread.classList.contains("demo-stub")) {
        toast("This thread is a demo placeholder — content not available.");
        return;
      }
      $$(".thread").forEach((t) => t.classList.remove("active"));
      thread.classList.add("active");
    });
  });

  // ---------- header action stubs ----------
  const shareBtn = $("#share-btn");
  if (shareBtn) shareBtn.addEventListener("click", () => toast("Share is not available in this demo."));
  const exportBtn = $("#export-btn");
  if (exportBtn) exportBtn.addEventListener("click", () => toast("PDF export is not available in this demo."));
  const newBtn = $("#new-thread-btn");
  if (newBtn) newBtn.addEventListener("click", () => toast("New thread is not available in this demo."));
  const attachBtn = $("#attach-btn");
  if (attachBtn) attachBtn.addEventListener("click", () => toast("Attachments are not available in this demo."));

  // ---------- synchronize mode selectors ----------
  const headerMode = $("#mode-header");
  const composerMode = $("#depth");
  function syncFromHeader() {
    if (!headerMode || !composerMode) return;
    const v = headerMode.value.replace(/^Mode:\s*/, "");
    const opt = Array.from(composerMode.options).find((o) => o.value === v || o.text === v);
    if (opt) composerMode.value = opt.value;
  }
  function syncFromComposer() {
    if (!headerMode || !composerMode) return;
    const v = composerMode.value;
    const opt = Array.from(headerMode.options).find((o) => o.text === "Mode: " + v);
    if (opt) headerMode.value = opt.value;
  }
  if (headerMode) headerMode.addEventListener("change", syncFromHeader);
  if (composerMode) composerMode.addEventListener("change", syncFromComposer);
})();

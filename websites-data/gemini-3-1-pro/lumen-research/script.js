(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

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

  // ---------- toast notifications ----------
  const toastContainer = $("#toast-container");
  function showToast(message, duration = 2400) {
    if (!toastContainer) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    toastContainer.appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transition = "opacity .25s ease-out";
      setTimeout(() => el.remove(), 260);
    }, duration);
  }

  // ---------- header utility actions ----------
  const shareBtn = $("#share-thread");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(
          () => showToast("Thread link copied to clipboard"),
          () => showToast("Thread link ready: " + url)
        );
      } else {
        showToast("Thread link ready to share");
      }
    });
  }
  const exportBtn = $("#export-pdf");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      showToast("Preparing PDF export…");
      setTimeout(() => showToast("PDF export ready (demo)"), 1400);
    });
  }

  // ---------- mobile header menu toggle ----------
  const headToggle = $(".head-menu-toggle");
  const headActions = $(".head-actions");
  if (headToggle && headActions) {
    headToggle.addEventListener("click", () => {
      const isOpen = headActions.classList.toggle("open");
      headToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // ---------- composer ----------
  const ta = $("#prompt");
  const composer = $("#composer");
  const convo = $("#conversation");
  const sendBtn = composer ? composer.querySelector(".send") : null;
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
    article.className = "msg " + role;
    if (opts.id) article.id = opts.id;
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
    if (!value) return;
    appendMsg("user", `<p>${value.replace(/</g,"&lt;")}</p>`);
    ta.value = ""; autosize();

    // disable composer + show typing indicator
    if (sendBtn) sendBtn.disabled = true;
    ta.disabled = true;
    const typingEl = appendMsg(
      "assistant",
      `<div class="typing-bubble" aria-label="Lumen is thinking"><span></span><span></span><span></span></div><span class="typing-label">Lumen is thinking…</span>`,
      { id: "typing-indicator" }
    );

    setTimeout(() => {
      if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
      appendMsg("assistant", `
        <p><em>Thinking out loud while I assemble sources…</em></p>
        <p>Here's a first pass. The most directly relevant body of work is the chronotype × intervention literature; I'll prioritize that and bring in a couple of negative results to keep the picture honest.</p>
        <p>I added 3 new sources to the panel on the right. Want me to dig into any of them in particular?</p>`);
      if (sendBtn) sendBtn.disabled = false;
      ta.disabled = false;
      ta.focus();
    }, 1100);
  });

  // suggestion chips
  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      ta.value = chip.dataset.q;
      autosize();
      ta.focus();
    });
  });

  // tabs — actually filter the source list
  function applyFilter(filter) {
    $$(".src").forEach((s) => {
      const t = s.dataset.type || "";
      if (filter === "all" || t === filter) {
        s.classList.remove("is-hidden");
      } else {
        s.classList.add("is-hidden");
      }
    });
    const visible = $$(".src").filter((s) => !s.classList.contains("is-hidden")).length;
    const counter = $(".src-count");
    if (counter) counter.textContent = String(visible);
  }
  $$(".src-tabs .tab").forEach((t) => {
    t.addEventListener("click", () => {
      $$(".src-tabs .tab").forEach((x) => {
        x.classList.remove("active");
        x.setAttribute("aria-selected", "false");
      });
      t.classList.add("active");
      t.setAttribute("aria-selected", "true");
      applyFilter(t.dataset.filter || "all");
    });
  });
})();

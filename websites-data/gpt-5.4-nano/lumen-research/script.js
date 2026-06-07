(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toast ----------
  const toast = $("#toast");
  let toastTimer;
  function showToast(msg, kind) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove("is-error", "is-success");
    if (kind) toast.classList.add("is-" + kind);
    toast.hidden = false;
    requestAnimationFrame(() => toast.setAttribute("data-show", "1"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.removeAttribute("data-show");
      setTimeout(() => { toast.hidden = true; }, 250);
    }, 3000);
  }

  // ---------- citation highlighting ----------
  function clearHighlights() {
    $$(".src.highlight").forEach((s) => s.classList.remove("highlight"));
    $$(".cite.highlight").forEach((c) => c.classList.remove("highlight"));
  }
  function highlightSource(id, doScroll) {
    const src = $(`.src[data-cite="${id}"]`);
    if (!src) return;
    if (src.classList.contains("is-hidden")) {
      // Force "All" tab so the source is visible
      const allTab = $('.src-tabs .tab[data-cat="all"]');
      if (allTab) allTab.click();
    }
    src.classList.add("highlight");
    if (doScroll) src.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  $$(".cite").forEach((c) => {
    c.addEventListener("mouseenter", () => {
      const id = c.dataset.cite;
      highlightSource(id, true);
    });
    c.addEventListener("mouseleave", () => {
      $$(".src.highlight").forEach((s) => s.classList.remove("highlight"));
    });
    c.addEventListener("focus", () => {
      const id = c.dataset.cite;
      highlightSource(id, false);
    });
    c.addEventListener("blur", () => {
      $$(".src.highlight").forEach((s) => s.classList.remove("highlight"));
    });
    c.addEventListener("click", (e) => {
      e.preventDefault();
      const id = c.dataset.cite;
      highlightSource(id, true);
      const src = $(`.src[data-cite="${id}"]`);
      if (src) src.focus({ preventScroll: true });
    });
    c.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        c.click();
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
  }

  composer.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = ta.value.trim();
    if (!value) return;
    appendMsg("user", `<p>${value.replace(/</g, "&lt;")}</p>`);
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

  // ---------- source tabs (real filtering) ----------
  const status = $("#src-status");
  const countEl = $("#src-count");
  function applyFilter(cat) {
    let visible = 0;
    $$(".src").forEach((li) => {
      const liCat = li.dataset.category || "paper";
      const show = cat === "all" || liCat === cat;
      li.classList.toggle("is-hidden", !show);
      if (show) visible++;
    });
    if (countEl) countEl.textContent = String(visible);
    if (status) {
      const label = cat === "all" ? "all sources" : cat + "s";
      status.textContent = `Showing ${visible} ${label}.`;
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
      const cat = t.dataset.cat || "all";
      applyFilter(cat);
    });
  });

  // ---------- share modal ----------
  const shareModal = $("#share-modal");
  const shareBtn = $("#share-btn");
  const shareClose = $("#share-close");
  const shareDone = $("#share-done");
  const shareCopy = $("#share-copy");
  const shareLink = $("#share-link");
  let lastFocus = null;
  function openShare() {
    if (!shareModal) return;
    lastFocus = document.activeElement;
    shareModal.hidden = false;
    setTimeout(() => {
      if (shareLink) { shareLink.focus(); shareLink.select(); }
    }, 0);
  }
  function closeShare() {
    if (!shareModal) return;
    shareModal.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (shareBtn) shareBtn.addEventListener("click", openShare);
  if (shareClose) shareClose.addEventListener("click", closeShare);
  if (shareDone) shareDone.addEventListener("click", closeShare);
  if (shareModal) {
    shareModal.addEventListener("click", (e) => {
      if (e.target.classList && e.target.classList.contains("modal-backdrop")) closeShare();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && shareModal && !shareModal.hidden) closeShare();
  });
  if (shareCopy) {
    shareCopy.addEventListener("click", async () => {
      const text = shareLink ? shareLink.value : "";
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else if (shareLink) {
          shareLink.select();
          document.execCommand("copy");
        }
        showToast("Link copied to clipboard", "success");
      } catch (err) {
        showToast("Couldn't copy — please copy manually", "error");
      }
    });
  }

  // ---------- export as PDF ----------
  const exportBtn = $("#export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      showToast("Preparing PDF — opening print dialog…", "success");
      setTimeout(() => {
        try { window.print(); } catch (e) { showToast("Export failed", "error"); }
      }, 400);
    });
  }

  // initial filter state
  applyFilter("all");
})();

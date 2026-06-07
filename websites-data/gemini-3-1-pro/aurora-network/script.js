(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Toast helper ----------
  let toastTimer = null;
  function toast(msg, kind = "info") {
    let t = $("#aurora-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "aurora-toast";
      t.className = "toast";
      t.setAttribute("role", "status");
      t.setAttribute("aria-live", "polite");
      document.body.appendChild(t);
    }
    t.className = "toast toast-" + kind;
    t.textContent = msg;
    // force reflow then show
    requestAnimationFrame(() => t.classList.add("show"));
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }
  window.auroraToast = toast;

  // ---------- Modal helper ----------
  function confirmModal({ title, body, confirmLabel = "Confirm", danger = false }) {
    return new Promise((resolve) => {
      let back = $("#aurora-modal-back");
      if (!back) {
        back = document.createElement("div");
        back.id = "aurora-modal-back";
        back.className = "modal-back";
        back.innerHTML = `
          <div class="modal" role="dialog" aria-modal="true">
            <h3 data-role="title"></h3>
            <p data-role="body"></p>
            <div class="modal-actions">
              <button data-role="cancel">Cancel</button>
              <button class="primary" data-role="confirm"></button>
            </div>
          </div>`;
        document.body.appendChild(back);
      }
      const t = $("[data-role=title]", back);
      const b = $("[data-role=body]", back);
      const ok = $("[data-role=confirm]", back);
      const cancel = $("[data-role=cancel]", back);
      t.textContent = title;
      b.textContent = body;
      ok.textContent = confirmLabel;
      ok.classList.toggle("danger", !!danger);
      ok.classList.toggle("primary", !danger);
      back.classList.add("show");
      const close = (val) => {
        back.classList.remove("show");
        ok.replaceWith(ok.cloneNode(true));
        cancel.replaceWith(cancel.cloneNode(true));
        resolve(val);
      };
      $("[data-role=confirm]", back).addEventListener("click", () => close(true));
      $("[data-role=cancel]", back).addEventListener("click", () => close(false));
      back.addEventListener("click", (e) => { if (e.target === back) close(false); }, { once: true });
    });
  }
  window.confirmModal = confirmModal;

  // ---------- Audience selector (audience.html) ----------
  $$(".aud-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      $$(".aud-option").forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      const radio = $("input[type=radio]", opt);
      if (radio) radio.checked = true;
      const note = $("#aud-impact");
      if (note) {
        const val = opt.dataset.value;
        const labels = {
          public: "Visible to anyone on the internet. New posts will be indexed by search engines unless you turn that off separately.",
          friends: "Visible to your 312 accepted friends. Not visible to friends-of-friends.",
          list: "Visible only to a custom list you select per-post. New posts default to the most recently used list.",
          me: "Visible only to you. Use this for drafts and journaling."
        };
        note.textContent = labels[val] || "";
      }
    });
  });

  const saveAud = $("#aud-save");
  if (saveAud) {
    saveAud.addEventListener("click", async () => {
      const selected = $(".aud-option.selected");
      const val = selected ? selected.dataset.value : "friends";
      if (val === "public") {
        const ok = await confirmModal({
          title: "Set default to Public?",
          body: "Anyone on the internet will see new posts. This is a permission, not a one-time choice — every post you share until you change this will be public.",
          confirmLabel: "Yes, make default Public",
          danger: true
        });
        if (!ok) return;
      }
      const msg = "Saved — default audience set to " + (selected ? selected.querySelector("h4").textContent : "Friends");
      const banner = $("#aud-saved");
      if (banner) {
        banner.textContent = msg;
        banner.style.display = "block";
        setTimeout(() => (banner.style.display = "none"), 3000);
      }
      // Toast also shown so confirmation is visible above the sticky header on mobile
      toast(msg, "success");
    });
  }

  // "+ New list" stub on audience.html — set expectations with a toast
  const newListBtn = $("#new-list-btn");
  if (newListBtn) {
    newListBtn.addEventListener("click", () => {
      toast("Creating custom lists is coming soon — we'll email you when it ships.", "info");
    });
  }

  // ---------- Tag queue (tag-review.html) ----------
  function refreshQueueCount() {
    const n = $$(".tag-card").length;
    // Update every place the count is shown (sidebar badge AND main page header)
    $$(".queue-count").forEach((el) => { el.textContent = n; });
    const legacy = $("#queue-count");
    if (legacy) legacy.textContent = n;
    const empty = $("#queue-empty");
    if (empty) empty.style.display = n === 0 ? "block" : "none";
  }
  $$(".tag-card").forEach((card) => {
    const approve = $("[data-act=approve]", card);
    const hide = $("[data-act=hide]", card);
    const block = $("[data-act=block]", card);
    if (approve) approve.addEventListener("click", () => { card.remove(); refreshQueueCount(); });
    if (hide) hide.addEventListener("click", () => { card.remove(); refreshQueueCount(); });
    if (block) block.addEventListener("click", async () => {
      const who = card.dataset.poster || "this person";
      const ok = await confirmModal({
        title: "Block " + who + "?",
        body: "They won't be able to tag you, message you, or see your posts. You can undo this in Settings → Blocked.",
        confirmLabel: "Block",
        danger: true
      });
      if (ok) { card.remove(); refreshQueueCount(); }
    });
  });

  const approveAll = $("#approve-all");
  if (approveAll) approveAll.addEventListener("click", async () => {
    const n = $$(".tag-card").length;
    if (n === 0) return;
    const ok = await confirmModal({
      title: `Approve all ${n} pending tag${n === 1 ? "" : "s"}?`,
      body: "These tags will appear on your profile and in your friends' feeds. You can remove a tag later but it may already have been seen.",
      confirmLabel: "Approve all"
    });
    if (ok) { $$(".tag-card").forEach((c) => c.remove()); refreshQueueCount(); }
  });

  // ---------- Past posts (past-posts.html) ----------
  const filterYear = $("#filter-year");
  const filterAud = $("#filter-aud");
  function applyPostFilter() {
    const y = filterYear ? filterYear.value : "all";
    const a = filterAud ? filterAud.value : "all";
    $$(".post-row").forEach((row) => {
      const okY = y === "all" || row.dataset.year === y;
      const okA = a === "all" || row.dataset.aud === a;
      row.style.display = okY && okA ? "" : "none";
    });
    const visible = $$(".post-row").filter((r) => r.style.display !== "none").length;
    const c = $("#post-count");
    if (c) c.textContent = visible;
  }
  if (filterYear) filterYear.addEventListener("change", applyPostFilter);
  if (filterAud) filterAud.addEventListener("change", applyPostFilter);

  // Per-post Edit buttons — open a confirm modal explaining inline editing isn't ready
  $$('button.post-action[data-action="edit-post"]').forEach((btn) => {
    btn.addEventListener("click", async () => {
      const row = btn.closest(".post-row");
      const snippet = row ? (row.querySelector(".post-snippet")?.textContent || "this post") : "this post";
      const trimmed = snippet.length > 80 ? snippet.slice(0, 77) + "…" : snippet;
      await confirmModal({
        title: "Per-post editing isn't available here",
        body: `Editing individual posts (${trimmed}) opens in the full composer, which isn't part of this Privacy demo. Use the bulk controls above to change audience for matching posts.`,
        confirmLabel: "Got it"
      });
    });
  });

  const bulkRestrict = $("#bulk-restrict");
  if (bulkRestrict) bulkRestrict.addEventListener("click", async () => {
    const target = $("#bulk-target").value;
    const ok = await confirmModal({
      title: "Restrict matching posts to " + target + "?",
      body: "This will change the audience on every visible post above (about " + ($("#post-count").textContent) + " posts). This cannot be reversed in bulk — each post must be opened individually to widen the audience again.",
      confirmLabel: "Yes, restrict them",
      danger: true
    });
    if (!ok) return;
    $$(".post-row").forEach((row) => {
      if (row.style.display === "none") return;
      const tag = row.querySelector(".aud-tag");
      tag.className = "aud-tag " + (target === "Public" ? "public" : target === "Friends" ? "friends" : "me");
      tag.textContent = target;
      row.dataset.aud = target.toLowerCase() === "only me" ? "me" : target.toLowerCase();
    });
  });

  // ---------- Muted words (blocked-words.html) ----------
  const mutedList = $("#muted-list");
  const mutedForm = $("#muted-form");
  const mutedInput = $("#muted-input");

  function addMutedChip(word) {
    const chip = document.createElement("span");
    chip.className = "muted-chip";
    chip.innerHTML = `${word.replace(/</g, "&lt;")} <button aria-label="Remove">×</button>`;
    chip.querySelector("button").addEventListener("click", () => {
      chip.remove();
      updateMutedCount();
    });
    mutedList.appendChild(chip);
  }
  function updateMutedCount() {
    const c = $("#muted-count");
    if (c) c.textContent = mutedList ? mutedList.children.length : 0;
  }
  if (mutedForm) {
    mutedForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = mutedInput.value.trim();
      if (!v) return;
      addMutedChip(v);
      mutedInput.value = "";
      updateMutedCount();
    });
  }
  if (mutedList) {
    Array.from(mutedList.querySelectorAll(".muted-chip button")).forEach((btn) => {
      btn.setAttribute("aria-label", "Remove muted word");
      btn.addEventListener("click", (e) => {
        e.target.closest(".muted-chip").remove();
        updateMutedCount();
      });
    });
    updateMutedCount();
  }

  // Export muted words as a real .txt download
  const exportBtn = $("#muted-export");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const words = $$(".muted-chip", mutedList).map((c) => {
        const clone = c.cloneNode(true);
        const b = clone.querySelector("button");
        if (b) b.remove();
        return clone.textContent.trim();
      }).filter(Boolean);
      if (words.length === 0) {
        toast("No muted words to export yet.", "info");
        return;
      }
      const blob = new Blob([words.join("\n") + "\n"], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "aurora-muted-words.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast(`Exported ${words.length} muted word${words.length === 1 ? "" : "s"}.`, "success");
    });
  }

  // Import muted words from a .txt file
  const importBtn = $("#muted-import");
  if (importBtn) {
    let hiddenInput = null;
    importBtn.addEventListener("click", () => {
      if (!hiddenInput) {
        hiddenInput = document.createElement("input");
        hiddenInput.type = "file";
        hiddenInput.accept = ".txt,text/plain";
        hiddenInput.style.display = "none";
        hiddenInput.addEventListener("change", () => {
          const file = hiddenInput.files && hiddenInput.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            const lines = String(reader.result || "")
              .split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
            const existing = new Set($$(".muted-chip", mutedList).map((c) => {
              const clone = c.cloneNode(true);
              const b = clone.querySelector("button");
              if (b) b.remove();
              return clone.textContent.trim().toLowerCase();
            }));
            let added = 0;
            lines.forEach((w) => {
              if (!existing.has(w.toLowerCase())) { addMutedChip(w); added++; }
            });
            updateMutedCount();
            toast(`Imported ${added} new muted word${added === 1 ? "" : "s"} from ${file.name}.`, "success");
          };
          reader.readAsText(file);
          hiddenInput.value = "";
        });
        document.body.appendChild(hiddenInput);
      }
      hiddenInput.click();
    });
  }

  refreshQueueCount();
})();

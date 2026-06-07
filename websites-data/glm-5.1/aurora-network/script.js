(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Disabled nav stubs ----------
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a.nav-stub");
    if (a) {
      e.preventDefault();
      showToast("Home is not available in this demo");
    }
  });

  // ---------- Toast helper ----------
  let toastTimer = null;
  function showToast(msg) {
    let toast = $("#aurora-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "aurora-toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }
  window.showToast = showToast;

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

      let settled = false;
      const close = (val) => {
        if (settled) return;
        settled = true;
        back.classList.remove("show");
        ok.removeEventListener("click", onOk);
        cancel.removeEventListener("click", onCancel);
        back.removeEventListener("click", onBack);
        document.removeEventListener("keydown", onKey);
        resolve(val);
      };
      const onOk = () => close(true);
      const onCancel = () => close(false);
      const onBack = (e) => { if (e.target === back) close(false); };
      const onKey = (e) => { if (e.key === "Escape") close(false); };
      ok.addEventListener("click", onOk);
      cancel.addEventListener("click", onCancel);
      back.addEventListener("click", onBack);
      document.addEventListener("keydown", onKey);
    });
  }
  window.confirmModal = confirmModal;

  // ---------- Audience selector (audience.html) ----------
  const audOptions = $$(".aud-option");
  const audLabels = {
    public: "Visible to anyone on the internet. New posts will be indexed by search engines unless you turn that off separately.",
    friends: "Visible to your 312 accepted friends. Not visible to friends-of-friends.",
    list: "Visible only to a custom list you select per-post. New posts default to the most recently used list.",
    me: "Visible only to you. Use this for drafts and journaling."
  };
  let savedAudValue = (($(".aud-option.selected") || {}).dataset || {}).value || "friends";
  let savedImpactText = ($("#aud-impact") && $("#aud-impact").textContent) || "";

  function applyAudSelection(val, { updateNote = true } = {}) {
    audOptions.forEach((o) => o.classList.toggle("selected", o.dataset.value === val));
    audOptions.forEach((o) => {
      const r = $("input[type=radio]", o);
      if (r) r.checked = (o.dataset.value === val);
    });
    if (updateNote) {
      const note = $("#aud-impact");
      if (note) note.textContent = audLabels[val] || note.textContent;
    }
  }

  audOptions.forEach((opt) => {
    opt.addEventListener("click", () => applyAudSelection(opt.dataset.value));
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
      savedAudValue = val;
      savedImpactText = $("#aud-impact") ? $("#aud-impact").textContent : savedImpactText;
      const label = selected ? selected.querySelector("h4").textContent : "Friends";
      const banner = $("#aud-saved");
      if (banner) {
        banner.textContent = "Saved — default audience set to " + label;
        banner.style.display = "block";
        setTimeout(() => (banner.style.display = "none"), 3000);
      }
      showToast("Default audience saved");
    });
  }

  const discardAud = $("#aud-discard");
  if (discardAud) {
    discardAud.addEventListener("click", () => {
      const current = (($(".aud-option.selected") || {}).dataset || {}).value;
      if (current === savedAudValue) {
        showToast("No changes to discard");
        return;
      }
      applyAudSelection(savedAudValue, { updateNote: false });
      const note = $("#aud-impact");
      if (note && savedImpactText) note.textContent = savedImpactText;
      showToast("Changes discarded");
    });
  }

  // ---------- Tag queue (tag-review.html) ----------
  function refreshQueueCount() {
    const n = $$(".tag-card").length;
    const counter = $("#queue-count");
    if (counter) counter.textContent = n;
    const badge = $("#queue-badge");
    if (badge) badge.textContent = n;
    const label = $("#queue-label");
    if (label) label.textContent = n === 1 ? "tag" : "tags";
    const empty = $("#queue-empty");
    if (empty) empty.style.display = n === 0 ? "block" : "none";
  }
  $$(".tag-card").forEach((card) => {
    const approve = $("[data-act=approve]", card);
    const hide = $("[data-act=hide]", card);
    const block = $("[data-act=block]", card);
    if (approve) approve.addEventListener("click", () => {
      card.remove(); refreshQueueCount();
      showToast("Tag approved");
    });
    if (hide) hide.addEventListener("click", () => {
      card.remove(); refreshQueueCount();
      showToast("Tag hidden");
    });
    if (block) block.addEventListener("click", async () => {
      const who = card.dataset.poster || "this person";
      const ok = await confirmModal({
        title: "Block " + who + "?",
        body: "They won't be able to tag you, message you, or see your posts. You can undo this in Settings → Blocked.",
        confirmLabel: "Block",
        danger: true
      });
      if (ok) { card.remove(); refreshQueueCount(); showToast("User blocked"); }
    });
  });

  const approveAll = $("#approve-all");
  if (approveAll) approveAll.addEventListener("click", async () => {
    const ok = await confirmModal({
      title: "Approve all 7 pending tags?",
      body: "These tags will appear on your profile and in your friends' feeds. You can remove a tag later but it may already have been seen.",
      confirmLabel: "Approve all"
    });
    if (ok) { $$(".tag-card").forEach((c) => c.remove()); refreshQueueCount(); showToast("All tags approved"); }
  });

  const hideAllBtn = $$(".bulk-bar button").find((b) => b.textContent.trim() === "Hide all");
  if (hideAllBtn) hideAllBtn.addEventListener("click", async () => {
    const n = $$(".tag-card").length;
    if (n === 0) { showToast("No tags to hide"); return; }
    const ok = await confirmModal({
      title: "Hide all " + n + " pending tags?",
      body: "These tags will be removed from your queue without appearing on your profile.",
      confirmLabel: "Hide all"
    });
    if (ok) { $$(".tag-card").forEach((c) => c.remove()); refreshQueueCount(); showToast("All tags hidden"); }
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
      showToast('Muted "' + v + '"');
    });
  }

  const mutedExport = $("#muted-export");
  if (mutedExport) {
    mutedExport.addEventListener("click", () => {
      const words = $$(".muted-chip", mutedList).map((chip) => {
        const clone = chip.cloneNode(true);
        const btn = clone.querySelector("button");
        if (btn) btn.remove();
        return clone.textContent.trim();
      });
      try {
        const blob = new Blob([words.join("\n") + "\n"], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "muted-words.txt";
        document.body.appendChild(a); a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        showToast("Exported " + words.length + " muted words");
      } catch (err) {
        showToast("Export failed");
      }
    });
  }

  const mutedImport = $("#muted-import");
  if (mutedImport) {
    mutedImport.addEventListener("click", () => {
      showToast("Import .txt — not available in this demo");
    });
  }
  if (mutedList) {
    Array.from(mutedList.querySelectorAll(".muted-chip button")).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.target.closest(".muted-chip").remove();
        updateMutedCount();
      });
    });
    updateMutedCount();
  }

  refreshQueueCount();
})();

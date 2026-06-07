(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Toast helper ----------
  function showToast(msg, kind) {
    const t = document.createElement("div");
    t.className = "modal-toast";
    if (kind === "ok") t.style.background = "#2f8a52";
    if (kind === "warn") t.style.background = "#b97d1c";
    t.setAttribute("role", "status");
    t.setAttribute("aria-live", "polite");
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .3s"; }, 2400);
    setTimeout(() => { t.remove(); }, 2800);
  }
  window.showToast = showToast;

  // ---------- Modal helper ----------
  function confirmModal({ title, body, confirmLabel = "Confirm", danger = false }) {
    return new Promise((resolve) => {
      // Always rebuild the modal from scratch so stale listeners can't linger
      let back = $("#aurora-modal-back");
      if (back) back.remove();
      back = document.createElement("div");
      back.id = "aurora-modal-back";
      back.className = "modal-back";
      back.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="aurora-modal-title">
          <h3 id="aurora-modal-title" data-role="title"></h3>
          <p data-role="body"></p>
          <div class="modal-actions">
            <button type="button" data-role="cancel">Cancel</button>
            <button type="button" class="primary" data-role="confirm"></button>
          </div>
        </div>`;
      document.body.appendChild(back);

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

      // Focus the primary action so keyboard-Enter works
      setTimeout(() => { try { ok.focus(); } catch (e) {} }, 0);

      let settled = false;
      const close = (val) => {
        if (settled) return;
        settled = true;
        back.classList.remove("show");
        // Remove from DOM so no overlay can intercept later clicks
        setTimeout(() => { if (back && back.parentNode) back.parentNode.removeChild(back); }, 0);
        resolve(val);
      };
      ok.addEventListener("click", (e) => { e.stopPropagation(); close(true); });
      cancel.addEventListener("click", (e) => { e.stopPropagation(); close(false); });
      // Backdrop click closes (cancel) — only when target is the back itself
      back.addEventListener("click", (e) => { if (e.target === back) close(false); });
      // Escape key cancels
      document.addEventListener("keydown", function escHandler(e) {
        if (e.key === "Escape") { close(false); document.removeEventListener("keydown", escHandler); }
      });
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
        if (!ok) { showToast("No changes made"); return; }
      }
      const banner = $("#aud-saved");
      const label = selected ? selected.querySelector("h4").textContent : "Friends";
      banner.textContent = "Saved — default audience set to " + label;
      banner.style.display = "block";
      try { localStorage.setItem("aurora.defaultAudience", label); } catch (e) {}
      showToast("Default audience saved", "ok");
      setTimeout(() => (banner.style.display = "none"), 3000);
    });
  }

  // ---------- Tag queue (tag-review.html) ----------
  function refreshQueueCount() {
    const n = $$(".tag-card").length;
    $$(".queue-count").forEach((c) => c.textContent = n);
    const empty = $("#queue-empty");
    if (empty) empty.style.display = n === 0 ? "block" : "none";
  }
  $$(".tag-card").forEach((card) => {
    const approve = $("[data-act=approve]", card);
    const hide = $("[data-act=hide]", card);
    const block = $("[data-act=block]", card);
    if (approve) approve.addEventListener("click", () => {
      card.remove(); refreshQueueCount();
      showToast("Tag approved", "ok");
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
      if (ok) {
        card.remove(); refreshQueueCount();
        showToast("Blocked " + who, "ok");
      } else {
        showToast("No changes made");
      }
    });
  });

  const approveAll = $("#approve-all");
  if (approveAll) approveAll.addEventListener("click", async () => {
    const pending = $$(".tag-card").length;
    const ok = await confirmModal({
      title: "Approve all " + pending + " pending tags?",
      body: "These tags will appear on your profile and in your friends' feeds. You can remove a tag later but it may already have been seen.",
      confirmLabel: "Approve all"
    });
    if (ok) {
      $$(".tag-card").forEach((c) => c.remove()); refreshQueueCount();
      showToast("Approved " + pending + " tags", "ok");
    } else {
      showToast("No changes made");
    }
  });

  const hideAll = $("#hide-all");
  if (hideAll) hideAll.addEventListener("click", async () => {
    const pending = $$(".tag-card").length;
    const ok = await confirmModal({
      title: "Hide all " + pending + " pending tags?",
      body: "Hidden tags won't link to your profile. Posters keep the original post unchanged.",
      confirmLabel: "Hide all"
    });
    if (ok) {
      $$(".tag-card").forEach((c) => c.remove()); refreshQueueCount();
      showToast("Hidden " + pending + " tags", "ok");
    } else {
      showToast("No changes made");
    }
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
    const visibleCount = $("#post-count").textContent;
    const ok = await confirmModal({
      title: "Restrict matching posts to " + target + "?",
      body: "This will change the audience on every visible post above (about " + visibleCount + " posts). This cannot be reversed in bulk — each post must be opened individually to widen the audience again.",
      confirmLabel: "Yes, restrict them",
      danger: true
    });
    if (!ok) { showToast("No changes made"); return; }
    let changed = 0;
    $$(".post-row").forEach((row) => {
      if (row.style.display === "none") return;
      const tag = row.querySelector(".aud-tag");
      tag.className = "aud-tag " + (target === "Public" ? "public" : target === "Friends" ? "friends" : "me");
      tag.textContent = target;
      row.dataset.aud = target.toLowerCase() === "only me" ? "me" : target.toLowerCase();
      changed++;
    });
    try {
      localStorage.setItem("aurora.pastPostBulk", JSON.stringify({ target: target, count: changed, ts: Date.now() }));
    } catch (e) {}
    const status = $("#bulk-status");
    if (status) {
      status.textContent = "Updated " + changed + " posts to " + target + ".";
      status.style.display = "block";
    }
    showToast("Restricted " + changed + " posts to " + target, "ok");
  });

  // ---------- Muted words (blocked-words.html) ----------
  const mutedList = $("#muted-list");
  const mutedForm = $("#muted-form");
  const mutedInput = $("#muted-input");

  function addMutedChip(word) {
    const chip = document.createElement("span");
    chip.className = "muted-chip";
    chip.innerHTML = `${word.replace(/</g, "&lt;")} <button type="button" aria-label="Remove ${word.replace(/"/g, "&quot;")}">×</button>`;
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
      showToast("Muted “" + v + "”", "ok");
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

  // ---------- Applicability checkboxes (blocked-words.html) ----------
  $$(".applicability input[type=checkbox]").forEach((cb) => {
    const label = cb.closest("label");
    const updateLabelState = () => {
      if (label) label.classList.toggle("is-checked", cb.checked);
    };
    updateLabelState();
    cb.addEventListener("change", () => {
      updateLabelState();
      const summary = $("#applies-summary");
      if (summary) {
        const checked = $$(".applicability input[type=checkbox]:checked")
          .map((c) => c.dataset.label || (c.closest("label") ? c.closest("label").innerText.trim() : ""))
          .filter(Boolean);
        summary.textContent = checked.length
          ? "Applies to: " + checked.join(", ") + "."
          : "Not applied anywhere yet.";
      }
      showToast((cb.checked ? "On — " : "Off — ") + (cb.dataset.label || "setting updated"));
    });
  });

  // ---------- Snapshot (index.html) ----------
  try {
    const audPref = localStorage.getItem("aurora.defaultAudience");
    if (audPref) {
      const snapAud = $("#snap-default-audience");
      if (snapAud) snapAud.textContent = audPref;
    }
    const bulkRaw = localStorage.getItem("aurora.pastPostBulk");
    if (bulkRaw) {
      const bulk = JSON.parse(bulkRaw);
      const snapPast = $("#snap-past-posts");
      if (snapPast && bulk && bulk.target) {
        snapPast.textContent = "Restricted to " + bulk.target + " (" + bulk.count + " posts)";
      }
    }
  } catch (e) {}

  refreshQueueCount();
})();

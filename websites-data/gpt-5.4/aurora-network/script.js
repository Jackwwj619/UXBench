(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Toast helper ----------
  function showToast(msg, opts = {}) {
    let host = $("#aurora-toast-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "aurora-toast-host";
      host.className = "toast-host";
      document.body.appendChild(host);
    }
    const t = document.createElement("div");
    t.className = "toast" + (opts.danger ? " toast-danger" : "");
    t.setAttribute("role", "status");
    const text = document.createElement("span");
    text.textContent = msg;
    t.appendChild(text);
    if (opts.undoLabel && typeof opts.onUndo === "function") {
      const u = document.createElement("button");
      u.type = "button";
      u.className = "toast-undo";
      u.textContent = opts.undoLabel;
      u.addEventListener("click", () => {
        opts.onUndo();
        t.remove();
      });
      t.appendChild(u);
    }
    host.appendChild(t);
    setTimeout(() => {
      t.classList.add("fade");
      setTimeout(() => t.remove(), 350);
    }, opts.duration || 3500);
    return t;
  }
  window.showToast = showToast;

  // ---------- Modal helper (rewritten so cancel/confirm always work) ----------
  function confirmModal({ title, body, confirmLabel = "Confirm", cancelLabel = "Cancel", danger = false }) {
    return new Promise((resolve) => {
      // Always rebuild the modal DOM fresh so listeners are clean.
      const old = $("#aurora-modal-back");
      if (old) old.remove();

      const back = document.createElement("div");
      back.id = "aurora-modal-back";
      back.className = "modal-back";
      back.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="aurora-modal-title">
          <h3 id="aurora-modal-title"></h3>
          <p data-role="body"></p>
          <div class="modal-actions">
            <button type="button" data-role="cancel"></button>
            <button type="button" class="primary" data-role="confirm"></button>
          </div>
        </div>`;
      document.body.appendChild(back);

      const dialog = $(".modal", back);
      const titleEl = $("#aurora-modal-title", back);
      const bodyEl = $("[data-role=body]", back);
      const okBtn = $("[data-role=confirm]", back);
      const cancelBtn = $("[data-role=cancel]", back);

      titleEl.textContent = title;
      bodyEl.textContent = body;
      okBtn.textContent = confirmLabel;
      cancelBtn.textContent = cancelLabel;
      okBtn.classList.toggle("danger", !!danger);
      okBtn.classList.toggle("primary", !danger);

      // Show on next frame so transition (if any) can run.
      requestAnimationFrame(() => back.classList.add("show"));

      let resolved = false;
      const close = (val) => {
        if (resolved) return;
        resolved = true;
        back.classList.remove("show");
        document.removeEventListener("keydown", onKey, true);
        // Remove from DOM so no stale listeners or backdrops linger.
        setTimeout(() => { if (back.parentNode) back.parentNode.removeChild(back); }, 50);
        resolve(val);
      };

      okBtn.addEventListener("click", (e) => { e.stopPropagation(); close(true); });
      cancelBtn.addEventListener("click", (e) => { e.stopPropagation(); close(false); });
      back.addEventListener("click", (e) => { if (e.target === back) close(false); });
      // Prevent dialog clicks bubbling to backdrop.
      dialog.addEventListener("click", (e) => e.stopPropagation());

      function onKey(e) {
        if (e.key === "Escape") { e.preventDefault(); close(false); }
        else if (e.key === "Enter" && document.activeElement !== cancelBtn) {
          e.preventDefault(); close(true);
        }
      }
      document.addEventListener("keydown", onKey, true);

      // Focus the cancel button by default (safer for destructive actions).
      setTimeout(() => (danger ? cancelBtn : okBtn).focus(), 0);
    });
  }
  window.confirmModal = confirmModal;

  // ---------- Audience selector (audience.html) ----------
  const audOptions = $$(".aud-option");

  function snapshotAudience() {
    const selected = $(".aud-option.selected");
    const note = $("#aud-impact");
    return {
      value: selected ? selected.dataset.value : null,
      noteText: note ? note.textContent : "",
      tagPerm: (() => {
        const checked = $("input[name=tagperm]:checked");
        return checked ? checked.value : null;
      })()
    };
  }

  const AUD_LABELS = {
    public: "Visible to anyone on the internet. New posts will be indexed by search engines unless you turn that off separately.",
    friends: "Visible to your 312 accepted friends. Not visible to friends-of-friends.",
    list: "Visible only to a custom list you select per-post. New posts default to the most recently used list.",
    me: "Visible only to you. Use this for drafts and journaling."
  };

  function applyAudienceSelection(value) {
    audOptions.forEach((o) => {
      const match = o.dataset.value === value;
      o.classList.toggle("selected", match);
      const radio = $("input[type=radio]", o);
      if (radio) radio.checked = match;
    });
    const note = $("#aud-impact");
    if (note && AUD_LABELS[value]) note.textContent = AUD_LABELS[value];
  }

  // Track baseline "saved" state so Discard reliably reverts.
  let audBaseline = audOptions.length ? snapshotAudience() : null;

  audOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      applyAudienceSelection(opt.dataset.value);
      markAudienceDirty();
    });
  });

  function markAudienceDirty() {
    const cur = snapshotAudience();
    const dirty = !audBaseline || cur.value !== audBaseline.value || cur.tagPerm !== audBaseline.tagPerm;
    const bar = $("#aud-actions");
    if (bar) bar.classList.toggle("is-dirty", dirty);
    const status = $("#aud-dirty-status");
    if (status) status.textContent = dirty ? "Unsaved changes" : "";
  }

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
      audBaseline = snapshotAudience();
      markAudienceDirty();
      const label = selected ? selected.querySelector("h4").textContent : "Friends";
      const banner = $("#aud-saved");
      if (banner) {
        banner.textContent = "Saved — default audience set to " + label;
        banner.style.display = "block";
        setTimeout(() => (banner.style.display = "none"), 3000);
      }
      showToast("Saved — default audience set to " + label);
    });
  }

  const discardAud = $("#aud-discard");
  if (discardAud) {
    discardAud.addEventListener("click", () => {
      if (!audBaseline) return;
      applyAudienceSelection(audBaseline.value);
      if (audBaseline.tagPerm) {
        $$("input[name=tagperm]").forEach((r) => { r.checked = r.value === audBaseline.tagPerm; });
      }
      markAudienceDirty();
      const banner = $("#aud-saved");
      if (banner) {
        banner.textContent = "Changes discarded.";
        banner.style.display = "block";
        setTimeout(() => (banner.style.display = "none"), 2500);
      }
      showToast("Changes discarded.");
    });
  }

  // Tag permission radios — autosave with toast feedback.
  $$("input[name=tagperm]").forEach((r) => {
    r.addEventListener("change", () => {
      if (!r.checked) return;
      const label = r.closest("label");
      const text = label ? label.textContent.trim() : r.value;
      audBaseline = snapshotAudience();
      markAudienceDirty();
      showToast("Tagging permission updated — " + text);
    });
  });

  // ---------- Tag queue (tag-review.html) ----------
  // Counts: header counter (#queue-count-header) + sidebar badge (#queue-count-badge).
  function refreshQueueCount() {
    const n = $$(".tag-card").length;
    $$("[data-queue-count]").forEach((el) => { el.textContent = n; });
    const empty = $("#queue-empty");
    if (empty) empty.style.display = n === 0 ? "block" : "none";
    const bulk = $("#approve-all");
    const hideAll = $("#hide-all");
    [bulk, hideAll].forEach((b) => { if (b) b.disabled = n === 0; });
  }

  function removeCardWithFeedback(card, msg) {
    card.style.opacity = "0";
    card.style.transition = "opacity .18s";
    setTimeout(() => { card.remove(); refreshQueueCount(); }, 180);
    if (msg) showToast(msg);
  }

  $$(".tag-card").forEach((card) => {
    const approve = $("[data-act=approve]", card);
    const hide = $("[data-act=hide]", card);
    const block = $("[data-act=block]", card);
    const who = card.dataset.poster || "this person";
    if (approve) approve.addEventListener("click", () => {
      removeCardWithFeedback(card, "Tag from " + who + " approved.");
    });
    if (hide) hide.addEventListener("click", () => {
      removeCardWithFeedback(card, "Tag from " + who + " hidden.");
    });
    if (block) block.addEventListener("click", async () => {
      const ok = await confirmModal({
        title: "Block " + who + "?",
        body: "They won't be able to tag you, message you, or see your posts. You can undo this in Settings → Blocked.",
        confirmLabel: "Block",
        danger: true
      });
      if (ok) removeCardWithFeedback(card, who + " blocked.");
    });
  });

  const approveAll = $("#approve-all");
  if (approveAll) approveAll.addEventListener("click", async () => {
    const n = $$(".tag-card").length;
    if (n === 0) return;
    const ok = await confirmModal({
      title: "Approve all " + n + " pending tags?",
      body: "These tags will appear on your profile and in your friends' feeds. You can remove a tag later but it may already have been seen.",
      confirmLabel: "Approve all"
    });
    if (ok) {
      $$(".tag-card").forEach((c) => c.remove());
      refreshQueueCount();
      showToast("Approved " + n + " tags.");
    }
  });

  const hideAll = $("#hide-all");
  if (hideAll) hideAll.addEventListener("click", async () => {
    const n = $$(".tag-card").length;
    if (n === 0) return;
    const ok = await confirmModal({
      title: "Hide all " + n + " pending tags?",
      body: "Hidden tags won't appear on your profile. The original posts are unchanged and still visible to their original audiences.",
      confirmLabel: "Hide all"
    });
    if (ok) {
      $$(".tag-card").forEach((c) => c.remove());
      refreshQueueCount();
      showToast("Hid " + n + " tags.");
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
    const visible = $("#post-count").textContent;
    const ok = await confirmModal({
      title: "Restrict matching posts to " + target + "?",
      body: "This will change the audience on every visible post above (about " + visible + " posts). This cannot be reversed in bulk — each post must be opened individually to widen the audience again.",
      confirmLabel: "Yes, restrict them",
      danger: true
    });
    if (!ok) return;
    let count = 0;
    $$(".post-row").forEach((row) => {
      if (row.style.display === "none") return;
      const tag = row.querySelector(".aud-tag");
      tag.className = "aud-tag " + (target === "Public" ? "public" : target === "Friends" ? "friends" : "me");
      tag.textContent = target;
      row.dataset.aud = target.toLowerCase() === "only me" ? "me" : target.toLowerCase();
      count++;
    });
    showToast("Restricted " + count + " posts to " + target + ".");
  });

  // ---------- Muted words (blocked-words.html) ----------
  const mutedList = $("#muted-list");
  const mutedForm = $("#muted-form");
  const mutedInput = $("#muted-input");
  const mutedError = $("#muted-error");

  function setMutedError(msg) {
    if (!mutedError) return;
    mutedError.textContent = msg || "";
    mutedError.style.display = msg ? "block" : "none";
  }

  function existingChipWords() {
    if (!mutedList) return [];
    return Array.from(mutedList.querySelectorAll(".muted-chip"))
      .map((c) => (c.dataset.word || c.textContent.replace(/×/g, "").trim()).toLowerCase());
  }

  function attachChipRemoval(chip) {
    const btn = chip.querySelector("button");
    if (!btn) return;
    btn.setAttribute("aria-label", "Remove " + (chip.dataset.word || "entry"));
    btn.addEventListener("click", () => {
      const word = chip.dataset.word || chip.textContent.replace(/×/g, "").trim();
      const next = chip.nextSibling;
      const parent = chip.parentNode;
      chip.remove();
      updateMutedCount();
      showToast("Removed “" + word + "”.", {
        undoLabel: "Undo",
        onUndo: () => {
          if (next && next.parentNode === parent) parent.insertBefore(chip, next);
          else parent.appendChild(chip);
          updateMutedCount();
        }
      });
    });
  }

  function addMutedChip(word) {
    const chip = document.createElement("span");
    chip.className = "muted-chip";
    chip.dataset.word = word;
    const safe = word.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    chip.innerHTML = safe + ' <button type="button" aria-label="Remove ' + safe + '">×</button>';
    attachChipRemoval(chip);
    mutedList.appendChild(chip);
  }

  function updateMutedCount() {
    const c = $("#muted-count");
    if (c && mutedList) c.textContent = mutedList.querySelectorAll(".muted-chip").length;
  }

  if (mutedForm) {
    mutedForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = mutedInput.value.trim();
      if (!v) { setMutedError("Type a word or phrase to mute."); return; }
      const existing = existingChipWords();
      if (existing.includes(v.toLowerCase())) {
        setMutedError("“" + v + "” is already in your muted list.");
        mutedInput.focus();
        return;
      }
      setMutedError("");
      addMutedChip(v);
      mutedInput.value = "";
      updateMutedCount();
      showToast("Muted “" + v + "”.");
    });
    if (mutedInput) {
      mutedInput.addEventListener("input", () => setMutedError(""));
    }
  }

  if (mutedList) {
    Array.from(mutedList.querySelectorAll(".muted-chip")).forEach((chip) => {
      if (!chip.dataset.word) {
        chip.dataset.word = chip.textContent.replace(/×/g, "").trim();
      }
      attachChipRemoval(chip);
    });
    updateMutedCount();
  }

  // Blocked-words: scope checkboxes + duration autosave feedback.
  $$("[data-autosave-scope] input[type=checkbox]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const label = cb.closest("label");
      const text = label ? label.textContent.trim() : "Setting";
      showToast((cb.checked ? "Enabled" : "Disabled") + " — " + text + ".");
    });
  });
  $$("[data-autosave-scope] select").forEach((sel) => {
    sel.addEventListener("change", () => {
      showToast("Mute duration set to " + sel.value + ".");
    });
  });

  refreshQueueCount();
})();

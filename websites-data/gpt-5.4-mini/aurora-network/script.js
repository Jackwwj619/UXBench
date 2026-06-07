(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

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

  // ---------- Toast helper ----------
  function showToast(message, kind = "success", durationMs = 4000) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.classList.remove("success", "info");
    toast.classList.add(kind);
    toast.textContent = message;
    requestAnimationFrame(() => toast.classList.add("show"));
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("show"), durationMs);
  }
  window.showToast = showToast;

  function flashInlineConfirm(target, message) {
    if (!target) return;
    let badge = target.querySelector(":scope > .inline-confirm");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "inline-confirm";
      target.appendChild(badge);
    }
    badge.textContent = message;
    requestAnimationFrame(() => badge.classList.add("show"));
    clearTimeout(badge._timer);
    badge._timer = setTimeout(() => badge.classList.remove("show"), 2500);
  }

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
      $$(".aud-option .inline-confirm").forEach((b) => b.classList.remove("show"));
      flashInlineConfirm(opt, "Selected — press Save default to apply");
    });
  });

  // Tag permission group — echo active rule
  const tagPerm = $("#tagperm-group");
  if (tagPerm) {
    const summary = $("#tagperm-summary");
    const labels = {
      anyone: "Anyone on Aurora",
      follow: "People you follow",
      friends: "Only your friends",
      nobody: "Nobody"
    };
    tagPerm.addEventListener("change", (e) => {
      const v = e.target && e.target.value;
      if (!v || !summary) return;
      summary.innerHTML = `Active rule: <strong>${labels[v]}</strong> can tag you. <span class="inline-confirm show" style="margin-left:6px;">Saved</span>`;
    });
  }

  // + New list composer
  const newListBtn = $("#new-list-btn");
  if (newListBtn) {
    const composer = $("#new-list-composer");
    const nameInput = $("#new-list-name");
    const status = $("#new-list-status");
    newListBtn.addEventListener("click", () => {
      const open = composer.classList.toggle("show");
      newListBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open && nameInput) nameInput.focus();
    });
    const cancel = $("#new-list-cancel");
    if (cancel) cancel.addEventListener("click", () => {
      composer.classList.remove("show");
      newListBtn.setAttribute("aria-expanded", "false");
      if (nameInput) nameInput.value = "";
      if (status) status.textContent = "";
    });
    const save = $("#new-list-save");
    if (save) save.addEventListener("click", () => {
      const name = (nameInput && nameInput.value || "").trim();
      if (!name) {
        if (status) status.textContent = "Give the list a name first.";
        if (nameInput) nameInput.focus();
        return;
      }
      const lists = document.querySelector(".custom-lists");
      if (lists) {
        const row = document.createElement("div");
        row.className = "list-row";
        row.innerHTML = `
          <div>
            <h4 style="margin:0; font-size:14px;">${name.replace(/</g, "&lt;")}</h4>
            <p class="meta">0 people · just created</p>
          </div>
          <div class="member-chips"><span class="member-chip">+</span></div>`;
        const composerEl = $("#new-list-composer");
        composerEl.parentNode.insertBefore(row, composerEl);
      }
      if (nameInput) nameInput.value = "";
      composer.classList.remove("show");
      newListBtn.setAttribute("aria-expanded", "false");
      showToast(`Created list "${name}". Add members from your friends list.`, "success");
    });
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
      const label = selected ? selected.querySelector("h4").textContent : "Friends";
      const banner = $("#aud-saved");
      banner.textContent = "Saved — default audience set to " + label;
      banner.style.display = "block";
      setTimeout(() => (banner.style.display = "none"), 3000);
      showToast(`Default audience saved: ${label}.`, "success");
    });
  }

  // ---------- Tag queue (tag-review.html) ----------
  function refreshQueueCount() {
    const n = $$(".tag-card").length;
    const counter = $("#queue-count");
    if (counter) counter.textContent = n;
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
    const ok = await confirmModal({
      title: "Approve all 7 pending tags?",
      body: "These tags will appear on your profile and in your friends' feeds. You can remove a tag later but it may already have been seen.",
      confirmLabel: "Approve all"
    });
    if (ok) { $$(".tag-card").forEach((c) => c.remove()); refreshQueueCount(); }
  });

  // ---------- Past posts (past-posts.html) ----------
  const filterYear = $("#filter-year");
  const filterAud = $("#filter-aud");
  const filterVis = $("#filter-vis");
  const bulkTarget = $("#bulk-target");

  function updateStickySummary() {
    const yLabel = filterYear && filterYear.value !== "all" ? filterYear.value : "All years";
    const aLabel = filterAud && filterAud.value !== "all"
      ? (filterAud.options[filterAud.selectedIndex].textContent)
      : "Any audience";
    const vLabel = filterVis && filterVis.value !== "all"
      ? (filterVis.options[filterVis.selectedIndex].textContent)
      : null;
    const scopeEl = $("#sticky-scope");
    if (scopeEl) {
      scopeEl.textContent = vLabel ? `${yLabel} · ${aLabel} · ${vLabel}` : `${yLabel} · ${aLabel}`;
    }
    const actionEl = $("#sticky-action");
    if (actionEl && bulkTarget) actionEl.textContent = bulkTarget.value;
    const countEl = $("#sticky-count");
    const postCount = $("#post-count");
    if (countEl && postCount) countEl.textContent = postCount.textContent;
  }

  function applyPostFilter() {
    const y = filterYear ? filterYear.value : "all";
    const a = filterAud ? filterAud.value : "all";
    const v = filterVis ? filterVis.value : "all";
    $$(".post-row").forEach((row) => {
      const okY = y === "all" || row.dataset.year === y;
      const okA = a === "all" || row.dataset.aud === a;
      const okV = v === "all"
        || (v === "hidden" && row.dataset.aud === "me")
        || (v === "visible" && row.dataset.aud !== "me");
      row.style.display = okY && okA && okV ? "" : "none";
    });
    const visible = $$(".post-row").filter((r) => r.style.display !== "none").length;
    const c = $("#post-count");
    if (c) c.textContent = visible;
    updateStickySummary();
  }
  if (filterYear) filterYear.addEventListener("change", applyPostFilter);
  if (filterAud) filterAud.addEventListener("change", applyPostFilter);
  if (filterVis) filterVis.addEventListener("change", applyPostFilter);
  if (bulkTarget) bulkTarget.addEventListener("change", updateStickySummary);
  if (filterYear || filterAud || filterVis) updateStickySummary();

  const bulkRestrict = $("#bulk-restrict");
  if (bulkRestrict) bulkRestrict.addEventListener("click", async () => {
    const target = $("#bulk-target").value;
    const beforeCount = parseInt($("#post-count").textContent, 10) || 0;
    const ok = await confirmModal({
      title: "Restrict matching posts to " + target + "?",
      body: "This will change the audience on every visible post above (about " + beforeCount + " posts). This cannot be reversed in bulk — each post must be opened individually to widen the audience again.",
      confirmLabel: "Yes, restrict them",
      danger: true
    });
    if (!ok) return;
    let changed = 0;
    $$(".post-row").forEach((row) => {
      if (row.style.display === "none") return;
      const tag = row.querySelector(".aud-tag");
      tag.className = "aud-tag " + (target === "Public" ? "public" : target === "Friends" ? "friends" : "me");
      tag.textContent = target;
      row.dataset.aud = target.toLowerCase() === "only me" ? "me" : target.toLowerCase();
      changed += 1;
    });
    applyPostFilter();
    showToast(`Updated ${changed} post${changed === 1 ? "" : "s"} to "${target}". Audience changes saved.`, "success", 5000);
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
      btn.addEventListener("click", (e) => {
        e.target.closest(".muted-chip").remove();
        updateMutedCount();
      });
    });
    updateMutedCount();
  }

  refreshQueueCount();

  // ---------- Mute duration feedback (blocked-words.html) ----------
  const muteDuration = $("#mute-duration");
  const muteDurationStatus = $("#mute-duration-status");
  if (muteDuration && muteDurationStatus) {
    const explain = {
      forever: "<strong>forever</strong> — applies to all words above until you remove or change them.",
      "30": "for the next <strong>30 days</strong> — words will automatically unmute on " + new Date(Date.now() + 30*24*3600*1000).toLocaleDateString() + ".",
      "7": "for the next <strong>7 days</strong> — words will automatically unmute on " + new Date(Date.now() + 7*24*3600*1000).toLocaleDateString() + ".",
      "1": "for the next <strong>24 hours</strong> — words will automatically unmute tomorrow."
    };
    muteDuration.addEventListener("change", () => {
      muteDurationStatus.innerHTML = "Currently muted " + (explain[muteDuration.value] || "");
      showToast("Mute duration updated.", "success", 3000);
    });
  }
})();

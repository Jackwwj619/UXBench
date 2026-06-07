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

  // ---------- Audience selector (audience.html) ----------
  const audLabels = {
    public: "Visible to anyone on the internet. New posts will be indexed by search engines unless you turn that off separately.",
    friends: "Visible to your 312 accepted friends. Not visible to friends-of-friends.",
    list: "Visible only to a custom list you select per-post. New posts default to the most recently used list.",
    me: "Visible only to you. Use this for drafts and journaling."
  };
  function applyAudSelection(val) {
    $$(".aud-option").forEach((o) => {
      const isMatch = o.dataset.value === val;
      o.classList.toggle("selected", isMatch);
      const radio = $("input[type=radio]", o);
      if (radio) radio.checked = isMatch;
    });
    const note = $("#aud-impact");
    if (note) note.textContent = audLabels[val] || "";
  }
  // Snapshot the saved value at page load for Discard support
  let savedAudValue = (() => {
    const sel = $(".aud-option.selected");
    return sel ? sel.dataset.value : "friends";
  })();

  $$(".aud-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      applyAudSelection(opt.dataset.value);
    });
  });

  function showAudBanner(message, kind) {
    const banner = $("#aud-saved");
    if (!banner) return;
    banner.textContent = message;
    if (kind === "info") {
      banner.style.background = "#eef0fb";
      banner.style.borderColor = "#cdd2ec";
      banner.style.color = "#2a2566";
    } else {
      banner.style.background = "#e7f6ec";
      banner.style.borderColor = "#b6e0c4";
      banner.style.color = "#1f6a3b";
    }
    banner.style.display = "block";
    clearTimeout(showAudBanner._t);
    showAudBanner._t = setTimeout(() => (banner.style.display = "none"), 3000);
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
      savedAudValue = val;
      const labelText = selected ? selected.querySelector("h4").textContent : "Friends";
      showAudBanner("✓ Saved — default audience set to " + labelText, "ok");
      const orig = saveAud.textContent;
      saveAud.textContent = "✓ Saved";
      saveAud.disabled = true;
      setTimeout(() => { saveAud.textContent = orig; saveAud.disabled = false; }, 1800);
    });
  }

  const discardAud = $("#aud-discard");
  if (discardAud) {
    discardAud.addEventListener("click", () => {
      applyAudSelection(savedAudValue);
      showAudBanner("Changes discarded — reverted to your saved selection.", "info");
    });
  }

  // ---------- New list flow (audience.html) ----------
  const newListBtn = $("#new-list-btn");
  const newListForm = $("#new-list-form");
  const newListCancel = $("#new-list-cancel");
  const newListName = $("#new-list-name");
  const newListMembers = $("#new-list-members");
  const newListError = $("#new-list-error");
  function setNewListOpen(open) {
    if (!newListForm) return;
    newListForm.style.display = open ? "flex" : "none";
    if (newListBtn) newListBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open && newListName) {
      newListError.style.display = "none";
      newListError.textContent = "";
      setTimeout(() => newListName.focus(), 0);
    }
  }
  if (newListBtn && newListForm) {
    newListBtn.addEventListener("click", () => setNewListOpen(newListForm.style.display === "none"));
  }
  if (newListCancel) {
    newListCancel.addEventListener("click", () => {
      newListName.value = "";
      newListMembers.value = "";
      setNewListOpen(false);
    });
  }
  if (newListForm) {
    newListForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (newListName.value || "").trim();
      if (!name) {
        newListError.textContent = "Please enter a name for the list.";
        newListError.style.display = "block";
        return;
      }
      const existing = $$(".list-row h4").map((h) => h.textContent.trim().toLowerCase());
      if (existing.includes(name.toLowerCase())) {
        newListError.textContent = 'A list named "' + name + '" already exists.';
        newListError.style.display = "block";
        return;
      }
      const members = (newListMembers.value || "")
        .split(",").map((s) => s.trim()).filter(Boolean);
      const container = newListForm.parentElement;
      const row = document.createElement("div");
      row.className = "list-row";
      const initials = (name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("") || "L").toUpperCase();
      row.innerHTML = `
        <div>
          <h4 style="margin:0; font-size:14px;">${name.replace(/</g, "&lt;")}</h4>
          <p class="meta">${members.length} ${members.length === 1 ? "person" : "people"} · just created</p>
        </div>
        <div class="member-chips"><span class="member-chip">${initials.slice(0,2)}</span></div>`;
      container.appendChild(row);
      newListName.value = "";
      newListMembers.value = "";
      setNewListOpen(false);
      showAudBanner('✓ Created list "' + name + '".', "ok");
    });
  }

  // ---------- Tag queue (tag-review.html) ----------
  function refreshQueueCount() {
    const n = $$(".tag-card").length;
    // Both header counter and sidebar badge update atomically from the same source
    const header = $("#queue-count");
    if (header) header.textContent = n;
    const badge = $("#queue-badge");
    if (badge) badge.textContent = n;
    // Update the bulk-bar wording so "tags waiting for review" agrees with count
    const bulkLabel = $(".bulk-bar span");
    if (bulkLabel && bulkLabel.firstChild) {
      bulkLabel.innerHTML = '<strong id="queue-count">' + n + '</strong> ' + (n === 1 ? 'tag' : 'tags') + ' waiting for review';
    }
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

  function getMutedWords() {
    if (!mutedList) return [];
    return Array.from(mutedList.querySelectorAll(".muted-chip"))
      .map((c) => (c.firstChild ? c.firstChild.textContent : "").trim());
  }
  function addMutedChip(word) {
    const chip = document.createElement("span");
    chip.className = "muted-chip";
    chip.innerHTML = `${word.replace(/</g, "&lt;")} <button aria-label="Remove">×</button>`;
    chip.querySelector("button").addEventListener("click", () => {
      chip.remove();
      updateMutedCount();
    });
    mutedList.appendChild(chip);
    return chip;
  }
  function updateMutedCount() {
    const c = $("#muted-count");
    if (c) c.textContent = mutedList ? mutedList.children.length : 0;
  }
  function showMutedError(msg) {
    const err = $("#muted-error");
    if (!err) return;
    err.textContent = msg;
    err.style.display = msg ? "block" : "none";
    if (msg) {
      clearTimeout(showMutedError._t);
      showMutedError._t = setTimeout(() => { err.style.display = "none"; }, 4000);
    }
  }
  function flashChip(chip) {
    if (!chip) return;
    const prev = chip.style.background;
    chip.style.transition = "background .25s";
    chip.style.background = "#ffe3a3";
    setTimeout(() => { chip.style.background = prev; }, 700);
  }
  if (mutedForm) {
    mutedForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = mutedInput.value.trim();
      if (!v) return;
      const norm = v.toLowerCase();
      const existing = Array.from(mutedList.querySelectorAll(".muted-chip"))
        .find((c) => (c.firstChild ? c.firstChild.textContent.trim().toLowerCase() : "") === norm);
      if (existing) {
        showMutedError('You\u2019re already muting "' + v + '".');
        flashChip(existing);
        existing.scrollIntoView({ behavior: "smooth", block: "nearest" });
        return;
      }
      showMutedError("");
      addMutedChip(v);
      mutedInput.value = "";
      updateMutedCount();
    });
  }

  // ---------- Export / Import muted words ----------
  const exportBtn = $("#export-words");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const words = getMutedWords();
      if (!words.length) {
        showMutedError("No muted words to export yet.");
        return;
      }
      const blob = new Blob([words.join("\n") + "\n"], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "aurora-muted-words.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      const orig = exportBtn.textContent;
      exportBtn.textContent = "✓ Downloaded";
      exportBtn.disabled = true;
      setTimeout(() => { exportBtn.textContent = orig; exportBtn.disabled = false; }, 1800);
    });
  }
  const importBtn = $("#import-words");
  if (importBtn) {
    importBtn.addEventListener("click", () => {
      let picker = $("#muted-import-input");
      if (!picker) {
        picker = document.createElement("input");
        picker.type = "file";
        picker.accept = ".txt,text/plain";
        picker.id = "muted-import-input";
        picker.style.display = "none";
        document.body.appendChild(picker);
        picker.addEventListener("change", () => {
          const file = picker.files && picker.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            const lines = String(reader.result || "")
              .split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
            const existing = new Set(getMutedWords().map((w) => w.toLowerCase()));
            let added = 0, skipped = 0;
            lines.forEach((line) => {
              if (existing.has(line.toLowerCase())) { skipped++; return; }
              addMutedChip(line);
              existing.add(line.toLowerCase());
              added++;
            });
            updateMutedCount();
            showMutedError("");
            const msg = "Imported " + added + " · skipped " + skipped + " duplicate" + (skipped === 1 ? "" : "s");
            const err = $("#muted-error");
            if (err) {
              err.style.color = "var(--ok)";
              err.textContent = msg;
              err.style.display = "block";
              setTimeout(() => { err.style.display = "none"; err.style.color = ""; }, 3500);
            }
            picker.value = "";
          };
          reader.readAsText(file);
        });
      }
      picker.click();
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

  // ---------- Mobile sidebar toggle ----------
  const navToggle = $(".nav-toggle");
  const sideNav = $("#side-nav");
  if (navToggle && sideNav) {
    navToggle.addEventListener("click", () => {
      const open = sideNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close after navigating from the in-page nav on mobile
    sideNav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a && window.matchMedia("(max-width: 880px)").matches) {
        sideNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
})();

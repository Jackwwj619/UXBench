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
      const banner = $("#aud-saved");
      banner.textContent = "Saved — default audience set to " + (selected ? selected.querySelector("h4").textContent : "Friends");
      banner.style.display = "block";
      setTimeout(() => (banner.style.display = "none"), 3000);
    });
  }

  // ---------- Tag queue (tag-review.html) ----------
  function refreshQueueCount() {
    const n = $$(".tag-card:not(.is-removing)").length;
    const counter = $("#queue-count");
    if (counter) counter.textContent = n;
    const badge = $("#queue-badge");
    if (badge) {
      badge.textContent = n;
      badge.style.display = n === 0 ? "none" : "";
    }
    const empty = $("#queue-empty");
    if (empty) empty.style.display = n === 0 ? "block" : "none";
  }

  function showQueueToast(msg) {
    const t = $("#queue-toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(showQueueToast._t);
    showQueueToast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function dismissCard(card, status) {
    if (card.classList.contains("is-removing")) return;
    card.classList.add("is-removing", "status-" + status);
    // Disable buttons immediately so the user can't double-act.
    $$("button", card).forEach((b) => { b.disabled = true; });
    // Stamp a status pill so the change is visible before removal.
    if (!$(".tag-status", card)) {
      const pill = document.createElement("span");
      pill.className = "tag-status status-" + status;
      pill.textContent =
        status === "approved" ? "✓ Approved" :
        status === "hidden"   ? "✓ Hidden" :
        status === "blocked"  ? "✓ Blocked" : "✓ Done";
      const info = $(".tag-info", card) || card;
      info.appendChild(pill);
    }
    refreshQueueCount();
    setTimeout(() => { card.remove(); refreshQueueCount(); }, 600);
  }

  $$(".tag-card").forEach((card) => {
    const approve = $("[data-act=approve]", card);
    const hide = $("[data-act=hide]", card);
    const block = $("[data-act=block]", card);
    if (approve) approve.addEventListener("click", () => {
      dismissCard(card, "approved");
      showQueueToast("Tag approved");
    });
    if (hide) hide.addEventListener("click", () => {
      dismissCard(card, "hidden");
      showQueueToast("Tag hidden — won't link to your profile");
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
        dismissCard(card, "blocked");
        showQueueToast(who + " blocked");
      }
    });
  });

  const approveAll = $("#approve-all");
  if (approveAll) approveAll.addEventListener("click", async () => {
    const remaining = $$(".tag-card:not(.is-removing)");
    if (remaining.length === 0) return;
    const ok = await confirmModal({
      title: "Approve all " + remaining.length + " pending tags?",
      body: "These tags will appear on your profile and in your friends' feeds. You can remove a tag later but it may already have been seen.",
      confirmLabel: "Approve all"
    });
    if (ok) {
      remaining.forEach((c) => dismissCard(c, "approved"));
      showQueueToast("Approved " + remaining.length + " tags");
    }
  });

  const hideAll = $("#hide-all");
  if (hideAll) hideAll.addEventListener("click", async () => {
    const remaining = $$(".tag-card:not(.is-removing)");
    if (remaining.length === 0) return;
    const ok = await confirmModal({
      title: "Hide all " + remaining.length + " pending tags?",
      body: "These tags won't link to your profile. The original posts stay up and remain visible to their audience — only the tag connection to you is removed. You can't undo all of these at once.",
      confirmLabel: "Hide all",
      danger: true
    });
    if (ok) {
      remaining.forEach((c) => dismissCard(c, "hidden"));
      showQueueToast("Hid " + remaining.length + " tags");
    }
  });

  // ---------- Auto-saved "Who can tag you?" (audience.html) ----------
  const tagPermGroup = $("#tagperm-group");
  const tagPermStatus = $("#tagperm-status");
  if (tagPermGroup && tagPermStatus) {
    tagPermGroup.addEventListener("change", (e) => {
      if (!e.target || e.target.name !== "tagperm") return;
      tagPermStatus.classList.remove("saved");
      tagPermStatus.textContent = "Saving…";
      clearTimeout(tagPermGroup._t);
      tagPermGroup._t = setTimeout(() => {
        tagPermStatus.textContent = "✓ Saved";
        tagPermStatus.classList.add("saved");
      }, 350);
    });
  }

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

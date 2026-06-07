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

  // ---------- Prompt modal (with input) ----------
  function promptModal({ title, body, placeholder = "", confirmLabel = "Create", initial = "" }) {
    return new Promise((resolve) => {
      let back = document.createElement("div");
      back.className = "modal-back show";
      back.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true">
          <h3></h3>
          <p></p>
          <input type="text" class="prompt-input" />
          <div class="modal-actions">
            <button data-role="cancel">Cancel</button>
            <button class="primary" data-role="confirm"></button>
          </div>
        </div>`;
      document.body.appendChild(back);
      back.querySelector("h3").textContent = title;
      back.querySelector("p").textContent = body;
      const input = back.querySelector(".prompt-input");
      input.placeholder = placeholder;
      input.value = initial;
      back.querySelector("[data-role=confirm]").textContent = confirmLabel;
      const close = (val) => { back.remove(); resolve(val); };
      back.querySelector("[data-role=confirm]").addEventListener("click", () => close(input.value.trim()));
      back.querySelector("[data-role=cancel]").addEventListener("click", () => close(null));
      back.addEventListener("click", (e) => { if (e.target === back) close(null); });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") close(input.value.trim());
        if (e.key === "Escape") close(null);
      });
      setTimeout(() => input.focus(), 30);
    });
  }

  // ---------- Info modal ----------
  function infoModal({ title, body, confirmLabel = "OK" }) {
    return new Promise((resolve) => {
      const back = document.createElement("div");
      back.className = "modal-back show";
      back.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true">
          <h3></h3>
          <p></p>
          <div class="modal-actions">
            <button class="primary" data-role="confirm"></button>
          </div>
        </div>`;
      document.body.appendChild(back);
      back.querySelector("h3").textContent = title;
      back.querySelector("p").textContent = body;
      back.querySelector("[data-role=confirm]").textContent = confirmLabel;
      const close = () => { back.remove(); resolve(); };
      back.querySelector("[data-role=confirm]").addEventListener("click", close);
      back.addEventListener("click", (e) => { if (e.target === back) close(); });
    });
  }

  // ---------- Toast ----------
  function showToast(msg, opts = {}) {
    let toast = document.getElementById("aurora-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "aurora-toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.toggle("toast-error", !!opts.error);
    toast.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove("show"), 2800);
  }
  window.showToast = showToast;

  // ---------- Placeholder sidebar/nav links ----------
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a.placeholder-link, a[href='#']");
    if (!a) return;
    if (a.classList.contains("placeholder-link") || (a.getAttribute("href") === "#" && !a.classList.contains("brand"))) {
      e.preventDefault();
      const label = a.dataset.section || a.textContent.trim() || "This section";
      showToast(label + " isn't available in this demo.");
    }
  });

  // ---------- Audience selector (audience.html) ----------
  // Track the originally-selected option so "Discard changes" can revert it.
  const initialAud = (() => {
    const sel = $(".aud-option.selected");
    return sel ? sel.dataset.value : null;
  })();
  function selectAud(val) {
    const target = $$(".aud-option").find((o) => o.dataset.value === val);
    if (!target) return;
    $$(".aud-option").forEach((o) => o.classList.remove("selected"));
    target.classList.add("selected");
    const radio = $("input[type=radio]", target);
    if (radio) radio.checked = true;
    const note = $("#aud-impact");
    if (note) {
      const labels = {
        public: "Visible to anyone on the internet. New posts will be indexed by search engines unless you turn that off separately.",
        friends: "Visible to your 312 accepted friends. Not visible to friends-of-friends.",
        list: "Visible only to a custom list you select per-post. New posts default to the most recently used list.",
        me: "Visible only to you. Use this for drafts and journaling."
      };
      note.textContent = labels[val] || "";
    }
  }

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
      banner.style.background = "#e7f6ec";
      banner.style.borderColor = "#b6e0c4";
      banner.style.color = "#1f6a3b";
      setTimeout(() => (banner.style.display = "none"), 3000);
    });
  }

  // ---------- Discard changes (audience.html) ----------
  const discardBtn = $("#aud-discard");
  if (discardBtn) {
    discardBtn.addEventListener("click", () => {
      const current = $(".aud-option.selected");
      const currentVal = current ? current.dataset.value : null;
      const banner = $("#aud-saved");
      if (initialAud && currentVal !== initialAud) {
        selectAud(initialAud);
        if (banner) {
          const label = $(".aud-option.selected h4");
          banner.textContent = "Changes discarded — reverted to " + (label ? label.textContent : initialAud) + ".";
          banner.style.display = "block";
          banner.style.background = "#fff4e1";
          banner.style.borderColor = "#f3d8a7";
          banner.style.color = "#7a4d10";
          setTimeout(() => (banner.style.display = "none"), 3000);
        }
      } else if (banner) {
        banner.textContent = "No unsaved changes to discard.";
        banner.style.display = "block";
        banner.style.background = "#f3f1fb";
        banner.style.borderColor = "#e7e3f3";
        banner.style.color = "#6b6489";
        setTimeout(() => (banner.style.display = "none"), 2500);
      }
    });
  }

  // ---------- + New list / list-row interactions (audience.html) ----------
  const newListBtn = $("#new-list-btn");
  const customListsRoot = $("#custom-lists");
  if (newListBtn && customListsRoot) {
    newListBtn.addEventListener("click", async () => {
      const name = await promptModal({
        title: "Create a new custom list",
        body: "Lists are private to you. People you add aren't notified.",
        placeholder: "e.g. Book club, Neighbors, Studio mates",
        confirmLabel: "Create list"
      });
      if (!name) return;
      const row = document.createElement("div");
      row.className = "list-row";
      row.tabIndex = 0;
      row.setAttribute("role", "button");
      row.dataset.list = name;
      row.dataset.count = "0";
      row.innerHTML = `
        <div>
          <h4 style="margin:0; font-size:14px;"></h4>
          <p class="meta">0 people · just created</p>
        </div>
        <div class="member-chips" aria-hidden="true"><span class="member-chip">+</span></div>`;
      row.querySelector("h4").textContent = name;
      customListsRoot.appendChild(row);
      attachListRow(row);
      showToast('List "' + name + '" created.');
    });
  }

  function attachListRow(row) {
    const open = async () => {
      const listName = row.dataset.list || "List";
      const count = row.dataset.count || "0";
      await infoModal({
        title: "Manage " + listName,
        body: "This list has " + count + " people. Member management isn't available in this demo, but the list is selectable as a per-post audience.",
        confirmLabel: "Got it"
      });
    };
    row.addEventListener("click", open);
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  }
  $$(".list-row[data-list]").forEach(attachListRow);

  // ---------- Import / Export muted words (blocked-words.html) ----------
  const importBtn = $("#import-txt");
  const importInput = $("#import-txt-input");
  if (importBtn && importInput) {
    importBtn.addEventListener("click", () => importInput.click());
    importInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const lines = String(reader.result || "")
          .split(/\r?\n/)
          .map((s) => s.trim())
          .filter(Boolean);
        let added = 0;
        lines.forEach((w) => {
          if (typeof addMutedChip === "function") { addMutedChip(w); added++; }
        });
        if (typeof updateMutedCount === "function") updateMutedCount();
        showToast("Imported " + added + " word" + (added === 1 ? "" : "s") + " from " + file.name + ".");
        importInput.value = "";
      };
      reader.onerror = () => showToast("Could not read " + file.name + ".", { error: true });
      reader.readAsText(file);
    });
  }

  const exportBtn = $("#export-txt");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const list = $("#muted-list");
      if (!list) return;
      const words = Array.from(list.querySelectorAll(".muted-chip"))
        .map((c) => c.childNodes[0] && c.childNodes[0].textContent.trim())
        .filter(Boolean);
      const blob = new Blob([words.join("\n") + "\n"], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "aurora-muted-words.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast("Exported " + words.length + " muted word" + (words.length === 1 ? "" : "s") + ".");
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

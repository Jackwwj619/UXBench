/* microsoft-privacy-clone — shared interactions */

(function () {
  "use strict";

  /* ---------- Toast helper ---------- */
  function ensureToastContainer() {
    let c = document.getElementById("toastContainer");
    if (!c) {
      c = document.createElement("div");
      c.id = "toastContainer";
      c.className = "toast-container";
      c.setAttribute("role", "status");
      c.setAttribute("aria-live", "polite");
      document.body.appendChild(c);
    }
    return c;
  }
  function showToast(message, opts) {
    opts = opts || {};
    const container = ensureToastContainer();
    const toast = document.createElement("div");
    toast.className = "toast";
    const msg = document.createElement("span");
    msg.className = "toast-msg";
    msg.textContent = message;
    toast.appendChild(msg);
    let removed = false;
    const dismiss = () => {
      if (removed) return;
      removed = true;
      toast.remove();
    };
    if (opts.actionLabel && typeof opts.onAction === "function") {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "toast-action";
      btn.textContent = opts.actionLabel;
      btn.addEventListener("click", () => {
        opts.onAction();
        dismiss();
      });
      toast.appendChild(btn);
    }
    container.appendChild(toast);
    setTimeout(dismiss, opts.duration || 4000);
    return { dismiss };
  }

  /* ---------- Dashboard: toggle "saved" feedback ---------- */
  const toggleList = document.getElementById("toggleList");
  const saveIndicator = document.getElementById("saveIndicator");
  let saveTimer = null;
  if (toggleList) {
    toggleList.addEventListener("change", (e) => {
      if (e.target.matches('input[type="checkbox"]')) {
        if (saveIndicator) {
          saveIndicator.textContent = "Saving…";
          saveIndicator.style.color = "var(--ms-text-secondary)";
          clearTimeout(saveTimer);
          saveTimer = setTimeout(() => {
            const setting = e.target.dataset.setting || "setting";
            const on = e.target.checked;
            saveIndicator.textContent =
              `Saved — ${setting} is now ${on ? "on" : "off"}.`;
            saveIndicator.style.color = "var(--ms-success)";
          }, 450);
        }
      }
    });
  }

  /* ---------- Dashboard: "Clear all activity" modal ---------- */
  const openDelete = document.getElementById("openDeleteModal");
  const deleteModal = document.getElementById("deleteModal");
  const confirmDelete = document.getElementById("confirmDelete");
  if (openDelete && deleteModal) {
    openDelete.addEventListener("click", () => deleteModal.classList.add("active"));
  }
  if (confirmDelete) {
    confirmDelete.addEventListener("click", () => {
      confirmDelete.textContent = "Clearing…";
      confirmDelete.disabled = true;
      setTimeout(() => {
        deleteModal.classList.remove("active");
        confirmDelete.textContent = "Yes, clear all";
        confirmDelete.disabled = false;
        const stats = document.querySelectorAll(".activity-card .card-stat");
        stats.forEach((s) => (s.textContent = "Cleared just now"));
        alert("All activity data has been queued for deletion. It may take up to 30 days to fully remove from backups.");
      }, 700);
    });
  }

  /* ---------- Generic modal close handlers ---------- */
  document.querySelectorAll("[data-modal-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".modal-backdrop")?.classList.remove("active");
    });
  });
  document.querySelectorAll(".modal-backdrop").forEach((bd) => {
    bd.addEventListener("click", (e) => {
      if (e.target === bd) bd.classList.remove("active");
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.active").forEach((m) =>
        m.classList.remove("active")
      );
    }
  });

  /* =====================================================
     BROWSE HISTORY PAGE
     ===================================================== */
  const historyTable = document.getElementById("historyTable");
  if (historyTable) {
    const rangeFilter = document.getElementById("rangeFilter");
    const deviceFilter = document.getElementById("deviceFilter");
    const searchFilter = document.getElementById("searchFilter");
    const emptyState = document.getElementById("emptyState");
    const infoBanner = document.getElementById("infoBanner");

    const rangeLabels = {
      "24h": "the last 24 hours",
      "7d": "the last 7 days",
      "30d": "the last 30 days",
      "90d": "the last 90 days",
    };
    function updateInfoBanner() {
      if (!infoBanner || !rangeFilter) return;
      const label = rangeLabels[rangeFilter.value] || "the selected range";
      const div = infoBanner.querySelector("div");
      if (div) {
        div.textContent =
          "This page shows browse activity from " + label +
          " across all devices where you’re signed in to Microsoft Edge.";
      }
    }

    function applyFilters() {
      const device = deviceFilter.value;
      const q = searchFilter.value.trim().toLowerCase();
      let visible = 0;
      historyTable.querySelectorAll("tbody tr").forEach((tr) => {
        const rowDevice = tr.dataset.device;
        const text = tr.textContent.toLowerCase();
        const deviceOk = device === "all" || rowDevice === device;
        const searchOk = !q || text.includes(q);
        const show = deviceOk && searchOk && !tr.classList.contains("removed");
        tr.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (emptyState) emptyState.style.display = visible === 0 ? "block" : "none";
      historyTable.style.display = visible === 0 ? "none" : "";
    }
    rangeFilter?.addEventListener("change", updateInfoBanner);
    deviceFilter?.addEventListener("change", applyFilters);
    searchFilter?.addEventListener("input", applyFilters);
    updateInfoBanner();

    historyTable.addEventListener("click", (e) => {
      const btn = e.target.closest(".icon-btn");
      if (!btn) return;
      const tr = btn.closest("tr");
      const tbody = tr.parentNode;
      const nextSibling = tr.nextSibling;
      const titleEl = tr.querySelector("strong");
      const label = titleEl ? titleEl.textContent : "Entry";
      tr.classList.add("row-removed");
      setTimeout(() => {
        tr.classList.add("removed");
        tr.remove();
        applyFilters();
        showToast("Removed “" + label + "”", {
          actionLabel: "Undo",
          duration: 5000,
          onAction: () => {
            tr.classList.remove("removed", "row-removed");
            if (nextSibling && nextSibling.parentNode === tbody) {
              tbody.insertBefore(tr, nextSibling);
            } else {
              tbody.appendChild(tr);
            }
            applyFilters();
          },
        });
      }, 220);
    });

    const clearAllBtn = document.getElementById("clearAllBtn");
    const clearAllModal = document.getElementById("clearAllModal");
    const confirmClearAll = document.getElementById("confirmClearAll");
    clearAllBtn?.addEventListener("click", () => clearAllModal?.classList.add("active"));
    confirmClearAll?.addEventListener("click", () => {
      const rows = historyTable.querySelectorAll("tbody tr");
      rows.forEach((r, i) => {
        setTimeout(() => {
          r.classList.add("row-removed");
          setTimeout(() => r.remove(), 200);
        }, i * 35);
      });
      setTimeout(() => {
        clearAllModal.classList.remove("active");
        applyFilters();
      }, rows.length * 35 + 250);
    });
  }

  /* =====================================================
     AD SETTINGS PAGE
     ===================================================== */
  const masterAd = document.getElementById("masterAdToggle");
  if (masterAd) {
    const changedBanner = document.getElementById("changedBanner");
    const savedBanner = document.getElementById("savedBanner");
    const serviceToggles = document.querySelectorAll(".service-toggle");
    const topicChecks = document.querySelectorAll('.checkbox-list input[type="checkbox"]');
    let dirty = false;

    // Snapshot initial values so Discard can restore them.
    const initialState = {
      master: masterAd.checked,
      services: Array.from(serviceToggles).map((t) => t.checked),
      topics: Array.from(topicChecks).map((c) => c.checked),
    };

    function markDirty() {
      dirty = true;
      if (changedBanner) changedBanner.style.display = "flex";
      if (savedBanner) savedBanner.style.display = "none";
    }

    function applyMasterUiState() {
      const on = masterAd.checked;
      serviceToggles.forEach((t) => {
        t.disabled = !on;
        const card = t.closest(".service-card");
        if (card) card.style.opacity = on ? "1" : "0.55";
      });
      topicChecks.forEach((c) => (c.disabled = !on));
    }

    masterAd.addEventListener("change", () => {
      applyMasterUiState();
      markDirty();
    });
    applyMasterUiState();
    if (changedBanner) changedBanner.style.display = "none";

    serviceToggles.forEach((t) => t.addEventListener("change", markDirty));
    topicChecks.forEach((c) => c.addEventListener("change", markDirty));

    document.getElementById("saveAdSettings")?.addEventListener("click", (e) => {
      e.preventDefault();
      if (changedBanner) changedBanner.style.display = "none";
      if (savedBanner) savedBanner.style.display = "flex";
      // Update baseline so subsequent Discard reverts to the just-saved state.
      initialState.master = masterAd.checked;
      initialState.services = Array.from(serviceToggles).map((t) => t.checked);
      initialState.topics = Array.from(topicChecks).map((c) => c.checked);
      dirty = false;
    });
    document.getElementById("resetAdSettings")?.addEventListener("click", (e) => {
      e.preventDefault();
      if (!dirty) {
        showToast("No unsaved changes to discard.");
        return;
      }
      // Restore initial values directly — no full page reload.
      masterAd.checked = initialState.master;
      serviceToggles.forEach((t, i) => { t.checked = initialState.services[i]; });
      topicChecks.forEach((c, i) => { c.checked = initialState.topics[i]; });
      applyMasterUiState();
      dirty = false;
      if (changedBanner) changedBanner.style.display = "none";
      if (savedBanner) savedBanner.style.display = "none";
      showToast("Changes discarded.");
    });
  }

  /* =====================================================
     DOWNLOAD DATA PAGE
     ===================================================== */
  const downloadForm = document.getElementById("downloadForm");
  if (downloadForm) {
    const rangePreset = document.getElementById("rangePreset");
    const customRange = document.getElementById("customRange");
    const customRange2 = document.getElementById("customRange2");
    rangePreset?.addEventListener("change", () => {
      const isCustom = rangePreset.value === "custom";
      if (customRange) customRange.style.display = isCustom ? "" : "none";
      if (customRange2) customRange2.style.display = isCustom ? "" : "none";
    });

    const agree = document.getElementById("agree");
    const submit = document.getElementById("submitDownload");
    const cats = document.querySelectorAll("[data-cat]");
    function updateSubmit() {
      const anyCat = Array.from(cats).some((c) => c.checked);
      submit.disabled = !(agree.checked && anyCat);
    }
    agree?.addEventListener("change", updateSubmit);
    cats.forEach((c) => c.addEventListener("change", updateSubmit));

    document.getElementById("selectAll")?.addEventListener("click", (e) => {
      e.preventDefault();
      cats.forEach((c) => (c.checked = true));
      updateSubmit();
    });
    document.getElementById("clearAll")?.addEventListener("click", (e) => {
      e.preventDefault();
      cats.forEach((c) => (c.checked = false));
      updateSubmit();
    });

    downloadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("emailDest").value.split(" ")[0];
      document.getElementById("successEmail").textContent = email;
      document.getElementById("reqId").textContent =
        "MSPRIV-" + Math.random().toString(36).slice(2, 10).toUpperCase();
      downloadForm.style.display = "none";
      document.getElementById("successCard").style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();

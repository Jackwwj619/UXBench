/* microsoft-privacy-clone — shared interactions */

(function () {
  "use strict";

  /* ---------- Helpers for modal multi-view ---------- */
  function showModalView(modalEl, viewName) {
    if (!modalEl) return;
    const views = modalEl.querySelectorAll(".modal-view");
    views.forEach((v) => {
      const isMatch = v.classList.contains("modal-view-" + viewName);
      v.hidden = !isMatch;
    });
  }
  function resetModalToConfirm(modalEl) {
    showModalView(modalEl, "confirm");
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

  /* ---------- Dashboard: hero CTA scroll ---------- */
  const checkupCta = document.getElementById("checkupCta");
  if (checkupCta) {
    checkupCta.addEventListener("click", (e) => {
      const target = document.getElementById("privacy-settings");
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  }

  /* ---------- Dashboard: "Clear all activity" modal ---------- */
  const openDelete = document.getElementById("openDeleteModal");
  const deleteModal = document.getElementById("deleteModal");
  const confirmDelete = document.getElementById("confirmDelete");
  if (openDelete && deleteModal) {
    openDelete.addEventListener("click", () => {
      resetModalToConfirm(deleteModal);
      deleteModal.classList.add("active");
    });
  }
  if (confirmDelete) {
    confirmDelete.addEventListener("click", () => {
      confirmDelete.textContent = "Clearing…";
      confirmDelete.disabled = true;
      setTimeout(() => {
        confirmDelete.textContent = "Yes, clear all";
        confirmDelete.disabled = false;
        const stats = document.querySelectorAll(".activity-card .card-stat");
        stats.forEach((s) => (s.textContent = "Cleared just now"));
        showModalView(deleteModal, "success");
      }, 700);
    });
  }

  /* ---------- Generic modal close handlers ---------- */
  document.querySelectorAll("[data-modal-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bd = btn.closest(".modal-backdrop");
      bd?.classList.remove("active");
      if (bd) setTimeout(() => resetModalToConfirm(bd), 200);
    });
  });
  document.querySelectorAll(".modal-backdrop").forEach((bd) => {
    bd.addEventListener("click", (e) => {
      if (e.target === bd) {
        bd.classList.remove("active");
        setTimeout(() => resetModalToConfirm(bd), 200);
      }
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.active").forEach((m) => {
        m.classList.remove("active");
        setTimeout(() => resetModalToConfirm(m), 200);
      });
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
    const visibleCount = document.getElementById("visibleCount");
    const totalCount = document.getElementById("totalCount");
    const rangeLabel = document.getElementById("rangeLabel");
    const deviceLabel = document.getElementById("deviceLabel");
    const infoBannerText = document.getElementById("infoBannerText");

    const RANGE_LABEL_MAP = {
      "24h": { label: "Last 24 hours", days: 1 },
      "7d":  { label: "Last 7 days",   days: 7 },
      "30d": { label: "Last 30 days",  days: 30 },
      "90d": { label: "Last 90 days",  days: 90 }
    };
    const DEVICE_LABEL_MAP = {
      "all":     "All devices",
      "windows": "Surface Pro 9",
      "mac":     "MacBook Pro",
      "phone":   "iPhone Edge"
    };

    function applyFilters() {
      const range = rangeFilter ? rangeFilter.value : "30d";
      const rangeInfo = RANGE_LABEL_MAP[range] || RANGE_LABEL_MAP["30d"];
      const device = deviceFilter.value;
      const q = searchFilter.value.trim().toLowerCase();
      let visible = 0;
      let total = 0;
      historyTable.querySelectorAll("tbody tr").forEach((tr) => {
        if (tr.classList.contains("removed")) return;
        total++;
        const rowDevice = tr.dataset.device;
        const rowAge = Number(tr.dataset.age || 0);
        const text = tr.textContent.toLowerCase();
        const deviceOk = device === "all" || rowDevice === device;
        const rangeOk = rowAge <= rangeInfo.days;
        const searchOk = !q || text.includes(q);
        const show = deviceOk && rangeOk && searchOk;
        tr.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (emptyState) emptyState.style.display = visible === 0 ? "block" : "none";
      historyTable.style.display = visible === 0 ? "none" : "";
      if (visibleCount) visibleCount.textContent = visible;
      if (totalCount) totalCount.textContent = total;
      if (rangeLabel) rangeLabel.textContent = rangeInfo.label;
      if (deviceLabel) deviceLabel.textContent = DEVICE_LABEL_MAP[device] || "All devices";
      if (infoBannerText) {
        const dev = device === "all" ? "across all devices where you’re signed in to Microsoft Edge" :
                                       `from ${DEVICE_LABEL_MAP[device]}`;
        infoBannerText.textContent =
          `Showing browse activity from the ${rangeInfo.label.toLowerCase()} ${dev}.`;
      }
    }
    rangeFilter?.addEventListener("change", applyFilters);
    deviceFilter?.addEventListener("change", applyFilters);
    searchFilter?.addEventListener("input", applyFilters);
    applyFilters();

    historyTable.addEventListener("click", (e) => {
      const btn = e.target.closest(".icon-btn");
      if (!btn) return;
      const tr = btn.closest("tr");
      tr.classList.add("row-removed");
      setTimeout(() => {
        tr.classList.add("removed");
        tr.remove();
        applyFilters();
      }, 220);
    });

    const clearAllBtn = document.getElementById("clearAllBtn");
    const clearAllModal = document.getElementById("clearAllModal");
    const confirmClearAll = document.getElementById("confirmClearAll");
    const clearAllBody = document.getElementById("clearAllBody");
    const clearAllSuccessMsg = document.getElementById("clearAllSuccessMsg");

    function visibleRows() {
      return Array.from(historyTable.querySelectorAll("tbody tr"))
        .filter((r) => r.style.display !== "none" && !r.classList.contains("removed"));
    }

    clearAllBtn?.addEventListener("click", () => {
      const rows = visibleRows();
      resetModalToConfirm(clearAllModal);
      if (rows.length === 0) {
        showModalView(clearAllModal, "noop");
      } else {
        if (clearAllBody) {
          clearAllBody.textContent =
            `This will permanently remove the ${rows.length} entr${rows.length === 1 ? "y" : "ies"} matching the current filters from your Microsoft account.`;
        }
      }
      clearAllModal?.classList.add("active");
    });

    confirmClearAll?.addEventListener("click", () => {
      const rows = visibleRows();
      if (rows.length === 0) {
        showModalView(clearAllModal, "noop");
        return;
      }
      confirmClearAll.disabled = true;
      confirmClearAll.textContent = "Clearing…";
      rows.forEach((r, i) => {
        setTimeout(() => {
          r.classList.add("row-removed");
          setTimeout(() => r.remove(), 200);
        }, i * 35);
      });
      setTimeout(() => {
        applyFilters();
        if (clearAllSuccessMsg) {
          clearAllSuccessMsg.textContent =
            `${rows.length} entr${rows.length === 1 ? "y" : "ies"} removed from your Microsoft account.`;
        }
        confirmClearAll.disabled = false;
        confirmClearAll.textContent = "Yes, clear all";
        showModalView(clearAllModal, "success");
      }, rows.length * 35 + 300);
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

    function markDirty() {
      dirty = true;
      if (changedBanner) changedBanner.style.display = "flex";
      if (savedBanner) savedBanner.style.display = "none";
    }

    function syncMaster() {
      const on = masterAd.checked;
      serviceToggles.forEach((t) => {
        t.disabled = !on;
        t.closest(".service-card").style.opacity = on ? "1" : "0.55";
      });
      topicChecks.forEach((c) => (c.disabled = !on));
      markDirty();
    }
    masterAd.addEventListener("change", syncMaster);
    syncMaster();
    dirty = false;
    if (changedBanner) changedBanner.style.display = "none";

    serviceToggles.forEach((t) => t.addEventListener("change", markDirty));
    topicChecks.forEach((c) => c.addEventListener("change", markDirty));

    document.getElementById("saveAdSettings")?.addEventListener("click", (e) => {
      e.preventDefault();
      if (changedBanner) changedBanner.style.display = "none";
      if (savedBanner) savedBanner.style.display = "flex";
      dirty = false;
    });
    document.getElementById("resetAdSettings")?.addEventListener("click", (e) => {
      e.preventDefault();
      if (!dirty) return;
      if (confirm("Discard your unsaved changes?")) location.reload();
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
    const submitHelp = document.getElementById("submitHelp");
    const bulkStatus = document.getElementById("bulkStatus");

    function updateSubmit() {
      const selected = Array.from(cats).filter((c) => c.checked).length;
      const anyCat = selected > 0;
      const ok = agree.checked && anyCat;
      submit.disabled = !ok;

      if (bulkStatus) {
        bulkStatus.textContent = `${selected} of ${cats.length} categories selected`;
      }
      if (submitHelp) {
        if (ok) {
          submitHelp.textContent = `Ready to submit. ${selected} categor${selected === 1 ? "y" : "ies"} selected.`;
          submitHelp.classList.add("submit-help-ready");
        } else {
          const reasons = [];
          if (!anyCat) reasons.push("pick at least one category");
          if (!agree.checked) reasons.push("check the acknowledgment above");
          submitHelp.textContent = "To enable this button, " + reasons.join(" and ") + ".";
          submitHelp.classList.remove("submit-help-ready");
        }
      }
    }
    agree?.addEventListener("change", updateSubmit);
    cats.forEach((c) => c.addEventListener("change", updateSubmit));

    document.getElementById("selectAll")?.addEventListener("click", (e) => {
      e.preventDefault();
      cats.forEach((c) => (c.checked = true));
      updateSubmit();
      if (bulkStatus) bulkStatus.textContent = `All ${cats.length} categories selected.`;
    });
    document.getElementById("clearAll")?.addEventListener("click", (e) => {
      e.preventDefault();
      cats.forEach((c) => (c.checked = false));
      updateSubmit();
      if (bulkStatus) bulkStatus.textContent = "0 of " + cats.length + " categories selected (cleared).";
    });

    updateSubmit();

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

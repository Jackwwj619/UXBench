/* microsoft-privacy-clone — shared interactions */

(function () {
  "use strict";

  /* ---------- Dashboard: jump from activity tiles to matching toggle ---------- */
  document.querySelectorAll("[data-jump-toggle]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const setting = link.dataset.jumpToggle;
      const list = document.getElementById("toggleList");
      if (!list) return;
      e.preventDefault();
      list.scrollIntoView({ behavior: "smooth", block: "start" });
      if (!setting) return;
      const input = list.querySelector(`input[data-setting="${setting}"]`);
      if (!input) return;
      const row = input.closest(".toggle-row");
      if (!row) return;
      row.style.transition = "background-color .2s ease";
      const original = row.style.backgroundColor;
      row.style.backgroundColor = "#fff4ce";
      setTimeout(() => { row.style.backgroundColor = original || ""; }, 1400);
    });
  });

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
    const filterStatus = document.getElementById("filterStatus");

    const RANGE_HOURS = { "24h": 24, "7d": 24 * 7, "30d": 24 * 30, "90d": 24 * 90 };
    const RANGE_LABEL = {
      "24h": "the last 24 hours",
      "7d": "the last 7 days",
      "30d": "the last 30 days",
      "90d": "the last 90 days",
    };

    function applyFilters() {
      const rangeKey = rangeFilter ? rangeFilter.value : "30d";
      const maxHours = RANGE_HOURS[rangeKey] ?? Infinity;
      const device = deviceFilter.value;
      const q = searchFilter.value.trim().toLowerCase();
      const allRows = historyTable.querySelectorAll("tbody tr");
      let visible = 0;
      let total = 0;
      allRows.forEach((tr) => {
        if (tr.classList.contains("removed")) return;
        total++;
        const rowDevice = tr.dataset.device;
        const ageHours = parseFloat(tr.dataset.ageHours || "0");
        const text = tr.textContent.toLowerCase();
        const deviceOk = device === "all" || rowDevice === device;
        const searchOk = !q || text.includes(q);
        const rangeOk = ageHours <= maxHours;
        const show = deviceOk && searchOk && rangeOk;
        tr.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (emptyState) emptyState.style.display = visible === 0 ? "block" : "none";
      historyTable.style.display = visible === 0 ? "none" : "";
      if (filterStatus) {
        const filtersActive = q || device !== "all" || rangeKey !== "30d";
        if (visible === 0) {
          filterStatus.textContent = "No entries match your filters.";
        } else if (filtersActive) {
          const parts = [];
          parts.push(`Showing ${visible} of ${total} entries`);
          parts.push(`from ${RANGE_LABEL[rangeKey] || "the selected range"}`);
          if (device !== "all") parts.push(`on ${deviceFilter.options[deviceFilter.selectedIndex].text}`);
          if (q) parts.push(`matching "${searchFilter.value.trim()}"`);
          filterStatus.textContent = parts.join(" ") + ".";
        } else {
          filterStatus.textContent = `Showing all ${visible} entries from the last 30 days.`;
        }
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

    function markDirty() {
      dirty = true;
      if (changedBanner) changedBanner.style.display = "flex";
      if (savedBanner) savedBanner.style.display = "none";
    }

    const masterStatus = document.getElementById("masterStatus");
    function syncMaster() {
      const on = masterAd.checked;
      serviceToggles.forEach((t) => {
        t.disabled = !on;
        const card = t.closest(".service-card");
        if (card) {
          card.style.opacity = on ? "1" : "0.55";
          card.setAttribute("aria-disabled", on ? "false" : "true");
        }
      });
      topicChecks.forEach((c) => {
        c.disabled = !on;
        const row = c.closest(".checkbox-row");
        if (row) row.setAttribute("aria-disabled", on ? "false" : "true");
      });
      if (masterStatus) {
        masterStatus.textContent = on
          ? "Personalization is on. Each service below can be turned off individually."
          : "Personalization is off. All service and topic settings below are disabled.";
        masterStatus.style.color = on ? "var(--ms-success)" : "var(--ms-text-secondary)";
      }
      markDirty();
    }
    masterAd.addEventListener("change", syncMaster);
    syncMaster();
    // After init, only mark dirty on real user actions
    dirty = false;
    if (changedBanner) changedBanner.style.display = "none";

    serviceToggles.forEach((t) => t.addEventListener("change", markDirty));
    topicChecks.forEach((c) => c.addEventListener("change", markDirty));

    // Make the whole topic card a tap target on touch devices
    document.querySelectorAll(".checkbox-list .checkbox-row").forEach((row) => {
      row.addEventListener("click", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "LABEL" || e.target.closest("label")) return;
        const input = row.querySelector('input[type="checkbox"]');
        if (input && !input.disabled) {
          input.checked = !input.checked;
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      });
    });

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

/* microsoft-privacy-clone — shared interactions */

(function () {
  "use strict";

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

    // Approximate "age" buckets for each row time label, used by the
    // time-range filter. Keys correspond to the leading text of col-time.
    function rowAgeDays(tr) {
      const t = tr.querySelector(".col-time")?.textContent.toLowerCase() || "";
      if (t.startsWith("today")) return 0;
      if (t.startsWith("yesterday")) return 1;
      // Format like "May 9, 16:30" — assume within the last 30 days for demo data.
      return 14;
    }

    function applyFilters() {
      const device = deviceFilter.value;
      const q = searchFilter.value.trim().toLowerCase();
      const range = rangeFilter ? rangeFilter.value : "30d";
      const maxDays = range === "24h" ? 0
                    : range === "7d"  ? 7
                    : range === "30d" ? 30
                    : range === "90d" ? 90 : 9999;
      let visible = 0;
      historyTable.querySelectorAll("tbody tr").forEach((tr) => {
        const rowDevice = tr.dataset.device;
        const text = tr.textContent.toLowerCase();
        const deviceOk = device === "all" || rowDevice === device;
        const searchOk = !q || text.includes(q);
        const ageOk = rowAgeDays(tr) <= maxDays;
        const show = deviceOk && searchOk && ageOk && !tr.classList.contains("removed");
        tr.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (emptyState) emptyState.style.display = visible === 0 ? "block" : "none";
      historyTable.style.display = visible === 0 ? "none" : "";
    }
    rangeFilter?.addEventListener("change", applyFilters);
    deviceFilter?.addEventListener("change", applyFilters);
    searchFilter?.addEventListener("input", applyFilters);

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

    // Snapshot the initial checked state so "Discard changes" can restore it.
    const initialState = new Map();
    const allInputs = [masterAd, ...serviceToggles, ...topicChecks];
    allInputs.forEach((el) => initialState.set(el, el.checked));

    function markDirty() {
      dirty = true;
      if (changedBanner) changedBanner.style.display = "flex";
      if (savedBanner) savedBanner.style.display = "none";
    }

    function syncMasterUI() {
      const on = masterAd.checked;
      serviceToggles.forEach((t) => {
        t.disabled = !on;
        t.closest(".service-card").style.opacity = on ? "1" : "0.55";
      });
      topicChecks.forEach((c) => (c.disabled = !on));
    }
    masterAd.addEventListener("change", () => { syncMasterUI(); markDirty(); });
    syncMasterUI();

    serviceToggles.forEach((t) => t.addEventListener("change", markDirty));
    topicChecks.forEach((c) => c.addEventListener("change", markDirty));

    document.getElementById("saveAdSettings")?.addEventListener("click", (e) => {
      e.preventDefault();
      // The new "initial" state is whatever was just saved.
      allInputs.forEach((el) => initialState.set(el, el.checked));
      if (changedBanner) changedBanner.style.display = "none";
      if (savedBanner) savedBanner.style.display = "flex";
      dirty = false;
    });
    document.getElementById("resetAdSettings")?.addEventListener("click", (e) => {
      e.preventDefault();
      allInputs.forEach((el) => {
        if (initialState.has(el)) el.checked = initialState.get(el);
      });
      syncMasterUI();
      if (changedBanner) changedBanner.style.display = "none";
      if (savedBanner) savedBanner.style.display = "none";
      dirty = false;
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

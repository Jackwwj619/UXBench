/* microsoft-privacy-clone — shared interactions */

(function () {
  "use strict";

  /* ---------- Dashboard: toggle "saved" feedback ---------- */
  const toggleList = document.getElementById("toggleList");
  const saveIndicator = document.getElementById("saveIndicator");
  let saveTimer = null;
  function showSaving(target) {
    if (!saveIndicator) return;
    saveIndicator.textContent = "Saving…";
    saveIndicator.style.color = "var(--ms-text-secondary)";
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const setting = target.dataset.setting || "setting";
      const on = target.checked;
      saveIndicator.textContent =
        `Saved — ${setting} is now ${on ? "on" : "off"}.`;
      saveIndicator.style.color = "var(--ms-success)";
    }, 450);
  }
  if (toggleList) {
    toggleList.addEventListener("change", (e) => {
      if (e.target.matches('input[type="checkbox"]')) {
        showSaving(e.target);
      }
    });
    // Make the entire toggle row clickable so the row itself toggles the switch
    toggleList.addEventListener("click", (e) => {
      const row = e.target.closest(".toggle-row");
      if (!row) return;
      // If user clicked the actual input/label/switch, browser handles it
      if (e.target.closest(".switch") || e.target.tagName === "INPUT" || e.target.tagName === "LABEL") return;
      const input = row.querySelector('input[type="checkbox"]');
      if (!input) return;
      input.checked = !input.checked;
      input.dispatchEvent(new Event("change", { bubbles: true }));
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

  /* ---------- Dashboard: open info modal for non-navigating links ---------- */
  const infoModal = document.getElementById("infoModal");
  const infoTitle = document.getElementById("infoTitle");
  const infoBody = document.getElementById("infoBody");
  function openInfo(title, body) {
    if (!infoModal) return;
    if (infoTitle) infoTitle.textContent = title;
    if (infoBody) infoBody.textContent = body;
    infoModal.classList.add("active");
  }
  document.getElementById("openCheckup")?.addEventListener("click", (e) => {
    e.preventDefault();
    openInfo(
      "Privacy Checkup",
      "The Privacy Checkup walks you through your most important privacy settings in a few quick steps. In this demo, the checkup is unavailable — review the settings below instead."
    );
  });
  document.getElementById("openStatement")?.addEventListener("click", (e) => {
    e.preventDefault();
    openInfo(
      "Privacy Statement",
      "The Microsoft Privacy Statement explains how Microsoft collects, uses, and protects your personal data. In this demo, the full statement is unavailable."
    );
  });
  document.getElementById("openHelp")?.addEventListener("click", (e) => {
    e.preventDefault();
    openInfo(
      "Help with privacy",
      "Find articles and contact options for privacy questions. In this demo, help articles are unavailable."
    );
  });
  document.getElementById("openVoiceModal")?.addEventListener("click", (e) => {
    e.preventDefault();
    openInfo(
      "Manage voice activity",
      "Voice clip saving is currently off. When enabled, you can review and delete saved voice samples here. This demo doesn't include the full voice management page."
    );
  });

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
    const deviceFilter = document.getElementById("deviceFilter");
    const searchFilter = document.getElementById("searchFilter");
    const emptyState = document.getElementById("emptyState");

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

    // Snapshot initial state so Discard can restore it without reload
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
    // After init, only mark dirty on real user actions
    dirty = false;
    if (changedBanner) changedBanner.style.display = "none";

    serviceToggles.forEach((t) => t.addEventListener("change", markDirty));
    topicChecks.forEach((c) => c.addEventListener("change", markDirty));

    document.getElementById("saveAdSettings")?.addEventListener("click", (e) => {
      e.preventDefault();
      if (changedBanner) changedBanner.style.display = "none";
      if (savedBanner) {
        savedBanner.querySelector("div").textContent = "Your ad settings were saved.";
        savedBanner.style.display = "flex";
      }
      // Update snapshot to current state after save
      initialState.master = masterAd.checked;
      initialState.services = Array.from(serviceToggles).map((t) => t.checked);
      initialState.topics = Array.from(topicChecks).map((c) => c.checked);
      dirty = false;
    });
    document.getElementById("resetAdSettings")?.addEventListener("click", (e) => {
      e.preventDefault();
      if (!dirty) {
        if (savedBanner) {
          savedBanner.querySelector("div").textContent = "No unsaved changes to discard.";
          savedBanner.style.display = "flex";
        }
        return;
      }
      // Restore snapshot directly — no reload, so feedback updates reliably on mobile
      masterAd.checked = initialState.master;
      serviceToggles.forEach((t, i) => (t.checked = initialState.services[i]));
      topicChecks.forEach((c, i) => (c.checked = initialState.topics[i]));
      // Re-sync disabled state but don't mark dirty
      const on = masterAd.checked;
      serviceToggles.forEach((t) => {
        t.disabled = !on;
        t.closest(".service-card").style.opacity = on ? "1" : "0.55";
      });
      topicChecks.forEach((c) => (c.disabled = !on));
      dirty = false;
      if (changedBanner) changedBanner.style.display = "none";
      if (savedBanner) {
        savedBanner.querySelector("div").textContent = "Changes discarded.";
        savedBanner.style.display = "flex";
      }
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
    const submitStatus = document.getElementById("submitStatus");
    function updateSubmit() {
      const anyCat = Array.from(cats).some((c) => c.checked);
      const ready = agree.checked && anyCat;
      submit.disabled = !ready;
      if (submitStatus) {
        if (ready) {
          submitStatus.innerHTML = "Consent accepted — <strong>Request my data</strong> is enabled.";
          submitStatus.style.color = "var(--ms-success)";
        } else if (!anyCat) {
          submitStatus.innerHTML = "Select at least one data category to enable <strong>Request my data</strong>.";
          submitStatus.style.color = "var(--ms-text-secondary)";
        } else {
          submitStatus.innerHTML = "Check the consent box above to enable <strong>Request my data</strong>.";
          submitStatus.style.color = "var(--ms-text-secondary)";
        }
      }
    }
    agree?.addEventListener("change", updateSubmit);
    cats.forEach((c) => c.addEventListener("change", updateSubmit));
    updateSubmit();

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

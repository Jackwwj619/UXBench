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

  /* ---------- Info link interception (activity / product links) ---------- */
  const infoModal = document.getElementById("infoModal");
  const infoTitle = document.getElementById("infoTitle");
  const infoBody = document.getElementById("infoBody");
  const infoCopy = {
    location: {
      title: "Manage location activity",
      body: "Location activity is currently saved across your signed-in devices. The detailed location timeline view is part of your Microsoft account privacy controls. Use the toggle below to stop saving new location data."
    },
    voice: {
      title: "Manage voice activity",
      body: "Voice clip saving is currently off, so no recordings are stored. You can change this with the 'Save voice recordings' toggle below."
    },
    media: {
      title: "Manage media activity",
      body: "Movies, TV, and music history is shown in the Microsoft Store and Groove apps. To remove this data, use 'Clear all activity' below."
    },
    apps: {
      title: "Manage app and service activity",
      body: "Connected apps like Microsoft 365, OneDrive, and Teams manage their own activity logs. Open each app's settings to review or clear their data."
    },
    xbox: {
      title: "Manage Xbox activity",
      body: "Xbox activity, achievements, and friends list are managed in the Xbox app. Sign in there to review or remove gameplay data."
    },
    "prod-windows": { title: "Windows privacy settings", body: "Windows privacy settings are managed in the Windows Settings app on each PC, under Privacy & security. Sign in to your PC to change them." },
    "prod-xbox": { title: "Xbox privacy settings", body: "Xbox privacy is managed inside the Xbox app or on console. Sign in to Xbox to update sharing, communication, and content controls." },
    "prod-edge": { title: "Microsoft Edge privacy settings", body: "Edge privacy controls live in the browser at edge://settings/privacy. Open Edge on a signed-in device to review them." },
    "prod-bing": { title: "Bing privacy settings", body: "Bing search settings, including SafeSearch and search history, are managed at bing.com/account/general while signed in." },
    "prod-outlook": { title: "Outlook.com privacy settings", body: "Outlook.com privacy controls — including data collection in mail and calendar — live in Outlook web settings." },
    "prod-onedrive": { title: "OneDrive privacy settings", body: "OneDrive privacy controls — including sharing and Personal Vault — are in OneDrive's web and desktop settings." },
    "prod-linkedin": { title: "LinkedIn privacy settings", body: "LinkedIn privacy is managed at linkedin.com/psettings/. Open LinkedIn while signed in with your linked account." },
    "prod-m365": { title: "Microsoft 365 privacy settings", body: "Microsoft 365 privacy options live in the Office apps under File › Account › Account Privacy." }
  };
  if (infoModal && infoTitle && infoBody) {
    document.addEventListener("click", (e) => {
      const link = e.target.closest(".js-info-link");
      if (!link) return;
      e.preventDefault();
      const key = link.dataset.info;
      const copy = infoCopy[key];
      if (copy) {
        infoTitle.textContent = copy.title;
        infoBody.textContent = copy.body;
      } else {
        infoTitle.textContent = "Manage activity";
        infoBody.textContent = "This setting is managed elsewhere in your Microsoft account.";
      }
      infoModal.classList.add("active");
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

    serviceToggles.forEach((t) => t.addEventListener("change", () => {
      markDirty();
      const card = t.closest(".service-card");
      if (card) card.style.opacity = t.checked ? "1" : "0.7";
    }));
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

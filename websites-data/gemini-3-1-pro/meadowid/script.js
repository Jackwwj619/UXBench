(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toast helper ----------
  function ensureToastHost() {
    let host = document.querySelector(".toast-host");
    if (!host) {
      host = document.createElement("div");
      host.className = "toast-host";
      host.setAttribute("role", "status");
      host.setAttribute("aria-live", "polite");
      document.body.appendChild(host);
    }
    return host;
  }
  function toast(message, kind) {
    const host = ensureToastHost();
    const el = document.createElement("div");
    el.className = "toast" + (kind ? " " + kind : "");
    el.textContent = message;
    host.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 250);
    }, 2600);
  }
  window.toast = toast;

  // ---------- mobile nav toggle ----------
  function setupMobileNav() {
    const sidebar = document.querySelector(".sidebar");
    const nav = sidebar && sidebar.querySelector("nav");
    const logo = sidebar && sidebar.querySelector(".logo");
    if (!sidebar || !nav || !logo) return;
    if (sidebar.querySelector(".nav-toggle")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "nav-toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "primary-nav");
    btn.setAttribute("aria-label", "Toggle navigation menu");
    btn.innerHTML = '<span class="bars" aria-hidden="true"><i></i><i></i><i></i></span> Menu';
    nav.id = "primary-nav";
    logo.insertAdjacentElement("afterend", btn);
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  setupMobileNav();

  // ---------- generic confirm modal ----------
  function confirmModal({ title, body, confirmLabel = "Confirm", danger = false, requireText = null }) {
    return new Promise((resolve) => {
      let back = document.createElement("div");
      back.className = "modal-back show";
      back.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true">
          <h3></h3>
          <p style="color:var(--muted);"></p>
          ${requireText ? `<label style="display:block;font-size:13px;color:var(--muted);margin-top:8px;">Type <code>${requireText}</code> to confirm</label><input type="text" data-role="match" autocomplete="off" />` : ""}
          <div class="modal-actions">
            <button data-role="cancel">Cancel</button>
            <button data-role="confirm"></button>
          </div>
        </div>`;
      document.body.appendChild(back);
      back.querySelector("h3").textContent = title;
      back.querySelector("p").textContent = body;
      const ok = back.querySelector("[data-role=confirm]");
      ok.textContent = confirmLabel;
      ok.classList.add(danger ? "danger" : "primary");
      const match = back.querySelector("[data-role=match]");
      if (match) {
        ok.disabled = true;
        match.addEventListener("input", () => { ok.disabled = match.value.trim() !== requireText; });
      }
      const close = (v) => { back.remove(); resolve(v); };
      ok.addEventListener("click", () => close(true));
      back.querySelector("[data-role=cancel]").addEventListener("click", () => close(false));
      back.addEventListener("click", (e) => { if (e.target === back) close(false); });
    });
  }
  window.confirmModal = confirmModal;

  // ---------- button loading helper ----------
  function withLoading(btn, label, fn) {
    if (!btn || btn.disabled) return Promise.resolve();
    const prev = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="btn-spinner" aria-hidden="true"></span>${label}`;
    return Promise.resolve(fn()).finally(() => {
      btn.disabled = false;
      btn.innerHTML = prev;
    });
  }

  // ---------- index.html: Run security check ----------
  $$("button").forEach((b) => {
    if (b.textContent.trim() === "Run security check") {
      b.addEventListener("click", () => {
        withLoading(b, "Running…", () => new Promise((res) => setTimeout(res, 1200))).then(() => {
          toast("Security check complete — no new issues found.", "success");
        });
      });
    }
  });

  // ---------- index.html: Dismiss all alerts ----------
  $$(".panel-head .link").forEach((link) => {
    if (link.textContent.trim() === "Dismiss all" && link.getAttribute("href") === "#") {
      link.addEventListener("click", async (e) => {
        e.preventDefault();
        const ok = await confirmModal({
          title: "Dismiss all alerts?",
          body: "We'll hide these notifications from your overview. You can still review the underlying issues from each section.",
          confirmLabel: "Dismiss all"
        });
        if (!ok) return;
        const ul = link.closest(".panel").querySelector(".alerts");
        if (ul) {
          ul.innerHTML = '<li style="padding:18px 4px;color:var(--muted);">All alerts dismissed.</li>';
        }
        toast("Alerts dismissed.", "success");
      });
    }
    if (link.textContent.trim() === "Configure" && link.getAttribute("href") === "#") {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        toast("Recovery configuration is not available in the demo.");
      });
    }
  });

  // ---------- generic # link fallback (so non-mapped dead links give feedback) ----------
  function bindStubLink(link, message) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      toast(message);
    });
  }
  // recovery email "verify now"
  $$(".readiness a[href='#']").forEach((a) => bindStubLink(a, "Verification email queued — check your inbox."));
  // recovery email send verification on passkeys page
  $$("p.app-meta a[href='#']").forEach((a) => {
    if (a.textContent.toLowerCase().includes("verification")) {
      bindStubLink(a, "Verification email sent.");
    } else {
      bindStubLink(a, "This link is not active in the demo.");
    }
  });
  // sidebar Profile/Billing
  $$(".sidebar nav a[href='#']").forEach((a) => {
    bindStubLink(a, `${a.textContent.trim()} is not available in the demo.`);
  });

  // ---------- freeze.html: Request deletion ----------
  $$("a.btn").forEach((a) => {
    if (a.textContent.trim() === "Request deletion") {
      a.addEventListener("click", async (e) => {
        e.preventDefault();
        const ok = await confirmModal({
          title: "Request account deletion?",
          body: "We'll send a confirmation email and start a 7-day cool-off window. Your account stays usable during cool-off; you can cancel at any time.",
          confirmLabel: "Request deletion",
          danger: true,
          requireText: "DELETE"
        });
        if (!ok) return;
        toast("Deletion requested — check your email to confirm.", "success");
      });
    }
  });

  // ---------- connected-apps.html ----------
  // Label the toolbar selects for accessibility, and wire filter/sort.
  const appsToolbar = $(".apps-toolbar");
  if (appsToolbar) {
    const selects = appsToolbar.querySelectorAll("select");
    if (selects[0]) {
      selects[0].setAttribute("aria-label", "Filter by category");
      selects[0].id = "apps-category";
    }
    if (selects[1]) {
      selects[1].setAttribute("aria-label", "Sort apps");
      selects[1].id = "apps-sort";
    }
    const search = $("#apps-search");
    if (search) search.setAttribute("aria-label", "Search apps");

    // Heuristic categorization for the demo cards.
    const CATEGORY = {
      "Forge Coder": "Developer tools",
      "Tessera Docs": "Developer tools",
      "Pelagic Cloud": "Developer tools",
      "Lumen Research": "Productivity",
      "Atlas Notes": "Productivity",
      "Climate Almanac": "Media",
      "MoonlightTickets": "Media",
      "Aurora Network": "Productivity",
      "OrbitRide": "Finance",
      "GreenGrove": "Finance",
    };
    // dataset.added (Date) and dataset.lastActiveOrder for sorting
    const NOW = Date.now();
    const ADDED = {
      "Forge Coder": "2025-03-12",
      "Lumen Research": "2024-10-04",
      "Climate Almanac": "2025-01-09",
      "Aurora Network": "2023-08-22",
      "OrbitRide": "2024-02-14",
      "Tessera Docs": "2024-05-02",
      "Pelagic Cloud": "2023-07-11",
      "Atlas Notes": "2024-03-02",
      "MoonlightTickets": "2024-11-19",
      "GreenGrove": "2025-04-28",
    };
    // approx last active in days ago for "Recently used"
    const LAST_ACTIVE_DAYS = {
      "Forge Coder": 0.001,
      "Lumen Research": 1,
      "Climate Almanac": 3,
      "Aurora Network": 4,
      "OrbitRide": 11,
      "Tessera Docs": 22,
      "Pelagic Cloud": 28,
      "Atlas Notes": 540,
      "MoonlightTickets": 6,
      "GreenGrove": 9,
    };
    $$(".app-card").forEach((c) => {
      const name = c.dataset.name || "";
      c.dataset.category = CATEGORY[name] || "Other";
      c.dataset.added = ADDED[name] || "";
      c.dataset.lastDays = String(LAST_ACTIVE_DAYS[name] ?? 9999);
    });

    function applyAppsToolbar() {
      const q = (search?.value || "").toLowerCase();
      const cat = selects[0]?.value || "All categories";
      const sort = selects[1]?.value || "Sort: Recently used";
      const container = $$(".app-card")[0]?.parentElement;
      if (!container) return;

      // filter
      const cards = $$(".app-card");
      cards.forEach((c) => {
        const matchesQ = (c.dataset.name || "").toLowerCase().includes(q);
        const matchesCat = cat === "All categories" || c.dataset.category === cat;
        c.style.display = (matchesQ && matchesCat) ? "" : "none";
      });

      // sort
      const visible = cards.filter((c) => c.style.display !== "none");
      const sorter = {
        "Sort: Recently used": (a, b) => parseFloat(a.dataset.lastDays) - parseFloat(b.dataset.lastDays),
        "Sort: Name A→Z": (a, b) => (a.dataset.name || "").localeCompare(b.dataset.name || ""),
        "Sort: Date added": (a, b) => (b.dataset.added || "").localeCompare(a.dataset.added || ""),
      }[sort] || ((a, b) => 0);
      visible.sort(sorter);
      visible.forEach((c) => container.appendChild(c));
    }
    if (search) search.addEventListener("input", applyAppsToolbar);
    selects.forEach((s) => s.addEventListener("change", applyAppsToolbar));
  }

  $$(".app-card [data-act=revoke]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const card = btn.closest(".app-card");
      const name = card.dataset.name || "this app";
      const ok = await confirmModal({
        title: `Revoke access for ${name}?`,
        body: `${name} will be signed out and won't be able to read your MeadowID data. It can request access again next time you sign in there.`,
        confirmLabel: "Revoke access",
        danger: true
      });
      if (ok) {
        card.remove();
        toast(`${name} revoked.`, "success");
      }
    });
  });

  // ---------- devices.html ----------
  function bindDevice(row) {
    row.addEventListener("click", () => {
      $$(".session-row").forEach((r) => r.classList.remove("active"));
      row.classList.add("active");
      const id = row.dataset.id;
      $$(".pin").forEach((p) => p.classList.toggle("active", p.dataset.id === id));
      const detail = $("#session-detail");
      if (detail) {
        detail.innerHTML = `
          <h3 style="margin:0 0 4px;">${row.dataset.device}</h3>
          <p style="color:var(--muted); margin:0 0 12px;">${row.dataset.city} · ${row.dataset.ip}</p>
          <ul style="list-style:none; padding:0; margin:0 0 14px; font-size:14px;">
            <li>Started: ${row.dataset.started}</li>
            <li>Last activity: ${row.dataset.last}</li>
            <li>App: ${row.dataset.app}</li>
            <li>Factor: ${row.dataset.factor}</li>
          </ul>
          ${row.dataset.this === "true"
            ? "<p style='font-size:13px;color:var(--muted);'>This is the session you are using right now.</p>"
            : "<button data-role=\"end-session\" class=\"danger\">End this session</button>"}
        `;
        const endBtn = $("[data-role=end-session]", detail);
        if (endBtn) {
          endBtn.addEventListener("click", async () => {
            const ok = await confirmModal({
              title: "End this session?",
              body: `Sign out ${row.dataset.device} in ${row.dataset.city}. The next time someone tries to use it they'll need your password and a second factor.`,
              confirmLabel: "End session",
              danger: true
            });
            if (ok) {
              row.remove();
              detail.innerHTML = "<p style='color:var(--muted);'>Pick a session to see details.</p>";
              $(`.pin[data-id="${row.dataset.id}"]`)?.remove();
              toast("Session ended.", "success");
            }
          });
        }
      }
    });
  }
  $$(".session-row").forEach(bindDevice);
  $$(".pin").forEach((pin) => {
    pin.addEventListener("click", () => {
      const row = $(`.session-row[data-id="${pin.dataset.id}"]`);
      if (row) row.click();
    });
  });

  const endAllBtn = $("#end-all-others");
  if (endAllBtn) endAllBtn.addEventListener("click", async () => {
    const ok = await confirmModal({
      title: "End every other session?",
      body: "You'll stay signed in here. Every other browser, phone, and app linked to MeadowID will be signed out within a minute. They'll need your password and a second factor to come back.",
      confirmLabel: "End all others",
      danger: true
    });
    if (ok) {
      $$(".session-row").forEach((r) => { if (r.dataset.this !== "true") r.remove(); });
      $$(".pin").forEach((p) => { if (p.dataset.this !== "true") p.remove(); });
      toast("All other sessions ended.", "success");
    }
  });

  // ---------- passkeys.html ----------
  const addPasskeyBtn = $("#add-passkey");
  if (addPasskeyBtn) addPasskeyBtn.addEventListener("click", async () => {
    const ok = await confirmModal({
      title: "Create a passkey on this device?",
      body: "Your browser will ask you to authenticate (Touch ID, Windows Hello, etc). The private key never leaves this device.",
      confirmLabel: "Continue"
    });
    if (!ok) return;
    const list = $("#passkey-list");
    const div = document.createElement("div");
    div.className = "factor-card";
    div.innerHTML = `
      <div class="factor-icon">⌘</div>
      <div>
        <strong>This Mac (Safari)</strong>
        <div class="app-meta">Created just now · last used just now</div>
      </div>
      <span class="tag ok">Active</span>
      <button data-role="rm">Remove</button>`;
    div.querySelector("[data-role=rm]").addEventListener("click", () => removeFactor(div, "passkey"));
    list.appendChild(div);
    toast("Passkey added.", "success");
  });

  // Wire all existing Remove / Re-pair / Reveal buttons on factor cards.
  async function removeFactor(card, kind) {
    const name = card.querySelector("strong")?.textContent?.trim() || "this factor";
    const ok = await confirmModal({
      title: `Remove ${name}?`,
      body: `This ${kind || "factor"} will no longer be usable to sign in or recover your account. You can add a new one later.`,
      confirmLabel: "Remove",
      danger: true
    });
    if (!ok) return;
    card.remove();
    toast(`${name} removed.`, "success");
  }
  $$(".factor-card button").forEach((b) => {
    const card = b.closest(".factor-card");
    const label = b.textContent.trim();
    if (label === "Remove") {
      b.addEventListener("click", () => removeFactor(card, "factor"));
    } else if (label === "Re-pair") {
      b.addEventListener("click", () => {
        withLoading(b, "Pairing…", () => new Promise((r) => setTimeout(r, 900)))
          .then(() => toast("Authenticator re-paired.", "success"));
      });
    } else if (label.startsWith("Reveal")) {
      b.addEventListener("click", async () => {
        const ok = await confirmModal({
          title: "Reveal backup codes?",
          body: "We'll show your remaining backup codes once. Save them somewhere safe — we won't show them again unless you regenerate.",
          confirmLabel: "Reveal & download"
        });
        if (!ok) return;
        toast("Backup codes downloaded.", "success");
      });
    }
  });

  // ---------- data-export.html ----------
  const wizardState = { step: 1, selected: new Set(["profile", "connected"]), format: "json", schedule: "once" };
  function paintWizard() {
    $$(".steps li").forEach((li) => {
      const n = +li.dataset.step;
      li.classList.toggle("done", n < wizardState.step);
      li.classList.toggle("current", n === wizardState.step);
    });
    $$(".wizard-step").forEach((s) => { s.style.display = +s.dataset.step === wizardState.step ? "" : "none"; });
    const back = $("#wiz-back");
    const next = $("#wiz-next");
    if (back) back.disabled = wizardState.step === 1;
    if (next) next.textContent = wizardState.step === 4 ? "Request export" : "Continue";
  }
  $("#wiz-next")?.addEventListener("click", async () => {
    if (wizardState.step < 4) { wizardState.step++; paintWizard(); return; }
    if (wizardState.selected.size === 0) {
      toast("Pick at least one category before requesting an export.", "error");
      return;
    }
    const ok = await confirmModal({
      title: "Request data export?",
      body: `We'll prepare a ${wizardState.format.toUpperCase()} archive of ${wizardState.selected.size} categories. You'll get an email with a download link when it's ready (usually under 30 minutes). The link expires after 48 hours.`,
      confirmLabel: "Request export"
    });
    if (!ok) return;
    $("#wizard-card").innerHTML = `
      <h2>Export queued</h2>
      <p class="helper">We started preparing your archive at ${new Date().toLocaleTimeString()}. We'll email jamal@thirdpond.dev when it's ready. You can keep using MeadowID — this runs in the background.</p>
      <button onclick="location.reload()">Start another</button>
    `;
    toast("Export request queued.", "success");
  });
  $("#wiz-back")?.addEventListener("click", () => { if (wizardState.step > 1) { wizardState.step--; paintWizard(); } });
  $$("#wiz-categories input").forEach((cb) => {
    cb.addEventListener("change", () => {
      if (cb.checked) wizardState.selected.add(cb.value);
      else wizardState.selected.delete(cb.value);
    });
  });
  $$("input[name=fmt]").forEach((r) => r.addEventListener("change", () => { wizardState.format = r.value; }));
  $$("input[name=sched]").forEach((r) => r.addEventListener("change", () => { wizardState.schedule = r.value; }));

  // Encrypt password reveal
  const encryptBox = document.querySelector('.wizard-step[data-step="2"] input[type=checkbox]');
  if (encryptBox) {
    const wrapper = document.createElement("div");
    wrapper.id = "encrypt-pw-wrap";
    wrapper.style.cssText = "display:none; margin-top:10px; max-width:340px;";
    wrapper.innerHTML = `
      <label for="encrypt-pw" class="muted" style="font-size:13px; display:block; margin-bottom:4px;">Archive password</label>
      <input id="encrypt-pw" type="password" autocomplete="new-password" placeholder="At least 12 characters" />
      <p class="app-meta" id="encrypt-pw-hint" style="margin-top:6px;">We never store this password. If you lose it, the archive cannot be decrypted.</p>
    `;
    encryptBox.closest("div").appendChild(wrapper);
    encryptBox.addEventListener("change", () => {
      wrapper.style.display = encryptBox.checked ? "block" : "none";
      if (encryptBox.checked) wrapper.querySelector("#encrypt-pw").focus();
    });
  }

  // Save as draft
  $$(".wizard-actions button").forEach((b) => {
    if (b.textContent.trim() === "Save as draft") {
      b.addEventListener("click", () => {
        withLoading(b, "Saving…", () => new Promise((r) => setTimeout(r, 700)))
          .then(() => toast("Draft saved — you can resume from Export your data.", "success"));
      });
    }
  });

  // Time range and email labels (a11y)
  const timeRangeSelect = document.querySelector('.wizard-step[data-step="2"] select');
  if (timeRangeSelect) {
    timeRangeSelect.id = "wiz-time-range";
    timeRangeSelect.setAttribute("aria-label", "Time range");
    const lbl = timeRangeSelect.previousElementSibling;
    if (lbl && lbl.tagName === "LABEL") lbl.setAttribute("for", "wiz-time-range");
  }
  const emailInput = document.querySelector('.wizard-step[data-step="3"] input[type=email]');
  if (emailInput) {
    emailInput.id = "wiz-email";
    emailInput.setAttribute("aria-label", "Email address for delivery");
    const lbl = emailInput.previousElementSibling;
    if (lbl && lbl.tagName === "LABEL") lbl.setAttribute("for", "wiz-email");
  }

  if ($("#wiz-next")) paintWizard();

  // ---------- freeze.html ----------
  const freezeToggle = $("#freeze-toggle");
  if (freezeToggle) {
    // Make the toggle host detectable as interactive.
    const toggleLabel = freezeToggle.closest(".toggle");
    if (toggleLabel) {
      toggleLabel.setAttribute("role", "switch");
      toggleLabel.setAttribute("tabindex", "0");
      toggleLabel.setAttribute("aria-checked", freezeToggle.checked ? "true" : "false");
      toggleLabel.setAttribute("aria-label", "Freeze account");
      toggleLabel.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          freezeToggle.click();
        }
      });
    }
    freezeToggle.addEventListener("change", async () => {
      if (toggleLabel) toggleLabel.setAttribute("aria-checked", freezeToggle.checked ? "true" : "false");
      if (!freezeToggle.checked) {
        $("#freeze-state").textContent = "Not frozen";
        $("#freeze-state").style.color = "";
        toast("Account unfrozen.", "success");
        return;
      }
      const ok = await confirmModal({
        title: "Freeze your MeadowID?",
        body: "Every app loses access immediately. Sign-ins will be blocked from all devices. You can unfreeze by signing in to meadowid.example with your password and a backup factor. New apps cannot use Sign in with MeadowID while frozen.",
        confirmLabel: "Freeze account",
        danger: true,
        requireText: "FREEZE"
      });
      if (!ok) {
        freezeToggle.checked = false;
        if (toggleLabel) toggleLabel.setAttribute("aria-checked", "false");
        return;
      }
      $("#freeze-state").textContent = "Frozen — " + new Date().toLocaleString();
      $("#freeze-state").style.color = "var(--danger)";
      toast("Account frozen.", "success");
    });
  }
})();

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

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

  // ---------- connected-apps.html ----------
  function updateAppsStatus() {
    const status = $("#apps-status");
    if (!status) return;
    const total = $$(".app-card").length;
    const visible = $$(".app-card").filter((c) => c.style.display !== "none").length;
    const cat = $("#apps-filter")?.value || "All categories";
    const sort = $("#apps-sort")?.value || "Recently used";
    const q = $("#apps-search")?.value?.trim() || "";
    const parts = [];
    parts.push(`Showing <strong>${visible}</strong> of ${total} apps`);
    if (q) parts.push(`matching "<strong>${q.replace(/[<>&]/g, "")}</strong>"`);
    if (cat && cat !== "All categories") parts.push(`in <strong>${cat}</strong>`);
    parts.push(`· sorted by <strong>${sort}</strong>`);
    status.innerHTML = parts.join(" ");
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
      if (ok) { card.remove(); updateAppsStatus(); }
    });
  });

  function sortAppCards(mode) {
    const container = $(".panel.apps-list") || $$(".app-card")[0]?.parentNode;
    if (!container) return;
    const cards = $$(".app-card");
    cards.sort((a, b) => {
      if (mode === "Name A→Z") return a.dataset.name.localeCompare(b.dataset.name);
      if (mode === "Date added") return (b.dataset.added || "").localeCompare(a.dataset.added || "");
      return (a.dataset.recent || "0") - (b.dataset.recent || "0");
    });
    cards.forEach((c) => container.appendChild(c));
  }

  const search = $("#apps-search");
  if (search) {
    const filterCards = () => {
      const q = (search.value || "").toLowerCase();
      const cat = ($("#apps-filter")?.value || "All categories").toLowerCase();
      $$(".app-card").forEach((c) => {
        const matchesQ = (c.dataset.name || "").toLowerCase().includes(q);
        const matchesCat = cat === "all categories" || (c.dataset.category || "").toLowerCase() === cat;
        c.style.display = matchesQ && matchesCat ? "" : "none";
      });
      updateAppsStatus();
    };
    search.addEventListener("input", filterCards);
    $("#apps-filter")?.addEventListener("change", filterCards);
    $("#apps-sort")?.addEventListener("change", () => {
      sortAppCards($("#apps-sort").value);
      updateAppsStatus();
    });
    updateAppsStatus();
  }

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
    div.querySelector("[data-role=rm]").addEventListener("click", () => div.remove());
    list.appendChild(div);
  });

  // ---------- data-export.html ----------
  const CATEGORY_LABELS = {
    profile: "Account profile",
    connected: "Connected apps & tokens",
    sessions: "Sign-in history",
    passkeys: "Passkey & 2FA metadata",
    audit: "Security audit log",
    billing: "Billing & receipts",
    "apps-data": "Data held by connected apps"
  };
  const wizardState = { step: 1, selected: new Set(["profile", "connected"]), format: "json", schedule: "once", email: "jamal@thirdpond.dev" };
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
    if (next) {
      next.textContent = wizardState.step === 4 ? "Request export" : "Continue";
      next.classList.toggle("danger", wizardState.step === 4);
    }
    // Update review summary live
    const cats = $("#review-categories");
    if (cats) {
      const list = Array.from(wizardState.selected).map((k) => CATEGORY_LABELS[k] || k);
      cats.textContent = list.length ? list.join(", ") : "(none selected)";
    }
    const fmt = $("#review-format"); if (fmt) fmt.textContent = wizardState.format.toUpperCase();
    const freq = $("#review-frequency");
    if (freq) freq.textContent = ({once: "Just this once", month: "Every month", quarter: "Every quarter"})[wizardState.schedule] || wizardState.schedule;
    const del = $("#review-delivery"); if (del) del.textContent = wizardState.email;
    const count = $("#review-count"); if (count) count.textContent = wizardState.selected.size;
  }
  $("#wiz-next")?.addEventListener("click", async () => {
    if (wizardState.step < 4) { wizardState.step++; paintWizard(); return; }
    if (wizardState.selected.size === 0) {
      await confirmModal({
        title: "Pick at least one category",
        body: "You haven't selected anything to export. Go back to step 1 and tick the categories you want included.",
        confirmLabel: "OK"
      });
      return;
    }
    const ok = await confirmModal({
      title: "Request data export?",
      body: `We'll prepare a ${wizardState.format.toUpperCase()} archive containing ${wizardState.selected.size} categor${wizardState.selected.size === 1 ? "y" : "ies"} (${Array.from(wizardState.selected).map((k) => CATEGORY_LABELS[k] || k).join(", ")}). We'll email a download link to ${wizardState.email} when it's ready (usually under 30 minutes). The link expires after 48 hours.`,
      confirmLabel: "Request export"
    });
    if (!ok) return;
    $("#wizard-card").innerHTML = `
      <h2>✓ Export queued</h2>
      <p class="helper">We started preparing your ${wizardState.format.toUpperCase()} archive at ${new Date().toLocaleTimeString()}. We'll email ${wizardState.email} when it's ready. You can keep using MeadowID — this runs in the background.</p>
      <button onclick="location.reload()">Start another</button>
    `;
  });
  $("#wiz-back")?.addEventListener("click", () => { if (wizardState.step > 1) { wizardState.step--; paintWizard(); } });
  $$("#wiz-categories input").forEach((cb) => {
    cb.addEventListener("change", () => {
      if (cb.checked) wizardState.selected.add(cb.value);
      else wizardState.selected.delete(cb.value);
      paintWizard();
    });
  });
  $$("input[name=fmt]").forEach((r) => r.addEventListener("change", () => { wizardState.format = r.value; paintWizard(); }));
  $$("input[name=sched]").forEach((r) => r.addEventListener("change", () => { wizardState.schedule = r.value; paintWizard(); }));
  $("#wiz-email")?.addEventListener("input", (e) => { wizardState.email = e.target.value; paintWizard(); });
  if ($("#wiz-next")) paintWizard();

  // ---------- freeze.html ----------
  const freezeToggle = $("#freeze-toggle");
  if (freezeToggle) {
    freezeToggle.addEventListener("change", async () => {
      if (!freezeToggle.checked) {
        // Unfreeze flow
        const ok = await confirmModal({
          title: "Unfreeze your MeadowID?",
          body: "Apps and devices will be able to sign in again. You can re-freeze at any time.",
          confirmLabel: "Unfreeze"
        });
        if (!ok) { freezeToggle.checked = true; return; }
        $("#freeze-state").textContent = "Not frozen";
        $("#freeze-state").style.color = "";
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
        return;
      }
      $("#freeze-state").textContent = "Frozen — " + new Date().toLocaleString();
      $("#freeze-state").style.color = "var(--danger)";
    });
  }

  // Request deletion (freeze.html)
  const reqDel = $("#request-deletion");
  if (reqDel) {
    reqDel.addEventListener("click", async (e) => {
      e.preventDefault();
      const ok = await confirmModal({
        title: "Request account deletion?",
        body: "We'll send a confirmation email to your verified address. After you confirm, a 7-day cool-off begins before any data is wiped. You can cancel at any point during the cool-off by signing in.",
        confirmLabel: "Send confirmation email",
        danger: true,
        requireText: "DELETE"
      });
      if (!ok) return;
      const note = $("#deletion-note");
      if (note) {
        note.textContent = "✓ Confirmation email sent to jamal@thirdpond.dev. Check your inbox to start the 7-day cool-off.";
        note.style.color = "var(--danger)";
      }
    });
  }

  // ---------- index.html ----------
  const secCheckBtn = $("#run-security-check");
  if (secCheckBtn) {
    secCheckBtn.addEventListener("click", async () => {
      const original = secCheckBtn.textContent;
      secCheckBtn.disabled = true;
      secCheckBtn.textContent = "Running checks…";
      const status = $("#security-check-status");
      if (status) {
        status.textContent = "Scanning sessions, tokens, and recovery factors…";
        status.style.color = "var(--muted)";
      }
      setTimeout(() => {
        secCheckBtn.disabled = false;
        secCheckBtn.textContent = "✓ Checked just now";
        if (status) {
          status.innerHTML = "Last run <strong>just now</strong>: 1 unfamiliar session, 1 stale app, recovery email unverified. See <a href='#things-to-look-at'>Things to look at</a>.";
          status.style.color = "var(--warn)";
        }
      }, 900);
    });
  }
})();

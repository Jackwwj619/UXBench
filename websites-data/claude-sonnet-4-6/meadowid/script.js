(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toast helper ----------
  function ensureToastContainer() {
    let c = document.querySelector(".toast-container");
    if (!c) {
      c = document.createElement("div");
      c.className = "toast-container";
      c.setAttribute("role", "status");
      c.setAttribute("aria-live", "polite");
      document.body.appendChild(c);
    }
    return c;
  }
  function showToast(message, { actionLabel = null, onAction = null, durationMs = 4500 } = {}) {
    const c = ensureToastContainer();
    const t = document.createElement("div");
    t.className = "toast";
    const span = document.createElement("span");
    span.textContent = message;
    t.appendChild(span);
    if (actionLabel) {
      const b = document.createElement("button");
      b.textContent = actionLabel;
      b.addEventListener("click", () => {
        if (onAction) onAction();
        t.remove();
      });
      t.appendChild(b);
    }
    c.appendChild(t);
    setTimeout(() => { t.remove(); }, durationMs);
    return t;
  }
  window.showToast = showToast;

  // ---------- mobile menu ----------
  const menuToggle = $(".menu-toggle");
  const sidebar = $(".sidebar");
  const backdrop = $(".sidebar-backdrop");
  function setMenu(open) {
    if (sidebar) sidebar.classList.toggle("open", open);
    if (backdrop) backdrop.classList.toggle("show", open);
    if (menuToggle) menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (menuToggle) menuToggle.addEventListener("click", () => setMenu(!sidebar.classList.contains("open")));
  if (backdrop) backdrop.addEventListener("click", () => setMenu(false));

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

  // ---------- index.html: Run security check ----------
  const runCheckBtn = $("#run-security-check");
  if (runCheckBtn) {
    runCheckBtn.addEventListener("click", () => {
      if (runCheckBtn.disabled) return;
      const original = runCheckBtn.textContent;
      runCheckBtn.disabled = true;
      runCheckBtn.textContent = "Checking…";
      setTimeout(() => {
        runCheckBtn.disabled = false;
        runCheckBtn.textContent = original;
        const verifiedEl = $("#verified-when");
        if (verifiedEl) verifiedEl.textContent = "moments ago";
        showToast("Security check complete — no new issues found.");
      }, 1400);
    });
  }

  // ---------- index.html: Dismiss all alerts ----------
  const dismissAll = $("#dismiss-all");
  if (dismissAll) {
    dismissAll.addEventListener("click", async (e) => {
      e.preventDefault();
      const alertsList = $(".alerts");
      if (!alertsList) return;
      const items = $$(".alerts > li");
      if (items.length === 0) return;
      const ok = await confirmModal({
        title: `Dismiss all ${items.length} alerts?`,
        body: "These warnings will be cleared from your overview. Active threats won't be resolved — they will reappear if the underlying issue is still present.",
        confirmLabel: "Dismiss all",
        danger: true
      });
      if (!ok) return;
      const snapshot = items.map((li) => li.cloneNode(true));
      items.forEach((li) => li.remove());
      showToast(`Dismissed ${snapshot.length} alerts.`, {
        actionLabel: "Undo",
        onAction: () => { snapshot.forEach((n) => alertsList.appendChild(n)); },
        durationMs: 8000
      });
    });
  }

  // ---------- freeze.html: Request deletion ----------
  const requestDelete = $("#request-deletion");
  if (requestDelete) {
    requestDelete.addEventListener("click", async (e) => {
      e.preventDefault();
      const ok = await confirmModal({
        title: "Request account deletion?",
        body: "Deleting is permanent. We'll send a confirmation link to jamal@thirdpond.dev. After you confirm, a 7-day cool-off begins. During cool-off you can sign in to cancel. After 7 days, all data is wiped and cannot be recovered.",
        confirmLabel: "Send confirmation email",
        danger: true,
        requireText: "DELETE"
      });
      if (!ok) return;
      const note = $("#deletion-status");
      if (note) {
        note.textContent = "Confirmation email sent to jamal@thirdpond.dev. Click the link there to start the 7-day cool-off.";
        note.style.color = "var(--danger)";
        note.style.display = "block";
      }
      showToast("Confirmation email sent. Check your inbox to continue.");
    });
  }

  // ---------- passkeys.html: Send verification ----------
  const sendVerify = $("#send-verification");
  if (sendVerify) {
    sendVerify.addEventListener("click", (e) => {
      e.preventDefault();
      sendVerify.disabled = true;
      sendVerify.textContent = "Sending…";
      setTimeout(() => {
        sendVerify.textContent = "Verification sent";
        showToast("Verification email sent to jamal.backup@thirdpond.dev.");
      }, 900);
    });
  }

  // ---------- passkeys.html: Remove on existing factors ----------
  $$("#passkey-list .factor-card button, .panel .factor-card button").forEach((btn) => {
    if (btn.dataset.bound) return;
    if (!/remove/i.test(btn.textContent)) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", async () => {
      const card = btn.closest(".factor-card");
      const name = card?.querySelector("strong")?.textContent || "this factor";
      const ok = await confirmModal({
        title: `Remove ${name}?`,
        body: `${name} will no longer be usable as a sign-in factor. Make sure you have at least one other factor (passkey, authenticator, or backup codes) before removing this one.`,
        confirmLabel: "Remove",
        danger: true
      });
      if (ok) { card.remove(); showToast(`${name} removed.`); }
    });
  });

  // ---------- connected-apps.html ----------
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
      if (ok) card.remove();
    });
  });

  const search = $("#apps-search");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.toLowerCase();
      $$(".app-card").forEach((c) => {
        c.style.display = (c.dataset.name || "").toLowerCase().includes(q) ? "" : "none";
      });
    });
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
  const wizardState = { step: 1, selected: new Set(["profile", "connected"]), format: "json", schedule: "once" };
  function renderReview() {
    const list = $("#review-categories");
    if (!list) return;
    list.innerHTML = "";
    if (wizardState.selected.size === 0) {
      const li = document.createElement("li");
      li.textContent = "No categories selected.";
      li.style.color = "var(--danger)";
      list.appendChild(li);
      return;
    }
    Array.from(wizardState.selected).forEach((key) => {
      const li = document.createElement("li");
      li.textContent = "✓ " + (CATEGORY_LABELS[key] || key);
      list.appendChild(li);
    });
    const fmt = $("#review-format"); if (fmt) fmt.textContent = wizardState.format.toUpperCase();
    const sched = $("#review-schedule"); if (sched) sched.textContent = wizardState.schedule === "once" ? "Just this once" : (wizardState.schedule === "month" ? "Every month" : "Every quarter");
  }
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
    if (wizardState.step === 4) renderReview();
  }
  $("#wiz-next")?.addEventListener("click", async () => {
    if (wizardState.step < 4) { wizardState.step++; paintWizard(); return; }
    if (wizardState.selected.size === 0) return;
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
  if ($("#wiz-next")) paintWizard();

  // ---------- freeze.html ----------
  const freezeToggle = $("#freeze-toggle");
  if (freezeToggle) {
    freezeToggle.addEventListener("change", async () => {
      if (!freezeToggle.checked) return;
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
})();

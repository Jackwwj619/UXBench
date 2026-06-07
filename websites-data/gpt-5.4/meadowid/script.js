(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toast ----------
  function ensureToastHost() {
    let host = document.getElementById("toast-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "toast-host";
      host.setAttribute("aria-live", "polite");
      host.setAttribute("aria-atomic", "true");
      document.body.appendChild(host);
    }
    return host;
  }
  function toast(message, kind = "ok", timeout = 3800) {
    const host = ensureToastHost();
    const t = document.createElement("div");
    t.className = `toast toast-${kind}`;
    t.setAttribute("role", "status");
    t.textContent = message;
    host.appendChild(t);
    setTimeout(() => t.classList.add("show"), 10);
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 240);
    }, timeout);
  }
  window.toast = toast;

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

  // ---------- index.html ----------
  const securityCheckBtn = $("#run-security-check");
  if (securityCheckBtn) {
    securityCheckBtn.addEventListener("click", () => {
      if (securityCheckBtn.dataset.busy === "1") return;
      securityCheckBtn.dataset.busy = "1";
      const orig = securityCheckBtn.textContent;
      securityCheckBtn.textContent = "Running checks…";
      securityCheckBtn.disabled = true;
      const status = $("#overview-status");
      const prevText = status ? status.innerHTML : "";
      if (status) status.innerHTML = "Running security check…";
      setTimeout(() => {
        securityCheckBtn.textContent = orig;
        securityCheckBtn.disabled = false;
        securityCheckBtn.dataset.busy = "0";
        if (status) status.innerHTML = "Verified <strong>just now</strong>. No new issues found.";
        toast("Security check complete — no new issues found.", "ok");
      }, 1400);
    });
  }

  const verifyNowLink = $("#verify-now-link");
  if (verifyNowLink) {
    verifyNowLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "passkeys.html#recovery";
    });
  }

  // ---------- connected-apps.html ----------
  function bindRevoke(btn) {
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
        toast(`Revoked ${name}. Its token is no longer valid.`, "ok");
        applyAppsFilter();
      }
    });
  }
  $$(".app-card [data-act=revoke]").forEach(bindRevoke);

  const search = $("#apps-search");
  const categorySel = $("#apps-category");
  const sortSel = $("#apps-sort");
  const appsList = $("#apps-list");
  const appsEmpty = $("#apps-empty");
  const clearFiltersBtn = $("#apps-clear-filters");

  function appsFiltersActive() {
    const q = (search?.value || "").trim();
    const cat = categorySel?.value || "all";
    return Boolean(q) || (cat && cat !== "all");
  }

  function applyAppsFilter() {
    if (!appsList) return;
    const q = (search?.value || "").toLowerCase().trim();
    const cat = (categorySel?.value || "all").toLowerCase();
    let visible = 0;
    $$(".app-card", appsList).forEach((c) => {
      const name = (c.dataset.name || "").toLowerCase();
      const cardCat = (c.dataset.category || "").toLowerCase();
      const matchesText = !q || name.includes(q);
      const matchesCat = cat === "all" || cardCat === cat;
      const show = matchesText && matchesCat;
      c.style.display = show ? "" : "none";
      if (show) visible++;
    });
    if (appsEmpty) {
      if (visible === 0) {
        appsEmpty.style.display = "";
        const reasons = [];
        if (search?.value) reasons.push(`search "${search.value}"`);
        if (categorySel && categorySel.value !== "all") reasons.push(`category "${categorySel.options[categorySel.selectedIndex].text}"`);
        const reasonText = reasons.length
          ? `No apps match your current filters (${reasons.join(" and ")}).`
          : "No connected apps remain.";
        const msg = appsEmpty.querySelector("[data-role=empty-msg]");
        if (msg) msg.textContent = reasonText;
        if (clearFiltersBtn) clearFiltersBtn.style.display = appsFiltersActive() ? "" : "none";
      } else {
        appsEmpty.style.display = "none";
      }
    }
  }

  if (search) search.addEventListener("input", applyAppsFilter);
  if (categorySel) categorySel.addEventListener("change", applyAppsFilter);
  if (sortSel) {
    sortSel.addEventListener("change", () => {
      if (!appsList) return;
      const cards = $$(".app-card", appsList);
      const empty = appsEmpty;
      const mode = sortSel.value;
      cards.sort((a, b) => {
        if (mode === "name") return (a.dataset.name || "").localeCompare(b.dataset.name || "");
        if (mode === "added") return (b.dataset.added || "").localeCompare(a.dataset.added || "");
        return (a.dataset.lastUsedRank || "0") - (b.dataset.lastUsedRank || "0");
      });
      cards.forEach((c) => appsList.appendChild(c));
      if (empty) appsList.appendChild(empty);
      applyAppsFilter();
    });
  }
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      if (search) search.value = "";
      if (categorySel) categorySel.value = "all";
      applyAppsFilter();
      toast("Filters cleared.", "ok");
    });
  }
  if (appsList) applyAppsFilter();

  // ---------- devices.html ----------
  function buildDetail(row, detail) {
    const flagged = row.dataset.flagged === "true";
    const flagReason = row.dataset.flagReason || "";
    detail.innerHTML = `
      ${flagged ? `<div class="flag-banner" role="alert"><strong>⚠ Flagged session</strong><p>${flagReason || "This session was flagged for review."}</p></div>` : ""}
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
          toast(`Ended session on ${row.dataset.device}.`, "ok");
        }
      });
    }
  }

  function selectSession(row) {
    $$(".session-row").forEach((r) => r.classList.remove("active", "highlight"));
    row.classList.add("active");
    const id = row.dataset.id;
    $$(".pin").forEach((p) => p.classList.toggle("active", p.dataset.id === id));
    const detail = $("#session-detail");
    if (detail) buildDetail(row, detail);
    row.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function bindDevice(row) {
    row.addEventListener("click", () => selectSession(row));
  }
  $$(".session-row").forEach(bindDevice);
  $$(".pin").forEach((pin) => {
    pin.addEventListener("click", () => {
      const row = $(`.session-row[data-id="${pin.dataset.id}"]`);
      if (row) row.click();
    });
  });

  // Deep-link from overview Review shortcut: ?focus=<id> or hash
  if ($("#session-detail")) {
    const params = new URLSearchParams(location.search);
    const focusId = params.get("focus") || (location.hash.startsWith("#session-") ? location.hash.replace("#session-", "") : null);
    if (focusId) {
      const target = $(`.session-row[data-id="${focusId}"]`);
      if (target) {
        selectSession(target);
        target.classList.add("highlight");
        toast(`Showing the flagged ${target.dataset.city} session.`, "warn");
      }
    }
  }

  const endAllBtn = $("#end-all-others");
  if (endAllBtn) endAllBtn.addEventListener("click", async () => {
    const others = $$(".session-row").filter((r) => r.dataset.this !== "true");
    if (!others.length) {
      toast("No other sessions to end — you're already the only one signed in.", "ok");
      return;
    }
    const ok = await confirmModal({
      title: "End every other session?",
      body: "You'll stay signed in here. Every other browser, phone, and app linked to MeadowID will be signed out within a minute. They'll need your password and a second factor to come back.",
      confirmLabel: "End all others",
      danger: true
    });
    if (ok) {
      const count = others.length;
      others.forEach((r) => r.remove());
      $$(".pin").forEach((p) => { if (p.dataset.this !== "true") p.remove(); });
      const banner = $("#bulk-signout-banner");
      if (banner) {
        banner.style.display = "";
        banner.innerHTML = `<strong>Signed out ${count} other session${count === 1 ? "" : "s"}.</strong> <span class="muted">Your current device (Chrome on macOS, Berlin) stayed signed in.</span> <button class="link-btn" data-role="dismiss-banner">Dismiss</button>`;
        banner.querySelector("[data-role=dismiss-banner]").addEventListener("click", () => { banner.style.display = "none"; });
      }
      toast(`Ended ${count} other session${count === 1 ? "" : "s"}. You stayed signed in here.`, "ok");
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
    div.querySelector("[data-role=rm]").addEventListener("click", () => {
      div.remove();
      toast("Passkey removed.", "ok");
    });
    list.appendChild(div);
    toast("Passkey added on this device.", "ok");
  });

  // Recovery email save + verify
  const recoveryForm = $("#recovery-form");
  if (recoveryForm) {
    const emailInput = $("#recovery-email");
    const trustedInput = $("#trusted-contact");
    const saveBtn = $("#recovery-save");
    const verifyBtn = $("#recovery-verify");
    const dirty = $("#recovery-dirty");
    const verifyStatus = $("#recovery-verify-status");
    let initialEmail = emailInput.value;
    let initialTrusted = trustedInput.value;
    let isVerified = false;

    function refreshDirty() {
      const changed = emailInput.value !== initialEmail || trustedInput.value !== initialTrusted;
      if (dirty) dirty.style.display = changed ? "" : "none";
      if (saveBtn) saveBtn.disabled = !changed;
      if (verifyBtn) {
        // Verifying only makes sense once changes are saved
        verifyBtn.disabled = changed || isVerified;
        verifyBtn.title = changed ? "Save your changes first, then send a verification email." : "";
      }
    }
    emailInput.addEventListener("input", refreshDirty);
    trustedInput.addEventListener("input", refreshDirty);

    recoveryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!emailInput.checkValidity()) {
        toast("Enter a valid email before saving.", "warn");
        return;
      }
      initialEmail = emailInput.value;
      initialTrusted = trustedInput.value;
      isVerified = false;
      if (verifyStatus) verifyStatus.textContent = "Not verified — saved address has not received a confirmation click yet.";
      refreshDirty();
      toast("Recovery details saved.", "ok");
    });

    if (verifyBtn) {
      verifyBtn.addEventListener("click", () => {
        verifyBtn.disabled = true;
        verifyBtn.textContent = "Sending…";
        setTimeout(() => {
          verifyBtn.textContent = "Resend verification";
          verifyBtn.disabled = false;
          if (verifyStatus) verifyStatus.textContent = `Verification email sent to ${emailInput.value}. The link expires in 30 minutes.`;
          toast("Verification email sent.", "ok");
        }, 900);
      });
    }
    refreshDirty();
  }

  // ---------- data-export.html ----------
  const wizardState = { step: 1, selected: new Set(["profile", "connected"]), format: "json", schedule: "once" };
  const CATEGORY_LABELS = {
    profile: "Account profile",
    connected: "Connected apps & tokens",
    sessions: "Sign-in history",
    passkeys: "Passkey & 2FA metadata",
    audit: "Security audit log",
    billing: "Billing & receipts",
    "apps-data": "App-held data"
  };
  function selectedLabels() {
    return [...wizardState.selected].map((v) => CATEGORY_LABELS[v] || v);
  }
  function paintWizardSummary() {
    const sum = $("#wiz-summary");
    if (!sum) return;
    const labels = selectedLabels();
    sum.innerHTML = `
      <div class="wiz-summary-row"><span class="muted">Categories:</span> <strong>${labels.length ? labels.join(", ") : "<em>none yet</em>"}</strong> <span class="muted">(${labels.length})</span></div>
      <div class="wiz-summary-row"><span class="muted">Format:</span> <strong>${(wizardState.format || "").toUpperCase()}</strong></div>
      <div class="wiz-summary-row"><span class="muted">Frequency:</span> <strong>${wizardState.schedule}</strong></div>
    `;
  }
  function paintReview() {
    const r = $("#review-list");
    if (!r) return;
    const labels = selectedLabels();
    r.innerHTML = `
      <li>Categories (${labels.length}): <strong>${labels.length ? labels.join(", ") : "none selected"}</strong></li>
      <li>Format: <strong>${wizardState.format.toUpperCase()}</strong></li>
      <li>Frequency: <strong>${wizardState.schedule}</strong></li>
      <li>Delivery: <strong>jamal@thirdpond.dev</strong></li>
    `;
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
    paintWizardSummary();
    if (wizardState.step === 4) paintReview();
  }
  $("#wiz-next")?.addEventListener("click", async () => {
    if (wizardState.step < 4) {
      if (wizardState.step === 1 && wizardState.selected.size === 0) {
        toast("Pick at least one category to continue.", "warn");
        return;
      }
      wizardState.step++; paintWizard(); return;
    }
    if (wizardState.selected.size === 0) {
      toast("Pick at least one category before requesting an export.", "warn");
      return;
    }
    const labels = selectedLabels();
    const ok = await confirmModal({
      title: "Request data export?",
      body: `We'll prepare a ${wizardState.format.toUpperCase()} archive of ${labels.length} categories: ${labels.join(", ")}. You'll get an email with a download link when it's ready (usually under 30 minutes). The link expires after 48 hours.`,
      confirmLabel: "Request export"
    });
    if (!ok) return;
    $("#wizard-card").innerHTML = `
      <h2>Export queued</h2>
      <p class="helper">We started preparing your archive at ${new Date().toLocaleTimeString()}. We'll email jamal@thirdpond.dev when it's ready. You can keep using MeadowID — this runs in the background.</p>
      <ul class="wiz-recap">
        <li><span class="muted">Categories (${labels.length}):</span> <strong>${labels.join(", ")}</strong></li>
        <li><span class="muted">Format:</span> <strong>${wizardState.format.toUpperCase()}</strong></li>
        <li><span class="muted">Frequency:</span> <strong>${wizardState.schedule}</strong></li>
      </ul>
      <button onclick="location.reload()">Start another</button>
    `;
    toast("Export queued. We'll email you when it's ready.", "ok");
  });
  $("#wiz-back")?.addEventListener("click", () => { if (wizardState.step > 1) { wizardState.step--; paintWizard(); } });
  $$("#wiz-categories input").forEach((cb) => {
    cb.addEventListener("change", () => {
      if (cb.checked) wizardState.selected.add(cb.value);
      else wizardState.selected.delete(cb.value);
      paintWizardSummary();
    });
  });
  $$("input[name=fmt]").forEach((r) => r.addEventListener("change", () => { wizardState.format = r.value; paintWizardSummary(); }));
  $$("input[name=sched]").forEach((r) => r.addEventListener("change", () => { wizardState.schedule = r.value; paintWizardSummary(); }));
  if ($("#wiz-next")) paintWizard();

  // ---------- freeze.html ----------
  const freezeToggle = $("#freeze-toggle");
  if (freezeToggle) {
    function setFrozen(frozen, when) {
      const state = $("#freeze-state");
      const block = $("#freeze-danger-block");
      if (state) {
        if (frozen) {
          state.innerHTML = `<span class="freeze-pill frozen">❄ Frozen</span> <span class="muted">since ${when}</span>`;
        } else {
          state.innerHTML = `<span class="freeze-pill">Not frozen</span>`;
        }
      }
      if (block) block.classList.toggle("is-frozen", frozen);
      freezeToggle.setAttribute("aria-checked", frozen ? "true" : "false");
    }
    freezeToggle.addEventListener("change", async () => {
      if (freezeToggle.checked) {
        const ok = await confirmModal({
          title: "Freeze your MeadowID?",
          body: "Every app loses access immediately. Sign-ins will be blocked from all devices. You can unfreeze by signing in to meadowid.example with your password and a backup factor. New apps cannot use Sign in with MeadowID while frozen.",
          confirmLabel: "Freeze account",
          danger: true,
          requireText: "FREEZE"
        });
        if (!ok) {
          freezeToggle.checked = false;
          setFrozen(false);
          return;
        }
        setFrozen(true, new Date().toLocaleString());
        toast("Account frozen. Every device will be signed out within 60 seconds.", "warn");
      } else {
        const ok = await confirmModal({
          title: "Unfreeze account?",
          body: "Sign-ins resume. Connected apps can request fresh tokens. You can freeze again at any time.",
          confirmLabel: "Unfreeze",
        });
        if (!ok) {
          freezeToggle.checked = true;
          setFrozen(true, new Date().toLocaleString());
          return;
        }
        setFrozen(false);
        toast("Account unfrozen. Sign-ins are allowed again.", "ok");
      }
    });
    setFrozen(false);
  }

  const requestDeletion = $("#request-deletion");
  if (requestDeletion) {
    requestDeletion.addEventListener("click", async (e) => {
      e.preventDefault();
      const ok = await confirmModal({
        title: "Request account deletion?",
        body: "We'll email jamal@thirdpond.dev a confirmation link. After you click it, a 7-day cool-off begins; you can cancel any time during that window. After 7 days, your data is wiped and connected apps lose access permanently.",
        confirmLabel: "Send confirmation email",
        danger: true,
        requireText: "DELETE"
      });
      if (!ok) return;
      const note = $("#deletion-status");
      if (note) {
        note.style.display = "";
        note.innerHTML = `<strong>Confirmation email sent.</strong> Check jamal@thirdpond.dev. The 7-day cool-off begins after you click the link in that email. <a href="#" id="cancel-deletion">Cancel deletion request</a>`;
        $("#cancel-deletion")?.addEventListener("click", (ev) => {
          ev.preventDefault();
          note.style.display = "none";
          toast("Deletion request cancelled.", "ok");
        });
      }
      toast("Deletion confirmation email sent.", "warn");
    });
  }
})();

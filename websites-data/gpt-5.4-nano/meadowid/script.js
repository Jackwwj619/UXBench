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

  // ---------- shared: toast/banner ----------
  function showToast(message, kind = "ok") {
    let host = $("#mid-toast-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "mid-toast-host";
      host.setAttribute("aria-live", "polite");
      host.setAttribute("role", "status");
      document.body.appendChild(host);
    }
    const t = document.createElement("div");
    t.className = `mid-toast ${kind}`;
    t.textContent = message;
    host.appendChild(t);
    setTimeout(() => { t.classList.add("fade"); }, 2800);
    setTimeout(() => { t.remove(); }, 3400);
  }

  // ---------- index.html: verify recovery email ----------
  const verifyLink = $("#verify-recovery-email");
  if (verifyLink) {
    verifyLink.addEventListener("click", (e) => {
      e.preventDefault();
      const status = $("#verify-recovery-status");
      if (verifyLink.dataset.busy === "1") return;
      verifyLink.dataset.busy = "1";
      const original = verifyLink.textContent;
      verifyLink.textContent = "sending…";
      verifyLink.style.pointerEvents = "none";
      if (status) { status.textContent = " Sending verification email…"; status.style.color = "var(--muted)"; }
      setTimeout(() => {
        verifyLink.textContent = original;
        verifyLink.style.pointerEvents = "";
        verifyLink.dataset.busy = "";
        if (status) {
          status.textContent = " Verification email sent to jamal.backup@thirdpond.dev. Check your inbox.";
          status.style.color = "var(--ok)";
        }
        showToast("Verification email sent. Check your inbox.", "ok");
      }, 900);
    });
  }

  // ---------- passkeys.html: send verification link ----------
  const sendVerifLink = $("#send-verification-link");
  if (sendVerifLink) {
    sendVerifLink.addEventListener("click", (e) => {
      e.preventDefault();
      const status = $("#recovery-email-status");
      if (sendVerifLink.dataset.busy === "1") return;
      sendVerifLink.dataset.busy = "1";
      sendVerifLink.textContent = "sending…";
      sendVerifLink.style.pointerEvents = "none";
      setTimeout(() => {
        if (status) {
          status.style.color = "var(--ok)";
          status.innerHTML = "Verification email sent to <strong>" + ($("#recovery-email-input")?.value || "jamal.backup@thirdpond.dev") + "</strong>. Click the link in that email within 24 hours to verify.";
        }
        showToast("Verification email sent.", "ok");
      }, 900);
    });
  }

  // ---------- passkeys.html: backup codes reveal & download ----------
  const revealBtn = $("#backup-codes-btn");
  if (revealBtn) {
    revealBtn.addEventListener("click", async () => {
      if (revealBtn.dataset.state === "revealed") {
        // hide again
        $("#backup-codes-area").hidden = true;
        $("#backup-codes-area").innerHTML = "";
        $("#backup-codes-tag").textContent = "Hidden";
        revealBtn.textContent = "Reveal & download";
        revealBtn.dataset.state = "";
        return;
      }
      const ok = await confirmModal({
        title: "Reveal backup codes?",
        body: "These one-time codes can sign you in if you lose your devices. Anyone who sees them can also sign in. Save them somewhere safe (a password manager or printed in a locked drawer).",
        confirmLabel: "Reveal codes"
      });
      if (!ok) return;
      revealBtn.disabled = true;
      revealBtn.textContent = "Revealing…";
      setTimeout(() => {
        const codes = ["8H4F-29KX","BQ22-7TLM","R6PE-MV30","Z1A8-WD4Y","K7C3-LQ9N","NX2P-58UB","T9MF-J6DL","PA7K-3WQE"];
        const area = $("#backup-codes-area");
        area.hidden = false;
        area.innerHTML = `
          <div class="backup-codes-grid">
            ${codes.map(c => `<code>${c}</code>`).join("")}
          </div>
          <div class="backup-codes-actions">
            <button data-role="download-codes" class="primary">Download .txt</button>
            <span class="app-meta">8 unused codes · revealed just now</span>
          </div>`;
        $("#backup-codes-tag").textContent = "Visible";
        revealBtn.textContent = "Hide codes";
        revealBtn.disabled = false;
        revealBtn.dataset.state = "revealed";
        $("[data-role=download-codes]", area)?.addEventListener("click", () => {
          const blob = new Blob(["MeadowID backup codes\n\n" + codes.join("\n") + "\n"], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url; a.download = "meadowid-backup-codes.txt";
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 2000);
          showToast("Backup codes downloaded.", "ok");
        });
        showToast("Backup codes revealed.", "ok");
      }, 600);
    });
  }

  // ---------- passkeys.html: SMS Remove + TOTP Re-pair ----------
  $$("[data-role=remove-factor]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const card = btn.closest(".factor-card");
      const name = btn.dataset.name || "this factor";
      const ok = await confirmModal({
        title: `Remove ${name}?`,
        body: `${name} will no longer work as a sign-in factor. Make sure you have at least one other factor set up before removing it.`,
        confirmLabel: "Remove",
        danger: true
      });
      if (!ok) return;
      btn.disabled = true;
      btn.textContent = "Removing…";
      setTimeout(() => {
        card.style.transition = "opacity .25s";
        card.style.opacity = "0";
        setTimeout(() => card.remove(), 260);
        showToast(`${name} removed.`, "ok");
      }, 500);
    });
  });

  const repairBtn = $("[data-role=repair-totp]");
  if (repairBtn) {
    repairBtn.addEventListener("click", async () => {
      const ok = await confirmModal({
        title: "Re-pair authenticator app?",
        body: "We'll generate a new secret and show a QR code. Your existing TOTP codes will stop working as soon as you confirm.",
        confirmLabel: "Continue"
      });
      if (!ok) return;
      repairBtn.disabled = true;
      repairBtn.textContent = "Re-pairing…";
      setTimeout(() => {
        repairBtn.textContent = "Re-paired";
        showToast("Authenticator re-paired. Scan the new QR in your app.", "ok");
        setTimeout(() => { repairBtn.textContent = "Re-pair"; repairBtn.disabled = false; }, 2400);
      }, 800);
    });
  }

  // passkey list Remove buttons (those rendered in HTML, not the dynamically added one)
  $$("[data-role=remove-passkey]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const card = btn.closest(".factor-card");
      const name = card?.querySelector("strong")?.textContent || "this passkey";
      const ok = await confirmModal({
        title: `Remove ${name}?`,
        body: `Sign-ins from this device will need your password and another factor. The device itself isn't signed out.`,
        confirmLabel: "Remove",
        danger: true
      });
      if (!ok) return;
      btn.disabled = true;
      btn.textContent = "Removing…";
      setTimeout(() => {
        card.style.transition = "opacity .25s";
        card.style.opacity = "0";
        setTimeout(() => card.remove(), 260);
        showToast(`${name} removed.`, "ok");
      }, 400);
    });
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
      const stateEl = $("#freeze-state");
      if (!freezeToggle.checked) {
        // unfreezing
        if (stateEl) {
          stateEl.textContent = "Unfreezing…";
          stateEl.style.color = "var(--muted)";
        }
        setTimeout(() => {
          if (stateEl) { stateEl.textContent = "Not frozen"; stateEl.style.color = ""; }
          showToast("Account unfrozen. Devices can sign in again.", "ok");
        }, 600);
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
      if (stateEl) {
        stateEl.textContent = "Freezing… signing devices out";
        stateEl.style.color = "var(--warn)";
      }
      setTimeout(() => {
        if (stateEl) {
          stateEl.textContent = "Frozen — " + new Date().toLocaleString();
          stateEl.style.color = "var(--danger)";
        }
        showToast("Account frozen. All devices are being signed out.", "ok");
      }, 900);
    });
  }

  // ---------- freeze.html: request deletion ----------
  const reqDel = $("#request-deletion-btn");
  if (reqDel) {
    reqDel.addEventListener("click", async () => {
      const ok = await confirmModal({
        title: "Request account deletion?",
        body: "We'll send a confirmation link to jamal@thirdpond.dev. After you confirm, a 7-day cool-off begins — sign in any time during that window to cancel. After the window, your account and data are permanently wiped.",
        confirmLabel: "Send confirmation email",
        danger: true,
        requireText: "DELETE"
      });
      if (!ok) return;
      const status = $("#deletion-status");
      reqDel.disabled = true;
      const original = reqDel.textContent;
      reqDel.textContent = "Sending…";
      if (status) { status.style.color = "var(--muted)"; status.textContent = "Sending confirmation email…"; }
      setTimeout(() => {
        if (status) {
          status.style.color = "var(--danger)";
          status.innerHTML = "Confirmation email sent to <strong>jamal@thirdpond.dev</strong>. Click the link within 24 hours to start the 7-day cool-off. You can cancel any time before the window ends.";
        }
        reqDel.textContent = "Resend confirmation email";
        reqDel.disabled = false;
        showToast("Deletion confirmation email sent.", "ok");
      }, 1000);
    });
  }
})();

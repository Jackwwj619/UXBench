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
  const categorySel = $("#apps-category");
  function applyAppFilters() {
    const q = (search?.value || "").toLowerCase();
    const cat = categorySel?.value || "all";
    $$(".app-card").forEach((c) => {
      const matchesName = (c.dataset.name || "").toLowerCase().includes(q);
      const matchesCat = cat === "all" || (c.dataset.category || "") === cat;
      c.style.display = matchesName && matchesCat ? "" : "none";
    });
  }
  if (search) search.addEventListener("input", applyAppFilters);
  if (categorySel) categorySel.addEventListener("change", applyAppFilters);

  const sortSel = $("#apps-sort");
  if (sortSel) {
    sortSel.addEventListener("change", () => {
      const container = $$(".app-card")[0]?.parentElement;
      if (!container) return;
      const cards = $$(".app-card");
      const v = sortSel.value;
      cards.sort((a, b) => {
        if (v === "name") return (a.dataset.name || "").localeCompare(b.dataset.name || "");
        return 0;
      });
      cards.forEach((c) => container.appendChild(c));
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
  function bindRemovePasskey(btn) {
    btn.addEventListener("click", async () => {
      const card = btn.closest(".factor-card");
      const name = card?.dataset.name || "this factor";
      const ok = await confirmModal({
        title: `Remove ${name}?`,
        body: `${name} will be deleted from your account. Sign-ins that depend on it will fail until you add a replacement.`,
        confirmLabel: "Remove",
        danger: true
      });
      if (ok && card) card.remove();
    });
  }
  $$("[data-act=remove-passkey]").forEach(bindRemovePasskey);

  $$("[data-act=repair-totp]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const ok = await confirmModal({
        title: "Re-pair authenticator app?",
        body: "We'll show a new QR code. Your current TOTP codes stop working as soon as you scan the new one.",
        confirmLabel: "Continue"
      });
      if (!ok) return;
      btn.textContent = "Pairing…";
      btn.disabled = true;
      setTimeout(() => { btn.textContent = "Re-pair"; btn.disabled = false; }, 900);
    });
  });

  const revealBtn = $("#reveal-backup-codes");
  if (revealBtn) {
    revealBtn.addEventListener("click", async () => {
      const ok = await confirmModal({
        title: "Reveal backup codes?",
        body: "Each code is single-use. Store them somewhere safe — anyone holding a code can complete a recovery flow.",
        confirmLabel: "Reveal codes"
      });
      if (!ok) return;
      const card = $("#backup-codes-card");
      const tag = $("#backup-codes-tag");
      if (tag) { tag.textContent = "Visible"; tag.className = "tag ok"; }
      revealBtn.textContent = "Download .txt";
      const codes = ["7F4K-2QP9","M3X8-LV2A","9TZB-HW6E","RC4M-8N1J","QY7P-3LD2","8KW5-MX0T","2VJN-PG6R","HF1A-9TYE","43QP-LZ8B","BDM6-2NXC"];
      let panel = card.querySelector(".backup-codes-panel");
      if (!panel) {
        panel = document.createElement("div");
        panel.className = "backup-codes-panel";
        panel.style.gridColumn = "1 / -1";
        panel.innerHTML = `<div class="codes-grid">${codes.map((c,i)=>`<code class="code-chip"${i<2?' style="text-decoration:line-through;opacity:.5"':''}>${c}</code>`).join("")}</div>
          <p class="app-meta" style="margin-top:8px;">Crossed-out codes have already been used. Treat the rest like passwords.</p>`;
        card.appendChild(panel);
      }
      revealBtn.onclick = () => {
        const blob = new Blob(["MeadowID backup codes — keep secret\n\n" + codes.join("\n") + "\n"], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "meadowid-backup-codes.txt";
        document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
      };
    });
  }

  const sendVerify = $("#send-verification");
  if (sendVerify) {
    sendVerify.addEventListener("click", (e) => {
      e.preventDefault();
      const status = $("#verification-status");
      if (status) {
        status.textContent = "✓ Verification email sent to jamal.backup@thirdpond.dev. Check your inbox.";
        status.style.display = "";
      }
      sendVerify.textContent = "Resend verification";
    });
  }

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
    div.dataset.name = "This Mac (Safari)";
    div.innerHTML = `
      <div class="factor-icon">⌘</div>
      <div>
        <strong>This Mac (Safari)</strong>
        <div class="app-meta">Created just now · last used just now</div>
      </div>
      <span class="tag ok">Active</span>
      <button data-act="remove-passkey">Remove</button>`;
    bindRemovePasskey(div.querySelector("[data-act=remove-passkey]"));
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

  // ---------- index.html ----------
  const runCheck = $("#run-security-check");
  if (runCheck) {
    runCheck.addEventListener("click", () => {
      const toast = $("#page-toast");
      runCheck.disabled = true;
      const original = runCheck.textContent;
      runCheck.textContent = "Running…";
      if (toast) {
        toast.hidden = false;
        toast.className = "page-toast info";
        toast.textContent = "Security check in progress — scanning sessions, tokens, and recovery state…";
      }
      setTimeout(() => {
        if (toast) {
          toast.className = "page-toast ok";
          toast.textContent = "✓ Security check complete. 1 unfamiliar session and an unverified recovery email need attention — see 'Things to look at' below.";
        }
        runCheck.disabled = false;
        runCheck.textContent = original;
      }, 1100);
    });
  }
  const verifyNow = $("#verify-now-link");
  if (verifyNow) {
    verifyNow.addEventListener("click", (e) => {
      e.preventDefault();
      const toast = $("#page-toast");
      if (toast) {
        toast.hidden = false;
        toast.className = "page-toast ok";
        toast.textContent = "✓ Verification email sent to jamal.backup@thirdpond.dev. Click the link in that message to finish.";
      }
      verifyNow.textContent = "resend";
    });
  }

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

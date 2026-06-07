(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toast helper ----------
  function toast(msg, kind = "info", ttl = 2600) {
    const host = $("#toast-host");
    if (!host) return;
    const t = document.createElement("div");
    t.className = "toast " + kind;
    t.innerHTML = `<span class="toast-icon">${kind === "success" ? "✓" : "ℹ"}</span><span>${msg}</span>`;
    host.appendChild(t);
    setTimeout(() => {
      t.classList.add("fade-out");
      setTimeout(() => t.remove(), 280);
    }, ttl);
  }

  // ---------- mock file contents / diffs ----------
  const DIFFS = {
    "src/upload/chunker.ts": {
      stat: "+86 / −0",
      html: $("#diff-body").innerHTML
    },
    "src/upload/stream.ts": {
      stat: "+12 / −47",
      html: `<pre><code><span class="d-head">@@ -8,30 +8,9 @@ src/upload/stream.ts</span>
<span class="d-ctx"> import { Readable } from "stream";</span>
<span class="d-ctx"> import { retry } from "./retry";</span>
<span class="d-ctx"> </span>
<span class="d-del">- export function uploadStream(file: string, dst: URL) {</span>
<span class="d-del">-   const r = createReadStream(file);</span>
<span class="d-del">-   // monolithic upload — re-sends from scratch on any error</span>
<span class="d-del">-   return retry(async () =&gt; {</span>
<span class="d-del">-     await put(dst, r);</span>
<span class="d-del">-   }, { tries: 5 });</span>
<span class="d-del">- }</span>
<span class="d-del">- </span>
<span class="d-del">- function put(u: URL, r: Readable) { /* ... */ }</span>
<span class="d-add">+ // The old uploadStream is replaced by ChunkedUpload in ./index.ts.</span>
<span class="d-add">+ // Re-exported here so existing imports keep working until v2.</span>
<span class="d-add">+ export { ChunkedUpload as uploadStream } from "./index";</span>
</code></pre>`
    },
    "src/upload/index.ts": {
      stat: "+184 / −0",
      html: `<pre><code><span class="d-head">@@ -0,0 +1,184 @@ src/upload/index.ts</span>
<span class="d-add">+ import { promises as fs } from "fs";</span>
<span class="d-add">+ import { join, dirname } from "path";</span>
<span class="d-add">+ import { Readable } from "stream";</span>
<span class="d-add">+ import { planChunks, mergeProgress, nextChunk, sliceReadable, Chunk } from "./chunker";</span>
<span class="d-add">+ import { retry } from "./retry";</span>
<span class="d-add">+ </span>
<span class="d-add">+ const STATE_FILE = ".forge/state.json";</span>
<span class="d-add">+ </span>
<span class="d-add">+ export class ChunkedUpload {</span>
<span class="d-add">+   private plan: Chunk[] = [];</span>
<span class="d-add">+   constructor(private file: string, private dst: URL, private size: number) {}</span>
<span class="d-add">+ </span>
<span class="d-add">+   async start(src: Readable) {</span>
<span class="d-add">+     const known = await this.loadState();</span>
<span class="d-add">+     this.plan = mergeProgress(planChunks(this.size), known);</span>
<span class="d-add">+     // ... resume from first un-uploaded chunk</span>
<span class="d-add">+     for await (const item of sliceReadable(src, this.plan)) {</span>
<span class="d-add">+       await retry(() =&gt; this.putChunk(item), { tries: 5 });</span>
<span class="d-add">+       item.chunk.uploaded = true;</span>
<span class="d-add">+       await this.saveState();</span>
<span class="d-add">+     }</span>
<span class="d-add">+   }</span>
<span class="d-add">+   /* ... */</span>
<span class="d-add">+ }</span>
</code></pre>`
    },
    "test/upload.spec.ts": {
      stat: "+102 / −12",
      html: `<pre><code><span class="d-head">@@ -3,8 +3,98 @@ test/upload.spec.ts</span>
<span class="d-ctx"> import { describe, it, expect } from "vitest";</span>
<span class="d-add">+ import { planChunks, mergeProgress, nextChunk } from "../src/upload/chunker";</span>
<span class="d-add">+ </span>
<span class="d-add">+ describe("chunker", () =&gt; {</span>
<span class="d-add">+   it("plans 5 MiB chunks for a 12 MiB file", () =&gt; {</span>
<span class="d-add">+     const plan = planChunks(12 * 1024 * 1024);</span>
<span class="d-add">+     expect(plan).toHaveLength(3);</span>
<span class="d-add">+     expect(plan[plan.length - 1].end).toBe(12 * 1024 * 1024);</span>
<span class="d-add">+   });</span>
<span class="d-add">+ </span>
<span class="d-add">+   it("merges known progress into a fresh plan", () =&gt; {</span>
<span class="d-add">+     const plan = planChunks(15 * 1024 * 1024);</span>
<span class="d-add">+     const merged = mergeProgress(plan, [{ ...plan[0], uploaded: true, etag: "a1" }]);</span>
<span class="d-add">+     expect(merged[0].uploaded).toBe(true);</span>
<span class="d-add">+     expect(nextChunk(merged)?.index).toBe(1);</span>
<span class="d-add">+   });</span>
<span class="d-add">+ });</span>
</code></pre>`
    },
    "src/upload/retry.ts": {
      stat: "no changes — reused",
      html: `<pre><code><span class="d-head">No diff. File read by the agent but not modified.</span>
<span class="d-ctx"> export interface RetryOpts {</span>
<span class="d-ctx">   tries: number;</span>
<span class="d-ctx">   baseMs?: number;</span>
<span class="d-ctx">   jitterMs?: number;</span>
<span class="d-ctx"> }</span>
<span class="d-ctx"> </span>
<span class="d-ctx"> export async function retry&lt;T&gt;(fn: () =&gt; Promise&lt;T&gt;, opts: RetryOpts): Promise&lt;T&gt; {</span>
<span class="d-ctx">   /* ... */</span>
<span class="d-ctx"> }</span>
</code></pre>`
    }
  };

  // default-fill for any other file
  function defaultDiff(path) {
    return {
      stat: "no changes",
      html: `<pre><code><span class="d-head">${path}</span>
<span class="d-ctx"> No edits in this run. Click an edited file (marked M or +) to see its diff.</span>
</code></pre>`
    };
  }

  // ---------- folder toggle + file select ----------
  $$(".folder > span").forEach((s) => {
    s.addEventListener("click", () => {
      s.parentElement.classList.toggle("open");
    });
  });

  $$(".file").forEach((f) => {
    f.addEventListener("click", (e) => {
      e.stopPropagation();
      $$(".file.selected").forEach((x) => x.classList.remove("selected"));
      f.classList.add("selected");
      const file = f.dataset.file;
      const diff = DIFFS[file] || defaultDiff(file);
      $("#diff-file").textContent = file;
      $("#diff-stat").textContent = diff.stat;
      $("#diff-body").innerHTML = diff.html;
    });
  });

  // ---------- composer ----------
  const ta = $("#msg");
  function autosize() {
    ta.style.height = "auto";
    ta.style.height = Math.min(160, ta.scrollHeight) + "px";
  }
  ta.addEventListener("input", autosize);
  ta.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      $("#composer").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }
  });

  const sendBtn = $("#send-btn");
  $("#composer").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = ta.value.trim();
    if (!v) return;
    const stream = $("#chat-stream");
    const u = document.createElement("div");
    u.className = "turn user";
    u.innerHTML = `<div class="bubble"><p>${v.replace(/</g,"&lt;")}</p></div>`;
    stream.appendChild(u);
    ta.value = ""; autosize();
    const composerSpacer = stream.querySelector(".composer-spacer");
    if (composerSpacer) stream.appendChild(composerSpacer);
    u.scrollIntoView({ behavior: "smooth", block: "end" });

    // Visible send-state transition
    if (sendBtn) {
      sendBtn.classList.add("is-sending");
      sendBtn.disabled = true;
      sendBtn.dataset.originalText = sendBtn.dataset.originalText || sendBtn.textContent;
      sendBtn.textContent = "Sending…";
    }
    // Move run state to "running" to make submission unmistakable
    const dotEl = $$(".run-state .dot")[0];
    const stateEl = $$(".run-state .muted")[0];
    if (dotEl) dotEl.classList.add("live");
    if (stateEl) stateEl.textContent = "·  running — message queued";
    toast("Message sent · agent queued", "info");

    setTimeout(() => {
      const a = document.createElement("div");
      a.className = "turn agent";
      a.innerHTML = `<div class="avatar">FC</div><div class="bubble"><p>Got it — I'll pause the current test run and re-plan against your note. Working…</p></div>`;
      stream.insertBefore(a, composerSpacer);
      a.scrollIntoView({ behavior: "smooth", block: "end" });
      if (sendBtn) {
        sendBtn.classList.remove("is-sending");
        sendBtn.disabled = false;
        sendBtn.textContent = sendBtn.dataset.originalText || "Send";
      }
      if (stateEl) stateEl.textContent = "·  agent is working";
    }, 600);
  });

  // ---------- Auto-apply toggle: explicit visible state ----------
  const autoApply = $("#auto-apply");
  const autoApplyLabel = $("#auto-apply-toggle");
  function syncAutoApply() {
    if (!autoApply || !autoApplyLabel) return;
    const on = autoApply.checked;
    autoApplyLabel.classList.toggle("is-on", on);
    const stateText = autoApplyLabel.querySelector(".tgl-state");
    if (stateText) stateText.textContent = on ? "ON" : "OFF";
    autoApplyLabel.setAttribute("aria-checked", String(on));
  }
  if (autoApply) {
    autoApplyLabel.setAttribute("role", "checkbox");
    autoApplyLabel.setAttribute("tabindex", "0");
    syncAutoApply();
    autoApply.addEventListener("change", () => {
      syncAutoApply();
      toast("Auto-apply edits: " + (autoApply.checked ? "ON" : "OFF"), "info", 1600);
    });
    autoApplyLabel.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        autoApply.checked = !autoApply.checked;
        autoApply.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  }

  // ---------- Accept all changes ----------
  const acceptBtn = $("#accept-all-btn");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      if (acceptBtn.disabled) return;
      acceptBtn.disabled = true;
      const original = acceptBtn.textContent;
      acceptBtn.textContent = "Applying…";
      setTimeout(() => {
        // Count modified/added file badges
        const dirty = $$(".file.dirty, .file.added");
        const count = dirty.length;
        // Optimistic UI: clear badges, mark accepted
        $$(".file .badge").forEach(b => b.remove());
        dirty.forEach(f => {
          f.classList.remove("dirty", "added");
          f.classList.add("accepted");
        });
        // Update file stats
        const stats = $$(".files-foot .stat-row strong");
        if (stats[0]) stats[0].textContent = "0";
        if (stats[1]) stats[1].textContent = "0";
        // Mark diff panel
        $(".diff").classList.add("accepted");
        // Run header note
        const runState = $(".run-state");
        if (runState && !runState.querySelector(".accepted-note")) {
          const note = document.createElement("span");
          note.className = "accepted-note";
          note.textContent = `Accepted ${count} change${count === 1 ? "" : "s"}`;
          runState.appendChild(note);
        }
        // Append a step entry
        const stream = $("#chat-stream");
        const composerSpacer = stream.querySelector(".composer-spacer");
        const step = document.createElement("div");
        step.className = "turn step done";
        step.innerHTML = `<div class="step-icon">✓</div>
          <div class="step-body">
            <div class="step-title">Accepted all changes</div>
            <div class="step-meta">${count} file${count === 1 ? "" : "s"} written to working tree</div>
          </div>
          <div class="step-time">just now</div>`;
        stream.insertBefore(step, composerSpacer);
        toast(`Changes applied · ${count} file${count === 1 ? "" : "s"} accepted`, "success");
        acceptBtn.textContent = "✓ Accepted";
        acceptBtn.classList.remove("primary");
      }, 350);
    });
  }

  // ---------- Unified / Split toggle ----------
  const diffBody = $("#diff-body");
  const modeIndicator = $("#diff-mode-indicator");
  $$("#diff-tabs .dt").forEach(tab => {
    tab.addEventListener("click", () => {
      $$("#diff-tabs .dt").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const mode = tab.dataset.mode || tab.textContent.trim().toLowerCase();
      if (diffBody) {
        diffBody.classList.toggle("split-mode", mode === "split");
      }
      if (modeIndicator) {
        modeIndicator.textContent = "Mode: " + (mode === "split" ? "Split" : "Unified");
      }
      toast("Diff view: " + (mode === "split" ? "Split" : "Unified"), "info", 1400);
    });
  });

  // ---------- Top nav routing (Agent/Inbox/Runs/Settings) ----------
  const views = {
    agent: null,
    inbox: { title: "Inbox", body: "No new threads. Replies and review requests will appear here." },
    runs: { title: "Runs", body: "Run #243 (paused) · Run #242 (success, 8/8) · Run #241 (success, 6/6). Click a run to load its diffs." },
    settings: { title: "Settings", body: "Auto-apply edits, branch protections, telemetry, and tool permissions are configured per repo." }
  };
  const chatStream = $("#chat-stream");
  let banner = null;
  function showView(name) {
    $$("#topnav a").forEach(a => a.classList.toggle("active", a.dataset.view === name));
    if (banner) { banner.remove(); banner = null; }
    if (name === "agent") {
      toast("View: Agent", "info", 1200);
      return;
    }
    const v = views[name];
    if (!v) return;
    banner = document.createElement("div");
    banner.className = "view-banner";
    banner.innerHTML = `<strong>${v.title}</strong> <span class="muted">— ${v.body}</span>
      <button class="em-close" type="button" style="margin-left:auto;background:var(--panel);border:1px solid var(--line);color:var(--ink);border-radius:6px;padding:4px 10px;cursor:pointer;">Back to Agent</button>`;
    const main = $(".chat");
    main.insertBefore(banner, main.firstChild.nextSibling);
    banner.querySelector(".em-close").addEventListener("click", () => showView("agent"));
    toast("View: " + v.title, "info", 1400);
  }
  $$("#topnav a").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const view = a.dataset.view;
      if (view) showView(view);
    });
  });

  // ---------- Rerun ----------
  const rerunBtn = $("#rerun-btn");
  if (rerunBtn) {
    rerunBtn.addEventListener("click", () => {
      const stream = $("#chat-stream");
      const composerSpacer = stream.querySelector(".composer-spacer");
      const dotEl = $$(".run-state .dot")[0];
      const stateEl = $$(".run-state .muted")[0];
      if (dotEl) dotEl.classList.add("live");
      if (stateEl) stateEl.textContent = "·  starting…";
      const step = document.createElement("div");
      step.className = "turn step current";
      step.innerHTML = `<div class="step-icon">↻</div>
        <div class="step-body">
          <div class="step-title">Rerun queued</div>
          <div class="step-meta">Re-running last command on the same branch…</div>
        </div>
        <div class="step-time">just now</div>`;
      stream.insertBefore(step, composerSpacer);
      step.scrollIntoView({ behavior: "smooth", block: "end" });
      toast("Rerun started", "info");
      setTimeout(() => {
        if (stateEl) stateEl.textContent = "·  agent is working";
      }, 700);
    });
  }

  // ---------- Open editor modal ----------
  const openEditorBtn = $("#open-editor-btn");
  if (openEditorBtn) {
    openEditorBtn.addEventListener("click", () => {
      const file = $("#diff-file").textContent;
      const modal = document.createElement("div");
      modal.className = "editor-modal";
      modal.innerHTML = `<div class="editor-modal-card">
        <button class="em-close" type="button" aria-label="Close">Close</button>
        <h3>Editor — ${file}</h3>
        <p class="muted">Opening in a full editor is disabled in this demo. Below is the file's current diff context for reference.</p>
        <div style="border:1px solid var(--line); border-radius:8px; overflow:auto; max-height:50vh;">
          ${$("#diff-body").innerHTML}
        </div>
      </div>`;
      document.body.appendChild(modal);
      const close = () => modal.remove();
      modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
      modal.querySelector(".em-close").addEventListener("click", close);
      toast("Opened editor view", "info", 1400);
    });
  }

  // ---------- live "running tests" tick ----------
  const states = [
    { tested: 3, msg: "3 of 8 cases · resume-mid-stream test in progress…" },
    { tested: 4, msg: "4 of 8 cases · retry-on-5xx passed" },
    { tested: 5, msg: "5 of 8 cases · abort-on-4xx passed" },
    { tested: 6, msg: "6 of 8 cases · fresh-upload passed" },
    { tested: 7, msg: "7 of 8 cases · large-file streaming passed" },
    { tested: 8, msg: "✓ 8 / 8 passing — 11.4s" },
  ];
  let stateIdx = 0;
  const elapsedEl = $("#elapsed");
  const metaEl = $("#current-meta");
  const currentStep = $("#current-step");
  const liveCheck = $$(".diff-foot .check.live")[0];
  let elapsed = 14;
  const tick = setInterval(() => {
    elapsed++;
    if (elapsedEl) elapsedEl.textContent = elapsed + "s";
    if (elapsed % 4 === 0 && stateIdx < states.length - 1) {
      stateIdx++;
      const s = states[stateIdx];
      if (metaEl) metaEl.textContent = s.msg;
      if (liveCheck) liveCheck.textContent = "▶ Tests: " + s.tested + " / 8 — run in progress";
      if (stateIdx === states.length - 1) {
        currentStep.classList.remove("current");
        currentStep.classList.add("done");
        currentStep.querySelector(".step-icon").textContent = "✓";
        if (metaEl) metaEl.textContent = "All 8 cases passed in 11.4s";
        if (liveCheck) {
          liveCheck.textContent = "✓ Tests: 8 / 8 passing";
          liveCheck.classList.remove("live");
          liveCheck.classList.add("ok");
        }
        $$(".run-state .dot")[0].classList.remove("live");
        $$(".run-state .muted")[0].textContent = "·  agent finished";
        clearInterval(tick);
      }
    }
  }, 1000);

  // ---------- interrupt ----------
  $("#interrupt-btn").addEventListener("click", () => {
    clearInterval(tick);
    const interrupted = document.createElement("div");
    interrupted.className = "turn step";
    interrupted.innerHTML = `<div class="step-icon">⏸</div>
      <div class="step-body">
        <div class="step-title">Interrupted by user</div>
        <div class="step-meta">Run paused. Send a message to redirect, or click Rerun to retry.</div>
      </div>
      <div class="step-time">just now</div>`;
    $("#chat-stream").insertBefore(interrupted, $(".composer-spacer"));
    $$(".run-state .dot")[0].classList.remove("live");
    $$(".run-state .muted")[0].textContent = "·  paused";
  });
})();

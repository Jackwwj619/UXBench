(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toast helper ----------
  function toast(title, body, kind = "") {
    const region = $("#toast-region");
    if (!region) return;
    const el = document.createElement("div");
    el.className = "toast" + (kind ? " " + kind : "");
    el.innerHTML = `<strong></strong><div class="toast-body"></div>`;
    el.querySelector("strong").textContent = title;
    el.querySelector(".toast-body").textContent = body || "";
    region.appendChild(el);
    setTimeout(() => {
      el.style.transition = "opacity 0.25s, transform 0.25s";
      el.style.opacity = "0";
      el.style.transform = "translateY(4px)";
      setTimeout(() => el.remove(), 260);
    }, 3200);
  }

  // ---------- modal helper ----------
  const modalBackdrop = $("#modal-backdrop");
  const modalTitle = $("#modal-title");
  const modalBody = $("#modal-body");
  const modalFoot = $("#modal-foot");
  const modalClose = $("#modal-close");

  function openModal({ title, body, actions }) {
    modalTitle.textContent = title;
    modalBody.innerHTML = "";
    if (typeof body === "string") modalBody.innerHTML = body;
    else if (body instanceof Node) modalBody.appendChild(body);
    modalFoot.innerHTML = "";
    (actions || [{ label: "Close", primary: true, onClick: closeModal }]).forEach((a) => {
      const b = document.createElement("button");
      b.textContent = a.label;
      if (a.primary) b.classList.add("primary");
      if (a.danger) b.classList.add("danger");
      b.addEventListener("click", () => {
        if (a.onClick) a.onClick();
      });
      modalFoot.appendChild(b);
    });
    modalBackdrop.hidden = false;
    setTimeout(() => {
      const first = modalFoot.querySelector("button.primary") || modalFoot.querySelector("button");
      if (first) first.focus();
    }, 0);
  }
  function closeModal() {
    modalBackdrop.hidden = true;
  }
  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalBackdrop.hidden) closeModal();
  });

  // ---------- mock file contents / diffs ----------
  const initialDiffHtml = $("#diff-body").innerHTML;
  const DIFFS = {
    "src/upload/chunker.ts": {
      stat: "+86 / −0",
      html: initialDiffHtml
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

  function selectFile(f) {
    $$(".file.selected").forEach((x) => x.classList.remove("selected"));
    f.classList.add("selected");
    const file = f.dataset.file;
    const diff = DIFFS[file] || defaultDiff(file);
    $("#diff-file").textContent = file;
    $("#diff-stat").textContent = diff.stat;
    $("#diff-body").innerHTML = diff.html;
    diffMode = "unified";
    $$(".dt").forEach((b) => b.classList.toggle("active", b.dataset.mode === "unified"));
    // On mobile, switch to diff pane after selecting
    if (window.matchMedia("(max-width: 880px)").matches) {
      switchPane("diff");
    }
  }
  $$(".file").forEach((f) => {
    f.addEventListener("click", (e) => {
      e.stopPropagation();
      selectFile(f);
    });
  });

  // ---------- file search/filter ----------
  const filesSearch = $("#files-search");
  const filesSearchBox = $("#files-search-box");
  const filesFilter = $("#files-filter");
  filesSearch.addEventListener("click", () => {
    const wasHidden = filesSearchBox.hidden;
    filesSearchBox.hidden = !wasHidden;
    if (wasHidden) {
      filesFilter.focus();
    } else {
      filesFilter.value = "";
      $$(".tree .file").forEach((f) => f.classList.remove("hidden"));
    }
  });
  filesFilter.addEventListener("input", () => {
    const q = filesFilter.value.trim().toLowerCase();
    $$(".tree .file").forEach((f) => {
      const path = (f.dataset.file || f.textContent || "").toLowerCase();
      f.classList.toggle("hidden", q !== "" && !path.includes(q));
    });
  });

  // ---------- new file (mock) ----------
  $("#files-new").addEventListener("click", () => {
    openModal({
      title: "New file",
      body: `<p>This demo doesn't write to disk, but in a live session you'd be able to:</p>
        <ul>
          <li>Create a new file scoped to the current run</li>
          <li>Have the agent generate boilerplate</li>
          <li>Track it in the diff panel</li>
        </ul>`,
      actions: [
        { label: "Cancel", onClick: closeModal },
        { label: "Got it", primary: true, onClick: () => { closeModal(); toast("Demo only", "File creation isn't wired up in this demo.", "warn"); } }
      ]
    });
  });

  // ---------- top nav routing (single page sections) ----------
  const NAV_CONTENT = {
    inbox: {
      title: "Inbox",
      body: `<p>You'd see review requests, agent questions, and run notifications here.</p>
        <ul>
          <li>3 runs awaiting review</li>
          <li>1 question from the agent on Run #241</li>
          <li>Build notifications for <code>main</code></li>
        </ul>
        <p class="muted">Inbox is preview-only in this demo.</p>`
    },
    runs: {
      title: "Runs",
      body: `<p>History of agent runs in this repository:</p>
        <ul>
          <li><strong>Run #243</strong> — feat/streaming-uploads (current)</li>
          <li>Run #242 — fix/auth-token-leak — accepted</li>
          <li>Run #241 — chore/upgrade-vitest — accepted</li>
          <li>Run #240 — feat/cli-color — discarded</li>
        </ul>
        <p class="muted">Click a run in the live product to load its workspace; not interactive in this demo.</p>`
    },
    settings: {
      title: "Settings",
      body: `<p>Workspace, model, and integration preferences:</p>
        <ul>
          <li>Default model: Forge Coder L</li>
          <li>Auto-apply edits: on</li>
          <li>VS Code integration: connected</li>
          <li>Git provider: GitHub</li>
        </ul>
        <p class="muted">Read-only in this demo.</p>`
    }
  };
  $$("#topnav a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const section = a.dataset.section;
      $$("#topnav a").forEach((x) => x.classList.remove("active"));
      a.classList.add("active");
      if (section === "agent") {
        // Already showing the agent workspace
        toast("Agent workspace", "Showing the current run.");
        return;
      }
      const c = NAV_CONTENT[section];
      if (c) {
        openModal({
          title: c.title,
          body: c.body,
          actions: [
            { label: "Back to Agent", primary: true, onClick: () => {
                $$("#topnav a").forEach((x) => x.classList.remove("active"));
                $('#topnav a[data-section="agent"]').classList.add("active");
                closeModal();
              } }
          ]
        });
      }
    });
  });

  // ---------- header action buttons ----------
  $("#connect-repo").addEventListener("click", () => {
    openModal({
      title: "Connect a repository",
      body: `<p>Forge would prompt you to authorize a Git provider and pick a repo.</p>
        <ul>
          <li>GitHub, GitLab, and Bitbucket Cloud are supported.</li>
          <li>This demo runs against the bundled <code>atlas-cli</code> sample.</li>
        </ul>`,
      actions: [
        { label: "Cancel", onClick: closeModal },
        { label: "Continue with GitHub", primary: true, onClick: () => {
            closeModal();
            toast("Demo only", "Repository connection is mocked in this demo.", "warn");
          } }
      ]
    });
  });
  $("#open-vscode").addEventListener("click", () => {
    toast("Opening in VS Code…", "In a live session this would launch the VS Code handler.", "success");
  });

  // ---------- diff tabs (unified/split) ----------
  let diffMode = "unified";
  function renderSplit() {
    const body = $("#diff-body");
    const html = (DIFFS[$("#diff-file").textContent] || defaultDiff($("#diff-file").textContent)).html;
    // Build a simple split view by separating - and + lines
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const spans = $$("code > span", tmp);
    const left = [];
    const right = [];
    spans.forEach((s) => {
      if (s.classList.contains("d-add")) {
        right.push(s.outerHTML);
        left.push('<span class="d-ctx"> </span>');
      } else if (s.classList.contains("d-del")) {
        left.push(s.outerHTML);
        right.push('<span class="d-ctx"> </span>');
      } else {
        left.push(s.outerHTML);
        right.push(s.outerHTML);
      }
    });
    body.classList.add("split-mode");
    body.innerHTML = `
      <div class="split-side"><div class="split-head">Before</div><pre><code>${left.join("\n")}</code></pre></div>
      <div class="split-side"><div class="split-head">After</div><pre><code>${right.join("\n")}</code></pre></div>
    `;
  }
  function renderUnified() {
    const body = $("#diff-body");
    const file = $("#diff-file").textContent;
    body.classList.remove("split-mode");
    body.innerHTML = (DIFFS[file] || defaultDiff(file)).html;
  }
  $$(".dt").forEach((b) => {
    b.addEventListener("click", () => {
      $$(".dt").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      diffMode = b.dataset.mode;
      if (diffMode === "split") renderSplit(); else renderUnified();
    });
  });

  // ---------- Open editor ----------
  $("#open-editor-btn").addEventListener("click", () => {
    const file = $("#diff-file").textContent;
    toast("Opening editor", file + " — would open in your configured editor.", "success");
  });

  // ---------- Accept all changes (with confirm + applied state) ----------
  let acceptedState = false;
  const acceptBtn = $("#accept-btn");
  acceptBtn.addEventListener("click", () => {
    if (acceptedState) {
      toast("Already applied", "All changes from Run #243 have been accepted.", "warn");
      return;
    }
    openModal({
      title: "Accept all changes?",
      body: `<p>This will apply <strong>+128 / −54</strong> across 4 files in <code>feat/streaming-uploads</code>:</p>
        <ul>
          <li><code>src/upload/stream.ts</code> — modified</li>
          <li><code>src/upload/chunker.ts</code> — modified</li>
          <li><code>src/upload/index.ts</code> — added</li>
          <li><code>test/upload.spec.ts</code> — modified</li>
        </ul>
        <p class="muted">You can still revert per-file from the file tree afterwards.</p>`,
      actions: [
        { label: "Cancel", onClick: closeModal },
        { label: "Accept all changes", primary: true, onClick: () => {
            closeModal();
            applyAccept();
          } }
      ]
    });
  });

  function applyAccept() {
    acceptedState = true;
    acceptBtn.textContent = "✓ Changes applied";
    acceptBtn.disabled = true;
    acceptBtn.classList.remove("primary");
    // update file tree visuals
    $$(".file.dirty, .file.added").forEach((f) => {
      f.classList.remove("dirty", "added");
      f.classList.add("accepted");
      const badge = f.querySelector(".badge");
      if (badge) {
        badge.classList.add("accepted");
        badge.textContent = "✓";
      }
    });
    // update files-foot stats
    const foot = $("#files-foot");
    foot.innerHTML = `
      <div class="stat-row"><span>Applied</span><strong style="color: var(--add-fg);">4 files</strong></div>
      <div class="stat-row"><span>Pending</span><strong>0</strong></div>
      <div class="stat-row"><span>Lines applied</span><strong>+128 / −54</strong></div>
    `;
    toast("Changes applied", "4 files updated in feat/streaming-uploads.", "success");
  }

  // ---------- composer ----------
  const ta = $("#msg");
  const sendBtn = $("#send-btn");
  const composerStatus = $("#composer-status");

  function autosize() {
    ta.style.height = "auto";
    ta.style.height = Math.min(160, Math.max(44, ta.scrollHeight)) + "px";
  }
  autosize();
  ta.addEventListener("input", autosize);
  ta.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      $("#composer").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }
  });

  function setComposerStatus(text, kind) {
    composerStatus.textContent = text || "";
    composerStatus.className = "composer-status" + (kind ? " " + kind : "");
  }

  $("#composer").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = ta.value.trim();
    if (!v) {
      setComposerStatus("Type a message first", "warn");
      ta.focus();
      return;
    }
    const stream = $("#chat-stream");
    const u = document.createElement("div");
    u.className = "turn user pending";
    const safe = v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    u.innerHTML = `<div class="bubble"><p>${safe}</p><span class="send-status">Sending…</span></div>`;
    const composerSpacer = stream.querySelector(".composer-spacer");
    if (composerSpacer) stream.insertBefore(u, composerSpacer);
    else stream.appendChild(u);

    ta.value = "";
    autosize();

    // Disable Send briefly + status
    sendBtn.disabled = true;
    const originalLabel = sendBtn.textContent;
    sendBtn.textContent = "Sending…";
    setComposerStatus("Sending…", "sending");

    u.scrollIntoView({ behavior: "smooth", block: "end" });

    setTimeout(() => {
      // Mark sent
      u.classList.remove("pending");
      const status = u.querySelector(".send-status");
      if (status) status.textContent = "Sent · just now";
      sendBtn.disabled = false;
      sendBtn.textContent = originalLabel;
      setComposerStatus("Sent ✓", "success");
      setTimeout(() => setComposerStatus(""), 2000);

      // Pause run if it was live
      if (running) {
        pauseRun("Continuing with your reply…");
      }

      // typing indicator
      const typing = document.createElement("div");
      typing.className = "turn agent";
      typing.id = "agent-typing";
      typing.innerHTML = `<div class="avatar">FC</div><div class="bubble"><p class="muted">Forge is typing <span class="typing"><span></span><span></span><span></span></span></p></div>`;
      if (composerSpacer) stream.insertBefore(typing, composerSpacer);
      else stream.appendChild(typing);
      typing.scrollIntoView({ behavior: "smooth", block: "end" });

      setTimeout(() => {
        typing.remove();
        const a = document.createElement("div");
        a.className = "turn agent";
        a.innerHTML = `<div class="avatar">FC</div><div class="bubble"><p>Got it — I'll pause the current test run and re-plan against your note. Working…</p></div>`;
        if (composerSpacer) stream.insertBefore(a, composerSpacer);
        else stream.appendChild(a);
        a.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 900);
    }, 450);
  });

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
  let elapsed = 14;
  let running = true;
  let tick = null;
  const elapsedEl = $("#elapsed");
  const metaEl = $("#current-meta");
  const currentStep = $("#current-step");
  const liveCheck = $$(".diff-foot .check.live")[0];
  const runDot = $("#run-dot");
  const runStatus = $("#run-status");
  const runElapsedLabel = $("#run-elapsed-label");
  const interruptBtn = $("#interrupt-btn");
  const rerunBtn = $("#rerun-btn");

  function setRunStateUI(mode) {
    // mode: 'running' | 'paused' | 'done'
    runDot.classList.remove("live", "paused", "done");
    if (mode === "running") {
      runDot.classList.add("live");
      runStatus.textContent = "·  agent is working";
      interruptBtn.disabled = false;
      interruptBtn.textContent = "⏸ Interrupt";
      rerunBtn.disabled = false;
      rerunBtn.textContent = "↻ Rerun";
    } else if (mode === "paused") {
      runDot.classList.add("paused");
      runStatus.textContent = "·  paused";
      interruptBtn.disabled = true;
      interruptBtn.textContent = "⏸ Paused";
      rerunBtn.disabled = false;
      rerunBtn.textContent = "↻ Resume";
    } else if (mode === "done") {
      runDot.classList.add("done");
      runStatus.textContent = "·  finished";
      interruptBtn.disabled = true;
      interruptBtn.textContent = "⏸ Finished";
      rerunBtn.disabled = false;
      rerunBtn.textContent = "↻ Rerun";
    }
  }

  function startTick() {
    if (tick) return;
    running = true;
    setRunStateUI("running");
    tick = setInterval(() => {
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
          setRunStateUI("done");
          running = false;
          clearInterval(tick);
          tick = null;
        }
      }
    }, 1000);
  }
  startTick();

  function pauseRun(reason) {
    if (!running) return;
    clearInterval(tick);
    tick = null;
    running = false;
    setRunStateUI("paused");
    const interrupted = document.createElement("div");
    interrupted.className = "turn step";
    interrupted.innerHTML = `<div class="step-icon">⏸</div>
      <div class="step-body">
        <div class="step-title">Paused</div>
        <div class="step-meta">${(reason || "Run paused. Send a message to redirect, or click Resume.").replace(/</g,"&lt;")}</div>
      </div>
      <div class="step-time">just now</div>`;
    const stream = $("#chat-stream");
    const composerSpacer = stream.querySelector(".composer-spacer");
    if (composerSpacer) stream.insertBefore(interrupted, composerSpacer);
    else stream.appendChild(interrupted);
    interrupted.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  // ---------- interrupt ----------
  interruptBtn.addEventListener("click", () => {
    if (!running) {
      toast("Already paused", "Send a message or click Resume to continue.", "warn");
      return;
    }
    pauseRun("Interrupted by user. Send a message to redirect, or click Resume.");
    toast("Run paused", "Run #243 is paused. You can reply to redirect, or resume.", "success");
  });

  // ---------- rerun / resume ----------
  rerunBtn.addEventListener("click", () => {
    if (running) {
      // already running — show busy feedback
      toast("Already running", "Run #243 is in progress.", "warn");
      return;
    }
    // resume
    const stream = $("#chat-stream");
    const composerSpacer = stream.querySelector(".composer-spacer");
    const resumed = document.createElement("div");
    resumed.className = "turn step";
    resumed.innerHTML = `<div class="step-icon">▶</div>
      <div class="step-body">
        <div class="step-title">Resumed</div>
        <div class="step-meta">Continuing the test run from where it paused.</div>
      </div>
      <div class="step-time">just now</div>`;
    if (composerSpacer) stream.insertBefore(resumed, composerSpacer);
    else stream.appendChild(resumed);
    resumed.scrollIntoView({ behavior: "smooth", block: "end" });
    // Re-enable the current step indicator if not finished
    if (stateIdx < states.length - 1) {
      currentStep.classList.add("current");
      currentStep.classList.remove("done");
      currentStep.querySelector(".step-icon").textContent = "▶";
    }
    startTick();
    toast("Run resumed", "Run #243 is running again.", "success");
  });

  // ---------- mobile pane switching ----------
  const ide = $("#ide");
  function switchPane(pane) {
    ide.classList.remove("show-files", "show-chat", "show-diff");
    ide.classList.add("show-" + pane);
    $$("#pane-tabs button").forEach((b) => b.classList.toggle("active", b.dataset.pane === pane));
    // scroll to top so user sees the new pane
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }
  // default: show chat on mobile
  ide.classList.add("show-chat");
  $$("#pane-tabs button").forEach((b) => {
    b.addEventListener("click", () => switchPane(b.dataset.pane));
  });
  $("#mobile-pane-toggle").addEventListener("click", () => {
    // Cycle panes
    const order = ["files", "chat", "diff"];
    const current = order.find((p) => ide.classList.contains("show-" + p)) || "chat";
    const next = order[(order.indexOf(current) + 1) % order.length];
    switchPane(next);
  });

  // ---------- auto-apply toggle feedback ----------
  $("#auto-apply").addEventListener("change", (e) => {
    if (e.target.checked) {
      toast("Auto-apply on", "Edits will be applied to your working tree as the agent makes them.", "success");
    } else {
      toast("Auto-apply off", "Edits stay in the diff panel until you accept them.", "warn");
    }
  });
})();

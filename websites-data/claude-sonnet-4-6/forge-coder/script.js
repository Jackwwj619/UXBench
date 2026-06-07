(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toasts ----------
  function toast(message, opts = {}) {
    const region = $("#toast-region");
    if (!region) return null;
    const t = document.createElement("div");
    t.className = "toast" + (opts.kind ? " " + opts.kind : "");
    t.setAttribute("role", "status");
    const msg = document.createElement("span");
    msg.className = "toast-msg";
    msg.textContent = message;
    t.appendChild(msg);
    let actionBtn = null;
    if (opts.action) {
      actionBtn = document.createElement("button");
      actionBtn.className = "toast-action";
      actionBtn.type = "button";
      actionBtn.textContent = opts.action.label;
      actionBtn.addEventListener("click", () => {
        try { opts.action.onClick(); } finally { remove(); }
      });
      t.appendChild(actionBtn);
    }
    region.appendChild(t);
    const ttl = opts.duration || 3500;
    const timer = setTimeout(remove, ttl);
    function remove() {
      clearTimeout(timer);
      if (t.parentNode) t.parentNode.removeChild(t);
    }
    return { remove };
  }

  // ---------- mock file contents / diffs ----------
  const initialDiffHTML = $("#diff-body").innerHTML;
  const DIFFS = {
    "src/upload/chunker.ts": {
      stat: "+86 / −0",
      html: initialDiffHTML
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

  let currentDiffView = "unified";
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
      $("#diff-body").classList.remove("split-view");
      // reset diff tabs
      $$(".dt").forEach((b) => {
        const isUnified = b.dataset.view === "unified";
        b.classList.toggle("active", isUnified);
        b.setAttribute("aria-selected", isUnified ? "true" : "false");
      });
      currentDiffView = "unified";
      // on mobile, switch to diff pane
      if (window.matchMedia("(max-width: 880px)").matches) {
        switchPane("diff");
      }
    });
  });

  // ---------- file tree search ----------
  const filesSearchBtn = $("#files-search-btn");
  const filesSearchBox = $("#files-search");
  const filesSearchInput = $("#files-search-input");
  filesSearchBtn.addEventListener("click", () => {
    const isHidden = filesSearchBox.hasAttribute("hidden");
    if (isHidden) {
      filesSearchBox.removeAttribute("hidden");
      filesSearchInput.focus();
    } else {
      filesSearchBox.setAttribute("hidden", "");
      filesSearchInput.value = "";
      applyFileFilter("");
    }
  });
  filesSearchInput.addEventListener("input", () => applyFileFilter(filesSearchInput.value));
  filesSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      filesSearchInput.value = "";
      applyFileFilter("");
      filesSearchBox.setAttribute("hidden", "");
    }
  });
  function applyFileFilter(q) {
    const needle = q.trim().toLowerCase();
    $$(".tree .file").forEach((f) => {
      const path = (f.dataset.file || f.textContent).toLowerCase();
      const match = !needle || path.includes(needle);
      f.classList.toggle("hidden-by-search", !match);
    });
    // expand folders that contain matches; collapse empty ones
    $$(".tree .folder").forEach((folder) => {
      const hasVisible = $$(".file", folder).some((f) => !f.classList.contains("hidden-by-search"));
      if (needle) {
        if (hasVisible) folder.classList.add("open");
      }
    });
  }

  // ---------- new file (mock) ----------
  $("#files-add-btn").addEventListener("click", () => {
    toast("New file: connect a repo to enable file creation.", { kind: "warn" });
  });

  // ---------- header buttons ----------
  $("#connect-repo-btn").addEventListener("click", () => {
    toast("Connect-a-repo flow is unavailable in this demo.", { kind: "warn" });
  });
  $("#open-vscode-btn").addEventListener("click", () => {
    toast("Open in VS Code is disabled in the demo (no local handler).", { kind: "warn" });
  });
  $("#open-editor-btn").addEventListener("click", () => {
    toast("Open editor is unavailable in this demo.", { kind: "warn" });
  });

  // ---------- nav tabs ----------
  $$(".topbar nav a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      $$(".topbar nav a").forEach((x) => {
        x.classList.remove("active");
        x.removeAttribute("aria-current");
      });
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
      const tab = a.dataset.tab;
      if (tab && tab !== "agent") {
        toast(`${a.textContent} is coming soon in this demo.`, { kind: "warn" });
      }
      // close mobile menu
      const nav = $("#primary-nav");
      nav.classList.remove("open");
      $("#nav-toggle").setAttribute("aria-expanded", "false");
    });
  });

  // ---------- mobile nav toggle ----------
  $("#nav-toggle").addEventListener("click", () => {
    const nav = $("#primary-nav");
    const open = nav.classList.toggle("open");
    $("#nav-toggle").setAttribute("aria-expanded", open ? "true" : "false");
  });

  // ---------- mobile pane switching ----------
  function switchPane(name) {
    $$(".pane-tab").forEach((b) => {
      const active = b.dataset.pane === name;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
    $$(".ide > [data-pane]").forEach((p) => {
      p.classList.toggle("active-pane", p.dataset.pane === name);
    });
  }
  $$(".pane-tab").forEach((b) => {
    b.addEventListener("click", () => switchPane(b.dataset.pane));
  });
  // initialize default pane on small screens
  function initMobilePane() {
    if (window.matchMedia("(max-width: 880px)").matches) {
      const anyActive = $$(".ide > [data-pane].active-pane").length > 0;
      if (!anyActive) switchPane("chat");
    } else {
      $$(".ide > [data-pane]").forEach((p) => p.classList.remove("active-pane"));
    }
  }
  initMobilePane();
  window.addEventListener("resize", initMobilePane);

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

  $("#composer").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = ta.value.trim();
    if (!v) return;

    const sendBtn = $("#send-btn");
    sendBtn.disabled = true;
    sendBtn.classList.add("is-sending");
    const sendLabel = sendBtn.textContent;
    sendBtn.innerHTML = '<span class="spinner"></span>Sending…';

    const stream = $("#chat-stream");
    const u = document.createElement("div");
    u.className = "turn user pending";
    u.innerHTML = `<div class="bubble"><p>${v.replace(/</g,"&lt;")}</p></div>`;
    stream.appendChild(u);
    ta.value = ""; autosize();
    const composerSpacer = stream.querySelector(".composer-spacer");
    if (composerSpacer) stream.appendChild(composerSpacer);
    u.scrollIntoView({ behavior: "smooth", block: "end" });

    setTimeout(() => {
      u.classList.remove("pending");
      sendBtn.disabled = false;
      sendBtn.classList.remove("is-sending");
      sendBtn.textContent = sendLabel || "Send";
      const a = document.createElement("div");
      a.className = "turn agent";
      a.innerHTML = `<div class="avatar">FC</div><div class="bubble"><p>Got it — I'll pause the current test run and re-plan against your note. Working…</p></div>`;
      stream.insertBefore(a, composerSpacer);
      a.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 700);
  });

  // ---------- run state helpers ----------
  const runState = $("#run-state");
  const runDot = $("#run-dot");
  const runStatusLabel = $("#run-status-label");
  const runElapsedLabel = $("#run-elapsed-label");
  function setRunState(state) {
    runState.classList.remove("is-working", "is-paused", "is-finished");
    runDot.classList.remove("live", "paused", "finished");
    if (state === "working") {
      runState.classList.add("is-working");
      runDot.classList.add("live");
      runStatusLabel.textContent = "·  agent is working";
    } else if (state === "paused") {
      runState.classList.add("is-paused");
      runDot.classList.add("paused");
      runStatusLabel.textContent = "·  paused by you";
    } else if (state === "finished") {
      runState.classList.add("is-finished");
      runDot.classList.add("finished");
      runStatusLabel.textContent = "·  agent finished";
    }
  }
  setRunState("working");

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
  const liveCheck = $("#tests-check");
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
        setRunState("finished");
        clearInterval(tick);
      }
    }
  }, 1000);

  // ---------- interrupt / rerun ----------
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
    setRunState("paused");
  });

  $("#rerun-btn").addEventListener("click", () => {
    toast("Rerun queued — restarting from the beginning of the run.", { kind: "ok" });
  });

  // ---------- diff view: split / unified ----------
  function buildSplitView() {
    const body = $("#diff-body");
    const pre = body.querySelector("pre");
    if (!pre) return;
    // Parse the diff lines
    const lines = $$("code > span", pre);
    const left = []; const right = [];
    let header = "";
    lines.forEach((ln) => {
      if (ln.classList.contains("d-head")) {
        header = ln.textContent;
      } else if (ln.classList.contains("d-add")) {
        right.push({ kind: "add", text: ln.textContent.replace(/^\+ ?/, "") });
      } else if (ln.classList.contains("d-del")) {
        left.push({ kind: "del", text: ln.textContent.replace(/^- ?/, "") });
      } else {
        // context — appears in both
        const text = ln.textContent.replace(/^ /, "");
        left.push({ kind: "ctx", text });
        right.push({ kind: "ctx", text });
      }
    });
    // remove any prior split grid
    const old = body.querySelector(".split-grid");
    if (old) old.remove();
    const grid = document.createElement("div");
    grid.className = "split-grid";
    grid.innerHTML = `
      <div class="split-pane">
        <h4>Before${header ? " · " + header.replace(/^@@.+@@\s*/, "") : ""}</h4>
        ${left.map((l) => `<span class="split-line ${l.kind === "del" ? "del" : ""}">${escapeHtml(l.text) || "&nbsp;"}</span>`).join("")}
      </div>
      <div class="split-pane">
        <h4>After</h4>
        ${right.map((l) => `<span class="split-line ${l.kind === "add" ? "add" : ""}">${escapeHtml(l.text) || "&nbsp;"}</span>`).join("")}
      </div>`;
    body.appendChild(grid);
  }
  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  $$(".dt").forEach((b) => {
    b.addEventListener("click", () => {
      const view = b.dataset.view;
      $$(".dt").forEach((x) => {
        x.classList.toggle("active", x === b);
        x.setAttribute("aria-selected", x === b ? "true" : "false");
      });
      const body = $("#diff-body");
      if (view === "split") {
        buildSplitView();
        body.classList.add("split-view");
      } else {
        body.classList.remove("split-view");
        const grid = body.querySelector(".split-grid");
        if (grid) grid.remove();
      }
      currentDiffView = view;
    });
  });

  // ---------- accept / reject all changes ----------
  const acceptModal = $("#accept-modal");
  const acceptBtn = $("#accept-all-btn");
  const rejectBtn = $("#reject-all-btn");
  let modalLastFocus = null;

  function openAcceptModal() {
    modalLastFocus = document.activeElement;
    acceptModal.removeAttribute("hidden");
    $("#accept-modal-confirm").focus();
  }
  function closeAcceptModal() {
    acceptModal.setAttribute("hidden", "");
    if (modalLastFocus && typeof modalLastFocus.focus === "function") modalLastFocus.focus();
  }
  acceptBtn.addEventListener("click", openAcceptModal);
  $("#accept-modal-cancel").addEventListener("click", closeAcceptModal);
  acceptModal.addEventListener("click", (e) => {
    if (e.target === acceptModal) closeAcceptModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !acceptModal.hasAttribute("hidden")) closeAcceptModal();
  });

  $("#accept-modal-confirm").addEventListener("click", () => {
    closeAcceptModal();
    // mark each modified file as accepted (mock)
    const acceptedFiles = $$(".file.dirty, .file.added").map((f) => f.dataset.file).filter(Boolean);
    let undone = false;
    const restore = acceptedFiles.map((file) => {
      const el = $$(`.file[data-file="${file}"]`)[0];
      return { el, classes: el ? Array.from(el.classList) : [], badgeHtml: el ? el.innerHTML : "" };
    });
    // visually mark as accepted
    restore.forEach(({ el }) => {
      if (!el) return;
      el.classList.remove("dirty", "added");
      const badge = el.querySelector(".badge");
      if (badge) badge.remove();
    });
    toast("Changes accepted across " + acceptedFiles.length + " files.", {
      kind: "ok",
      duration: 5000,
      action: {
        label: "Undo",
        onClick: () => {
          undone = true;
          restore.forEach((r) => {
            if (!r.el) return;
            r.el.className = r.classes.join(" ");
            r.el.innerHTML = r.badgeHtml;
          });
          toast("Acceptance undone.", { kind: "warn" });
        }
      }
    });
  });

  rejectBtn.addEventListener("click", () => {
    if (!confirm("Reject all proposed changes? The agent's edits will be discarded.")) return;
    toast("All proposed changes rejected.", { kind: "warn" });
  });
})();

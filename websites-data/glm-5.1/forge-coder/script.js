(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

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
    setTimeout(() => {
      const a = document.createElement("div");
      a.className = "turn agent";
      a.innerHTML = `<div class="avatar">FC</div><div class="bubble"><p>Got it — I'll pause the current test run and re-plan against your note. Working…</p></div>`;
      stream.insertBefore(a, composerSpacer);
      a.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 350);
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

  // ---------- toast helper ----------
  const toast = $("#tab-toast");
  let toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2400);
  }

  // ---------- interrupt / resume ----------
  let runState = "running"; // running | paused
  let runNumber = 243;
  const interruptBtn = $("#interrupt-btn");
  const runStatus = $("#run-status");
  const runDot = $$(".run-state .dot")[0];

  function setRunState(state) {
    runState = state;
    if (state === "paused") {
      clearInterval(tick);
      interruptBtn.innerHTML = "▶ Resume";
      interruptBtn.classList.remove("danger");
      interruptBtn.classList.add("is-paused");
      interruptBtn.setAttribute("title", "Resume the agent run");
      if (runDot) runDot.classList.remove("live");
      if (runStatus) runStatus.textContent = "·  paused";
    } else if (state === "running") {
      interruptBtn.innerHTML = "⏸ Interrupt";
      interruptBtn.classList.add("danger");
      interruptBtn.classList.remove("is-paused");
      interruptBtn.setAttribute("title", "Pause the agent run");
      if (runDot) runDot.classList.add("live");
      if (runStatus) runStatus.textContent = "·  agent is working";
    }
  }

  interruptBtn.addEventListener("click", () => {
    if (runState === "running") {
      const interrupted = document.createElement("div");
      interrupted.className = "turn step";
      interrupted.innerHTML = `<div class="step-icon">⏸</div>
        <div class="step-body">
          <div class="step-title">Interrupted by user</div>
          <div class="step-meta">Run paused. Send a message to redirect, or click Resume to continue.</div>
        </div>
        <div class="step-time">just now</div>`;
      $("#chat-stream").insertBefore(interrupted, $(".composer-spacer"));
      setRunState("paused");
      showToast("Run paused");
    } else {
      const resumed = document.createElement("div");
      resumed.className = "turn step";
      resumed.innerHTML = `<div class="step-icon">▶</div>
        <div class="step-body">
          <div class="step-title">Resumed by user</div>
          <div class="step-meta">Continuing the agent run.</div>
        </div>
        <div class="step-time">just now</div>`;
      $("#chat-stream").insertBefore(resumed, $(".composer-spacer"));
      setRunState("running");
      showToast("Run resumed");
    }
  });

  // ---------- rerun with visible feedback ----------
  const rerunBtn = $("#rerun-btn");
  const runLabel = $("#run-label");
  if (rerunBtn) {
    rerunBtn.addEventListener("click", () => {
      if (rerunBtn.disabled) return;
      const original = rerunBtn.innerHTML;
      rerunBtn.disabled = true;
      rerunBtn.classList.add("is-busy");
      rerunBtn.innerHTML = `<span class="spinner" aria-hidden="true"></span>Starting…`;
      runNumber++;
      if (runLabel) runLabel.textContent = "Run #" + runNumber;
      if (runStatus) runStatus.textContent = "·  starting rerun";
      if (runDot) runDot.classList.add("live");
      showToast("Rerun #" + runNumber + " started");

      const note = document.createElement("div");
      note.className = "turn step";
      note.innerHTML = `<div class="step-icon">↻</div>
        <div class="step-body">
          <div class="step-title">Rerun started — Run #${runNumber}</div>
          <div class="step-meta">Replaying the agent task with the same prompt.</div>
        </div>
        <div class="step-time">just now</div>`;
      const spacer = $(".composer-spacer");
      if (spacer) $("#chat-stream").insertBefore(note, spacer);

      setTimeout(() => {
        rerunBtn.disabled = false;
        rerunBtn.classList.remove("is-busy");
        rerunBtn.innerHTML = original;
        if (runStatus) runStatus.textContent = "·  agent is working";
        if (runState === "paused") setRunState("running");
      }, 1400);
    });
  }

  // ---------- nav tabs (single-page demo views) ----------
  const NAV_VIEWS = {
    agent: null,
    inbox: "Inbox is part of the full product. This demo shows the Agent view only.",
    runs: "Runs history is part of the full product. This demo shows the Agent view only.",
    settings: "Settings is part of the full product. This demo shows the Agent view only."
  };
  $$("#main-nav a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const tab = a.dataset.tab;
      $$("#main-nav a").forEach((x) => {
        x.classList.remove("active");
        x.removeAttribute("aria-current");
      });
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
      const msg = NAV_VIEWS[tab];
      if (msg) showToast(msg);
    });
  });

  // ---------- diff view toggle ----------
  const diffBody = $("#diff-body");
  function renderSplit() {
    if (!diffBody) return;
    const code = diffBody.querySelector("code");
    if (!code) return;
    const lines = Array.from(code.children);
    const left = [], right = [];
    lines.forEach((ln) => {
      if (ln.classList.contains("d-add")) {
        left.push('<span class="d-ctx">&nbsp;</span>');
        right.push(ln.outerHTML);
      } else if (ln.classList.contains("d-del")) {
        left.push(ln.outerHTML);
        right.push('<span class="d-ctx">&nbsp;</span>');
      } else {
        left.push(ln.outerHTML);
        right.push(ln.outerHTML);
      }
    });
    diffBody.classList.add("split-mode");
    diffBody.innerHTML =
      `<pre><code>${left.join("")}</code><code>${right.join("")}</code></pre>`;
  }
  let unifiedSnapshot = diffBody ? diffBody.innerHTML : "";
  // Re-snapshot whenever a file selection changes so toggling stays consistent.
  $$(".file").forEach((f) => {
    f.addEventListener("click", () => {
      // After the existing handler updates innerHTML, capture it.
      setTimeout(() => {
        diffBody.classList.remove("split-mode");
        unifiedSnapshot = diffBody.innerHTML;
        // Reset toggle to Unified as default per file.
        $$(".dt").forEach((b) => {
          const isUnified = b.dataset.mode === "unified";
          b.classList.toggle("active", isUnified);
          b.setAttribute("aria-selected", isUnified ? "true" : "false");
        });
      }, 0);
    });
  });
  $$(".dt").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;
      $$(".dt").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      if (mode === "split") {
        if (!diffBody.classList.contains("split-mode")) {
          unifiedSnapshot = diffBody.innerHTML;
          renderSplit();
        }
      } else {
        diffBody.classList.remove("split-mode");
        diffBody.innerHTML = unifiedSnapshot;
      }
    });
  });

  // ---------- mobile pane tabs ----------
  const ide = $(".ide");
  $$(".mtab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".mtab").forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      if (ide) ide.dataset.activePane = tab.dataset.pane;
    });
  });
})();

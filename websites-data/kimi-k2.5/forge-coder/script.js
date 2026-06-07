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

  // ---------- toast / status feedback ----------
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);
  let toastTimer;
  function flash(msg, kind) {
    toast.textContent = msg;
    toast.className = "show " + (kind || "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.className = ""; }, 2400);
  }

  // ---------- folder toggle + file select (event delegation, robust) ----------
  const tree = $("#tree");
  function selectFile(li) {
    if (!li || !li.dataset.file) return;
    $$(".file.selected", tree).forEach((x) => x.classList.remove("selected"));
    li.classList.add("selected");
    const file = li.dataset.file;
    const diff = DIFFS[file] || defaultDiff(file);
    $("#diff-file").textContent = file;
    $("#diff-stat").textContent = diff.stat;
    $("#diff-body").innerHTML = diff.html;
    // visually confirm the diff pane changed
    const body = $("#diff-body");
    body.classList.remove("flash");
    void body.offsetWidth;
    body.classList.add("flash");
    flash("Showing diff: " + file);
  }

  if (tree) {
    tree.addEventListener("click", (e) => {
      // folder header click toggles open/closed
      const folderSpan = e.target.closest(".folder > span");
      if (folderSpan && tree.contains(folderSpan)) {
        folderSpan.parentElement.classList.toggle("open");
        return;
      }
      // file row click selects + loads diff
      const fileLi = e.target.closest("li.file");
      if (fileLi && tree.contains(fileLi)) {
        e.stopPropagation();
        selectFile(fileLi);
      }
    });
    // keyboard activation
    $$("li.file", tree).forEach((li) => {
      li.tabIndex = 0;
      li.setAttribute("role", "button");
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectFile(li);
        }
      });
    });
  }

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
    flash("Run paused");
  });

  // ---------- rerun ----------
  const rerunBtn = $("#rerun-btn");
  if (rerunBtn) {
    rerunBtn.addEventListener("click", () => {
      if (rerunBtn.classList.contains("loading")) return;
      clearInterval(tick);
      rerunBtn.classList.add("loading");
      const original = rerunBtn.textContent;
      rerunBtn.textContent = "↻ Starting…";
      rerunBtn.disabled = true;

      // update run-state header
      const dot = $$(".run-state .dot")[0];
      const muted = $$(".run-state .muted")[0];
      if (dot) { dot.classList.add("live"); }
      if (muted) muted.textContent = "·  rerunning…";

      // append a status step
      const stream = $("#chat-stream");
      const step = document.createElement("div");
      step.className = "turn step current";
      step.innerHTML = `<div class="step-icon">↻</div>
        <div class="step-body">
          <div class="step-title">Rerun triggered</div>
          <div class="step-meta">Restarting from the last green checkpoint…</div>
        </div>
        <div class="step-time">just now</div>`;
      const spacer = $(".composer-spacer");
      stream.insertBefore(step, spacer);
      step.scrollIntoView({ behavior: "smooth", block: "end" });
      flash("Rerun started", "ok");

      setTimeout(() => {
        rerunBtn.classList.remove("loading");
        rerunBtn.textContent = original;
        rerunBtn.disabled = false;
        if (muted) muted.textContent = "·  agent is working";
      }, 1200);
    });
  }

  // ---------- accept all changes ----------
  const acceptBtn = $("#accept-all-btn");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      if (acceptBtn.disabled) return;
      const original = acceptBtn.textContent;
      acceptBtn.disabled = true;
      acceptBtn.textContent = "Applying…";
      setTimeout(() => {
        // clear the M / + badges and dirty/added classes
        $$(".tree .badge").forEach((b) => b.remove());
        $$(".tree .file.dirty").forEach((f) => f.classList.remove("dirty"));
        $$(".tree .file.added").forEach((f) => f.classList.remove("added"));
        // update file footer counts
        const rows = $$(".files-foot .stat-row strong");
        if (rows[0]) rows[0].textContent = "0";
        if (rows[1]) rows[1].textContent = "0";
        // update diff stat
        const stat = $("#diff-stat");
        if (stat) stat.textContent = "applied";
        // success state on button
        acceptBtn.textContent = "✓ Applied";
        acceptBtn.classList.add("applied");
        flash("All changes accepted", "ok");
        // append step
        const stream = $("#chat-stream");
        const step = document.createElement("div");
        step.className = "turn step done";
        step.innerHTML = `<div class="step-icon">✓</div>
          <div class="step-body">
            <div class="step-title">Accepted all changes</div>
            <div class="step-meta">Applied diffs across 4 files · staged for commit</div>
          </div>
          <div class="step-time">just now</div>`;
        stream.insertBefore(step, $(".composer-spacer"));
        setTimeout(() => {
          acceptBtn.disabled = false;
          acceptBtn.textContent = original;
          acceptBtn.classList.remove("applied");
        }, 2200);
      }, 600);
    });
  }

  // ---------- open editor / open in VS Code / connect repo ----------
  function buttonAck(btn, msg) {
    if (!btn) return;
    btn.classList.add("loading");
    const original = btn.textContent;
    btn.textContent = "Opening…";
    flash(msg);
    setTimeout(() => {
      btn.classList.remove("loading");
      btn.textContent = original;
    }, 1100);
  }
  $("#open-editor-btn") && $("#open-editor-btn").addEventListener("click", () => {
    buttonAck($("#open-editor-btn"), "Launching editor…");
  });
  $("#open-vscode-btn") && $("#open-vscode-btn").addEventListener("click", () => {
    buttonAck($("#open-vscode-btn"), "Launching VS Code…");
  });
  $("#connect-repo-btn") && $("#connect-repo-btn").addEventListener("click", () => {
    flash("Repo connection dialog (demo) — not wired in this preview");
  });

  // ---------- new file / search ----------
  $("#new-file-btn") && $("#new-file-btn").addEventListener("click", () => {
    const name = (window.prompt && window.prompt("New file path", "src/upload/notes.ts")) || "";
    if (!name) { flash("New file cancelled"); return; }
    const tree = $("#tree");
    if (!tree) return;
    const li = document.createElement("li");
    li.className = "file added";
    li.dataset.file = name;
    li.innerHTML = `<span class="ico">›</span>${name.split("/").pop()} <span class="badge new">+</span>`;
    tree.appendChild(li);
    li.addEventListener("click", (e) => {
      e.stopPropagation();
      $$(".file.selected").forEach((x) => x.classList.remove("selected"));
      li.classList.add("selected");
      $("#diff-file").textContent = name;
      $("#diff-stat").textContent = "+0 / −0";
      $("#diff-body").innerHTML = `<pre><code><span class="d-head">${name}</span>\n<span class="d-ctx"> Empty file. Start writing.</span></code></pre>`;
    });
    flash("Added " + name, "ok");
  });
  $("#search-btn") && $("#search-btn").addEventListener("click", () => {
    flash("Search (demo) — type to filter files");
  });

  // ---------- top nav (visual switch) ----------
  const topnav = $("#topnav");
  if (topnav) {
    topnav.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-view]");
      if (!a) return;
      e.preventDefault();
      $$("a", topnav).forEach((x) => x.classList.remove("active"));
      a.classList.add("active");
      flash("Viewing: " + a.textContent.trim());
    });
  }
})();

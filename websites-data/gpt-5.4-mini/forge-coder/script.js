(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- toast helper ----------
  const toastStack = $("#toast-stack");
  function toast(title, meta, kind = "") {
    if (!toastStack) return;
    const el = document.createElement("div");
    el.className = "toast" + (kind ? " " + kind : "");
    el.innerHTML = `<strong></strong><span class="toast-meta"></span>`;
    el.querySelector("strong").textContent = title;
    if (meta) el.querySelector(".toast-meta").textContent = meta;
    toastStack.appendChild(el);
    setTimeout(() => {
      el.style.transition = "opacity 240ms ease, transform 240ms ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(6px)";
      setTimeout(() => el.remove(), 260);
    }, 2400);
  }
  function flashOk(btn) {
    if (!btn) return;
    btn.classList.add("flash-ok");
    setTimeout(() => btn.classList.remove("flash-ok"), 700);
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

  // ---------- mobile pane switching ----------
  const mobileMq = window.matchMedia("(max-width: 720px)");
  function applyPane(name) {
    document.body.classList.remove("pane-files", "pane-chat", "pane-diff");
    document.body.classList.add("pane-" + name);
    $$(".pane-tab").forEach(b => {
      const active = b.dataset.pane === name;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }
  function syncPaneForViewport() {
    if (mobileMq.matches) {
      if (!document.body.className.match(/pane-/)) applyPane("chat");
    } else {
      document.body.classList.remove("pane-files", "pane-chat", "pane-diff");
    }
  }
  syncPaneForViewport();
  mobileMq.addEventListener ? mobileMq.addEventListener("change", syncPaneForViewport) : mobileMq.addListener(syncPaneForViewport);
  $$(".pane-tab").forEach(b => {
    b.addEventListener("click", () => applyPane(b.dataset.pane));
  });

  // ---------- top-nav: surface as toast (placeholder destinations) ----------
  $$("#topnav a").forEach(a => {
    a.addEventListener("click", (e) => {
      const section = a.dataset.section;
      $$("#topnav a").forEach(x => x.classList.remove("active"));
      a.classList.add("active");
      if (section !== "agent") {
        e.preventDefault();
        toast(cap(section) + " — demo only", "This is a static fixture; only Agent is wired up.", "warn");
      }
    });
  });
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

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
      const body = $("#diff-body");
      body.innerHTML = diff.html;
      // re-apply current view mode
      const mode = $$(".dt.active")[0]?.dataset.mode || "unified";
      body.classList.toggle("split", mode === "split");
      if (mobileMq.matches) applyPane("diff");
    });
  });

  // ---------- file search ----------
  const searchBtn = $("#files-search-btn");
  const searchBox = $("#files-search");
  const searchInput = $("#files-search-input");
  searchBtn.addEventListener("click", () => {
    const open = searchBox.classList.toggle("open");
    searchBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      setTimeout(() => searchInput.focus(), 30);
    } else {
      searchInput.value = "";
      filterTree("");
    }
  });
  searchInput.addEventListener("input", () => filterTree(searchInput.value));
  function filterTree(q) {
    const needle = (q || "").toLowerCase().trim();
    $$(".tree .file").forEach(f => {
      const path = (f.dataset.file || f.textContent || "").toLowerCase();
      const match = !needle || path.includes(needle);
      f.classList.toggle("search-hidden", !match);
    });
  }

  // ---------- new file (mock) ----------
  $("#files-new-btn").addEventListener("click", (e) => {
    flashOk(e.currentTarget);
    toast("New file", "Open the editor to create a file in this run.", "warn");
  });

  // ---------- composer ----------
  const ta = $("#msg");
  const sendBtn = $("#send-btn");
  const statusEl = $("#composer-status");
  function setStatus(text, kind) {
    if (!statusEl) return;
    statusEl.classList.remove("sent", "working");
    if (kind) statusEl.classList.add(kind);
    statusEl.textContent = text || "";
  }
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
    if (!v) {
      setStatus("Type a message before sending", "working");
      ta.focus();
      setTimeout(() => setStatus(""), 1800);
      return;
    }
    const stream = $("#chat-stream");
    const u = document.createElement("div");
    u.className = "turn user";
    u.innerHTML = `<div class="bubble"><p></p></div>`;
    u.querySelector("p").textContent = v;
    const composerSpacer = stream.querySelector(".composer-spacer");
    if (composerSpacer) stream.insertBefore(u, composerSpacer);
    else stream.appendChild(u);
    ta.value = ""; autosize();
    u.scrollIntoView({ behavior: "smooth", block: "end" });

    // immediate visual feedback
    sendBtn.classList.add("is-loading");
    sendBtn.disabled = true;
    setStatus("Sending…", "working");

    setTimeout(() => {
      sendBtn.classList.remove("is-loading");
      sendBtn.disabled = false;
      setStatus("Sent · agent is working", "sent");
      flashOk(sendBtn);
    }, 220);

    setTimeout(() => {
      const a = document.createElement("div");
      a.className = "turn agent";
      a.innerHTML = `<div class="avatar">FC</div><div class="bubble"><p>Got it — I'll pause the current test run and re-plan against your note. Working…</p></div>`;
      if (composerSpacer) stream.insertBefore(a, composerSpacer);
      else stream.appendChild(a);
      a.scrollIntoView({ behavior: "smooth", block: "end" });
      setStatus("");
    }, 800);
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
    toast("Run paused", "Send a message to redirect, or rerun.", "warn");
  });

  // ---------- diff tabs (Unified / Split) ----------
  $$(".diff-tabs .dt").forEach(tab => {
    tab.addEventListener("click", () => {
      $$(".diff-tabs .dt").forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const mode = tab.dataset.mode;
      $("#diff-body").classList.toggle("split", mode === "split");
      toast(mode === "split" ? "Split view" : "Unified view", null, "ok");
    });
  });

  // ---------- Open editor / Accept all changes ----------
  $("#open-editor-btn").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    btn.classList.add("is-loading");
    btn.disabled = true;
    setTimeout(() => {
      btn.classList.remove("is-loading");
      btn.disabled = false;
      flashOk(btn);
      const file = $("#diff-file").textContent || "current file";
      toast("Opening in VS Code", file + " — handing off to the editor.", "ok");
    }, 360);
  });

  $("#accept-all-btn").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    if (btn.dataset.confirming === "1") {
      // confirmed -> apply
      btn.dataset.confirming = "";
      btn.classList.add("is-loading");
      btn.disabled = true;
      btn.textContent = "Applying…";
      setTimeout(() => {
        btn.classList.remove("is-loading");
        btn.disabled = false;
        btn.textContent = "Changes accepted";
        flashOk(btn);
        toast("Accepted all changes", "3 modified · 1 added · +128 / −54 lines", "ok");
        // surface in chat stream too
        const stream = $("#chat-stream");
        const composerSpacer = stream.querySelector(".composer-spacer");
        const note = document.createElement("div");
        note.className = "turn step done";
        note.innerHTML = `<div class="step-icon">✓</div>
          <div class="step-body">
            <div class="step-title">Accepted all changes</div>
            <div class="step-meta">3 modified · 1 added · staged for commit</div>
          </div>
          <div class="step-time">just now</div>`;
        if (composerSpacer) stream.insertBefore(note, composerSpacer);
        else stream.appendChild(note);
        note.scrollIntoView({ behavior: "smooth", block: "end" });
        setTimeout(() => {
          btn.textContent = "Accept all changes";
        }, 2200);
      }, 480);
    } else {
      // first click -> ask for confirmation
      btn.dataset.confirming = "1";
      const original = btn.textContent;
      btn.textContent = "Click again to confirm";
      btn.classList.add("flash-ok");
      toast("Confirm acceptance?", "This will stage all 4 changed files.", "warn");
      setTimeout(() => {
        if (btn.dataset.confirming === "1") {
          btn.dataset.confirming = "";
          btn.textContent = original;
          btn.classList.remove("flash-ok");
        }
      }, 4000);
    }
  });

  // ---------- header buttons (Connect / Open VS Code) ----------
  $$(".topbar .actions button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      flashOk(btn);
      toast(btn.textContent.trim(), "Demo action — no external app available.", "warn");
    });
  });

  // ---------- Rerun ----------
  const rerunBtn = $$(".chat-tools button").find(b => /Rerun/i.test(b.textContent));
  if (rerunBtn) {
    rerunBtn.addEventListener("click", () => {
      flashOk(rerunBtn);
      toast("Rerun queued", "Restarting from the last instruction.", "ok");
    });
  }
})();

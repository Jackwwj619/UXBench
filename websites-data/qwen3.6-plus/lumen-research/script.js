(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- citation highlighting ----------
  $$(".cite").forEach((c) => {
    c.addEventListener("mouseenter", () => {
      const id = c.dataset.cite;
      const src = $(`.src[data-cite="${id}"]`);
      if (src) {
        src.classList.add("highlight");
        src.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
    c.addEventListener("mouseleave", () => {
      $$(".src.highlight").forEach((s) => s.classList.remove("highlight"));
    });
    c.addEventListener("click", (e) => {
      e.preventDefault();
      const id = c.dataset.cite;
      const src = $(`.src[data-cite="${id}"]`);
      if (src) src.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
  $$(".src").forEach((s) => {
    s.addEventListener("mouseenter", () => {
      const id = s.dataset.cite;
      $$(`.cite[data-cite="${id}"]`).forEach((c) => c.classList.add("highlight"));
    });
    s.addEventListener("mouseleave", () => {
      $$(".cite").forEach((c) => c.classList.remove("highlight"));
    });
  });

  // ---------- composer ----------
  const ta = $("#prompt");
  const composer = $("#composer");
  const convo = $("#conversation");
  function autosize() {
    ta.style.height = "auto";
    ta.style.height = Math.min(200, ta.scrollHeight) + "px";
  }
  ta.addEventListener("input", autosize);
  ta.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      composer.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }
  });

  function appendMsg(role, html) {
    const article = document.createElement("article");
    article.className = "msg " + role;
    if (role === "assistant") {
      article.innerHTML = `<div class="avatar a">L</div><div class="bubble">${html}</div>`;
    } else {
      article.innerHTML = `<div class="bubble">${html}</div>`;
    }
    convo.appendChild(article);
    article.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  composer.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = ta.value.trim();
    if (!value) return;
    appendMsg("user", `<p>${value.replace(/</g,"&lt;")}</p>`);
    ta.value = ""; autosize();
    // mock assistant reply
    setTimeout(() => {
      appendMsg("assistant", `
        <p><em>Thinking out loud while I assemble sources…</em></p>
        <p>Here's a first pass. The most directly relevant body of work is the chronotype × intervention literature; I'll prioritize that and bring in a couple of negative results to keep the picture honest.</p>
        <p>I added 3 new sources to the panel on the right. Want me to dig into any of them in particular?</p>`);
    }, 400);
  });

  // suggestion chips
  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      ta.value = chip.dataset.q;
      autosize();
      ta.focus();
    });
  });

  // tabs
  const srcList = $(".src-list");
  function flashSources() {
    if (!srcList) return;
    srcList.classList.remove("flash");
    void srcList.offsetWidth;
    srcList.classList.add("flash");
    srcList.scrollTop = 0;
  }
  $$(".src-tabs .tab").forEach((t) => {
    t.addEventListener("click", () => {
      $$(".src-tabs .tab").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      flashSources();
    });
  });

  // sort selector (right rail) — provide visible feedback on change
  const sortSel = document.getElementById("src-sort");
  if (sortSel) sortSel.addEventListener("change", flashSources);

  // thread switching — load a different demo conversation into the canvas
  const threadContent = {
    "Deep work scheduling literature": null, // keep original
    "EV battery recycling policy in Norway":
      "<p>Norway's EV battery recycling framework leans on the EU Battery Regulation (2023/1542), but with stricter domestic targets for cobalt and lithium recovery. Want a comparison with Sweden's approach, or a focus on producer-responsibility schemes?</p>",
    "Trace prevalence of seal influenza H10N7":
      "<p>H10N7 has been documented in harbor-seal die-offs in the North Sea since 2014. The strain shows mammalian-adaptation markers but limited human spillover risk to date. Should I pull the most recent surveillance studies?</p>",
    "Comparative grad-school stipends in CS":
      "<p>CS PhD stipends in 2024 ranged from ~$28k (mid-tier US public) to ~$55k (top-10 US private), with European programs typically lower in nominal terms but higher when adjusted for healthcare and tuition. Want a regional breakdown?</p>",
    "Microclimate effects of urban rooftop gardens":
      "<p>Recent work shows extensive rooftop gardens reduce surface temperatures by 4–8°C on summer afternoons and shift local humidity by 5–12%. Effects on building energy use vary with insulation. Want details on specific cities?</p>",
    "Late-Holocene shoreline shifts, NW Europe":
      "<p>NW European shorelines record several meters of net retreat over the late Holocene, driven by isostatic and eustatic factors that vary along the coast. Should I focus on the Dutch coast, the Wadden Sea, or the UK eastern coast?</p>",
    "Why does ringing happen in step responses":
      "<p>Ringing arises in underdamped second-order (or higher) systems where complex-conjugate poles sit close to the imaginary axis. It's controlled by damping ratio ζ — values below ~0.7 produce visible overshoot. Want the math or design heuristics?</p>",
    "Survey: open-source funding models 2024":
      "<p>The 2024 landscape shows three dominant models: foundation-backed (e.g., Linux, Apache), commercial open-core (e.g., GitLab, Elastic), and individual maintainer sponsorship (GitHub Sponsors, Open Collective). Want trends or risks?</p>",
    "Caffeine half-life in slow metabolizers":
      "<p>CYP1A2 *1F/*1F homozygotes (~10% of adults) show caffeine half-lives of 6–10 hours vs ~3–5 hours in fast metabolizers. Implications for sleep onset are non-trivial. Want the genotype literature or the sleep-impact studies?</p>",
    "Building codes vs wildfire defensible space":
      "<p>California's Chapter 7A and the IWUIC diverge on enforcement mechanisms but converge on Zone 0 (0–5 ft non-combustible) as the highest-leverage intervention. Want a state-by-state comparison or empirical effectiveness data?</p>",
  };

  const titleEl = $(".canvas-head h1");
  const conversationEl = $("#conversation");
  const originalConversationHTML = conversationEl ? conversationEl.innerHTML : "";

  $$(".rail .thread").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const title = link.textContent.trim();
      $$(".rail .thread").forEach((t) => t.classList.remove("active"));
      link.classList.add("active");
      if (titleEl) titleEl.textContent = title;
      if (!conversationEl) return;
      const replacement = threadContent[title];
      if (replacement === null || replacement === undefined) {
        conversationEl.innerHTML = originalConversationHTML;
      } else {
        conversationEl.innerHTML =
          '<article class="msg assistant">' +
            '<div class="avatar a">L</div>' +
            '<div class="bubble">' + replacement + '</div>' +
          '</article>';
      }
      conversationEl.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Mode selector in header — confirm change with subtle feedback
  const headMode = document.getElementById("head-mode");
  if (headMode) {
    headMode.addEventListener("change", () => {
      headMode.style.transition = "background .25s";
      headMode.style.background = "#ffe6c2";
      setTimeout(() => { headMode.style.background = "white"; }, 350);
    });
  }
})();

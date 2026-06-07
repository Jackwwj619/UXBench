(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const W = 1000, H = 540;
  const map = document.getElementById("map");

  function svgEl(name, attrs = {}, text) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    if (text != null) el.textContent = text;
    return el;
  }

  // ---------- equirectangular projection ----------
  function proj(lon, lat) {
    const x = (lon + 180) / 360 * W;
    const y = (90 - lat) / 180 * H;
    return [x, y];
  }

  // ---------- base map ----------
  const continents = [
    { name: "Eurasia", pts: [[-10,71],[35,73],[65,73],[110,72],[160,68],[178,62],[170,55],[145,50],[130,40],[115,35],[100,25],[88,18],[72,15],[60,25],[55,30],[40,35],[30,38],[20,40],[5,42],[-5,40],[-10,55]] },
    { name: "Africa",  pts: [[-15,15],[5,35],[12,33],[35,32],[42,12],[51,12],[42,0],[40,-12],[28,-32],[18,-34],[8,-5],[-8,5],[-15,15]] },
    { name: "Americas-N", pts: [[-165,72],[-130,72],[-100,82],[-70,82],[-55,75],[-50,60],[-70,45],[-80,30],[-95,18],[-105,22],[-115,30],[-125,45],[-140,60],[-165,72]] },
    { name: "Americas-S", pts: [[-80,12],[-65,5],[-55,-10],[-50,-25],[-58,-40],[-70,-55],[-78,-50],[-72,-30],[-80,-10],[-80,12]] },
    { name: "Australia", pts: [[112,-12],[140,-12],[154,-22],[150,-38],[130,-32],[115,-32],[112,-22],[112,-12]] },
    { name: "Greenland", pts: [[-50,82],[-30,82],[-20,75],[-30,60],[-45,60],[-50,75]] },
    { name: "Antarctica-strip", pts: [[-180,-66],[180,-66],[180,-78],[-180,-78]] }
  ];

  function drawBase() {
    for (let lon = -150; lon <= 150; lon += 30) {
      const [x1] = proj(lon, 90), [x2] = proj(lon, -90);
      map.appendChild(svgEl("line", { class: "graticule", x1: x1, x2: x2, y1: 0, y2: H }));
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const [, y1] = proj(-180, lat), [, y2] = proj(180, lat);
      map.appendChild(svgEl("line", { class: "graticule", x1: 0, x2: W, y1: y1, y2: y2 }));
    }
    for (const c of continents) {
      const d = c.pts.map(([lon, lat], i) => {
        const [x,y] = proj(lon, lat);
        return (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
      }).join(" ") + " Z";
      map.appendChild(svgEl("path", { class: "land", d }));
    }
  }

  function rng(seed) { let s = seed; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function makeIndividuals(n, seed, route, name, agePool) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const r = rng(seed + i*17);
      out.push({
        id: name + "-" + String(seed + i).slice(-3),
        age: agePool[Math.floor(r()*agePool.length)],
        sex: r() > 0.5 ? "F" : "M",
        deployed: "2024-" + (1 + Math.floor(r()*6)).toString().padStart(2,"0") + "-" + (1 + Math.floor(r()*27)).toString().padStart(2,"0"),
        loggerVer: r() > 0.5 ? "PicaTag-12.2" : "PicaTag-12.1",
        track: route.map(([lon,lat], m) => [lon + (r()-0.5)*4 + Math.sin(m+seed+i)*1.4, lat + (r()-0.5)*2.5 + Math.cos(m+seed+i)*0.8])
      });
    }
    return out;
  }

  const SPECIES = {
    osprey: { name: "Western osprey", color: "#c75a3c",
      indivs: makeIndividuals(12, 11, [[12,60],[10,50],[8,38],[5,22],[3,8],[0,-5],[3,8],[5,22],[8,38],[10,50],[12,60],[12,62]], "OSP", ["2 yr","3 yr","4 yr","5 yr","7 yr"]) },
    caribou: { name: "Boreal caribou", color: "#5b7a32",
      indivs: makeIndividuals(18, 41, [[-120,64],[-118,62],[-116,60],[-115,58],[-117,60],[-119,62],[-121,64],[-122,66],[-122,68],[-121,66],[-120,65],[-120,64]], "CAR", ["4 yr","5 yr","6 yr","9 yr","11 yr"]) },
    monarch: { name: "Monarch butterfly", color: "#d8861a",
      indivs: makeIndividuals(24, 71, [[-100,19],[-95,24],[-90,32],[-85,40],[-80,44],[-78,46],[-78,46],[-80,44],[-85,40],[-90,32],[-95,24],[-100,19]], "MON", ["0.2 yr","0.4 yr"]) },
    turtle: { name: "Leatherback sea turtle", color: "#0a8ab3",
      indivs: makeIndividuals(9, 101, [[-55,10],[-48,18],[-40,28],[-32,35],[-26,40],[-22,38],[-26,30],[-34,22],[-44,16],[-52,12],[-55,10],[-55,10]], "LBK", ["12 yr","20 yr","27 yr"]) },
    bartailed: { name: "Bar-tailed godwit", color: "#5e3aa6",
      indivs: makeIndividuals(7, 131, [[175,-38],[170,-10],[150,22],[130,40],[110,55],[90,62],[120,60],[150,50],[165,30],[172,0],[176,-25],[175,-38]], "GDW", ["3 yr","4 yr","6 yr"]) },
    whale: { name: "Humpback whale", color: "#1a5e8b",
      indivs: makeIndividuals(11, 161, [[-150,18],[-140,28],[-135,40],[-132,50],[-130,56],[-130,58],[-132,56],[-138,48],[-145,36],[-152,24],[-150,18],[-150,18]], "HUM", ["6 yr","8 yr","12 yr","18 yr"]) },
    albatross: { name: "Wandering albatross", color: "#7d5c1c",
      indivs: makeIndividuals(4, 191, [[50,-45],[80,-45],[120,-45],[160,-45],[-160,-45],[-120,-45],[-90,-45],[-60,-45],[-30,-45],[0,-45],[30,-45],[50,-45]], "ALB", ["7 yr","10 yr"]) }
  };

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const MONTHS_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const state = {
    active: new Set(["osprey", "caribou", "monarch"]),
    month: 5,
    year: "2025",
    showTrail: true,
    showDots: true,
    showStop: false,
    selected: null,
    saved: false
  };

  // Annotate ticks with short data attribute for mobile abbreviations
  $$(".ticks span").forEach((sp, i) => sp.setAttribute("data-short", MONTHS[i]));

  function drawTracks() {
    map.querySelectorAll("g.layer").forEach(g => g.remove());
    let totalIndiv = 0;
    let maxRange = 0, fastestName = "—";

    for (const key of Object.keys(SPECIES)) {
      const sp = SPECIES[key];
      const g = svgEl("g", { class: "layer" });
      const isActive = state.active.has(key);
      sp.indivs.forEach((ind) => {
        const pts = ind.track.map(([lon,lat]) => proj(lon, lat));
        const monthIdx = Math.max(0, Math.min(11, state.month - 1));
        const slice = pts.slice(0, monthIdx + 1);
        if (state.showTrail && slice.length > 1) {
          const d = slice.map(([x,y], i) => (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1)).join(" ");
          const path = svgEl("path", { class: "trail" + (isActive ? "" : " dim"), d, stroke: sp.color, "data-key": key, "data-id": ind.id });
          path.addEventListener("click", () => selectIndividual(key, ind.id));
          g.appendChild(path);
        }
        if (state.showDots && isActive) {
          slice.forEach(([x,y], m) => {
            const r = m === monthIdx ? 5 : 2.4;
            const dot = svgEl("circle", { class: "dot", cx: x, cy: y, r, fill: sp.color, "data-id": ind.id });
            dot.addEventListener("click", () => selectIndividual(key, ind.id));
            g.appendChild(dot);
            if (m === monthIdx && Math.random() < 0.04) {
              g.appendChild(svgEl("text", { class: "tag-label", x: x + 6, y: y - 6 }, ind.id));
            }
          });
        }
        if (state.showStop && isActive && monthIdx >= 1) {
          const [sx, sy] = slice[0];
          const [ex, ey] = slice[slice.length - 1];
          g.appendChild(svgEl("ellipse", { class: "stopover", cx: sx, cy: sy, rx: 18, ry: 14, fill: sp.color, stroke: sp.color }));
          g.appendChild(svgEl("ellipse", { class: "stopover", cx: ex, cy: ey, rx: 18, ry: 14, fill: sp.color, stroke: sp.color }));
        }
        if (isActive) totalIndiv++;
        if (isActive) {
          let minLat = 90, maxLat = -90;
          slice.forEach((_, i) => {
            const [, lat] = ind.track[i];
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
          });
          const span = (maxLat - minLat) * 111;
          if (span > maxRange) { maxRange = span; fastestName = ind.id; }
        }
      });
      map.appendChild(g);
    }

    const monthName = MONTHS[state.month - 1];
    $("#n-species").textContent = state.active.size;
    $("#n-individuals").textContent = totalIndiv;
    $("#month-label").textContent = monthName;
    $("#current-month-display").textContent = MONTHS_FULL[state.month - 1];
    const slider = $("#month-slider");
    if (slider) slider.setAttribute("aria-valuetext", MONTHS_FULL[state.month - 1]);
    // Highlight current tick
    $$(".ticks span").forEach((sp, i) => sp.classList.toggle("is-current", i === (state.month - 1)));
    $("#agg-active").textContent = totalIndiv;
    $("#agg-range").textContent = Math.round(maxRange).toLocaleString() + " km";
    $("#agg-fast").textContent = fastestName;
    $("#agg-stop").textContent = state.showStop ? "On (per-species)" : "—";
  }

  function selectIndividual(speciesKey, id) {
    const sp = SPECIES[speciesKey];
    const ind = sp.indivs.find(i => i.id === id);
    if (!ind) return;
    state.selected = { speciesKey, id };
    const monthIdx = Math.max(0, Math.min(11, state.month - 1));
    const [lon, lat] = ind.track[monthIdx];
    const [lon0] = ind.track[0];
    $("#right-title").textContent = ind.id + " · " + sp.name;
    $("#individual-card").className = "individual";
    $("#individual-card").innerHTML = `
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
        <span class="sw" style="background:${sp.color}; width:14px; height:14px; border-radius:4px;"></span>
        <strong>${ind.id}</strong>
        <span class="pill">${sp.name}</span>
      </div>
      <dl>
        <dt>Age class</dt><dd>${ind.age}</dd>
        <dt>Sex</dt><dd>${ind.sex}</dd>
        <dt>Logger</dt><dd>${ind.loggerVer}</dd>
        <dt>Tag deployed</dt><dd>${ind.deployed}</dd>
        <dt>Position now</dt><dd>${lat.toFixed(2)}°, ${lon.toFixed(2)}°</dd>
        <dt>Started at</dt><dd>${ind.track[0][1].toFixed(2)}°, ${lon0.toFixed(2)}°</dd>
      </dl>
      <p class="hint" style="margin-top:10px;">Last fix accuracy: ±${(2 + Math.random()*5).toFixed(1)} km. Next scheduled fix in ~4 h.</p>
    `;
  }

  drawBase();
  drawTracks();

  // ---------- toast ----------
  function toast(message, kind) {
    const region = $("#toast-region");
    const t = document.createElement("div");
    t.className = "toast" + (kind ? " " + kind : "");
    t.textContent = message;
    region.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 250);
    }, 2400);
  }

  // ---------- species filter ----------
  function updateSpeciesSummary() {
    // Count *checked* species (the source of truth for what is displayed on the map)
    const checked = $$(".sp input[type=checkbox]:checked").length;
    $("#n-species").textContent = checked;
    // Adjust label to clarify selection vs visible-list filtering
    const total = $$(".sp").length;
    const visibleList = $$(".sp:not(.is-hidden)").length;
    const lbl = $("#n-species-lbl");
    if (visibleList < total) {
      lbl.textContent = "species selected (list filtered)";
    } else {
      lbl.textContent = "species selected";
    }
  }

  $$(".sp input").forEach((cb) => {
    cb.addEventListener("change", () => {
      const key = cb.closest(".sp").dataset.key;
      if (cb.checked) state.active.add(key); else state.active.delete(key);
      drawTracks();
      updateSpeciesSummary();
    });
  });

  $("#species-search").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    let visible = 0;
    $$(".sp").forEach((li) => {
      const match = li.textContent.toLowerCase().includes(q);
      li.classList.toggle("is-hidden", !match);
      if (match) visible++;
    });
    const hint = $("#species-search-hint");
    if (q === "") {
      hint.textContent = "";
      hint.classList.remove("warn");
    } else if (visible === 0) {
      hint.textContent = "No species match. Selections still apply.";
      hint.classList.add("warn");
    } else {
      hint.textContent = `Showing ${visible} of ${$$(".sp").length} in list. Search filters the list, not the map selection.`;
      hint.classList.remove("warn");
    }
    updateSpeciesSummary();
  });

  // ---------- display toggles ----------
  $("#show-trail").addEventListener("change", (e) => { state.showTrail = e.target.checked; drawTracks(); });
  $("#show-dots").addEventListener("change", (e) => { state.showDots = e.target.checked; drawTracks(); });
  $("#show-stop").addEventListener("change", (e) => { state.showStop = e.target.checked; drawTracks(); });

  // ---------- month slider ----------
  $("#month-slider").addEventListener("input", (e) => {
    state.month = +e.target.value;
    drawTracks();
  });

  // ---------- year selector ----------
  const yearSel = $("#year-sel");
  const yearStatus = $("#year-status");
  const pageTitle = $("#page-title");
  const mapWrap = $(".map-wrap");

  yearSel.addEventListener("change", () => {
    const opt = yearSel.options[yearSel.selectedIndex];
    if (opt.disabled) {
      // Browsers should prevent this, but guard anyway.
      yearSel.value = state.year;
      return;
    }
    const year = opt.value;
    if (year === "2026") {
      // Disabled in markup, but safety check: do not allow.
      yearSel.value = state.year;
      yearStatus.textContent = "2026 season is in progress and not yet available.";
      yearStatus.classList.add("warn");
      toast("2026 season is not yet available", "warn");
      return;
    }
    yearStatus.classList.remove("warn");
    yearStatus.textContent = `Loading ${year} season…`;
    pageTitle.classList.add("is-updating");
    mapWrap.classList.add("is-updating");
    // Simulate atomic season swap
    setTimeout(() => {
      state.year = year;
      pageTitle.textContent = `Migration Atlas — ${year} season`;
      pageTitle.classList.remove("is-updating");
      mapWrap.classList.remove("is-updating");
      yearStatus.textContent = `Showing ${year} season.`;
      drawTracks();
      toast(`Switched to ${year} season`, "success");
    }, 380);
  });

  // ---------- play/pause ----------
  let timer = null;
  const playBtn = $("#play-btn");

  function getSpeed() {
    const v = parseFloat($("#speed").value);
    return Number.isFinite(v) && v > 0 ? v : 1;
  }

  function startPlayback() {
    if (timer) return;
    playBtn.querySelector(".play-icon").textContent = "⏸";
    playBtn.querySelector(".play-text").textContent = "Pause";
    playBtn.setAttribute("aria-label", "Pause");
    const speed = getSpeed();
    timer = setInterval(() => {
      state.month = state.month >= 12 ? 1 : state.month + 1;
      $("#month-slider").value = state.month;
      drawTracks();
    }, 700 / speed);
  }
  function stopPlayback() {
    if (!timer) return;
    clearInterval(timer); timer = null;
    playBtn.querySelector(".play-icon").textContent = "▶";
    playBtn.querySelector(".play-text").textContent = "Play";
    playBtn.setAttribute("aria-label", "Play");
  }

  playBtn.addEventListener("click", () => {
    if (timer) stopPlayback(); else startPlayback();
  });

  // ---------- speed selector with confirmation ----------
  const speedSel = $("#speed");
  speedSel.addEventListener("change", () => {
    const label = speedSel.options[speedSel.selectedIndex].textContent;
    speedSel.classList.remove("flash");
    void speedSel.offsetWidth;
    speedSel.classList.add("flash");
    toast(`Playback speed: ${label}`);
    if (timer) { stopPlayback(); startPlayback(); }
  });

  // ---------- header actions ----------
  function buildCitation() {
    const speciesNames = Array.from(state.active).map(k => SPECIES[k].name).join(", ") || "no species";
    const month = MONTHS_FULL[state.month - 1];
    return `Migration Atlas (demo). View: ${state.year} season, ${month}, species: ${speciesNames}. Retrieved ${new Date().toISOString().slice(0,10)}.`;
  }

  // Cite dialog
  const citeBtn = $("#cite-btn");
  const citeDialog = $("#cite-dialog");
  const citeText = $("#cite-text");
  const citeCopy = $("#cite-copy");
  let lastFocus = null;

  function openCite() {
    lastFocus = document.activeElement;
    citeText.value = buildCitation();
    citeDialog.hidden = false;
    setTimeout(() => citeText.focus(), 0);
    citeText.select();
  }
  function closeCite() {
    citeDialog.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  citeBtn.addEventListener("click", openCite);
  citeDialog.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) closeCite();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !citeDialog.hidden) closeCite();
  });
  citeCopy.addEventListener("click", async () => {
    const text = citeText.value;
    let ok = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        ok = true;
      } else {
        citeText.select();
        ok = document.execCommand && document.execCommand("copy");
      }
    } catch (_) { ok = false; }
    if (ok) {
      citeCopy.textContent = "Copied ✓";
      toast("Citation copied to clipboard", "success");
      setTimeout(() => { citeCopy.textContent = "Copy citation"; }, 1600);
    } else {
      toast("Could not copy automatically — text is selected", "warn");
    }
  });

  // Save view
  const saveBtn = $("#save-btn");
  function buildShareHash() {
    const params = new URLSearchParams();
    params.set("year", state.year);
    params.set("month", String(state.month));
    params.set("species", Array.from(state.active).join(","));
    return "#view=" + encodeURIComponent(params.toString());
  }
  saveBtn.addEventListener("click", () => {
    const hash = buildShareHash();
    try { history.replaceState(null, "", hash); } catch (_) {}
    state.saved = true;
    saveBtn.classList.add("is-saved");
    saveBtn.textContent = "View saved ✓";
    toast("View saved — shareable URL updated", "success");
    setTimeout(() => {
      saveBtn.classList.remove("is-saved");
      saveBtn.textContent = "Save view";
    }, 2200);
  });

  // Initial summary sync
  updateSpeciesSummary();
})();

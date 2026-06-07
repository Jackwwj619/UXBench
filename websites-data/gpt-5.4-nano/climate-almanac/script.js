(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- synthetic data ----------
  const YEARS = [];
  for (let y = 1900; y <= 2024; y++) YEARS.push(y);
  function rng(seed) {
    let s = seed;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }
  function smoothRunning(arr, w) {
    if (w <= 1) return arr.slice();
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      let s = 0, n = 0;
      for (let j = Math.max(0, i - Math.floor(w/2)); j <= Math.min(arr.length-1, i + Math.floor(w/2)); j++) { s += arr[j]; n++; }
      out.push(s / n);
    }
    return out;
  }
  // Build temperature anomaly (rising with noise)
  const r1 = rng(7);
  const tempRaw = YEARS.map((y, i) => {
    const t = (y - 1900) / 124;
    const base = -0.25 + 1.5 * Math.pow(t, 1.6);
    const wobble = Math.sin(i / 5) * 0.1 + Math.sin(i / 11) * 0.08;
    const noise = (r1() - 0.5) * 0.22;
    return +(base + wobble + noise).toFixed(3);
  });
  // CO2 (smooth rising)
  const co2 = YEARS.map((y) => {
    const t = (y - 1900) / 124;
    const v = 296 + 122 * Math.pow(t, 1.35) + Math.sin((y - 1900) / 7) * 0.6;
    return +v.toFixed(2);
  });
  // Precip (less monotonic; small variations)
  const r2 = rng(13);
  const precip = YEARS.map((y, i) => {
    const v = 990 + Math.sin(i / 6) * 30 + Math.sin(i / 19) * 50 + (r2() - 0.5) * 40 + (y - 1900) * 0.1;
    return +v.toFixed(1);
  });
  // Sea level (mm vs 1993)
  const sealevel = YEARS.map((y) => {
    if (y < 1880) return null;
    const t = (y - 1900) / 124;
    return +(-180 + 250 * Math.pow(t, 1.7)).toFixed(1);
  });
  // Sea ice (Sep minimum, declining)
  const r3 = rng(91);
  const ice = YEARS.map((y, i) => {
    const t = (y - 1900) / 124;
    const v = 8.4 - 2.6 * Math.pow(t, 2.1) + (r3() - 0.5) * 0.45;
    return +v.toFixed(2);
  });
  // ENSO
  const r4 = rng(33);
  const enso = YEARS.map((_, i) => +(Math.sin(i / 3.4) * 0.9 + (r4() - 0.5) * 0.6).toFixed(2));

  const SERIES = {
    temp:     { name: "Surface temperature anomaly", unit: "°C", color: "#d24a3a", data: tempRaw, axis: "left" },
    co2:      { name: "Atmospheric CO₂",            unit: "ppm", color: "#2f8a52", data: co2, axis: "right" },
    precip:   { name: "Precipitation",              unit: "mm/yr", color: "#3a8bd2", data: precip, axis: "right" },
    sealevel: { name: "Global mean sea level",      unit: "mm",  color: "#6b46ff", data: sealevel, axis: "right" },
    ice:      { name: "Arctic sea-ice extent",      unit: "M km²", color: "#0fb8c1", data: ice, axis: "right" },
    enso:     { name: "ENSO ONI",                   unit: "°C",  color: "#b97d1c", data: enso, axis: "left" },
  };

  // ---------- state ----------
  const state = {
    active: ["temp", "co2"],
    smooth: 3,
    region: "global",
    axis: "dual",
    fromYear: 1900,
    toYear: 2024,
    selectedYear: null,
    notes: [
      { year: 1945, text: "Postwar industrial expansion begins to alter the temperature record." },
      { year: 1991, text: "Mt Pinatubo cooled the surface by ~0.4°C for two years." },
      { year: 2015, text: "Strong El Niño coincides with new global-temperature record." }
    ]
  };

  // ---------- chart drawing ----------
  const CHART_W = 920, CHART_H = 460;
  const MARGIN = { top: 24, right: 70, bottom: 36, left: 60 };
  const PLOT_W = CHART_W - MARGIN.left - MARGIN.right;
  const PLOT_H = CHART_H - MARGIN.top - MARGIN.bottom;

  const chart = document.getElementById("chart");
  const tooltip = document.getElementById("tooltip");

  function xScale(year) {
    const t = (year - state.fromYear) / (state.toYear - state.fromYear);
    return MARGIN.left + t * PLOT_W;
  }
  function yScale(v, [min, max]) {
    if (max === min) return MARGIN.top + PLOT_H / 2;
    const t = (v - min) / (max - min);
    return MARGIN.top + (1 - t) * PLOT_H;
  }
  function extentFor(keys) {
    let min = Infinity, max = -Infinity;
    for (const k of keys) {
      const s = SERIES[k]; if (!s) continue;
      for (let i = 0; i < YEARS.length; i++) {
        if (YEARS[i] < state.fromYear || YEARS[i] > state.toYear) continue;
        const v = s.data[i]; if (v == null) continue;
        if (v < min) min = v; if (v > max) max = v;
      }
    }
    if (min === Infinity) return [0,1];
    const pad = (max - min) * 0.08 || 0.5;
    return [min - pad, max + pad];
  }
  function zScore(arr) {
    const vals = arr.filter(v => v != null);
    const mean = vals.reduce((a,b)=>a+b,0)/vals.length;
    const sd = Math.sqrt(vals.reduce((a,b)=>a+(b-mean)*(b-mean),0)/vals.length) || 1;
    return arr.map(v => v == null ? null : (v - mean)/sd);
  }

  function buildSmoothed(key) {
    return smoothRunning(SERIES[key].data, state.smooth);
  }

  function svgEl(name, attrs = {}, text) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    if (text != null) el.textContent = text;
    return el;
  }

  function drawCursor(year) {
    const lineX = xScale(year);
    let cur = chart.querySelector(".cursor");
    if (!cur) {
      cur = svgEl("line", { class: "cursor", stroke: "#5b6c7c", "stroke-dasharray": "3 3", "stroke-width": 1.5 });
      chart.appendChild(cur);
    }
    cur.setAttribute("x1", lineX); cur.setAttribute("x2", lineX);
    cur.setAttribute("y1", MARGIN.top); cur.setAttribute("y2", MARGIN.top + PLOT_H);
  }

  function inspectYear(year, note) {
    state.selectedYear = year;
    const yearIdx = Math.max(0, Math.min(YEARS.length - 1, year - 1900));
    let html = `<div style="font-size:15px;margin-bottom:6px;"><span class="ival" style="font-size:18px;color:var(--brand);">${year}</span></div>`;
    for (const k of state.active) {
      const v = buildSmoothed(k)[yearIdx];
      html += `<div style="margin:3px 0;"><span style="color:${SERIES[k].color}">●</span> ${SERIES[k].name}: <strong>${v == null ? "—" : v.toFixed(2)}</strong> ${SERIES[k].unit}</div>`;
    }
    if (note) {
      html += `<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--line);font-style:italic;">${note.text}</div>`;
    } else {
      const matchingNote = state.notes.find(n => n.year === year);
      if (matchingNote) {
        html += `<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--line);font-style:italic;">${matchingNote.text}</div>`;
      }
    }
    const insp = $("#inspector");
    insp.classList.remove("hint");
    insp.innerHTML = html;
    // tooltip mirrors content (without breaks)
    let tipHtml = `<strong>${year}</strong><br/>`;
    for (const k of state.active) {
      const v = buildSmoothed(k)[yearIdx];
      tipHtml += `<span style="color:${SERIES[k].color}">●</span> ${SERIES[k].name}: <strong>${v == null ? "—" : v.toFixed(2)}</strong> ${SERIES[k].unit}<br/>`;
    }
    tooltip.innerHTML = tipHtml;
    drawCursor(year);
    // sync slider
    const slider = $("#year-slider");
    if (slider && +slider.value !== year) slider.value = year;
    const out = $("#year-out");
    if (out) out.textContent = year;
  }

  function render() {
    chart.innerHTML = "";
    chart.setAttribute("viewBox", `0 0 ${CHART_W} ${CHART_H}`);

    const left = state.active.filter(k => SERIES[k].axis === "left");
    const right = state.active.filter(k => SERIES[k].axis === "right");

    let leftExt, rightExt;
    if (state.axis === "single") {
      leftExt = [-3, 3]; rightExt = [-3, 3];
    } else {
      leftExt  = left.length  ? extentFor(left)  : [0, 1];
      rightExt = right.length ? extentFor(right) : [0, 1];
    }

    // Y axis (left)
    const leftAxis = svgEl("g");
    const yTicks = 6;
    for (let i = 0; i <= yTicks; i++) {
      const t = i / yTicks;
      const y = MARGIN.top + (1 - t) * PLOT_H;
      const v = leftExt[0] + (leftExt[1] - leftExt[0]) * t;
      leftAxis.appendChild(svgEl("line", { x1: MARGIN.left, x2: CHART_W - MARGIN.right, y1: y, y2: y, stroke: "#e7ecf2", "stroke-dasharray": i === 0 ? "" : "2 3" }));
      leftAxis.appendChild(svgEl("text", { x: MARGIN.left - 6, y: y + 4, "text-anchor": "end", "font-size": 11, fill: "#5b6c7c" }, v.toFixed(2)));
    }
    chart.appendChild(leftAxis);

    // Y axis (right)
    if (right.length && state.axis === "dual") {
      const rightAxis = svgEl("g");
      for (let i = 0; i <= yTicks; i++) {
        const t = i / yTicks;
        const y = MARGIN.top + (1 - t) * PLOT_H;
        const v = rightExt[0] + (rightExt[1] - rightExt[0]) * t;
        rightAxis.appendChild(svgEl("text", { x: CHART_W - MARGIN.right + 6, y: y + 4, "text-anchor": "start", "font-size": 11, fill: "#5b6c7c" }, v.toFixed(v > 100 ? 0 : 2)));
      }
      chart.appendChild(rightAxis);
    }

    // X axis
    const xAxis = svgEl("g");
    const yearTicks = [1900, 1925, 1950, 1975, 2000, 2024];
    for (const y of yearTicks) {
      if (y < state.fromYear || y > state.toYear) continue;
      const xx = xScale(y);
      xAxis.appendChild(svgEl("line", { x1: xx, x2: xx, y1: MARGIN.top + PLOT_H, y2: MARGIN.top + PLOT_H + 4, stroke: "#5b6c7c" }));
      xAxis.appendChild(svgEl("text", { x: xx, y: MARGIN.top + PLOT_H + 18, "text-anchor": "middle", "font-size": 11, fill: "#5b6c7c" }, y));
    }
    chart.appendChild(xAxis);

    // Series
    for (const key of state.active) {
      const s = SERIES[key];
      const ext = state.axis === "single" ? null : (s.axis === "left" ? leftExt : rightExt);
      const sm = buildSmoothed(key);
      const vals = state.axis === "single" ? zScore(sm) : sm;
      let d = "";
      let first = true;
      for (let i = 0; i < YEARS.length; i++) {
        if (YEARS[i] < state.fromYear || YEARS[i] > state.toYear) continue;
        const v = vals[i];
        if (v == null) continue;
        const x = xScale(YEARS[i]);
        const y = state.axis === "single" ? yScale(v, [-3,3]) : yScale(v, ext);
        d += (first ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
        first = false;
      }
      chart.appendChild(svgEl("path", { d, fill: "none", stroke: s.color, "stroke-width": 2.2, "stroke-linecap": "round", "stroke-linejoin": "round" }));
    }

    // Legend
    const legend = svgEl("g");
    state.active.forEach((k, i) => {
      const x = MARGIN.left + i * 200;
      const y = 12;
      legend.appendChild(svgEl("rect", { x, y: y-6, width: 14, height: 8, fill: SERIES[k].color, rx: 2 }));
      legend.appendChild(svgEl("text", { x: x+20, y, "font-size": 12, fill: "#102434" }, SERIES[k].name + " (" + SERIES[k].unit + ")"));
    });
    chart.appendChild(legend);

    // Notes pins
    for (const note of state.notes) {
      if (note.year < state.fromYear || note.year > state.toYear) continue;
      const x = xScale(note.year);
      const g = svgEl("g", { class: "note-pin", transform: `translate(${x},${MARGIN.top + PLOT_H - 14})` });
      g.appendChild(svgEl("circle", { cx: 0, cy: 0, r: 5, fill: "#0a4d6e" }));
      g.appendChild(svgEl("text", { x: 0, y: 4, "text-anchor": "middle", "font-size": 9, fill: "white" }, "⋄"));
      g.addEventListener("click", () => inspectYear(note.year, note));
      chart.appendChild(g);
    }

    // Hover/click overlay (drawn on top so hits are reliable)
    const overlay = svgEl("rect", { x: MARGIN.left, y: MARGIN.top, width: PLOT_W, height: PLOT_H, fill: "transparent", style: "cursor: crosshair;" });
    chart.appendChild(overlay);
    function pointerToYear(e) {
      const rect = chart.getBoundingClientRect();
      const scaleX = CHART_W / rect.width;
      const mx = (e.clientX - rect.left) * scaleX;
      const t = (mx - MARGIN.left) / PLOT_W;
      const yr = state.fromYear + t * (state.toYear - state.fromYear);
      return Math.max(state.fromYear, Math.min(state.toYear, Math.round(yr)));
    }
    function pointerHandler(e) {
      const year = pointerToYear(e);
      inspectYear(year);
      const rect = chart.getBoundingClientRect();
      tooltip.style.display = "block";
      const offX = e.clientX - rect.left + 16;
      const offY = e.clientY - rect.top + 16;
      tooltip.style.left = Math.min(offX, rect.width - 200) + "px";
      tooltip.style.top = Math.min(offY, rect.height - 100) + "px";
    }
    overlay.addEventListener("mousemove", pointerHandler);
    overlay.addEventListener("click", pointerHandler);
    overlay.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });

    // Restore persistent cursor for current selected year
    if (state.selectedYear != null && state.selectedYear >= state.fromYear && state.selectedYear <= state.toYear) {
      drawCursor(state.selectedYear);
    }

    drawBrush();
    renderNotes();
    renderLayers();
  }

  // ---------- brush ----------
  const brush = document.getElementById("brush");
  function drawBrush() {
    brush.innerHTML = "";
    const W = 920, H = 70;
    brush.setAttribute("viewBox", `0 0 ${W} ${H}`);
    const sm = buildSmoothed("temp");
    let d = "";
    const min = Math.min(...sm), max = Math.max(...sm);
    sm.forEach((v, i) => {
      const x = (i / (YEARS.length - 1)) * W;
      const y = 4 + (1 - (v - min) / (max - min)) * (H - 12);
      d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
    });
    brush.appendChild(svgEl("path", { d, fill: "none", stroke: "#d24a3a", "stroke-width": 1.4 }));
    // shaded selected region
    const lx = ((state.fromYear - 1900) / 124) * W;
    const rx = ((state.toYear - 1900) / 124) * W;
    brush.appendChild(svgEl("rect", { x: lx, y: 0, width: rx - lx, height: H, fill: "rgba(10,77,110,0.10)" }));
    // handles positions
    const handles = $("#brush-handles");
    const wrap = brush.getBoundingClientRect();
    const widthRatio = wrap.width / W;
    $(".bh-l", handles).style.left = (lx * widthRatio - 3) + "px";
    $(".bh-r", handles).style.left = (rx * widthRatio - 3) + "px";
    const mid = $(".bh-mid", handles);
    mid.style.left = (lx * widthRatio) + "px";
    mid.style.right = "";
    mid.style.width = ((rx - lx) * widthRatio) + "px";
    $("#brush-from").textContent = state.fromYear;
    $("#brush-to").textContent = state.toYear;
  }

  let dragging = null;
  $$(".bh").forEach((bh) => {
    bh.addEventListener("mousedown", (e) => {
      dragging = bh.dataset.side || "mid";
      e.preventDefault();
    });
  });
  $(".bh-mid").addEventListener("mousedown", (e) => { dragging = "mid"; dragging_origin = e.clientX; dragging_from = state.fromYear; dragging_to = state.toYear; e.preventDefault(); });
  let dragging_origin = 0, dragging_from = 0, dragging_to = 0;
  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const wrap = brush.getBoundingClientRect();
    const ratio = (e.clientX - wrap.left) / wrap.width;
    const year = Math.max(1900, Math.min(2024, Math.round(1900 + ratio * 124)));
    if (dragging === "l") {
      state.fromYear = Math.min(year, state.toYear - 5);
    } else if (dragging === "r") {
      state.toYear = Math.max(year, state.fromYear + 5);
    } else if (dragging === "mid") {
      const span = dragging_to - dragging_from;
      const yearChange = Math.round(((e.clientX - dragging_origin) / wrap.width) * 124);
      let newFrom = Math.max(1900, Math.min(2024 - span, dragging_from + yearChange));
      state.fromYear = newFrom;
      state.toYear = newFrom + span;
    }
    render();
  });
  document.addEventListener("mouseup", () => { dragging = null; });

  // ---------- controls ----------
  $$(".var input").forEach((cb) => {
    cb.addEventListener("change", () => {
      const li = cb.closest(".var");
      const key = li.dataset.key;
      if (cb.checked && !state.active.includes(key)) state.active.push(key);
      else if (!cb.checked) state.active = state.active.filter(k => k !== key);
      if (state.active.length === 0) state.active = ["temp"];
      render();
    });
  });
  $("#smooth").addEventListener("change", (e) => { state.smooth = +e.target.value || 1; render(); });
  $("#region").addEventListener("change", (e) => { state.region = e.target.value; render(); });
  $$("input[name=ax]").forEach((r) => r.addEventListener("change", () => { state.axis = $("input[name=ax]:checked").value; render(); }));
  $("#reset-view").addEventListener("click", () => { state.fromYear = 1900; state.toYear = 2024; render(); });
  $("#add-note").addEventListener("click", () => {
    const year = prompt("Annotation year (1900–2024):");
    if (!year) return;
    const yr = parseInt(year, 10);
    if (isNaN(yr) || yr < 1900 || yr > 2024) return;
    const txt = prompt("Annotation text:");
    if (!txt) return;
    state.notes.push({ year: yr, text: txt });
    render();
  });

  // ---------- layers & notes ----------
  function renderLayers() {
    const ul = $("#layers");
    ul.innerHTML = "";
    state.active.forEach((k) => {
      const li = document.createElement("li");
      li.className = "layer";
      li.innerHTML = `<span class="handle">≡</span><span class="swatch" style="background:${SERIES[k].color}"></span><span>${SERIES[k].name}</span><button class="x" data-key="${k}">×</button>`;
      li.querySelector(".x").addEventListener("click", () => {
        state.active = state.active.filter(x => x !== k);
        if (state.active.length === 0) state.active = ["temp"];
        const cb = document.querySelector(`.var[data-key="${k}"] input`);
        if (cb) cb.checked = false;
        render();
      });
      ul.appendChild(li);
    });
  }
  function renderNotes() {
    const ul = $("#notes");
    ul.innerHTML = "";
    state.notes.sort((a,b)=>a.year-b.year).forEach((n, i) => {
      const li = document.createElement("li");
      li.className = "note";
      li.title = "Click to inspect this year";
      li.innerHTML = `<span class="yr">${n.year}</span>${n.text}<button class="note-close" data-i="${i}" aria-label="Dismiss annotation">×</button>`;
      li.addEventListener("click", (e) => {
        if (e.target.closest(".note-close")) return;
        inspectYear(n.year, n);
      });
      li.querySelector(".note-close").addEventListener("click", (e) => {
        e.stopPropagation();
        state.notes.splice(i,1); render();
      });
      ul.appendChild(li);
    });
  }

  // ---------- toast / share / download ----------
  let toastTimer = null;
  function showToast(msg, ms = 2400) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => { t.hidden = true; }, 250);
    }, ms);
  }

  function buildShareUrl() {
    const params = new URLSearchParams();
    params.set("vars", state.active.join(","));
    params.set("smooth", String(state.smooth));
    params.set("region", state.region);
    params.set("axis", state.axis);
    params.set("from", String(state.fromYear));
    params.set("to", String(state.toYear));
    if (state.selectedYear != null) params.set("year", String(state.selectedYear));
    return location.origin + location.pathname + "?" + params.toString();
  }

  const shareBtn = $("#share-btn");
  const shareModal = $("#share-modal");
  const shareUrlInput = $("#share-url");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const url = buildShareUrl();
      shareUrlInput.value = url;
      shareModal.hidden = false;
      setTimeout(() => { shareUrlInput.select(); }, 50);
    });
  }
  $("#share-close")?.addEventListener("click", () => { shareModal.hidden = true; });
  shareModal?.addEventListener("click", (e) => {
    if (e.target === shareModal) shareModal.hidden = true;
  });
  $("#share-copy")?.addEventListener("click", async () => {
    const url = shareUrlInput.value;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        shareUrlInput.select();
        document.execCommand("copy");
      }
      showToast("Link copied to clipboard");
    } catch (err) {
      shareUrlInput.select();
      showToast("Press Ctrl/Cmd+C to copy");
    }
  });

  $("#download-btn")?.addEventListener("click", () => {
    const cols = ["year", ...state.active];
    const lines = [cols.join(",")];
    for (let i = 0; i < YEARS.length; i++) {
      if (YEARS[i] < state.fromYear || YEARS[i] > state.toYear) continue;
      const row = [YEARS[i]];
      for (const k of state.active) {
        const v = buildSmoothed(k)[i];
        row.push(v == null ? "" : v.toFixed(3));
      }
      lines.push(row.join(","));
    }
    const csv = lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `climate-almanac-${state.fromYear}-${state.toYear}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    showToast(`Download started · ${lines.length - 1} rows`);
  });

  // Year slider
  const yearSlider = $("#year-slider");
  const yearOut = $("#year-out");
  if (yearSlider) {
    yearSlider.addEventListener("input", (e) => {
      const yr = +e.target.value;
      if (yearOut) yearOut.textContent = yr;
      inspectYear(yr);
    });
  }

  // Keyboard nav on chart
  chart.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const cur = state.selectedYear ?? Math.round((state.fromYear + state.toYear) / 2);
      const next = e.key === "ArrowLeft" ? Math.max(state.fromYear, cur - 1) : Math.min(state.toYear, cur + 1);
      inspectYear(next);
    }
  });

  // ---------- source hover ----------
  $$(".src a").forEach((a) => {
    a.addEventListener("mouseenter", (e) => {
      const id = a.dataset.srcid;
      const lines = {
        berkeley: "Synthetic series resembling Berkeley Earth land+ocean monthly anomalies, 1850–present. Baseline: 1951–1980. Spatial coverage adjusted by area-weighted krigging (synthetic).",
        noaa: "Synthetic Mauna Loa CO₂ analog. Monthly background marine boundary layer averages.",
        cmip: "Toy CMIP-style reanalysis. Use for layout testing only.",
        nsidc: "Synthetic Arctic September minimum extent, 1979–present."
      };
      let tip = $("#src-tip");
      if (!tip) {
        tip = document.createElement("div");
        tip.id = "src-tip";
        tip.className = "tooltip";
        document.body.appendChild(tip);
      }
      tip.textContent = lines[id] || "Synthetic dataset.";
      tip.style.position = "fixed";
      tip.style.left = (e.clientX + 14) + "px";
      tip.style.top = (e.clientY + 14) + "px";
      tip.style.display = "block";
      tip.style.maxWidth = "260px";
    });
    a.addEventListener("mouseleave", () => { const tip = $("#src-tip"); if (tip) tip.style.display = "none"; });
    a.addEventListener("click", (e) => e.preventDefault());
  });

  render();
})();

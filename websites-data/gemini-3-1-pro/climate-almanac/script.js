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

  function updateTitleSubtitle() {
    const titleEl = document.getElementById("chart-title");
    const subtitleEl = document.getElementById("chart-subtitle");
    if (titleEl) {
      if (state.active.length === 0) {
        titleEl.textContent = "Select a variable to begin";
      } else {
        titleEl.textContent = state.active.map(k => SERIES[k].name).join(" & ");
      }
    }
    if (subtitleEl) {
      const regionLabel = {
        global: "Global", nh: "Northern Hemisphere", sh: "Southern Hemisphere",
        trop: "Tropics (23°S–23°N)", arctic: "Arctic (60°N–90°N)"
      }[state.region] || "Global";
      const smoothLabel = state.smooth <= 1 ? "No smoothing" :
        (state.smooth === 30 ? "30-year normal" : state.smooth + "-year running mean");
      subtitleEl.textContent = `${regionLabel} · ${smoothLabel} · ${state.fromYear}–${state.toYear} · hover the chart to inspect a year. Notes are pinned as ⋄.`;
    }
  }

  function render() {
    chart.innerHTML = "";
    chart.setAttribute("viewBox", `0 0 ${CHART_W} ${CHART_H}`);

    updateTitleSubtitle();

    if (state.active.length === 0) {
      const msg = svgEl("text", {
        x: CHART_W / 2, y: CHART_H / 2,
        "text-anchor": "middle", "font-size": 16, fill: "#5b6c7c"
      }, "Select a variable to begin");
      chart.appendChild(msg);
      drawBrush();
      renderNotes();
      renderLayers();
      updateVarLimit();
      return;
    }

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

    // Legend (wrap dynamically based on text width)
    const legend = svgEl("g");
    const legendY = 12;
    const availableWidth = CHART_W - MARGIN.left - MARGIN.right;
    const charW = 6.4; // approximate avg char width at 12px
    const swatchW = 14, gap = 6, itemPad = 18;
    let cursorX = MARGIN.left;
    let row = 0;
    const rowH = 16;
    state.active.forEach((k) => {
      const label = SERIES[k].name + " (" + SERIES[k].unit + ")";
      const itemW = swatchW + gap + label.length * charW + itemPad;
      if (cursorX + itemW > MARGIN.left + availableWidth && cursorX !== MARGIN.left) {
        row++;
        cursorX = MARGIN.left;
      }
      const y = legendY + row * rowH;
      legend.appendChild(svgEl("rect", { x: cursorX, y: y - 6, width: swatchW, height: 8, fill: SERIES[k].color, rx: 2 }));
      legend.appendChild(svgEl("text", { x: cursorX + swatchW + gap, y, "font-size": 12, fill: "#102434" }, label));
      cursorX += itemW;
    });
    chart.appendChild(legend);

    // Notes pins
    for (const note of state.notes) {
      if (note.year < state.fromYear || note.year > state.toYear) continue;
      const x = xScale(note.year);
      const g = svgEl("g", { class: "note-pin", transform: `translate(${x},${MARGIN.top + PLOT_H - 14})` });
      g.appendChild(svgEl("circle", { cx: 0, cy: 0, r: 5, fill: "#0a4d6e" }));
      g.appendChild(svgEl("text", { x: 0, y: 4, "text-anchor": "middle", "font-size": 9, fill: "white" }, "⋄"));
      g.addEventListener("click", () => {
        $("#inspector").innerHTML = `<div><span class="ival">${note.year}</span> · annotation</div><div style="margin-top:4px;">${note.text}</div>`;
      });
      chart.appendChild(g);
    }

    // Hover overlay
    const overlay = svgEl("rect", { x: MARGIN.left, y: MARGIN.top, width: PLOT_W, height: PLOT_H, fill: "transparent" });
    chart.appendChild(overlay);
    overlay.addEventListener("mousemove", (e) => {
      const rect = chart.getBoundingClientRect();
      const scaleX = CHART_W / rect.width;
      const mx = (e.clientX - rect.left) * scaleX;
      const t = (mx - MARGIN.left) / PLOT_W;
      const y = state.fromYear + t * (state.toYear - state.fromYear);
      const yearIdx = Math.max(0, Math.min(YEARS.length - 1, Math.round(y - 1900)));
      const year = YEARS[yearIdx];
      let html = `<strong>${year}</strong><br/>`;
      for (const k of state.active) {
        const v = buildSmoothed(k)[yearIdx];
        html += `<span style="color:${SERIES[k].color}">●</span> ${SERIES[k].name}: <strong>${v == null ? "—" : v.toFixed(2)}</strong> ${SERIES[k].unit}<br/>`;
      }
      tooltip.innerHTML = html;
      tooltip.style.display = "block";
      const offX = e.clientX - rect.left + 16;
      const offY = e.clientY - rect.top + 16;
      tooltip.style.left = Math.min(offX, rect.width - 200) + "px";
      tooltip.style.top = Math.min(offY, rect.height - 100) + "px";
      const lineX = xScale(year);
      let cur = chart.querySelector(".cursor");
      if (!cur) {
        cur = svgEl("line", { class: "cursor", stroke: "#5b6c7c", "stroke-dasharray": "3 3", "stroke-width": 1 });
        chart.appendChild(cur);
      }
      cur.setAttribute("x1", lineX); cur.setAttribute("x2", lineX);
      cur.setAttribute("y1", MARGIN.top); cur.setAttribute("y2", MARGIN.top + PLOT_H);
      $("#inspector").innerHTML = html;
    });
    overlay.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
      chart.querySelector(".cursor")?.remove();
    });
    overlay.addEventListener("click", (e) => {
      if (!pendingNote) return;
      const rect = chart.getBoundingClientRect();
      const scaleX = CHART_W / rect.width;
      const mx = (e.clientX - rect.left) * scaleX;
      const t = (mx - MARGIN.left) / PLOT_W;
      const yr = Math.round(state.fromYear + t * (state.toYear - state.fromYear));
      if (yr < 1900 || yr > 2024) return;
      const txt = prompt(`Note for ${yr}:`);
      setPendingNote(false);
      if (!txt) return;
      state.notes.push({ year: yr, text: txt });
      showToast(`Note added for ${yr}`);
      render();
    });

    drawBrush();
    renderNotes();
    renderLayers();
    updateVarLimit();
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

  // ---------- toast ----------
  let toastTimer = null;
  function showToast(msg) {
    let el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function updateVarLimit() {
    const MAX = 4;
    const atLimit = state.active.length >= MAX;
    $$(".var").forEach((li) => {
      const key = li.dataset.key;
      const cb = li.querySelector("input");
      if (!cb) return;
      const checked = state.active.includes(key);
      cb.disabled = atLimit && !checked;
      li.classList.toggle("disabled", cb.disabled);
    });
  }

  // ---------- controls ----------
  $$(".var input").forEach((cb) => {
    cb.addEventListener("change", () => {
      const li = cb.closest(".var");
      const key = li.dataset.key;
      if (cb.checked) {
        if (state.active.length >= 4 && !state.active.includes(key)) {
          cb.checked = false;
          showToast("Limit reached — up to 4 variables can be active.");
          return;
        }
        if (!state.active.includes(key)) state.active.push(key);
      } else {
        state.active = state.active.filter(k => k !== key);
      }
      render();
    });
  });
  $("#smooth").addEventListener("change", (e) => { state.smooth = +e.target.value || 1; render(); });
  $("#region").addEventListener("change", (e) => { state.region = e.target.value; render(); });
  $$("input[name=ax]").forEach((r) => r.addEventListener("change", () => { state.axis = $("input[name=ax]:checked").value; render(); }));
  $("#reset-view").addEventListener("click", () => { state.fromYear = 1900; state.toYear = 2024; render(); });

  // ---------- note add flow ----------
  let pendingNote = false;
  const notePrompt = document.getElementById("note-prompt");
  function setPendingNote(on) {
    pendingNote = on;
    if (notePrompt) notePrompt.style.display = on ? "block" : "none";
    chart.classList.toggle("note-mode", on);
  }
  $("#add-note").addEventListener("click", () => {
    if (pendingNote) { setPendingNote(false); return; }
    setPendingNote(true);
    showToast("Click a year on the chart to add a note.");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pendingNote) setPendingNote(false);
  });

  // ---------- share / download ----------
  const shareBtn = document.getElementById("share-view");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const params = new URLSearchParams({
        vars: state.active.join(","),
        region: state.region,
        smooth: String(state.smooth),
        axis: state.axis,
        from: String(state.fromYear),
        to: String(state.toYear),
      });
      const url = location.origin + location.pathname + "?" + params.toString();
      const copy = (txt) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          return navigator.clipboard.writeText(txt);
        }
        const ta = document.createElement("textarea");
        ta.value = txt; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        ta.remove();
        return Promise.resolve();
      };
      copy(url).then(() => showToast("Link copied to clipboard"))
               .catch(() => showToast("Could not copy link"));
    });
  }
  const dlBtn = document.getElementById("download-csv");
  if (dlBtn) {
    dlBtn.addEventListener("click", () => {
      const original = dlBtn.textContent;
      dlBtn.disabled = true;
      dlBtn.textContent = "Preparing…";
      setTimeout(() => {
        const cols = ["year", ...state.active.map(k => SERIES[k].name)];
        const rows = [cols.join(",")];
        for (let i = 0; i < YEARS.length; i++) {
          if (YEARS[i] < state.fromYear || YEARS[i] > state.toYear) continue;
          const row = [YEARS[i]];
          for (const k of state.active) {
            const sm = buildSmoothed(k);
            row.push(sm[i] == null ? "" : sm[i]);
          }
          rows.push(row.join(","));
        }
        const blob = new Blob([rows.join("\n")], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "climate-almanac.csv";
        document.body.appendChild(a); a.click(); a.remove();
        dlBtn.disabled = false;
        dlBtn.textContent = original;
        showToast("CSV downloaded");
      }, 350);
    });
  }

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
      li.innerHTML = `<span class="yr">${n.year}</span>${n.text}<button data-i="${i}">×</button>`;
      li.querySelector("button").addEventListener("click", () => {
        state.notes.splice(i,1); render();
      });
      ul.appendChild(li);
    });
  }

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

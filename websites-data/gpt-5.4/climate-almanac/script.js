(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const MAX_VARS = 4;

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
  const r1 = rng(7);
  const tempRaw = YEARS.map((y, i) => {
    const t = (y - 1900) / 124;
    const base = -0.25 + 1.5 * Math.pow(t, 1.6);
    const wobble = Math.sin(i / 5) * 0.1 + Math.sin(i / 11) * 0.08;
    const noise = (r1() - 0.5) * 0.22;
    return +(base + wobble + noise).toFixed(3);
  });
  const co2 = YEARS.map((y) => {
    const t = (y - 1900) / 124;
    const v = 296 + 122 * Math.pow(t, 1.35) + Math.sin((y - 1900) / 7) * 0.6;
    return +v.toFixed(2);
  });
  const r2 = rng(13);
  const precip = YEARS.map((y, i) => {
    const v = 990 + Math.sin(i / 6) * 30 + Math.sin(i / 19) * 50 + (r2() - 0.5) * 40 + (y - 1900) * 0.1;
    return +v.toFixed(1);
  });
  const sealevel = YEARS.map((y) => {
    if (y < 1880) return null;
    const t = (y - 1900) / 124;
    return +(-180 + 250 * Math.pow(t, 1.7)).toFixed(1);
  });
  const r3 = rng(91);
  const ice = YEARS.map((y, i) => {
    const t = (y - 1900) / 124;
    const v = 8.4 - 2.6 * Math.pow(t, 2.1) + (r3() - 0.5) * 0.45;
    return +v.toFixed(2);
  });
  const r4 = rng(33);
  const enso = YEARS.map((_, i) => +(Math.sin(i / 3.4) * 0.9 + (r4() - 0.5) * 0.6).toFixed(2));

  const SERIES = {
    temp:     { name: "Surface temperature anomaly", unit: "°C", color: "#d24a3a", data: tempRaw, axis: "left", source: "berkeley" },
    co2:      { name: "Atmospheric CO₂",            unit: "ppm", color: "#2f8a52", data: co2, axis: "right", source: "noaa" },
    precip:   { name: "Precipitation",              unit: "mm/yr", color: "#3a8bd2", data: precip, axis: "right", source: "cmip" },
    sealevel: { name: "Global mean sea level",      unit: "mm",  color: "#6b46ff", data: sealevel, axis: "right", source: "cmip" },
    ice:      { name: "Arctic sea-ice extent",      unit: "M km²", color: "#0fb8c1", data: ice, axis: "right", source: "nsidc" },
    enso:     { name: "ENSO ONI",                   unit: "°C",  color: "#b97d1c", data: enso, axis: "left", source: "cmip" },
  };

  const SOURCE_INFO = {
    berkeley: { label: "Berkeley Earth Surface Temperature v4", tip: "Synthetic series resembling Berkeley Earth land+ocean monthly anomalies, 1850–present. Baseline: 1951–1980." },
    noaa: { label: "NOAA Global Monitoring Lab CO₂", tip: "Synthetic Mauna Loa CO₂ analog. Monthly background marine boundary layer averages." },
    cmip: { label: "CMIP6 reanalysis (synthetic)", tip: "Toy CMIP-style reanalysis. Use for layout testing only." },
    nsidc: { label: "NSIDC Sea Ice Index", tip: "Synthetic Arctic September minimum extent, 1979–present." },
  };

  const REGION_LABELS = {
    global: "Global", nh: "Northern Hemisphere", sh: "Southern Hemisphere",
    trop: "Tropics", arctic: "Arctic"
  };
  const SMOOTH_LABELS = {
    raw: "annual raw", "3": "3-year running mean",
    "10": "10-year running mean", "30": "30-year normal"
  };

  // ---------- state ----------
  const state = {
    active: ["temp", "co2"],
    smooth: 3,
    region: "global",
    axis: "dual",
    fromYear: 1900,
    toYear: 2024,
    inspectYear: null,
    notes: [
      { year: 1945, text: "Postwar industrial expansion begins to alter the temperature record." },
      { year: 1991, text: "Mt Pinatubo cooled the surface by ~0.4°C for two years." },
      { year: 2015, text: "Strong El Niño coincides with new global-temperature record." }
    ]
  };

  // ---------- toast ----------
  let toastTimer = null;
  function toast(msg, opts = {}) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.toggle("error", !!opts.error);
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), opts.duration || 2600);
  }

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

  function buildTitle() {
    const names = state.active.map(k => SERIES[k].name);
    if (names.length === 0) return "Climate Almanac";
    if (names.length === 1) return names[0];
    if (names.length === 2) return names.join(" & ");
    return `${names[0]}, ${names[1]} +${names.length - 2} more`;
  }
  function buildSubtitle() {
    const region = REGION_LABELS[state.region] || "Global";
    const smoothL = SMOOTH_LABELS[String(state.smooth) === "1" ? "raw" : String(state.smooth)] || `${state.smooth}-year running mean`;
    const axis = state.axis === "single" ? "z-scored single axis" : "dual axes";
    const inspect = window.matchMedia && window.matchMedia("(hover: none)").matches
      ? "tap the chart or drag the slider to inspect a year"
      : "hover the chart to inspect a year";
    return `${region} · ${smoothL} · ${state.fromYear}–${state.toYear} · ${axis} · ${inspect}. Notes are pinned as ⋄.`;
  }
  function syncHeader() {
    $("#chart-title").textContent = buildTitle();
    $("#chart-subtitle").textContent = buildSubtitle();
  }

  function syncSources() {
    const ul = $("#sources");
    ul.innerHTML = "";
    const used = new Set(state.active.map(k => SERIES[k].source));
    if (used.size === 0) {
      const li = document.createElement("li");
      li.className = "src-empty";
      li.textContent = "No active layers.";
      ul.appendChild(li);
      return;
    }
    for (const id of used) {
      const info = SOURCE_INFO[id]; if (!info) continue;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#"; a.dataset.srcid = id; a.textContent = info.label;
      a.title = info.tip;
      a.addEventListener("click", (e) => { e.preventDefault(); toast(info.tip, { duration: 4500 }); });
      li.appendChild(a);
      ul.appendChild(li);
    }
  }

  function syncVarHint() {
    const count = state.active.length;
    const cs = $("#var-count");
    if (cs) cs.textContent = String(count);
    $$(".var").forEach(li => {
      const k = li.dataset.key;
      const cb = li.querySelector("input");
      if (count >= MAX_VARS && !state.active.includes(k)) {
        li.classList.add("disabled");
        cb.disabled = true;
        cb.title = `Limit of ${MAX_VARS} variables. Remove one to add another.`;
      } else {
        li.classList.remove("disabled");
        cb.disabled = false;
        cb.removeAttribute("title");
      }
    });
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

    // Axis labels
    const leftLabelText = state.axis === "single"
      ? "z-score (all series)"
      : (left.length ? left.map(k => `${SERIES[k].name.split(" ")[0]} (${SERIES[k].unit})`).join(" / ") : "");
    if (leftLabelText) {
      chart.appendChild(svgEl("text", {
        x: 14, y: MARGIN.top + PLOT_H / 2, transform: `rotate(-90 14 ${MARGIN.top + PLOT_H / 2})`,
        "text-anchor": "middle", "font-size": 11, fill: "#5b6c7c", "font-weight": 600
      }, "Left: " + leftLabelText));
    }

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
      const rightLabelText = right.map(k => `${SERIES[k].name.split(" ")[0]} (${SERIES[k].unit})`).join(" / ");
      chart.appendChild(svgEl("text", {
        x: CHART_W - 14, y: MARGIN.top + PLOT_H / 2,
        transform: `rotate(90 ${CHART_W - 14} ${MARGIN.top + PLOT_H / 2})`,
        "text-anchor": "middle", "font-size": 11, fill: "#5b6c7c", "font-weight": 600
      }, "Right: " + rightLabelText));
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
      const axisTag = state.axis === "single" ? "" : (SERIES[k].axis === "left" ? " ←" : " →");
      legend.appendChild(svgEl("text", { x: x+20, y, "font-size": 12, fill: "#102434" }, SERIES[k].name + " (" + SERIES[k].unit + ")" + axisTag));
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

    // Hover/touch overlay
    const overlay = svgEl("rect", { x: MARGIN.left, y: MARGIN.top, width: PLOT_W, height: PLOT_H, fill: "transparent" });
    chart.appendChild(overlay);

    function inspectAtClientX(clientX, clientY, pin) {
      const rect = chart.getBoundingClientRect();
      const scaleX = CHART_W / rect.width;
      const mx = (clientX - rect.left) * scaleX;
      const t = (mx - MARGIN.left) / PLOT_W;
      const y = state.fromYear + t * (state.toYear - state.fromYear);
      const yearIdx = Math.max(0, Math.min(YEARS.length - 1, Math.round(y - 1900)));
      const year = YEARS[yearIdx];
      showInspect(year, clientX, clientY, rect, pin);
    }
    function showInspect(year, clientX, clientY, rect, pin) {
      const yearIdx = year - 1900;
      let html = `<strong>${year}</strong><br/>`;
      for (const k of state.active) {
        const v = buildSmoothed(k)[yearIdx];
        html += `<span style="color:${SERIES[k].color}">●</span> ${SERIES[k].name}: <strong>${v == null ? "—" : v.toFixed(2)}</strong> ${SERIES[k].unit}<br/>`;
      }
      tooltip.innerHTML = html;
      tooltip.style.display = "block";
      if (rect && clientX != null) {
        const offX = clientX - rect.left + 16;
        const offY = clientY - rect.top + 16;
        tooltip.style.left = Math.min(offX, rect.width - 200) + "px";
        tooltip.style.top = Math.min(offY, rect.height - 100) + "px";
      } else {
        const wrap = $(".chart-wrap").getBoundingClientRect();
        const cRect = chart.getBoundingClientRect();
        const x = ((xScale(year) / CHART_W) * cRect.width) + (cRect.left - wrap.left);
        tooltip.style.left = Math.min(x + 16, wrap.width - 200) + "px";
        tooltip.style.top = "16px";
      }
      const lineX = xScale(year);
      let cur = chart.querySelector(".cursor");
      if (!cur) {
        cur = svgEl("line", { class: "cursor", stroke: "#5b6c7c", "stroke-dasharray": "3 3", "stroke-width": 1 });
        chart.appendChild(cur);
      }
      cur.setAttribute("x1", lineX); cur.setAttribute("x2", lineX);
      cur.setAttribute("y1", MARGIN.top); cur.setAttribute("y2", MARGIN.top + PLOT_H);
      $("#inspector").innerHTML = html;
      if (pin) state.inspectYear = year;
      const sc = $("#year-scrubber");
      if (sc) sc.value = year;
    }

    overlay.addEventListener("mousemove", (e) => inspectAtClientX(e.clientX, e.clientY, false));
    overlay.addEventListener("mouseleave", () => {
      if (state.inspectYear != null) return;
      tooltip.style.display = "none";
      chart.querySelector(".cursor")?.remove();
    });
    // Touch & click for mobile/tap
    overlay.addEventListener("click", (e) => inspectAtClientX(e.clientX, e.clientY, true));
    overlay.addEventListener("touchstart", (e) => {
      const t = e.touches[0]; if (!t) return;
      inspectAtClientX(t.clientX, t.clientY, true);
      e.preventDefault();
    }, { passive: false });
    overlay.addEventListener("touchmove", (e) => {
      const t = e.touches[0]; if (!t) return;
      inspectAtClientX(t.clientX, t.clientY, true);
      e.preventDefault();
    }, { passive: false });

    // Re-apply pinned inspect year after re-render
    if (state.inspectYear != null && state.inspectYear >= state.fromYear && state.inspectYear <= state.toYear) {
      showInspect(state.inspectYear, null, null, null, true);
    }

    // Expose for external triggers (scrubber)
    chart._showInspect = (year) => showInspect(year, null, null, null, true);

    drawBrush();
    renderNotes();
    renderLayers();
    syncHeader();
    syncSources();
    syncVarHint();
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
    const lx = ((state.fromYear - 1900) / 124) * W;
    const rx = ((state.toYear - 1900) / 124) * W;
    brush.appendChild(svgEl("rect", { x: lx, y: 0, width: rx - lx, height: H, fill: "rgba(10,77,110,0.10)" }));
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
      if (cb.checked) {
        if (state.active.includes(key)) return;
        if (state.active.length >= MAX_VARS) {
          cb.checked = false;
          toast(`Limit of ${MAX_VARS} variables. Remove a layer to add another.`, { error: true });
          return;
        }
        state.active.push(key);
      } else {
        state.active = state.active.filter(k => k !== key);
        if (state.active.length === 0) {
          state.active = ["temp"];
          const tcb = document.querySelector('.var[data-key="temp"] input');
          if (tcb) tcb.checked = true;
          toast("At least one variable is required. Restored Surface temperature anomaly.");
        }
      }
      render();
    });
  });
  $("#smooth").addEventListener("change", (e) => {
    state.smooth = +e.target.value || 1;
    render();
    toast("Smoothing updated.");
  });
  $("#region").addEventListener("change", (e) => {
    state.region = e.target.value;
    render();
    toast(`Region: ${REGION_LABELS[e.target.value] || e.target.value}.`);
  });
  $$("input[name=ax]").forEach((r) => r.addEventListener("change", () => {
    state.axis = $("input[name=ax]:checked").value;
    render();
    toast(state.axis === "single" ? "Switched to single z-scored axis." : "Switched to dual axes.");
  }));
  $("#reset-view").addEventListener("click", () => {
    state.fromYear = 1900; state.toYear = 2024;
    state.inspectYear = null;
    tooltip.style.display = "none";
    chart.querySelector(".cursor")?.remove();
    render();
    toast("Zoom reset to 1900–2024.");
  });
  $("#add-note").addEventListener("click", () => {
    const year = prompt("Annotation year (1900–2024):");
    if (!year) { toast("Note canceled."); return; }
    const yr = parseInt(year, 10);
    if (isNaN(yr) || yr < 1900 || yr > 2024) { toast("Invalid year. Use 1900–2024.", { error: true }); return; }
    const txt = prompt("Annotation text:");
    if (!txt) { toast("Note canceled."); return; }
    state.notes.push({ year: yr, text: txt });
    render();
    toast(`Note added at ${yr}.`);
  });

  // Year scrubber (mobile-first inspection)
  const scrubber = $("#year-scrubber");
  if (scrubber) {
    scrubber.addEventListener("input", (e) => {
      const yr = +e.target.value;
      if (yr < state.fromYear) state.fromYear = yr;
      if (yr > state.toYear) state.toYear = yr;
      state.inspectYear = yr;
      if (chart._showInspect) chart._showInspect(yr);
      else render();
    });
  }

  // Header actions
  $("#share-view").addEventListener("click", async () => {
    const params = new URLSearchParams({
      vars: state.active.join(","),
      region: state.region,
      smooth: String(state.smooth),
      axis: state.axis,
      from: String(state.fromYear),
      to: String(state.toYear),
    });
    const url = `${location.origin}${location.pathname}?${params.toString()}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        toast("Share link copied to clipboard.");
      } else {
        prompt("Copy this share link:", url);
        toast("Share link ready.");
      }
    } catch {
      prompt("Copy this share link:", url);
    }
  });
  $("#download-csv").addEventListener("click", () => {
    const cols = ["year", ...state.active.map(k => `${SERIES[k].name} (${SERIES[k].unit})`)];
    const rows = [cols.join(",")];
    const smoothed = {};
    state.active.forEach(k => smoothed[k] = buildSmoothed(k));
    for (let i = 0; i < YEARS.length; i++) {
      if (YEARS[i] < state.fromYear || YEARS[i] > state.toYear) continue;
      const row = [YEARS[i]];
      for (const k of state.active) {
        const v = smoothed[k][i];
        row.push(v == null ? "" : v);
      }
      rows.push(row.join(","));
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `climate-almanac_${state.fromYear}-${state.toYear}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(`CSV downloaded (${rows.length - 1} rows).`);
  });

  // Disabled placeholder nav
  $$(".topbar nav a.nav-soon").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      toast(`${a.textContent.trim()} is coming soon.`);
    });
  });

  // ---------- layers & notes ----------
  function renderLayers() {
    const ul = $("#layers");
    ul.innerHTML = "";
    state.active.forEach((k) => {
      const li = document.createElement("li");
      li.className = "layer";
      li.innerHTML = `<span class="handle">≡</span><span class="swatch" style="background:${SERIES[k].color}"></span><span>${SERIES[k].name}</span><button class="x" data-key="${k}" aria-label="Remove ${SERIES[k].name}">×</button>`;
      li.querySelector(".x").addEventListener("click", () => {
        state.active = state.active.filter(x => x !== k);
        if (state.active.length === 0) state.active = ["temp"];
        const cb = document.querySelector(`.var[data-key="${k}"] input`);
        if (cb) cb.checked = false;
        const tcb = document.querySelector('.var[data-key="temp"] input');
        if (tcb && state.active.includes("temp")) tcb.checked = true;
        render();
        toast(`Removed ${SERIES[k].name}.`);
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
      li.innerHTML = `<span class="yr">${n.year}</span>${n.text}<button data-i="${i}" aria-label="Delete note ${n.year}">×</button>`;
      li.querySelector("button").addEventListener("click", () => {
        state.notes.splice(i,1); render();
        toast(`Deleted note from ${n.year}.`);
      });
      ul.appendChild(li);
    });
  }

  render();
})();

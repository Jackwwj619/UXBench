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
    // simplified continent polygons (lon/lat). Not geographically accurate; recognizable shapes only.
    { name: "Eurasia", pts: [[-10,71],[35,73],[65,73],[110,72],[160,68],[178,62],[170,55],[145,50],[130,40],[115,35],[100,25],[88,18],[72,15],[60,25],[55,30],[40,35],[30,38],[20,40],[5,42],[-5,40],[-10,55]] },
    { name: "Africa",  pts: [[-15,15],[5,35],[12,33],[35,32],[42,12],[51,12],[42,0],[40,-12],[28,-32],[18,-34],[8,-5],[-8,5],[-15,15]] },
    { name: "Americas-N", pts: [[-165,72],[-130,72],[-100,82],[-70,82],[-55,75],[-50,60],[-70,45],[-80,30],[-95,18],[-105,22],[-115,30],[-125,45],[-140,60],[-165,72]] },
    { name: "Americas-S", pts: [[-80,12],[-65,5],[-55,-10],[-50,-25],[-58,-40],[-70,-55],[-78,-50],[-72,-30],[-80,-10],[-80,12]] },
    { name: "Australia", pts: [[112,-12],[140,-12],[154,-22],[150,-38],[130,-32],[115,-32],[112,-22],[112,-12]] },
    { name: "Greenland", pts: [[-50,82],[-30,82],[-20,75],[-30,60],[-45,60],[-50,75]] },
    { name: "Antarctica-strip", pts: [[-180,-66],[180,-66],[180,-78],[-180,-78]] }
  ];

  function drawBase() {
    // graticules
    for (let lon = -150; lon <= 150; lon += 30) {
      const [x1] = proj(lon, 90), [x2] = proj(lon, -90);
      map.appendChild(svgEl("line", { class: "graticule", x1: x1, x2: x2, y1: 0, y2: H }));
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const [, y1] = proj(-180, lat), [, y2] = proj(180, lat);
      map.appendChild(svgEl("line", { class: "graticule", x1: 0, x2: W, y1: y1, y2: y2 }));
    }
    // continents
    for (const c of continents) {
      const d = c.pts.map(([lon, lat], i) => {
        const [x,y] = proj(lon, lat);
        return (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
      }).join(" ") + " Z";
      map.appendChild(svgEl("path", { class: "land", d }));
    }
  }

  // ---------- mock species + tracks ----------
  function rng(seed) { let s = seed; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function makeTrack(seed, route) {
    // route: array of 12 [lon,lat] anchor points per month with noise per individual
    return route.map(([lon,lat]) => [lon + (rng(seed)()-0.5)*2.5, lat + (rng(seed+1)()-0.5)*1.6]);
  }
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
    osprey: {
      name: "Western osprey",
      color: "#c75a3c",
      indivs: makeIndividuals(12, 11, [
        [12, 60], [10, 50], [8, 38], [5, 22], [3, 8], [0, -5],
        [3, 8], [5, 22], [8, 38], [10, 50], [12, 60], [12, 62]
      ], "OSP", ["2 yr", "3 yr", "4 yr", "5 yr", "7 yr"])
    },
    caribou: {
      name: "Boreal caribou",
      color: "#5b7a32",
      indivs: makeIndividuals(18, 41, [
        [-120, 64], [-118, 62], [-116, 60], [-115, 58], [-117, 60], [-119, 62],
        [-121, 64], [-122, 66], [-122, 68], [-121, 66], [-120, 65], [-120, 64]
      ], "CAR", ["4 yr","5 yr","6 yr","9 yr","11 yr"])
    },
    monarch: {
      name: "Monarch butterfly",
      color: "#d8861a",
      indivs: makeIndividuals(24, 71, [
        [-100, 19], [-95, 24], [-90, 32], [-85, 40], [-80, 44], [-78, 46],
        [-78, 46], [-80, 44], [-85, 40], [-90, 32], [-95, 24], [-100, 19]
      ], "MON", ["0.2 yr","0.4 yr"])
    },
    turtle: {
      name: "Leatherback sea turtle",
      color: "#0a8ab3",
      indivs: makeIndividuals(9, 101, [
        [-55, 10], [-48, 18], [-40, 28], [-32, 35], [-26, 40], [-22, 38],
        [-26, 30], [-34, 22], [-44, 16], [-52, 12], [-55, 10], [-55, 10]
      ], "LBK", ["12 yr","20 yr","27 yr"])
    },
    bartailed: {
      name: "Bar-tailed godwit",
      color: "#5e3aa6",
      indivs: makeIndividuals(7, 131, [
        [175, -38], [170, -10], [150, 22], [130, 40], [110, 55], [90, 62],
        [120, 60], [150, 50], [165, 30], [172, 0], [176, -25], [175, -38]
      ], "GDW", ["3 yr","4 yr","6 yr"])
    },
    whale: {
      name: "Humpback whale",
      color: "#1a5e8b",
      indivs: makeIndividuals(11, 161, [
        [-150, 18], [-140, 28], [-135, 40], [-132, 50], [-130, 56], [-130, 58],
        [-132, 56], [-138, 48], [-145, 36], [-152, 24], [-150, 18], [-150, 18]
      ], "HUM", ["6 yr","8 yr","12 yr","18 yr"])
    },
    albatross: {
      name: "Wandering albatross",
      color: "#7d5c1c",
      indivs: makeIndividuals(4, 191, [
        [50, -45], [80, -45], [120, -45], [160, -45], [-160, -45], [-120, -45],
        [-90, -45], [-60, -45], [-30, -45], [0, -45], [30, -45], [50, -45]
      ], "ALB", ["7 yr","10 yr"])
    }
  };

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const state = {
    active: new Set(["osprey", "caribou", "monarch"]),
    month: 5,
    showTrail: true,
    showDots: true,
    showStop: false,
    selected: null
  };

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
        // trail polyline from month 1 → current month
        const monthIdx = Math.max(0, Math.min(11, state.month - 1));
        const slice = pts.slice(0, monthIdx + 1);
        if (state.showTrail && slice.length > 1) {
          const d = slice.map(([x,y], i) => (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1)).join(" ");
          const path = svgEl("path", { class: "trail" + (isActive ? "" : " dim"), d, stroke: sp.color, "data-key": key, "data-id": ind.id });
          path.addEventListener("click", () => selectIndividual(key, ind.id));
          g.appendChild(path);
        }
        if (state.showDots && isActive) {
          // dots at each completed month
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
          // crude stopover hull: small ellipse at first and last point of slice
          const [sx, sy] = slice[0];
          const [ex, ey] = slice[slice.length - 1];
          g.appendChild(svgEl("ellipse", { class: "stopover", cx: sx, cy: sy, rx: 18, ry: 14, fill: sp.color, stroke: sp.color }));
          g.appendChild(svgEl("ellipse", { class: "stopover", cx: ex, cy: ey, rx: 18, ry: 14, fill: sp.color, stroke: sp.color }));
        }
        if (isActive) totalIndiv++;
        // compute range
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

    $("#n-species").textContent = Array.from(state.active).length;
    $("#n-individuals").textContent = totalIndiv;
    $("#month-label").textContent = MONTHS[state.month - 1];
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

  // ---------- inline status helper ----------
  let statusTimer = null;
  function showStatus(target, msg) {
    const el = typeof target === "string" ? document.getElementById(target) : target;
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("show");
    void el.offsetWidth;
    el.classList.add("show");
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { el.classList.remove("show"); }, 1700);
  }

  // ---------- controls ----------
  $$(".sp input").forEach((cb) => {
    cb.addEventListener("change", () => {
      const li = cb.closest(".sp");
      const key = li.dataset.key;
      const name = li.textContent.trim();
      if (cb.checked) state.active.add(key); else state.active.delete(key);
      drawTracks();
      showStatus("player-status",
        (cb.checked ? "Added " : "Removed ") + name.replace(/\s*\(.*\)$/, "") +
        " · " + state.active.size + " species shown");
    });
  });

  // year selector
  const yearSel = $("#year-sel");
  if (yearSel) {
    yearSel.addEventListener("change", (e) => {
      const val = e.target.value;
      const h1 = document.querySelector(".atlas-head h1");
      if (h1) h1.textContent = "Migration Atlas — " + val;
      showStatus("year-status", "Showing " + val);
      showStatus("player-status", "Season changed to " + val);
    });
  }
  $("#species-search").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    $$(".sp").forEach((li) => {
      li.style.display = li.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });
  $("#month-slider").addEventListener("input", (e) => {
    state.month = +e.target.value;
    drawTracks();
  });
  $("#show-trail").addEventListener("change", (e) => { state.showTrail = e.target.checked; drawTracks(); });
  $("#show-dots").addEventListener("change", (e) => { state.showDots = e.target.checked; drawTracks(); });
  $("#show-stop").addEventListener("change", (e) => { state.showStop = e.target.checked; drawTracks(); });

  // play/pause
  let timer = null;
  $("#play-btn").addEventListener("click", () => {
    const btn = $("#play-btn");
    if (timer) {
      clearInterval(timer); timer = null;
      btn.textContent = "▶"; btn.setAttribute("aria-label", "Play");
      showStatus("player-status", "Paused at " + MONTHS[state.month - 1]);
      return;
    }
    btn.textContent = "⏸"; btn.setAttribute("aria-label", "Pause");
    const speed = parseFloat($("#speed").value) || 1;
    showStatus("player-status", "Playing at " + speed + "× speed");
    timer = setInterval(() => {
      state.month = state.month >= 12 ? 1 : state.month + 1;
      $("#month-slider").value = state.month;
      drawTracks();
    }, 700 / speed);
  });

  // speed change feedback (and live-restart of running playback)
  $("#speed").addEventListener("change", (e) => {
    showStatus("player-status", "Speed: " + e.target.value);
    if (timer) {
      clearInterval(timer);
      const speed = parseFloat(e.target.value) || 1;
      timer = setInterval(() => {
        state.month = state.month >= 12 ? 1 : state.month + 1;
        $("#month-slider").value = state.month;
        drawTracks();
      }, 700 / speed);
    }
  });

  // soft-disable placeholder nav links so they don't append empty hashes
  document.querySelectorAll(".topbar nav a.soon").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      showStatus("player-status", a.textContent.replace(/\s*soon\s*$/i, "").trim() + " — coming soon");
    });
  });
})();

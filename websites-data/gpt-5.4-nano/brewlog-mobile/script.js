// Brewlog — coffee log mobile fixture

(function () {
  // Clock
  const sbTime = document.querySelector('.sb-time');
  function tick() {
    if (!sbTime) return;
    const d = new Date();
    let h = d.getHours();
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    sbTime.textContent = `${h}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
  tick(); setInterval(tick, 30000);

  // Navigation
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.go === name));
    const active = document.querySelector('.screen.active');
    if (active) active.scrollTop = 0;
  }
  document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => showScreen(b.dataset.go)));

  // Ratio calculation
  const inputs = document.querySelectorAll('.dual-input input');
  function recalcRatio() {
    const dose = parseFloat(inputs[0]?.value || 0);
    const yld = parseFloat(inputs[1]?.value || 0);
    const out = document.getElementById('ratioOut');
    if (!out) return;
    if (dose > 0) out.textContent = `1 : ${(yld / dose).toFixed(1)}`;
    else out.textContent = '—';
  }
  inputs.forEach((i) => i.addEventListener('input', recalcRatio));
  recalcRatio();

  // Grind slider value
  const grindSlider = document.getElementById('grindSlider');
  const grindVal = document.getElementById('grindVal');
  grindSlider?.addEventListener('input', () => grindVal.textContent = grindSlider.value);

  // Score pills
  const scoreCurrent = document.getElementById('scoreCurrent');
  document.querySelectorAll('.score-pill').forEach((p) => p.addEventListener('click', () => {
    document.querySelectorAll('.score-pill').forEach((x) => {
      const isActive = x === p;
      x.classList.toggle('active', isActive);
      x.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    if (scoreCurrent) scoreCurrent.textContent = `${p.textContent.trim()} / 10`;
  }));

  // Save brew → flash confirmation + return to today
  const form = document.getElementById('brewForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.cta-btn-coffee');
    if (!btn) return;
    const t = btn.textContent;
    btn.textContent = '✓ Saved';
    btn.classList.add('is-saved');
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = t;
      btn.classList.remove('is-saved');
      btn.disabled = false;
      showScreen('today');
    }, 900);
  });

  // Method card visual sync + summary update
  const methodCurrent = document.getElementById('methodCurrent');
  function syncMethod(card) {
    document.querySelectorAll('.m-card').forEach((x) => {
      const input = x.querySelector('input');
      if (input) input.checked = x === card;
    });
    const label = card.querySelector('b');
    if (methodCurrent && label) methodCurrent.textContent = label.textContent;
  }
  document.querySelectorAll('.m-card').forEach((c) => {
    c.addEventListener('click', () => syncMethod(c));
    const input = c.querySelector('input');
    input?.addEventListener('change', () => syncMethod(c));
  });

  // Trend chart (last 14 brews score)
  const trendSvg = document.getElementById('trendChart');
  if (trendSvg) {
    const scores = [7.4, 7.8, 8.0, 7.2, 8.2, 8.4, 8.0, 7.6, 8.5, 8.8, 8.1, 7.9, 8.5, 8.0];
    const W = 320, H = 110, padL = 8, padR = 8, padT = 12, padB = 14;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const min = 5, max = 10;
    const xS = (i) => padL + (i / (scores.length - 1)) * innerW;
    const yS = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;
    let g = '';
    // gridlines
    [6, 7, 8, 9].forEach((v) => {
      const y = yS(v);
      g += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#E8DDC9" stroke-dasharray="2 3"/>`;
      g += `<text x="${padL + 2}" y="${y - 2}" fill="#A29680" font-size="9" font-family="JetBrains Mono">${v}</text>`;
    });
    // line + area
    const pts = scores.map((v, i) => `${xS(i)},${yS(v)}`).join(' ');
    const area = `${padL},${H - padB} ${pts} ${W - padR},${H - padB}`;
    g += `<polygon points="${area}" fill="rgba(156,107,67,0.18)"/>`;
    g += `<polyline points="${pts}" fill="none" stroke="#5C3A22" stroke-width="2"/>`;
    // dots
    scores.forEach((v, i) => {
      g += `<circle cx="${xS(i)}" cy="${yS(v)}" r="3" fill="#5C3A22" stroke="white" stroke-width="1.5"/>`;
    });
    trendSvg.innerHTML = g;
  }
})();

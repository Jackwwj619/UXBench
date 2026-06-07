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
  document.querySelectorAll('.score-pill').forEach((p, i) => {
    p.setAttribute('role', 'radio');
    p.setAttribute('aria-label', `Score ${i + 1} of 10`);
    p.setAttribute('aria-checked', p.classList.contains('active') ? 'true' : 'false');
    p.addEventListener('click', () => {
      document.querySelectorAll('.score-pill').forEach((x) => {
        const on = x === p;
        x.classList.toggle('active', on);
        x.setAttribute('aria-checked', on ? 'true' : 'false');
      });
    });
  });

  // Tasting note chips — make tap state obvious even outside :has() support
  document.querySelectorAll('.tag-grid input').forEach((input) => {
    input.addEventListener('change', () => {
      input.closest('label')?.classList.toggle('checked', input.checked);
    });
  });

  // Save brew → disable, success state, then return to today
  const form = document.getElementById('brewForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.cta-btn-coffee');
    if (!btn || btn.disabled) return;
    const original = btn.textContent;
    btn.disabled = true;
    btn.classList.add('is-saving');
    btn.textContent = 'Saving…';
    setTimeout(() => {
      btn.classList.remove('is-saving');
      btn.classList.add('is-saved');
      btn.textContent = '✓ Saved';
    }, 350);
    setTimeout(() => {
      btn.classList.remove('is-saved');
      btn.disabled = false;
      btn.textContent = original;
      showScreen('today');
    }, 1200);
  });

  // Method card visual sync (radios are visually hidden, this just makes the click target friendlier)
  document.querySelectorAll('.m-card').forEach((c) => c.addEventListener('click', () => {
    document.querySelectorAll('.m-card').forEach((x) => {
      const input = x.querySelector('input');
      if (input) input.checked = x === c;
    });
  }));

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

  // Stats range — visibly update tiles + chart so the control feels real
  const rangeSelect = document.getElementById('rangeSelect');
  const rangeData = {
    'Last 7 days':   { brews: '17',  avg: '8.1', coffee: '258 g', cost: '$28.40', scores: [7.4, 7.8, 8.0, 7.2, 8.2, 8.4, 8.0, 7.6, 8.5, 8.8, 8.1, 7.9, 8.5, 8.0] },
    'Last 30 days':  { brews: '64',  avg: '7.9', coffee: '982 g', cost: '$108.60', scores: [7.0, 7.5, 7.2, 7.8, 8.1, 7.9, 8.0, 7.6, 8.2, 7.4, 8.0, 7.7, 8.1, 7.9] },
    'This year':    { brews: '412', avg: '7.7', coffee: '6.4 kg', cost: '$702.40', scores: [6.8, 7.2, 7.4, 7.0, 7.6, 7.9, 7.5, 7.8, 8.0, 7.3, 7.7, 7.5, 8.0, 7.7] }
  };
  function renderTrend(scores) {
    if (!trendSvg) return;
    const W = 320, H = 110, padL = 8, padR = 8, padT = 12, padB = 14;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const min = 5, max = 10;
    const xS = (i) => padL + (i / (scores.length - 1)) * innerW;
    const yS = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;
    let g = '';
    [6, 7, 8, 9].forEach((v) => {
      const y = yS(v);
      g += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#E8DDC9" stroke-dasharray="2 3"/>`;
      g += `<text x="${padL + 2}" y="${y - 2}" fill="#A29680" font-size="9" font-family="JetBrains Mono">${v}</text>`;
    });
    const pts = scores.map((v, i) => `${xS(i)},${yS(v)}`).join(' ');
    const area = `${padL},${H - padB} ${pts} ${W - padR},${H - padB}`;
    g += `<polygon points="${area}" fill="rgba(156,107,67,0.18)"/>`;
    g += `<polyline points="${pts}" fill="none" stroke="#5C3A22" stroke-width="2"/>`;
    scores.forEach((v, i) => {
      g += `<circle cx="${xS(i)}" cy="${yS(v)}" r="3" fill="#5C3A22" stroke="white" stroke-width="1.5"/>`;
    });
    trendSvg.innerHTML = g;
  }
  rangeSelect?.addEventListener('change', () => {
    const data = rangeData[rangeSelect.value];
    if (!data) return;
    const tiles = document.getElementById('statTiles');
    if (tiles) {
      tiles.classList.add('is-loading');
      tiles.querySelector('[data-stat="brews"]').textContent = data.brews;
      tiles.querySelector('[data-stat="avg"]').textContent = data.avg;
      tiles.querySelector('[data-stat="coffee"]').textContent = data.coffee;
      tiles.querySelector('[data-stat="cost"]').textContent = data.cost;
      setTimeout(() => tiles.classList.remove('is-loading'), 200);
    }
    renderTrend(data.scores);
  });

  // Beans search — visible filtering with a result count
  const beanSearch = document.getElementById('beanSearch');
  const beanList = document.getElementById('beanList');
  const beanStatus = document.getElementById('beanSearchStatus');
  if (beanSearch && beanList) {
    const rows = Array.from(beanList.querySelectorAll('.bean-row'));
    const totalCount = rows.length;
    let emptyEl = null;
    beanSearch.addEventListener('input', () => {
      const q = beanSearch.value.trim().toLowerCase();
      let shown = 0;
      rows.forEach((r) => {
        const name = (r.querySelector('.bean-name')?.textContent || '').toLowerCase();
        const sub = (r.querySelector('.bean-sub')?.textContent || '').toLowerCase();
        const match = !q || name.includes(q) || sub.includes(q);
        r.classList.toggle('is-hidden', !match);
        if (match) shown += 1;
      });
      if (!beanStatus) return;
      if (!q) { beanStatus.textContent = ''; }
      else if (shown === 0) { beanStatus.textContent = `No beans match “${beanSearch.value}”.`; }
      else { beanStatus.textContent = `${shown} of ${totalCount} beans match “${beanSearch.value}”.`; }
      if (emptyEl) { emptyEl.remove(); emptyEl = null; }
      if (q && shown === 0) {
        emptyEl = document.createElement('li');
        emptyEl.className = 'bean-empty';
        emptyEl.textContent = 'No matching beans. Try a different origin or roaster.';
        beanList.appendChild(emptyEl);
      }
    });
  }

  // Brew/Reorder action flash — give the per-bean buttons immediate feedback
  document.querySelectorAll('.b-act').forEach((btn) => {
    btn.addEventListener('click', () => {
      const original = btn.textContent;
      const isReorder = btn.classList.contains('muted');
      btn.classList.add('is-flash');
      btn.style.color = 'white';
      btn.textContent = isReorder ? '✓ Added' : '✓ Started';
      setTimeout(() => {
        btn.classList.remove('is-flash');
        btn.style.color = '';
        btn.textContent = original;
        if (!isReorder) showScreen('add');
      }, 700);
    });
  });
})();

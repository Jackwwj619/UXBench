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
  document.querySelectorAll('.score-pill').forEach((p) => p.addEventListener('click', () => {
    document.querySelectorAll('.score-pill').forEach((x) => x.classList.toggle('active', x === p));
  }));

  // Toast helper
  const toast = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => { toast.hidden = true; }, 250);
    }, 1600);
  }

  // Save brew → toast, reset form, return to today
  const form = document.getElementById('brewForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.cta-btn-coffee');
    const t = btn.textContent;
    btn.textContent = '✓ Saved';
    btn.style.background = '#65A30D';
    showToast('Brew saved · added to Today');
    setTimeout(() => {
      // Reset form to defaults so it's ready for the next entry
      form.reset();
      // Re-establish the default active score pill
      document.querySelectorAll('.score-pill').forEach((x, i) => x.classList.toggle('active', i === 7));
      recalcRatio();
      if (grindSlider && grindVal) grindVal.textContent = grindSlider.value;
      btn.textContent = t;
      btn.style.background = '';
      showScreen('today');
    }, 900);
  });

  // Method card visual sync (radios are visually hidden, this just makes the click target friendlier)
  document.querySelectorAll('.m-card').forEach((c) => c.addEventListener('click', () => {
    document.querySelectorAll('.m-card').forEach((x) => {
      const input = x.querySelector('input');
      if (input) input.checked = x === c;
    });
  }));

  // Trend chart (last 14 brews score)
  const fullScores = [7.4, 7.8, 8.0, 7.2, 8.2, 8.4, 8.0, 7.6, 8.5, 8.8, 8.1, 7.9, 8.5, 8.0,
    8.3, 7.6, 8.6, 8.1, 7.8, 8.4, 8.7, 8.0, 7.9, 8.2, 8.4, 8.6, 8.1, 8.3, 7.7, 8.5];
  function renderTrend(scores) {
    const trendSvg = document.getElementById('trendChart');
    if (!trendSvg) return;
    const W = 320, H = 110, padL = 8, padR = 8, padT = 12, padB = 14;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const min = 5, max = 10;
    const xS = (i) => padL + (scores.length === 1 ? innerW / 2 : (i / (scores.length - 1)) * innerW);
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

  // Stats time-range filter — re-render tiles + chart
  const statsRange = document.getElementById('statsRange');
  function setStat(name, val) {
    const el = document.querySelector(`#statTiles [data-stat="${name}"]`);
    if (el) el.textContent = val;
  }
  function renderStats(days) {
    let take;
    if (days === 7) take = 14;
    else if (days === 30) take = 24;
    else take = fullScores.length;
    const slice = fullScores.slice(-take);
    const avg = (slice.reduce((a, b) => a + b, 0) / slice.length).toFixed(1);
    const brews = days === 7 ? 17 : days === 30 ? 64 : 412;
    const coffee = days === 7 ? '258 g' : days === 30 ? '1.02 kg' : '11.6 kg';
    const cost = days === 7 ? '$28.40' : days === 30 ? '$112.50' : '$1,284.00';
    setStat('brews', brews);
    setStat('avg', avg);
    setStat('coffee', coffee);
    setStat('cost', cost);
    renderTrend(slice);
  }
  if (statsRange) {
    statsRange.addEventListener('change', () => renderStats(parseInt(statsRange.value, 10)));
    renderStats(parseInt(statsRange.value, 10));
  } else {
    renderTrend(fullScores.slice(0, 14));
  }

  // Beans: search filter
  const beanSearch = document.getElementById('beanSearch');
  const beanList = document.getElementById('beanList');
  const beanEmpty = document.getElementById('beanEmpty');
  beanSearch?.addEventListener('input', () => {
    const q = beanSearch.value.trim().toLowerCase();
    let visible = 0;
    beanList?.querySelectorAll('.bean-row').forEach((row) => {
      const name = row.querySelector('.bean-name')?.textContent.toLowerCase() || '';
      const sub = row.querySelector('.bean-sub')?.textContent.toLowerCase() || '';
      const match = !q || name.includes(q) || sub.includes(q);
      row.classList.toggle('hidden-by-search', !match);
      if (match) visible++;
    });
    if (beanEmpty) beanEmpty.hidden = visible !== 0;
  });

  // Beans: Brew / Reorder action — pre-fill bean and route to Add
  beanList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.b-act');
    if (!btn) return;
    const row = btn.closest('.bean-row');
    const beanName = row?.dataset.bean;
    const action = btn.dataset.action;
    if (action === 'reorder') {
      showToast(`Reorder request sent for ${beanName || 'bean'}`);
      return;
    }
    const select = document.getElementById('beanSelect');
    if (select && beanName) {
      const opt = Array.from(select.options).find((o) => o.textContent === beanName);
      if (opt) select.value = opt.value || opt.textContent;
    }
    showScreen('add');
  });

  // Beans: + New modal
  const newBeanBtn = document.getElementById('newBeanBtn');
  const newBeanModal = document.getElementById('newBeanModal');
  const nbCancel = document.getElementById('nbCancel');
  const nbSave = document.getElementById('nbSave');
  const nbName = document.getElementById('nbName');
  const nbRoaster = document.getElementById('nbRoaster');
  const nbRoast = document.getElementById('nbRoast');
  function openModal() {
    if (!newBeanModal) return;
    newBeanModal.hidden = false;
    setTimeout(() => nbName?.focus(), 50);
  }
  function closeModal() {
    if (!newBeanModal) return;
    newBeanModal.hidden = true;
    if (nbName) nbName.value = '';
    if (nbRoaster) nbRoaster.value = '';
  }
  newBeanBtn?.addEventListener('click', openModal);
  nbCancel?.addEventListener('click', closeModal);
  newBeanModal?.addEventListener('click', (e) => { if (e.target === newBeanModal) closeModal(); });
  nbSave?.addEventListener('click', () => {
    const name = (nbName?.value || '').trim();
    if (!name) { nbName?.focus(); return; }
    const roast = nbRoast?.value || 'medium';
    const roaster = (nbRoaster?.value || '').trim() || 'Unknown roaster';
    const label = `${name} · ${roast}`;
    // Add to bean list
    const li = document.createElement('li');
    li.className = 'bean-row';
    li.dataset.bean = label;
    const initial = name.charAt(0).toUpperCase() || '·';
    li.innerHTML = `
      <span class="bean-icon" style="background:#7A4F2C">${initial}</span>
      <div class="bean-meta">
        <div class="bean-name">${label}</div>
        <div class="bean-sub">${roaster} · just added</div>
        <div class="bean-stock">
          <div class="stock-bar"><i style="width:100%"></i></div>
          <span>250 g of 250 g · fresh</span>
        </div>
      </div>
      <div class="bean-actions">
        <span class="bean-rating new">new</span>
        <button class="b-act" data-action="brew">Brew</button>
      </div>`;
    beanList?.insertBefore(li, beanList.firstChild);
    // Add to bean select on Add screen
    const select = document.getElementById('beanSelect');
    if (select) {
      const opt = document.createElement('option');
      opt.textContent = label;
      const addNew = Array.from(select.options).find((o) => o.textContent.startsWith('+ Add'));
      if (addNew) select.insertBefore(opt, addNew); else select.appendChild(opt);
    }
    closeModal();
    showToast(`${name} added to your beans`);
  });
})();

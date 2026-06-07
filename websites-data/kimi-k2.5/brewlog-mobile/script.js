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

  // Toast helper
  let toastTimer = null;
  function toast(msg) {
    let el = document.getElementById('toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.querySelector('.phone')?.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  // Modal helper
  function openModal({ title, body, primary, onPrimary }) {
    closeModal();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'modalOverlay';
    overlay.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <h3 class="modal-title" id="modalTitle">${title}</h3>
        <div class="modal-body">${body}</div>
        <div class="modal-actions">
          <button type="button" class="modal-btn modal-cancel">Cancel</button>
          <button type="button" class="modal-btn modal-primary">${primary || 'OK'}</button>
        </div>
      </div>`;
    document.querySelector('.phone')?.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('open'));
    overlay.querySelector('.modal-cancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    overlay.querySelector('.modal-primary').addEventListener('click', () => {
      if (typeof onPrimary === 'function') onPrimary(overlay);
      else closeModal();
    });
  }
  function closeModal() {
    const o = document.getElementById('modalOverlay');
    if (o) o.remove();
  }

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

  // Save brew → flash + return to today
  const form = document.getElementById('brewForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.cta-btn-coffee');
    const t = btn.textContent;
    btn.textContent = '✓ Saved';
    btn.style.background = '#65A30D';
    setTimeout(() => { btn.textContent = t; btn.style.background = ''; showScreen('today'); }, 900);
  });

  // Method card visual sync (radios are visually hidden, this just makes the click target friendlier)
  document.querySelectorAll('.m-card').forEach((c) => c.addEventListener('click', () => {
    document.querySelectorAll('.m-card').forEach((x) => {
      const input = x.querySelector('input');
      if (input) input.checked = x === c;
    });
  }));

  // Bean: Brew / Reorder / + New
  document.querySelectorAll('.bean-row .b-act').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const row = btn.closest('.bean-row');
      const name = row?.querySelector('.bean-name')?.textContent?.trim() || 'this bean';
      const isReorder = btn.classList.contains('muted') || /reorder/i.test(btn.textContent);
      if (isReorder) {
        openModal({
          title: 'Reorder bean',
          body: `<p class="modal-text">Send a reorder request for <b>${name}</b>?</p>
                 <p class="modal-sub">We'll notify your usual roaster and add it back to your cellar when it ships.</p>`,
          primary: 'Confirm reorder',
          onPrimary: () => { closeModal(); toast(`Reorder requested · ${name.split('·')[0].trim()}`); }
        });
      } else {
        // Pre-select bean in form by matching option text
        const sel = document.querySelector('select[name="bean"]');
        if (sel) {
          const target = name.split('·')[0].trim().toLowerCase();
          for (const opt of sel.options) {
            if (opt.text.toLowerCase().includes(target)) { sel.value = opt.value || opt.text; break; }
          }
        }
        toast(`Starting a brew · ${name.split('·')[0].trim()}`);
        showScreen('add');
      }
    });
  });

  // Beans: + New
  const newBeanBtn = document.querySelector('.screen[data-screen="beans"] .head-add');
  newBeanBtn?.addEventListener('click', () => {
    openModal({
      title: 'Add a new bean',
      body: `
        <label class="modal-label">Origin / name</label>
        <input class="modal-input" id="newBeanName" placeholder="e.g. Costa Rica Tarrazu" />
        <label class="modal-label">Roaster</label>
        <input class="modal-input" id="newBeanRoaster" placeholder="e.g. Pearl Coffee" />
        <label class="modal-label">Roast level</label>
        <select class="modal-input" id="newBeanRoast">
          <option>light</option><option selected>medium</option><option>medium-dark</option><option>dark</option>
        </select>`,
      primary: 'Add bean',
      onPrimary: () => {
        const n = document.getElementById('newBeanName')?.value?.trim() || 'New bean';
        closeModal();
        toast(`Added · ${n}`);
      }
    });
  });

  // Stats: time-range filter — update metrics + charts
  const statRanges = {
    'Last 7 days':  { brews: 17, avg: 8.1, coffee: '258 g', cost: '$28.40', methods: [62, 18, 12, 8],
                     scores: [7.4, 7.8, 8.0, 7.2, 8.2, 8.4, 8.0, 7.6, 8.5, 8.8, 8.1, 7.9, 8.5, 8.0] },
    'Last 30 days': { brews: 64, avg: 8.0, coffee: '982 g', cost: '$108.20', methods: [55, 22, 14, 9],
                     scores: [7.2, 7.5, 7.8, 8.1, 7.6, 8.0, 8.2, 7.9, 8.4, 8.0, 7.7, 8.3, 8.6, 8.1, 7.8, 8.2, 8.0, 8.5, 8.4, 7.9] },
    'This year':    { brews: 412, avg: 7.9, coffee: '6.3 kg', cost: '$704.50', methods: [48, 26, 16, 10],
                     scores: [7.0, 7.2, 7.5, 7.4, 7.8, 7.6, 8.0, 7.7, 8.2, 8.0, 7.9, 8.1, 8.3, 8.0, 7.8, 8.2, 8.4, 8.1, 7.9, 8.0, 8.2, 8.5, 8.0, 7.8] },
  };
  const tiles = document.querySelectorAll('.stat-tiles .st .st-val');
  function applyRange(label) {
    const data = statRanges[label]; if (!data || tiles.length < 4) return;
    tiles[0].textContent = data.brews;
    tiles[1].textContent = data.avg.toFixed(1);
    tiles[2].textContent = data.coffee;
    tiles[3].textContent = data.cost;
    const bars = document.querySelectorAll('.method-bars li');
    if (bars.length >= 4) {
      data.methods.forEach((pct, i) => {
        const fill = bars[i].querySelector('.mb-bar i');
        const val = bars[i].querySelector('.mb-val');
        if (fill) fill.style.width = pct + '%';
        if (val) val.textContent = pct + '%';
      });
    }
    drawTrend(data.scores);
    // Subtle "applied" pulse so user has feedback
    document.querySelector('.stat-tiles')?.classList.remove('flash');
    void document.querySelector('.stat-tiles')?.offsetWidth;
    document.querySelector('.stat-tiles')?.classList.add('flash');
  }
  const rangeSel = document.querySelector('.screen[data-screen="stats"] select.head-skip');
  rangeSel?.addEventListener('change', () => applyRange(rangeSel.value));

  // Trend chart (interactive)
  const trendSvg = document.getElementById('trendChart');
  function drawTrend(scores) {
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
      g += `<circle class="trend-dot" data-idx="${i}" data-val="${v}" cx="${xS(i)}" cy="${yS(v)}" r="6" fill="#5C3A22" stroke="white" stroke-width="1.5" tabindex="0" role="button" aria-label="Brew ${i + 1}: score ${v}" style="cursor:pointer"/>`;
    });
    trendSvg.innerHTML = g;
    trendSvg.querySelectorAll('.trend-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        const v = dot.getAttribute('data-val');
        const i = parseInt(dot.getAttribute('data-idx'), 10) + 1;
        toast(`Brew #${i} · score ${v}`);
        trendSvg.querySelectorAll('.trend-dot').forEach((d) => d.setAttribute('fill', '#5C3A22'));
        dot.setAttribute('fill', '#C19A4B');
      });
    });
  }
  drawTrend([7.4, 7.8, 8.0, 7.2, 8.2, 8.4, 8.0, 7.6, 8.5, 8.8, 8.1, 7.9, 8.5, 8.0]);

  // Method mix bars: clickable
  document.querySelectorAll('.method-bars li').forEach((li) => {
    li.setAttribute('role', 'button');
    li.setAttribute('tabindex', '0');
    li.style.cursor = 'pointer';
    const fire = () => {
      const name = li.querySelector('.mb-name')?.textContent?.trim() || 'method';
      const pct = li.querySelector('.mb-val')?.textContent?.trim() || '';
      document.querySelectorAll('.method-bars li').forEach((x) => x.classList.remove('selected'));
      li.classList.add('selected');
      toast(`${name} · ${pct} of brews`);
    };
    li.addEventListener('click', fire);
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); } });
  });
})();

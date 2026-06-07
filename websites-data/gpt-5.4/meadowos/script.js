window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const top = doc.scrollTop || document.body.scrollTop;
  const h = doc.scrollHeight - doc.clientHeight;
  const pct = h > 0 ? (top / h) * 100 : 0;
  const sb = document.getElementById("scrollbar");
  if (sb) sb.style.width = pct + "%";
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if (!href || href === "#") { e.preventDefault(); return; }
    const id = href.slice(1);
    const t = document.getElementById(id);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#" + id);
    }
  });
});

// Footer "coming soon" links: prevent navigation
document.querySelectorAll('.foot a.coming-soon').forEach(a => {
  a.addEventListener("click", e => { e.preventDefault(); });
});

// Modal handling
const modal = document.getElementById("dlModal");
const bar = document.getElementById("progressBar");
const txt = document.getElementById("progressText");
const dlBtn = document.getElementById("dlBtn");
const dlStatus = document.getElementById("dlStatus");
let progressTimer = null;
let lastTrigger = null;

function openModal() {
  if (!modal) return;
  lastTrigger = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  bar.style.width = "0%";
  txt.textContent = "0%";
  if (progressTimer) clearInterval(progressTimer);
  let p = 0;
  progressTimer = setInterval(() => {
    p += Math.random() * 8 + 2;
    if (p >= 100) {
      p = 100;
      clearInterval(progressTimer);
      progressTimer = null;
      txt.textContent = "Done. SHA256 matches.";
    } else {
      txt.textContent = Math.floor(p) + "%";
    }
    bar.style.width = p + "%";
  }, 90);
  // focus the close button so Esc/Enter work intuitively
  const cm = document.getElementById("closeModal");
  if (cm) setTimeout(() => cm.focus(), 30);
}

function closeModal() {
  if (!modal) return;
  if (progressTimer) { clearInterval(progressTimer); progressTimer = null; }
  modal.hidden = true;
  modal.setAttribute("hidden", "");
  document.body.classList.remove("modal-open");
  // post-close confirmation in the download section
  if (dlStatus) {
    dlStatus.hidden = false;
    dlStatus.textContent = "Download ready · meadowos-0.7.iso saved. SHA256 verified. You can continue scrolling.";
  }
  if (dlBtn) {
    dlBtn.textContent = "Download again · meadowos-0.7.iso · 1.2 GB";
  }
  if (lastTrigger && typeof lastTrigger.focus === "function") {
    try { lastTrigger.focus(); } catch (_) {}
  }
}

if (dlBtn) dlBtn.addEventListener("click", openModal);

["closeModal", "closeModalX"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); closeModal(); });
  }
});

if (modal) {
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal && !modal.hidden) closeModal();
});

// Active nav state + chapter indicator
const navLinks = Array.from(document.querySelectorAll('.top nav a[href^="#"]'));
const sectionMap = navLinks
  .map(a => {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    return el ? { link: a, el, id } : null;
  })
  .filter(Boolean);

const chapterIndicator = document.getElementById("chapterIndicator");
const chapterTitles = [
  { id: "story", label: "Story" },
  { id: "garden", label: "Garden" },
  { id: "docs", label: "Docs" },
  { id: "download", label: "Download" },
];

function updateActiveSection() {
  if (!sectionMap.length) return;
  const probe = window.innerHeight * 0.3 + 80;
  let current = null;
  for (const s of sectionMap) {
    const r = s.el.getBoundingClientRect();
    if (r.top <= probe) current = s;
  }
  navLinks.forEach(a => a.classList.remove("is-active"));
  if (current) {
    current.link.classList.add("is-active");
    if (chapterIndicator) {
      const match = chapterTitles.find(c => c.id === current.id);
      if (match) {
        chapterIndicator.innerHTML = "<span>" + match.label + "</span>";
        chapterIndicator.classList.add("visible");
      }
    }
  } else if (chapterIndicator) {
    chapterIndicator.classList.remove("visible");
  }
}
window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("resize", updateActiveSection);
updateActiveSection();

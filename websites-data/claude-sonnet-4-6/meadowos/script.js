window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const top = doc.scrollTop || document.body.scrollTop;
  const h = doc.scrollHeight - doc.clientHeight;
  const pct = h > 0 ? (top / h) * 100 : 0;
  document.getElementById("scrollbar").style.width = pct + "%";
});

const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primary-nav");
if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const open = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href").slice(1);
    if (!id) return;
    const t = document.getElementById(id);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({behavior:"smooth"});
      if (primaryNav && primaryNav.classList.contains("is-open")) {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation menu");
      }
    }
  });
});

const modal = document.getElementById("dlModal");
const bar = document.getElementById("progressBar");
const txt = document.getElementById("progressText");
const track = document.getElementById("progressTrack");
const dlBtn = document.getElementById("dlBtn");
const closeBtn = document.getElementById("closeModal");
const dlStatus = document.getElementById("dlStatus");
let lastFocus = null;
let dlTimer = null;
let dlComplete = false;

function focusableInModal() {
  return modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
}

function openModal() {
  lastFocus = document.activeElement;
  modal.hidden = false;
  bar.style.width = "0%";
  txt.textContent = "0%";
  if (track) track.setAttribute("aria-valuenow", "0");
  dlComplete = false;
  let p = 0;
  if (dlTimer) clearInterval(dlTimer);
  dlTimer = setInterval(() => {
    p += Math.random() * 8 + 2;
    if (p >= 100) {
      p = 100;
      clearInterval(dlTimer);
      dlTimer = null;
      txt.textContent = "Done. SHA256 matches.";
      dlComplete = true;
    } else {
      txt.textContent = Math.floor(p) + "%";
    }
    bar.style.width = p + "%";
    if (track) track.setAttribute("aria-valuenow", String(Math.floor(p)));
  }, 90);
  setTimeout(() => closeBtn && closeBtn.focus(), 0);
}

function closeModal() {
  modal.hidden = true;
  if (dlTimer) { clearInterval(dlTimer); dlTimer = null; }
  if (dlComplete && dlStatus && dlBtn) {
    dlStatus.hidden = false;
    dlBtn.classList.add("is-done");
    dlBtn.textContent = "Downloaded · meadowos-0.7.iso · 1.2 GB";
  }
  if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
}

if (dlBtn) dlBtn.addEventListener("click", openModal);
if (closeBtn) closeBtn.addEventListener("click", closeModal);
if (modal) modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

document.addEventListener("keydown", e => {
  if (modal && !modal.hidden) {
    if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
    if (e.key === "Tab") {
      const items = focusableInModal();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
});

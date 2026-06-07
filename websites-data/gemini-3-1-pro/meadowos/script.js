window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const top = doc.scrollTop || document.body.scrollTop;
  const h = doc.scrollHeight - doc.clientHeight;
  const pct = h > 0 ? (top / h) * 100 : 0;
  document.getElementById("scrollbar").style.width = pct + "%";
});

const navEl = document.getElementById("primaryNav");
const navToggle = document.getElementById("navToggle");

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    const id = href.slice(1);
    if(!id){ return; }
    const t = document.getElementById(id);
    if(t){
      e.preventDefault();
      t.scrollIntoView({behavior:"smooth"});
      if(navEl && navEl.classList.contains("open")){
        navEl.classList.remove("open");
        navToggle && navToggle.setAttribute("aria-expanded","false");
      }
    }
  });
});

if(navToggle && navEl){
  navToggle.addEventListener("click", () => {
    const open = navEl.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

const navLinks = navEl ? Array.from(navEl.querySelectorAll('a[href^="#"]')) : [];
const sectionMap = new Map();
navLinks.forEach(link => {
  const id = link.getAttribute("href").slice(1);
  const sec = id ? document.getElementById(id) : null;
  if(sec){ sectionMap.set(sec, link); }
});
if("IntersectionObserver" in window && sectionMap.size){
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = sectionMap.get(entry.target);
      if(!link) return;
      if(entry.isIntersecting){
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, {rootMargin:"-40% 0px -55% 0px", threshold:0});
  sectionMap.forEach((_, sec) => io.observe(sec));
}

document.querySelectorAll('a.foot-link[data-coming-soon]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const existing = document.querySelector(".coming-soon-tip");
    if(existing) existing.remove();
    const tip = document.createElement("div");
    tip.className = "coming-soon-tip";
    tip.textContent = "Coming soon";
    document.body.appendChild(tip);
    const r = link.getBoundingClientRect();
    tip.style.left = (r.left + r.width/2) + "px";
    tip.style.top = (r.top) + "px";
    setTimeout(() => tip.remove(), 1600);
  });
});

const modal = document.getElementById("dlModal");
const bar = document.getElementById("progressBar");
const txt = document.getElementById("progressText");

document.getElementById("dlBtn").addEventListener("click", () => {
  modal.hidden = false;
  bar.style.width = "0%";
  txt.textContent = "0%";
  let p = 0;
  const t = setInterval(() => {
    p += Math.random() * 8 + 2;
    if(p >= 100){ p = 100; clearInterval(t); txt.textContent = "Done. SHA256 matches."; }
    else txt.textContent = Math.floor(p) + "%";
    bar.style.width = p + "%";
  }, 90);
});
document.getElementById("closeModal").addEventListener("click", () => { modal.hidden = true; });
modal.addEventListener("click", e => { if(e.target === modal) modal.hidden = true; });

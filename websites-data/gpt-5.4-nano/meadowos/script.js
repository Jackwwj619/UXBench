window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const top = doc.scrollTop || document.body.scrollTop;
  const h = doc.scrollHeight - doc.clientHeight;
  const pct = h > 0 ? (top / h) * 100 : 0;
  document.getElementById("scrollbar").style.width = pct + "%";
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if(!href || href === "#") return;
    const id = href.slice(1);
    const t = document.getElementById(id);
    if(t){
      e.preventDefault();
      t.scrollIntoView({behavior:"smooth", block:"start"});
      if(history.replaceState){
        history.replaceState(null, "", "#" + id);
      } else {
        location.hash = id;
      }
      t.classList.remove("anchor-flash");
      void t.offsetWidth;
      t.classList.add("anchor-flash");
      setTimeout(() => t.classList.remove("anchor-flash"), 1300);
    }
  });
});

const modal = document.getElementById("dlModal");
const bar = document.getElementById("progressBar");
const txt = document.getElementById("progressText");
let activeTimer = null;
let lastFocused = null;

function openModal(){
  lastFocused = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  bar.style.width = "0%";
  txt.textContent = "0%";
  if(activeTimer){ clearInterval(activeTimer); activeTimer = null; }
  let p = 0;
  activeTimer = setInterval(() => {
    p += Math.random() * 8 + 2;
    if(p >= 100){
      p = 100;
      clearInterval(activeTimer);
      activeTimer = null;
      txt.textContent = "Done. SHA256 matches.";
    } else {
      txt.textContent = Math.floor(p) + "%";
    }
    bar.style.width = p + "%";
  }, 90);
  const close = document.getElementById("closeModal");
  if(close) setTimeout(() => close.focus(), 30);
}

function closeModal(){
  modal.hidden = true;
  document.body.style.overflow = "";
  if(activeTimer){ clearInterval(activeTimer); activeTimer = null; }
  if(lastFocused && typeof lastFocused.focus === "function"){
    try { lastFocused.focus(); } catch(_){}
  }
}

document.getElementById("dlBtn").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);
const xBtn = document.getElementById("closeModalX");
if(xBtn) xBtn.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", e => {
  if(e.key === "Escape" && !modal.hidden) closeModal();
});

const app = document.getElementById('app');

// ===== MOCK DATA =====
const MOCK_DATA = {
  code: [
    { title: 'octocat/hello-world/src/index.js', desc: 'console.log("Hello, World!");', lang: 'JavaScript', updated: '3 days ago', size: '1.2 KB', lines: 5 },
    { title: 'github/docs/content/pages/404.md', desc: 'Custom 404 page template for GitHub Pages sites', lang: 'Markdown', updated: '1 week ago', size: '3.4 KB', lines: 42 },
    { title: 'vercel/next.js/pages/404.tsx', desc: 'export default function Custom404() { return <h1>404</h1> }', lang: 'TypeScript', updated: '2 weeks ago', size: '0.8 KB', lines: 12 },
    { title: 'facebook/react/fixtures/error-boundary.js', desc: 'Error boundary component for handling render errors gracefully', lang: 'JavaScript', updated: '1 month ago', size: '5.1 KB', lines: 89 },
    { title: 'angular/angular/src/common/errors.ts', desc: 'Common error codes and messages for Angular framework', lang: 'TypeScript', updated: '5 days ago', size: '12.3 KB', lines: 210 },
    { title: 'vuejs/core/packages/runtime-core/src/errorHandler.ts', desc: 'Global error handler for Vue.js applications', lang: 'TypeScript', updated: '2 days ago', size: '4.7 KB', lines: 78 },
    { title: 'sveltejs/svelte/src/compiler/errors.ts', desc: 'Compiler error messages and codes for Svelte framework', lang: 'TypeScript', updated: '1 week ago', size: '8.2 KB', lines: 156 },
    { title: 'nodejs/node/lib/errors.js', desc: 'Node.js internal error codes and utility functions', lang: 'JavaScript', updated: '3 weeks ago', size: '22.1 KB', lines: 412 },
    { title: 'denoland/deno/runtime/js/01_errors.js', desc: 'Deno runtime error types and formatting', lang: 'JavaScript', updated: '4 days ago', size: '6.5 KB', lines: 98 },
    { title: 'microsoft/TypeScript/src/compiler/diagnosticMessages.ts', desc: 'TypeScript compiler diagnostic error messages', lang: 'TypeScript', updated: '6 days ago', size: '145 KB', lines: 3200 },
  ],
  repositories: [
    { title: 'github/pages-gem', desc: 'A simple Ruby Gem to bootstrap dependencies for setting up and maintaining a local Jekyll environment', stars: '1.8k', lang: 'Ruby', forks: '342', issues: '28', license: 'MIT' },
    { title: 'isaacs/github', desc: 'Just a place to track issues and feature requests for GitHub', stars: '2.9k', lang: '', forks: '120', issues: '156', license: '' },
    { title: 'octocat/Spoon-Knife', desc: 'This repo is for demonstration purposes. Fork it and make changes.', stars: '12k', lang: 'HTML', forks: '158k', issues: '0', license: '' },
    { title: 'github/gitignore', desc: 'A collection of useful .gitignore templates', stars: '158k', lang: '', forks: '0', issues: '412', license: 'CC0-1.0' },
    { title: 'tiangolo/fastapi', desc: 'FastAPI framework, high performance, easy to learn, fast to code, ready for production', stars: '78k', lang: 'Python', forks: '6.8k', issues: '1.2k', license: 'MIT' },
    { title: 'torvalds/linux', desc: 'Linux kernel source tree', stars: '180k', lang: 'C', forks: '54k', issues: '0', license: 'GPL-2.0' },
    { title: 'sveltejs/svelte', desc: 'Cybernetically enhanced web apps', stars: '80k', lang: 'TypeScript', forks: '4.2k', issues: '890', license: 'MIT' },
    { title: 'vercel/next.js', desc: 'The React Framework for the Web', stars: '125k', lang: 'JavaScript', forks: '26k', issues: '2.8k', license: 'MIT' },
  ],
  people: [
    { title: 'octocat', desc: 'GitHub mascot. San Francisco, CA. Joined 2011.', followers: '9.2k', repos: '8', company: '@github', location: 'San Francisco', bio: 'How people build software.' },
    { title: 'defunkt', desc: 'Co-founder of GitHub. Enjoying life.', followers: '21k', repos: '107', company: '', location: 'San Francisco', bio: 'just some person' },
    { title: 'mojombo', desc: 'CEO of GitHub (formerly). Hacker, entrepreneur.', followers: '23k', repos: '62', company: 'Churn Labs', location: 'San Francisco', bio: 'Founder of GitHub, CEO of Churn Labs' },
    { title: 'pjhyett', desc: 'Co-founder of GitHub.', followers: '8.3k', repos: '32', company: '@github', location: 'San Francisco', bio: '' },
    { title: 'tj', desc: 'Creator of Express.js and many Node.js tools.', followers: '15k', repos: '200+', company: '', location: 'Victoria, BC', bio: 'open source' },
    { title: 'gaearon', desc: 'React core team. Author of Redux.', followers: '42k', repos: '89', company: '@facebook', location: 'London, UK', bio: 'Working on React at Facebook' },
    { title: 'yyx990803', desc: 'Creator of Vue.js. Full-time open source.', followers: '35k', repos: '56', company: '', location: 'Shanghai', bio: 'Creator of Vue.js' },
    { title: 'sindresorhus', desc: 'Full-time open sourcerer. Maker of things.', followers: '28k', repos: '1200+', company: '', location: 'Norway', bio: 'Full-time open-sourcerer & adventurer' },
  ]
};

const FAQ_ITEMS = [
  { q: 'How do I reset my password?', a: 'Go to github.com/password_reset and enter the email address associated with your account. You\'ll receive a link to create a new password.' },
  { q: 'How do I enable two-factor authentication?', a: 'Navigate to Settings > Password and security > Two-factor authentication. You can use a TOTP app or SMS.' },
  { q: 'Why am I getting a 404 error on GitHub Pages?', a: 'Common causes: repository not named correctly (must be <username>.github.io), missing index.html, DNS not configured, or the site hasn\'t finished building yet.' },
  { q: 'How do I set up a custom domain for GitHub Pages?', a: 'Add a CNAME file to your repo root, configure DNS records with your provider, then enable the custom domain in repo Settings > Pages.' },
  { q: 'How do I create a repository?', a: 'Click the "+" icon in the top-right corner of any GitHub page, then select "New repository". Choose a name, visibility, and optional README.' },
  { q: 'What are GitHub Actions?', a: 'GitHub Actions is a CI/CD platform that lets you automate your build, test, and deployment workflows directly in your repository.' },
];

const STATUS_DATA = [
  { name: 'Git Operations', status: 'operational', uptime: '99.99%' },
  { name: 'API Requests', status: 'operational', uptime: '99.98%' },
  { name: 'Webhooks', status: 'operational', uptime: '99.95%' },
  { name: 'GitHub Pages', status: 'operational', uptime: '99.92%' },
  { name: 'GitHub Actions', status: 'operational', uptime: '99.97%' },
  { name: 'GitHub Packages', status: 'operational', uptime: '99.99%' },
  { name: 'Codespaces', status: 'degraded', uptime: '99.81%' },
  { name: 'Copilot', status: 'operational', uptime: '99.96%' },
  { name: 'Container Registry', status: 'operational', uptime: '99.99%' },
  { name: 'Secret Scanning', status: 'operational', uptime: '99.98%' },
];

const INCIDENTS = [
  {
    title: 'Degraded performance for Codespaces',
    time: 'May 11, 2026 - 14:32 UTC',
    status: 'investigating',
    updates: [
      { time: '14:32 UTC', text: 'We are investigating reports of slower startup times for Codespaces.' },
      { time: '15:10 UTC', text: 'The root cause has been identified as a capacity issue in our East US region. We are scaling up resources.' },
    ]
  },
  {
    title: 'GitHub Pages build delays',
    time: 'May 10, 2026 - 09:15 UTC',
    status: 'resolved',
    updates: [
      { time: '09:15 UTC', text: 'GitHub Pages builds are experiencing delays of up to 15 minutes.' },
      { time: '10:02 UTC', text: 'The issue has been identified as a backlog in our build queue. We are processing pending builds.' },
      { time: '10:45 UTC', text: 'All pending builds have been processed. Build times have returned to normal.' },
    ]
  },
  {
    title: 'Intermittent API errors',
    time: 'May 8, 2026 - 22:00 UTC',
    status: 'resolved',
    updates: [
      { time: '22:00 UTC', text: 'A subset of API requests are returning 500 errors.' },
      { time: '22:15 UTC', text: 'Root cause identified: database connection pool exhaustion under increased load.' },
      { time: '22:45 UTC', text: 'Connection pool has been scaled and API error rates have returned to normal.' },
    ]
  },
  {
    title: 'Webhook delivery delays',
    time: 'May 5, 2026 - 16:20 UTC',
    status: 'resolved',
    updates: [
      { time: '16:20 UTC', text: 'Webhook deliveries are experiencing delays of up to 30 minutes.' },
      { time: '17:00 UTC', text: 'The delivery backlog has been cleared and webhooks are being delivered in real-time again.' },
    ]
  },
];

let currentPage = '404';
let searchQuery = '';
let searchType = 'code';
let parallaxHandler = null;
let currentResults = [];

// ===== ROUTER =====
function navigate(page, opts = {}) {
  currentPage = page;
  if (opts.query !== undefined) searchQuery = opts.query;
  if (opts.type !== undefined) searchType = opts.type;
  render();
  updateNav();
  updateHash(opts);
  document.title = pageTitle(page);
  window.scrollTo(0, 0);
}

function pageTitle(page) {
  switch (page) {
    case 'search': return 'Search · GitHub';
    case 'support': return 'Support · GitHub';
    case 'status': return 'System Status · GitHub';
    default: return 'Page not found · GitHub';
  }
}

function updateHash(opts) {
  let hash = '#' + (currentPage === '404' ? '404' : currentPage);
  if (currentPage === 'search') {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (searchType) params.set('type', searchType);
    const qs = params.toString();
    if (qs) hash += '?' + qs;
  }
  if (typeof history !== 'undefined' && history.replaceState) {
    try { history.replaceState(null, '', hash); } catch (e) { /* ignore */ }
  }
}

function updateNav() {
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.classList.contains('nav-link')) {
      link.classList.toggle('active', link.dataset.page === currentPage);
    }
  });
}

function render() {
  cleanup();
  switch (currentPage) {
    case '404': render404(); break;
    case 'search': renderSearch(); break;
    case 'support': renderSupport(); break;
    case 'status': renderStatus(); break;
  }
  bindNavLinks();
}

function cleanup() {
  if (parallaxHandler) {
    document.removeEventListener('mousemove', parallaxHandler);
    parallaxHandler = null;
  }
}

// ===== MODAL SYSTEM =====
function showModal(content) {
  const existing = document.getElementById('modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'modal-overlay';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-container">
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="modal-body">${content}</div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });
  requestAnimationFrame(() => overlay.classList.add('visible'));
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('visible');
    setTimeout(() => overlay.remove(), 200);
  }
}

function showCodeModal(item) {
  showModal(`
    <div class="code-modal">
      <div class="code-modal-header">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e"><path d="M4.72 3.22a.75.75 0 0 1 1.06 1.06L2.06 8l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25Zm6.56 0a.75.75 0 1 0-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06l4.25-4.25a.75.75 0 0 0 0-1.06l-4.25-4.25Z"/></svg>
        <span class="code-modal-path">${escHtml(item.title)}</span>
        <span class="code-modal-meta">${item.size} &middot; ${item.lines} lines</span>
      </div>
      <div class="code-modal-body">
        <pre><code>${escHtml(item.desc)}</code></pre>
      </div>
      <div class="code-modal-footer">
        <span class="result-tag">${item.lang}</span>
        <span>Last updated ${item.updated}</span>
      </div>
    </div>
  `);
}

function showRepoModal(item) {
  showModal(`
    <div class="repo-modal">
      <h2 class="repo-modal-title">${escHtml(item.title)}</h2>
      <p class="repo-modal-desc">${escHtml(item.desc)}</p>
      <div class="repo-modal-stats">
        <div class="repo-stat"><span class="repo-stat-icon">&#9733;</span> ${item.stars} stars</div>
        <div class="repo-stat"><svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 0-1.5 0v.878H6.75v-.878a2.25 2.25 0 1 0-1.5 0ZM8 1.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM3.75 6.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm8.5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM8 13.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm0-4.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"/></svg> ${item.forks} forks</div>
        <div class="repo-stat"><svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"/></svg> ${item.issues} issues</div>
        ${item.license ? `<div class="repo-stat"><svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e"><path d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z"/></svg> ${item.license}</div>` : ''}
      </div>
      <div class="repo-modal-files">
        <div class="repo-file"><svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg> README.md</div>
        <div class="repo-file"><svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg> package.json</div>
        <div class="repo-file"><svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e"><path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z"/></svg> src/</div>
        <div class="repo-file"><svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg> .gitignore</div>
      </div>
    </div>
  `);
}

function showPersonModal(item) {
  showModal(`
    <div class="person-modal">
      <div class="person-modal-header">
        <div class="person-modal-avatar">@</div>
        <div>
          <h2 class="person-modal-name">${escHtml(item.title)}</h2>
          ${item.company ? `<p class="person-modal-detail"><svg width="14" height="14" viewBox="0 0 16 16" fill="#8b949e"><path d="M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75C0 1.784.784 1 1.75 1ZM1.5 2.75v10.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z"/></svg> ${escHtml(item.company)}</p>` : ''}
          ${item.location ? `<p class="person-modal-detail"><svg width="14" height="14" viewBox="0 0 16 16" fill="#8b949e"><path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192 0ZM8 1a5 5 0 0 0-3.536 8.535l3.536 3.536 3.535-3.536A5 5 0 0 0 8 1Zm0 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/></svg> ${escHtml(item.location)}</p>` : ''}
        </div>
      </div>
      ${item.bio ? `<p class="person-modal-bio">${escHtml(item.bio)}</p>` : ''}
      <p class="person-modal-desc">${escHtml(item.desc)}</p>
      <div class="person-modal-stats">
        <div class="person-stat"><strong>${item.followers}</strong> followers</div>
        <div class="person-stat"><strong>${item.repos}</strong> repositories</div>
      </div>
      <div class="person-modal-actions">
        <button class="btn-follow" onclick="this.textContent='Following';this.classList.add('following');this.disabled=true">Follow</button>
      </div>
    </div>
  `);
}

function showStatusDetailModal(item) {
  const relatedIncidents = INCIDENTS.filter(inc =>
    inc.title.toLowerCase().includes(item.name.toLowerCase().split(' ')[0].toLowerCase()) ||
    inc.updates.some(u => u.text.toLowerCase().includes(item.name.toLowerCase().split(' ')[0].toLowerCase()))
  );
  showModal(`
    <div class="status-detail-modal">
      <div class="status-detail-header">
        <span class="status-dot ${item.status === 'operational' ? 'green' : 'yellow'}" style="width:12px;height:12px"></span>
        <h2>${item.name}</h2>
        <span class="status-detail-badge ${item.status}">${item.status === 'operational' ? 'Operational' : 'Degraded'}</span>
      </div>
      <div class="status-detail-stats">
        <div class="status-stat"><strong>Uptime (90 days)</strong><span>${item.uptime}</span></div>
        <div class="status-stat"><strong>Response time</strong><span>${item.status === 'operational' ? '< 200ms' : '~800ms'}</span></div>
      </div>
      ${relatedIncidents.length ? `
        <h3 class="status-detail-subtitle">Related incidents</h3>
        ${relatedIncidents.map(inc => `
          <div class="status-detail-incident">
            <div class="incident-title">${inc.title}</div>
            <div class="incident-time">${inc.time}</div>
            <span class="incident-status-tag ${inc.status}">${inc.status === 'resolved' ? 'Resolved' : 'Investigating'}</span>
          </div>
        `).join('')}
      ` : '<p class="status-detail-no-incidents">No incidents reported in the past 90 days.</p>'}
    </div>
  `);
}

// ===== 404 PAGE =====
function render404() {
  app.innerHTML = `
    <div class="page-404">
      <div class="parallax-bg">
        <div class="parallax-layer" data-depth="0.1">
          <canvas class="stars-canvas" id="starsCanvas"></canvas>
        </div>
        <div class="parallax-layer nebula-layer" data-depth="0.3"></div>
      </div>
      <svg class="astronaut-svg" viewBox="0 0 200 300">
        <ellipse cx="100" cy="80" rx="45" ry="55" fill="#e8e8e8" stroke="#bbb" stroke-width="2"/>
        <rect x="55" y="58" width="90" height="42" rx="8" fill="#333" opacity="0.85"/>
        <rect x="60" y="62" width="80" height="34" rx="5" fill="#1a1a2e" opacity="0.9"/>
        <rect x="65" y="67" width="70" height="24" rx="3" fill="#a8d8ff" opacity="0.4"/>
        <ellipse cx="100" cy="170" rx="50" ry="65" fill="#e8e8e8" stroke="#bbb" stroke-width="2"/>
        <rect x="55" y="138" width="90" height="18" rx="9" fill="#ddd"/>
        <ellipse cx="100" cy="105" rx="50" ry="8" fill="#ccc" opacity="0.3"/>
        <circle cx="72" cy="248" r="18" fill="#e8e8e8" stroke="#bbb" stroke-width="2"/>
        <circle cx="128" cy="248" r="18" fill="#e8e8e8" stroke="#bbb" stroke-width="2"/>
        <ellipse cx="48" cy="158" rx="11" ry="38" fill="#e8e8e8" stroke="#bbb" stroke-width="2" transform="rotate(-12 48 158)"/>
        <ellipse cx="152" cy="158" rx="11" ry="38" fill="#e8e8e8" stroke="#bbb" stroke-width="2" transform="rotate(12 152 158)"/>
        <circle cx="140" cy="130" r="5" fill="none" stroke="#bbb" stroke-width="1.5"/>
        <line x1="140" y1="135" x2="140" y2="155" stroke="#bbb" stroke-width="1.5"/>
      </svg>
      <div class="content-404">
        <h1 class="title-404">404</h1>
        <p class="subtitle-404">"This is not the web page you are looking for"</p>
        <div class="search-box-404">
          <input type="text" placeholder="Search GitHub" id="search404Input" aria-label="Search GitHub">
          <button id="search404Btn">Search</button>
        </div>
        <div class="filter-tabs">
          <button class="filter-tab active" data-type="code">Code</button>
          <button class="filter-tab" data-type="repositories">Repositories</button>
          <button class="filter-tab" data-type="people">People</button>
        </div>
        <div class="help-links-404">
          <p>If you think something is broken, <a href="#" data-page="support">contact support</a>.</p>
          <p>Check <a href="#" data-page="status">GitHub Status</a> for known issues.</p>
        </div>
      </div>
    </div>
  `;
  initStars();
  initParallax();
  bind404Events();
}

function bind404Events() {
  const input = document.getElementById('search404Input');
  const btn = document.getElementById('search404Btn');
  const tabs = document.querySelectorAll('.filter-tab');
  let selectedType = 'code';

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedType = tab.dataset.type;
      const q = input.value.trim();
      navigate('search', { query: q, type: selectedType });
    });
  });

  function doSearch() {
    navigate('search', { query: input.value.trim(), type: selectedType });
  }

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  input.focus();
}

function initStars() {
  const canvas = document.getElementById('starsCanvas');
  if (!canvas) return;
  canvas.width = window.innerWidth * 1.2;
  canvas.height = window.innerHeight * 1.2;
  const ctx = canvas.getContext('2d');
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 1.5 + 0.3;
    const opacity = Math.random() * 0.7 + 0.3;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${opacity})`;
    ctx.fill();
  }
}

function initParallax() {
  const layers = document.querySelectorAll('.parallax-layer');
  parallaxHandler = e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const mx = (e.clientX - cx) / cx;
    const my = (e.clientY - cy) / cy;
    layers.forEach(layer => {
      const d = parseFloat(layer.dataset.depth) || 0;
      layer.style.transform = `translate(${mx * d * 30}px, ${my * d * 20}px)`;
    });
  };
  document.addEventListener('mousemove', parallaxHandler);
}

// ===== SEARCH PAGE =====
function renderSearch() {
  currentResults = searchQuery ? getResults(searchQuery, searchType) : MOCK_DATA[searchType];
  const count = currentResults.length;
  const typeLabel = searchType === 'code' ? 'Code' : searchType === 'repositories' ? 'Repositories' : 'People';
  app.innerHTML = `
    <div class="page-search">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#404" data-page="404">404</a>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Search${searchQuery ? ' · ' + escHtml(searchQuery) : ''}</span>
      </nav>
      <div class="search-header">
        <h1 class="page-heading">Search GitHub</h1>
        <div class="search-bar-full">
          <input type="text" id="searchPageInput" value="${escHtml(searchQuery)}" placeholder="Search GitHub" aria-label="Search GitHub">
          <button id="searchPageBtn">Search</button>
        </div>
        <div class="search-tabs" role="tablist">
          <button class="search-tab ${searchType === 'code' ? 'active' : ''}" data-type="code" role="tab" aria-selected="${searchType === 'code'}">Code</button>
          <button class="search-tab ${searchType === 'repositories' ? 'active' : ''}" data-type="repositories" role="tab" aria-selected="${searchType === 'repositories'}">Repositories</button>
          <button class="search-tab ${searchType === 'people' ? 'active' : ''}" data-type="people" role="tab" aria-selected="${searchType === 'people'}">People</button>
        </div>
      </div>
      ${searchQuery ? `<p class="search-count" aria-live="polite">${count} ${typeLabel.toLowerCase()} result${count !== 1 ? 's' : ''} for <strong>${escHtml(searchQuery)}</strong></p>` : ''}
      <div class="search-results">
        ${renderResults(currentResults, searchType)}
      </div>
    </div>
  `;
  bindSearchEvents();
}

function renderResults(results, type) {
  if (!results.length) {
    const typeLabel = type === 'code' ? 'code' : type === 'repositories' ? 'repositories' : 'people';
    return `
      <div class="search-empty" role="status">
        <h3>No ${typeLabel} found${searchQuery ? ' for "' + escHtml(searchQuery) + '"' : ''}</h3>
        <p>Try a different search term, switch tabs above, or pick one of these next steps.</p>
        <div class="search-empty-actions">
          <a href="#404" class="search-empty-btn primary" data-page="404">Back to home</a>
          <a href="#support" class="search-empty-btn" data-page="support">Contact support</a>
          <a href="#status" class="search-empty-btn" data-page="status">Check GitHub status</a>
        </div>
        <p class="search-hint">Popular searches: <a href="#" class="suggest-link">react</a>, <a href="#" class="suggest-link">python</a>, <a href="#" class="suggest-link">node</a>, <a href="#" class="suggest-link">404</a>, <a href="#" class="suggest-link">octocat</a></p>
      </div>`;
  }
  return results.map((r, i) => {
    if (type === 'code') {
      return `<div class="search-result-item clickable" data-index="${i}">
        <div class="result-title">${escHtml(r.title)}</div>
        <div class="result-desc"><code>${escHtml(r.desc)}</code></div>
        <div class="result-meta"><span class="result-tag">${r.lang}</span><span>${r.updated}</span></div>
      </div>`;
    } else if (type === 'repositories') {
      return `<div class="search-result-item clickable" data-index="${i}">
        <div class="result-title">${escHtml(r.title)}</div>
        <div class="result-desc">${escHtml(r.desc)}</div>
        <div class="result-meta"><span class="result-tag">${r.lang || 'Multi'}</span><span>&#9733; ${r.stars}</span></div>
      </div>`;
    } else {
      return `<div class="search-result-item person-card clickable" data-index="${i}">
        <div class="person-avatar">@</div>
        <div class="person-info">
          <div class="result-title">${escHtml(r.title)}</div>
          <div class="result-desc">${escHtml(r.desc)}</div>
          <div class="result-meta"><span>${r.followers} followers</span><span>${r.repos} repos</span></div>
        </div>
      </div>`;
    }
  }).join('');
}

function getResults(query, type) {
  const q = query.toLowerCase();
  return MOCK_DATA[type].filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.desc.toLowerCase().includes(q)
  );
}

function bindSearchEvents() {
  const input = document.getElementById('searchPageInput');
  const btn = document.getElementById('searchPageBtn');
  const tabs = document.querySelectorAll('.search-tab');

  function doSearch() {
    navigate('search', { query: input.value.trim() });
  }

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  input.focus();

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      searchType = tab.dataset.type;
      navigate('search', { type: searchType });
    });
  });

  document.querySelectorAll('.suggest-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigate('search', { query: link.textContent });
    });
  });

  document.querySelectorAll('.search-result-item.clickable').forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.index);
      const data = currentResults[idx];
      if (!data) return;
      if (searchType === 'code') showCodeModal(data);
      else if (searchType === 'repositories') showRepoModal(data);
      else if (searchType === 'people') showPersonModal(data);
    });
  });
}

// ===== SUPPORT PAGE =====
function renderSupport() {
  app.innerHTML = `
    <div class="page-support">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#404" data-page="404">404</a>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Support</span>
      </nav>
      <div class="support-header">
        <h1>GitHub Support</h1>
        <p>How can we help you today?</p>
      </div>

      <div class="support-grid">
        <div class="support-card" data-topic="account">
          <span class="card-icon">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="#58a6ff"><path d="M10.5 5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm.061 3.073a4 4 0 1 0-5.123 0 6.004 6.004 0 0 0-3.431 5.142.75.75 0 0 0 1.498.07 4.5 4.5 0 0 1 8.99 0 .75.75 0 1 0 1.498-.07 6.005 6.005 0 0 0-3.432-5.142Z"/></svg>
          </span>
          <h3>Account & Billing</h3>
          <p>Password resets, 2FA, billing questions, plan changes</p>
        </div>
        <div class="support-card" data-topic="pages">
          <span class="card-icon">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="#58a6ff"><path d="M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75C0 1.784.784 1 1.75 1Zm12.5 1.5H1.75a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25Z"/></svg>
          </span>
          <h3>GitHub Pages</h3>
          <p>404 errors, custom domains, build failures, DNS configuration</p>
        </div>
        <div class="support-card" data-topic="repos">
          <span class="card-icon">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="#58a6ff"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8.5ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/></svg>
          </span>
          <h3>Repositories</h3>
          <p>Access issues, branch protection, webhooks, actions</p>
        </div>
        <div class="support-card" data-topic="security">
          <span class="card-icon">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="#58a6ff"><path d="M7.467.133a1.748 1.748 0 0 1 1.066 0l5.25 1.68A1.75 1.75 0 0 1 15 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.7 1.7 0 0 1-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.748 1.748 0 0 1 1.217-1.667Zm.61 1.429a.25.25 0 0 0-.153 0l-5.25 1.68a.25.25 0 0 0-.174.238V7c0 1.358.275 2.666 1.057 3.86.784 1.194 2.121 2.34 4.366 3.297a.2.2 0 0 0 .154 0c2.245-.956 3.582-2.104 4.366-3.298C13.225 9.666 13.5 8.36 13.5 7V3.48a.25.25 0 0 0-.174-.237l-5.25-1.68Z"/></svg>
          </span>
          <h3>Security</h3>
          <p>Vulnerability reports, compromised accounts, security advisories</p>
        </div>
      </div>

      <div class="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-list" id="faqList">
          ${FAQ_ITEMS.map((item, i) => `
            <div class="faq-item" data-index="${i}">
              <button class="faq-question">
                <span>${item.q}</span>
                <svg class="faq-chevron" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"/></svg>
              </button>
              <div class="faq-answer">
                <p>${item.a}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="contact-form" id="contactForm">
        <h2>Contact Support</h2>
        <p class="form-desc">Can't find what you're looking for? Send us a message and we'll get back to you.</p>
        <div class="form-summary-error" id="formSummaryError" role="alert" aria-live="polite"></div>
        <div class="form-group">
          <label for="contactEmail">Email address</label>
          <input type="email" id="contactEmail" placeholder="you@example.com" aria-describedby="contactEmailError" required>
          <div class="field-error" id="contactEmailError"></div>
        </div>
        <div class="form-group">
          <label for="contactSubject">Subject</label>
          <select id="contactSubject" aria-describedby="contactSubjectError" required>
            <option value="">Select a topic...</option>
            <option value="account">Account & Billing</option>
            <option value="pages">GitHub Pages (404 errors)</option>
            <option value="repos">Repositories</option>
            <option value="security">Security</option>
            <option value="other">Other</option>
          </select>
          <div class="field-error" id="contactSubjectError"></div>
        </div>
        <div class="form-group">
          <label for="contactMessage">Description</label>
          <textarea id="contactMessage" placeholder="Describe your issue in detail..." aria-describedby="contactMessageError" required></textarea>
          <div class="field-error" id="contactMessageError"></div>
        </div>
        <button class="form-submit" id="submitSupport" type="button">Submit Request</button>
        <div class="form-success" id="formSuccess" role="status">Your request has been submitted. We'll get back to you within 24 hours.</div>
      </div>
    </div>
  `;
  bindSupportEvents();
}

function bindSupportEvents() {
  document.querySelectorAll('.support-card').forEach(card => {
    card.addEventListener('click', () => {
      const topic = card.dataset.topic;
      const select = document.getElementById('contactSubject');
      select.value = topic;
      document.getElementById('contactForm').scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  const emailEl = document.getElementById('contactEmail');
  const subjectEl = document.getElementById('contactSubject');
  const messageEl = document.getElementById('contactMessage');
  const summary = document.getElementById('formSummaryError');

  function clearFieldError(el) {
    el.classList.remove('input-error');
    const errEl = document.getElementById(el.id + 'Error');
    if (errEl) { errEl.textContent = ''; errEl.classList.remove('visible'); }
  }
  [emailEl, subjectEl, messageEl].forEach(el => {
    el.addEventListener('input', () => clearFieldError(el));
    el.addEventListener('change', () => clearFieldError(el));
  });

  document.getElementById('submitSupport').addEventListener('click', () => {
    const email = emailEl.value.trim();
    const subject = subjectEl.value;
    const message = messageEl.value.trim();
    const errors = [];
    function setFieldError(el, msg) {
      el.classList.add('input-error');
      const errEl = document.getElementById(el.id + 'Error');
      if (errEl) { errEl.textContent = msg; errEl.classList.add('visible'); }
      errors.push(el);
    }
    [emailEl, subjectEl, messageEl].forEach(clearFieldError);

    if (!email) setFieldError(emailEl, 'Please enter your email address.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setFieldError(emailEl, 'Please enter a valid email address.');
    if (!subject) setFieldError(subjectEl, 'Please choose a subject.');
    if (!message) setFieldError(messageEl, 'Please describe your issue.');

    if (errors.length) {
      summary.textContent = errors.length === 1
        ? 'Please fix the highlighted field below.'
        : `Please fix ${errors.length} fields below before submitting.`;
      summary.classList.add('visible');
      errors[0].focus();
      return;
    }
    summary.classList.remove('visible');
    summary.textContent = '';
    document.getElementById('formSuccess').style.display = 'block';
    const btn = document.getElementById('submitSupport');
    btn.disabled = true;
    btn.textContent = 'Submitted';
  });
}

function bindNavLinks() {
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigate(el.dataset.page);
    });
  });
}

// ===== STATUS PAGE =====
function renderStatus() {
  const hasDegraded = STATUS_DATA.some(s => s.status !== 'operational');
  app.innerHTML = `
    <div class="page-status">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#404" data-page="404">404</a>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Status</span>
      </nav>
      <div class="status-header">
        <h1>GitHub System Status</h1>
        <p class="status-subtitle">Current status of all GitHub services</p>
      </div>
      <div class="status-banner ${hasDegraded ? 'degraded' : 'operational'}">
        ${hasDegraded ? 'Some Systems Experiencing Issues' : 'All Systems Operational'}
      </div>
      <div class="status-components">
        ${STATUS_DATA.map((s, i) => `
          <div class="status-component clickable" data-index="${i}">
            <span class="component-name">${s.name}</span>
            <span class="component-status">
              <span class="status-dot ${s.status === 'operational' ? 'green' : 'yellow'}"></span>
              ${s.status === 'operational' ? 'Operational' : 'Degraded Performance'}
            </span>
          </div>
        `).join('')}
      </div>

      <div class="uptime-bar">
        <h2>90-day uptime</h2>
        <div class="uptime-grid">
          ${Array.from({length: 90}, (_, i) => {
            const day = new Date();
            day.setDate(day.getDate() - (89 - i));
            const hasIssue = i === 89 || i === 87 || i === 84;
            return `<div class="uptime-day ${hasIssue ? 'has-issue' : ''}" data-day="${i}" title="${day.toLocaleDateString()}${hasIssue ? ' - Issue reported' : ' - No issues'}"></div>`;
          }).join('')}
        </div>
        <div class="uptime-labels">
          <span>90 days ago</span>
          <span>Today</span>
        </div>
      </div>

      <div class="incident-history">
        <h2>Incident History</h2>
        ${INCIDENTS.map((inc, i) => `
          <div class="incident-item" data-incident="${i}">
            <div class="incident-header" role="button" tabindex="0">
              <div>
                <div class="incident-title">${inc.title}</div>
                <div class="incident-time">${inc.time}</div>
              </div>
              <span class="incident-status-tag ${inc.status}">${inc.status === 'resolved' ? 'Resolved' : 'Investigating'}</span>
            </div>
            <div class="incident-updates">
              ${inc.updates.map(u => `
                <div class="incident-update">
                  <span class="update-time">${u.time}</span>
                  <span class="update-text">${u.text}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="status-subscribe">
        <h2>Subscribe to Updates</h2>
        <p>Get notified when GitHub creates, updates or resolves an incident.</p>
        <div class="subscribe-form">
          <input type="email" id="statusEmail" placeholder="you@example.com" aria-describedby="subscribeError" aria-label="Email address for status updates">
          <button id="subscribeBtn" type="button">Subscribe</button>
        </div>
        <div class="field-error subscribe-error" id="subscribeError" role="alert" aria-live="polite"></div>
        <div class="subscribe-success" id="subscribeSuccess" role="status">Subscribed! You'll receive email notifications for status changes.</div>
      </div>
    </div>
  `;
  bindStatusEvents();
}

function bindStatusEvents() {
  document.querySelectorAll('.incident-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('expanded');
    });
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.parentElement.classList.toggle('expanded');
      }
    });
  });

  document.querySelectorAll('.status-component.clickable').forEach(comp => {
    comp.addEventListener('click', () => {
      const idx = parseInt(comp.dataset.index);
      showStatusDetailModal(STATUS_DATA[idx]);
    });
  });

  document.querySelectorAll('.uptime-day').forEach(day => {
    day.addEventListener('click', () => {
      const idx = parseInt(day.dataset.day);
      const d = new Date();
      d.setDate(d.getDate() - (89 - idx));
      const hasIssue = day.classList.contains('has-issue');
      showModal(`
        <div class="uptime-detail">
          <h2>${d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
          <div class="uptime-detail-status ${hasIssue ? 'has-issue' : 'ok'}">
            <span class="status-dot ${hasIssue ? 'yellow' : 'green'}" style="width:12px;height:12px"></span>
            ${hasIssue ? 'Incident reported' : 'No issues reported'}
          </div>
          ${hasIssue ? '<p class="uptime-detail-desc">An incident was reported on this day affecting GitHub Pages and Webhook services. All issues were resolved within 2 hours.</p>' : '<p class="uptime-detail-desc">All GitHub services operated normally throughout this day.</p>'}
        </div>
      `);
    });
  });

  const emailInput = document.getElementById('statusEmail');
  const errEl = document.getElementById('subscribeError');
  const successEl = document.getElementById('subscribeSuccess');
  emailInput.addEventListener('input', () => {
    emailInput.classList.remove('input-error');
    errEl.textContent = '';
    errEl.classList.remove('visible');
  });
  document.getElementById('subscribeBtn').addEventListener('click', () => {
    const email = emailInput.value.trim();
    if (!email) {
      emailInput.classList.add('input-error');
      errEl.textContent = 'Please enter an email address to subscribe.';
      errEl.classList.add('visible');
      emailInput.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailInput.classList.add('input-error');
      errEl.textContent = 'That email address looks invalid. Please double-check it.';
      errEl.classList.add('visible');
      emailInput.focus();
      return;
    }
    errEl.textContent = '';
    errEl.classList.remove('visible');
    successEl.style.display = 'block';
    const btn = document.getElementById('subscribeBtn');
    btn.textContent = 'Subscribed';
    btn.disabled = true;
  });
}

// ===== UTILITIES =====
function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== INIT =====
navigate('404');

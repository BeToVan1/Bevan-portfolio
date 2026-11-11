// Progressive enhancements: all content and navigation work without JavaScript.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      if (!motionPreference.matches) target.classList.add('entering');
      observer.unobserve(target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

const filters = document.querySelector('.project-filters');
if (filters) {
  const cards = [...document.querySelectorAll('.project-card')];
  const status = document.querySelector('.filter-status');
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    const category = button.getAttribute('aria-pressed') === 'true' ? 'all' : button.dataset.filter;
    filters.querySelectorAll('button').forEach((item) => {
      const selected = item.dataset.filter === category;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    cards.forEach((card) => {
      card.hidden = category !== 'all' && !card.dataset.category.split(/\s+/).includes(category);
      if (!card.hidden) count++;
    });
    status.textContent = category === 'all'
      ? 'All ' + cards.length + ' projects. Select a category to filter; select it again to show all.'
      : count + (count === 1 ? ' project shown. ' : ' projects shown. ') + 'Select ' + button.textContent + ' again to show all.';
    queueProgress();
  });
}

const progress = document.querySelector('.reading-progress');
let framePending = false;
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const fraction = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  if (progress) progress.style.transform = 'scaleX(' + fraction + ')';
  framePending = false;
}
function queueProgress() {
  if (!framePending) {
    framePending = true;
    window.requestAnimationFrame(updateProgress);
  }
}
window.addEventListener('scroll', queueProgress, { passive: true });
window.addEventListener('resize', queueProgress);
document.addEventListener('toggle', queueProgress, true);
updateProgress();

// Simple analytics: configure the public GoatCounter site code after making
// its dashboard private. This is a collection address, never an API key.
(() => {
  const siteCode = 'bevanto';
  const productionHosts = ['bevan-portfolio-eta.vercel.app'];
  if (!/^[a-z0-9][a-z0-9-]*$/.test(siteCode) ||
      location.protocol !== 'https:' ||
      !productionHosts.includes(location.hostname) ||
      navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;

  const pagePath = location.pathname === '/' ? '/index.html' : location.pathname;
  const resumeTypes = {
    '/Bevan-To-Resume.pdf': ['resume-swe', 'Résumé click — Software engineering'],
    '/Bevan-To-Resume-QA.pdf': ['resume-qa', 'Résumé click — QA'],
    '/Bevan-To-Resume-GameDev.pdf': ['resume-games', 'Résumé click — Game development']
  };
  // Do not send query strings, fragments, external referrers, or custom user IDs.
  window.goatcounter = {
    endpoint: 'https://' + siteCode + '.goatcounter.com/count',
    no_onload: true,
    referrer: ''
  };
  const pending = [];
  let ready = false;
  let failed = false;
  function send(data) {
    if (failed) return;
    if (!ready) {
      if (pending.length < 10) pending.push(data);
      return;
    }
    try { window.goatcounter.count(data); } catch { /* Never affect navigation. */ }
  }
  function trackResume(event) {
    if (event.defaultPrevented || (event.type === 'auxclick' && event.button !== 1)) return;
    const link = event.target.closest?.('a.resume-download');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    const resume = resumeTypes[url.pathname];
    if (resume) send({ path: resume[0], title: resume[1], event: true, referrer: '' });
  }
  document.addEventListener('click', trackResume);
  document.addEventListener('auxclick', trackResume);
  const tracker = document.createElement('script');
  tracker.src = 'https://gc.zgo.at/count.js';
  tracker.async = true;
  tracker.referrerPolicy = 'no-referrer';
  tracker.onload = () => {
    if (typeof window.goatcounter.count !== 'function') {
      failed = true;
      pending.length = 0;
      return;
    }
    ready = true;
    send({ path: pagePath, title: document.title, referrer: '' });
    pending.splice(0).forEach(send);
  };
  tracker.onerror = () => { failed = true; pending.length = 0; };
  document.head.appendChild(tracker);
})();



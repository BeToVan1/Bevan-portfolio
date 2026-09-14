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
    filters.querySelectorAll('button').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    cards.forEach((card) => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) count++;
    });
    status.textContent = count + (count === 1 ? ' project shown.' : ' projects shown.');
    queueProgress();
  });
}

const copyButton = document.querySelector('.copy-email');
if (copyButton && navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('BevanTo49797@gmail.com');
      status.textContent = 'Email copied.';
    } catch {
      status.textContent = 'Copy unavailable. Select the email address or use the email link.';
    }
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


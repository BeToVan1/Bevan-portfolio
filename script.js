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
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) count++;
    });
    status.textContent = category === 'all'
      ? 'All 6 projects. Select a category to filter; select it again to show all.'
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

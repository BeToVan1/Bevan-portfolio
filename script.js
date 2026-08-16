// Slides the highlighter pill behind the active nav tab.
function positionIndicator() {
  const nav = document.querySelector('nav.tabs');
  if (!nav) return;
  const active = nav.querySelector('.tab.active');
  const indicator = nav.querySelector('.tab-indicator');
  if (!active || !indicator) return;
  const navRect = nav.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  indicator.style.left = (activeRect.left - navRect.left) + 'px';
  indicator.style.width = activeRect.width + 'px';
}

window.addEventListener('load', positionIndicator);
window.addEventListener('resize', positionIndicator);

// Mailto links silently fail if the browser has no default mail app
// configured. Copy the address to clipboard as a fallback so the visitor
// always leaves with something actionable, even if their OS doesn't open
// a compose window.
function setupMailtoFallback() {
  const links = document.querySelectorAll('a[href^="mailto:"]');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      const email = link.getAttribute('href').replace('mailto:', '').split('?')[0];
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(email).then(() => {
        const original = link.textContent;
        link.dataset.original = link.dataset.original || original;
        link.textContent = 'Copied — ' + email;
        setTimeout(() => {
          link.textContent = link.dataset.original;
        }, 1800);
      }).catch(() => {});
    });
  });
}

window.addEventListener('load', setupMailtoFallback);
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
/* A convenience gesture, not access control: one letter in the About title. */
(() => {
  'use strict';
  function layoutUrl(href, layout) {
    const url = new URL(href);
    if (!['amplo', 'intermediario', 'compacto'].includes(layout)) throw new Error('Unknown layout');
    if (layout === 'amplo') url.searchParams.delete('layout');
    else url.searchParams.set('layout', layout);
    url.hash = 'mapa';
    return url.href;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { layoutUrl };
  if (typeof document === 'undefined') return;
  const trigger = document.getElementById('aboutLayoutTrigger');
  const panel = document.getElementById('aboutLayoutShortcuts');
  if (!trigger || !panel) return;
  const links = panel.querySelectorAll('[data-layout-shortcut]');
  const syncLinks = () => links.forEach(link => { link.href = layoutUrl(window.location.href, link.dataset.layoutShortcut); });
  const close = () => { panel.hidden = true; trigger.setAttribute('aria-expanded', 'false'); };
  trigger.addEventListener('click', () => {
    syncLinks(); panel.hidden = !panel.hidden;
    trigger.setAttribute('aria-expanded', String(!panel.hidden));
  });
  links.forEach(link => link.addEventListener('click', syncLinks));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden && !document.getElementById('welcomeDialog')?.open) {
      close(); trigger.focus({ preventScroll: true }); event.preventDefault();
    }
  });
  document.addEventListener('site-section-change', close);
})();

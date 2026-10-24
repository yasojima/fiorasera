(() => {
  'use strict';
  const dialog = document.getElementById('demo-dialog');
  dialog.querySelector('[data-demo-close]').addEventListener('click', () => dialog.close());
  const showDemo = event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!dialog.open) dialog.showModal();
  };
  document.addEventListener('click', event => {
    const control = event.target.closest('[data-demo-action], a[href]');
    if (!control) return;
    const href = control.getAttribute('href') || '';
    if (control.hasAttribute('data-demo-action') || /^(?:https?:|mailto:|tel:|sms:|\/\/)/i.test(href)) showDemo(event);
  }, true);
  document.addEventListener('submit', showDemo, true);
  const viewport = document.getElementById('viewport-size');
  const updateViewport = () => {
    viewport.textContent = `Viewport: ${window.innerWidth} × ${window.innerHeight} px`;
  };
  updateViewport();
  window.addEventListener('resize', updateViewport, { passive: true });
  window.visualViewport?.addEventListener('resize', updateViewport, { passive: true });
})();

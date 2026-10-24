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
  // Use the original close controls so their animation and scroll restoration
  // stay intact. A native demo dialog handles its own Escape key first.
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || event.repeat || dialog.open) return;
    const html = document.documentElement;
    const close = html.classList.contains('is-popupopen')
      ? document.querySelector('.js-popupclose')
      : html.classList.contains('is-menuopen')
        ? document.getElementById('js-menuclose')
        : null;
    if (close) {
      event.preventDefault();
      close.click();
    }
  });
  const viewport = document.getElementById('viewport-size');
  const updateViewport = () => {
    viewport.textContent = `Viewport: ${window.innerWidth} × ${window.innerHeight} px`;
  };
  updateViewport();
  window.addEventListener('resize', updateViewport, { passive: true });
  window.visualViewport?.addEventListener('resize', updateViewport, { passive: true });
})();

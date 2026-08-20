document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const overlay = document.querySelector('.nav-overlay');
  const closeBtn = document.querySelector('.nav-close');

  if (!toggle || !overlay) return;

  const openOverlay = () => {
    overlay.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeOverlay = () => {
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    overlay.classList.contains('open') ? closeOverlay() : openOverlay();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeOverlay);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay();
  });
});

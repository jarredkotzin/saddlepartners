document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const overlay = document.querySelector('.nav-overlay');
  const scrim = document.querySelector('.nav-scrim');
  const closeBtn = document.querySelector('.nav-close');

  if (!toggle || !overlay) return;

  const openOverlay = () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    overlay.classList.add('open');
    if (scrim) scrim.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = scrollbarWidth + 'px';
  };

  const closeOverlay = () => {
    overlay.classList.remove('open');
    if (scrim) scrim.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  toggle.addEventListener('click', () => {
    overlay.classList.contains('open') ? closeOverlay() : openOverlay();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
  if (scrim) scrim.addEventListener('click', closeOverlay);

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeOverlay);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay();
  });

  const form = document.getElementById('inquiry-form');
  const status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      status.textContent = 'Sending...';

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        const data = await res.json();
        if (data.success) {
          status.textContent = "Thanks! We'll be in touch soon.";
          form.reset();
        } else {
          status.textContent = 'Something went wrong. Please email us directly at hello@saddle.partners.';
        }
      } catch (err) {
        status.textContent = 'Something went wrong. Please email us directly at hello@saddle.partners.';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});

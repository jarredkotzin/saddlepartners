document.addEventListener('DOMContentLoaded', () => {
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

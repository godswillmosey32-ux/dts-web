// ============================================================
// Contact form — front-end validation only.
// There is no backend wired up, so nothing is actually sent
// anywhere. Replace this with a real submit handler (email
// service, form backend, etc.) when one is available.
// ============================================================
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const successBanner = document.getElementById('contactSuccess');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        valid = false;
        if (group) group.classList.add('has-error');
      } else if (group) {
        group.classList.remove('has-error');
      }
    });

    if (valid) {
      if (successBanner) successBanner.classList.add('show');
      form.reset();
    }
  });
})();
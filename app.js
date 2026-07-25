// Mobile sidebar toggle
(function () {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (!toggle || !sidebar || !overlay) return;

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay.addEventListener('click', closeSidebar);

  // Close on nav link click (mobile)
  sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 900) closeSidebar();
    });
  });

  // Close if resized to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) closeSidebar();
  });
})();

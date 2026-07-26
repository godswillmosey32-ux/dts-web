// Sidebar toggle — works on every screen size.
//
// Desktop: the sidebar is open by default. Clicking the toggle hides
// it (adds "sidebar-toggled" to <body>) and the page content reflows
// to use the freed-up space. Clicking again brings it back.
//
// Mobile: the sidebar is hidden by default and slides in as an
// overlay when "sidebar-toggled" is added — the opposite meaning of
// the same class, handled purely through CSS media queries.
(function () {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (!toggle || !sidebar || !overlay) return;

  function isMobile() {
    return window.innerWidth <= 900;
  }

  function isSidebarVisible() {
    const toggled = document.body.classList.contains('sidebar-toggled');
    return isMobile() ? toggled : !toggled;
  }

  function updateAria() {
    toggle.setAttribute('aria-expanded', String(isSidebarVisible()));
  }

  function toggleSidebar() {
    document.body.classList.toggle('sidebar-toggled');
    updateAria();
  }

  function closeSidebar() {
    document.body.classList.remove('sidebar-toggled');
    updateAria();
  }

  toggle.addEventListener('click', toggleSidebar);

  // Clicking the dark overlay (mobile only) closes the sidebar
  overlay.addEventListener('click', closeSidebar);

  // Tapping a nav link on mobile should close the sidebar afterwards;
  // on desktop the sidebar stays open while navigating.
  sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (isMobile()) closeSidebar();
    });
  });

  // Reset to each breakpoint's natural default when the window
  // crosses the mobile/desktop boundary.
  let lastIsMobile = isMobile();
  window.addEventListener('resize', function () {
    const nowMobile = isMobile();
    if (nowMobile !== lastIsMobile) {
      document.body.classList.remove('sidebar-toggled');
      lastIsMobile = nowMobile;
      updateAria();
    }
  });

  updateAria();
})();
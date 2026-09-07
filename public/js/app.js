/**
 * GEARBOX GIANTS - MAIN APPLICATION CONTROLLER
 */

(function () {
  'use strict';

  function initApp() {
    setupHeaderScroll();
    setupMobileNav();
    setupScrollAnimations();
    setupActiveLinks();
    setupMobileActionBar();
  }

  // 0. Sticky Mobile Action Bar (Call, WhatsApp, Get Quote)
  function setupMobileActionBar() {
    if (document.querySelector('.mobile-action-bar')) return;

    // Do not show on admin pages
    if (window.location.pathname.startsWith('/admin')) return;

    const bar = document.createElement('div');
    bar.className = 'mobile-action-bar';
    bar.innerHTML = `
      <a href="tel:02080589668" class="mob-act-btn mob-btn-call" aria-label="Call Gearbox Giants">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        Call
      </a>
      <a href="https://wa.me/442080589668?text=Hi%2C%20I%27m%20looking%20for%20help%20with%20my%20gearbox." target="_blank" rel="noopener" class="mob-act-btn mob-btn-wa" aria-label="WhatsApp Gearbox Giants">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        WhatsApp
      </a>
      <button onclick="window.openQuoteModal ? window.openQuoteModal() : window.location.href='/quote'" class="mob-act-btn mob-btn-quote" aria-label="Get My Gearbox Checked">
        Get Quote →
      </button>
    `;
    document.body.appendChild(bar);
  }

  // 1. Header scroll effect
  function setupHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 2. Mobile Drawer
  function setupMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    const closeBtn = document.getElementById('mobile-drawer-close');

    if (!toggleBtn || !drawer || !backdrop) return;

    function openDrawer() {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', openDrawer);
    backdrop.addEventListener('click', closeDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Close on link click
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // 3. Scroll Triggered Entrance Animations
  function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }

  // 4. Highlight active nav link based on current path
  function setupActiveLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (
        (currentPath.endsWith('/') && (href === 'index.html' || href === './' || href === '/')) ||
        (href && currentPath.includes(href) && href !== 'index.html')
      ) {
        link.classList.add('active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();

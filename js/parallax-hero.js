/**
 * GEARBOX GIANTS - PARALLAX SCROLLING ENGINE
 * 
 * 1. Hero Depth Parallax: Background zooms (1.30 -> 2.05) & translates down at 0.35x,
 *    while the text layer translates up at -0.30x for rich multi-plane cinematic depth.
 * 2. Section Media Parallax: Smoothly translates split card images, process photos,
 *    and workshop facility media inside their masked viewports as you scroll past.
 */

(function () {
  'use strict';

  function initParallaxScrolling() {
    const hero = document.querySelector('.cinematic-hero-section');
    const heroZoomLayer = document.querySelector('.hero-parallax-layer');
    const heroContent = document.querySelector('.cinematic-hero-content');
    const heroOverlay = document.querySelector('.hero-parallax-overlay');

    // Auto-detect section images for parallax gliding
    const parallaxMediaElements = document.querySelectorAll(
      '.step-card-img-wrap img, .media-split-img img, .location-card img, [data-parallax]'
    );

    let scrollY = window.scrollY || window.pageYOffset || 0;
    let targetScrollY = scrollY;
    let isTicking = false;

    // Anchor the hero zoom center directly on the gearbox on the workbench
    if (heroZoomLayer) {
      heroZoomLayer.style.transformOrigin = '64% 48%';
    }

    function onScroll() {
      targetScrollY = window.scrollY || window.pageYOffset || 0;
      if (!isTicking) {
        requestAnimationFrame(updateParallax);
        isTicking = true;
      }
    }

    function updateParallax() {
      // Smooth lerp scroll value for liquid fluid parallax
      scrollY += (targetScrollY - scrollY) * 0.12;

      const windowHeight = window.innerHeight || 800;

      // ------------------------------------------------------------------------
      // 1. HERO PARALLAX (Desktop Only subtle depth, NO opacity fading)
      // ------------------------------------------------------------------------
      const isMobile = window.innerWidth <= 1024;
      if (hero && heroZoomLayer && !isMobile) {
        const heroHeight = hero.offsetHeight || 750;
        const heroProgress = Math.min(Math.max(scrollY / heroHeight, 0), 1.0);

        if (scrollY > 2) {
          const baseZoom = 1.0;
          const zoomScale = baseZoom + (heroProgress * 0.12);
          const bgParallaxY = scrollY * 0.2;
          heroZoomLayer.style.transform = `translate3d(0, ${bgParallaxY.toFixed(2)}px, 0) scale(${zoomScale.toFixed(4)})`;
        } else {
          heroZoomLayer.style.transform = 'none';
        }
      } else if (heroZoomLayer && isMobile) {
        heroZoomLayer.style.transform = 'none';
        if (heroContent) {
          heroContent.style.transform = 'none';
          heroContent.style.opacity = '1';
        }
      }

      // ------------------------------------------------------------------------
      // 2. SECTION MEDIA PARALLAX (Step Cards, Split Banners, Workshop Photos)
      // ------------------------------------------------------------------------
      parallaxMediaElements.forEach(function (img) {
        const parent = img.parentElement;
        if (!parent) return;

        const rect = parent.getBoundingClientRect();

        // Check if element is in viewport
        if (rect.bottom >= -50 && rect.top <= windowHeight + 50) {
          // Calculate center of element relative to center of viewport (-1 to +1)
          const elementCenter = rect.top + (rect.height / 2);
          const viewportCenter = windowHeight / 2;
          const relativePos = (elementCenter - viewportCenter) / (windowHeight / 2);

          // Parallax vertical offset: max +/- 26px
          const maxOffset = 26;
          const parallaxOffsetY = relativePos * -maxOffset;

          img.style.transform = `translate3d(0, ${parallaxOffsetY.toFixed(1)}px, 0) scale(1.12)`;
        }
      });

      // ------------------------------------------------------------------------
      // 3. ANIMATED PARALLAX GEARS (Continuous Spin + Scroll Drift)
      // ------------------------------------------------------------------------
      const gearElements = document.querySelectorAll('.parallax-gear-item');
      if (gearElements.length > 0) {
        gearElements.forEach(function (gear) {
          const section = gear.closest('section');
          if (!section) return;
          const rect = section.getBoundingClientRect();
          if (rect.bottom >= -150 && rect.top <= windowHeight + 150) {
            const speed = parseFloat(gear.getAttribute('data-speed')) || 0.2;
            const relativeOffset = (rect.top - (windowHeight / 2)) * speed;
            gear.style.transform = `translate3d(0, ${relativeOffset.toFixed(1)}px, 0)`;
          }
        });
      }

      // Continue animating if still interpolating
      if (Math.abs(targetScrollY - scrollY) > 0.3) {
        requestAnimationFrame(updateParallax);
      } else {
        scrollY = targetScrollY;
        isTicking = false;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial trigger
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallaxScrolling);
  } else {
    initParallaxScrolling();
  }
})();

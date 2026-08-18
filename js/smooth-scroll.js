/**
 * GEARBOX GIANTS - SMOOTH SCROLLING & DYNAMIC SCROLL MASKING ENGINE
 * Delivers buttery smooth momentum scrolling and dynamic viewport gradient masking.
 */

(function () {
  'use strict';

  function initSmoothScrollAndMasking() {
    // 1. Create Fixed Scroll Progress Bar & Viewport Ambient Masks if not present
    let progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress-bar';
      progressBar.className = 'scroll-progress-bar';
      document.body.appendChild(progressBar);
    }

    let topMask = document.getElementById('viewport-scroll-mask-top');
    if (!topMask) {
      topMask = document.createElement('div');
      topMask.id = 'viewport-scroll-mask-top';
      topMask.className = 'viewport-scroll-mask-top';
      document.body.appendChild(topMask);
    }

    let bottomMask = document.getElementById('viewport-scroll-mask-bottom');
    if (!bottomMask) {
      bottomMask = document.createElement('div');
      bottomMask.id = 'viewport-scroll-mask-bottom';
      bottomMask.className = 'viewport-scroll-mask-bottom';
      document.body.appendChild(bottomMask);
    }

    // 2. Smooth Momentum Scrolling Engine
    let currentY = window.scrollY || window.pageYOffset || 0;
    let targetY = currentY;
    let isRunning = false;
    let scrollTimeout = null;

    const ease = 0.085; // Silky smooth dampening factor

    function getDocHeight() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - window.innerHeight;
    }

    // Update Viewport Masks & Progress Bar
    function updateScrollState(y) {
      const maxScroll = getDocHeight();
      const progress = maxScroll > 0 ? Math.min(Math.max(y / maxScroll, 0), 1) : 0;

      // Update golden progress bar
      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }

      // Dynamic edge masking: fade in top mask when scrolled down
      if (topMask) {
        topMask.style.opacity = y > 40 ? '1' : (y / 40).toString();
      }

      // Dynamic bottom mask: fade out near page bottom
      if (bottomMask) {
        const distFromBottom = maxScroll - y;
        bottomMask.style.opacity = distFromBottom < 60 ? (distFromBottom / 60).toString() : '1';
      }

      // Mark body with scrolling class for active motion blur / masks
      document.body.classList.add('is-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        document.body.classList.remove('is-scrolling');
      }, 150);
    }

    // 60FPS Lerp Animation Loop
    function smoothRender() {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.4) {
        currentY += diff * ease;
        window.scrollTo(0, Math.round(currentY));
        updateScrollState(currentY);
        requestAnimationFrame(smoothRender);
      } else {
        currentY = targetY;
        window.scrollTo(0, Math.round(currentY));
        updateScrollState(currentY);
        isRunning = false;
      }
    }

    // Intercept Wheel for Momentum Dampening (Desktop Only)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      window.addEventListener('wheel', function (e) {
        // Prevent default choppy native snap and interpolate smoothly
        if (e.ctrlKey || e.metaKey) return; // Allow pinch-zoom

        e.preventDefault();
        const maxScroll = getDocHeight();
        const delta = e.deltaY;

        targetY = Math.min(Math.max(targetY + delta, 0), maxScroll);

        if (!isRunning) {
          isRunning = true;
          requestAnimationFrame(smoothRender);
        }
      }, { passive: false });
    }

    // Sync on native scroll events (for touch devices, scrollbar dragging, keys)
    window.addEventListener('scroll', function () {
      if (!isRunning) {
        currentY = window.scrollY || window.pageYOffset || 0;
        targetY = currentY;
        updateScrollState(currentY);
      }
    }, { passive: true });

    // Smooth Anchor Link Navigation
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;

        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          const targetOffset = targetEl.getBoundingClientRect().top + window.scrollY - 80;
          targetY = Math.min(Math.max(targetOffset, 0), getDocHeight());

          if (!isRunning) {
            isRunning = true;
            requestAnimationFrame(smoothRender);
          }
        }
      });
    });

    // 3. Scroll Reveal Intersection Observer with Dynamic Entrance Masking
    const revealElements = document.querySelectorAll('.fade-in-up, .media-split-card, .process-card, .fault-card, .location-chip');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible', 'scroll-masked-in');
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
      });

      revealElements.forEach(function (el) {
        observer.observe(el);
      });
    }

    updateScrollState(currentY);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScrollAndMasking);
  } else {
    initSmoothScrollAndMasking();
  }
})();

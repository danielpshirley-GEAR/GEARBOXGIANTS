/**
 * GEARBOX GIANTS - BMW TO WORKSHOP GEARBOX 3D VIDEO CONTROLLER
 * Cinematic 60FPS continuous camera flight:
 * Starts inside BMW cockpit -> Flies through open window -> Finishes on gearbox workbench.
 */

(function () {
  'use strict';

  function init3DHeroVideo() {
    const canvas = document.getElementById('hero-3d-video-canvas');
    const hero = document.querySelector('.cinematic-hero-section');
    const hotspot = document.querySelector('.gearbox-hotspot');
    const lightFlare = document.querySelector('.hero-light-flare');
    const heroContent = document.querySelector('.cinematic-hero-content');
    const playPauseBtn = document.getElementById('hero-video-play-pause');
    const timelineProgress = document.getElementById('hero-video-timeline-fill');
    const stepBtns = document.querySelectorAll('.hero-video-step-btn');

    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = hero.offsetWidth || window.innerWidth);
    let height = (canvas.height = hero.offsetHeight || window.innerHeight);

    // Preload The High-Definition BMW Cockpit & Gearbox Assets
    const imgInside = new Image();
    imgInside.src = 'assets/bmw_inside_cockpit.jpg';

    const imgGearbox = new Image();
    imgGearbox.src = 'assets/bmw_gearbox_workbench.jpg';

    let loadedCount = 0;
    function checkLoaded() {
      loadedCount++;
      if (loadedCount >= 2) {
        hero.classList.add('video-loaded');
      }
    }
    imgInside.onload = checkLoaded;
    imgGearbox.onload = checkLoaded;

    // Flight Timeline Parameters
    let isPlaying = true;
    let time = 0;
    const loopDuration = 12; // 12 seconds per full cinematic cycle
    let manualProgress = -1; // -1 when auto-playing

    // Mouse Interaction
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let mouseCurrentX = 0;
    let mouseCurrentY = 0;
    let scrollProgress = 0;

    function handleResize() {
      width = canvas.width = hero.offsetWidth || window.innerWidth;
      height = canvas.height = hero.offsetHeight || window.innerHeight;
    }
    window.addEventListener('resize', handleResize, { passive: true });

    hero.addEventListener('mousemove', function (e) {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseTargetX = x * 2;
      mouseTargetY = y * 2;

      if (lightFlare) {
        lightFlare.style.setProperty('--cursor-x', `${e.clientX - rect.left}px`);
        lightFlare.style.setProperty('--cursor-y', `${e.clientY - rect.top}px`);
      }
    });

    hero.addEventListener('mouseleave', function () {
      mouseTargetX = 0;
      mouseTargetY = 0;
    });

    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight || 600;
      scrollProgress = Math.min(Math.max(scrollY / (heroHeight * 0.75), 0), 1);
    }, { passive: true });

    // Play / Pause
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', function () {
        isPlaying = !isPlaying;
        playPauseBtn.innerHTML = isPlaying ? '⏸' : '▶';
        playPauseBtn.setAttribute('title', isPlaying ? 'Pause Video' : 'Play Video');
      });
    }

    // Step Buttons
    stepBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const step = parseFloat(this.getAttribute('data-step')) || 0;
        manualProgress = step / (stepBtns.length - 1);
        updateStepButtons(manualProgress);
        setTimeout(() => { manualProgress = -1; }, 4000);
      });
    });

    function updateStepButtons(p) {
      const stepIdx = Math.round(p * (stepBtns.length - 1));
      stepBtns.forEach((btn, i) => {
        if (i === stepIdx) btn.classList.add('active');
        else btn.classList.remove('active');
      });
    }

    // Atmospheric Workshop Particles
    const particles = [];
    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2.0 + 0.6,
        alpha: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.0006,
        speedY: -Math.random() * 0.0007 - 0.0002
      });
    }

    let lastTimestamp = performance.now();

    // 60FPS Video Rendering Engine
    function render(now) {
      const delta = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;

      if (isPlaying && manualProgress < 0) {
        time += delta;
      }

      // Calculate Timeline Progress (0 to 1 loop)
      let currentProgress;
      if (manualProgress >= 0) {
        currentProgress = manualProgress;
      } else {
        const rawCycle = (time % loopDuration) / loopDuration;
        // Smooth sine wave easing: Inside BMW -> Flight through window -> Gearbox -> Return
        currentProgress = (1 - Math.cos(rawCycle * Math.PI * 2)) * 0.5;
        // Scroll influence
        currentProgress = Math.min(Math.max(currentProgress * 0.75 + scrollProgress * 0.4, 0), 1);
      }

      // Smooth Lerp
      mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.06;
      mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      if (loadedCount >= 2) {
        // DRAW PHASE 1: Inside BMW Cockpit (Zooming through driver window)
        // Focal window point is at (28% X, 38% Y) in the BMW image
        const insideScale = 1.04 + (currentProgress * 0.85); // Scales from 1.04 to 1.89 as camera flies through window
        const insideOpacity = Math.max(1 - Math.pow(currentProgress * 1.35, 1.8), 0);

        if (insideOpacity > 0.005) {
          drawScene(imgInside, insideOpacity, insideScale, 0.28, 0.38, currentProgress);
        }

        // DRAW PHASE 2: Reaching Gearbox on Workbench
        const gearboxOpacity = Math.min(Math.max((currentProgress - 0.22) * 1.5, 0), 1);
        const gearboxScale = 1.02 + ((1 - currentProgress) * -0.12) + (currentProgress * 0.18);

        if (gearboxOpacity > 0.005) {
          drawScene(imgGearbox, gearboxOpacity, gearboxScale, 0.50, 0.50, currentProgress);
        }

        // Render Volumetric Dust Particles
        ctx.save();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX + (mouseCurrentX * 0.0003);
          p.y += p.speedY;

          if (p.x < 0) p.x = 1;
          if (p.x > 1) p.x = 0;
          if (p.y < 0) p.y = 1;

          const px = p.x * width;
          const py = p.y * height;

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha * (0.3 + currentProgress * 0.4)})`;
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 6;
          ctx.fill();
        }
        ctx.restore();

        // Hotspot Position Synchronization (Pinned on gearbox)
        if (hotspot) {
          const isNearGearbox = currentProgress > 0.35;
          hotspot.style.opacity = isNearGearbox ? '1' : '0.15';
          const hsX = (mouseCurrentX * -28) + ((currentProgress - 0.5) * 40);
          const hsY = (mouseCurrentY * -16);
          hotspot.style.transform = `translate3d(${hsX.toFixed(1)}px, ${hsY.toFixed(1)}px, 30px)`;
        }

        // Text Counter-Parallax
        if (heroContent) {
          const tx = mouseCurrentX * 10;
          const ty = mouseCurrentY * 6;
          heroContent.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 40px)`;
        }

        // Timeline Fill Bar
        if (timelineProgress) {
          timelineProgress.style.width = `${(currentProgress * 100).toFixed(1)}%`;
        }
        updateStepButtons(currentProgress);
      }

      requestAnimationFrame(render);
    }

    // Helper: Draw Scene Frame with Dynamic Camera Transform
    function drawScene(img, opacity, scale, anchorX, anchorY, progress) {
      if (!img || !img.complete) return;

      ctx.save();
      ctx.globalAlpha = opacity;

      const imgAspect = img.width / img.height;
      const canvasAspect = width / height;
      let drawW, drawH;

      if (canvasAspect > imgAspect) {
        drawW = width * 1.15 * scale;
        drawH = drawW / imgAspect;
      } else {
        drawH = height * 1.15 * scale;
        drawW = drawH * imgAspect;
      }

      // Camera pan and mouse perspective
      const panX = (mouseCurrentX * -34) + ((0.5 - anchorX) * drawW * (scale - 1) * 0.4);
      const panY = (mouseCurrentY * -20) + ((0.5 - anchorY) * drawH * (scale - 1) * 0.4);
      const tilt = mouseCurrentX * 0.012;

      ctx.translate(width * 0.5 + panX, height * 0.5 + panY);
      ctx.rotate(tilt);
      ctx.drawImage(img, -drawW * 0.5, -drawH * 0.5, drawW, drawH);

      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DHeroVideo);
  } else {
    init3DHeroVideo();
  }
})();

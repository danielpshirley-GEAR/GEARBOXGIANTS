/**
 * GEARBOX GIANTS - 3D INTERACTIVE WEBGL GEARBOX ENGINE
 * Built with Three.js
 */

(function () {
  'use strict';

  let scene, camera, renderer, container;
  let mainGroup, explodedGroup, casingGroup, particles;
  let gears = [];
  let planetaryGears = [];
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotation = { x: 0.35, y: -0.6 };
  let currentRotation = { x: 0.35, y: -0.6 };
  let speedMultiplier = 1.0;
  let isExploded = false;
  let isXRay = false;
  let targetExplodeFactor = 0;
  let currentExplodeFactor = 0;
  let animationFrameId;

  // Materials
  let metalChrome, metalGold, metalDarkSteel, casingMaterial, casingWireframe;

  function init3DGearbox() {
    container = document.getElementById('gearbox-canvas-container');
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene Setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.035);

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 14);

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.domElement.id = 'gearbox3d-canvas';
    container.appendChild(renderer.domElement);

    // 4. Lighting Setup
    setupLighting();

    // 5. Materials Setup
    setupMaterials();

    // 6. Build Gearbox Assembly
    buildGearboxAssembly();

    // 7. Ambient Oil Mist Particles
    setupParticles();

    // 8. Event Listeners & Controls
    setupInteraction();

    // 9. Start Animation Loop
    animate();
  }

  function setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Key Light (Warm Amber Specular)
    const keyLight = new THREE.DirectionalLight(0xfff1d6, 2.5);
    keyLight.position.set(8, 12, 10);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Amber Rim Light
    const amberLight = new THREE.PointLight(0xf59e0b, 4.0, 30);
    amberLight.position.set(-6, -4, 4);
    scene.add(amberLight);

    // Precision Cyan Rim Light
    const cyanLight = new THREE.PointLight(0x0ea5e9, 3.5, 30);
    cyanLight.position.set(6, 6, -5);
    scene.add(cyanLight);

    // Center internal glow
    const centerGlow = new THREE.PointLight(0xfbbf24, 1.5, 12);
    centerGlow.position.set(0, 0, 0);
    scene.add(centerGlow);
  }

  function setupMaterials() {
    metalChrome = new THREE.MeshStandardMaterial({
      color: 0xd8e2ec,
      metalness: 0.95,
      roughness: 0.18,
      envMapIntensity: 1.5
    });

    metalGold = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.22,
      envMapIntensity: 1.8
    });

    metalDarkSteel = new THREE.MeshStandardMaterial({
      color: 0x242d38,
      metalness: 0.9,
      roughness: 0.35
    });

    casingMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.88,
      transparent: true,
      opacity: 0.3,
      thickness: 1.2,
      ior: 1.5
    });

    casingWireframe = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
  }

  // Procedural Gear Shape Generator
  function createGearGeometry(teeth, outerRadius, innerRadius, thickness, holeRadius) {
    const shape = new THREE.Shape();
    const toothDepth = (outerRadius - innerRadius);
    const angleStep = (Math.PI * 2) / teeth;

    for (let i = 0; i < teeth; i++) {
      const angle = i * angleStep;
      const a1 = angle;
      const a2 = angle + angleStep * 0.25;
      const a3 = angle + angleStep * 0.5;
      const a4 = angle + angleStep * 0.75;

      const rRoot = innerRadius;
      const rTip = outerRadius;

      if (i === 0) {
        shape.moveTo(Math.cos(a1) * rRoot, Math.sin(a1) * rRoot);
      } else {
        shape.lineTo(Math.cos(a1) * rRoot, Math.sin(a1) * rRoot);
      }

      shape.lineTo(Math.cos(a2) * rTip, Math.sin(a2) * rTip);
      shape.lineTo(Math.cos(a3) * rTip, Math.sin(a3) * rTip);
      shape.lineTo(Math.cos(a4) * rRoot, Math.sin(a4) * rRoot);
    }
    shape.closePath();

    // Center Hole
    if (holeRadius > 0) {
      const holePath = new THREE.Path();
      holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
      shape.holes.push(holePath);

      // Add decorative weight-reduction holes around gear
      const subHolesCount = 5;
      const subHoleRadius = (innerRadius - holeRadius) * 0.25;
      const subHoleDist = (innerRadius + holeRadius) * 0.5;
      for (let h = 0; h < subHolesCount; h++) {
        const hAngle = (h / subHolesCount) * Math.PI * 2;
        const sh = new THREE.Path();
        sh.absarc(
          Math.cos(hAngle) * subHoleDist,
          Math.sin(hAngle) * subHoleDist,
          subHoleRadius,
          0,
          Math.PI * 2,
          true
        );
        shape.holes.push(sh);
      }
    }

    const extrudeSettings = {
      steps: 1,
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 3
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }

  function buildGearboxAssembly() {
    mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Primary Drive Shaft
    const shaftGeom = new THREE.CylinderGeometry(0.35, 0.35, 9, 32);
    const shaft1 = new THREE.Mesh(shaftGeom, metalDarkSteel);
    shaft1.rotation.x = Math.PI / 2;
    shaft1.position.set(-1.8, 0, 0);
    mainGroup.add(shaft1);

    // 2. Countershaft
    const shaft2 = new THREE.Mesh(shaftGeom, metalDarkSteel);
    shaft2.rotation.x = Math.PI / 2;
    shaft2.position.set(1.8, 0, 0);
    mainGroup.add(shaft2);

    // 3. Gear Pair 1 (High Ratio - Input to Countershaft)
    const gear1Geom = createGearGeometry(24, 2.2, 1.8, 0.6, 0.4);
    const gear1 = new THREE.Mesh(gear1Geom, metalGold);
    gear1.position.set(-1.8, 0, 1.8);
    mainGroup.add(gear1);
    gears.push({ mesh: gear1, speed: 1.0, axis: 'z', normalPos: { x: -1.8, y: 0, z: 1.8 }, explodeOffset: { x: -1.5, y: 0, z: 2 } });

    const gear2Geom = createGearGeometry(16, 1.5, 1.2, 0.6, 0.4);
    const gear2 = new THREE.Mesh(gear2Geom, metalChrome);
    gear2.position.set(1.8, 0, 1.8);
    mainGroup.add(gear2);
    gears.push({ mesh: gear2, speed: -1.5, axis: 'z', normalPos: { x: 1.8, y: 0, z: 1.8 }, explodeOffset: { x: 1.5, y: 0, z: 2 } });

    // 4. Gear Pair 2 (Middle Speed Gears)
    const gear3Geom = createGearGeometry(18, 1.7, 1.4, 0.7, 0.4);
    const gear3 = new THREE.Mesh(gear3Geom, metalChrome);
    gear3.position.set(-1.8, 0, 0);
    mainGroup.add(gear3);
    gears.push({ mesh: gear3, speed: 1.0, axis: 'z', normalPos: { x: -1.8, y: 0, z: 0 }, explodeOffset: { x: -1.5, y: 0, z: 0 } });

    const gear4Geom = createGearGeometry(22, 2.0, 1.7, 0.7, 0.4);
    const gear4 = new THREE.Mesh(gear4Geom, metalGold);
    gear4.position.set(1.8, 0, 0);
    mainGroup.add(gear4);
    gears.push({ mesh: gear4, speed: -0.818, axis: 'z', normalPos: { x: 1.8, y: 0, z: 0 }, explodeOffset: { x: 1.5, y: 0, z: 0 } });

    // 5. Planetary Gear Assembly (Front Hub)
    const planetaryGroup = new THREE.Group();
    planetaryGroup.position.set(0, 0, -2.5);
    mainGroup.add(planetaryGroup);

    // Sun Gear
    const sunGeom = createGearGeometry(12, 1.1, 0.85, 0.5, 0.35);
    const sunGear = new THREE.Mesh(sunGeom, metalGold);
    planetaryGroup.add(sunGear);
    planetaryGears.push({ mesh: sunGear, speed: 2.0, isPlanetaryCarrier: false });

    // 3 Planet Gears orbiting
    const planetGeom = createGearGeometry(10, 0.85, 0.65, 0.45, 0.2);
    const planetCarrier = new THREE.Group();
    planetaryGroup.add(planetCarrier);

    for (let p = 0; p < 3; p++) {
      const pAngle = (p / 3) * Math.PI * 2;
      const planetMesh = new THREE.Mesh(planetGeom, metalChrome);
      planetMesh.position.set(Math.cos(pAngle) * 1.8, Math.sin(pAngle) * 1.8, 0);
      planetCarrier.add(planetMesh);
      planetaryGears.push({ mesh: planetMesh, speed: -1.6, isPlanet: true });
    }

    // Outer Ring Gear (Annulus)
    const ringGeom = new THREE.TorusGeometry(2.7, 0.35, 16, 48);
    const ringMesh = new THREE.Mesh(ringGeom, metalDarkSteel);
    planetaryGroup.add(ringMesh);

    // 6. Synchronizer Ring Hub & Selector Fork
    const synchroGeom = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 32);
    const synchroMesh = new THREE.Mesh(synchroGeom, metalGold);
    synchroMesh.rotation.x = Math.PI / 2;
    synchroMesh.position.set(-1.8, 0, 0.9);
    mainGroup.add(synchroMesh);

    // 7. Transmission Casing (Glass / Wireframe Shell)
    casingGroup = new THREE.Group();
    const casingGeom = new THREE.CylinderGeometry(3.6, 4.2, 8.5, 32, 4, true);
    const casingMesh = new THREE.Mesh(casingGeom, casingMaterial);
    casingMesh.rotation.x = Math.PI / 2;
    casingGroup.add(casingMesh);

    const casingWireMesh = new THREE.Mesh(casingGeom, casingWireframe);
    casingWireMesh.rotation.x = Math.PI / 2;
    casingGroup.add(casingWireMesh);

    mainGroup.add(casingGroup);
  }

  function setupParticles() {
    const count = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      colors[i * 3] = 0.96;     // r
      colors[i * 3 + 1] = 0.62; // g (amber)
      colors[i * 3 + 2] = 0.05; // b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);
  }

  function setupInteraction() {
    const canvas = renderer.domElement;

    // Mouse / Touch Drag Rotation
    canvas.addEventListener('mousedown', function (e) {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotation.y += deltaX * 0.008;
      targetRotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', function () {
      isDragging = false;
    });

    // Touch Support
    canvas.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', function (e) {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      targetRotation.y += deltaX * 0.008;
      targetRotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    window.addEventListener('touchend', function () {
      isDragging = false;
    });

    // UI Buttons
    const btnExplode = document.getElementById('btn-3d-explode');
    if (btnExplode) {
      btnExplode.addEventListener('click', function () {
        isExploded = !isExploded;
        targetExplodeFactor = isExploded ? 1.0 : 0;
        this.classList.toggle('active', isExploded);
        this.innerHTML = isExploded ? '<span>✕</span> Collapse' : '<span></span> Exploded View';
      });
    }

    const btnXRay = document.getElementById('btn-3d-xray');
    if (btnXRay) {
      btnXRay.addEventListener('click', function () {
        isXRay = !isXRay;
        casingGroup.visible = !isXRay;
        this.classList.toggle('active', isXRay);
        this.innerHTML = isXRay ? '<span>👁</span> Solid Shell' : '<span>🔍</span> X-Ray Casing';
      });
    }

    const btnSpeed = document.getElementById('btn-3d-speed');
    if (btnSpeed) {
      btnSpeed.addEventListener('click', function () {
        if (speedMultiplier === 1.0) {
          speedMultiplier = 2.2;
          this.innerHTML = '<span></span> High RPM (2.2x)';
          this.classList.add('active');
        } else if (speedMultiplier === 2.2) {
          speedMultiplier = 0;
          this.innerHTML = '<span>⏸</span> Paused (0x)';
          this.classList.remove('active');
        } else {
          speedMultiplier = 1.0;
          this.innerHTML = '<span></span> Normal RPM (1x)';
          this.classList.remove('active');
        }
        updateTelemetryRPM(speedMultiplier);
      });
    }

    // Responsive Resize
    window.addEventListener('resize', onWindowResize);
  }

  function updateTelemetryRPM(multiplier) {
    const rpmElem = document.getElementById('telemetry-rpm');
    if (rpmElem) {
      rpmElem.textContent = Math.round(2800 * multiplier) + ' RPM';
    }
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    // Smooth orbital rotation interpolation
    if (!isDragging) {
      targetRotation.y += 0.003;
    }

    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

    mainGroup.rotation.x = currentRotation.x;
    mainGroup.rotation.y = currentRotation.y;

    // Smooth Explode Animation Lerp
    currentExplodeFactor += (targetExplodeFactor - currentExplodeFactor) * 0.06;

    // Rotate Spur Gears & Apply Exploded Offset
    const baseSpeed = 0.02 * speedMultiplier;
    gears.forEach(g => {
      g.mesh.rotation.z += baseSpeed * g.speed;

      // Explode translation
      if (g.explodeOffset) {
        g.mesh.position.x = g.normalPos.x + g.explodeOffset.x * currentExplodeFactor;
        g.mesh.position.y = g.normalPos.y + g.explodeOffset.y * currentExplodeFactor;
        g.mesh.position.z = g.normalPos.z + g.explodeOffset.z * currentExplodeFactor;
      }
    });

    // Rotate Planetary Gears
    planetaryGears.forEach(pg => {
      pg.mesh.rotation.z += baseSpeed * pg.speed;
    });

    // Rotate Particles
    if (particles) {
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
    }

    renderer.render(scene, camera);
  }

  // Initialize once DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DGearbox);
  } else {
    init3DGearbox();
  }
})();

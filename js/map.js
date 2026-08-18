/**
 * GEARBOX GIANTS - REGIONAL HUBS MAP & POSTCODE DISTANCE SORTING ENGINE
 * Exclusively displays and sorts the 6 UK Regional Centres by distance from postcode
 */

(function () {
  'use strict';

  // The 6 Official UK Regional Hubs
  const REGIONS_DATA = [
    {
      id: "london",
      name: "Greater London",
      sub: "Super Centres & Dedicated Hubs",
      badge: "25–40m",
      lat: 51.515,
      lng: -0.280,
      townsHtml: `
        <li><strong>West London:</strong> Harrow • Uxbridge • Wembley</li>
        <li><strong>North London:</strong> Barnet • Enfield • Edgware</li>
        <li><strong>East London:</strong> Romford • Stratford • Ilford</li>
        <li><strong>South London:</strong> Croydon • Richmond • Bromley</li>
      `,
      primaryBtnHtml: `<a href="location-london.html" class="btn btn-primary btn-sm btn-full">View West London Page →</a>`,
      quoteRegion: "London"
    },
    {
      id: "berkshire",
      name: "Berkshire & Surrey",
      sub: "Specialist Workshop Hubs",
      badge: "30–45m",
      lat: 51.454,
      lng: -0.978,
      townsHtml: `
        <li>Reading • Slough • Bracknell</li>
        <li>Guildford • Woking • Camberley</li>
        <li>Berkshire County Network</li>
      `,
      primaryBtnHtml: `<button class="btn btn-primary btn-sm btn-full" onclick="window.openQuoteModal('Berkshire')">Get Berkshire Quote →</button>`,
      quoteRegion: "Berkshire/Surrey"
    },
    {
      id: "south",
      name: "Hampshire & Sussex",
      sub: "Coastal & Southern Depots",
      badge: "35–50m",
      lat: 50.909,
      lng: -1.404,
      townsHtml: `
        <li>Southampton • Basingstoke • Aldershot</li>
        <li>Farnborough • Crawley • Brighton</li>
        <li>East & West Sussex Coverage</li>
      `,
      primaryBtnHtml: `<button class="btn btn-primary btn-sm btn-full" onclick="window.openQuoteModal('South Coast')">Get South Coast Quote →</button>`,
      quoteRegion: "Hampshire/Sussex"
    },
    {
      id: "east",
      name: "Essex & East Anglia",
      sub: "Eastern Transmission Centres",
      badge: "40–55m",
      lat: 51.735,
      lng: 0.468,
      townsHtml: `
        <li>Chelmsford • Essex County</li>
        <li>Cambridge • Cambridgeshire Hub</li>
        <li>Kent • Ashford Depot</li>
      `,
      primaryBtnHtml: `<button class="btn btn-primary btn-sm btn-full" onclick="window.openQuoteModal('East Anglia')">Get East Anglia Quote →</button>`,
      quoteRegion: "Essex/East Anglia"
    },
    {
      id: "oxford",
      name: "Oxfordshire & Bucks",
      sub: "Midlands Corridor Hubs",
      badge: "35–50m",
      lat: 51.752,
      lng: -1.257,
      townsHtml: `
        <li>Oxford • Oxfordshire Hub</li>
        <li>Aylesbury • Buckinghamshire</li>
        <li>Watford • Hertfordshire</li>
      `,
      primaryBtnHtml: `<button class="btn btn-primary btn-sm btn-full" onclick="window.openQuoteModal('Oxfordshire')">Get Oxfordshire Quote →</button>`,
      quoteRegion: "Oxford/Bucks"
    },
    {
      id: "midlands",
      name: "Bedfordshire & North",
      sub: "Northern Reach Depots",
      badge: "40–55m",
      lat: 52.138,
      lng: -0.466,
      townsHtml: `
        <li>Bedfordshire County Centre</li>
        <li>Northamptonshire Regional Hub</li>
        <li>Full M1 / A1 Recovery Service</li>
      `,
      primaryBtnHtml: `<button class="btn btn-primary btn-sm btn-full" onclick="window.openQuoteModal('Midlands')">Get Midlands Quote →</button>`,
      quoteRegion: "Bedfordshire/Northampton"
    }
  ];

  // Approximate coordinates for UK Outward Postcodes (instant local fallback)
  const OUTWARD_POSTCODES = {
    "SW1": [51.498, -0.140], "SW2": [51.450, -0.120], "SW3": [51.490, -0.165], "SW4": [51.460, -0.145],
    "SW6": [51.475, -0.200], "SW19": [51.420, -0.205], "W1": [51.515, -0.145], "W2": [51.515, -0.180],
    "W3": [51.510, -0.260], "W4": [51.490, -0.260], "W5": [51.515, -0.305], "W12": [51.510, -0.225],
    "NW1": [51.535, -0.145], "NW3": [51.555, -0.175], "NW4": [51.585, -0.225], "NW9": [51.590, -0.250],
    "N1": [51.540, -0.100], "N4": [51.570, -0.105], "N12": [51.615, -0.175], "N20": [51.645, -0.170],
    "E1": [51.515, -0.060], "E2": [51.530, -0.060], "E14": [51.505, -0.020], "E15": [51.540, 0.000],
    "SE1": [51.500, -0.090], "SE10": [51.485, 0.000], "SE16": [51.495, -0.050], "SE21": [51.445, -0.085],
    "EC1": [51.525, -0.100], "EC2": [51.520, -0.085], "WC1": [51.525, -0.125], "WC2": [51.515, -0.125],
    "UB1": [51.505, -0.345], "UB8": [51.545, -0.475], "HA0": [51.555, -0.300], "HA1": [51.580, -0.335],
    "EN1": [51.650, -0.080], "EN2": [51.665, -0.110], "CR0": [51.375, -0.095], "CR2": [51.350, -0.080],
    "TW1": [51.445, -0.335], "TW3": [51.470, -0.360], "TW9": [51.465, -0.305], "KT1": [51.410, -0.300],
    "KT2": [51.425, -0.285], "SM1": [51.365, -0.195], "BR1": [51.405, 0.020], "BR2": [51.385, 0.030],
    "RM1": [51.575, 0.180], "RM7": [51.570, 0.165], "IG1": [51.560, 0.075], "IG2": [51.580, 0.085],
    "DA1": [51.445, 0.195], "DA5": [51.440, 0.135], "RG1": [51.455, -0.975], "RG2": [51.425, -0.970],
    "RG4": [51.475, -0.965], "RG12": [51.415, -0.750], "RG42": [51.435, -0.750], "SL1": [51.510, -0.600],
    "SL2": [51.530, -0.590], "SL4": [51.480, -0.610], "SL6": [51.520, -0.720], "GU1": [51.240, -0.570],
    "GU2": [51.245, -0.600], "GU15": [51.340, -0.740], "GU21": [51.320, -0.560], "GU22": [51.305, -0.550],
    "SO14": [50.905, -1.400], "SO15": [50.915, -1.425], "SO16": [50.940, -1.440], "RG21": [51.265, -1.085],
    "GU14": [51.295, -0.750], "GU11": [51.250, -0.760], "PO1": [50.798, -1.090], "BN1": [50.835, -0.140],
    "RH10": [51.115, -0.180], "RH11": [51.110, -0.210], "CM1": [51.740, 0.470], "CM2": [51.725, 0.485],
    "CB1": [52.195, 0.140], "CB2": [52.175, 0.130], "ME1": [51.385, 0.505], "TN1": [51.135, 0.265],
    "TN23": [51.140, 0.865], "CO1": [51.890, 0.900], "OX1": [51.750, -1.255], "OX2": [51.770, -1.270],
    "OX3": [51.765, -1.215], "OX4": [51.735, -1.225], "HP19": [51.825, -0.825], "HP20": [51.815, -0.805],
    "WD17": [51.660, -0.395], "WD18": [51.650, -0.405], "NN1": [52.240, -0.895], "NN2": [52.260, -0.890],
    "MK1": [52.005, -0.730], "MK9": [52.040, -0.760], "LU1": [51.875, -0.420], "MK40": [52.140, -0.470],
    "AL1": [51.750, -0.335], "AL10": [51.765, -0.225]
  };

  let map;
  let regionMarkers = {};
  let userMarker = null;
  let routingLine = null;

  // Haversine Distance in Miles
  function calculateDistanceMiles(lat1, lon1, lat2, lon2) {
    const R = 3958.8;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function initMap() {
    const mapElement = document.getElementById('uk-coverage-map');
    if (!mapElement || typeof L === 'undefined') return;

    if (map) {
      map.remove();
    }

    // Centered over South England coverage
    map = L.map('uk-coverage-map', {
      center: [51.48, -0.45],
      zoom: 8,
      zoomControl: true,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>, &copy; OpenStreetMap',
      subdomains: 'abcd',
      maxZoom: 18
    }).addTo(map);

    // Coverage Area Outer Boundary Ring
    L.circle([51.48, -0.45], {
      color: '#f59e0b',
      fillColor: '#f59e0b',
      fillOpacity: 0.04,
      weight: 1.5,
      dashArray: '6, 12',
      radius: 95000
    }).addTo(map);

    // Place the 6 Regional Super Hub Markers on the Map
    regionMarkers = {};
    REGIONS_DATA.forEach(region => {
      const customIcon = L.divIcon({
        className: 'custom-gear-pin',
        html: `
          <div class="map-gear-marker" title="${region.name} Regional Centre">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const popupHtml = `
        <div class="map-hub-popup">
          <div class="map-popup-header">
            <span class="map-popup-badge">Regional Super Hub</span>
            <span class="map-popup-speed">${region.badge}</span>
          </div>
          <div class="map-popup-title">${region.name}</div>
          <div class="map-popup-sub">${region.sub} • Free Flatbed Recovery</div>
          <div class="map-popup-actions">
            <a href="tel:02080589668" class="btn-popup-call">0208 058 9668</a>
            <button onclick="window.openQuoteModal('${region.quoteRegion}')" class="btn-popup-quote">Quote</button>
          </div>
        </div>
      `;

      const marker = L.marker([region.lat, region.lng], { icon: customIcon })
        .bindPopup(popupHtml, { className: 'custom-leaflet-popup' })
        .addTo(map);

      regionMarkers[region.id] = marker;
    });

    renderRegionalCards(REGIONS_DATA);
    setupRegionFilterTabs();
    setupLocationSearch();
  }

  // Render the 6 Regional Cards in given order
  function renderRegionalCards(regionsList, userCoords = null) {
    const cardsGrid = document.getElementById('regional-cards-grid');
    if (!cardsGrid) return;

    let html = '';

    if (userCoords) {
      const nearest = regionsList[0];
      html += `
        <div class="distance-status-banner" style="grid-column: 1 / -1;">
          <div class="distance-status-text">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#f59e0b" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><path d="m10 15 5-3-5-3v6z"></path></svg>
            <span>Regions sorted by distance from <strong>${userCoords.formatted}</strong> • Closest Region: <strong>${nearest.name} (${nearest.distanceMiles.toFixed(1)} miles)</strong></span>
          </div>
          <button type="button" class="btn-distance-reset" onclick="window.resetLocationDistanceSort()">Reset / View All Regions ✕</button>
        </div>
      `;
    }

    regionsList.forEach((region, idx) => {
      const isClosest = userCoords && idx === 0;
      const distanceBadge = userCoords && region.distanceMiles !== undefined
        ? `<span class="distance-tag-pill">${region.distanceMiles.toFixed(1)} mi</span>`
        : `<span class="regional-hub-badge">${region.badge}</span>`;

      html += `
        <div class="regional-hub-card" data-region="${region.id}" style="${isClosest ? 'border-color: var(--amber-400); background: rgba(245,158,11,0.04);' : ''}">
          <div>
            <div class="regional-hub-header">
              <h3 class="regional-hub-title">${region.name}</h3>
              ${distanceBadge}
            </div>
            <div class="regional-hub-sub">${region.sub}</div>
            <ul class="regional-towns-list">
              ${region.townsHtml}
            </ul>
          </div>
          <div class="regional-hub-actions">
            ${userCoords
              ? `<button class="btn btn-primary btn-sm btn-full" onclick="window.openQuoteModal('${region.quoteRegion}', '', '', '${userCoords.formatted}')">Get Quote from ${userCoords.formatted} →</button>`
              : region.primaryBtnHtml
            }
            <button class="btn btn-secondary btn-sm btn-full" onclick="window.openQuoteModal('${region.quoteRegion}')">
              Get ${region.name} Quote
            </button>
          </div>
        </div>
      `;
    });

    cardsGrid.innerHTML = html;
  }

  function focusRegion(regionKey) {
    if (regionKey === 'all') {
      if (map) map.flyTo([51.48, -0.45], 8, { duration: 1.1 });
      return;
    }
    const region = REGIONS_DATA.find(r => r.id === regionKey);
    if (region && map) {
      map.flyTo([region.lat, region.lng], 10, { duration: 1.1 });
      if (regionMarkers[region.id]) {
        regionMarkers[region.id].openPopup();
      }
    }
  }

  function setupRegionFilterTabs() {
    const tabs = document.querySelectorAll('.region-tab-btn');

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const selectedRegion = this.dataset.region;

        if (selectedRegion === 'all') {
          renderRegionalCards(REGIONS_DATA);
        } else {
          const filtered = REGIONS_DATA.filter(r => r.id === selectedRegion);
          renderRegionalCards(filtered);
        }

        focusRegion(selectedRegion);
      });
    });
  }

  // Resolve Postcode Coordinates
  async function resolvePostcodeCoords(postcode) {
    const cleaned = postcode.trim().toUpperCase().replace(/\s+/g, '');
    if (!cleaned) return null;

    // 1. Check local outward prefix (instant fallback)
    for (let len = 4; len >= 2; len--) {
      const prefix = cleaned.substring(0, len);
      if (OUTWARD_POSTCODES[prefix]) {
        const [lat, lng] = OUTWARD_POSTCODES[prefix];
        if (cleaned.length >= 5) {
          fetchCoordsApi(cleaned);
        }
        return { lat, lng, formatted: postcode.toUpperCase() };
      }
    }

    // 2. Fetch from postcodes.io
    return await fetchCoordsApi(cleaned);
  }

  async function fetchCoordsApi(cleanedPostcode) {
    try {
      const res = await fetch(`https://api.postcodes.io/postcodes/${cleanedPostcode}`);
      const data = await res.json();
      if (data.status === 200 && data.result) {
        return {
          lat: data.result.latitude,
          lng: data.result.longitude,
          formatted: data.result.postcode
        };
      }
    } catch (e) {
      console.warn('Postcode lookup error:', e);
    }
    return null;
  }

  // Sort ONLY the 6 Regions by Postcode Distance
  async function sortByPostcodeDistance(postcodeStr) {
    const userCoords = await resolvePostcodeCoords(postcodeStr);
    if (!userCoords) return false;

    // Calculate distance to each of the 6 Regions
    const sortedRegions = REGIONS_DATA.map(region => {
      const dist = calculateDistanceMiles(userCoords.lat, userCoords.lng, region.lat, region.lng);
      return { ...region, distanceMiles: dist };
    }).sort((a, b) => a.distanceMiles - b.distanceMiles);

    const nearest = sortedRegions[0];

    // 1. Update Map UI
    if (map) {
      if (userMarker) map.removeLayer(userMarker);
      if (routingLine) map.removeLayer(routingLine);

      const userIcon = L.divIcon({
        className: 'custom-user-pin',
        html: `
          <div class="user-map-pin" title="Your Location (${userCoords.formatted})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      userMarker = L.marker([userCoords.lat, userCoords.lng], { icon: userIcon })
        .bindPopup(`<strong>Your Location:</strong> ${userCoords.formatted}<br>Closest Region: <strong>${nearest.name}</strong> (${nearest.distanceMiles.toFixed(1)} mi)`)
        .addTo(map);

      routingLine = L.polyline([[userCoords.lat, userCoords.lng], [nearest.lat, nearest.lng]], {
        color: '#f59e0b',
        weight: 3,
        dashArray: '6, 8',
        opacity: 0.85
      }).addTo(map);

      const bounds = L.latLngBounds([
        [userCoords.lat, userCoords.lng],
        [nearest.lat, nearest.lng],
        [sortedRegions[1].lat, sortedRegions[1].lng]
      ]);
      map.flyToBounds(bounds.pad(0.3), { duration: 1.2 });

      if (regionMarkers[nearest.id]) {
        setTimeout(() => regionMarkers[nearest.id].openPopup(), 1200);
      }
    }

    // 2. Render ONLY the 6 Regional Cards in sorted distance order
    renderRegionalCards(sortedRegions, userCoords);

    return true;
  }

  function resetLocationDistanceSort() {
    renderRegionalCards(REGIONS_DATA);

    if (map) {
      if (userMarker) { map.removeLayer(userMarker); userMarker = null; }
      if (routingLine) { map.removeLayer(routingLine); routingLine = null; }
      focusRegion('all');
    }

    const searchInput = document.getElementById('location-quick-search');
    if (searchInput) searchInput.value = '';

    const tabs = document.querySelectorAll('.region-tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    const allTab = document.querySelector('.region-tab-btn[data-region="all"]');
    if (allTab) allTab.classList.add('active');
  }

  function setupLocationSearch() {
    const searchInput = document.getElementById('location-quick-search');
    if (!searchInput) return;

    let debounceTimer;

    const handleSearch = async () => {
      const q = searchInput.value.trim();
      if (!q) {
        resetLocationDistanceSort();
        return;
      }

      // Check if query looks like a UK postcode (e.g. RG1, SW1A, OX1, etc.)
      const postcodePattern = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9]?[A-Z]{0,2}$/i;
      if (postcodePattern.test(q)) {
        const sorted = await sortByPostcodeDistance(q);
        if (sorted) return;
      }

      // Region name or town search fallback
      const qLower = q.toLowerCase();
      const filtered = REGIONS_DATA.filter(r =>
        r.name.toLowerCase().includes(qLower) ||
        r.townsHtml.toLowerCase().includes(qLower) ||
        r.sub.toLowerCase().includes(qLower)
      );

      if (filtered.length > 0) {
        renderRegionalCards(filtered);
        focusRegion(filtered[0].id);
      } else {
        renderRegionalCards(REGIONS_DATA);
      }
    };

    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(handleSearch, 300);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(debounceTimer);
        handleSearch();
      }
    });
  }

  // Global exposure
  window.focusRegion = focusRegion;
  window.sortByPostcodeDistance = sortByPostcodeDistance;
  window.resetLocationDistanceSort = resetLocationDistanceSort;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }
})();

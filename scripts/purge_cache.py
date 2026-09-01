import re, json

# 1. Clear vehicle_cache.json
with open('vehicle_cache.json', 'w') as f:
    json.dump({}, f, indent=2)

# 2. Update functions/api/vehicle-lookup.js
with open('functions/api/vehicle-lookup.js', 'r') as f:
    fn = f.read()

fn = fn.replace(
    "'Cache-Control': 'public, max-age=3600'",
    "'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0', 'Pragma': 'no-cache'"
)
with open('functions/api/vehicle-lookup.js', 'w') as f:
    f.write(fn)

# 3. Update js/quote.js
with open('js/quote.js', 'r') as f:
    q = f.read()

# Empty CURATED_PLATES
q = re.sub(r'const CURATED_PLATES = \{[\s\S]*?\};', 'const CURATED_PLATES = {};', q)

# Make executeRegLookup strictly live without local cache interception
new_lookup = """  async function executeRegLookup(value, scope = 'modal') {
    const resultElemId = scope === 'page' ? 'reg-lookup-result' : 'modal-reg-lookup-result';
    const resultElem = document.getElementById(resultElemId);
    if (!resultElem) return;

    const clean = (value || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!clean || clean.length < 3) {
      resultElem.innerHTML = '';
      const specSectionId = scope === 'page' ? 'vehicle-spec-section-page' : 'vehicle-spec-section';
      const specSection = document.getElementById(specSectionId);
      if (specSection) specSection.style.display = 'block';
      return;
    }

    // Show live querying state
    resultElem.innerHTML = `
      <div style="font-size:0.8rem; color:var(--amber-400); display:flex; align-items:center; gap:0.5rem; margin-top:0.4rem;">
        <span style="display:inline-block; animation:spin 1s linear infinite;"></span>
        <span>Querying live official DVSA MOT records for <strong>${formatUkPlate(clean)}</strong>...</span>
      </div>
    `;

    // Always query live DVSA API endpoint directly (no local cache)
    try {
      const res = await fetch('/api/vehicle-lookup?reg=' + encodeURIComponent(clean), {
        cache: 'no-store',
        headers: {
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache'
        }
      });
      if (res.ok) {
        const liveData = await res.json();
        if (liveData && liveData.found !== false && liveData.make && liveData.make !== 'UK Registered' && liveData.make !== 'Vehicle') {
          renderVehicleResult(liveData, clean, scope, true);
          syncVehicleToForm(liveData, scope);
          return;
        }
      }
    } catch (e) {
      console.warn("Live DVSA MOT API lookup note:", e);
    }

    // Not Found on official DVSA records
    renderNotFoundResult(clean, scope);
  }"""

q = re.sub(r'async function executeRegLookup\(value, scope = \'modal\'\) \{[\s\S]*?\n  \}', new_lookup, q)

# Disable saveActiveVehicle caching
q = re.sub(r'function saveActiveVehicle\(.*?\)\s*\{[\s\S]*?\}', 'function saveActiveVehicle(vehicle) { /* Cache disabled: strictly live */ }', q)

with open('js/quote.js', 'w') as f:
    f.write(q)

print('Successfully purged all local caching and enabled strictly live DVSA lookups!')

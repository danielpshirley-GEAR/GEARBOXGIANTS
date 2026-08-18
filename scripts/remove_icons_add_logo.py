#!/usr/bin/env python3
"""
Comprehensive icon cleanup:
- Adds gold brand gear logo SVG to ALL brand titles (Header, Mobile Drawer, Footer, Modals).
- Strips all phone icons (SVG paths, emojis) and all other decorative emoji icons (pins, flashes, gears, alerts, speakers, timers, etc.) across the entire site.
- Updates favicon to clean SVG vector gear.
"""

import os
import re
import glob

BASE_DIR = "/Users/danielshirley/.gemini/antigravity/scratch/gearbox-giants"

BRAND_SVG = '<svg class="brand-gear-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>'

FAVICON_SVG = 'href="data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23f59e0b\' stroke-width=\'2.2\'><circle cx=\'12\' cy=\'12\' r=\'3\'/><path d=\'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\'/></svg>"'

# 1. Update Generator Script
gen_script_path = os.path.join(BASE_DIR, "scripts/generate_location_pages.py")
if os.path.exists(gen_script_path):
    with open(gen_script_path, "r", encoding="utf-8") as f:
        gen = f.read()

    # Favicon update
    gen = re.sub(r'href="data:image/svg\+xml,[^"]+"', FAVICON_SVG, gen)
    
    # Remove phone SVG from header
    gen = re.sub(r'<a href="tel:02080589668" class="phone-link-clean"[^>]*>.*?<span>(0208 058 9668)</span>\s*</a>', r'<a href="tel:02080589668" class="phone-link-clean" aria-label="Call Gearbox Giants">\1</a>', gen, flags=re.DOTALL)
    
    # Remove all emojis
    for em in ["📞 ", "📞", "⚡ ", "⚡", "<span>⚙</span> ", "<span>⚙️</span> ", "⚠️ ", "⚠️", "⚙️ ", "⚙️", "⚙ ", "⚙", "⏱️ ", "⏱️", "🔊 ", "🔊", "🚨 ", "🚨", "<span>⚠️</span>", "<span>⚠️</span> "]:
        gen = gen.replace(em, "")
    
    # Ensure footer brand logo has gear SVG
    footer_logo_replacement = f'<a href="index.html" class="brand-logo" style="margin-bottom:1.25rem;">\n            {BRAND_SVG}\n            <span class="brand-title">Gearbox <span>GIANTS</span></span>\n          </a>'
    gen = re.sub(r'<a href="index\.html" class="brand-logo" style="margin-bottom:1\.25rem;">.*?<span class="brand-title">Gearbox <span>GIANTS</span></span>\s*</a>', footer_logo_replacement, gen, flags=re.DOTALL)
    
    # Ensure mobile drawer brand logo has gear SVG
    drawer_logo_replacement = f'<div class="brand-logo">\n          {BRAND_SVG}\n          <span class="brand-title" style="font-size:1.1rem;">Gearbox <span>GIANTS</span></span>\n        </div>'
    gen = re.sub(r'<div class="brand-logo">\s*<span style="font-size:1\.1rem; font-weight:800;">Gearbox <span style="color:var\(--amber-400\);">GIANTS</span></span>\s*</div>', drawer_logo_replacement, gen)
    gen = re.sub(r'<div class="brand-logo">\s*<span class="brand-title" style="font-size:1\.1rem;">Gearbox <span style="color:var\(--amber-400\);">GIANTS</span></span>\s*</div>', drawer_logo_replacement, gen)

    with open(gen_script_path, "w", encoding="utf-8") as f:
        f.write(gen)
    print("✅ generate_location_pages.py updated!")

# 2. Clean up all HTML files
html_files = glob.glob(os.path.join(BASE_DIR, "*.html"))
for fpath in html_files:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    # Favicon update
    content = re.sub(r'href="data:image/svg\+xml,[^"]+"', FAVICON_SVG, content)

    # Add logo SVG to footer brand-logo
    footer_logo_replacement = f'<a href="index.html" class="brand-logo" style="margin-bottom:1.25rem;">\n            {BRAND_SVG}\n            <span class="brand-title">Gearbox <span>GIANTS</span></span>\n          </a>'
    content = re.sub(r'<a href="index\.html" class="brand-logo" style="margin-bottom:1\.25rem;">\s*(?:<div class="logo-icon-wrapper">.*?</div>\s*)?(?:<svg class="brand-gear-icon".*?</svg>\s*)?<span class="brand-title">Gearbox <span>GIANTS</span></span>\s*</a>', footer_logo_replacement, content, flags=re.DOTALL)

    # Add logo SVG to mobile drawer brand-logo
    drawer_logo_replacement = f'<div class="brand-logo">\n          {BRAND_SVG}\n          <span class="brand-title" style="font-size:1.1rem;">Gearbox <span>GIANTS</span></span>\n        </div>'
    content = re.sub(r'<div class="brand-logo">\s*(?:<svg class="brand-gear-icon".*?</svg>\s*)?<span[^>]*>Gearbox <span[^>]*>GIANTS</span></span>\s*</div>', drawer_logo_replacement, content)

    # Remove SVG phone icon from header
    content = re.sub(r'<a href="tel:02080589668" class="phone-link-clean"[^>]*>.*?<span>(0208 058 9668)</span>\s*</a>', r'<a href="tel:02080589668" class="phone-link-clean" aria-label="Call Gearbox Giants">\1</a>', content, flags=re.DOTALL)

    # Remove all emojis
    for em in ["📞 ", "📞", "✉️ ", "✉️", "📍 ", "📍", "⚡ ", "⚡", "<span>⚙</span> ", "<span>⚙️</span> ", "<span>⚙</span>", "<span>⚙️</span>", "⚠️ ", "⚠️", "⚙️ ", "⚙️", "⚙ ", "⚙", "⏱️ ", "⏱️", "🔊 ", "🔊", "🚨 ", "🚨", "🔧 ", "🔧", "🛡️ ", "🛡️", "⛽ ", "⛽", "<span>⚠️</span>", "<span>⚠️</span> "]:
        content = content.replace(em, "")

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ {os.path.basename(fpath)} updated!")

# 3. Update JS files
js_files = ["js/quote.js", "js/fault-finder.js", "js/map.js", "js/gearbox3d.js"]
for js_name in js_files:
    js_path = os.path.join(BASE_DIR, js_name)
    if not os.path.exists(js_path):
        continue
    with open(js_path, "r", encoding="utf-8") as f:
        js_content = f.read()

    for em in ["📞 ", "📞", "✉️ ", "✉️", "📍 ", "📍", "⚡ ", "⚡", "⚠️ ", "⚠️", "⚙️ ", "⚙️", "⚙ ", "⚙", "⏱️ ", "⏱️", "🔊 ", "🔊", "🚨 ", "🚨", "🔧 ", "🔧", "🛡️ ", "🛡️", "⛽ ", "⛽"]:
        js_content = js_content.replace(em, "")

    # In fault-finder.js, remove icon property or set to empty
    js_content = re.sub(r'icon:\s*"[^"]*",?', 'icon: "",', js_content)

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"✅ {js_name} updated!")

print("\n🚀 Regenerating all 36 location pages with updated script...")
os.system(f"python3 {gen_script_path}")

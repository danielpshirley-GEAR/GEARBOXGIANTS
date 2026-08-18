#!/usr/bin/env python3
"""
Replace all corrupted/distorted gear SVGs with the flawless mathematical 8-tooth gear SVG.
Update CSS to ensure perfect rendering in both header and footer.
Regenerate all 36 location pages.
"""

import os
import re
import glob

BASE_DIR = "/Users/danielshirley/.gemini/antigravity/scratch/gearbox-giants"

PERFECT_GEAR_SVG = '<svg class="brand-gear-icon" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>'

# 1. Update CSS
css_file = os.path.join(BASE_DIR, "css/components.css")
with open(css_file, "r", encoding="utf-8") as f:
    css = f.read()

# Update .brand-logo & .brand-gear-icon in CSS
logo_css = """/* Brand Logo Styling */
.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 1.35rem;
  letter-spacing: -0.01em;
  color: #ffffff !important;
  text-decoration: none !important;
}

.brand-gear-icon {
  width: 26px !important;
  height: 26px !important;
  min-width: 26px !important;
  min-height: 26px !important;
  stroke: var(--amber-400) !important;
  fill: none !important;
  flex-shrink: 0 !important;
  display: inline-block !important;
  vertical-align: middle !important;
}

.brand-title {
  font-size: 1.3rem;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  color: #ffffff !important;
  letter-spacing: 0.02em;
}

.brand-title span {
  color: var(--amber-400) !important;
}"""

css = re.sub(r'/\* Left-Aligned Brand Logo[^*]*\*/.*?\.brand-title\s+span\s*\{[^}]*\}', logo_css, css, flags=re.DOTALL)
css = re.sub(r'/\* Brand Logo Styling \*/.*?\.brand-title\s+span\s*\{[^}]*\}', logo_css, css, flags=re.DOTALL)

with open(css_file, "w", encoding="utf-8") as f:
    f.write(css)
print("✅ components.css updated with bulletproof brand logo styling!")

# 2. Update Generator Script
gen_script_path = os.path.join(BASE_DIR, "scripts/generate_location_pages.py")
with open(gen_script_path, "r", encoding="utf-8") as f:
    gen = f.read()

gen = re.sub(r'<svg class="brand-gear-icon".*?</svg>', PERFECT_GEAR_SVG, gen, flags=re.DOTALL)

with open(gen_script_path, "w", encoding="utf-8") as f:
    f.write(gen)
print("✅ generate_location_pages.py updated with perfect gear SVG!")

# 3. Update all HTML files
html_files = glob.glob(os.path.join(BASE_DIR, "*.html"))
for fpath in html_files:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace any brand-gear-icon SVG with the perfect one
    content = re.sub(r'<svg class="brand-gear-icon".*?</svg>', PERFECT_GEAR_SVG, content, flags=re.DOTALL)
    
    # Also in mobile drawer
    content = re.sub(r'<div class="brand-logo">\s*<div class="logo-icon-wrapper"[^>]*>.*?</div>\s*<span[^>]*>Gearbox <span[^>]*>GIANTS</span></span>\s*</div>', f'<div class="brand-logo">{PERFECT_GEAR_SVG}<span class="brand-title" style="font-size:1.1rem;">Gearbox <span>GIANTS</span></span></div>', content, flags=re.DOTALL)

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ {os.path.basename(fpath)} updated with perfect gear SVG!")

# 4. Regenerate all location pages
os.system(f"python3 {gen_script_path}")
print("🎉 All pages regenerated and synced!")

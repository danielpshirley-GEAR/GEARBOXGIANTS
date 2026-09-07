#!/usr/bin/env python3
"""
GEARBOX GIANTS — PUBLIC ASSET BUILDER FOR CLOUDFLARE WORKERS
Copies all legitimate public web assets (HTML, CSS, JS, assets, admin templates) into ./public
Strictly excludes all private, internal, server, script, report, and credential files.
"""

import os
import shutil

WORKSPACE = '/Users/danielshirley/.gemini/antigravity/scratch/gearbox-giants'
PUBLIC_DIR = os.path.join(WORKSPACE, 'public')

EXCLUDE_PATTERNS = [
    '.git',
    '.github',
    '.wrangler',
    '.env',
    'config.json',
    'config.example.json',
    'server.py',
    'requirements.txt',
    'Dockerfile',
    'Procfile',
    'render.yaml',
    'integrations',
    'scripts',
    'reports',
    'vehicle_cache.json',
    'worker.js',
    'wrangler.toml',
    'DESIGN.md',
    'PRODUCT.md',
    'quarantined_case_studies.json',
    '__pycache__',
    '.DS_Store'
]

def should_exclude(rel_path):
    parts = rel_path.split(os.sep)
    for p in parts:
        if p in EXCLUDE_PATTERNS or p.endswith('.py') or p.endswith('.pyc'):
            return True
    return False

def build_public_assets():
    print(f"Building clean public assets in: {PUBLIC_DIR}")
    if os.path.exists(PUBLIC_DIR):
        shutil.rmtree(PUBLIC_DIR)
    os.makedirs(PUBLIC_DIR, exist_ok=True)
    
    # 1. Copy top-level public files
    public_top_extensions = ('.html', '.txt', '.xml', '.nojekyll')
    copied_count = 0
    
    for item in os.listdir(WORKSPACE):
        if item == 'public':
            continue
        item_path = os.path.join(WORKSPACE, item)
        
        if os.path.isfile(item_path):
            if any(item.endswith(ext) for ext in public_top_extensions) and not should_exclude(item):
                dest = os.path.join(PUBLIC_DIR, item)
                shutil.copy2(item_path, dest)
                copied_count += 1
                
        elif os.path.isdir(item_path):
            if item in ['css', 'js', 'assets', 'services', 'faults', 'gearboxes', 'fault-finding', 'admin']:
                dest_dir = os.path.join(PUBLIC_DIR, item)
                shutil.copytree(
                    item_path,
                    dest_dir,
                    ignore=shutil.ignore_patterns('*.py', '*.pyc', '__pycache__', '.DS_Store', '*.log', '*.sh')
                )
                copied_count += len(os.listdir(dest_dir))
                
    print(f"Successfully staged public directory with all web assets (excluding all internal/private files).")

if __name__ == '__main__':
    build_public_assets()

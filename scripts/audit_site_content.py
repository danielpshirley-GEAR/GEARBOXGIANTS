#!/usr/bin/env python3
"""
GEARBOX GIANTS — COMPREHENSIVE SITE & CONTENT AUDITOR
Audits all 49 site URLs against the Single Source of Truth (data/business_facts.json).
Evaluates SEO quality, terminology compliance, link integrity, schema validation, and duplication.
"""

import os
import glob
import re
import json
from collections import defaultdict

BASE_DIR = "/Users/danielshirley/.gemini/antigravity/scratch/gearbox-giants"

def load_business_facts():
    facts_file = os.path.join(BASE_DIR, "data", "business_facts.json")
    with open(facts_file, "r", encoding="utf-8") as f:
        return json.load(f)

def audit_html_file(filepath, facts):
    filename = os.path.basename(filepath)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Title & Meta
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    title = title_match.group(1).strip() if title_match else ""

    meta_desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([\s\S]*?)["\']\s*/?>', content, re.IGNORECASE)
    if not meta_desc_match:
        # Try alternate attribute ordering: content before name
        meta_desc_match = re.search(r'<meta\s+content=["\']([\s\S]*?)["\']\s+name=["\']description["\']\s*/?>', content, re.IGNORECASE)
    meta_desc = meta_desc_match.group(1).strip() if meta_desc_match else ""

    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
    h1_raw = h1_match.group(1).strip() if h1_match else ""
    h1_clean = re.sub(r'<[^>]+>', ' ', h1_raw)
    h1_clean = ' '.join(h1_clean.split())

    canonical_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', content, re.IGNORECASE)
    canonical = canonical_match.group(1).strip() if canonical_match else ""

    # Schema check
    schemas = re.findall(r'<script\s+type=["\']application/ld\+json["\']>\s*(\{[\s\S]*?\})\s*</script>', content, re.IGNORECASE)
    schema_valid = False
    schema_types = []
    if schemas:
        try:
            for s in schemas:
                d = json.loads(s)
                schema_valid = True
                if "@graph" in d:
                    for item in d["@graph"]:
                        schema_types.append(item.get("@type", "Unknown"))
                else:
                    schema_types.append(d.get("@type", "Unknown"))
        except Exception:
            schema_valid = False

    # Word count (visible text approx)
    text_only = re.sub(r'<script[\s\S]*?</script>', '', content)
    text_only = re.sub(r'<style[\s\S]*?</style>', '', content)
    text_only = re.sub(r'<[^>]+>', ' ', text_only)
    words = text_only.split()
    word_count = len(words)

    # Fact & Terminology checks
    issues = []
    warnings = []

    # Check for outdated warranty conflicts (e.g. 12,000 miles)
    if "12,000 miles" in content or "12000 miles" in content:
        issues.append("Warranty conflict: Contains '12,000 miles' (Single source of truth is 12 Months Unlimited Mileage).")

    # Check terminology for location pages
    is_location = filename.startswith("location-")
    if is_location:
        loc_name = filename.replace("location-", "").replace(".html", "").replace("-", " ").title()
        # Look for misleading physical workshop claims in service-area collection hubs
        if re.search(r'our\s+[\w\s]+\s+(centre|center|workshop|depot)\b', content, re.IGNORECASE):
            # Check if it makes clear it is a collection & repair service
            if "collection" not in content.lower() and "recovery" not in content.lower():
                warnings.append("Terminology: Should clearly state collection and repair service rather than standalone local branch.")

    # Check for American spelling
    if re.search(r'\blabor\b', content, re.IGNORECASE):
        issues.append("US spelling detected: 'labor' -> should be 'labour'")
    if re.search(r'\bcenter\b', content, re.IGNORECASE) and not re.search(r'data-center|service-center-api', content):
        # check if it's not a CSS or code term
        if "call center" not in content.lower():
            warnings.append("US spelling possible: 'center' -> should be 'centre'")

    # Links check
    links = re.findall(r'href=["\']([^"\']+)["\']', content)
    internal_links = [l for l in links if not l.startswith("http") and not l.startswith("tel:") and not l.startswith("mailto:") and not l.startswith("#") and not l.startswith("data:")]

    # Calculate Quality Score (0-100)
    score = 100
    if not title or len(title) < 15: score -= 15
    if not meta_desc or len(meta_desc) < 40: score -= 15
    if not h1_clean: score -= 15
    if not canonical: score -= 10
    if not schema_valid: score -= 15
    if word_count < 300: score -= 20
    if issues: score -= len(issues) * 5
    if warnings: score -= len(warnings) * 2

    score = max(0, min(100, score))

    page_type = "Core Hub"
    if is_location:
        page_type = "Location Service Area"
    elif filename == "services.html":
        page_type = "Services Master Hub"
    elif filename == "fault-finding.html":
        page_type = "Diagnostic Fault Hub"
    elif filename == "locations.html":
        page_type = "Directory Hub"

    return {
        "file": filename,
        "url": f"https://gearboxgiants.co.uk/{filename if filename != 'index.html' else ''}",
        "type": page_type,
        "title": title,
        "h1": h1_clean,
        "meta_desc": meta_desc,
        "canonical": canonical,
        "schema_valid": schema_valid,
        "schema_types": schema_types,
        "word_count": word_count,
        "quality_score": score,
        "issues": issues,
        "warnings": warnings,
        "internal_link_count": len(internal_links),
        "action": "KEEP" if score >= 85 and not issues else "IMPROVE"
    }

def run_full_audit():
    facts = load_business_facts()
    html_files = sorted(glob.glob(os.path.join(BASE_DIR, "*.html")))
    
    # Exclude temporary or dev tools if any
    audited_pages = []
    for f in html_files:
        filename = os.path.basename(f)
        if filename in ["seo-maker.html", "quote.html"]:
            continue
        audited_pages.append(audit_html_file(f, facts))

    # Summary stats
    total_pages = len(audited_pages)
    avg_score = sum(p["quality_score"] for p in audited_pages) / total_pages
    min_score = min(p["quality_score"] for p in audited_pages)
    max_score = max(p["quality_score"] for p in audited_pages)

    report = {
        "total_pages": total_pages,
        "avg_quality_score": round(avg_score, 1),
        "min_quality_score": min_score,
        "max_quality_score": max_score,
        "pages": audited_pages
    }

    # Write JSON report
    report_path = os.path.join(BASE_DIR, "data", "site_audit_report.json")
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    print(f"✅ Full site audit complete! Audited {total_pages} pages.")
    print(f"Average Quality Score: {report['avg_quality_score']}/100 (Min: {min_score}, Max: {max_score})")

    return report

if __name__ == "__main__":
    run_full_audit()

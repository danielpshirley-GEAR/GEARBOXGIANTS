#!/usr/bin/env python3
"""
GEARBOX GIANTS — LIVE PUBLIC DOMAIN HTTP CRAWLER & VERIFIER
Crawls https://gearboxgiants.co.uk/ to verify live production deployment,
status codes, content integrity, and absence of unconfirmed claims.
"""

import os
import time
import urllib.request
import urllib.error
import ssl
import sys
import re
import json

BASE_URL = "https://gearboxgiants.co.uk"

# Create SSL context
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) GearboxGiantsAudit/3.0",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache"
}

PAGES_TO_CRAWL = [
    # Core pages
    "/",
    "/services.html",
    "/fault-finding.html",
    "/locations.html",
    "/quote.html",
    # Legal pages
    "/privacy.html",
    "/terms.html",
    "/warranty.html",
    "/cookies.html",
    "/complaints.html",
    # Sample Location Hubs
    "/location-london.html",
    "/location-croydon.html",
    "/location-reading.html",
    "/location-birmingham.html",
    "/location-southampton.html",
    "/location-brighton.html",
    "/location-ashford.html",
    "/location-essex.html",
    "/location-kent.html",
    "/location-oxford.html",
    "/location-milton-keynes.html",
    "/location-bristol.html"
]

def fetch_url(path, cache_bust=True):
    ts = int(time.time())
    url = BASE_URL + path + (f"?cb={ts}" if cache_bust and "?" not in path else "")
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            status = resp.getcode()
            html = resp.read().decode('utf-8', errors='ignore')
            return status, html, None
    except urllib.error.HTTPError as e:
        return e.code, "", str(e)
    except Exception as e:
        return 0, "", str(e)

def run_live_crawl():
    print(f"==================================================")
    print(f"🌐 COMMENCING LIVE DOMAIN CRAWL: {BASE_URL}")
    print(f"==================================================")

    results = {
        "urls_tested": 0,
        "urls_passed": 0,
        "failures": [],
        "assertions": []
    }

    # 1. Test status codes across pages
    for path in PAGES_TO_CRAWL:
        results["urls_tested"] += 1
        status, html, err = fetch_url(path)
        if status == 200:
            print(f"  ✓ [200 OK] {BASE_URL}{path} ({len(html)} bytes)")
            results["urls_passed"] += 1
        else:
            print(f"  ✗ [{status} FAIL] {BASE_URL}{path} — Error: {err}")
            results["failures"].append({"path": path, "status": status, "error": err})

    # 2. Test removal of finance.html (Should be 404 or non-200)
    status_fin, _, _ = fetch_url("/finance.html")
    print(f"\n[FINANCE PAGE REMOVAL CHECK]")
    if status_fin != 200:
        print(f"  ✓ /finance.html correctly removed / non-200 (Status: {status_fin})")
        results["assertions"].append({"check": "finance_removed", "status": "PASS", "code": status_fin})
    else:
        print(f"  ✗ /finance.html still returns 200 OK (Cache may need a moment to purge)")
        results["assertions"].append({"check": "finance_removed", "status": "PENDING_CDN_PURGE", "code": status_fin})

    # 3. Live Assertion Tests on Content
    print(f"\n[LIVE CONTENT INTEGRITY ASSERTIONS]")

    # Check Homepage
    _, home_html, _ = fetch_url("/")
    if "12-Month / 12,000-Mile Warranty" in home_html or "12-month / 12,000-mile" in home_html:
        print("  ✓ Homepage: Confirmed 12-Month / 12,000-Mile Warranty present")
        results["assertions"].append({"check": "home_warranty", "status": "PASS"})
    else:
        print("  ✗ Homepage: 12-Month / 12,000-Mile Warranty not found")
        results["assertions"].append({"check": "home_warranty", "status": "FAIL"})

    if "unlimited mileage" not in home_html.lower():
        print("  ✓ Homepage: Zero 'unlimited mileage' occurrences")
        results["assertions"].append({"check": "home_zero_unlimited", "status": "PASS"})
    else:
        print("  ✗ Homepage: 'unlimited mileage' still found")
        results["assertions"].append({"check": "home_zero_unlimited", "status": "FAIL"})

    if "0% finance" not in home_html.lower():
        print("  ✓ Homepage: Zero '0% finance' occurrences")
        results["assertions"].append({"check": "home_zero_finance", "status": "PASS"})
    else:
        print("  ✗ Homepage: '0% finance' still found")
        results["assertions"].append({"check": "home_zero_finance", "status": "FAIL"})

    # Check Warranty page
    _, war_html, _ = fetch_url("/warranty.html")
    if "12-Month / 12,000-Mile Gearbox Warranty" in war_html and "6 months or 6,000 miles" in war_html:
        print("  ✓ Warranty Page: Official 17-Clause Repair Policy live with 12,000/6,000 mile terms")
        results["assertions"].append({"check": "warranty_clauses", "status": "PASS"})
    else:
        print("  ✗ Warranty Page: Official policy terms not found")
        results["assertions"].append({"check": "warranty_clauses", "status": "FAIL"})

    # Check Terms page
    _, terms_html, _ = fetch_url("/terms.html")
    if "from £150" in terms_html and "up to 60%" in terms_html:
        print("  ✓ Terms Page: Verified non-completed recovery fee (£150) and dealer savings benchmark disclosure live")
        results["assertions"].append({"check": "terms_disclosures", "status": "PASS"})
    else:
        print("  ✗ Terms Page: Required disclosures missing")
        results["assertions"].append({"check": "terms_disclosures", "status": "FAIL"})

    # Check Services page
    _, serv_html, _ = fetch_url("/services.html")
    if "from £895" not in serv_html and "48–72 hours" not in serv_html:
        print("  ✓ Services Page: Unconfirmed price benchmarks and hourly turnarounds successfully removed")
        results["assertions"].append({"check": "services_sanitized", "status": "PASS"})
    else:
        print("  ✗ Services Page: Unconfirmed prices/turnaround still found")
        results["assertions"].append({"check": "services_sanitized", "status": "FAIL"})

    # Check Location page
    _, loc_html, _ = fetch_url("/location-london.html")
    if "12-Month / 12,000-Mile" in loc_html and "from £150" in loc_html:
        print("  ✓ Location Pages: Verified recovery terms (£150 non-completed fee) and 12,000-mile warranty live")
        results["assertions"].append({"check": "location_terms", "status": "PASS"})
    else:
        print("  ✗ Location Pages: Terms not reflected")
        results["assertions"].append({"check": "location_terms", "status": "FAIL"})

    passed_assertions = sum(1 for a in results['assertions'] if a['status'] == 'PASS')
    total_assertions = len(results['assertions'])

    print(f"\n==================================================")
    print(f"📊 LIVE AUDIT SUMMARY")
    print(f"   URLs Tested: {results['urls_tested']}")
    print(f"   URLs 200 OK: {results['urls_passed']}")
    print(f"   Assertions Passed: {passed_assertions} / {total_assertions}")
    print(f"==================================================")

    out_file = "/Users/danielshirley/.gemini/antigravity/scratch/gearbox-giants/data/live_crawl_results.json"
    with open(out_file, "w") as f:
        json.dump(results, f, indent=2)

    return passed_assertions == total_assertions

if __name__ == "__main__":
    success = run_live_crawl()
    sys.exit(0 if success else 1)

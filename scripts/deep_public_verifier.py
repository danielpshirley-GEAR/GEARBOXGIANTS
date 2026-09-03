#!/usr/bin/env python3
"""
Deep Live Public Domain Deployment Verification Engine for Gearbox Giants
Target: https://gearboxgiants.co.uk
Tests 100% of indexable routes in both .html and clean extensionless formats.
Follows all redirect chains, inspects cache headers, validates legal links,
and executes exhaustive assertions against prohibited/unverified claims.
"""

import urllib.request
import urllib.error
import urllib.parse
import ssl
import hashlib
import time
import json
import re
import sys

BASE_LIVE_URL = "https://gearboxgiants.co.uk"

# Master list of all 45 location slugs
LOCATION_SLUGS = [
    "location-london",
    "location-east-london",
    "location-south-london",
    "location-north-london",
    "location-croydon",
    "location-watford",
    "location-harrow",
    "location-enfield",
    "location-romford",
    "location-bromley",
    "location-uxbridge",
    "location-richmond",
    "location-barnet",
    "location-reading",
    "location-slough",
    "location-bracknell",
    "location-guildford",
    "location-woking",
    "location-camberley",
    "location-farnborough",
    "location-aldershot",
    "location-berkshire",
    "location-southampton",
    "location-brighton",
    "location-crawley",
    "location-basingstoke",
    "location-hampshire",
    "location-sussex",
    "location-chelmsford",
    "location-cambridge",
    "location-ashford",
    "location-essex",
    "location-kent",
    "location-oxford",
    "location-aylesbury",
    "location-bedfordshire",
    "location-northamptonshire",
    "location-birmingham",
    "location-milton-keynes",
    "location-portsmouth",
    "location-luton",
    "location-colchester",
    "location-maidstone",
    "location-swindon",
    "location-bristol"
]

CORE_PAGES = [
    "",
    "services",
    "fault-finding",
    "locations",
    "quote",
    "privacy",
    "terms",
    "warranty",
    "cookies",
    "complaints"
]

# Patterns that MUST NOT appear anywhere on live public HTML responses
PROHIBITED_PATTERNS = [
    (r"0%\s*finance", "0% Finance Claim"),
    (r"unlimited\s+mileage", "Unlimited Mileage Warranty Claim"),
    (r"25\+\s*specialist", "25+ Specialist Centres Counter"),
    (r"35\+\s*regional", "35+ Regional Centres Counter"),
    (r"37\s*regional", "37 Regional Centres Counter"),
    (r"25\+\s*uk\s*centres", "25+ UK Centres"),
    (r"specialist\s+centres\s+across", "Specialist Centres Directory"),
    (r"regional\s+centres\s+&\s+recovery\s+depots", "Regional Centres & Recovery Depots"),
    (r"local\s+depots", "Local Depots"),
    (r"workshop\s+hubs", "Workshop Hubs"),
    (r"super\s+centres", "Super Centres"),
    (r"dedicated\s+hubs", "Dedicated Hubs"),
    (r"collection\s+hubs", "Collection Hubs (Disallowed Term)"),
    (r"48[–-]72\s*hours?", "48–72 Hour Turnaround Claim"),
    (r"48[–-]72h", "48-72h Turnaround Claim"),
    (r"48\s*hours?\s+rebuild", "48-Hour Rebuild Claim"),
    (r"£795", "Fixed Price £795"),
    (r"£895", "Fixed Price £895"),
    (r"£950", "Fixed Price £950"),
    (r"£1,150", "Fixed Price £1,150"),
    (r"£1,195", "Fixed Price £1,195"),
    (r"specialist\s+labor\b", "US Spelling: specialist labor"),
    (r"\blabor\s+rates?\b", "US Spelling: labor rates"),
    (r"our\s+harrow\s+workshop", "Physical Hub Claim: Harrow Workshop"),
    (r"our\s+croydon\s+workshop", "Physical Hub Claim: Croydon Workshop"),
    (r"our\s+reading\s+workshop", "Physical Hub Claim: Reading Workshop"),
    (r"our\s+birmingham\s+workshop", "Physical Hub Claim: Birmingham Workshop"),
    (r"our\s+dyno\b", "In-house Dyno Ownership Claim")
]


class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def fetch_route_info(url, cache_bust=True):
    """
    Fetches a URL, traces redirects step-by-step, captures headers, response size, hash, and content.
    """
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    ts = int(time.time())
    parsed = urllib.parse.urlparse(url)
    if cache_bust:
        sep = "&" if parsed.query else "?"
        fetch_url = f"{url}{sep}audit={ts}"
    else:
        fetch_url = url

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
    }

    redirect_chain = []
    current_url = fetch_url
    max_redirects = 10
    final_status = None
    final_headers = {}
    content = ""

    for _ in range(max_redirects):
        req = urllib.request.Request(current_url, headers=headers)
        try:
            opener = urllib.request.build_opener(NoRedirectHandler)
            with opener.open(req, timeout=15) as resp:
                final_status = resp.getcode()
                final_headers = dict(resp.headers)
                content = resp.read().decode("utf-8", errors="replace")
                final_url = current_url
                break
        except urllib.error.HTTPError as e:
            if e.code in (301, 302, 303, 307, 308):
                redirect_target = e.headers.get("Location")
                redirect_chain.append({
                    "from": current_url,
                    "status": e.code,
                    "location": redirect_target
                })
                current_url = urllib.parse.urljoin(current_url, redirect_target)
            else:
                final_status = e.code
                final_headers = dict(e.headers)
                try:
                    content = e.read().decode("utf-8", errors="replace")
                except Exception:
                    content = ""
                final_url = current_url
                break
        except Exception as err:
            final_status = f"ERROR: {err}"
            final_url = current_url
            break

    # Clean query from final_url for reporting
    clean_final_url = urllib.parse.urljoin(final_url, urllib.parse.urlparse(final_url).path)

    md5_hash = hashlib.md5(content.encode("utf-8")).hexdigest() if content else ""

    return {
        "requested_url": url,
        "http_status": final_status,
        "redirect_chain": redirect_chain,
        "final_url": clean_final_url,
        "response_size": len(content),
        "response_hash": md5_hash,
        "cf_cache_status": final_headers.get("cf-cache-status", "N/A"),
        "cache_control": final_headers.get("cache-control", "N/A"),
        "etag": final_headers.get("etag", "N/A"),
        "last_modified": final_headers.get("last-modified", "N/A"),
        "content": content
    }


def test_legal_links(html_content, source_url):
    """
    Extracts footer legal links from HTML and validates that each resolves.
    """
    legal_names = ["Privacy Policy", "Terms & Conditions", "Terms of Service", "Warranty Terms", "Cookie Policy", "Complaints"]
    found_links = {}
    for name in legal_names:
        pattern = rf'<a[^>]+href="([^"]+)"[^>]*>[^<]*{re.escape(name)}'
        m = re.search(pattern, html_content, re.IGNORECASE)
        if m:
            found_links[name] = m.group(1)
    return found_links


def run_deep_verification():
    print("=" * 70)
    print("🌐 STARTING DEEP LIVE DEPLOYMENT CRAWL: https://gearboxgiants.co.uk")
    print("=" * 70)

    # Assemble all target routes: both clean extensionless and .html
    all_routes = []
    
    # Core pages
    for page in CORE_PAGES:
        if page == "":
            all_routes.append(f"{BASE_LIVE_URL}/")
            all_routes.append(f"{BASE_LIVE_URL}/index.html")
        else:
            all_routes.append(f"{BASE_LIVE_URL}/{page}")
            all_routes.append(f"{BASE_LIVE_URL}/{page}.html")

    # 45 Location pages
    for loc in LOCATION_SLUGS:
        all_routes.append(f"{BASE_LIVE_URL}/{loc}")
        all_routes.append(f"{BASE_LIVE_URL}/{loc}.html")

    # Plus finance.html check (should be 404)
    finance_url = f"{BASE_LIVE_URL}/finance.html"

    total_routes = len(all_routes)
    print(f"Total routes to crawl & assert: {total_routes} (+ 1 deletion check)")
    print("-" * 70)

    results = []
    violations = []
    passed_count = 0
    failed_count = 0

    for i, route in enumerate(all_routes, 1):
        info = fetch_route_info(route, cache_bust=True)
        status = info["http_status"]
        size = info["response_size"]
        cf_cache = info["cf_cache_status"]
        final_url = info["final_url"]

        # Run assertions against final response content
        route_violations = []
        if status == 200:
            content = info["content"]
            for pat, desc in PROHIBITED_PATTERNS:
                matches = re.findall(pat, content, re.IGNORECASE)
                if matches:
                    route_violations.append({
                        "pattern": desc,
                        "count": len(matches),
                        "sample": matches[:3]
                    })
                    violations.append({
                        "url": route,
                        "final_url": final_url,
                        "violation": desc,
                        "count": len(matches)
                    })

            # Check Warranty presence
            if "index" in final_url or final_url == f"{BASE_LIVE_URL}/" or "location-" in final_url:
                if not re.search(r"12-Month\s*/\s*12,000-Mile", content, re.IGNORECASE):
                    route_violations.append({
                        "pattern": "Missing required 12-Month / 12,000-Mile warranty phrase",
                        "count": 1
                    })

        if status == 200 and len(route_violations) == 0:
            passed_count += 1
            status_indicator = "✓ PASS"
        else:
            failed_count += 1
            status_indicator = "✗ FAIL"

        redirect_str = ""
        if info["redirect_chain"]:
            chain = " -> ".join([f"{r['status']} {r['location']}" for r in info["redirect_chain"]])
            redirect_str = f" [Redirected: {chain}]"

        print(f"[{i:03d}/{total_routes}] {status_indicator} [{status}] {route} -> {final_url} ({size} B, CF:{cf_cache}){redirect_str}")
        if route_violations:
            for v in route_violations:
                print(f"      ⚠️ VIOLATION: {v['pattern']} (x{v['count']})")

        # Save result (exclude full content from summary JSON for cleanliness)
        res_copy = dict(info)
        del res_copy["content"]
        res_copy["violations"] = route_violations
        results.append(res_copy)

    # Check /finance.html (must be 404)
    print("-" * 70)
    print("Checking /finance.html removal...")
    fin_info = fetch_route_info(finance_url, cache_bust=True)
    fin_status = fin_info["http_status"]
    if fin_status == 404:
        print(f"✓ PASS [/finance.html correctly returned 404 Not Found]")
    else:
        print(f"✗ FAIL [/finance.html returned {fin_status} instead of 404]")
        failed_count += 1

    # Legal links UI verification from core pages
    print("-" * 70)
    print("Verifying Rendered Legal Links from UI...")
    core_ui_samples = [f"{BASE_LIVE_URL}/", f"{BASE_LIVE_URL}/services.html", f"{BASE_LIVE_URL}/locations.html", f"{BASE_LIVE_URL}/location-london.html"]
    legal_checks_passed = True
    for sample_url in core_ui_samples:
        info = fetch_route_info(sample_url, cache_bust=True)
        legal_links = test_legal_links(info["content"], sample_url)
        print(f"  {sample_url}: Found {len(legal_links)} footer legal links: {list(legal_links.values())}")
        for link_name, link_target in legal_links.items():
            resolved = urllib.parse.urljoin(sample_url, link_target)
            link_info = fetch_route_info(resolved, cache_bust=True)
            if link_info["http_status"] != 200:
                print(f"    ✗ Legal link broken: {link_name} -> {resolved} returned {link_info['http_status']}")
                legal_checks_passed = False
            else:
                print(f"    ✓ {link_name} -> {link_info['final_url']} (200 OK)")

    # Save full audit record to JSON
    report_data = {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "target_domain": BASE_LIVE_URL,
        "total_routes_tested": total_routes,
        "routes_passed": passed_count,
        "routes_failed": failed_count,
        "finance_404_verified": (fin_status == 404),
        "legal_links_ui_verified": legal_checks_passed,
        "total_violations_found": len(violations),
        "violations": violations,
        "results": results
    }

    with open("/Users/danielshirley/.gemini/antigravity/scratch/gearbox-giants/data/deep_live_verification.json", "w", encoding="utf-8") as f:
        json.dump(report_data, f, indent=2)

    print("=" * 70)
    print("📊 DEEP LIVE DEPLOYMENT VERIFICATION SUMMARY")
    print(f"   Total Public Routes Tested: {total_routes}")
    print(f"   Routes Passed: {passed_count} / {total_routes}")
    print(f"   Routes Failed: {failed_count} / {total_routes}")
    print(f"   Prohibited Old-Claim Violations: {len(violations)}")
    print(f"   Legal Footer Links Resolution: {'PASS (100% OK)' if legal_checks_passed else 'FAIL'}")
    print(f"   Finance Page Purge: {'PASS (404 Confirmed)' if fin_status == 404 else 'FAIL'}")
    print("=" * 70)

    return passed_count == total_routes and len(violations) == 0 and fin_status == 404 and legal_checks_passed


if __name__ == "__main__":
    success = run_deep_verification()
    sys.exit(0 if success else 1)

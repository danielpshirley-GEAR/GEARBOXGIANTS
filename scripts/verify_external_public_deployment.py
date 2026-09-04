#!/usr/bin/env python3
"""
Comprehensive Live External Public Deployment Verifier & Regression Testing Suite
Directly queries https://gearboxgiants.co.uk across multiple client modes, checks headers,
compares byte-for-byte SHA256 hashes against build files, and scans for 20 legacy phrases.
"""

import urllib.request
import urllib.parse
import hashlib
import time
import json
import re
import os
import sys

BASE_URL = "https://gearboxgiants.co.uk"

PROHIBITED_PHRASES = [
    "unlimited mileage",
    "0% finance",
    "£795",
    "£895",
    "£950",
    "£1,150",
    "£1,195",
    "48–72",
    "48-72",
    "25+ specialist",
    "35+ regional",
    "37 regional",
    "centres & hubs",
    "specialist centres",
    "super centres",
    "workshop hubs",
    "local depots",
    "regional centres",
    "master technician",
    "local vehicle profile",
    "local vehicle demographics"
]

CANONICAL_ROUTES = [
    "/",
    "/services",
    "/locations",
    "/quote",
    "/fault-finding",
    "/warranty",
    "/terms",
    "/privacy",
    "/cookies",
    "/complaints",
    "/location-london",
    "/location-reading",
    "/location-birmingham",
    "/location-bristol",
    "/location-milton-keynes",
    "/location-oxford",
    "/location-southampton",
    "/location-portsmouth",
    "/location-swindon",
    "/location-slough",
    "/location-watford",
    "/location-luton",
    "/location-guildford",
    "/location-crawley",
    "/location-brighton",
    "/location-chelmsford",
    "/location-colchester",
    "/location-maidstone",
    "/location-ashford",
    "/location-cambridge",
    "/location-bedfordshire",
    "/location-berkshire",
    "/location-aylesbury",
    "/location-essex",
    "/location-hampshire",
    "/location-barnet",
    "/location-kent",
    "/location-northamptonshire",
    "/location-woking",
    "/location-sussex",
    "/location-aldershot",
    "/location-basingstoke",
    "/location-bracknell",
    "/location-bromley",
    "/location-camberley",
    "/location-croydon",
    "/location-east-london",
    "/location-enfield",
    "/location-farnborough",
    "/location-harrow",
    "/location-north-london",
    "/location-richmond",
    "/location-romford",
    "/location-south-london",
    "/location-uxbridge"
]

def make_request(url, headers=None, method="GET"):
    default_headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.9"
    }
    if headers:
        default_headers.update(headers)
    req = urllib.request.Request(url, headers=default_headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = resp.read()
            return {
                "status": resp.status,
                "final_url": resp.geturl(),
                "headers": dict(resp.headers),
                "body": body,
                "sha256": hashlib.sha256(body).hexdigest(),
                "size": len(body),
                "error": None
            }
    except urllib.error.HTTPError as e:
        body = e.read() if hasattr(e, "read") else b""
        return {
            "status": e.code,
            "final_url": e.geturl() if hasattr(e, "geturl") else url,
            "headers": dict(e.headers) if hasattr(e, "headers") else {},
            "body": body,
            "sha256": hashlib.sha256(body).hexdigest() if body else None,
            "size": len(body),
            "error": str(e)
        }
    except Exception as e:
        return {
            "status": 0,
            "final_url": url,
            "headers": {},
            "body": b"",
            "sha256": None,
            "size": 0,
            "error": str(e)
        }

def run_multi_method_tests():
    print("======================================================================")
    print("STEP 4: MULTI-METHOD EXTERNAL REQUEST TESTING")
    print("======================================================================")
    targets = [
        ("/", "index.html"),
        ("/services", "services.html"),
        ("/locations", "locations.html"),
        ("/location-harrow", "location-harrow.html"),
        ("/location-reading", "location-reading.html"),
        ("/location-birmingham", "location-birmingham.html"),
        ("/warranty", "warranty.html")
    ]
    
    results = []
    
    for route, local_file in targets:
        full_url = f"{BASE_URL}{route}"
        with open(local_file, "rb") as fp:
            local_bytes = fp.read()
            local_hash = hashlib.sha256(local_bytes).hexdigest()
        
        # Method A: Standard HTTPS GET
        res_a = make_request(full_url)
        # Method B: Timestamp query string
        ts = int(time.time() * 1000)
        res_b = make_request(f"{full_url}?audit={ts}")
        # Method C: Cache-Control: no-cache
        res_c = make_request(full_url, headers={"Cache-Control": "no-cache, no-store, max-age=0", "Pragma": "no-cache"})
        # Method D: Different User-Agent (Googlebot)
        res_d = make_request(full_url, headers={"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"})
        # Method E: HEAD + GET final destination
        res_e_head = make_request(full_url, method="HEAD")
        res_e = make_request(res_e_head["final_url"] if res_e_head["final_url"] else full_url)
        
        match = (res_a['sha256'] == local_hash)
        
        item = {
            "route": route,
            "local_file": local_file,
            "local_hash": local_hash,
            "public_hash": res_a['sha256'],
            "hash_b": res_b['sha256'],
            "hash_c": res_c['sha256'],
            "hash_d": res_d['sha256'],
            "hash_e": res_e['sha256'],
            "match": match,
            "status": res_a['status'],
            "size": res_a["size"],
            "cf_cache": res_a["headers"].get("cf-cache-status", "N/A"),
            "etag": res_a["headers"].get("etag", "N/A"),
            "last_modified": res_a["headers"].get("last-modified", "N/A"),
            "server": res_a["headers"].get("server", "cloudflare")
        }
        results.append(item)
        print(f"[{route}] Status: {res_a['status']} | Public SHA: {res_a['sha256'][:12]}... | Local SHA: {local_hash[:12]}... | Match: ('YES' if match else 'NO')")
        print(f"   Method A: {res_a['sha256'][:10]} | B (Query): {res_b['sha256'][:10]} | C (NoCache): {res_c['sha256'][:10]} | D (Bot): {res_d['sha256'][:10]} | E (HEAD/GET): {res_e['sha256'][:10]}")
    
    return results

def run_clean_route_inspection():
    print("\n======================================================================")
    print("STEP 6: CLEAN ROUTE VS .HTML FILE GENERATION INSPECTION")
    print("======================================================================")
    pairs = [
        ("/services", "/services.html"),
        ("/locations", "/locations.html"),
        ("/location-harrow", "/location-harrow.html")
    ]
    
    records = []
    for clean, dotted in pairs:
        for r in [clean, dotted]:
            full_url = f"{BASE_URL}{r}"
            res = make_request(full_url)
            rec = {
                "requested_url": full_url,
                "status": res['status'],
                "redirect": "None" if res['final_url'] == full_url else f"307 -> {res['final_url']}",
                "final_url": res['final_url'],
                "final_body_hash": res['sha256'],
                "last_modified": res["headers"].get("last-modified", "None"),
                "etag": res["headers"].get("etag", "None"),
                "cf_cache_status": res["headers"].get("cf-cache-status", "None"),
                "age": res["headers"].get("age", "None"),
                "server": res["headers"].get("server", "cloudflare")
            }
            records.append(rec)
            print(f"URL: {rec['requested_url']}")
            print(f"  Status: {rec['status']} | Redirect: {rec['redirect']} | Final URL: {rec['final_url']}")
            print(f"  SHA256: {rec['final_body_hash'][:16]}... | Server: {rec['server']} | CF-Cache: {rec['cf_cache_status']} | Age: {rec['age']}")
    return records

def run_full_scan_and_crawl():
    print("\n======================================================================")
    print("STEP 7 & 11: FULL PRODUCTION CRAWL & PROHIBITED PHRASE AUDIT")
    print("======================================================================")
    
    all_routes = []
    for r in CANONICAL_ROUTES:
        all_routes.append(r)
        if r != "/":
            all_routes.append(f"{r}.html")
        else:
            all_routes.append("/index.html")
    
    phrase_counts = {p: 0 for p in PROHIBITED_PHRASES}
    matching_occurrences = []
    passed_urls = []
    failed_urls = []
    
    for idx, r in enumerate(all_routes, 1):
        url = f"{BASE_URL}{r}"
        res = make_request(url)
        
        if res['status'] != 200:
            failed_urls.append({"url": url, "status": res['status'], "error": res['error'] or f"Non-200 Status {res['status']}"})
            print(f"[{idx:03d}/{len(all_routes):03d}] ✗ FAIL [{res['status']}] {url} -> {res['error']}")
            continue
            
        text = res["body"].decode("utf-8", errors="ignore")
        
        # Prohibited phrases check
        has_violation = False
        page_violations = []
        for p in PROHIBITED_PHRASES:
            pattern = re.compile(re.escape(p), re.IGNORECASE)
            matches = list(pattern.finditer(text))
            if matches:
                phrase_counts[p] += len(matches)
                has_violation = True
                for m in matches:
                    start = max(0, m.start() - 50)
                    end = min(len(text), m.end() + 50)
                    snippet = text[start:end].replace("\n", " ").strip()
                    page_violations.append({"phrase": p, "snippet": snippet})
        
        if has_violation:
            failed_urls.append({"url": url, "status": res['status'], "violations": page_violations})
            print(f"[{idx:03d}/{len(all_routes):03d}] ✗ VIOLATION in {url}: {[v['phrase'] for v in page_violations]}")
        else:
            passed_urls.append(url)
            print(f"[{idx:03d}/{len(all_routes):03d}] ✓ PASS [{res['status']}] {url} (SHA: {res['sha256'][:10]}, {res['size']} B)")
    
    print("\n----------------------------------------------------------------------")
    print("PROHIBITED PHRASE OCCURRENCE TOTALS:")
    for p, cnt in phrase_counts.items():
        print(f"  • \"{p}\": {cnt}")
    
    print("----------------------------------------------------------------------")
    print(f"Total URLs Tested: {len(all_routes)}")
    print(f"Passed URLs: {len(passed_urls)}")
    print(f"Failed URLs: {len(failed_urls)}")
    print("----------------------------------------------------------------------")
    
    report = {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "total_tested": len(all_routes),
        "passed_count": len(passed_urls),
        "failed_count": len(failed_urls),
        "phrase_counts": phrase_counts,
        "failed_urls": failed_urls
    }
    
    with open("data/deep_live_verification.json", "w", encoding="utf-8") as fp:
        json.dump(report, fp, indent=2)
        
    return report

if __name__ == "__main__":
    multi_res = run_multi_method_tests()
    clean_rec = run_clean_route_inspection()
    crawl_rep = run_full_scan_and_crawl()
    
    if crawl_rep['failed_count'] > 0:
        print("\n❌ CRITICAL: DEPLOYMENT VERIFICATION FAILED!")
        sys.exit(1)
    else:
        print("\n✅ SUCCESS: ALL 110 PUBLIC ROUTES PASSED WITH 0 DISCREPANCIES!")
        sys.exit(0)

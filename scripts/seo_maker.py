#!/usr/bin/env python3
"""
GEARBOX GIANTS - SEO MAKER & AUDIT TOOLKIT
Automates Meta Tags, JSON-LD Schema Generation, Sitemap Updates, and SEO Audits.
"""

import os
import re
import json
import glob
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://gearboxgiants.co.uk"

def generate_schema(page_type="local_business", data=None):
    """Generate valid JSON-LD Schema markup for Google Rich Snippets"""
    data = data or {}
    
    if page_type == "local_business":
        location_name = data.get("location", "London & South England")
        schema = {
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            "name": f"Gearbox Giants - {location_name}",
            "image": f"{DOMAIN}/assets/step_1_quote.jpg",
            "url": data.get("url", DOMAIN),
            "telephone": "+44 208 058 9668",
            "priceRange": "££",
            "description": data.get("description", "UK specialist gearbox repair, replacement and reconditioning with free nationwide recovery."),
            "address": {
                "@type": "PostalAddress",
                "addressLocality": location_name,
                "addressCountry": "GB"
            },
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    "opens": "09:00",
                    "closes": "18:00"
                }
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "342",
                "bestRating": "5",
                "worstRating": "1"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Transmission & Gearbox Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Gearbox Replacement",
                            "description": "Full gearbox replacement with OEM warranty"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Gearbox Reconditioning",
                            "description": "Complete ultrasonic clean, rebuild and tolerance calibration"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Clutch & Flywheel Repair",
                            "description": "Dual mass flywheel and friction plate repair"
                        }
                    }
                ]
            }
        }
        return schema

    elif page_type == "faq":
        faqs = data.get("faqs", [
            {
                "q": "How long does a gearbox repair take?",
                "a": "Most gearbox repairs and reconditioning jobs are completed within 48 to 72 hours, including collection, rebuilding, dyno testing, and delivery."
            },
            {
                "q": "Do you offer free vehicle collection?",
                "a": "Yes, Gearbox Giants provides complimentary collection and return delivery across London, South England, and nationwide."
            },
            {
                "q": "What warranty is included with the gearbox repair?",
                "a": "All our reconditioned and replacement gearboxes come with a comprehensive parts and labor warranty for complete peace of mind."
            }
        ])
        schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": item["q"],
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item["a"]
                    }
                } for item in faqs
            ]
        }
        return schema

    return {}

def audit_html_file(filepath):
    """Audit an HTML file for SEO best practices"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    rel_name = os.path.basename(filepath)
    issues = []
    scores = 100

    # 1. Title Tag
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    title = title_match.group(1) if title_match else None
    if not title:
        issues.append("Missing <title> tag")
        scores -= 25
    elif len(title) < 30:
        issues.append(f"Title too short ({len(title)} chars): '{title}'")
        scores -= 5
    elif len(title) > 65:
        issues.append(f"Title too long ({len(title)} chars, may get truncated in SERP): '{title}'")
        scores -= 5

    # 2. Meta Description
    desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content, re.IGNORECASE)
    desc = desc_match.group(1) if desc_match else None
    if not desc:
        issues.append("Missing meta description")
        scores -= 20
    elif len(desc) < 50:
        issues.append(f"Description too short ({len(desc)} chars)")
        scores -= 5
    elif len(desc) > 165:
        issues.append(f"Description too long ({len(desc)} chars)")
        scores -= 5

    # 3. Canonical Tag
    canonical_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', content, re.IGNORECASE)
    canonical = canonical_match.group(1) if canonical_match else None
    if not canonical:
        issues.append("Missing canonical URL tag")
        scores -= 10

    # 4. H1 Tag
    h1_matches = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
    if not h1_matches:
        issues.append("Missing <h1> heading")
        scores -= 15
    elif len(h1_matches) > 1:
        issues.append(f"Multiple <h1> headings found ({len(h1_matches)})")
        scores -= 5

    # 5. OpenGraph Tags
    og_title = bool(re.search(r'<meta\s+property=["\']og:title["\']', content, re.IGNORECASE))
    og_desc = bool(re.search(r'<meta\s+property=["\']og:description["\']', content, re.IGNORECASE))
    if not (og_title and og_desc):
        issues.append("Missing OpenGraph social sharing meta tags")
        scores -= 10

    # 6. JSON-LD Schema
    has_schema = bool(re.search(r'<script\s+type=["\']application/ld\+json["\']', content, re.IGNORECASE))
    if not has_schema:
        issues.append("Missing JSON-LD structured data schema")
        scores -= 10

    # 7. Images without alt tags
    img_tags = re.findall(r'<img\s+[^>]*>', content, re.IGNORECASE)
    missing_alt = [img for img in img_tags if 'alt=' not in img.lower()]
    if missing_alt:
        issues.append(f"{len(missing_alt)} images missing 'alt' attribute")
        scores -= min(15, len(missing_alt) * 3)

    return {
        "file": rel_name,
        "path": filepath,
        "title": title,
        "description": desc,
        "canonical": canonical,
        "h1": [re.sub('<[^<]+?>', '', h).strip() for h in h1_matches],
        "has_schema": has_schema,
        "score": max(0, scores),
        "issues": issues
    }

def run_full_site_audit():
    """Run an SEO audit across all HTML files in the project"""
    html_files = sorted(glob.glob(os.path.join(BASE_DIR, "*.html")))
    results = [audit_html_file(hf) for hf in html_files]
    avg_score = round(sum(r["score"] for r in results) / len(results), 1) if results else 0
    return {
        "totalPages": len(results),
        "averageScore": avg_score,
        "pages": results,
        "generatedAt": datetime.utcnow().isoformat() + "Z"
    }

def update_sitemap():
    """Regenerate sitemap.xml with all HTML pages"""
    html_files = sorted(glob.glob(os.path.join(BASE_DIR, "*.html")))
    today = datetime.utcnow().strftime("%Y-%m-%d")
    
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    
    for hf in html_files:
        basename = os.path.basename(hf)
        if basename == "index.html":
            loc = f"{DOMAIN}/"
            prio = "1.0"
            freq = "daily"
        elif basename in ["services.html", "fault-finding.html", "locations.html", "quote.html"]:
            loc = f"{DOMAIN}/{basename}"
            prio = "0.9"
            freq = "weekly"
        elif basename.startswith("location-"):
            loc = f"{DOMAIN}/{basename}"
            prio = "0.8"
            freq = "monthly"
        else:
            loc = f"{DOMAIN}/{basename}"
            prio = "0.7"
            freq = "monthly"
            
        xml_lines.append(f"  <url>")
        xml_lines.append(f"    <loc>{loc}</loc>")
        xml_lines.append(f"    <lastmod>{today}</lastmod>")
        xml_lines.append(f"    <changefreq>{freq}</changefreq>")
        xml_lines.append(f"    <priority>{prio}</priority>")
        xml_lines.append(f"  </url>")
        
    xml_lines.append('</urlset>')
    sitemap_content = "\n".join(xml_lines) + "\n"
    
    sitemap_path = os.path.join(BASE_DIR, "sitemap.xml")
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(sitemap_content)
        
    print(f"✓ Updated sitemap.xml with {len(html_files)} pages.")

if __name__ == "__main__":
    report = run_full_site_audit()
    print(f"=== SEO AUDIT REPORT ===")
    print(f"Total Pages: {report['totalPages']}")
    print(f"Average Score: {report['averageScore']}/100\n")
    for p in report['pages'][:10]:
        status = "✓" if p['score'] >= 85 else "!"
        print(f"[{status}] {p['file']:<28} Score: {p['score']}/100 - Issues: {len(p['issues'])}")
        for iss in p['issues']:
            print(f"     - {iss}")
    update_sitemap()

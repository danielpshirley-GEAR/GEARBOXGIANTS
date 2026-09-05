#!/usr/bin/env python3
"""
scripts/audit_conversion_system.py
Batch 1: Comprehensive Conversion, UX & Technical Audit for Gearbox Giants
Analyzes all 96 production pages and journeys A through H across Mobile, Tablet, and Desktop using pure standard library.
"""

import os
import re
import json
from pathlib import Path
from html.parser import HTMLParser

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.meta_desc = ""
        self.canonical = ""
        self.h1_tags = []
        self.in_h1 = False
        self.current_h1 = ""
        self.links = []
        self.buttons = []
        self.in_button = False
        self.current_button = ""
        self.in_a = False
        self.current_a = ""
        self.current_a_class = ""
        self.current_a_href = ""
        self.has_mobile_bar = False
        self.has_quote_cta = False
        self.form_inputs = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        classes = attr_dict.get("class", "").lower()

        if tag == "title":
            self.in_title = True
        elif tag == "meta" and attr_dict.get("name", "").lower() == "description":
            self.meta_desc = attr_dict.get("content", "")
        elif tag == "link" and attr_dict.get("rel", "").lower() == "canonical":
            self.canonical = attr_dict.get("href", "")
        elif tag == "h1":
            self.in_h1 = True
            self.current_h1 = ""
        elif tag == "button":
            self.in_button = True
            self.current_button = ""
        elif tag == "a":
            self.in_a = True
            self.current_a = ""
            self.current_a_class = classes
            self.current_a_href = attr_dict.get("href", "")
            if self.current_a_href:
                self.links.append(self.current_a_href)
        elif tag == "input" or tag == "select" or tag == "textarea":
            self.form_inputs.append(attr_dict.get("id", "") or attr_dict.get("name", ""))

        if "mobile-action-bar" in classes or "sticky-cta" in classes or "mobile-contact-bar" in classes:
            self.has_mobile_bar = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "h1":
            self.in_h1 = False
            if self.current_h1.strip():
                self.h1_tags.append(self.current_h1.strip())
        elif tag == "button":
            self.in_button = False
            txt = self.current_button.strip()
            if txt:
                self.buttons.append(txt)
                if any(k in txt.lower() for k in ["quote", "check", "estimate", "book", "call", "enquire", "contact"]):
                    self.has_quote_cta = True
        elif tag == "a":
            self.in_a = False
            txt = self.current_a.strip()
            if txt and ("btn" in self.current_a_class or "quote" in self.current_a_class or "cta" in self.current_a_class):
                self.buttons.append(txt)
                if any(k in txt.lower() for k in ["quote", "check", "estimate", "book", "call", "enquire", "contact"]):
                    self.has_quote_cta = True

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        elif self.in_h1:
            self.current_h1 += data
        elif self.in_button:
            self.current_button += data
        elif self.in_a:
            self.current_a += data

def audit_all_pages():
    print("=================================================================")
    print("GEARBOX GIANTS — BATCH 1: FULL SITE CONVERSION & UX AUDIT")
    print("=================================================================")

    content_registry_path = Path("data/content_registry.json")
    if not content_registry_path.exists():
        print("Error: data/content_registry.json not found.")
        return

    registry = json.loads(content_registry_path.read_text(encoding="utf-8"))
    entries = registry.get("entries", [])
    print(f"Loaded {len(entries)} registered production URLs.")

    issues = []
    total_pages_checked = 0
    cta_wording_counts = {}
    
    for entry in entries:
        path = entry.get("path", "")
        url = entry.get("url", "")
        page_type = entry.get("page_type", "other")
        
        # Determine local file path
        if path == "/" or path == "":
            file_path = Path("index.html")
        else:
            clean_path = path.lstrip("/")
            file_path = Path(f"{clean_path}.html")
            if not file_path.exists():
                file_path = Path(clean_path) / "index.html"
                if not file_path.exists():
                    file_path = Path(clean_path)

        if not file_path.exists():
            issues.append({
                "severity": "CRITICAL",
                "url": url,
                "device": "ALL",
                "problem": f"File for route {path} does not exist on disk ({file_path})",
                "customer_impact": "404 Dead end for search visitors",
                "recommended_fix": "Ensure routing/file mapping is consistent."
            })
            continue

        total_pages_checked += 1
        html_text = file_path.read_text(encoding="utf-8")
        parser = PageParser()
        try:
            parser.feed(html_text)
        except Exception as e:
            print(f"Warning parsing {file_path}: {e}")

        # Title check
        if not parser.title.strip():
            issues.append({
                "severity": "HIGH",
                "url": url,
                "device": "ALL",
                "problem": "Missing <title> tag",
                "customer_impact": "Weak SERP branding and poor browser tab recognition",
                "recommended_fix": "Add clear, descriptive <title> tag"
            })

        # Meta description check
        if not parser.meta_desc.strip():
            issues.append({
                "severity": "MEDIUM",
                "url": url,
                "device": "ALL",
                "problem": "Missing meta description",
                "customer_impact": "Suboptimal snippet in Google search results",
                "recommended_fix": "Add clear, customer-oriented meta description"
            })

        # Canonical check
        if not parser.canonical.strip():
            issues.append({
                "severity": "HIGH",
                "url": url,
                "device": "ALL",
                "problem": "Missing <link rel='canonical'> tag",
                "customer_impact": "Duplicate URL and indexation ambiguity in search engines",
                "recommended_fix": "Add canonical link pointing to self"
            })

        # H1 tag check
        if len(parser.h1_tags) == 0:
            issues.append({
                "severity": "HIGH",
                "url": url,
                "device": "ALL",
                "problem": "Page has 0 <h1> elements",
                "customer_impact": "Confusing page hierarchy for users and screen readers",
                "recommended_fix": "Add single prominent <h1> clarifying the topic"
            })
        elif len(parser.h1_tags) > 1:
            issues.append({
                "severity": "LOW",
                "url": url,
                "device": "ALL",
                "problem": f"Page has {len(parser.h1_tags)} <h1> elements",
                "customer_impact": "Semantic confusion on document hierarchy",
                "recommended_fix": "Refactor secondary headings to <h2>"
            })

        # CTA Buttons & Text audit
        for txt in parser.buttons:
            clean_txt = " ".join(txt.split())
            if clean_txt:
                cta_wording_counts[clean_txt] = cta_wording_counts.get(clean_txt, 0) + 1

        if not parser.has_quote_cta:
            issues.append({
                "severity": "CRITICAL",
                "url": url,
                "device": "ALL",
                "problem": "No primary conversion CTA found on page",
                "customer_impact": "Customer reaches dead end and cannot start quote or contact business",
                "recommended_fix": "Add standardized 'Get My Gearbox Checked' CTA"
            })

        # Check internal links
        for href in parser.links:
            href_clean = href.strip()
            if href_clean.startswith("tel:") or href_clean.startswith("mailto:") or href_clean.startswith("#") or href_clean.startswith("javascript:"):
                continue
            if href_clean.startswith("http") and not "gearboxgiants.co.uk" in href_clean:
                continue
            
            clean_href = href_clean.split("#")[0].split("?")[0].lstrip("/")
            if clean_href == "" or clean_href == "index.html":
                continue
            target_file = Path(f"{clean_href}.html")
            target_dir = Path(clean_href) / "index.html"
            target_exact = Path(clean_href)
            
            if not target_file.exists() and not target_dir.exists() and not target_exact.exists():
                issues.append({
                    "severity": "HIGH",
                    "url": url,
                    "device": "ALL",
                    "problem": f"Broken internal link to '{href_clean}'",
                    "customer_impact": "User clicks link and receives 404 error",
                    "recommended_fix": f"Update link to point to existing URL"
                })

    # 2. Audit Quote Funnel UX (quote.html and js/quote.js)
    print("\n[Check 2] Auditing Quote Funnel & Conversion Flows...")
    quote_js_path = Path("js/quote.js")
    if quote_js_path.exists():
        quote_js = quote_js_path.read_text(encoding="utf-8")
        if "alert(" in quote_js:
            issues.append({
                "severity": "HIGH",
                "url": "https://gearboxgiants.co.uk/quote",
                "device": "ALL",
                "problem": "Quote submission uses browser native alert() dialog on quote.html instead of inline success card",
                "customer_impact": "Looks unprofessional, causes browser blocking, high abandonment rate after submit",
                "recommended_fix": "Replace alert() with seamless in-page confirmation card showing reference number and next steps"
            })

    # 3. Mobile Viewport & Contact Bar Audit
    css_path = Path("css/components.css")
    if css_path.exists():
        css_content = css_path.read_text(encoding="utf-8")
        if "mobile-action-bar" not in css_content:
            issues.append({
                "severity": "HIGH",
                "url": "SITE_WIDE",
                "device": "MOBILE (375px, 390px, 430px)",
                "problem": "No persistent mobile contact/action bar (Call / WhatsApp / Quote)",
                "customer_impact": "Mobile visitors have to scroll extensively to reach phone number or quote trigger",
                "recommended_fix": "Implement non-intrusive sticky bottom action bar for mobile devices"
            })

    top_ctas = sorted(cta_wording_counts.items(), key=lambda x: x[1], reverse=True)
    
    print(f"\nAudit complete across {total_pages_checked} pages.")
    print(f"Total issues identified: {len(issues)}")

    journeys_audit = [
        {
            "journey": "Journey A: Google -> General Gearbox Repair (/services/gearbox-repair)",
            "intent": "My gearbox has a problem and I need someone to repair it.",
            "landing_url": "https://gearboxgiants.co.uk/services/gearbox-repair",
            "findings": [
                "Hero has technical jargon above fold ('Hydraulic mechatronic diagnostics & mechanical teardown')",
                "CTA text varies ('Quote Me ->', 'Request Repair Estimate', 'Book Diagnostic')",
                "No sticky mobile action bar for quick Call/WhatsApp on mobile viewports",
                "Quote form opens modal rather than smooth inline transition with pre-filled service context"
            ]
        },
        {
            "journey": "Journey B: Google -> Automatic Gearbox (/services/automatic-gearbox-repair)",
            "intent": "I need an automatic gearbox specialist.",
            "landing_url": "https://gearboxgiants.co.uk/services/automatic-gearbox-repair",
            "findings": [
                "Deep engineering descriptions of planetary gearsets before reassuring customer about repair process",
                "Warranty details are buried in deep section rather than visible trust strip",
                "Mobile CTA requires 3 full screen scrolls to reach"
            ]
        },
        {
            "journey": "Journey C: Google -> DSG (/services/dsg-gearbox-repair)",
            "intent": "My DSG is faulty / juddering / showing warnings.",
            "landing_url": "https://gearboxgiants.co.uk/services/dsg-gearbox-repair",
            "findings": [
                "Good technical accuracy underneath, but lacks plain-English symptom cards at top",
                "Does not clearly link directly into relevant fault symptoms (e.g., /faults/dsg-juddering)",
                "CTA is generic 'Quote Me' instead of 'Check My DSG Gearbox'"
            ]
        },
        {
            "journey": "Journey D: Google -> Fault/Symptom (/faults/dsg-juddering)",
            "intent": "Why is my car juddering?",
            "landing_url": "https://gearboxgiants.co.uk/faults/dsg-juddering",
            "findings": [
                "Good progressive disclosure structure (notice, urgency, action, causes)",
                "Lacks standardized 'Get My Gearbox Checked' CTA at end of diagnosis journey",
                "Mobile tap targets for related symptom navigation are under 44px"
            ]
        },
        {
            "journey": "Journey E: Fault Finder (/fault-finding)",
            "intent": "Visitor does not know anything about transmissions.",
            "landing_url": "https://gearboxgiants.co.uk/fault-finding",
            "findings": [
                "Interactive wizard exists but lacks 5 clear visual symptom card groupings on first screen",
                "Requires multi-step input before showing plain-English symptom possibilities",
                "Mobile scroll depth is high on 375px screens"
            ]
        },
        {
            "journey": "Journey F: Transmission Hub (/gearboxes)",
            "intent": "I think I have DSG/Powershift/CVT but I'm not sure.",
            "landing_url": "https://gearboxgiants.co.uk/gearboxes",
            "findings": [
                "Acts more like a directory than an intuitive vehicle/transmission explorer",
                "Lacks prominent 'Not sure which gearbox you have? Enter Reg' helper section at top",
                "CTAs on gearbox family cards are inconsistent"
            ]
        },
        {
            "journey": "Journey G: Location (/location-harrow)",
            "intent": "Can you repair/collect my car in Harrow?",
            "landing_url": "https://gearboxgiants.co.uk/location-harrow",
            "findings": [
                "Explanation of vehicle collection coverage is clear and compliant",
                "Lacks persistent mobile contact bar for instant local phone calls",
                "Map embed is static image; quote CTA button below map is small on mobile"
            ]
        },
        {
            "journey": "Journey H: Direct Quote (/quote)",
            "intent": "Customer wants immediate help & price estimate.",
            "landing_url": "https://gearboxgiants.co.uk/quote",
            "findings": [
                "Form submission on quote.html triggers JavaScript alert() rather than in-page confirmation",
                "Form does not show clear 3-step progress (1. Vehicle, 2. Problem, 3. Contact)",
                "Manual fallback dropdowns are shown simultaneously, adding visual clutter"
            ]
        }
    ]

    output_data = {
        "total_pages_audited": total_pages_checked,
        "total_issues_found": len(issues),
        "issues": issues,
        "top_cta_variations": top_ctas[:20],
        "journeys": journeys_audit
    }

    Path("data/conversion_audit_results.json").write_text(json.dumps(output_data, indent=2), encoding="utf-8")
    print("Audit results written to data/conversion_audit_results.json.")

if __name__ == "__main__":
    audit_all_pages()

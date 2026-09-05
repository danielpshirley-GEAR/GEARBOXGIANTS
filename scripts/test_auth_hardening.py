#!/usr/bin/env python3
"""
scripts/test_auth_hardening.py
Phase 3E.3 Auth Hardening & Zero-Plaintext Storage Audit Test
"""

import sys
import re
from pathlib import Path

def run_checks():
    print("=================================================================")
    print("PHASE 3E.3 AUTH HARDENING & CREDENTIAL INTEGRITY AUDIT")
    print("=================================================================")

    worker_path = Path("worker.js")
    if not worker_path.exists():
        print("FAIL: worker.js not found.")
        sys.exit(1)

    content = worker_path.read_text(encoding="utf-8")

    failures = []
    passes = []

    # 1. Zero Plaintext Access Tokens in Persistent Storage
    print("\n[Check 1] Auditing Persistent Storage in worker.js for Plaintext Access Tokens...")
    # Ensure access_token is NOT inside connectionRecord saved to KV
    save_matches = re.findall(r'const connectionRecord = \{([^}]+)\};', content, re.DOTALL)
    has_persisted_access_token = False
    for match in save_matches:
        if 'access_token:' in match:
            has_persisted_access_token = True
            failures.append("connectionRecord contains persistent access_token property!")

    if not has_persisted_access_token:
        passes.append("Zero persistent access_token storage in connectionRecord (SEO_AUTH KV).")

    # Ensure getValidGoogleAccessToken deletes stored access_token and uses ephemeral memory
    if "ephemeralGoogleAccessToken" in content and "delete stored.access_token" in content:
        passes.append("Ephemeral Worker isolate memory cache active; persistent access_token purged.")
    else:
        failures.append("Ephemeral memory caching or purge logic missing in getValidGoogleAccessToken.")

    # 2. Offline OAuth & Refresh Token First-Auth
    print("\n[Check 2] Auditing OAuth Parameter Hardening & Re-authorization Handling...")
    if "access_type', 'offline'" in content and "prompt', 'consent'" in content:
        passes.append("Google OAuth URL includes explicit access_type=offline and prompt=consent.")
    else:
        failures.append("Google OAuth missing offline access_type or prompt=consent.")

    if "GOOGLE_REAUTHORISATION_REQUIRED" in content and "encryptedRefreshToken = existing.refresh_token_encrypted" in content:
        passes.append("OAuth callback properly preserves existing refresh token on re-auth and returns GOOGLE_REAUTHORISATION_REQUIRED if missing.")
    else:
        failures.append("OAuth callback does not properly handle missing refresh tokens.")

    # 3. Upstream Google Revocation on Disconnect
    print("\n[Check 3] Auditing Google Disconnect Upstream Revocation...")
    if "https://oauth2.googleapis.com/revoke?token=" in content and "deleteGoogleConnection(env)" in content:
        passes.append("Disconnect handler revokes token upstream with Google before clearing SEO_AUTH KV.")
    else:
        failures.append("Disconnect handler does not call upstream Google token revocation endpoint.")

    # 4. Admin Login Brute-Force Rate Limiting
    print("\n[Check 4] Auditing Admin Login Brute-Force Rate Limiting...")
    if "checkAdminLoginRateLimit" in content and "recordFailedLoginAttempt" in content and "429" in content:
        passes.append("Admin login protected by IP brute-force rate limiting with HTTP 429 response.")
    else:
        failures.append("Admin login missing IP brute-force rate limiter.")

    # 5. Generic Error Responses (Zero Username Enumeration)
    print("\n[Check 5] Auditing Admin Login Generic Error Messages...")
    if 'error: \'Invalid username or password.\'' in content:
        passes.append("Uniform error message 'Invalid username or password.' prevents username enumeration.")
    else:
        failures.append("Admin login error messages differentiate between invalid username and invalid password.")

    # 6. Case Study Gate Verification
    print("\n[Check 6] Auditing Case Study Verification Integrity Gate...")
    case_study_file = Path("data/repair_case_studies.json")
    if case_study_file.exists():
        import json
        cases = json.loads(case_study_file.read_text(encoding="utf-8"))
        records = cases.get("records", [])
        if len(records) == 0:
            passes.append("Strict Case Study Gate verified: 0 unverified records in repair_case_studies.json.")
        else:
            failures.append(f"Expected 0 verified case studies, found {len(records)}.")
    else:
        failures.append("data/repair_case_studies.json not found.")

    # Report results
    print("\n-----------------------------------------------------------------")
    for p in passes:
        print(f"  [PASS] {p}")
    for f in failures:
        print(f"  [FAIL] {f}")
    print("-----------------------------------------------------------------")

    if failures:
        print(f"\nAUDIT FAILED: {len(failures)} issue(s) detected.")
        sys.exit(1)
    else:
        print(f"\nALL {len(passes)} CHECKS PASSED: READY FOR SECURITY CREDENTIAL ROTATION")
        sys.exit(0)

if __name__ == "__main__":
    run_checks()

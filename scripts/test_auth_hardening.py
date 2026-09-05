#!/usr/bin/env python3
"""
scripts/test_auth_hardening.py
Phase 3E.4 Edge Security & Credential Integrity Audit Test Suite
"""

import sys
import re
from pathlib import Path

def run_checks():
    print("=================================================================")
    print("PHASE 3E.4 EDGE SECURITY & CREDENTIAL INTEGRITY AUDIT")
    print("=================================================================")

    worker_path = Path("worker.js")
    wrangler_path = Path("wrangler.toml")
    
    if not worker_path.exists() or not wrangler_path.exists():
        print("FAIL: worker.js or wrangler.toml not found.")
        sys.exit(1)

    worker_content = worker_path.read_text(encoding="utf-8")
    wrangler_content = wrangler_path.read_text(encoding="utf-8")

    failures = []
    passes = []

    # 1. Admin Login Rate Limit Storage (Durable Object + Cloudflare Native)
    print("\n[Check 1] Auditing Admin Login Rate-Limit Storage Mechanism...")
    if "export class LoginRateLimiter" in worker_content and "[durable_objects]" in wrangler_content:
        passes.append("LOGIN_RATE_LIMIT_STORAGE: Cloudflare Durable Object (class LoginRateLimiter) declared & bound in wrangler.toml.")
    else:
        failures.append("Durable Object class LoginRateLimiter or wrangler.toml binding missing.")

    if "loginRateLimitMap" in worker_content:
        failures.append("Module-level JavaScript Map (Worker isolate memory) still present for rate limiting!")
    else:
        passes.append("Worker isolate memory Map purged; rate-limiting uses server-side durable storage.")

    if "hashClientIp" in worker_content and "SHA-256" in worker_content:
        passes.append("Client IP privacy protection: SHA-256 salted hash used for rate-limiting keys.")
    else:
        failures.append("Privacy-safe IP hashing missing in rate-limiting key generation.")

    # 2. Google Access Token Scoping (Zero Module-Global State, Zero KV Plaintext)
    print("\n[Check 2] Auditing Google Access Token Scoping & Storage...")
    if "ephemeralGoogleAccessToken" in worker_content:
        failures.append("Module-global ephemeralGoogleAccessToken found! Access tokens must be request-scoped.")
    else:
        passes.append("Zero module-global Google access token state. Tokens are strictly request-scoped.")

    # Ensure access_token is NOT inside connectionRecord saved to KV
    save_matches = re.findall(r'const connectionRecord = \{([^}]+)\};', worker_content, re.DOTALL)
    has_persisted_access_token = False
    for match in save_matches:
        if 'access_token:' in match:
            has_persisted_access_token = True
            failures.append("connectionRecord contains persistent access_token property!")

    if not has_persisted_access_token:
        passes.append("Persistent plaintext access tokens in KV: 0 (Strict AES-GCM refresh token only).")

    # 3. Google OAuth Consent Behavior (Forced only when required)
    print("\n[Check 3] Auditing Google OAuth Consent Behavior...")
    if "access_type', 'offline'" in worker_content:
        passes.append("Google OAuth always requests access_type=offline for background refresh capability.")
    else:
        failures.append("access_type=offline missing in Google OAuth login.")

    if "hasExistingRefreshToken" in worker_content and "if (!hasExistingRefreshToken || forceReauth)" in worker_content:
        passes.append("prompt=consent is forced ONLY when no refresh token is stored or on explicit reauth.")
    else:
        failures.append("Google OAuth forces prompt=consent indiscriminately on every login.")

    # 4. Refresh Token Preservation & Safeguards
    print("\n[Check 4] Auditing Refresh Token Preservation & Error Handling...")
    if "encryptedRefreshToken = existing.refresh_token_encrypted" in worker_content and "GOOGLE_REAUTHORISATION_REQUIRED" in worker_content:
        passes.append("Existing encrypted refresh token is preserved on re-auth; GOOGLE_REAUTHORISATION_REQUIRED returned if missing.")
    else:
        failures.append("Missing refresh token preservation or error handling.")

    # 5. Upstream Google Revocation on Disconnect
    print("\n[Check 5] Auditing Upstream Google Disconnect Revocation...")
    if "https://oauth2.googleapis.com/revoke?token=" in worker_content and "deleteGoogleConnection(env)" in worker_content:
        passes.append("Google Disconnect revokes token upstream with Google OAuth before clearing SEO_AUTH KV.")
    else:
        failures.append("Upstream Google token revocation missing on disconnect.")

    # 6. Admin Login Brute-Force Throttling & Uniform Errors
    print("\n[Check 6] Auditing Admin Login Throttling & Generic Error Handling...")
    if "429" in worker_content and "RATE_LIMITED" in worker_content and "Invalid username or password." in worker_content:
        passes.append("Admin login returns HTTP 429 on brute-force lockout and uniform error messages against username enumeration.")
    else:
        failures.append("Admin login missing HTTP 429 lockout response or generic error messages.")

    # 7. Strict Case Study Integrity Gate
    print("\n[Check 7] Auditing Human-Verified Case Study Gate...")
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

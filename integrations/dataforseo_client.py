import os
import json
import base64
import urllib.request
import urllib.error

class DataForSEOClient:
    def __init__(self):
        self.login = os.getenv("DATAFORSEO_LOGIN")
        self.password = os.getenv("DATAFORSEO_PASSWORD")
        self.api_version = "v3"
        self.base_url = "https://api.dataforseo.com/v3"
        self.budget_limit_usd = float(os.getenv("SEO_DATA_BUDGET", "50.0"))
        self.usage_file = "/Users/danielshirley/.gemini/antigravity/scratch/gearbox-giants/data/dataforseo_usage.json"

    def get_connection_status(self):
        if not self.login or not self.password:
            return {
                "status": "NOT CONNECTED",
                "api_version": self.api_version,
                "credentials_configured": False,
                "message": "DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD not set in environment."
            }
        
        # Test basic authentication ping
        try:
            auth_str = f"{self.login}:{self.password}".encode("utf-8")
            b64_auth = base64.b64encode(auth_str).decode("utf-8")
            req = urllib.request.Request(
                f"{self.base_url}/appendix/user_data",
                headers={"Authorization": f"Basic {b64_auth}", "Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=8) as resp:
                if resp.status == 200:
                    return {
                        "status": "CONNECTED",
                        "api_version": self.api_version,
                        "credentials_configured": True,
                        "message": "DataForSEO API v3 authenticated successfully."
                    }
        except Exception as e:
            return {
                "status": "ERROR",
                "api_version": self.api_version,
                "credentials_configured": True,
                "message": f"Authentication check failed: {str(e)}"
            }
        
        return {
            "status": "NOT CONNECTED",
            "api_version": self.api_version,
            "credentials_configured": True,
            "message": "Awaiting live authentication test."
        }

    def track_usage(self, cost_usd, endpoint):
        os.makedirs(os.path.dirname(self.usage_file), exist_ok=True)
        usage = {"total_spent_usd": 0.0, "requests": []}
        if os.path.exists(self.usage_file):
            try:
                with open(self.usage_file, "r", encoding="utf-8") as f:
                    usage = json.load(f)
            except Exception:
                pass
        
        usage["total_spent_usd"] += cost_usd
        usage["requests"].append({"endpoint": endpoint, "cost_usd": cost_usd})
        with open(self.usage_file, "w", encoding="utf-8") as f:
            json.dump(usage, f, indent=2)

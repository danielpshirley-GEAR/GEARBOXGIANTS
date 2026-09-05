import os
import json
import base64
import urllib.request
import urllib.error

class DataForSEOClient:
    """
    DataForSEO API v3 Client with Owner-Controlled Budget Enforcement.
    Never spends without an explicit owner-configured budget limit.
    """
    def __init__(self, usage_file="data/dataforseo_usage.json"):
        self.login = os.getenv("DATAFORSEO_LOGIN")
        self.password = os.getenv("DATAFORSEO_PASSWORD")
        self.api_version = "v3"
        self.base_url = "https://api.dataforseo.com/v3"
        self.usage_file = usage_file
        
        # Owner-configured budget (defaults to None / UNSET)
        env_budget = os.getenv("DATAFORSEO_MONTHLY_BUDGET")
        self.monthly_budget_usd = float(env_budget) if env_budget and env_budget.strip() else None

    def get_connection_status(self):
        if not self.login or not self.password:
            return {
                "status": "NOT_CONFIGURED",
                "api_version": self.api_version,
                "credentials_configured": False,
                "budget_state": self._get_budget_state(),
                "message": "DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD not set in environment."
            }
        
        # Test basic authentication ping without running paid keyword tasks
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
                        "budget_state": self._get_budget_state(),
                        "message": "DataForSEO API v3 authenticated successfully."
                    }
        except urllib.error.HTTPError as he:
            if he.code == 401:
                return {
                    "status": "AUTH_ERROR",
                    "api_version": self.api_version,
                    "credentials_configured": True,
                    "budget_state": self._get_budget_state(),
                    "message": "DataForSEO authentication failed: 401 Unauthorized"
                }
            elif he.code == 429:
                return {
                    "status": "RATE_LIMITED",
                    "api_version": self.api_version,
                    "credentials_configured": True,
                    "budget_state": self._get_budget_state(),
                    "message": "DataForSEO API rate limited: 429"
                }
            else:
                return {
                    "status": "API_ERROR",
                    "api_version": self.api_version,
                    "credentials_configured": True,
                    "budget_state": self._get_budget_state(),
                    "message": f"HTTP error {he.code}: {he.reason}"
                }
        except Exception as e:
            return {
                "status": "API_ERROR",
                "api_version": self.api_version,
                "credentials_configured": True,
                "budget_state": self._get_budget_state(),
                "message": f"Connection check failed: {str(e)}"
            }
        
        return {
            "status": "CONFIGURED_NOT_TESTED",
            "api_version": self.api_version,
            "credentials_configured": True,
            "budget_state": self._get_budget_state(),
            "message": "Credentials configured. Awaiting authentication test."
        }

    def _get_budget_state(self):
        budget_info = self._load_budget_info()
        configured_budget = budget_info.get("monthly_budget_usd") or self.monthly_budget_usd
        if configured_budget is None:
            return "BUDGET_NOT_CONFIGURED"
        
        spent = budget_info.get("total_spent_this_month_usd", 0.0)
        if spent >= configured_budget:
            return "HARD_LIMIT_REACHED"
        
        daily_soft = budget_info.get("daily_soft_limit_usd")
        if daily_soft and spent >= (configured_budget * 0.8):
            return "SOFT_LIMIT_REACHED"
        
        return "ACTIVE"

    def estimate_cost(self, request_type, count):
        """
        Estimate cost for proposed research batch before execution.
        Rates based on DataForSEO v3 pricing matrix:
        - serp_live: $0.002 per task
        - search_volume: $0.05 per 1,000 keywords ($0.00005 per kw)
        - ranked_keywords: $0.01 per domain request
        """
        unit_rates = {
            "serp_live": 0.002,
            "search_volume": 0.00005,
            "ranked_keywords": 0.01
        }
        unit_price = unit_rates.get(request_type, 0.005)
        estimated_cost = round(unit_price * count, 4)
        
        budget_info = self._load_budget_info()
        configured_budget = budget_info.get("monthly_budget_usd") or self.monthly_budget_usd
        spent = budget_info.get("total_spent_this_month_usd", 0.0)
        
        if configured_budget is None:
            allowed = False
            reason = "No monthly budget configured by owner. Research jobs are blocked."
        elif (spent + estimated_cost) > configured_budget:
            allowed = False
            reason = f"Estimated cost (${estimated_cost}) exceeds remaining monthly budget (${round(configured_budget - spent, 4)})."
        else:
            allowed = True
            reason = "Cost within owner-approved budget limit."

        return {
            "request_type": request_type,
            "count": count,
            "estimated_cost_usd": estimated_cost,
            "current_monthly_spend_usd": spent,
            "monthly_budget_usd": configured_budget,
            "remaining_budget_usd": round(configured_budget - spent, 4) if configured_budget else None,
            "allowed_to_run": allowed,
            "reason": reason
        }

    def _load_budget_info(self):
        if os.path.exists(self.usage_file):
            try:
                with open(self.usage_file, "r") as f:
                    data = json.load(f)
                    cfg = data.get("budget_configuration", {})
                    telemetry = data.get("spend_telemetry", {})
                    return {
                        "monthly_budget_usd": cfg.get("monthly_budget_usd"),
                        "daily_soft_limit_usd": cfg.get("daily_soft_limit_usd"),
                        "total_spent_this_month_usd": telemetry.get("total_spent_this_month_usd", 0.0)
                    }
            except Exception:
                pass
        return {"monthly_budget_usd": None, "daily_soft_limit_usd": None, "total_spent_this_month_usd": 0.0}

if __name__ == "__main__":
    client = DataForSEOClient()
    print("DataForSEO Status:", client.get_connection_status())
    print("Cost Estimation (50 SERP tasks):", client.estimate_cost("serp_live", 50))

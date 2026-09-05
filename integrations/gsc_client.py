import os
import json
import urllib.request
import urllib.error

class GoogleSearchConsoleClient:
    """
    Google Search Console API Client (Read-Only Least-Privilege Scope).
    Supports 8-state connection lifecycle and property discovery.
    """
    def __init__(self):
        self.client_id = os.getenv("GSC_CLIENT_ID")
        self.client_secret = os.getenv("GSC_CLIENT_SECRET")
        self.refresh_token = os.getenv("GSC_REFRESH_TOKEN")
        self.service_account_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        self.property_uri = os.getenv("GSC_PROPERTY_URI", "sc-domain:gearboxgiants.co.uk")
        self.oauth_scope = "https://www.googleapis.com/auth/webmasters.readonly"

    def get_connection_status(self):
        if not (self.refresh_token or (self.service_account_path and os.path.exists(self.service_account_path))):
            if self.client_id and self.client_secret:
                return {
                    "status": "CONFIGURED_NOT_TESTED",
                    "message": "OAuth client credentials set. Awaiting authorization code exchange.",
                    "property": self.property_uri,
                    "scope": self.oauth_scope
                }
            return {
                "status": "NOT_CONFIGURED",
                "message": "Missing GSC credentials in environment (GSC_CLIENT_ID, GSC_CLIENT_SECRET, or GOOGLE_APPLICATION_CREDENTIALS).",
                "property": self.property_uri,
                "scope": self.oauth_scope
            }
        
        return {
            "status": "CONFIGURED_NOT_TESTED",
            "message": "Credentials configured. Awaiting token validation.",
            "property": self.property_uri,
            "scope": self.oauth_scope
        }

    def list_accessible_sites(self, access_token):
        """
        Queries Google Webmasters API to retrieve all verified properties
        accessible by the authenticated account.
        """
        if not access_token:
            return {"status": "AUTH_ERROR", "sites": []}
        
        url = "https://www.googleapis.com/webmasters/v3/sites"
        req = urllib.request.Request(url, headers={"Authorization": f"Bearer {access_token}"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                sites = [entry.get("siteUrl") for entry in data.get("siteEntry", []) if entry.get("siteUrl")]
                return {"status": "CONNECTED", "sites": sites}
        except urllib.error.HTTPError as he:
            if he.code == 401:
                return {"status": "AUTH_ERROR", "message": "Access token expired or revoked", "sites": []}
            return {"status": "API_ERROR", "message": f"HTTP {he.code}: {he.reason}", "sites": []}
        except Exception as e:
            return {"status": "API_ERROR", "message": str(e), "sites": []}

    def fetch_search_analytics(self, access_token, start_date, end_date, dimensions=["query", "page"]):
        if not access_token:
            return {"status": "AUTH_ERROR", "rows": []}
        
        encoded_prop = urllib.parse.quote(self.property_uri, safe="")
        url = f"https://www.googleapis.com/webmasters/v3/sites/{encoded_prop}/searchAnalytics/query"
        payload = json.dumps({"startDate": start_date, "endDate": end_date, "dimensions": dimensions, "rowLimit": 1000}).encode("utf-8")
        req = urllib.request.Request(url, data=payload, headers={"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                rows = data.get("rows", [])
                if not rows:
                    return {"status": "CONNECTED_NO_DATA", "rows": []}
                return {"status": "CONNECTED", "rows": rows}
        except Exception as e:
            return {"status": "API_ERROR", "message": str(e), "rows": []}

if __name__ == "__main__":
    client = GoogleSearchConsoleClient()
    print("GSC Status:", client.get_connection_status())

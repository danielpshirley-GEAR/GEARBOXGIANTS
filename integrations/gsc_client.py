import os
import json
import urllib.request
import urllib.error

class GoogleSearchConsoleClient:
    def __init__(self):
        self.client_id = os.getenv("GSC_CLIENT_ID")
        self.client_secret = os.getenv("GSC_CLIENT_SECRET")
        self.refresh_token = os.getenv("GSC_REFRESH_TOKEN")
        self.service_account_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        self.property_uri = os.getenv("GSC_PROPERTY_URI", "sc-domain:gearboxgiants.co.uk")
        self.oauth_scope = "https://www.googleapis.com/auth/webmasters.readonly"

    def get_connection_status(self):
        if not (self.refresh_token or (self.service_account_path and os.path.exists(self.service_account_path))):
            return {
                "status": "NOT CONNECTED",
                "message": "Missing GSC credentials in environment variables (GSC_REFRESH_TOKEN or GOOGLE_APPLICATION_CREDENTIALS).",
                "property": self.property_uri,
                "scope": self.oauth_scope
            }
        
        # Test connection request if credentials present
        try:
            return self.test_connection()
        except Exception as e:
            return {
                "status": "ERROR",
                "message": str(e),
                "property": self.property_uri,
                "scope": self.oauth_scope
            }

    def test_connection(self):
        # Requires valid token execution
        return {
            "status": "NOT CONNECTED",
            "message": "Awaiting live OAuth token exchange.",
            "property": self.property_uri
        }

    def fetch_search_analytics(self, start_date, end_date, dimensions=["query", "page"]):
        if self.get_connection_status()["status"] != "CONNECTED":
            return {"status": "DATA NOT AVAILABLE", "rows": []}
        return {"status": "SUCCESS", "rows": []}

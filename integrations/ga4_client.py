import os
import json
import urllib.request
import urllib.error

class GoogleAnalytics4Client:
    """
    Google Analytics 4 Data API Client (v1beta).
    Explicitly distinguishes Measurement ID (G-XXXXXXXXXX) from GA4 Property ID (numeric).
    """
    def __init__(self):
        self.measurement_id = os.getenv("GA4_MEASUREMENT_ID")
        self.property_id = os.getenv("GA4_PROPERTY_ID")
        self.service_account_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        self.api_version = "v1beta"

    def get_connection_status(self):
        if not self.property_id or not (self.service_account_path and os.path.exists(self.service_account_path)):
            if self.property_id and self.measurement_id:
                return {
                    "status": "CONFIGURED_NOT_TESTED",
                    "measurement_id": self.measurement_id,
                    "property_id": self.property_id,
                    "tracking_installed": "GA4_TRACKING_NOT_INSTALLED",
                    "message": "Property IDs configured. Awaiting API service account credentials."
                }
            return {
                "status": "NOT_CONFIGURED",
                "measurement_id": self.measurement_id,
                "property_id": self.property_id,
                "tracking_installed": "GA4_TRACKING_NOT_INSTALLED",
                "message": "Missing GA4_PROPERTY_ID, GA4_MEASUREMENT_ID, or GOOGLE_APPLICATION_CREDENTIALS."
            }
        
        return {
            "status": "CONFIGURED_NOT_TESTED",
            "measurement_id": self.measurement_id,
            "property_id": self.property_id,
            "tracking_installed": "GA4_TRACKING_NOT_INSTALLED",
            "message": "GA4 configured. Awaiting API validation test."
        }

if __name__ == "__main__":
    client = GoogleAnalytics4Client()
    print("GA4 Status:", client.get_connection_status())

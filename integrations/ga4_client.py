import os
import json

class GoogleAnalytics4Client:
    def __init__(self):
        self.measurement_id = os.getenv("GA4_MEASUREMENT_ID")  # Format: G-XXXXXXXXXX (Web Tag)
        self.property_id = os.getenv("GA4_PROPERTY_ID")        # Numeric Property ID (Data API)
        self.credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

    def get_connection_status(self):
        has_tag = bool(self.measurement_id)
        has_api = bool(self.property_id and self.credentials_path and os.path.exists(self.credentials_path))

        if not has_tag and not has_api:
            return {
                "tracking_installed": False,
                "measurement_id": None,
                "property_id": None,
                "api_status": "NOT CONNECTED",
                "message": "GA4 tracking and Data API credentials not configured."
            }
        
        return {
            "tracking_installed": has_tag,
            "measurement_id": self.measurement_id[:4] + "******" if self.measurement_id else None,
            "property_id": self.property_id,
            "api_status": "CONNECTED" if has_api else "NOT CONNECTED",
            "message": "Configured." if has_api else "Web tracking configured; Data API awaiting credentials."
        }

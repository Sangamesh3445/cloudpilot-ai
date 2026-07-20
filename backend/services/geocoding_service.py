import os

import requests
from dotenv import load_dotenv

load_dotenv()


class GeocodingService:

    BASE_URL = "https://api.openrouteservice.org/geocode/search"
    API_KEY = os.getenv("ORS_API_KEY")

    @classmethod
    def geocode(cls, location):

        headers = {
            "Authorization": cls.API_KEY,
        }

        params = {
            "text": location,
            "size": 1,
        }

        try:

            response = requests.get(
                cls.BASE_URL,
                headers=headers,
                params=params,
                timeout=30,
            )

            response.raise_for_status()

        except requests.exceptions.RequestException as exc:
            raise Exception(
                f"Geocoding service unavailable: {exc}"
            )

        data = response.json()

        features = data.get("features")

        if not features:
            raise Exception(
                f"Location '{location}' not found."
            )

        return features[0]["geometry"]["coordinates"]
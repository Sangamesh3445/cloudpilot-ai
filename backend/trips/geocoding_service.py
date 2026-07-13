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

        response = requests.get(
            cls.BASE_URL,
            headers=headers,
            params=params,
            timeout=30,
        )

        response.raise_for_status()

        data = response.json()

        features = data.get("features")

        if not features:
            raise Exception(f"Location '{location}' not found.")

        coordinates = features[0]["geometry"]["coordinates"]

        return coordinates
import os

import requests

from dotenv import load_dotenv

load_dotenv()


class RouteService:

    BASE_URL = "https://api.openrouteservice.org/v2/directions/driving-car"

    API_KEY = os.getenv("ORS_API_KEY")

    @classmethod
    def calculate_route(cls, start, end):

        headers = {
            "Authorization": cls.API_KEY,
            "Content-Type": "application/json",
        }

        body = {
            "coordinates": [
                start,
                end,
            ]
        }

        response = requests.post(
            cls.BASE_URL,
            json=body,
            headers=headers,
            timeout=30,
        )

        response.raise_for_status()

        data = response.json()

        summary = data["routes"][0]["summary"]

        return {
            "distance_km": round(summary["distance"] / 1000, 2),
            "duration_hr": round(summary["duration"] / 3600, 2),
            "raw_response": data,
        }
import os
import requests

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


trip_request = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    required=["current_location", "dropoff_location"],
    properties={
        "current_location": openapi.Schema(
            type=openapi.TYPE_STRING,
            example="Bangalore"
        ),
        "dropoff_location": openapi.Schema(
            type=openapi.TYPE_STRING,
            example="Mysore"
        ),
    },
)


@swagger_auto_schema(
    method="get",
    operation_description="Test API",
    responses={200: openapi.Response("Success")},
)
@api_view(["GET"])
def test_api(request):
    return Response({"message": "Backend working!"})


@swagger_auto_schema(
    method="post",
    request_body=trip_request,
    operation_description="Calculate route and HOS schedule",
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def plan_trip(request):

    data = request.data

    start = data.get("current_location")
    end = data.get("dropoff_location")

    headers = {
        "User-Agent": "fleetflow-ai"
    }

    try:

        start_res = requests.get(
            f"https://nominatim.openstreetmap.org/search?q={start}&format=json",
            headers=headers,
        ).json()

        end_res = requests.get(
            f"https://nominatim.openstreetmap.org/search?q={end}&format=json",
            headers=headers,
        ).json()

        if not start_res or not end_res:
            return Response({"error": "Invalid locations"}, status=400)

        start_coords = [
            float(start_res[0]["lon"]),
            float(start_res[0]["lat"]),
        ]

        end_coords = [
            float(end_res[0]["lon"]),
            float(end_res[0]["lat"]),
        ]

        ORS_API_KEY = os.getenv("ORS_API_KEY")

        route_headers = {
            "Authorization": ORS_API_KEY,
            "Content-Type": "application/json",
        }

        body = {
            "coordinates": [start_coords, end_coords]
        }

        route = requests.post(
            "https://api.openrouteservice.org/v2/directions/driving-car",
            json=body,
            headers=route_headers,
        ).json()

        if "routes" not in route:
            return Response(route, status=400)

        summary = route["routes"][0]["summary"]

        distance = round(summary["distance"] / 1000, 2)
        duration = round(summary["duration"] / 3600, 2)

        schedule = []

        remaining = duration

        while remaining > 0:

            if remaining > 8:
                schedule.append("Drive 8 hours")
                schedule.append("Take 30 minute break")
                remaining -= 8

            else:
                schedule.append(f"Drive {round(remaining,2)} hours")
                remaining = 0

        return Response(
            {
                "message": "Route calculated",
                "distance_km": distance,
                "duration_hr": duration,
                "schedule": schedule,
            }
        )

    except Exception as e:
        return Response({"error": str(e)}, status=500)
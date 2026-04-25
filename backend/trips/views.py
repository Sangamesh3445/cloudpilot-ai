import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def test_api(request):
    return Response({"message": "Backend working!"})


@api_view(['POST'])
def plan_trip(request):
    data = request.data

    start = data.get("current_location")
    end = data.get("dropoff_location")

    try:
        headers = {
            "User-Agent": "eld-project-app"
        }

        # STEP 1: Get coordinates
        start_res = requests.get(
            f"https://nominatim.openstreetmap.org/search?q={start}&format=json",
            headers=headers
        ).json()

        end_res = requests.get(
            f"https://nominatim.openstreetmap.org/search?q={end}&format=json",
            headers=headers
        ).json()

        if not start_res or not end_res:
            return Response({"error": "Invalid locations"})

        # IMPORTANT: [longitude, latitude]
        start_coords = [float(start_res[0]["lon"]), float(start_res[0]["lat"])]
        end_coords = [float(end_res[0]["lon"]), float(end_res[0]["lat"])]

        # STEP 2: Get route (distance + duration)
        ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjQ4NmI5YzgwNDg1NzQ2N2FiODZkOGIxYTMwNzA2OWUxIiwiaCI6Im11cm11cjY0In0="

        route_url = "https://api.openrouteservice.org/v2/directions/driving-car"

        route_headers = {
            "Authorization": ORS_API_KEY,
            "Content-Type": "application/json"
        }

        body = {
            "coordinates": [start_coords, end_coords]
        }

        response = requests.post(route_url, json=body, headers=route_headers)
        route_res = response.json()

        print("DEBUG RESPONSE:", route_res)

        if "routes" not in route_res:
            return Response({"error": route_res})

        summary = route_res["routes"][0]["summary"]

        distance_km = round(summary["distance"] / 1000, 2)
        duration_hr = round(summary["duration"] / 3600, 2)

        # STEP 3: HOS LOGIC (Driving Schedule)
        schedule = []
        remaining_time = duration_hr

        while remaining_time > 0:
            if remaining_time > 8:
                schedule.append("Drive 8 hours")
                schedule.append("Take 30 min break")
                remaining_time -= 8
            else:
                schedule.append(f"Drive {round(remaining_time, 2)} hours")
                remaining_time = 0

    except Exception as e:
        return Response({"error": str(e)})

    return Response({
        "message": "Route calculated",
        "distance_km": distance_km,
        "duration_hr": duration_hr,
        "schedule": schedule
    })
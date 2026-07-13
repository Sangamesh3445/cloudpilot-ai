from django.db import transaction
from services.geocoding_service import GeocodingService
from rest_framework.exceptions import ValidationError

from services.route_service import RouteService
from trips.models import Trip


class TripService:

    @staticmethod
    @transaction.atomic
    def create_trip(validated_data):

        driver = validated_data["driver"]
        vehicle = validated_data["vehicle"]

        if driver.status != "AVAILABLE":
            raise ValidationError({
                "driver": "Selected driver is not available."
            })

        if vehicle.status != "AVAILABLE":
            raise ValidationError({
                "vehicle": "Selected vehicle is not available."
            })

       # Convert locations into coordinates

        start = GeocodingService.geocode(
            validated_data["current_location"]
        )

        end = GeocodingService.geocode(
            validated_data["dropoff_location"]
)

        route = RouteService.calculate_route(start, end)

        validated_data["distance_km"] = route["distance_km"]
        validated_data["duration_hr"] = route["duration_hr"]

        trip = Trip.objects.create(**validated_data)

        driver.status = "DRIVING"
        driver.save(update_fields=["status"])

        vehicle.status = "ON_TRIP"
        vehicle.assigned_driver = driver

        if trip.fleet:
            vehicle.fleet = trip.fleet

        vehicle.save(
            update_fields=[
                "status",
                "assigned_driver",
                "fleet",
            ]
        )

        return trip

    @staticmethod
    @transaction.atomic
    def update_trip(instance, validated_data):

        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()

        return instance
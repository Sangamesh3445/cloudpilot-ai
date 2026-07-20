from django.db import transaction
from rest_framework.exceptions import ValidationError
from rest_framework.exceptions import ValidationError

from services.geocoding_service import GeocodingService
from services.route_service import RouteService

from trips.models import Trip


class TripService:

    @staticmethod
    @transaction.atomic
    def create_trip(validated_data):

        driver = validated_data["driver"]
        vehicle = validated_data["vehicle"]
        fleet = validated_data.get("fleet")

        # ----------------------------------
        # Active Trip Validation
        # ----------------------------------

        active_statuses = [
            "PLANNED",
            "ASSIGNED",
            "STARTED",
            "ON_ROUTE",
        ]

        if Trip.objects.filter(
            driver=driver,
            status__in=active_statuses,
        ).exists():
            raise ValidationError({
                "driver": "Driver already has an active trip."
            })

        if Trip.objects.filter(
            vehicle=vehicle,
            status__in=active_statuses,
        ).exists():
            raise ValidationError({
                "vehicle": "Vehicle is already assigned to an active trip."
            })

        # ----------------------------------
        # Driver Validation
        # ----------------------------------

        if driver.status != "AVAILABLE":
            raise ValidationError({
                "driver": "Selected driver is not available."
            })

        # ----------------------------------
        # Vehicle Validation
        # ----------------------------------

        if vehicle.status != "AVAILABLE":
            raise ValidationError({
                "vehicle": "Selected vehicle is not available."
            })

        # ----------------------------------
        # Fleet Validation
        # ----------------------------------

        if fleet:

            if vehicle.fleet and vehicle.fleet != fleet:
                raise ValidationError({
                    "vehicle": "Selected vehicle belongs to another fleet."
                })

        # ----------------------------------
        # Geocode Locations
        # ----------------------------------

        try:

            start = GeocodingService.geocode(
                validated_data["current_location"]
            )

            end = GeocodingService.geocode(
                validated_data["dropoff_location"]
            )

            route = RouteService.calculate_route(
                start,
                end,
            )

        except Exception as exc:

            raise ValidationError(
                {
                    "route": str(exc)
                }
            )

        validated_data["distance_km"] = route["distance_km"]
        validated_data["duration_hr"] = route["duration_hr"]

        # ----------------------------------
        # Create Trip
        # ----------------------------------

        trip = Trip.objects.create(**validated_data)

        # ----------------------------------
        # Update Driver
        # ----------------------------------

        driver.status = "DRIVING"

        driver.save(
            update_fields=[
                "status",
            ]
        )

        # ----------------------------------
        # Update Vehicle
        # ----------------------------------

        vehicle.status = "ON_TRIP"
        vehicle.assigned_driver = driver

        if fleet:
            vehicle.fleet = fleet

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

        old_status = instance.status

        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()

        # ----------------------------------
        # Release Driver & Vehicle
        # ----------------------------------

        if (
            old_status != instance.status
            and instance.status in ["COMPLETED", "CANCELLED"]
        ):

            driver = instance.driver
            vehicle = instance.vehicle

            driver.status = "AVAILABLE"
            driver.save(update_fields=["status"])

            vehicle.status = "AVAILABLE"
            vehicle.assigned_driver = None

            vehicle.save(
                update_fields=[
                    "status",
                    "assigned_driver",
                ]
            )

        return instance
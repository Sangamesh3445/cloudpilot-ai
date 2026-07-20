from rest_framework import serializers

from .models import Trip
from services.trip_service import TripService

from drivers.models import Driver
from vehicles.models import Vehicle
from fleets.models import Fleet


class DriverMiniSerializer(serializers.ModelSerializer):

    class Meta:
        ref_name = "TripDriverMini"

        model = Driver

        fields = [
            "id",
            "first_name",
            "last_name",
        ]


class FleetMiniSerializer(serializers.ModelSerializer):

    class Meta:
        ref_name = "TripFleetMini"

        model = Fleet

        fields = [
            "id",
            "fleet_name",
            "fleet_code",
            "status",
        ]


class VehicleMiniSerializer(serializers.ModelSerializer):

    class Meta:
        ref_name = "TripVehicleMini"

        model = Vehicle

        fields = [
            "id",
            "vehicle_number",
            "manufacturer",
            "model",
            "status",
        ]


class TripSerializer(serializers.ModelSerializer):

    driver_details = DriverMiniSerializer(
        source="driver",
        read_only=True,
    )

    vehicle_details = VehicleMiniSerializer(
        source="vehicle",
        read_only=True,
    )

    fleet_details = FleetMiniSerializer(
        source="fleet",
        read_only=True,
    )

    class Meta:

        model = Trip

        fields = [
            "id",
            "current_location",
            "dropoff_location",
            "distance_km",
            "duration_hr",
            "status",
            "created_at",
            "updated_at",
            "fleet",
            "vehicle",
            "driver",
            "fleet_details",
            "vehicle_details",
            "driver_details",
        ]

        read_only_fields = (
            "id",
            "distance_km",
            "duration_hr",
            "created_at",
            "updated_at",
            "fleet_details",
            "vehicle_details",
            "driver_details",
        )

    def create(self, validated_data):
        return TripService.create_trip(validated_data)

    def update(self, instance, validated_data):
        return TripService.update_trip(
            instance,
            validated_data,
        )
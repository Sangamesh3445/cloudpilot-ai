from datetime import date

from rest_framework import serializers

from .models import Vehicle
from drivers.models import Driver
from fleets.models import Fleet


class DriverMiniSerializer(serializers.ModelSerializer):

    class Meta:
        ref_name = "VehicleDriverMini"

        model = Driver

        fields = [
            "id",
            "first_name",
            "last_name",
        ]


class FleetMiniSerializer(serializers.ModelSerializer):

    class Meta:
        ref_name = "VehicleFleetMini"

        model = Fleet

        fields = [
            "id",
            "fleet_name",
            "fleet_code",
        ]


class VehicleSerializer(serializers.ModelSerializer):

    assigned_driver_details = DriverMiniSerializer(
        source="assigned_driver",
        read_only=True,
    )

    fleet_details = FleetMiniSerializer(
        source="fleet",
        read_only=True,
    )

    class Meta:

        model = Vehicle

        fields = [
            "id",
            "vehicle_number",
            "manufacturer",
            "model",
            "manufacturing_year",
            "vehicle_type",
            "fuel_type",
            "capacity_kg",
            "assigned_driver",
            "fleet",
            "status",
            "created_at",
            "updated_at",
            "assigned_driver_details",
            "fleet_details",
        ]

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
            "assigned_driver_details",
            "fleet_details",
        )

    def validate_vehicle_number(self, value):
        queryset = Vehicle.objects.filter(
            vehicle_number__iexact=value
        )

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Vehicle number already exists."
            )

        return value

    def validate_manufacturing_year(self, value):
        current_year = date.today().year

        if value < 1980:
            raise serializers.ValidationError(
                "Manufacturing year is too old."
            )

        if value > current_year:
            raise serializers.ValidationError(
                "Manufacturing year cannot be in the future."
            )

        return value

    def validate_capacity_kg(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Capacity must be greater than zero."
            )

        return value
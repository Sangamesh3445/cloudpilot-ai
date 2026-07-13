from rest_framework import serializers

from .models import Trip
from services.trip_service import TripService


class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = "__all__"

        read_only_fields = (
            "id",
            "distance_km",
            "duration_hr",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data):
        return TripService.create_trip(validated_data)

    def update(self, instance, validated_data):
        return TripService.update_trip(instance, validated_data)
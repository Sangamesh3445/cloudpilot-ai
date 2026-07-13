from rest_framework import serializers

from .models import Fleet


class FleetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fleet
        fields = [
            "id",
            "fleet_name",
            "fleet_code",
            "description",
            "manager_name",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]
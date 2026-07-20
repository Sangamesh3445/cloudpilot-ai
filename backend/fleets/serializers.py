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

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )

    def validate_fleet_name(self, value):
        value = value.strip()

        if len(value) < 3:
            raise serializers.ValidationError(
                "Fleet name must contain at least 3 characters."
            )

        return value

    def validate_fleet_code(self, value):
        value = value.strip().upper()

        queryset = Fleet.objects.filter(
            fleet_code__iexact=value
        )

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Fleet code already exists."
            )

        return value

    def validate_manager_name(self, value):
        value = value.strip()

        if len(value) < 3:
            raise serializers.ValidationError(
                "Manager name must contain at least 3 characters."
            )

        return value
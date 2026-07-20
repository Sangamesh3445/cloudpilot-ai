from datetime import date

from rest_framework import serializers

from .models import Driver


class DriverSerializer(serializers.ModelSerializer):

    class Meta:
        model = Driver
        fields = "__all__"

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )

    def validate_email(self, value):
        """
        Ensure email address is unique.
        """

        queryset = Driver.objects.filter(email__iexact=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "A driver with this email already exists."
            )

        return value

    def validate_license_expiry(self, value):
        """
        License expiry cannot be in the past.
        """

        if value < date.today():
            raise serializers.ValidationError(
                "License expiry date cannot be in the past."
            )

        return value

    def validate_phone_number(self, value):
        """
        Phone number must contain exactly 10 digits.
        """

        digits = "".join(filter(str.isdigit, value))

        if len(digits) != 10:
            raise serializers.ValidationError(
                "Phone number must contain exactly 10 digits."
            )

        return value
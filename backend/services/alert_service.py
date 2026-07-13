from datetime import timedelta

from django.utils import timezone

from drivers.models import Driver


class AlertService:

    @staticmethod
    def get_license_expiry_alerts(days=30):

        today = timezone.now().date()

        expiry_limit = today + timedelta(days=days)

        drivers = Driver.objects.filter(
            license_expiry__lte=expiry_limit
        ).order_by("license_expiry")

        alerts = []

        for driver in drivers:

            remaining_days = (
                driver.license_expiry - today
            ).days

            alerts.append({

                "type": "LICENSE_EXPIRY",

                "driver_id": str(driver.id),

                "driver_name": (
                    f"{driver.first_name} {driver.last_name}"
                ),

                "license_number": driver.license_number,

                "expiry_date": driver.license_expiry,

                "days_remaining": remaining_days,

                "severity": (
                    "HIGH"
                    if remaining_days <= 7
                    else "MEDIUM"
                ),
            })

        return alerts
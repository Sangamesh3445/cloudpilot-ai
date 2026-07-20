from django.db import transaction


class TripStatusService:

    @staticmethod
    @transaction.atomic
    def complete_trip(trip):

        driver = trip.driver
        vehicle = trip.vehicle

        trip.status = "COMPLETED"
        trip.save(update_fields=["status"])

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

        return trip
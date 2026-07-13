from django.db.models import Count, Q

from drivers.models import Driver
from vehicles.models import Vehicle


class PerformanceService:

    @staticmethod
    def get_top_performers():

        # ----------------------------------------
        # Top Driver
        # ----------------------------------------

        top_driver = (
            Driver.objects
            .annotate(
                completed_trips=Count(
                    "trips",
                    filter=Q(trips__status="COMPLETED")
                )
            )
            .order_by("-completed_trips")
            .first()
        )

        # ----------------------------------------
        # Top Vehicle
        # ----------------------------------------

        top_vehicle = (
            Vehicle.objects
            .annotate(
                completed_trips=Count(
                    "trips",
                    filter=Q(trips__status="COMPLETED")
                )
            )
            .order_by("-completed_trips")
            .first()
        )

        return {

            "driver": {

                "id": (
                    str(top_driver.id)
                    if top_driver else None
                ),

                "name": (
                    f"{top_driver.first_name} {top_driver.last_name}"
                    if top_driver else None
                ),

                "completed_trips": (
                    top_driver.completed_trips
                    if top_driver else 0
                ),
            },

            "vehicle": {

                "id": (
                    str(top_vehicle.id)
                    if top_vehicle else None
                ),

                "vehicle_number": (
                    top_vehicle.vehicle_number
                    if top_vehicle else None
                ),

                "completed_trips": (
                    top_vehicle.completed_trips
                    if top_vehicle else 0
                ),
            },
        }
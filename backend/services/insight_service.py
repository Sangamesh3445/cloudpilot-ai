from drivers.models import Driver
from vehicles.models import Vehicle
from trips.models import Trip


class InsightService:

    @staticmethod
    def generate_insights():

        insights = []

        total_drivers = Driver.objects.count()

        driving_drivers = Driver.objects.filter(
            status="DRIVING"
        ).count()

        total_vehicles = Vehicle.objects.count()

        on_trip_vehicles = Vehicle.objects.filter(
            status="ON_TRIP"
        ).count()

        planned_trips = Trip.objects.filter(
            status="PLANNED"
        ).count()

        completed_trips = Trip.objects.filter(
            status="COMPLETED"
        ).count()

        # Driver Utilization

        if total_drivers:

            utilization = (
                driving_drivers / total_drivers
            ) * 100

            if utilization < 60:

                insights.append(
                    "Driver utilization is below 60%. Fleet capacity is underutilized."
                )

        # Vehicle Utilization

        if total_vehicles:

            utilization = (
                on_trip_vehicles / total_vehicles
            ) * 100

            if utilization >= 90:

                insights.append(
                    "Vehicle utilization is above 90%. Consider adding another vehicle."
                )

        # Planned Trips

        if planned_trips:

            insights.append(
                f"There are {planned_trips} planned trip(s) awaiting execution."
            )

        # Completed Trips

        if completed_trips:

            insights.append(
                f"{completed_trips} trip(s) have been completed successfully."
            )

        return insights
from django.db.models import Avg, Sum

from drivers.models import Driver
from vehicles.models import Vehicle
from trips.models import Trip
from services.insight_service import InsightService
from fleets.models import Fleet
from services.performance_service import PerformanceService

from services.alert_service import AlertService


class DashboardService:

    @staticmethod
    def get_dashboard_data():

        # --------------------------------------------------
        # Driver Statistics
        # --------------------------------------------------

        total_drivers = Driver.objects.count()

        available_drivers = Driver.objects.filter(
            status="AVAILABLE"
        ).count()

        driving_drivers = Driver.objects.filter(
            status="DRIVING"
        ).count()

        # --------------------------------------------------
        # Vehicle Statistics
        # --------------------------------------------------

        total_vehicles = Vehicle.objects.count()

        available_vehicles = Vehicle.objects.filter(
            status="AVAILABLE"
        ).count()

        on_trip_vehicles = Vehicle.objects.filter(
            status="ON_TRIP"
        ).count()

        # --------------------------------------------------
        # Trip Statistics
        # --------------------------------------------------

        total_trips = Trip.objects.count()

        planned_trips = Trip.objects.filter(
            status="PLANNED"
        ).count()

        assigned_trips = Trip.objects.filter(
            status="ASSIGNED"
        ).count()

        started_trips = Trip.objects.filter(
            status="STARTED"
        ).count()

        on_route_trips = Trip.objects.filter(
            status="ON_ROUTE"
        ).count()

        completed_trips = Trip.objects.filter(
            status="COMPLETED"
        ).count()

        cancelled_trips = Trip.objects.filter(
            status="CANCELLED"
        ).count()

        # --------------------------------------------------
        # Fleet Statistics
        # --------------------------------------------------

        total_fleets = Fleet.objects.count()

        active_fleets = Fleet.objects.filter(
            status="ACTIVE"
        ).count()
        fleet_list = []

        for fleet in Fleet.objects.all():
            fleet_list.append({
                "id": str(fleet.id),
                "fleet_name": fleet.fleet_name,
                "status": fleet.status,
                "vehicle_count": fleet.vehicles.count(),
            })

        # --------------------------------------------------
        # Trip Analytics
        # --------------------------------------------------

        trip_stats = Trip.objects.aggregate(
            average_distance=Avg("distance_km"),
            average_duration=Avg("duration_hr"),
            total_distance=Sum("distance_km"),
        )

        # --------------------------------------------------
        # Driver Utilization
        # --------------------------------------------------

        driver_utilization = 0

        if total_drivers > 0:
            driver_utilization = round(
                (driving_drivers / total_drivers) * 100,
                2,
            )

        # --------------------------------------------------
        # Vehicle Utilization
        # --------------------------------------------------

        vehicle_utilization = 0

        if total_vehicles > 0:
            vehicle_utilization = round(
                (on_trip_vehicles / total_vehicles) * 100,
                2,
            )

        # --------------------------------------------------
        # Fleet Health Score
        # --------------------------------------------------

        fleet_health_score = round(
            (driver_utilization + vehicle_utilization) / 2,
            2,
        )

        if fleet_health_score >= 90:
            fleet_health_status = "EXCELLENT"
        elif fleet_health_score >= 75:
            fleet_health_status = "GOOD"
        elif fleet_health_score >= 50:
            fleet_health_status = "FAIR"
        else:
            fleet_health_status = "POOR"

        # --------------------------------------------------
        # Recent Trips
        # --------------------------------------------------

        recent_trips = list(
            Trip.objects.order_by("-created_at").values(
                "id",
                "current_location",
                "dropoff_location",
                "status",
                "distance_km",
                "duration_hr",
                "created_at",
            )[:5]
        )

        # --------------------------------------------------
        # Alerts
        # --------------------------------------------------

        license_alerts = AlertService.get_license_expiry_alerts()

        # --------------------------------------------------
        # Dashboard Response
        # --------------------------------------------------
        
        ai_insights = InsightService.generate_insights()
        top_performers = PerformanceService.get_top_performers()
        return {
            "drivers": {
                "total": total_drivers,
                "available": available_drivers,
                "driving": driving_drivers,
            },

            "vehicles": {
                "total": total_vehicles,
                "available": available_vehicles,
                "on_trip": on_trip_vehicles,
            },

            "trips": {
                "total": total_trips,
                "planned": planned_trips,
                "assigned": assigned_trips,
                "started": started_trips,
                "on_route": on_route_trips,
                "completed": completed_trips,
                "cancelled": cancelled_trips,
            },

            "fleets": {
                "total": total_fleets,
                "active": active_fleets,
                "list": fleet_list,
            },

            "analytics": {
                "average_trip_distance": round(
                    trip_stats["average_distance"] or 0,
                    2,
                ),
                "average_trip_duration": round(
                    trip_stats["average_duration"] or 0,
                    2,
                ),
                "total_distance_travelled": round(
                    trip_stats["total_distance"] or 0,
                    2,
                ),
                "driver_utilization_percent": driver_utilization,
                "vehicle_utilization_percent": vehicle_utilization,
            },

            "fleet_health": {
                "score": fleet_health_score,
                "status": fleet_health_status,
            },

            "recent_trips": recent_trips,

            "alerts": {
                "license_expiry": license_alerts,
                "ai_insights": ai_insights,
                "top_performers": top_performers,
            },
        }
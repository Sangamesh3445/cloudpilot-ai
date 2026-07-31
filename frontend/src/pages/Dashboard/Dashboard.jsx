import { useEffect, useState } from "react";

import { getDashboardData } from "../../services/dashboardService";
import RecentTripsTable from "../../components/dashboard/RecentTripsTable";

import StatCard from "../../components/dashboard/StatCard";
import AnalyticsCard from "../../components/dashboard/AnalyticsCard";
import FleetHealthCard from "../../components/dashboard/FleetHealthCard";
import AlertsPanel from "../../components/dashboard/AlertsPanel";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await getDashboardData();
                setDashboard(data);
            } catch (error) {
                console.error(error);
            }
        }

        loadDashboard();
    }, []);

    if (!dashboard) {
        return (
            <h2 className="text-2xl font-bold">
                Loading Dashboard...
            </h2>
        );
    }

    return (
        <div>

            <h1 className="text-4xl font-bold mb-8">
                Dashboard
            </h1>

            {/* Statistics */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <StatCard
                    title="Drivers"
                    value={dashboard.drivers.total}
                    color="#2563eb"
                />

                <StatCard
                    title="Vehicles"
                    value={dashboard.vehicles.total}
                    color="#16a34a"
                />

                <StatCard
                    title="Trips"
                    value={dashboard.trips.total}
                    color="#ea580c"
                />

                <StatCard
                    title="Fleets"
                    value={dashboard.fleets.total}
                    color="#7c3aed"
                />

            </div>

            {/* Analytics */}

            <div className="mt-10">

                <h2 className="text-2xl font-bold mb-5">
                    Analytics
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">

                    <AnalyticsCard
                        title="Avg Distance"
                        value={dashboard.analytics.average_trip_distance}
                        unit=" km"
                    />

                    <AnalyticsCard
                        title="Avg Duration"
                        value={dashboard.analytics.average_trip_duration}
                        unit=" hr"
                    />

                    <AnalyticsCard
                        title="Total Distance"
                        value={dashboard.analytics.total_distance_travelled}
                        unit=" km"
                    />

                    <AnalyticsCard
                        title="Driver Utilization"
                        value={dashboard.analytics.driver_utilization_percent}
                        unit="%"
                    />

                    <AnalyticsCard
                        title="Vehicle Utilization"
                        value={dashboard.analytics.vehicle_utilization_percent}
                        unit="%"
                    />

                </div>

            </div>

            {/* Fleet Health + Alerts */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

                <FleetHealthCard
                    score={dashboard.fleet_health.score}
                    status={dashboard.fleet_health.status}
                />

                <AlertsPanel
                    alerts={dashboard.alerts}
                />

            </div>
            <div className="mt-10">

                <RecentTripsTable
                    trips={dashboard.recent_trips}
                />

            </div>

        </div>
    );
}

export default Dashboard;
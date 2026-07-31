import { useEffect, useState } from "react";

import api from "../api/axios";

import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import RecentTripsTable from "../components/RecentTripsTable";
import AIInsights from "../components/AIInsights";

import TripStatusChart from "../components/charts/TripStatusChart";
import FleetUtilizationChart from "../components/charts/FleetUtilizationChart";
import MonthlyTripDistanceChart from "../components/charts/MonthlyTripDistanceChart";

export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Dashboard | CloudPilot AI";

        async function loadDashboard() {
            try {
                const response = await api.get("/dashboard/");

                if (import.meta.env.DEV) {
                    console.log(response.data);
                }

                console.log("Dashboard Data:", response.data.data);
                console.log("Trips Object:", response.data.data.trips);

                setDashboard(response.data.data);
            } catch (err) {
                if (import.meta.env.DEV) {
                    console.error(err);
                }

                setError("Unable to load dashboard.");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <h2 className="text-xl font-semibold text-gray-600">
                        Loading Dashboard...
                    </h2>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <h2 className="text-xl font-semibold text-red-600">
                        {error}
                    </h2>
                </div>
            </Layout>
        );
    }

    return (

        <Layout>

            <h1 className="text-4xl font-bold mb-8">
                CloudPilot AI Dashboard
            </h1>

            {/* ===========================
                    OVERVIEW
            =========================== */}

            <h2 className="text-2xl font-semibold mt-8 mb-5">
                Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                <DashboardCard
                    title="Drivers"
                    value={dashboard.drivers.total}
                    subtitle={`${dashboard.drivers.available} Available`}
                />

                <DashboardCard
                    title="Vehicles"
                    value={dashboard.vehicles.total}
                    subtitle={`${dashboard.vehicles.available} Available`}
                />

                <DashboardCard
                    title="Trips"
                    value={dashboard.trips.total}
                    subtitle={`${dashboard.trips.completed} Completed`}
                />

                <DashboardCard
                    title="Fleets"
                    value={dashboard.fleets.total}
                    subtitle={`${dashboard.fleets.active} Active`}
                />

            </div>

            {/* ===========================
                    ANALYTICS
            =========================== */}

            <h2 className="text-2xl font-semibold mt-12 mb-5">
                Analytics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                <DashboardCard
                    title="Average Distance"
                    value={`${dashboard.analytics.average_trip_distance} km`}
                    subtitle="Per Trip"
                />

                <DashboardCard
                    title="Average Duration"
                    value={`${dashboard.analytics.average_trip_duration} hr`}
                    subtitle="Per Trip"
                />

                <DashboardCard
                    title="Driver Utilization"
                    value={`${dashboard.analytics.driver_utilization_percent}%`}
                    subtitle="Current Utilization"
                />

                <DashboardCard
                    title="Fleet Health"
                    value={dashboard.fleet_health.score}
                    subtitle={dashboard.fleet_health.status}
                />

            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

                <TripStatusChart trips={dashboard.trips} />

                <FleetUtilizationChart fleets={dashboard.fleets.list ?? []} />

            </div>

            <div className="mt-6">

                <MonthlyTripDistanceChart trips={dashboard.recent_trips} />

            </div>

            {/* ===========================
                    RECENT TRIPS
            =========================== */}

            <RecentTripsTable
                trips={dashboard.recent_trips}
            />

            {/* ===========================
                    AI INSIGHTS
            =========================== */}

            <AIInsights
                alerts={dashboard.alerts}
                fleetHealth={dashboard.fleet_health}
            />

        </Layout>

    );

}
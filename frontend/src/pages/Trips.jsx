import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import TripForm from "../components/trips/TripForm";

import {
    getTrips,
    createTrip,
    updateTrip,
    deleteTrip,
} from "../services/tripService";

function Trips() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [selectedTrip, setSelectedTrip] = useState(null);

    const [search, setSearch] = useState("");

    useEffect(() => {
        loadTrips();
    }, []);

    async function loadTrips() {
        if (!loading) {
            setRefreshing(true);
        }
        try {
            const data = await getTrips();

            if (import.meta.env.DEV) {
                console.log("Trip API Response:", data);
            }

            if (Array.isArray(data)) {
                setTrips(data);
            } else if (Array.isArray(data.results)) {
                setTrips(data.results);
            } else {
                setTrips([]);
            }
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error(error);
            }
            setTrips([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    async function handleSaveTrip(tripData) {
        try {
            if (selectedTrip) {
                await updateTrip(selectedTrip.id, tripData);
            } else {
                await createTrip(tripData);
            }

            await loadTrips();

            setSelectedTrip(null);
            setShowForm(false);

            toast.success(
                selectedTrip
                    ? "Trip updated successfully."
                    : "Trip created successfully."
            );
        } catch (error) {
           if (import.meta.env.DEV) {
            console.error(error);
            }

            toast.error(
                error.response?.data?.message ||
                "Unable to save trip."
            );
        }
    }

    function handleEditTrip(trip) {
        setSelectedTrip(trip);
        setShowForm(true);
    }

    async function handleDeleteTrip(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this trip?"
        );

        if (!confirmDelete) return;

        try {
            await deleteTrip(id);

            await loadTrips();

            toast.success("Trip deleted successfully.");
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error(error);
            }

            toast.error(
                error.response?.data?.message ||
                "Unable to delete trip."
            );
        }
    }

    function handleCancel() {
        setSelectedTrip(null);
        setShowForm(false);
    }

    const filteredTrips = trips.filter((trip) =>
        `${trip.current_location || ""}
        ${trip.dropoff_location || ""}
        ${trip.status || ""}
        ${trip.driver_details?.first_name || ""}
        ${trip.driver_details?.last_name || ""}
        ${trip.vehicle_details?.vehicle_number || ""}
        ${trip.fleet_details?.fleet_name || ""}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );
    const statusColors = {
        PLANNED: "bg-blue-100 text-blue-700",
        ASSIGNED: "bg-yellow-100 text-yellow-700",
        STARTED: "bg-purple-100 text-purple-700",
        ON_ROUTE: "bg-orange-100 text-orange-700",
        COMPLETED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-700",
    };
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <h2 className="text-xl font-semibold text-gray-600">
                    Loading Trips...
                </h2>
            </div>
        );
    }

    return (
        <div className="p-6">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Trips
                    </h1>

                    {refreshing && (
                        <p className="text-sm text-blue-600 mt-1">
                            Refreshing...
                        </p>
                    )}

                </div>

                <button
                    onClick={() => {
                        setSelectedTrip(null);
                        setShowForm(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
                >
                    + Add Trip
                </button>

            </div>

            {showForm && (
                <TripForm
                    trip={selectedTrip}
                    onSave={handleSaveTrip}
                    onCancel={handleCancel}
                />
            )}

            <div className="mb-6">

                <input
                    type="text"
                    placeholder="Search Trips..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-lg px-4 py-3"
                />

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead>

                        <tr className="border-b bg-gray-100">

                            <th className="p-4 text-left">Driver</th>
                            <th className="p-4 text-left">Vehicle</th>
                            <th className="p-4 text-left">Fleet</th>
                            <th className="p-4 text-left">Pickup</th>
                            <th className="p-4 text-left">Dropoff</th>
                            <th className="p-4 text-left">Distance</th>
                            <th className="p-4 text-left">Duration</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredTrips.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="9"
                                    className="text-center p-6"
                                >
                                    No Trips Found
                                </td>

                            </tr>

                        ) : (

                            filteredTrips.map((trip) => (

                                <tr
                                    key={trip.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-4">
                                        {trip.driver_details?.first_name}{" "}
                                        {trip.driver_details?.last_name}
                                    </td>

                                    <td className="p-4">
                                        {trip.vehicle_details?.vehicle_number}
                                    </td>

                                    <td className="p-4">
                                        {trip.fleet_details?.fleet_name}
                                    </td>

                                    <td className="p-4">
                                        {trip.current_location}
                                    </td>

                                    <td className="p-4">
                                        {trip.dropoff_location}
                                    </td>

                                    <td className="p-4">
                                        {trip.distance_km} km
                                    </td>

                                    <td className="p-4">
                                        {trip.duration_hr} hr
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full font-medium ${
                                                statusColors[trip.status] ||
                                                "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {trip.status}
                                        </span>
                                    </td>

                                    <td className="p-4 text-center">

                                        <button
                                            onClick={() => handleEditTrip(trip)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDeleteTrip(trip.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Trips;
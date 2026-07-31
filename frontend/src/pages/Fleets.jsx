import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import FleetForm from "../components/fleets/FleetForm";

import {
    getFleets,
    createFleet,
    updateFleet,
    deleteFleet,
} from "../services/fleetService";

function Fleets() {
    const [fleets, setFleets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [selectedFleet, setSelectedFleet] = useState(null);

    const [search, setSearch] = useState("");

    useEffect(() => {
        document.title = "Fleets | CloudPilot AI";
    }, []);

    useEffect(() => {
        loadFleets();
    }, []);

    async function loadFleets() {

        if (!loading) {
            setRefreshing(true);
        }

        try {

            const data = await getFleets();

            if (import.meta.env.DEV) {
                console.log("Fleet API Response:", data);
            }

            if (Array.isArray(data)) {
                setFleets(data);
            } else if (Array.isArray(data.results)) {
                setFleets(data.results);
            } else {
                setFleets([]);
            }

        } catch (error) {

            if (import.meta.env.DEV) {
                console.error(error);
            }

            toast.error("Unable to load fleets.");

            setFleets([]);

        } finally {

            setLoading(false);
            setRefreshing(false);

        }

    }

    async function handleSaveFleet(fleetData) {
        try {
            if (selectedFleet) {
                await updateFleet(
                    selectedFleet.id,
                    fleetData
                );
            } else {
                await createFleet(fleetData);
            }

            await loadFleets();

            setSelectedFleet(null);

            setShowForm(false);

            toast.success(
                selectedFleet
                    ? "Fleet updated successfully."
                    : "Fleet created successfully."
            );
        }
        catch (error) {

                if (import.meta.env.DEV) {
                    console.error(error);
                }

                toast.error(
                    error.response?.data?.message ||
                    "Unable to save fleet."
                );
            }
    }

    function handleEditFleet(fleet) {
        setSelectedFleet(fleet);

        setShowForm(true);
    }

    async function handleDeleteFleet(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this fleet?"
        );

        if (!confirmDelete) return;

        try {
            await deleteFleet(id);

            await loadFleets();

            toast.success("Fleet deleted successfully.");
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error(error);
            }

            toast.error(
                error.response?.data?.message ||
                "Unable to delete fleet."
            );
        }
    }

    function handleCancel() {
        setSelectedFleet(null);

        setShowForm(false);
    }

    const filteredFleets = fleets.filter((fleet) =>
        `${fleet.fleet_name}
        ${fleet.fleet_code}
        ${fleet.manager_name || ""}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <h2 className="text-xl font-semibold text-gray-600">
                    Loading Fleets...
                </h2>
            </div>
        );
    }
   return (

    <div>

        <div className="flex justify-between items-center mb-8">

            <div>

                <h1 className="text-4xl font-bold">
                    Fleets
                </h1>

                {refreshing && (
                    <p className="text-sm text-blue-600 mt-1">
                        Refreshing...
                    </p>
                )}

            </div>

            <button
                onClick={() => {
                    setSelectedFleet(null);
                    setShowForm(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
                + Add Fleet
            </button>

        </div>

        {showForm && (
            <FleetForm
                fleet={selectedFleet}
                onSave={handleSaveFleet}
                onCancel={handleCancel}
            />
        )}

        <div className="mb-6">

            <input
                type="text"
                placeholder="Search Fleet..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
            />

        </div>

        <div className="bg-white rounded-xl shadow">

            <table className="w-full">

                <thead>

                    <tr className="border-b bg-gray-100">

                        <th className="p-4 text-left">
                            Fleet Name
                        </th>

                        <th className="p-4 text-left">
                            Fleet Code
                        </th>

                        <th className="p-4 text-left">
                            Manager
                        </th>

                        <th className="p-4 text-left">
                            Description
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>

                        <th className="p-4 text-center">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {filteredFleets.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center p-6"
                            >
                                No Fleets Found
                            </td>

                        </tr>

                    ) : (

                        filteredFleets.map((fleet) => (

                            <tr
                                key={fleet.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4 font-medium">
                                    {fleet.fleet_name}
                                </td>

                                <td className="p-4">
                                    {fleet.fleet_code}
                                </td>

                                <td className="p-4">
                                    {fleet.manager_name}
                                </td>

                                <td className="p-4">
                                    {fleet.description || "-"}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            fleet.status === "ACTIVE"
                                                ? "bg-green-100 text-green-700"
                                                : fleet.status === "INACTIVE"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {fleet.status}
                                    </span>

                                </td>

                                <td className="p-4 text-center">

                                    <button
                                        onClick={() => handleEditFleet(fleet)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDeleteFleet(fleet.id)}
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

export default Fleets;
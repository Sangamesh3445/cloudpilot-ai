import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import VehicleForm from "../components/vehicles/VehicleForm";

import {
    getVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
} from "../services/vehicleService";

function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
        loadVehicles();
    }, []);

    async function loadVehicles() {

        try {

            const data = await getVehicles();
            if (import.meta.env.DEV) {
                console.log("Vehicle API Response:", data);
            }

            // DRF Pagination Support
            if (Array.isArray(data)) {
                setVehicles(data);
            } else if (Array.isArray(data.results)) {
                setVehicles(data.results);
            } else {
                setVehicles([]);
            }

        } catch (error) {

            console.error(error);

            setVehicles([]);

        } finally {

            setLoading(false);

        }

    }

    async function handleSaveVehicle(vehicleData) {

        if (import.meta.env.DEV) {
            console.log("Saving Vehicle...");
            console.log("Selected Vehicle:", selectedVehicle);
            console.log("Payload:", vehicleData);
        }

        try {

            if (selectedVehicle) {

                if (import.meta.env.DEV) {
                    console.log("Updating Vehicle:", selectedVehicle.id);
                }

                await updateVehicle(
                    selectedVehicle.id,
                    vehicleData
                );

            } else {

                if (import.meta.env.DEV) {
                    console.log("Creating Vehicle");
                }

                await createVehicle(vehicleData);

            }

            await loadVehicles();

            setSelectedVehicle(null);
            setShowForm(false);
            
            toast.success(
                selectedVehicle
                    ? "Vehicle updated successfully."
                    : "Vehicle created successfully."
            );

        } catch (error) {

            console.error(error);

            if (import.meta.env.DEV) {
                console.log("Response:", error.response);
            }

            toast.error(
                error.response?.data?.message ||
                "Unable to save vehicle."
            );

        }

    }
    function handleEditVehicle(vehicle) {

        setSelectedVehicle(vehicle);

        setShowForm(true);

    }

    async function handleDeleteVehicle(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this vehicle?"
        );

        if (!confirmDelete) return;

        try {

            await deleteVehicle(id);

            await loadVehicles();

            toast.success("Vehicle deleted successfully.");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to delete vehicle."
            );

        }

    }

    function handleCancel() {

        setSelectedVehicle(null);

        setShowForm(false);

    }
    const statusColors = {
        AVAILABLE: "bg-green-100 text-green-700",
        ON_TRIP: "bg-blue-100 text-blue-700",
        MAINTENANCE: "bg-orange-100 text-orange-700",
        INACTIVE: "bg-red-100 text-red-700",
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <h2 className="text-xl font-semibold text-gray-600">
                    Loading Vehicles...
                </h2>
            </div>
        );
    }

    return (

        <div>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">

                    Vehicles

                </h1>

                <button

                    onClick={() => {

                        setSelectedVehicle(null);

                        setShowForm(true);

                    }}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"

                >

                    + Add Vehicle

                </button>

            </div>

            {showForm && (

                <VehicleForm

                    vehicle={selectedVehicle}

                    onSave={handleSaveVehicle}

                    onCancel={handleCancel}

                />

            )}

            <div className="bg-white rounded-xl shadow">

                <table className="w-full">

                    <thead>

                    <tr className="border-b bg-gray-100">

                        <th className="p-4 text-left">
                            Vehicle
                        </th>

                        <th className="p-4 text-left">
                            Manufacturer
                        </th>

                        <th className="p-4 text-left">
                            Model
                        </th>

                        <th className="p-4 text-left">
                            Capacity
                        </th>

                        <th className="p-4 text-left">
                            Fleet
                        </th>

                        <th className="p-4 text-left">
                            Driver
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

                        {vehicles.length === 0 ? (

                            <tr>

                                <td

                                    colSpan="8"

                                    className="text-center p-6"

                                >

                                    No Vehicles Found

                                </td>

                            </tr>

                        ) : (

                            vehicles.map((vehicle) => (

                                <tr

                                    key={vehicle.id}

                                    className="border-b hover:bg-gray-50"

                                >

                                    <td className="p-4">

                                        {vehicle.vehicle_number}

                                    </td>

                                    <td className="p-4">

                                        {vehicle.manufacturer}

                                    </td>

                                    <td className="p-4">

                                        {vehicle.model}

                                    </td>

                                    <td className="p-4">

                                        {vehicle.capacity_kg} KG

                                    </td>

                                    <td className="p-4">
                                        {vehicle.fleet_details?.fleet_name || "-"}
                                    </td>

                                    <td className="p-4">
                                        {vehicle.assigned_driver_details
                                            ? `${vehicle.assigned_driver_details.first_name} ${vehicle.assigned_driver_details.last_name}`
                                            : "-"}
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full font-medium ${
                                                statusColors[vehicle.status] ||
                                                "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {vehicle.status}
                                        </span>
                                    </td>

                                    <td className="p-4 text-center">

                                        <button

                                            onClick={() =>
                                                handleEditVehicle(vehicle)
                                            }

                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"

                                        >

                                            Edit

                                        </button>

                                        <button

                                            onClick={() =>
                                                handleDeleteVehicle(vehicle.id)
                                            }

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

export default Vehicles;
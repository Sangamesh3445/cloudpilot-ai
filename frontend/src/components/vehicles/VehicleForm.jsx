import { useEffect, useState } from "react";

import { getFleets } from "../../services/fleetService";
import { getDrivers } from "../../services/driverService";

function VehicleForm({ onSave, onCancel, vehicle }) {

    const [formData, setFormData] = useState({
        vehicle_number: "",
        manufacturer: "",
        model: "",
        manufacturing_year: "",
        vehicle_type: "TRUCK",
        fuel_type: "DIESEL",
        capacity_kg: "",
        assigned_driver: "",
        fleet: "",
        status: "AVAILABLE",
    });

    const [fleets, setFleets] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        async function loadData() {

            try {

                const fleetData = await getFleets();

                if (import.meta.env.DEV) {
                    console.log("Fleet Response:", fleetData);
                }

                setFleets(
                    Array.isArray(fleetData)
                        ? fleetData
                        : fleetData.results || []
                );

                const driverData = await getDrivers();

                if (import.meta.env.DEV) {
                    console.log("Driver Response:", driverData);
                }
                setDrivers(
                    Array.isArray(driverData)
                        ? driverData
                        : driverData.results || []
                );

            } catch (error) {

                console.error("Load Error:", error);

            }

        }

        loadData();

    }, []);

    useEffect(() => {

        if (vehicle) {

            setFormData({
                vehicle_number: vehicle.vehicle_number || "",
                manufacturer: vehicle.manufacturer || "",
                model: vehicle.model || "",
                manufacturing_year: vehicle.manufacturing_year || "",
                vehicle_type: vehicle.vehicle_type || "TRUCK",
                fuel_type: vehicle.fuel_type || "DIESEL",
                capacity_kg: vehicle.capacity_kg || "",
                assigned_driver: vehicle.assigned_driver || "",
                fleet: vehicle.fleet || "",
                status: vehicle.status || "AVAILABLE",
            });

        } else {

            setFormData({
                vehicle_number: "",
                manufacturer: "",
                model: "",
                manufacturing_year: "",
                vehicle_type: "TRUCK",
                fuel_type: "DIESEL",
                capacity_kg: "",
                assigned_driver: "",
                fleet: "",
                status: "AVAILABLE",
            });

        }

    }, [vehicle]);

    function handleChange(e) {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    }

    async function handleSubmit(e) {

        e.preventDefault();
        setSaving(true);
        const year = Number(formData.manufacturing_year);

        if (year < 1990 || year > new Date().getFullYear() + 1) {
            alert("Please enter a valid manufacturing year.");
            setSaving(false);
            return;
        }

        if (Number(formData.capacity_kg) <= 0) {
            alert("Capacity must be greater than 0.");
            setSaving(false);
            return;
        }

        const payload = {

            ...formData,

            manufacturing_year: Number(formData.manufacturing_year),

            capacity_kg: Number(formData.capacity_kg),

            assigned_driver:
                formData.assigned_driver || null,

            fleet:
                formData.fleet || null,

        };

        if (import.meta.env.DEV) {
            console.log("================================");
            console.log("Vehicle Payload");
            console.log(payload);
            console.log("================================");
        }

        try {

            await onSave(payload);

        } finally {

            setSaving(false);

        }

    }

    return (

        <div className="bg-white rounded-xl shadow p-6 mb-8">

            <h2 className="text-2xl font-bold mb-6">
                {vehicle ? "Edit Vehicle" : "Add Vehicle"}
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4"
            >

                <input
                    name="vehicle_number"
                    value={formData.vehicle_number}
                    onChange={handleChange}
                    placeholder="Vehicle Number"
                    className="border p-3 rounded"
                    required
                />

                <input
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    placeholder="Manufacturer"
                    className="border p-3 rounded"
                    required
                />

                <input
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Model"
                    className="border p-3 rounded"
                    required
                />

                <input
                    type="number"
                    name="manufacturing_year"
                    value={formData.manufacturing_year}
                    onChange={handleChange}
                    placeholder="Manufacturing Year"
                    className="border p-3 rounded"
                    required
                />

                <input
                    type="number"
                    name="capacity_kg"
                    value={formData.capacity_kg}
                    onChange={handleChange}
                    placeholder="Capacity (KG)"
                    className="border p-3 rounded"
                    required
                />

                <select
                    name="vehicle_type"
                    value={formData.vehicle_type}
                    onChange={handleChange}
                    className="border p-3 rounded"
                >
                    <option value="TRUCK">Truck</option>
                    <option value="VAN">Van</option>
                    <option value="TRAILER">Trailer</option>
                    <option value="PICKUP">Pickup</option>
                </select>

                <select
                    name="fuel_type"
                    value={formData.fuel_type}
                    onChange={handleChange}
                    className="border p-3 rounded"
                >
                    <option value="DIESEL">Diesel</option>
                    <option value="PETROL">Petrol</option>
                    <option value="CNG">CNG</option>
                    <option value="ELECTRIC">Electric</option>
                </select>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border p-3 rounded"
                >
                    <option value="AVAILABLE">Available</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="ON_TRIP">On Trip</option>
                    <option value="MAINTENANCE">Maintenance</option>
                </select>

                <select
                    name="assigned_driver"
                    value={formData.assigned_driver}
                    onChange={handleChange}
                    className="border p-3 rounded"
                >

                    <option value="">
                        Select Driver
                    </option>

                    {drivers.map((driver) => (

                        <option
                            key={driver.id}
                            value={driver.id}
                        >
                            {driver.first_name} {driver.last_name}
                        </option>

                    ))}

                </select>

                <select
                    name="fleet"
                    value={formData.fleet}
                    onChange={handleChange}
                    className="border p-3 rounded"
                >

                    <option value="">
                        Select Fleet
                    </option>

                    {fleets.map((fleet) => (

                        <option
                            key={fleet.id}
                            value={fleet.id}
                        >
                            {fleet.fleet_name}
                        </option>

                    ))}

                </select>

                <div className="col-span-2 flex gap-4 mt-4">

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded"
                    >
                        {saving
                            ? "Saving..."
                            : vehicle
                                ? "Update Vehicle"
                                : "Save Vehicle"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

}

export default VehicleForm;
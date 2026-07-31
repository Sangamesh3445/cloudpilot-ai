    import { useEffect, useState } from "react";

    import { getDrivers } from "../../services/driverService";
    import { getVehicles } from "../../services/vehicleService";
    import { getFleets } from "../../services/fleetService";

    function TripForm({ trip, onSave, onCancel }) {
        const [formData, setFormData] = useState({
            current_location: trip?.current_location || "",
            dropoff_location: trip?.dropoff_location || "",
            fleet: trip?.fleet || "",
            vehicle: trip?.vehicle || "",
            driver: trip?.driver || "",
            status: trip?.status || "PLANNED",
        });
        const [drivers, setDrivers] = useState([]);
        const [vehicles, setVehicles] = useState([]);
        const [fleets, setFleets] = useState([]);
        const [saving, setSaving] = useState(false);
        useEffect(() => {
            loadDropdowns();
        }, []);

        useEffect(() => {
            setFormData({
                current_location: trip?.current_location || "",
                dropoff_location: trip?.dropoff_location || "",
                fleet: trip?.fleet || "",
                vehicle: trip?.vehicle || "",
                driver: trip?.driver || "",
                status: trip?.status || "PLANNED",
            });
        }, [trip]);

        async function loadDropdowns() {
            try {
                const driverData = await getDrivers();
                const vehicleData = await getVehicles();
                const fleetData = await getFleets();

                setDrivers(driverData.results || driverData);
                setVehicles(vehicleData.results || vehicleData);
                setFleets(fleetData.results || fleetData);
            } 
            catch (error) {
                if (import.meta.env.DEV) {
                    console.error("Full Error:", error);

                    console.log("Backend Response:");
                    console.log(error.response?.data);
                }

                alert(
                    JSON.stringify(error.response?.data, null, 2)
                );
            }
        }

        function handleChange(e) {
            const { name, value } = e.target;

            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        async function handleSubmit(e) {
            e.preventDefault();

            setSaving(true);

            try {
                await onSave({
                    ...formData,
                    current_location: formData.current_location.trim(),
                    dropoff_location: formData.dropoff_location.trim(),
                });
            } finally {
                setSaving(false);
            }
        }

        return (
            <div className="bg-white shadow rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6">
                    {trip ? "Edit Trip" : "Add Trip"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="current_location"
                        placeholder="Current Location"
                        value={formData.current_location}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                        required
                    />

                    <input
                        type="text"
                        name="dropoff_location"
                        placeholder="Dropoff Location"
                        value={formData.dropoff_location}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                        required
                    />

                    <select
                        name="fleet"
                        value={formData.fleet}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                        required
                    >
                        <option value="">Select Fleet</option>

                        {fleets.map((fleet) => (
                            <option
                                key={fleet.id}
                                value={fleet.id}
                            >
                                {fleet.fleet_name} ({fleet.fleet_code})
                            </option>
                        ))}
                    </select>

                    <select
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                        required
                    >
                        <option value="">Select Vehicle</option>

                        {vehicles.map((vehicle) => (
                            <option
                                key={vehicle.id}
                                value={vehicle.id}
                            >
                                {vehicle.vehicle_number} - {vehicle.manufacturer} {vehicle.model}
                            </option>
                        ))}
                    </select>

                    <select
                        name="driver"
                        value={formData.driver}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                        required
                    >
                        <option value="">Select Driver</option>

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
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        <option value="PLANNED">Planned</option>
                        <option value="ASSIGNED">Assigned</option>
                        <option value="STARTED">Started</option>
                        <option value="ON_ROUTE">On Route</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-5 py-3 rounded-lg"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>

                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={saving}
                            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-5 py-3 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    export default TripForm;
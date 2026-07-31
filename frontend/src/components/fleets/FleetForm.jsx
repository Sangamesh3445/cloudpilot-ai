import { useEffect, useState } from "react";

function FleetForm({ fleet, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        fleet_name: "",
        fleet_code: "",
        manager_name: "",
        description: "",
        status: "ACTIVE",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (fleet) {

            setFormData({
                fleet_name: fleet.fleet_name || "",
                fleet_code: fleet.fleet_code || "",
                manager_name: fleet.manager_name || "",
                description: fleet.description || "",
                status: fleet.status || "ACTIVE",
            });

        } else {

            setFormData({
                fleet_name: "",
                fleet_code: "",
                manager_name: "",
                description: "",
                status: "ACTIVE",
            });

        }

    }, [fleet]);

    function handleChange(e) {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    }

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            ...formData,
            fleet_name: formData.fleet_name.trim(),
            fleet_code: formData.fleet_code.trim(),
            manager_name: formData.manager_name.trim(),
        };
        setSaving(true);
        try {

            await onSave(payload);

        } finally {

            setSaving(false);

        }
    }

    return (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">
                {fleet ? "Edit Fleet" : "Add Fleet"}
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4"
            >
                <input
                    type="text"
                    name="fleet_name"
                    value={formData.fleet_name}
                    onChange={handleChange}
                    placeholder="Fleet Name"
                    className="border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    name="fleet_code"
                    value={formData.fleet_code}
                    onChange={handleChange}
                    placeholder="Fleet Code"
                    className="border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    name="manager_name"
                    value={formData.manager_name}
                    onChange={handleChange}
                    placeholder="Manager Name"
                    className="border p-3 rounded"
                    required
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border p-3 rounded"
                >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Fleet Description"
                    rows="4"
                    className="border p-3 rounded col-span-2"
                />

                <div className="col-span-2 flex gap-4 mt-4">

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded"
                    >
                        {saving
                            ? "Saving..."
                            : fleet
                                ? "Update Fleet"
                                : "Save Fleet"}
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

export default FleetForm;
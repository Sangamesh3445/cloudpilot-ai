import { useState } from "react";

function DriverForm({ onSave, onCancel }) {

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        license_number: "",
        license_expiry: "",
        status: "AVAILABLE",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(formData);
    }

    return (

        <div className="bg-white rounded-xl shadow p-6 mb-8">

            <h2 className="text-2xl font-bold mb-6">
                Add Driver
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4"
            >

                <input
                    name="first_name"
                    placeholder="First Name"
                    onChange={handleChange}
                    className="border p-3 rounded"
                />

                <input
                    name="last_name"
                    placeholder="Last Name"
                    onChange={handleChange}
                    className="border p-3 rounded"
                />

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="border p-3 rounded"
                />

                <input
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    className="border p-3 rounded"
                />

                <input
                    name="license_number"
                    placeholder="License Number"
                    onChange={handleChange}
                    className="border p-3 rounded"
                />

                <input
                    type="date"
                    name="license_expiry"
                    onChange={handleChange}
                    className="border p-3 rounded"
                />

                <select
                    name="status"
                    onChange={handleChange}
                    className="border p-3 rounded"
                >
                    <option value="AVAILABLE">Available</option>
                    <option value="DRIVING">Driving</option>
                    <option value="OFF_DUTY">Off Duty</option>
                </select>

                <div className="col-span-2 flex gap-4 mt-4">

                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded"
                    >
                        Save Driver
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-6 py-3 rounded"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

}

export default DriverForm;
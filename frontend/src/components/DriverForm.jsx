import { useEffect, useState } from "react";

export default function DriverForm({
    onSubmit,
    onCancel,
    initialData = null,
}) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        license_number: "",
        license_expiry: "",
        status: "AVAILABLE",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                first_name: initialData.first_name || "",
                last_name: initialData.last_name || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                license_number: initialData.license_number || "",
                license_expiry: initialData.license_expiry || "",
                status: initialData.status || "AVAILABLE",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div
            style={{
                background: "#ffffff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                marginBottom: "30px",
            }}
        >
            <h2
                style={{
                    marginBottom: "25px",
                }}
            >
                {initialData ? "Edit Driver" : "Add Driver"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                    }}
                >
                    <div>
                        <label>First Name</label>

                        <input
                            style={styles.input}
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Last Name</label>

                        <input
                            style={styles.input}
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Email</label>

                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Phone</label>

                        <input
                            style={styles.input}
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>License Number</label>

                        <input
                            style={styles.input}
                            type="text"
                            name="license_number"
                            value={formData.license_number}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>License Expiry</label>

                        <input
                            style={styles.input}
                            type="date"
                            name="license_expiry"
                            value={formData.license_expiry}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Status</label>

                        <select
                            style={styles.input}
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="AVAILABLE">
                                AVAILABLE
                            </option>

                            <option value="DRIVING">
                                DRIVING
                            </option>

                            <option value="OFF_DUTY">
                                OFF DUTY
                            </option>
                        </select>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        marginTop: "30px",
                    }}
                >
                    <button
                        type="submit"
                        style={styles.primaryButton}
                    >
                        {initialData
                            ? "Update Driver"
                            : "Save Driver"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        style={styles.secondaryButton}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

const styles = {
    input: {
        width: "100%",
        padding: "12px",
        marginTop: "8px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "15px",
        boxSizing: "border-box",
    },

    primaryButton: {
        background: "#2563eb",
        color: "#ffffff",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
    },

    secondaryButton: {
        background: "#e5e7eb",
        color: "#111827",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
    },
};
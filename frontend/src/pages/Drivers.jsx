import { useEffect, useState } from "react";
import api from "../api/axios";

import Layout from "../components/Layout";
import DriverTable from "../components/DriverTable";
import DriverForm from "../components/DriverForm";

export default function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingDriver, setEditingDriver] = useState(null);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            setLoading(true);

            const response = await api.get("/drivers/");

            const data =
                response.data.results ||
                response.data.data?.results ||
                response.data.data ||
                [];

            setDrivers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDriver = async (driverData) => {
        try {
            await api.post("/drivers/", driverData);

            await fetchDrivers();

            setShowForm(false);

            alert("Driver created successfully.");
        } catch (error) {
            console.error(error);

            alert("Unable to create driver.");
        }
    };

    const handleUpdateDriver = async (driverData) => {
        try {
            await api.put(
                `/drivers/${editingDriver.id}/`,
                driverData
            );

            await fetchDrivers();

            setEditingDriver(null);

            setShowForm(false);

            alert("Driver updated successfully.");
        } catch (error) {
            console.error(error);

            alert("Unable to update driver.");
        }
    };

    // ============================
    // DELETE DRIVER
    // ============================

    const handleDeleteDriver = async (driverId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this driver?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/drivers/${driverId}/`);

            await fetchDrivers();

            alert("Driver deleted successfully.");
        } catch (error) {
            console.error(error);

            alert("Unable to delete driver.");
        }
    };

    const filteredDrivers = drivers.filter((driver) =>
        `${driver.first_name} ${driver.last_name}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <Layout>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <h1>Drivers</h1>

                <button
                    onClick={() => {
                        setEditingDriver(null);
                        setShowForm(!showForm);
                    }}
                    style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                >
                    {showForm ? "Close Form" : "+ Add Driver"}
                </button>
            </div>

            {showForm && (
                <DriverForm
                    initialData={editingDriver}
                    onSubmit={
                        editingDriver
                            ? handleUpdateDriver
                            : handleCreateDriver
                    }
                    onCancel={() => {
                        setEditingDriver(null);
                        setShowForm(false);
                    }}
                />
            )}

            <input
                type="text"
                placeholder="Search Driver..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    marginBottom: "20px",
                }}
            />

            {loading ? (
                <h3>Loading Drivers...</h3>
            ) : (
                <DriverTable
                    drivers={filteredDrivers}
                    onEdit={(driver) => {
                        setEditingDriver(driver);
                        setShowForm(true);
                    }}
                    onDelete={handleDeleteDriver}
                />
            )}
        </Layout>
    );
}
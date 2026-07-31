export default function DriverTable({
    drivers,
    onEdit,
    onDelete,
}) {
    if (!drivers || drivers.length === 0) {
        return (
            <div
                style={{
                    padding: "30px",
                    textAlign: "center",
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
            >
                <h3>No Drivers Found</h3>
            </div>
        );
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case "AVAILABLE":
                return {
                    background: "#dcfce7",
                    color: "#166534",
                };

            case "ON_TRIP":
                return {
                    background: "#fef3c7",
                    color: "#92400e",
                };

            default:
                return {
                    background: "#fee2e2",
                    color: "#991b1b",
                };
        }
    };

    return (
        <div
            style={{
                overflowX: "auto",
                background: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
        >
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr
                        style={{
                            background: "#f3f4f6",
                        }}
                    >
                        <th style={styles.heading}>First Name</th>
                        <th style={styles.heading}>Last Name</th>
                        <th style={styles.heading}>Email</th>
                        <th style={styles.heading}>Phone</th>
                        <th style={styles.heading}>License</th>
                        <th style={styles.heading}>Status</th>
                        <th style={styles.heading}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {drivers.map((driver) => (
                        <tr key={driver.id}>
                            <td style={styles.cell}>{driver.first_name}</td>
                            <td style={styles.cell}>{driver.last_name}</td>
                            <td style={styles.cell}>{driver.email}</td>
                            <td style={styles.cell}>{driver.phone}</td>
                            <td style={styles.cell}>{driver.license_number}</td>

                            <td style={styles.cell}>
                                <span
                                    style={{
                                        ...styles.badge,
                                        ...getStatusStyle(driver.status),
                                    }}
                                >
                                    {driver.status}
                                </span>
                            </td>

                            <td style={styles.cell}>
                                <button
                                    onClick={() => onEdit(driver)}
                                    style={{
                                        ...styles.button,
                                        background: "#2563eb",
                                        color: "#fff",
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => onDelete(driver.id)}
                                    style={{
                                        ...styles.button,
                                        background: "#dc2626",
                                        color: "#fff",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    heading: {
        padding: "14px",
        textAlign: "left",
        borderBottom: "1px solid #ddd",
        fontWeight: "600",
    },

    cell: {
        padding: "14px",
        borderBottom: "1px solid #eee",
    },

    badge: {
        padding: "6px 12px",
        borderRadius: "999px",
        fontWeight: "600",
        fontSize: "13px",
    },

    button: {
        border: "none",
        borderRadius: "6px",
        padding: "7px 14px",
        cursor: "pointer",
    },
};
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div
            style={{
                width: "230px",
                minHeight: "100vh",
                background: "#1f2937",
                color: "#fff",
                padding: "20px",
            }}
        >
            <h2>CloudPilot AI</h2>

            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "30px",
                    gap: "18px",
                }}
            >
                <Link style={styles.link} to="/">
                    Dashboard
                </Link>

                <Link style={styles.link} to="/drivers">
                    Drivers
                </Link>

                <Link style={styles.link} to="/vehicles">
                    Vehicles
                </Link>

                <Link style={styles.link} to="/fleets">
                    Fleets
                </Link>

                <Link style={styles.link} to="/trips">
                    Trips
                </Link>
            </nav>
        </div>
    );
}

const styles = {
    link: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "17px",
    },
};
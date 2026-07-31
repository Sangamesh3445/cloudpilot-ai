export default function Navbar() {
    return (
        <header
            style={{
                height: "70px",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 30px",
                borderBottom: "1px solid #e5e7eb",
            }}
        >
            <h2>Dashboard</h2>

            <div>
                Welcome Admin
            </div>
        </header>
    );
}
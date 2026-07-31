import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div
            style={{
                display: "flex",
                background: "#f5f7fb",
                minHeight: "100vh",
            }}
        >
            <Sidebar />

            <div
                style={{
                    marginLeft: "250px",
                    flex: 1,
                }}
            >
                <Navbar />

                <main
                    style={{
                        padding: "30px",
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
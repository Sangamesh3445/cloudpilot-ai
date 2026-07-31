import { Link } from "react-router-dom";

function Sidebar() {
    const menuItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Drivers", path: "/drivers" },
        { name: "Vehicles", path: "/vehicles" },
        { name: "Fleets", path: "/fleets" },
        { name: "Trips", path: "/trips" },
    ];

    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white">

            <div className="p-6 border-b border-slate-700">
                <h1 className="text-3xl font-bold">
                    CloudPilot AI
                </h1>
            </div>

            <nav className="p-5">

                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="block rounded-lg px-4 py-3 mb-2 hover:bg-slate-700 transition"
                    >
                        {item.name}
                    </Link>
                ))}

            </nav>

        </aside>
    );
}

export default Sidebar;
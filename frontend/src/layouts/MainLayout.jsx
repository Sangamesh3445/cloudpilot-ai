import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout() {
    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-slate-100 min-h-screen">

                <Navbar />

                <main className="p-8">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default MainLayout;
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Fleets from "../pages/Fleets";

import Dashboard from "../pages/Dashboard/Dashboard";
import Drivers from "../pages/Drivers/Drivers";
import Vehicles from "../pages/Vehicles";

import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route element={<MainLayout />}>

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/drivers"
                    element={<Drivers />}
                />
                <Route
                    path="/fleets"
                    element={<Fleets />}
                />

                <Route
                    path="/vehicles"
                    element={<Vehicles />}
                />

            </Route>

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}

export default AppRoutes;
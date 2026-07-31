import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Vehicles from "./pages/Vehicles";
import Fleets from "./pages/Fleets";
import Trips from "./pages/Trips";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/drivers"
                element={
                    <ProtectedRoute>
                        <Drivers />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/vehicles"
                element={
                    <ProtectedRoute>
                        <Vehicles />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/fleets"
                element={
                    <ProtectedRoute>
                        <Fleets />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/trips"
                element={
                    <ProtectedRoute>
                        <Trips />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}
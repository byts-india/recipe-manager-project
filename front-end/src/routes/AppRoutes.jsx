import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import Settings from "../pages/Settings";
import DashboardLayout from "../layouts/DashboardLayout";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/dashboard"
                element={<PrivateRoutes>
                    <DashboardLayout />
                </PrivateRoutes>}
            >
                <Route index element={<Dashboard />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
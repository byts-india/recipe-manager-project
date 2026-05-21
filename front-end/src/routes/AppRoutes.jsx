import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import Settings from "../pages/Settings";
import DashboardLayout from "../layouts/DashboardLayout";
import BannerLayout from "../layouts/BannerLayout";
import ViewRecipe from "../pages/ViewRecipe";
import AddNewRecipe from "../pages/AddNewRecipe";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<BannerLayout/>}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route
                path="/dashboard"
                element={
                <PrivateRoutes>
                    <DashboardLayout />
                </PrivateRoutes>}
            >
                <Route index element={<Dashboard />} />
                <Route path="settings" element={<Settings />} />
                <Route path="add-recipe" element={<AddNewRecipe />} />
                <Route path="recipe/:id" element={<ViewRecipe />} />

            </Route>
        </Routes>
    );
}

export default AppRoutes;
import React from 'react';
import { Link, Outlet, useNavigate, useLocation  } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../../front-end/src/features/auth/authSlice';
import Swal from 'sweetalert2';

export default function DashboardLayout() {
    const userDetails = useSelector((state) => state.auth.userDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
        dispatch(userLogout());
        Swal.fire({
            icon: "success",
            text: "logged out successfully",
            timer: 2000
        }).then(() => {
            navigate("/");
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6">
                    <div className="text-black font-semibold">
                        {`${userDetails?.name?.firstName || ""} ${userDetails?.name?.lastName || ""}`}
                    </div>
                    <div className="flex justify-around space-x-10">
                        <div style={location.pathname === "/dashboard" ? activeStyle : inActiveStyle} className="bg-gray-500 rounded-md text-sm font-medium text-gray-700 capitalize hover:bg-blue-50 hover:text-blue-600">
                            <Link to="/dashboard">
                                home
                            </Link>
                        </div>
                        <div style={location.pathname === "/dashboard/settings" ? activeStyle : inActiveStyle} className="bg-gray-500 rounded-md text-sm font-medium text-gray-700 capitalize hover:bg-blue-50 hover:text-blue-600">
                            <Link to="/dashboard/settings">
                                Settings
                            </Link>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md"
                    >
                        Logout
                    </button>
                </div>

            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-auto">
                <div className="max-w-7xl mx-auto px-4 py-8 text-center">
                    <p className="text-gray-400">© 2026 Recipe Manager. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}


const activeStyle = {
    color: "orange",
    textTransform: "uppercase",
    marginRight: "5px",
    marginLeft: "5px",
};
const inActiveStyle = {
    marginRight: "5px",
    marginLeft: "5px",
};
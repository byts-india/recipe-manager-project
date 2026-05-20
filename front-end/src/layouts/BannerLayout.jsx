import { Outlet } from "react-router";

export default function BannerLayout() {
    return (
        <>
            <div className="w-full bg-red-300 text-center p-2">
                Website may have some technical issue.
            </div>
            <Outlet />
        </>
    );
}
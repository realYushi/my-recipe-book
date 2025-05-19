import { Outlet } from "react-router";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/Sidebar";

function Layout() {
    return (
        <div className="flex flex-col h-screen">
            <div className="w-full">
                <Navbar />
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 flex-shrink-0">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-auto p-4">
                    <Outlet />
                </div>
            </div>
            <div className="w-full">
                <Footer />
            </div>
        </div>
    )
}
export default Layout;
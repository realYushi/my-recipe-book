import { Outlet } from "react-router";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/navbar";

function Layout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
export default Layout;
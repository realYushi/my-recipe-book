import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import authService from "@/service/authService";

export const ProtectedRoute = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        console.log("ProtectedRoute: Authentication check starting");

        const checkAuth = async () => {
            try {
                console.log("ProtectedRoute: Calling authService.isAuthenticated()");
                const isAuth = await authService.isAuthenticated();
                console.log("ProtectedRoute: isAuthenticated result:", isAuth);
                setIsAuthenticated(isAuth);
            } catch (error) {
                console.error("ProtectedRoute: Authentication check error:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};
export default ProtectedRoute;
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { Navigate, Outlet } from "react-router";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import authService from "@/service/authService";
import auth from '@/config/firebaseConfig';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Updated ProtectedRoute that uses the context
export const ProtectedRoute = () => {
    return (
        <AuthProvider>
            <ProtectedRouteContent />
        </AuthProvider>
    );
};

const ProtectedRouteContent = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/app/auth/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
import { Button } from "@/components/ui/button";
import authService from "@/service/authService";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate("/app/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Failed to logout. Please try again.");
        }
    };

    return (
        <Button variant="outline" className="ml-2" onClick={handleLogout}>
            Logout
        </Button>
    );
}

export default LogoutButton;
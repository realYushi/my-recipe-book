import React from "react";
import { Button } from "@/components/ui/button";
import { authService } from "~/service/authService";

const DeleteAccountButton: React.FC = () => {
    const handleDeleteAccount = async () => {
        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmation) return;
        try {
            const idToken = await authService.getJwtToken();
            const response = await fetch("/api/users/delete-account", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", "Authorization": `Bearer ${idToken}`,
                },
            });
            if (response.status === 204) {
                alert("Account deleted successfully.");
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                alert(`Error deleting account: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while deleting the account. Please try again later.");
        }
    }

    return (
        <Button variant="outline" className="ml-auto"
            onClick={handleDeleteAccount}
        >
            Delete Account
        </Button>
    );
}

export default DeleteAccountButton;
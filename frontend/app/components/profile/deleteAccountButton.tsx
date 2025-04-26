import React from "react";
import { Button } from "@/components/ui/button";
import { authService } from "~/service/authService";

const DeleteAccountButton: React.FC = () => {
    const handleDeleteAccount = async () => {
        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmation) return;
        try {
            const isAuthenticated = await authService.isAuthenticated();
            if (!isAuthenticated) {
                alert("You are not authenticated. Please log in again.");
                return;
            }

            const idToken = await authService.getJwtToken();
            const userId = (await authService.getCurrentUser())?.uid;
            if (!userId) {
                alert("Unable to retrieve user ID. Please try again.");
                return;
            }

            const response = await fetch(`/api/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`,
                },
            });
            if (response.status === 204) {
                alert("Account deleted successfully.");
                await authService.logout();
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
    );}

export default DeleteAccountButton;
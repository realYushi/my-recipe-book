import React from "react";
import { Button } from "@/components/ui/button";

const DeleteAccountButton: React.FC = () => {
    const handleDeleteAccount = async () => {
        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if(!confirmation) return;
        try {
            const response = await fetch("/api/users/delete-account", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", Authorization : `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if(response.status === 204) {
                alert("Account deleted successfully.");
                localStorage.removeItem("token");
                window.location.href = "/login"; 
            }
            else {  
                const errorData = await response.json();
                alert(`Error deleting account: ${errorData.error}`);
            }
        } catch (error) {
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
import React from "react";
import { Button } from "@/components/ui/button";
import userService from "@/service/userService";
import { useNavigate } from "react-router-dom";

function DeleteAccountButton() {
    const navigate = useNavigate();
    const handleDeleteAccount = async () => {
        try {
            await userService.deleteAccount();
            navigate("/");
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("An error occurred while deleting the account. Please try again later.");
        }
    };

    return (
        <Button variant="outline" className="ml-auto"
            onClick={handleDeleteAccount}
        >
            Delete Account
        </Button>
    );
}

export default DeleteAccountButton;
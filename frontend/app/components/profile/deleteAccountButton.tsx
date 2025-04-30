import React from "react";
import { Button } from "@/components/ui/button";
import userService from "@/service/userService";

function DeleteAccountButton() {
    const handleDeleteAccount = async () => {
        await userService.deleteAccount();
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
import React from "react";
import { Button } from "@/components/ui/button";
import userService from "~/service/userService";

const DeleteAccountButton: React.FC = () => {
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
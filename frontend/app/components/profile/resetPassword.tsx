import { Button } from "@/components/ui/button";
import authService from "@/service/authService";
import { useState } from "react";

function ResetPasswordButton({ email }: { email: string }) {
    const [message, setMessage] = useState<string | null>(null);

    const handleReset = async () => {
        setMessage(null);
        try {
            await authService.resetPassword(email);
            setMessage("Password reset email sent! Check your inbox.");
        } catch (error: any) {
            setMessage(error.message || "Failed to send reset email.");
        }
    };

    return (
        <div>
            <Button variant="outline" className="ml-2" onClick={handleReset}>
                Reset Password
            </Button>
            {message && <div className="text-sm mt-2">{message}</div>}
        </div>
    );
}

export default ResetPasswordButton;
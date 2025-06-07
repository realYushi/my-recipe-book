import { Button } from "@/components/ui/button";
import authService from "@/service/authService";

function ResetPasswordButton({ email }: { email: string }) {
    const handleReset = async () => {
        try {
            await authService.resetPassword(email);
            window.alert("Password reset email sent! Check your inbox.");
        } catch (error: any) {
            window.alert(error.message || "Failed to send reset email.");
        }
    };

    return (
        <div>
            <Button variant="outline" className="ml-2" onClick={handleReset}>
                Reset Password
            </Button>
        </div>
    );
}

export default ResetPasswordButton;
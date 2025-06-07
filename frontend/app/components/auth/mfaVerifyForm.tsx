import { useState } from "react";
import authService from "@/service/authService";
import { useNavigate, useLocation } from "react-router";

export default function MfaVerifyForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await authService.verifyMfaEmailLink(email, window.location.href);
            navigate("/app/home");
        } catch (err: any) {
            setError("Verification failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <label>
                Enter your email to verify:
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="border p-2"
                />
            </label>
            <button type="submit" className="btn btn-primary">Verify</button>
            {error && <div className="text-red-500">{error}</div>}
        </form>
    );
}
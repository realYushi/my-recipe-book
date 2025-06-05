import { render, fireEvent, waitFor } from "@testing-library/react";
import ResetPasswordButton from "./resetPassword";
import { vi, describe, it, expect, beforeEach } from "vitest";
import authService from "@/service/authService";

vi.mock("@/service/authService", () => ({
    default: {
        resetPassword: vi.fn(),
    },
}));

describe("ResetPasswordButton", () => {
    const email = "test@gmail.com";
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the button", () => {
        const { getByText } = render(<ResetPasswordButton email={email} />);
        expect(getByText("Reset Password")).toBeInTheDocument();
    });

    it("successfully resets the password and alert the user", async () => {
        (authService.resetPassword as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);
        window.alert = vi.fn();
        const { getByText } = render(<ResetPasswordButton email={email} />);
        fireEvent.click(getByText("Reset Password"));
        await waitFor(() => {
            expect(authService.resetPassword).toHaveBeenCalledWith(email);
            expect(window.alert).toHaveBeenCalledWith(
                "Password reset email sent! Check your inbox."
            );
        });
    });

    it("shows error message on failure", async () => {
        (authService.resetPassword as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("Network error"));
        window.alert = vi.fn();
        const { getByText } = render(
            <ResetPasswordButton email={email} />
        );
        fireEvent.click(getByText("Reset Password"));
        await waitFor(async () => {
            expect(authService.resetPassword).toHaveBeenCalledWith(email);
            expect(window.alert).toHaveBeenCalledWith("Network error");
        });
    });

    it("shows default error message if error has no message", async () => {
        (authService.resetPassword as ReturnType<typeof vi.fn>).mockRejectedValueOnce({});
        const { getByText } = render(
            <ResetPasswordButton email={email} />
        );
        fireEvent.click(getByText("Reset Password"));
        await waitFor(async () => {
            expect(authService.resetPassword).toHaveBeenCalledWith(email);
            expect(window.alert).toHaveBeenCalledWith("Failed to send reset email.");
        });
    });
});
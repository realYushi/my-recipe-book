import { render, fireEvent, waitFor } from "@testing-library/react";
import LogoutButton from "./logoutButton";
import { vi, describe, it, expect, beforeEach } from "vitest";
import authService from "@/service/authService";
import { MemoryRouter, useNavigate } from "react-router-dom";

vi.mock("@/service/authService", () => ({
    default: {
        logout: vi.fn(),
    }
}));

vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as Object),
        useNavigate: vi.fn(),
    }
});

describe("LogoutButton", () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks;
        (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);
    });

    it("renders the button", () => {
        const { getByText } = render(
            <MemoryRouter>
                <LogoutButton />
            </MemoryRouter>
        );
        expect(getByText("Logout")).toBeInTheDocument();
    });

    it("successfully logs out and navigates to Login page", async () => {
        (authService.logout as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);
        const { getByText } = render(
            <MemoryRouter>
                <LogoutButton />
            </MemoryRouter>
        );
        fireEvent.click(getByText("Logout"));
        await waitFor(() => {
            expect(authService.logout).toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith("/app/auth/login");
        });
    });

    it("shows error message on Logout failure", async () => {
        (authService.logout as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("Network error"));
        window.alert = vi.fn();
        const { getByText } = render(
            <MemoryRouter>
                <LogoutButton />
            </MemoryRouter>
        );
        fireEvent.click(getByText("Logout"));

        await waitFor(() => {
            expect(authService.logout).toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledWith("Failed to logout. Please try again.");
        });
    });
});

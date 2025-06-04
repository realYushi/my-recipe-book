import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import IngredientSearchBar from "./IngredientSearchBar";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAuth } from "firebase/auth";
import type { Ingredient } from "@/model/ingredient";

vi.mock("firebase/auth", () => ({
    getAuth: vi.fn(() => ({
        currentUser: {
            getIdToken: vi.fn(() => Promise.resolve("mock-token")),
        },
    })),
}));

const mockIngredients: Ingredient[] = [
    { _id: "1", name: "Milk", unit: "ml", price: 2, category: "Unknown", supplier: "", stock: 0 },
    { _id: "2", name: "Almond Milk", unit: "ml", price: 3, category: "Unknown", supplier: "", stock: 0 },
];

global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ingredients: mockIngredients }),
    })
) as unknown as typeof fetch;

describe("IngredientSearchBar", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders input with placeholder", () => {
        const onResults = vi.fn();
        render(<IngredientSearchBar onResults={onResults} />);
        expect(screen.getByPlaceholderText("Search Pak'nSave ingredients...")).toBeInTheDocument();
    });

    it("fetches and filters ingredients based on input", async () => {
        const onResults = vi.fn();
        render(<IngredientSearchBar onResults={onResults} />);

        const input = screen.getByPlaceholderText("Search Pak'nSave ingredients...");
        fireEvent.change(input, { target: { value: "Milk" } });

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                "/api/scrape/paknsave?q=Milk",
                expect.objectContaining({
                    headers: expect.objectContaining({
                        Authorization: "Bearer mock-token",
                    }),
                })
            );
        });

        await waitFor(() => {
            expect(onResults).toHaveBeenCalledWith([
                expect.objectContaining({ name: "Milk" }),
                expect.objectContaining({ name: "Almond Milk" }),
            ]);
        });
    });

    it("clears results when input is empty", async () => {
        const onResults = vi.fn();
        render(<IngredientSearchBar onResults={onResults} />);

        const input = screen.getByPlaceholderText("Search Pak'nSave ingredients...");
        fireEvent.change(input, { target: { value: "Milk" } });

        await waitFor(() => {
            expect(onResults).toHaveBeenCalled();
        });

        fireEvent.change(input, { target: { value: "" } });

        await waitFor(() => {
            expect(onResults).toHaveBeenCalledWith([]);
        });
    });
});

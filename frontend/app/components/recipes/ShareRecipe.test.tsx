import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecipeDetail from "@/components/recipes/RecipeDetail";
import { MemoryRouter, Routes, Route } from "react-router";
import * as htmlToImage from "html-to-image";
import { describe, test, expect, vi, beforeEach } from "vitest";

vi.mock("@/service/recipeService", () => ({
    default: {
        getRecipeById: vi.fn().mockResolvedValue({
            _id: "1",
            name: "Test Recipe",
            portions: 2,
            preparationTime: "10 min",
            cookingTime: "20 min",
            ingredients: [
                {
                    ingredient: {
                        _id: "i1",
                        name: "Egg",
                        unit: "pcs"
                    },
                    quantity: 2
                }
            ],
            instructions: "Mix and cook.",
            createdAt: new Date(),
        }),
    },
}));

vi.mock("html-to-image", () => ({
    toJpeg: vi.fn(),
}));

describe("Recipe Share Button", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders the screenshot button", async () => {
        render(
            <MemoryRouter initialEntries={["/recipes/1"]}>
                <Routes>
                    <Route path="/recipes/:id" element={<RecipeDetail />} />
                </Routes>
            </MemoryRouter>
        );

        const button = await screen.findByRole("button", { name: /screen shot/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Screen Shot");
    });

    test("screenshot button is clickable", async () => {
        render(
            <MemoryRouter initialEntries={["/recipes/1"]}>
                <Routes>
                    <Route path="/recipes/:id" element={<RecipeDetail />} />
                </Routes>
            </MemoryRouter>
        );

        const button = await screen.findByRole("button", { name: /screen shot/i });

        // Check button properties
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
        expect(button).toBeEnabled();

        // Verify it can be clicked (no errors thrown)
        expect(() => fireEvent.click(button)).not.toThrow();
    });

    test("calls toJpeg when screenshot button is clicked", async () => {
        const toJpegMock = htmlToImage.toJpeg as ReturnType<typeof vi.fn>;
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        render(
            <MemoryRouter initialEntries={["/recipes/1"]}>
                <Routes>
                    <Route path="/recipes/:id" element={<RecipeDetail />} />
                </Routes>
            </MemoryRouter>
        );

        const button = await screen.findByRole("button", { name: /screen shot/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(toJpegMock).toHaveBeenCalled();
        });

        consoleSpy.mockRestore();
    });
});
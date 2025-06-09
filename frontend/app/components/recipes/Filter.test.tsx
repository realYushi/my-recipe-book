import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RecipeList from "./RecipeList";
import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("@/service/recipeService", () => ({
    default: {
        getAllRecipes: vi.fn().mockResolvedValue([
            {
                _id: "1",
                name: "Chicken Stir Fry",
                portions: 4,
                preparationTime: 10,
                cookingTime: 30,
                ingredients: [],
                instructions: "Cook chicken and vegetables",
            },
            {
                _id: "2",
                name: "Quick Pasta",
                portions: 2,
                preparationTime: 20,
                cookingTime: 10,
                ingredients: [],
                instructions: "Boil pasta and add sauce",
            },
        ]),
    },
}));

describe("RecipeList Filters", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("filters recipes by cooking time", async () => {
        render(
            <MemoryRouter>
                <RecipeList />
            </MemoryRouter>
        );

        const cookingTimeSelect = await screen.findByLabelText(/Max Cooking Time/i);
        fireEvent.change(cookingTimeSelect, { target: { value: "15" } });

        await waitFor(() => {
            expect(screen.getByText("Quick Pasta")).toBeInTheDocument();
            expect(screen.queryByText("Chicken Stir Fry")).not.toBeInTheDocument();
        });
    });

    it("filters recipes by portions", async () => {
        render(
            <MemoryRouter>
                <RecipeList />
            </MemoryRouter>
        );

        const portionsSelect = await screen.findByLabelText(/Minimum Portions/i);
        fireEvent.change(portionsSelect, { target: { value: "4" } });

        await waitFor(() => {
            expect(screen.getByText("Chicken Stir Fry")).toBeInTheDocument();
            expect(screen.queryByText("Quick Pasta")).not.toBeInTheDocument();
        });
    });

    it("filters recipes by preparation time", async () => {
        render(
            <MemoryRouter>
                <RecipeList />
            </MemoryRouter>
        );

        const preparationTimeSelect = await screen.findByLabelText(/Max Prep Time/i);
        fireEvent.change(preparationTimeSelect, { target: { value: "15" } });

        await waitFor(() => {
            expect(screen.getByText("Chicken Stir Fry")).toBeInTheDocument();
            expect(screen.queryByText("Quick Pasta")).not.toBeInTheDocument();
        });
    });
});

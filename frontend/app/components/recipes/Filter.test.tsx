import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { RecipeList } from "./RecipeList";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useEffect } from "react";

// ✅ Mock recipe service
vi.mock("@/service/recipeService", () => ({
    default: {
        getAllRecipes: vi.fn().mockResolvedValue([
            {
                _id: "1",
                name: "Chicken Stir Fry",
                portions: 4,
                preparationTime: 20,
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

// ✅ Mock RecipeSearchBar component
vi.mock("@/components/recipes/RecipeSearchBar", () => ({
    default: ({ onSearchResults }: any) => {
        return (
            <input
                placeholder="Search for recipes..."
                aria-label="Search Input"
                onChange={() =>
                    onSearchResults([
                        {
                            _id: "1",
                            name: "Chicken Stir Fry",
                            portions: 4,
                            preparationTime: 10,
                            cookingTime: 20,
                            ingredients: [],
                            instructions: "Cook chicken and vegetables",
                        },
                    ])
                }
            />
        );
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

        const cookingTimeSelect = await screen.findByLabelText(/Cooking Time/i);
        fireEvent.change(cookingTimeSelect, { target: { value: "20" } });

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

        const portionsSelect = await screen.findByLabelText(/Portions/i);
        fireEvent.change(portionsSelect, { target: { value: "4" } });

        await waitFor(() => {
            expect(screen.getByText("Chicken Stir Fry")).toBeInTheDocument();
            expect(screen.queryByText("Quick Pasta")).not.toBeInTheDocument();
        });
    });

    it("filters recipes by search term", async () => {
        render(
            <MemoryRouter>
                <RecipeList />
            </MemoryRouter>
        );

        const searchInput = await screen.findByPlaceholderText(/Search for recipes/i);
        fireEvent.change(searchInput, { target: { value: "Chicken" } });

        await waitFor(() => {
            expect(screen.getByText("Chicken Stir Fry")).toBeInTheDocument();
            expect(screen.queryByText("Quick Pasta")).not.toBeInTheDocument();
        });
    });
});

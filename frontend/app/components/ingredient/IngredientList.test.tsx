import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import IngredientList from "./IngredientList";
import ingredientService from "@/service/ingredientService";
import { MemoryRouter } from "react-router";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("@/service/ingredientService");

const mockIngredients = [
  { _id: "1", name: "Flour", unit: "kg", price: 3.5 },
  { _id: "2", name: "Eggs", unit: "pcs", price: 0.3 },
];

describe("IngredientList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders list of ingredients", async () => {
    (ingredientService.getIngredients as ReturnType<typeof vi.fn>).mockResolvedValue(mockIngredients);

    render(
      <MemoryRouter>
        <IngredientList />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Flour")).toBeInTheDocument();
      expect(screen.getByText("Eggs")).toBeInTheDocument();
    });
  });

  it("shows error on fetch failure", async () => {
    (ingredientService.getIngredients as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("Failed"));

    render(
      <MemoryRouter>
        <IngredientList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to load ingredients. Please try again.")).toBeInTheDocument();
    });
  });
});
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import IngredientList from "./IngredientList";
import ingredientService from "@/service/ingredientService";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { IngredientUnit, IngredientCategory } from "@/model/ingredient";
vi.mock("@/service/ingredientService");

const mockIngredients = [
  {
    _id: "1",
    name: "Flour",
    unit: IngredientUnit.KG,
    price: 3.5,
    category: IngredientCategory.VEGETABLE,
  },
  {
    _id: "2",
    name: "Eggs",
    unit: IngredientUnit.G,
    price: 0.3,
    category: IngredientCategory.VEGETABLE,
  },
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
      expect(screen.getByText("kg")).toBeInTheDocument();
      expect(screen.getByText("$3.50")).toBeInTheDocument();
      expect(screen.getByText("Eggs")).toBeInTheDocument();
      expect(screen.getByText("g")).toBeInTheDocument();
      expect(screen.getByText("$0.30")).toBeInTheDocument();

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
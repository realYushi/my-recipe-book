import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import IngredientDetail from "./IngredientDetail";
import ingredientService from "@/service/ingredientService";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("@/service/ingredientService");

const mockIngredient = {
  _id: "123",
  name: "Sugar",
  unit: "g",
  price: 2.5,
  stock: 100,
  supplier: "NZ Foods",
  notes: "Keep dry",
};

describe("IngredientDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays ingredient details after fetching", async () => {
    (ingredientService.getIngredientById as ReturnType<typeof vi.fn>).mockResolvedValue(mockIngredient);

    render(
      <MemoryRouter initialEntries={["/app/ingredients/123"]}>
        <Routes>
          <Route path="/app/ingredients/:id" element={<IngredientDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Sugar")).toBeInTheDocument();
      expect(screen.getByText("g")).toBeInTheDocument();
      expect(screen.getByText("$2.50")).toBeInTheDocument();
      expect(screen.getByText("NZ Foods")).toBeInTheDocument();
      expect(screen.getByText("Keep dry")).toBeInTheDocument();
    });
  });

  it("shows error message on fetch failure", async () => {
    (ingredientService.getIngredientById as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("Fetch failed"));

    render(
      <MemoryRouter initialEntries={["/app/ingredients/123"]}>
        <Routes>
          <Route path="/app/ingredients/:id" element={<IngredientDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to load ingredient. Please try again.")).toBeInTheDocument();
    });
  });

  it("can delete ingredient and navigate away", async () => {
    window.confirm = vi.fn().mockReturnValue(true);
    (ingredientService.getIngredientById as  ReturnType<typeof vi.fn>).mockResolvedValue(mockIngredient);
    (ingredientService.deleteIngredient as  ReturnType<typeof vi.fn>).mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={["/app/ingredients/123"]}>
        <Routes>
          <Route path="/app/ingredients/:id" element={<IngredientDetail />} />
          <Route path="/app/ingredients" element={<div>Ingredient List Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Sugar"));

    fireEvent.click(screen.getByRole("button", { name: /delete ingredient/i }));

    await waitFor(() => {
      expect(screen.getByText("Ingredient List Page")).toBeInTheDocument();
    });
  });
});
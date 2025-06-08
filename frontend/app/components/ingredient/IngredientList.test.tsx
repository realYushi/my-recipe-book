// IngredientList.test.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import IngredientList from "./IngredientList";
import ingredientService from "@/service/ingredientService";
import scrapeService from "@/service/scrapeService";
import { MemoryRouter } from "react-router";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { IngredientCategory, IngredientUnit } from "@/model/ingredient";

vi.mock("@/service/ingredientService");
vi.mock("@/service/scrapeService");

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

const mockScrapedIngredients = [
  {
    _id: "scraped1",
    name: "Scraped Tomatoes",
    unit: IngredientUnit.KG,
    price: 4.5,
    category: IngredientCategory.VEGETABLE,
  },
];

describe("IngredientList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders list of ingredients in normal mode", async () => {
    (ingredientService.getIngredients as ReturnType<typeof vi.fn>).mockResolvedValue(mockIngredients);

    render(
      <MemoryRouter>
        <IngredientList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Ingredients")).toBeInTheDocument();
      expect(screen.getByText("Flour")).toBeInTheDocument();
      expect(screen.getByText("Eggs")).toBeInTheDocument();
      expect(screen.getByText("Load Pak'nSave")).toBeInTheDocument();
    });
  });

  it("switches to scrape mode and displays scraped ingredients", async () => {
    (ingredientService.getIngredients as ReturnType<typeof vi.fn>).mockResolvedValue(mockIngredients);
    (scrapeService.scrapePaknSave as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockScrapedIngredients
    });

    render(
      <MemoryRouter>
        <IngredientList />
      </MemoryRouter>
    );

    const loadButton = await screen.findByText("Load Pak'nSave");
    fireEvent.click(loadButton);

    await waitFor(() => {
      expect(screen.getByText("Scrape")).toBeInTheDocument();
      expect(screen.getByText("Scraped Tomatoes")).toBeInTheDocument();
      expect(screen.getByText("Add")).toBeInTheDocument();
      expect(screen.queryByText("Load Pak'nSave")).not.toBeInTheDocument();
    });
  });

  it("returns to normal mode when Back button is clicked", async () => {
    (ingredientService.getIngredients as ReturnType<typeof vi.fn>).mockResolvedValue(mockIngredients);
    (scrapeService.scrapePaknSave as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockScrapedIngredients
    });

    render(
      <MemoryRouter>
        <IngredientList />
      </MemoryRouter>
    );

    const loadButton = await screen.findByText("Load Pak'nSave");
    fireEvent.click(loadButton);

    await waitFor(() => {
      expect(screen.getByText("Scrape")).toBeInTheDocument();
    });

    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText("Ingredients")).toBeInTheDocument();
      expect(screen.getByText("Load Pak'nSave")).toBeInTheDocument();
      expect(screen.queryByText("Back")).not.toBeInTheDocument();
    });
  });
});

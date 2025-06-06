import { render, screen, fireEvent } from "@testing-library/react";
import RecipeDetail from "@/components/recipes/RecipeDetail";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import { describe, test, expect, vi } from "vitest";

vi.mock("@/service/recipeService", () => ({
    default: {
        getRecipeById: vi.fn().mockResolvedValue({
            _id: "1",
            name: "Test Recipe",
            portions: 2,
            preparationTime: 10,
            cookingTime: 20,
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

describe("Recipe Sharing Feature", () => {
    test("calls handleScreenshot and triggers download", async () => {
        const toJpegMock = htmlToImage.toJpeg as unknown as ReturnType<typeof vi.fn>;
        toJpegMock.mockResolvedValue("data:image/jpeg;base64,1234");

        const realCreateElement = document.createElement.bind(document);
        const createElementSpy = vi.spyOn(document, "createElement");
        const clickMock = vi.fn();

        createElementSpy.mockImplementation((tag) => {
            if (tag === "a") {
                return {
                    set href(val) { },
                    set download(val) { },
                    click: clickMock,
                    style: {},
                    setAttribute: () => { },
                    remove: () => { },
                } as any;
            }
            return realCreateElement(tag);
        });

        render(
            <MemoryRouter initialEntries={["/recipes/1"]}>
                <Routes>
                    <Route path="/recipes/:id" element={<RecipeDetail />} />
                </Routes>
            </MemoryRouter>
        );

        const button = await screen.findByRole("button", { name: /screen shot/i });
        fireEvent.click(button);

        expect(toJpegMock).toHaveBeenCalled();
        expect(clickMock).toHaveBeenCalled();
    });
});
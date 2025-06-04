import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import IngredientDetail from './IngredientDetail';
import ingredientService from '@/service/ingredientService';

vi.mock('@/service/ingredientService');

async function deleteIngredient(
    id: string,
    confirm: () => boolean,
    alert: (...args: any[]) => any,
    navigate: (...args: any[]) => any
) {
    if (!confirm()) return;

    try {
        await ingredientService.deleteIngredient(id);
        alert("Ingredient deleted successfully.");
        navigate("/app/ingredients");
    } catch (err: any) {
        alert(`Failed to delete ingredient: ${err instanceof Error ? err.message : String(err)}`);
    }
}

beforeEach(() => {
    vi.clearAllMocks();
}
);

describe("deleteIngredient", () => {
    const mockedDelete = vi.mocked(ingredientService.deleteIngredient);

    it("deletes ingredient when confirmed", async () => {
        mockedDelete.mockResolvedValue(undefined);
        const confirm = vi.fn(() => true);
        const alert = vi.fn();
        const navigate = vi.fn();

        await deleteIngredient("123", confirm, alert, navigate);

        expect(confirm).toHaveBeenCalled();
        expect(mockedDelete).toHaveBeenCalledWith("123");
        expect(alert).toHaveBeenCalledWith("Ingredient deleted successfully.");
        expect(navigate).toHaveBeenCalledWith("/app/ingredients");
    });

    it("does not delete when cancelled", async () => {
        const confirm = vi.fn(() => false);
        const alert = vi.fn();
        const navigate = vi.fn();

        await deleteIngredient("123", confirm, alert, navigate);

        expect(confirm).toHaveBeenCalled();
        expect(mockedDelete).not.toHaveBeenCalled();
        expect(alert).not.toHaveBeenCalled();
        expect(navigate).not.toHaveBeenCalled();
    });

    it("shows error alert when deletion fails", async () => {
        mockedDelete.mockRejectedValue(new Error("Delete failed"));
        const confirm = vi.fn(() => true);
        const alert = vi.fn();
        const navigate = vi.fn();

        await deleteIngredient("123", confirm, alert, navigate);

        expect(alert).toHaveBeenCalledWith("Failed to delete ingredient: Delete failed");
        expect(navigate).not.toHaveBeenCalled();
    });
});

import type { Ingredient } from "~/model/ingredient"
import { authService } from "./authService";

export const ingredientService = {
    async createIngredient(ingredient: Ingredient) {
        try {
            const jwtToken = await authService.getJwtToken();
            const response = await fetch("/api/ingredients", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ingredient)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            return response.json();
        } catch (error) {
            throw new Error("Failed to create ingredient: " + (error instanceof Error ? error.message : String(error)));
        }
    },
    async getIngredients() {
        try {
            const jwtToken = await authService.getJwtToken();
            const response = await fetch("/api/ingredients", {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            return response.json();
        } catch (error) {
            throw new Error("Failed to get ingredients: " + (error instanceof Error ? error.message : String(error)));
        }
    }
}
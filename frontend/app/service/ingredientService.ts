import type { Ingredient } from "@/model/ingredient"
import authService from "./authService";

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

            const data = await response.json();
            return data.map((ingredient: any) => ({
                _id: ingredient._id,
                name: ingredient.name,
                unit: ingredient.unit,
                price: ingredient.price
            }));
        }
        catch (error) {
            throw new Error("Failed to fetch ingredients: " + (error instanceof Error ? error.message : String(error)));
        }
    },
    async getIngredientById(id: string) {
        try {
            const jwtToken = await authService.getJwtToken();
            const response = await fetch(`/api/ingredients/${id}`, {
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
            throw new Error("Failed to get ingredient by id: " + (error instanceof Error ? error.message : String(error)));
        }
    },
    async deleteIngredient(id: string) {
        try {
            console.log("Deleting ingredient with ID:", id);
            const jwtToken = await authService.getJwtToken();
            const response = await fetch(`/api/ingredients/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            throw new Error("Failed to delete ingredient: " + (error instanceof Error ? error.message : String(error)));
        }
    },
    async updateIngredient(id: string, ingredient: Ingredient) {
        try {
            const jwtToken = await authService.getJwtToken();
            const response = await fetch(`/api/ingredients/${id}`, {
                method: "PUT",
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
            throw new Error("Failed to update ingredient: " + (error instanceof Error ? error.message : String(error)));
        }
    }
}
export default ingredientService;
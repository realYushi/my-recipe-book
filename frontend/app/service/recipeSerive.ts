import type { Recipe } from "@/model/recipe";
import authService from "@/service/authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const recipeService = {
    createRecipe: async (recipe: Recipe):Promise<Recipe> => {
        try {
            const token = await authService.getJwtToken();
            const response = await fetch(`${API_BASE_URL}/recipes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(recipe)
            });
            return response.json();
        } catch (error) {
            console.error("Error creating recipe:", error);
            throw new Error("Failed to create recipe");
        }
    },
    updateRecipe: async (id: string, recipe: Recipe):Promise<Recipe> => {
        try {
            const token = await authService.getJwtToken();
            const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(recipe)
            });
            return response.json();
        } catch (error) {
            console.error("Error updating recipe:", error);
            throw error;
        }
    },
    getRecipeById: async (id: string): Promise<Recipe> => {
        try {
            const token = await authService.getJwtToken();
            const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            return response.json();
        } catch (error) {
            console.error("Error getting recipe by ID:", error);
            throw error;
        }
    }
}

export default recipeService;
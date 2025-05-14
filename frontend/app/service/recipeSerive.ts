import type { Recipe } from "@/model/recipe";
import authService from "@/service/authService";
import { get } from "http";
export const recipeService = {
    createRecipe: async (recipe: Recipe) => {
        try {
            const token = await authService.getJwtToken();
            const response = await fetch("/api/recipes", {
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
            throw error;
        }
    },
    updateRecipe: async (id: string, recipe: Recipe) => {
        try {
            const token = await authService.getJwtToken();
            const response = await fetch(`/api/recipes/${id}`, {
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
            const response = await fetch(`/api/recipes/${id}`, {
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
    },
    getAllRecipes: async (): Promise<Recipe[]> => {
        try {
            const token = await authService.getJwtToken();
            const response = await fetch("/api/recipes");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        } catch (error) {   
            console.error("Error getting all recipes:", error);
            throw error;
        }       
    },
}

export default recipeService;
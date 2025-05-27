import type { Recipe } from "@/model/recipe";
import authService from "@/service/authService";

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
    searchRecipes: async (name: string): Promise<Recipe[]> => {
        try {
            const token = await authService.getJwtToken();
            const response = await fetch(`/api/recipes/search?name=${name}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to search recipes: ${response.status} ${response.statusText}`);
            }
            return response.json();
        } catch (error) {
            console.error("Error searching recipes:", error);
            throw error;
        }
    },

    getAllRecipes: async (): Promise<Recipe[]> => {
        try {
            const token = await authService.getJwtToken();
            const response = await fetch("/api/recipes", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to get all recipes: ${response.status} ${response.statusText}`);
            }
            return response.json();
        } catch (error) {
            console.error("Error getting recipes:", error);
            throw error;
        }
    }
}

export default recipeService;
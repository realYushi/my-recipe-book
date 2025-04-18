import type { Recipe } from "~/model/recipe";
import { authService } from "./authService";
const recipeService = {
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
    }
}

export default recipeService;
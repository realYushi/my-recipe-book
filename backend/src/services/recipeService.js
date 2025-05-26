import recipeRepository from "../repositories/recipeRepository.js";
const recipeService = {
  async deleteRecipe(id) {
    try {
      const recipe = await recipeRepository.deleteRecipe(id);
      if (!recipe) {
        throw new Error("Recipe not found");
      }
      return recipe;
    } catch (error) {
      throw new Error("Failed to delete recipe");
    }
  },
  async createRecipe(recipeData) {
    try {
      const recipe = await recipeRepository.createRecipe(recipeData);
      return recipe;
    } catch (error) {
      throw new Error("Failed to create recipe");
    }
  },
  async getRecipeById(id) {
    try {
      const recipe = await recipeRepository.getRecipeById(id);
      return recipe;
    } catch (error) {
      throw new Error("Failed to get recipe by ID");
    }
  },
  async getAllRecipes(userId) {
    try {
      const recipes = await recipeRepository.getAllRecipes(userId);
      return recipes;
    } catch (error) {
      throw new Error("Failed to get all recipes");
    }
  },
  async updateRecipe(id, recipeData) {
    try {
      const recipe = await recipeRepository.updateRecipe(id, recipeData);
      return recipe;
    } catch (error) {
      throw new Error("Failed to update recipe");
    }
  }
};

export default recipeService;

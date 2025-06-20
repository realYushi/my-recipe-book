import recipeRepository from "../repositories/recipeRepository.js";

const recipeService = {

  async createRecipe(recipeData) {
    try {
      const recipe = await recipeRepository.createRecipe(recipeData);
      return recipe;
    } catch (error) {
      throw new Error("Failed to create recipe");
    }
  },
  async searchRecipes(name, userId) {
    try {
      const recipes = await recipeRepository.searchRecipes(name, userId);
      return recipes;
    } catch (error) {
      throw new Error("Failed to search recipes");
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
  },
  async deleteRecipe(id) {
    try {
      await recipeRepository.deleteRecipe(id);
    } catch (error) {
      throw new Error("Failed to delete recipe");
    }
  },
};

export default recipeService;

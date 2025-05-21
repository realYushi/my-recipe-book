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
  async searchRecipes(name, ingredients) {
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (ingredients) {
      query.ingredients = { $in: ingredients };
    }

    return Recipe.find(query);
  },

  async getRecipeById(id) {
    try {
      const recipe = await recipeRepository.getRecipeById(id);
      return recipe;
    } catch (error) {
      throw new Error("Failed to get recipe by ID");
    }
  },
  async getAllRecipes() {
    try {
      const recipes = await recipeRepository.getAllRecipes();
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
};

export default recipeService;

import Recipe from "../models/recipeModel.js";

const recipeRepository = {
  async createRecipe(recipeData) {
    try {
      const recipe = new Recipe(recipeData);
      await recipe.save();
      return recipe;
    } catch (error) {
      throw new Error("Failed to create recipe");
    }
  },
  async getRecipeById(id) {
    try {
      const recipe = await Recipe.findById(id);
      return recipe;
    } catch (error) {
      throw new Error("Failed to get recipe by ID");
    }
  },
  async getAllRecipes() {
    try {
      const recipes = await Recipe.find();
      return recipes;
    } catch (error) {
      throw new Error("Failed to get all recipes");
    }
  },
  async updateRecipe(id, recipeData) {
    try {
      const recipe = await Recipe.findByIdAndUpdate(id, recipeData, {
        new: true,
      });
      return recipe;
    } catch (error) {
      throw new Error("Failed to update recipe");
    }
  },
  async deleteRecipesByUser(userId) {
    try {
      return await Recipe.deleteMany({ user: userId });
    } catch (error) {
      throw new Error(`Failed to delete recipes for user ${userId}: ${error.message}`);
    }
  },
};

export default recipeRepository;

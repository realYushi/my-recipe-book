import ingredientRepository from "../repositories/ingredientRepository.js";
import Recipe from "../models/recipeModel.js";

const IngredientService = {
  async createIngredient(ingredientData) {
    try {
      return await ingredientRepository.createIngredient(ingredientData);
    } catch (error) {
      throw new Error("Failed to create ingredient: " + error.message, {
        cause: error,
      });
    }
  },
  async getIngredients(userId) {
    try {
      return await ingredientRepository.getIngredients(userId);
    } catch (error) {
      throw new Error("Failed to get ingredients: " + error.message, {
        cause: error,
      });
    }
  },
  async updateIngredient(ingredientId, ingredientData) {
    try {
      return await ingredientRepository.updateIngredient(
        ingredientId,
        ingredientData
      );
    } catch (error) {
      throw new Error("Failed to update ingredient: " + error.message, {
        cause: error,
      });
    }
  },
  async getIngredientById(ingredientId) {
    try {
      const ingredient = await ingredientRepository.getIngredientById(
        ingredientId
      );
      if (!ingredient) {
        throw new Error("Ingredient not found");
      }
      return ingredient;
    } catch (error) {
      throw new Error("Failed to get ingredient: " + error.message, {
        cause: error,
      });
    }
  },
  async deleteIngredient(id) {
    try {
      console.log("Deleting ingredient with ID", id);

      let unknownIngredient = await ingredientRepository.findUnknownIngredient();
      if (!unknownIngredient) {
        unknownIngredient = await ingredientRepository.createIngredient({
          name: "Unknown Ingredient",
          category: "Unknown",
          price: 0,
          unit: "g",
          user: "system"
        });
      }

      await Recipe.updateMany(
        { "ingredients.ingredient": id },
        { $set: { "ingredients.$.ingredient": unknownIngredient._id } }
      );

      const deletedIngredient = await ingredientRepository.deleteIngredient(id);
      if (!deletedIngredient) {
        throw new Error("Ingredient not found");
      }
      return deletedIngredient;
    } catch (error) {
      throw new Error(`Failed to delete ingredient: ${error.message}`);
    }
  }
};
export default IngredientService;

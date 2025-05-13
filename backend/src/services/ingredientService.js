import ingredientRepository from "../repositories/ingredientRepository.js";

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
      const deletedIngredient = await ingredientRepository.deleteIngredient(id);
      if (!deletedIngredient) {
        throw new Error("Ingredient not found");
      }
      return deletedIngredient;
    }
    catch (error) {
      throw new Error(`Failed to delete ingredient: ${error.message}`);
    }
  }
};
export default IngredientService;

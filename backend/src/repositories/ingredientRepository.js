const { Ingredient } = require("../models/ingredientModel");

class IngredientRepository {
  async createIngredient(ingredientData) {
    try {
      const newIngredient = await Ingredient.create(ingredientData);
      return newIngredient;
    } catch (error) {
      throw new Error(`Failed to create ingredient: ${error.message}`);
    }
  }
}
module.exports = new IngredientRepository();

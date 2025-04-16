const { Ingredient } = require('../models/ingredientModel');

class IngredientRepository {

    async createIngredient(ingredientData) {
        try {
            const newIngredient = await Ingredient.create(ingredientData);
            return newIngredient;
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = new IngredientRepository();


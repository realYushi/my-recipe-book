const Ingredient = require('../models/ingredientModel');

class IngredientRepository {

    async createIngredient(ingredientData) {
        try {
            const newIngredient = new Ingredient(ingredientData);
            return await newIngredient.save();
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = new IngredientRepository();


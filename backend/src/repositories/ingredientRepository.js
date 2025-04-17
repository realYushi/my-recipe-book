import { Ingredient } from '../models/ingredientModel.js';

const IngredientRepository = {

    async createIngredient(ingredientData) {
        try {
            const newIngredient = await Ingredient.create(ingredientData);
            return newIngredient;
        } catch (error) {
            throw new Error(`Failed to create ingredient: ${error.message}`);
        }

    },

    async getIngredients(userId) {
        try {
            const ingredients = await Ingredient.find({ user: userId });
            return ingredients;
        } catch (error) {
            throw new Error(`Failed to get ingredients: ${error.message}`);
        }
    }

}

export default IngredientRepository;


const ingredientRepository = require('../repositories/ingredientRepository');

class IngredientService {
    async createIngredient(ingredientData) {
        try {
            return await ingredientRepository.createIngredient(ingredientData);
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = new IngredientService();
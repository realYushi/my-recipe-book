import ingredientRepository from '../repositories/ingredientRepository.js';

const IngredientService = {
    async createIngredient(ingredientData) {
        try {
            return await ingredientRepository.createIngredient(ingredientData);
        } catch (error) {
            throw new Error('Failed to create ingredient: ' + error.message, { cause: error });
        }
    },
    async getIngredients(userId) {
        try {
            return await ingredientRepository.getIngredients(userId);
        } catch (error) {
            throw new Error('Failed to get ingredients: ' + error.message, { cause: error });
        }
    }
}
export default IngredientService;
import ingredientRepository from '../repositories/ingredientRepository.js';

class IngredientService {
    async createIngredient(ingredientData) {
        try {
            return await ingredientRepository.createIngredient(ingredientData);
        } catch (error) {
            throw new Error('Failed to create ingredient: ' + error.message, { cause: error });
        }
    }
}
export default new IngredientService();
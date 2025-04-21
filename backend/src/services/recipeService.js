import recipeRepository from '../repositories/recipeRepository.js';
const recipeService = {
    createRecipe: async (recipeData) => {
        try {
            const recipe = await recipeRepository.createRecipe(recipeData);
            return recipe;
        } catch (error) {
            throw new Error('Failed to create recipe');
        }
    },
    getRecipeById: async (id) => {
        try {
            const recipe = await recipeRepository.getRecipeById(id);
            return recipe;
        } catch (error) {
            throw new Error('Failed to get recipe by ID');
        }
    }
};

export default recipeService;
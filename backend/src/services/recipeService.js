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
    getRecipeById: async (recipeId) => {
        try {
            const recipe = await recipeRepository.getRecipeById(recipeId);
            return recipe;
        } catch (error) {
            throw new Error('Failed to fetch recipe details');
        }
    },
};

export default recipeService;
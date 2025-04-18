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
};

export default recipeService;
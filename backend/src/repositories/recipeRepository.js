import Recipe from '../models/recipeModel.js';
const recipeRepository = {
    createRecipe: async (recipeData) => {
        try {
            const recipe = new Recipe(recipeData);
            await recipe.save();
            return recipe;
        } catch (error) {
            throw new Error('Failed to create recipe');
        }
    },
};

export default recipeRepository;
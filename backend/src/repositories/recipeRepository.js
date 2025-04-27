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
    getRecipeById: async (recipeId) => {
        try {
            const recipe = await Recipe.findById(recipeId).populate('ingredients.ingredient');
            return recipe;
        } catch (error) {
            throw new Error('Failed to fetch recipe details');
        }
    },
};

export default recipeRepository;
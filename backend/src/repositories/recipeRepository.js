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
    getRecipeById: async (id) => {
        try {
            const recipe = await Recipe.findById(id);
            return recipe;
        } catch (error) {
            throw new Error('Failed to get recipe by ID');
        }
    }
};

export default recipeRepository;
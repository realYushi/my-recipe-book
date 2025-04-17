import recipeService from '../services/recipeService.js';
const RecipeController = {
    createRecipe: async (req, res) => {
        try {
            const recipe = await recipeService.createRecipe(req.body);
            res.status(201).json(recipe);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default RecipeController;
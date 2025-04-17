import recipeService from '../services/recipeService.js';
const RecipeController = {
    createRecipe: async (req, res) => {
        try {
            const recipeData = {
                name: req.body.name,
                instructions: req.body.instructions,
                ingredients: req.body.ingredients,
                portions: req.body.portions,
                preparationTime: req.body.preparationTime,
                cookingTime: req.body.cookingTime,
                user: req.user.uid
            }
            const recipe = await recipeService.createRecipe(recipeData);
            res.status(201).json(recipe);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default RecipeController;
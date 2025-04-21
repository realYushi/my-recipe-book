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
            res.status(500).json({ error: "Failed to create recipe" });
        }
    },
    getRecipeById: async (req, res) => {
        try {
            const recipe = await recipeService.getRecipeById(req.params.id);
            res.status(200).json(recipe);
        } catch (error) {
            res.status(500).json({ error: "Failed to get recipe by ID" });
        }
    }
};
export default RecipeController;
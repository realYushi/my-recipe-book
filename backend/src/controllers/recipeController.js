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
            const recipeId = req.params.id;
            const recipe = await recipeService.getRecipeById(recipeId);
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.status(200).json(recipe);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch recipe details' });
        }
    },
};
export default RecipeController;
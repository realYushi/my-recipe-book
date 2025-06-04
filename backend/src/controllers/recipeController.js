import recipeService from "../services/recipeService.js";

const RecipeController = {
  async createRecipe(req, res) {
    try {
      const recipeData = {
        name: req.body.name,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        portions: req.body.portions,
        preparationTime: req.body.preparationTime,
        cookingTime: req.body.cookingTime,
        user: req.user.uid,
      };
      const recipe = await recipeService.createRecipe(recipeData);
      res.status(201).json(recipe);
    } catch (error) {
      res.status(500).json({ error: "Failed to create recipe" });
    }
  },

  async searchRecipes(req, res) {
    try {
      const { name } = req.query;
      const recipes = await recipeService.searchRecipes(name, req.user.uid);
      res.status(200).json(recipes);
    } catch (error) {
      console.error("Error in searchRecipes:", error);
      res.status(500).json({ error: "Failed to search recipes" });
    }
  },

  async getRecipeById(req, res) {
    try {
      const recipe = await recipeService.getRecipeById(req.params.id);
      res.status(200).json(recipe);
    } catch (error) {
      console.error("Error fetching recipe by ID:", error);
      res.status(500).json({ error: "Failed to get recipe by ID" });
    }
  },

  async getAllRecipes(req, res) {
    try {
      const recipes = await recipeService.getAllRecipes(req.user.uid);
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: "Failed to get all recipes" });
    }
  },

  async updateRecipe(req, res) {
    try {
      const recipeData = {
        name: req.body.name,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        portions: req.body.portions,
        preparationTime: req.body.preparationTime,
        cookingTime: req.body.cookingTime,
      };
      const recipe = await recipeService.updateRecipe(
        req.params.id,
        recipeData
      );
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: "Failed to update recipe" });
    }
  },
};

export default RecipeController;

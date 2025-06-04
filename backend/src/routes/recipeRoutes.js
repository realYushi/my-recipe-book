import RecipeController from "../controllers/recipeController.js";
import express from "express";
const router = express.Router();

router.post("/", RecipeController.createRecipe);
router.get("/search", RecipeController.searchRecipes);
router.get("/:id", RecipeController.getRecipeById);
router.put("/:id", RecipeController.updateRecipe);
router.get("/", RecipeController.getAllRecipes);
router.get("/filter", RecipeController.filterRecipes);
export default router;

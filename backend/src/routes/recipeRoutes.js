import RecipeController from "../controllers/recipeController.js";
import express from "express";
const router = express.Router();

router.post("/", RecipeController.createRecipe);
router.get("/:id", RecipeController.getRecipeById);
router.put("/:id", RecipeController.updateRecipe);
export default router;

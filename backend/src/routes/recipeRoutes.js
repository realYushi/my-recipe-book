import RecipeController from "../controllers/recipeController.js";
import verifyToken from "../middleware/firebase-auth.js";
import express from "express";
const router = express.Router();

router.post("/", RecipeController.createRecipe);
router.get("/", verifyToken, RecipeController.searchRecipes); // this action requires authentication
router.get("/:id", RecipeController.getRecipeById);
router.put("/:id", RecipeController.updateRecipe);
export default router;

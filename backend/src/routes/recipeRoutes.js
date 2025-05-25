import RecipeController from "../controllers/recipeController.js";
import verifyToken from "../middleware/firebase-auth.js";
import express from "express";
import searchRecipes from "../services/recipeService.js";
import authenticate from "../middleware/authenticate.js";
const router = express.Router();

router.post("/", RecipeController.createRecipe);
router.get("/", authenticate, verifyToken, RecipeController.searchRecipes); // this action requires authentication
router.get("/:id", RecipeController.getRecipeById);
router.put("/:id", RecipeController.updateRecipe);
export default router;

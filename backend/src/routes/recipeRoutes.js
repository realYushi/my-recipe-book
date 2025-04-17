import RecipeController from '../controllers/recipeController.js';
import express from 'express';
const router = express.Router();

router.post('/', RecipeController.createRecipe);

export default router;
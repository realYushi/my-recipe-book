import express from "express";
import ingredientController from "../controllers/ingredientController.js";
const router = express.Router();

router.post("/", ingredientController.createIngredient);
router.get("/", ingredientController.getIngredients);
router.put("/:id", ingredientController.updateIngredient);
router.get("/:id", ingredientController.getIngredientById);
router.delete("/:id", ingredientController.deleteIngredient);
export default router;

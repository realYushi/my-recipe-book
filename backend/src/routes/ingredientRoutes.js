import express from "express";
import ingredientController from "../controllers/ingredientController.js";
const router = express.Router();

router.post("/", ingredientController.createIngredient);
router.get("/", ingredientController.getIngredients);
router.put("/:id", ingredientController.updateIngredient);
export default router;

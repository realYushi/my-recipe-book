import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import verifyToken from "../middleware/firebase-auth.js";
import recipeController from "../controllers/recipeController.js";

router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete('/me', verifyToken, userController.deleteUser);
router.delete('/:id', verifyToken, recipeController.deleteRecipe);
router.delete('/:id', userController.deleteUser);
router.get("/profile", userController.getUserProfile);
export default router;
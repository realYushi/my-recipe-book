import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import verifyToken from "../middleware/firebase-auth.js";

router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete('/delete-account', verifyToken, userController.deleteUser);
router.get("/profile", userController.getUserProfile);
export default router;
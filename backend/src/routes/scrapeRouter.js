import express from "express";
import { scrapeController } from "../controllers/scrapeController.js";

const router = express.Router();

router.get("/paknsave", authenticate, scrapeController);

export default router;

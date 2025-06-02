import express from "express";
import { scrapeController } from "../controllers/scrapeController.js";

const router = express.Router();

router.get("/paknsave", scrapeController);

export default router;

import express from "express";
console.log("📁 scrapeRouter.js is loaded");

const scrapeRouter = express.Router();

scrapeRouter.get("/test", (req, res) => {
  console.log("✅ /api/scrape/test route hit");
  res.send("✅ Scrape router is working!");
});

export default scrapeRouter;

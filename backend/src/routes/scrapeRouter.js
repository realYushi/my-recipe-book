import puppeteer from "puppeteer-extra";
import express from "express";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
const router = express.Router();

puppeteer.use(StealthPlugin());

async function scrapeRecipe(url) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  await new Promise((resolve) => setTimeout(resolve, 5000));

  await page.screenshot({ path: "paknsave-screenshot.png", fullPage: true });
  await browser.close();
}

(async () => {
  await scrapeRecipe("https://www.paknsave.co.nz/shop/search?");
})();

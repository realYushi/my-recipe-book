import puppeteer from "puppeteer-extra";
import dotenv from "dotenv";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Ingredient } from "../models/ingredientModel.js";

dotenv.config();
puppeteer.use(StealthPlugin());

const dummyUserId = "68228c6f6bbff1a4a3adf332";

async function scrapeAndStoreIngredients(url) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const productHandles = await page.$$('[data-testid^="product-"]');

  for (const productHandle of productHandles) {
    const productData = await page.evaluate((el) => {
      const titleEl = el.querySelector('[data-testid="product-title"]');
      const dollarsEl = el.querySelector('[data-testid="price-dollars"]');
      const centsEl = el.querySelector('[data-testid="price-cents"]');
      const unitEl = el.querySelector('[data-testid="price-per"]');

      const title = titleEl?.textContent?.trim() || "N/A";
      const dollars = dollarsEl?.textContent?.trim() || "0";
      const cents = centsEl?.textContent?.trim() || "00";
      const unit = unitEl?.textContent?.trim() || "";

      const price = `${dollars}.${cents}`;

      return { title, price, unit };
    }, productHandle);

    // Skip if product is "N/A" and price is "0.00"
    if (productData.title === "N/A" || productData.price === "0.00") continue;

    console.log(`\n Product: ${productData.title}`);
    console.log(` Price: $${productData.price} ${productData.unit}`);
  }

  // Count total products
  const productCount = await page.evaluate(() => {
    return document.querySelectorAll('[data-testid^="product-"]').length;
  });
  console.log(`\n🔍 Detected ${productCount} products on page.\n`);

  await browser.close();
}

(async () => {
  try {
    const url = "https://www.paknsave.co.nz/shop/search?";
    await scrapeAndStoreIngredients(url);
    console.log("\n Scraping completed.");
  } catch (error) {
    console.error(" Scraping failed:", error);
  }
})();

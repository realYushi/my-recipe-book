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

  const productCount = await page.evaluate(() => {
    return document.querySelectorAll('[data-testid^="product-"]').length;
  });
  console.log(`Detected ${productCount} products on page.`);

  const ingredients = await page.evaluate(() => {
    const items = [];

    document
      .querySelectorAll('[data-testid^="product-"]')
      .forEach((product, i) => {
        try {
          const titleNode = product.querySelector(
            '[data-testid="product-title"]'
          );
          const subtitleNode = product.querySelector(
            '[data-testid="product-subtitle"]'
          );
          const priceNode =
            product.querySelector('[data-testid="product-price"]') ||
            product.querySelector('[class*="price"]');

          const name = titleNode?.innerText?.trim() || null;
          const unit = subtitleNode?.innerText?.trim() || null;

          const priceText = priceNode?.innerText?.trim() || "";
          const priceMatch = priceText.match(/\$?([\d.]+)/);
          const price = priceMatch ? parseFloat(priceMatch[1]) : null;

          const threshold = product
            .querySelector('[data-testid="multibuy-threshold"]')
            ?.innerText.trim();
          const multibuyPrice = product
            .querySelector('[data-testid="multibuy-price"]')
            ?.innerText.trim();
          const isOnSpecial = Boolean(threshold && multibuyPrice);
          const discountText = isOnSpecial
            ? `${threshold} ${multibuyPrice}`
            : null;

          items.push({
            index: i,
            name,
            unit,
            price,
            isOnSpecial,
            discountText,
            hasTitle: !!titleNode,
            hasPrice: !!priceNode,
          });
        } catch (err) {
          console.error("Error parsing product:", err);
        }
      });

    return items;
  });

  const validIngredients = ingredients.filter(
    (item) => item.name && item.price !== null
  );

  console.log(
    `Scraped ${validIngredients.length} valid ingredients out of ${ingredients.length} total.`
  );
  console.log("Example entries:");
  console.dir(ingredients.slice(0, 5), { depth: null });

  for (const item of validIngredients) {
    const ingredient = new Ingredient({
      name: item.name,
      category: "Unknown",
      price: item.price,
      unit: item.unit || "unit",
      user: dummyUserId,
      deal: item.isOnSpecial,
      discountText: item.discountText || null,
    });

    try {
      await ingredient.save();
      console.log(`Saved: ${item.name} - $${item.price}`);
    } catch (err) {
      console.error(`Failed to save ${item.name}:`, err.message);
    }
  }

  await page.screenshot({ path: "paknsave-screenshot.png", fullPage: true });
  await browser.close();
}

(async () => {
  try {
    const url = "https://www.paknsave.co.nz/shop/search?";
    await scrapeAndStoreIngredients(url);
    console.log("Scraping completed.");
  } catch (error) {
    console.error("Scraping failed:", error);
  }
})();

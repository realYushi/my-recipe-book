import puppeteer from "puppeteer";
import Ingredient from "../../models/ingredient.model.js"; // Adjusted to correct path
import mongoose from "mongoose";

const dummyUserId = "000000000000000000000000"; // Replace this with a real user ID

export async function scrapeAndStoreIngredients(url) {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    console.log("Navigating to:", url);

    await page.goto(url, { waitUntil: "domcontentloaded" }); // Changed to `domcontentloaded` for faster and more consistent behavior
    await page.waitForSelector('[data-testid^="product-"]', {
      timeout: 15000,
    }); // 💡 Wait explicitly for product blocks to appear

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait a bit more if needed

    // Log available data-testid attributes to help debugging
    const debugDataTestIds = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll("[data-testid]"));
      return all.map((el) => el.getAttribute("data-testid"));
    });

    console.log("=== All data-testid values found on page ===");
    console.log([...new Set(debugDataTestIds)]);
    console.log("===========================================");

    // Get all product info
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

            const priceEl =
              product.querySelector('[data-testid="product-price"]') ||
              product.querySelector('[class*="price"]');

            const priceText = priceEl?.innerText?.trim() ?? "";
            const priceMatch = priceText.match(/\$?\s*([\d.]+)/);
            const price = priceMatch ? parseFloat(priceMatch[1]) : null;

            const name = titleNode?.innerText?.trim() || null;
            const unit = subtitleNode?.innerText?.trim() || null;

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

            if (name && price != null) {
              items.push({
                name,
                unit,
                price,
                isOnSpecial,
                discountText,
              });
            }
          } catch (err) {
            console.error("Error parsing product:", err);
          }
        });

      return items;
    });

    console.log(`✅ Scraped ${ingredients.length} ingredients`);
    console.dir(ingredients.slice(0, 3), { depth: null });

    // Save to DB
    for (const item of ingredients) {
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
        console.log(`✅ Saved: ${item.name} - $${item.price}`);
      } catch (err) {
        console.error(`❌ Failed to save ${item.name}:`, err.message);
      }
    }

    await page.screenshot({ path: "paknsave-screenshot.png", fullPage: true });
    await browser.close();
  } catch (err) {
    console.error("🚨 Scraper error:", err);
  }
}

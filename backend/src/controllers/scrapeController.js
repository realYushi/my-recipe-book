import puppeteer from "puppeteer-extra";
import dotenv from "dotenv";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Ingredient } from "../models/ingredientModel.js";

dotenv.config();
puppeteer.use(StealthPlugin());

// Normalize units to match model enum
const normalizeUnit = (rawUnit) => {
  const u = rawUnit.toLowerCase();
  if (u.includes("kg")) return "kg";
  if (u.includes("g")) return "g";
  if (u.includes("ml")) return "ml";
  if (u.includes("l")) return "l";
  return "g"; // fallback to 'g' for unknowns like 'ea'
};

export const scrapeController = async (req, res) => {
  const userId = req.user?.uid;
  const searchQuery = req.query.q;
  const baseUrl = "https://www.paknsave.co.nz/shop/search";
  const url = searchQuery
    ? `${baseUrl}?q=${encodeURIComponent(searchQuery)}`
    : baseUrl;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No user ID" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const productHandles = await page.$$('[data-testid^="product-"]');
    const scrapedItems = [];

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

        const price = parseFloat(`${dollars}.${cents}`);
        return { title, price, unit };
      }, productHandle);

      const normalizedTitle = productData.title.toLowerCase();
      const normalizedQuery = searchQuery?.toLowerCase();

      // Skip if title is bad, price is 0, or (if query exists) title doesn't include it
      if (
        productData.title === "N/A" ||
        productData.price === 0 ||
        (normalizedQuery && !normalizedTitle.includes(normalizedQuery))
      ) {
        continue;
      }

      const normalizedUnit = normalizeUnit(productData.unit);

      console.log(
        `Product: ${productData.title} | $${productData.price} ${normalizedUnit}`
      );

      scrapedItems.push({
        name: productData.title,
        price: productData.price,
        unit: normalizedUnit,
        category: "Unknown",
        user: userId,
      });
    }

    await Ingredient.insertMany(scrapedItems);
    await browser.close();

    return res.status(200).json({
      message: `${scrapedItems.length} items scraped and stored`,
      data: scrapedItems,
    });
  } catch (error) {
    console.error("Scraping failed:", error.message);
    return res
      .status(500)
      .json({ message: "Scraping failed", error: error.message });
  }
};

export default scrapeController;

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

const normalizeUnit = (rawUnit) => {
    if (!rawUnit || typeof rawUnit !== 'string') {
        return "unknown";
    }

    const u = rawUnit.toLowerCase().trim();

    if (u.includes("kg") || u.match(/\d+kg$/)) return "kg";
    if (u.includes("l") && !u.includes("ml")) return "l";

    if (u === "100ml" || u === "100 ml" || u.includes("100ml") || u.includes("100 ml") || u.includes("hundred ml")) return "100ml";

    if (u.includes("ml") || u.match(/\d+ml$/)) return "ml";

    if (u === "100g" || u === "100 g" || u.includes("100g") || u.includes("100 g") || u.includes("hundred g")) return "100g";

    if (u.includes("g") || u.match(/\d+g$/)) return "g";

    if (u === "ea" || u === "each") return "each";

    if (u.includes("kilogram")) return "kg";
    if (u.includes("litre") || u.includes("liter")) return "l";
    if (u.includes("millilitre") || u.includes("milliliter")) return "ml";

    return "unknown";
};

export class ScrapeService {
    static async scrapeProducts(searchQuery, userId) {
        const baseUrl = "https://www.paknsave.co.nz/shop/search";
        const url = searchQuery
            ? `${baseUrl}?q=${encodeURIComponent(searchQuery)}`
            : baseUrl;

        const browser = await puppeteer.launch({
            headless: "new",
            args: [
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--disable-images",
                "--disable-plugins",
                "--disable-extensions",
            ],
        });

        try {
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
                    const unitPriceEl = el.querySelector('[data-testid="non-promo-unit-price"]');

                    const title = titleEl?.textContent?.trim() || "N/A";
                    const dollars = dollarsEl?.textContent?.trim() || "0";
                    const cents = centsEl?.textContent?.trim() || "00";

                    let unit = "";
                    if (unitPriceEl) {
                        const unitPriceText = unitPriceEl.textContent?.trim() || "";

                        const unitMatch = unitPriceText.match(/\/(.+)$/);
                        if (unitMatch) {
                            unit = unitMatch[1];
                        }
                    }

                    const price = parseFloat(`${dollars}.${cents}`);

                    return { title, price, unit };
                }, productHandle);

                const normalizedTitle = productData.title.toLowerCase();
                const normalizedQuery = searchQuery?.toLowerCase();

                if (
                    productData.title === "N/A" ||
                    productData.price === 0 ||
                    (normalizedQuery && !normalizedTitle.includes(normalizedQuery))
                ) {
                    continue;
                }

                const normalizedUnit = normalizeUnit(productData.unit);

                scrapedItems.push({
                    name: productData.title,
                    price: productData.price,
                    unit: normalizedUnit,
                    category: "Unknown",
                    user: userId,
                });
            }
            return scrapedItems;
        } finally {
            await browser.close();
        }
    }


}
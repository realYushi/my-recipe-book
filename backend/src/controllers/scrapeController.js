import { ScrapeService } from "../services/scrapeService.js";

export const scrapeController = async (req, res) => {
  try {
    const userId = req.user?.uid;
    const searchQuery = req.query.q;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }

    const scrapedItems = await ScrapeService.scrapeProducts(searchQuery, userId);

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

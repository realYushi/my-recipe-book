
import authService from "./authService";

const scrapeService = {
    async scrapePaknSave(query: string) {
        try {
            const jwtToken = await authService.getJwtToken();
            const response = await fetch(`/api/scrape/paknsave?q=${encodeURIComponent(query)}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Scrape failed: ${response.status} - ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error("Scrape error: " + (error instanceof Error ? error.message : String(error)));
        }
    }
};

export default scrapeService;

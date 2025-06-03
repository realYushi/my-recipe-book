import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAuth } from "firebase/auth";
import type { Ingredient } from "@/model/ingredient";

interface IngredientSearchBarProps {
    onResults: (ingredients: Ingredient[]) => void;
}

export default function IngredientSearchBar({ onResults }: IngredientSearchBarProps) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchScrapedIngredients = async (query: string) => {
        try {
            setLoading(true);
            const user = getAuth().currentUser;
            if (!user) throw new Error("User not authenticated");

            const token = await user.getIdToken();
            const response = await fetch(`/api/scrape/paknsave?q=${encodeURIComponent(query)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Scraper request failed");

            const data = await response.json();

            // Optional: filter results again on client-side for extra accuracy
            const filtered = (data.ingredients || []).filter((ingredient: Ingredient) =>
                ingredient.name.toLowerCase().includes(query.toLowerCase())
            );

            onResults(filtered);
        } catch (err) {
            console.error("Scrape error:", err);
            onResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        if (input.trim() === "") {
            onResults([]);
            return;
        }

        debounceTimeout.current = setTimeout(() => {
            fetchScrapedIngredients(input);
        }, 300);

        return () => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        };
    }, [input]);

    return (
        <div className="relative w-full max-w-md">
            <div className="flex items-center border border-gray-300 rounded px-2 py-1">
                <Search className="text-gray-500 mr-2 h-4 w-4" />
                <Input
                    type="text"
                    placeholder="Search Pak'nSave ingredients..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow focus:outline-none border-0 shadow-none"
                />
            </div>
            {loading && (
                <p className="text-sm mt-1 text-muted-foreground">Searching...</p>
            )}
        </div>
    );
}

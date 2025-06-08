import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import recipeService from "@/service/recipeService";
import type { Recipe } from "@/model/recipe";

export function SearchBar({ onSearchResults }: { onSearchResults: (results: Recipe[]) => void }) {
    const [input, setInput] = useState("");
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchData = async (value: string) => {
        try {
            const response = await recipeService.searchRecipes(value);
            onSearchResults(response);
        } catch (error) {
            console.error("Error fetching data:", error);
            onSearchResults([]);
        }
    };

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        if (input.trim() === "") {
            onSearchResults([]);
            return;
        }

        debounceTimeout.current = setTimeout(() => {
            fetchData(input);
        }, 300);
    }, [input]);

    return (
        <div className="relative">
            <div className="flex items-center border border-gray-300 rounded px-2 py-1">
                <span className="text-gray-500 mr-2">
                    <Search />
                </span>
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow focus:outline-none"
                />
            </div>
        </div>
    );
}

export default SearchBar;
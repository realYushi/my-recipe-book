import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import recipeService from '@/service/recipeService';
import type { Recipe } from '@/model/recipe';
export function SearchBar() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState<Recipe[]>([]);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();
    const fetchData = async (value: string) => {
        try {
            const response = await recipeService.searchRecipes(value);
            setResults(response);
        } catch (error) {
            console.error("Error fetching data:", error);
            setResults([]);
        }
    };

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        if (input.trim() === "") {
            setResults([]);
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
                    placeholder={`Search for recipes...`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow focus:outline-none"
                />
            </div>

            {results.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 shadow">
                    {results.map((recipe, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                navigate(`/app/recipes/${recipe._id}`);
                            }}
                        >
                            {recipe.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;

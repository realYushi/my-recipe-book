import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import authService from "@/service/authService";

export function SearchBar() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    //const router = useRouter();

    const fetchData = async (value: string) => {
        try {
            const token = await authService.getJwtToken("token");

            const response = await fetch(`/api/recipes/search?name=${value}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResults(data);
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
                    <FaSearch />
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
                        //onClick={() => router.push(`/recipes/${recipe._id}`)}
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

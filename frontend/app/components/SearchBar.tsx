import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

export function SearchBar() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchData = async (value: string) => {
        try {
            const response = await fetch(`/api/recipes?name=${value}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        try {
            const token = localStorage.getItem("token")

            const response = await fetch(`/api/recipes?name=${value}`, {
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
        }
    }

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
        <div className="relative w-full max-w-sm mx-auto">
            <div className="flex items-center border border-gray-300 rounded px-2 py-1">
                <span className="text-gray-500 mr-2">
                    <FaSearch />
                </span>
                <input
                    type="text"
                    placeholder="Type to search..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow focus:outline-none"
                />
            </div>

            {results.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 shadow">
                    {results.map((recipe, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {recipe.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';


export function SearchBar() {
    const [input, setInput] = useState("");

    const fetchData = async (value: string) => {
        try {
            //this is the api call to the backend I need to  add
            const response = await fetch(`http://localhost:5174/app/?query=${value}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="relative hidden md:flex w-full max-w-sm items-center">
            <FaSearch />
            <input
                type="text"
                className="search-input"
                placeholder="Type to search..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <div className="search-button">
                <button
                    type="button"
                    className="search-button"
                    onClick={() => fetchData(input)}
                >
                </button>
            </div>
        </div>
    );
}

export default SearchBar;

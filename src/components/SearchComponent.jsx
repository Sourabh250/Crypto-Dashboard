import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";

// Custom hook for fetching search suggestions
function useSearchData(query) {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchData = debounce(() => {
            if (query.length > 1) {
                fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
                    .then(response => response.json())
                    .then(data => {
                        setSuggestions(data.coins);
                    })
                    .catch(error => console.log("Error fetching data:", error));
            } else {
                setSuggestions([]);
            }
        }, 500);

        fetchData();

        return () => {
            fetchData.cancel(); // Cancel debounce on unmount
        };

    }, [query]);
    return suggestions;
}

function SearchComponent() {
    const dispatcher = useDispatch();
    const [val, setVal] = useState("");
    const [showData, setShowData] = useState(false);
    const suggestions = useSearchData(val); // Get search suggestions based on input

    // Handle input change
    const handleChange = (e) => {
        setVal(e.target.value);
        setShowData(true);
    }

    // Handle suggestion click
    const handleClick = (id) => {
        console.log(id);
        dispatcher({type: "MODIFY_CRYPTO_CURRENCY", payload: id.charAt(0).toUpperCase() + id.slice(1)});
        setShowData(false);
    }

    return (
        <div className="flex-grow shadow-lg relative">

            {/* Search input field */}
            <input onChange={handleChange} className="w-full px-16 py-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" placeholder="Search by coin" value={val} />

            {/* Search icon */}
            <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-2xl opacity-40" />

            {/* Show suggestions */}
            {showData && suggestions.length > 0 && (
                <ul className="absolute bg-gray-300 w-full mt-2 z-30 rounded shadow-md border  border-gray-300 max-h-40 overflow-y-auto custom-scrollbar">
                    {suggestions.map((suggestion,index) => (
                        <li key={index} className="p-2 hover:bg-red-200 cursor-pointer" onClick={() => handleClick(suggestion.id)}>{suggestion.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchComponent;
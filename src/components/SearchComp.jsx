import React, { useState } from "react";

const SearchComp = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Example suggestions (you can fetch these dynamically from an API)
    const allSuggestions = [
        "React",
        "React Native",
        "Redux",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "MongoDB",
        "Next.js",
    ];

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value) {
            const filteredSuggestions = allSuggestions.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]); // Clear suggestions after selection
        console.log("Selected:", suggestion);
    };

    return (
        <div className="flex flex-col items-center ">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search here..."
                    className="w-full p-3 pl-10 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
                />
                <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>

                {/* Suggestions dropdown */}
                {suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchComp;

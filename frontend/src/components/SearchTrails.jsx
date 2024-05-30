import React, { useState } from "react";

const SearchTrailFeatures = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="search-trail-features text-center">
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            className="search-trail-features__input px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 w-full"
            placeholder="Enter search query..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <button
            className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-200 text-gray-800 rounded-r-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            onClick={handleSearch}
          >
            <svg
              className="h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l5-5m0 0l-5-5m5 5H4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchTrailFeatures;

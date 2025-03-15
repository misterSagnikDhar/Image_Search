// frontend/src/App.js
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultArea from "./components/ResultArea";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(""); // Track search query
  const [page, setPage] = useState(1); // Track current page
  const [loading, setLoading] = useState(false); // Loading state

  const API_URL = "https://image-search-kof0.onrender.com/search_images/"; // Deployed backend URL

  const handleSearch = async (newQuery) => {
    setQuery(newQuery); // Store the query
    setPage(1); // Reset to page 1
    setImages([]); // Clear previous results
    fetchImages(newQuery, 1, true); // Fetch new results
  };

  const fetchImages = async (searchQuery, pageNumber, reset = false) => {
    if (!searchQuery) return; // Avoid fetching if query is empty

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}?query=${encodeURIComponent(searchQuery)}&page=${pageNumber}&per_page=20`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.status}`);
      }
      const data = await response.json();
      setImages((prevImages) => (reset ? data : [...prevImages, ...data])); // Append images
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages((prevImages) => (reset ? [] : prevImages)); // Clear on reset, keep otherwise
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchImages(query, page + 1);
  };

  return (
    <div className="App min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-10">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex-grow pt-40 overflow-y-auto">
        <ResultArea images={images} />
        {images.length > 0 && (
          <div className="text-center my-4">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-gray-700"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

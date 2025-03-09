import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Pass the query to the parent component (App.js)
  };

  return (
    <div className="search-bar-wrapper min-w-full bg-[#222327] py-8">
      <h1 className="text-3xl md:text-5xl text-center pb-4 bg-gradient-to-r from-cyan-200 to-sky-500  bg-clip-text text-transparent">
        Image Search
      </h1>

      <form
        className="input-wrapper bg-[#404454] rounded-full shadow-2xl flex items-center my-4 mx-auto justify-center max-w-md"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Search Image.."
          className="bg-transparent border-none h-10 md:h-12 text-base md:text-xl pl-4 pr-10 focus:outline-none flex-grow w-64 font-medium text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#404454] rounded-full w-10 h-10 flex items-center justify-center ml-2 md:ml-4"
        >
          <FaSearch className="w-5 h-5 md:w-6 md:h-6 text-cyan-200" />
        </button>
      </form>
        <p className="text-white text-center"> To download a image click on it and right click to save image as jpg. </p>
    </div>
  );
};

export default SearchBar;

import React from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../SVG/search.svg";

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}&page=1`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for movies"
      />
      <img src={SearchIcon} alt="search" onClick={handleSearch} />
    </div>
  );
};

export default SearchInput;

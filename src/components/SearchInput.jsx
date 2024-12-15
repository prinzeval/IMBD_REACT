// THIS IS src/components/SearchInput.jsx


import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "../SVG/search.svg";

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/search") {
      navigate(`/search?query=${searchTerm}&page=1`);
    }
  }, [searchTerm, navigate, location.pathname]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchTerm.trim()) {
        navigate(`/search?query=${searchTerm}&page=1`);
      }
    }
  };
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}&page=1`);
    }
  }

  return (
    <div className="search">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for movies"
      />
      <img src={SearchIcon} alt="search" onClick={handleSearch}/>
    </div>
  );
};

export default SearchInput;

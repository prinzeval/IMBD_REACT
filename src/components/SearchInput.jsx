// THIS IS src/components/SearchInput.jsx


import React, { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "../SVG/search.svg";
import debounce from 'lodash.debounce';

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const debouncedNavigate = useCallback(
    debounce((query) => {
      navigate(`/search?query=${query}&page=1`);
    }, 500),
    [navigate]
  );

  useEffect(() => {
    if (location.pathname === "/search") {
      debouncedNavigate(searchTerm);
    }
  }, [searchTerm, debouncedNavigate, location.pathname]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchTerm.trim()) {
        debouncedNavigate(searchTerm);
      }
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      debouncedNavigate(searchTerm);
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

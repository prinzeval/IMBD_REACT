import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../IMG/file.png"; // Import your picture
import SearchIcon from "../SVG/search.svg"; // Correct path to your search icon

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
            <span className="website-name">MYTVV</span>
          </Link>
        </div>
        <div className="menu-container">
          <ul className="menu-list">
            <li className="menu-list-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="menu-list-item">
              <Link to="/popular-tv">Popular TV</Link>
            </li>
            <li className="menu-list-item">Genre</li>
            <li className="menu-list-item">Country</li>
            <li className="menu-list-item">Movies</li>
            <li className="menu-list-item">TV Shows</li>
            <li className="menu-list-item">Top IMDB</li>
          </ul>
        </div>
        {location.pathname !== "/" && (
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
            />
            <img src={SearchIcon} alt="search" onClick={handleSearch} />
          </div>
        )}
        <div className="toggle" onClick={toggleDarkMode}>
          {darkMode ? '🌞 Light Mode' : '🌜 Dark Mode'}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

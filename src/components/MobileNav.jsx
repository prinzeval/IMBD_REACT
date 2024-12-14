// THIS IS src/components/MobileNav.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../IMG/Logo.png";
import SearchInput from "./SearchInput"; // Import the SearchInput component

const MobileNav = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.body.classList.add('dark-mode'); // Ensure dark mode is enabled by default
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="mobile-navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
            <span className="website-name">MYTVV</span>
          </Link>
        </div>
        <div className="search-container">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="toggle" onClick={toggleDarkMode}>
          {darkMode ? '🌞' : '🌜'}
        </div>
        <div className="hamburger-icon" onClick={toggleSidebar}>
          ☰
        </div>
      </div>
      <div className={`dropdown ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <button className="dropdown-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        {sidebarOpen && (
          <ul className="dropdown-menu">
            <li className="menu-list-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="menu-list-item">
              <Link to="/popular-tv">Popular TV</Link>
            </li>
            <li className="menu-list-item">
              Genre
              <hr className="lineline" style={{borderColor:"red"}}/>
              <ul className="submenu">
                <li><Link to="/genre/action">Action</Link></li>
                <li><Link to="/genre/comedy">Comedy</Link></li>
                <li><Link to="/genre/drama">Drama</Link></li>
              </ul>
            </li>
            <li className="menu-list-item">Country</li>
            <li className="menu-list-item">Movies</li>
            <li className="menu-list-item">TV Shows</li>
            <li className="menu-list-item">Top IMDB</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default MobileNav;

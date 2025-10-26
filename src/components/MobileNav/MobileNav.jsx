import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../IMG/Logo.png";
import SearchInput from "../SearchInput/SearchInput";
import "./MobileNav.css";

const MobileNav = () => {
  // Initialize darkMode state from localStorage or default to true
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === null ? true : savedTheme === 'dark';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Apply the theme immediately on mount
    document.body.classList.toggle('dark-mode', darkMode);

    // Listen for theme changes from other components (e.g., Navbar)
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme');
      const isDarkMode = savedTheme === null ? true : savedTheme === 'dark';
      setDarkMode(isDarkMode);
      document.body.classList.toggle('dark-mode', isDarkMode);
    };

    window.addEventListener('theme-changed', handleThemeChange);

    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
    };
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);

    // Save theme preference to localStorage
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');

    // Dispatch custom event to sync with other components
    window.dispatchEvent(new Event('theme-changed'));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="mobile-navbar">
        <div className="mobile-nav-container">
          <div className="mobile-logo">
            <Link to="/" className="mobile-logo-link">
              <img src={logo} alt="Logo" className="mobile-logo-img" />
              <span className="mobile-brand">MYTVV</span>
            </Link>
          </div>

          <div className="mobile-nav-right">
            <div className="mobile-search">
              <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <button className="mobile-theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? '🌞' : '🌙'}
            </button>
            <button className="mobile-menu-toggle" onClick={toggleSidebar}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="mobile-sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <div className="mobile-sidebar-logo">
            <img src={logo} alt="Logo" />
            <span>MYTVV</span>
          </div>
          <button className="mobile-sidebar-close" onClick={closeSidebar}>
            ✕
          </button>
        </div>

        <nav className="mobile-sidebar-nav">
          <Link to="/home" className="mobile-nav-item" onClick={closeSidebar}>
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </Link>
          <Link to="/tv-shows" className="mobile-nav-item" onClick={closeSidebar}>
            <span className="nav-icon">📺</span>
            <span>TV Shows</span>
          </Link>
          <Link to="/movies" className="mobile-nav-item" onClick={closeSidebar}>
            <span className="nav-icon">🎬</span>
            <span>Movies</span>
          </Link>
          <Link to="/trending" className="mobile-nav-item" onClick={closeSidebar}>
            <span className="nav-icon">🔥</span>
            <span>New & Popular</span>
          </Link>
          <Link to="/country" className="mobile-nav-item" onClick={closeSidebar}>
            <span className="nav-icon">🌍</span>
            <span>Country</span>
          </Link>
        </nav>

        <div className="mobile-sidebar-footer">
          <button className="mobile-theme-btn" onClick={toggleDarkMode}>
            <span className="nav-icon">{darkMode ? '🌞' : '🌙'}</span>
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
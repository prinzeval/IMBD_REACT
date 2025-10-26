import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../IMG/Logo.png";
import SearchInput from "../SearchInput/SearchInput";
import { useCountry } from "../../contexts/CountryContext";
import { fetchMovieGenres, fetchTVGenres } from "../../services/tmdbApi";
import "./Navbar.css";

const Navbar = () => {
  // Initialize darkMode state from localStorage or default to true
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === null ? true : savedTheme === 'dark';
    console.log('Initializing theme from localStorage:', savedTheme, '-> isDarkMode:', isDarkMode);
    return isDarkMode;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const { selectedCountry, updateCountry } = useCountry();

  // Country data
  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "IT", name: "Italy", flag: "🇮🇹" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "KR", name: "South Korea", flag: "🇰🇷" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" },
    { code: "MX", name: "Mexico", flag: "🇲🇽" },
    { code: "RU", name: "Russia", flag: "🇷🇺" },
    { code: "CN", name: "China", flag: "🇨🇳" },
    { code: "NL", name: "Netherlands", flag: "🇳🇱" },
    { code: "SE", name: "Sweden", flag: "🇸🇪" },
    { code: "NO", name: "Norway", flag: "🇳🇴" },
    { code: "DK", name: "Denmark", flag: "🇩🇰" },
    { code: "FI", name: "Finland", flag: "🇫🇮" }
  ];

  useEffect(() => {
    // Apply the theme immediately on mount
    document.body.classList.toggle('dark-mode', darkMode);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Listen for theme changes from other components (e.g., MobileNav)
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme');
      const isDarkMode = savedTheme === null ? true : savedTheme === 'dark';
      setDarkMode(isDarkMode);
      document.body.classList.toggle('dark-mode', isDarkMode);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('theme-changed', handleThemeChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('theme-changed', handleThemeChange);
    };
  }, [darkMode]);

  // Load genres on component mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const [movies, tv] = await Promise.all([
          fetchMovieGenres(),
          fetchTVGenres()
        ]);
        setMovieGenres(movies.genres || []);
        setTvGenres(tv.genres || []);
      } catch (err) {
        console.error('Error loading genres:', err);
      }
    };

    loadGenres();
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    console.log('Toggling theme to:', newDarkMode ? 'dark' : 'light');
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);

    // Save theme preference to localStorage
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    console.log('Saved to localStorage:', localStorage.getItem('theme'));

    // Dispatch custom event to sync with other components
    window.dispatchEvent(new Event('theme-changed'));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCountrySelect = (countryCode) => {
    updateCountry(countryCode);
    setCountryDropdownOpen(false);
  };

  const toggleCountryDropdown = () => {
    setCountryDropdownOpen(!countryDropdownOpen);
  };

  const toggleGenreDropdown = () => {
    setGenreDropdownOpen(!genreDropdownOpen);
  };

  const getSelectedCountryData = () => {
    return countries.find(country => country.code === selectedCountry) || countries[0];
  };

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
            <span className="website-name">MYTVV</span>
          </Link>
          <nav className="main-nav">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/movies" className="nav-link">Movies</Link>
            <Link to="/tv-shows" className="nav-link">TV Shows</Link>
            <Link to="/trending" className="nav-link">New & Popular</Link>

            {/* Genre Dropdown */}
            <div className="genre-dropdown-container">
              <button
                className="genre-selector"
                onClick={toggleGenreDropdown}
              >
                <span className="genre-name">Genres</span>
                <span className="dropdown-arrow">{genreDropdownOpen ? '▲' : '▼'}</span>
              </button>

              {genreDropdownOpen && (
                <div className="genre-dropdown">
                  <div className="genre-dropdown-header">
                    <span>Movie Genres</span>
                  </div>
                  <div className="genre-list">
                    {movieGenres.map((genre) => (
                      <Link
                        key={`movie-${genre.id}`}
                        to={`/genre/movie/${genre.id}`}
                        className="genre-option"
                        onClick={() => setGenreDropdownOpen(false)}
                      >
                        <span className="genre-name">{genre.name}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="genre-dropdown-header">
                    <span>TV Genres</span>
                  </div>
                  <div className="genre-list">
                    {tvGenres.map((genre) => (
                      <Link
                        key={`tv-${genre.id}`}
                        to={`/genre/tv/${genre.id}`}
                        className="genre-option"
                        onClick={() => setGenreDropdownOpen(false)}
                      >
                        <span className="genre-name">{genre.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Country Dropdown */}
            <div className="country-dropdown-container">
              <Link to="/country" className="country-selector">
                <span className="country-flag">{getSelectedCountryData().flag}</span>
                <span className="country-name">{getSelectedCountryData().name}</span>
                <span className="dropdown-arrow">▼</span>
              </Link>

              <button
                className="country-dropdown-trigger"
                onClick={toggleCountryDropdown}
              >
                <span className="dropdown-arrow">{countryDropdownOpen ? '▲' : '▼'}</span>
              </button>

              {countryDropdownOpen && (
                <div className="country-dropdown">
                  <div className="country-dropdown-header">
                    <span>Select Country</span>
                  </div>
                  <div className="country-list">
                    {countries.map((country) => (
                      <div
                        key={country.code}
                        className={`country-option ${selectedCountry === country.code ? 'selected' : ''}`}
                        onClick={() => handleCountrySelect(country.code)}
                      >
                        <span className="country-flag">{country.flag}</span>
                        <span className="country-name">{country.name}</span>
                        {selectedCountry === country.code && <span className="checkmark">✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
        <div className="navbar-right">
          <div className="search-container">
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          <button className="theme-toggle-btn" onClick={toggleDarkMode}>
            {darkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
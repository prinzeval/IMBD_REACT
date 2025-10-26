import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="welcome-hero">
      {/* Hero Background */}
      <div className="welcome-backdrop">
        <div className="welcome-bg-image"></div>
        <div className="welcome-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="welcome-content">
        <div className="welcome-text">
          <h1 className="welcome-title">
            Welcome to <span className="brand-highlight">MYTVV</span>
          </h1>
          <h2 className="welcome-subtitle">
            Your Ultimate Streaming Destination
          </h2>
          <p className="welcome-description">
            Unlimited access to thousands of movies and TV shows.
            Stream in stunning quality with zero ads, anytime, anywhere.
          </p>

          {/* Huge Search Section */}
          <div className="search-hero-section">
            <h3 className="search-hero-title">What would you like to watch?</h3>
            <form className="search-hero-form" onSubmit={handleSearch}>
              <div className="search-hero-input-container">
                <input
                  type="text"
                  placeholder="Search for movies, TV shows, actors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-hero-input"
                />
                <button type="submit" className="search-hero-button">
                  <span className="search-icon">🔍</span>
                  Search
                </button>
              </div>
            </form>
            <div className="search-suggestions">
              <span className="suggestion-label">Popular searches:</span>
              <div className="suggestion-tags">
                <button className="suggestion-tag" onClick={() => setSearchQuery("Action")}>Action</button>
                <button className="suggestion-tag" onClick={() => setSearchQuery("Comedy")}>Comedy</button>
                <button className="suggestion-tag" onClick={() => setSearchQuery("Drama")}>Drama</button>
                <button className="suggestion-tag" onClick={() => setSearchQuery("Horror")}>Horror</button>
                <button className="suggestion-tag" onClick={() => setSearchQuery("Sci-Fi")}>Sci-Fi</button>
              </div>
            </div>
          </div>

          <div className="welcome-actions">
            <Link to="/home" className="welcome-button primary">
              <span>▶</span> Browse All Content
            </Link>
            <Link to="/home" className="welcome-button secondary">
              <span>🔥</span> Trending Now
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-section">
          <h3 className="features-title">Why Choose MYTVV?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚫</div>
              <h4>Ad-Free Experience</h4>
              <p>Watch without interruptions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h4>Instant Access</h4>
              <p>Start watching immediately</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h4>Fast Streaming</h4>
              <p>HD quality with no buffering</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h4>Huge Library</h4>
              <p>Thousands of titles</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h4>Multi-Device</h4>
              <p>Watch on any device</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h4>Secure & Private</h4>
              <p>Your data is protected</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Movies & Shows</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Languages</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Available</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Free</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

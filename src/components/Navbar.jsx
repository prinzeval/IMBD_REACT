import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleActive }) => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/home" className="logo">MyMovies</Link>
        </div>
        <div className="menu-container">
          <ul className="menu-list">
            <li className="menu-list-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="menu-list-item">
              <Link to="/search">Search</Link>
            </li>
            <li className="menu-list-item">Genre</li>
            <li className="menu-list-item">Country</li>
            <li className="menu-list-item">Movies</li>
            <li className="menu-list-item">TV Shows</li>
            <li className="menu-list-item">Top IMDB</li>
          </ul>
        </div>
        <div className="profile-container">
          <span className="profile-text-container">Hello, User</span>
          <img
            className="profile-picture"
            src="https://via.placeholder.com/32"
            alt="Profile"
          />
          <div className="toggle" onClick={toggleActive}>
            <span className="toggle-icon">🌞</span>
            <span className="toggle-icon">🌜</span>
            <div className="toggle-ball"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

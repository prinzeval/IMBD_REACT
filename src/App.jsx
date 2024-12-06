import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import SearchResult from "./components/SearchResult"; // Import SearchResult component
import MovieDetails from "./containers/MovieDetails";
import Navbar from "./components/Navbar"; // Import Navbar
import Welcome from "./components/Welcome"; // Import Welcome component

import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Navbar /> {/* SearchInput is now part of the Navbar */}
        <div className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv/:id" element={<MovieDetails />} />
            <Route path="/search" element={<SearchResult />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;

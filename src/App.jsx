import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import SearchResult from "./components/SearchResult/SearchResult";
import MovieDetails from "./containers/MovieDetails/MovieDetails";
import Navbar from "./components/Navbar/Navbar";
import MobileNav from "./components/MobileNav/MobileNav";
import Welcome from "./components/Welcome/Welcome";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Navbar /> {/* Desktop Navbar */}
        <MobileNav /> {/* Mobile Navbar */}
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
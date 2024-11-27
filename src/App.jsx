import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home"; // Import Home component
import Search from "./containers/Search";
import MovieDetails from "./containers/MovieDetails";
import Navbar from "./components/Navbar"; // Import Navbar
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} /> {/* Add Home route */}
            <Route path="/" element={<Search />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv/:id" element={<MovieDetails />} />
            <Route path="/popular-tv" element={<Home />} /> {/* Add Popular TV route */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};
export default App;

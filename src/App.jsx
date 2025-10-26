import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import SearchResult from "./components/SearchResult/SearchResult";
import MovieDetails from "./containers/MovieDetails/MovieDetails";
import GenrePage from "./components/GenrePage/GenrePage";
import Movies from "./pages/Movies/Movies";
import TVShows from "./pages/TVShows/TVShows";
import Trending from "./pages/Trending/Trending";
import Country from "./pages/Country/Country";
import Genre from "./pages/Genre/Genre";
import Navbar from "./components/Navbar/Navbar";
import MobileNav from "./components/MobileNav/MobileNav";
import Welcome from "./components/Welcome/Welcome";
import { CountryProvider } from "./contexts/CountryContext";
import "./App.css";

const App = () => {
  return (
    <CountryProvider>
      <div className="app-container">
        <Router>
          <Navbar /> {/* Desktop Navbar */}
          <MobileNav /> {/* Mobile Navbar */}
          <div className="main-content">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Welcome />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-shows" element={<TVShows />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/country" element={<Country />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/tv/:id" element={<MovieDetails />} />
              <Route path="/genre/:mediaType/:genreId" element={<Genre />} />
              <Route path="/search" element={<SearchResult />} />
            </Routes>
          </div>
        </Router>
      </div>
    </CountryProvider>
  );
};

export default App;
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SearchIcon from "../SVG/search.svg";
import Welcome from "../components/Welcome"; // Import the new Welcome component

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Use import.meta.env for Vite

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // Default to empty string
  const page = parseInt(searchParams.get("page")) || 1;
  const [searchTerm, setSearchTerm] = useState(query);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const response = await fetch(
            `${API_URL}search/multi?query=${query}&include_adult=false&language=en-US&page=${page}&api_key=${API_KEY}`
          );
          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return;
          }
          const data = await response.json();
          const filteredResults = data.results.filter(
            (item) => item.media_type === "movie" || item.media_type === "tv"
          );
          setMovies(filteredResults || []);
          setTotalPages(data.total_pages || 1);
        } catch (error) {
          console.error("Failed to fetch movies:", error);
          setMovies([]);
          setTotalPages(1);
        }
      };
      fetchMovies();
    }
  }, [query, page]);
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}&page=1`);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handlePageChange = (direction) => {
    const newPage = page + direction;
    if (newPage > 0 && newPage <= totalPages) {
      navigate(`/search?query=${query}&page=${newPage}`);
      document.querySelector('.container').scrollBy({
        left: direction * 200, // Adjust this value based on card width
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      {location.pathname === "/" && <Welcome />}
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} // Add this line to handle "Enter" key
          placeholder="Search for movies"
        />
        <img src={SearchIcon} alt="search" onClick={handleSearch} />
      </div>
      {movies.length > 0 ? (
        <>
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="pagination">
            <button onClick={() => handlePageChange(-1)} disabled={page === 1}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        query && (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      )}
    </div>
  );
};

export default Search;
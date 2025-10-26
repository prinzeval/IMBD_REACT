import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import Welcome from "../Welcome/Welcome";
import "./SearchResult.css";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SearchResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 1;
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

  const handlePageChange = (direction) => {
    const newPage = page + direction;
    if (newPage > 0 && newPage <= totalPages) {
      navigate(`/search?query=${query}&page=${newPage}`);
    }
  };

  return (
    <div className="search-results-container">
      {location.pathname === "/" && <Welcome />}
      {query && (
        <div className="search-results-header">
          <h1 className="search-results-title">
            Search Results for "{query}"
          </h1>
          <p className="search-results-subtitle">
            {movies.length} {movies.length === 1 ? 'result' : 'results'} found
          </p>
        </div>
      )}
      {movies.length > 0 ? (
        <>
          <div className="search-results-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="search-pagination">
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
          <div className="search-empty">
            <h2>No results found</h2>
            <p>Try searching for something else</p>
          </div>
        )
      )}
    </div>
  );
};

export default SearchResult;
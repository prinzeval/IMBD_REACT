import React, { useState, useEffect, useRef } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Home.css";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVSeries, setTrendingTVSeries] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVSeries, setPopularTVSeries] = useState([]);
  const [timeWindow, setTimeWindow] = useState("week");

  const trendingMoviesRef = useRef(null);
  const trendingTVSeriesRef = useRef(null);
  const popularMoviesRef = useRef(null);
  const popularTVSeriesRef = useRef(null);

  const scroll = (containerRef, direction) => {
    containerRef.current.scrollBy({
      left: direction * 200,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `${API_URL}/trending/movie/${timeWindow}?language=en-US&api_key=${API_KEY}`
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setTrendingMovies(data.results || []);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
        setTrendingMovies([]);
      }
    };

    const fetchTrendingTVSeries = async () => {
      try {
        const response = await fetch(
          `${API_URL}/trending/tv/${timeWindow}?language=en-US&api_key=${API_KEY}`
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setTrendingTVSeries(data.results || []);
      } catch (error) {
        console.error("Failed to fetch trending TV series:", error);
        setTrendingTVSeries([]);
      }
    };

    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `${API_URL}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }
        const data = await response.json();
        const moviesWithMediaType = data.results.map(movie => ({ ...movie, media_type: 'movie' }));
        setPopularMovies(moviesWithMediaType || []);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
        setPopularMovies([]);
      }
    };

    const fetchPopularTVSeries = async () => {
      try {
        const response = await fetch(
          `${API_URL}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=US&api_key=${API_KEY}`
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }
        const data = await response.json();
        const tvSeriesWithMediaType = data.results.map(tv => ({ ...tv, media_type: 'tv' }));
        setPopularTVSeries(tvSeriesWithMediaType || []);
      } catch (error) {
        console.error("Failed to fetch popular TV series:", error);
        setPopularTVSeries([]);
      }
    };

    fetchTrendingMovies();
    fetchTrendingTVSeries();
    fetchPopularMovies();
    fetchPopularTVSeries();
  }, [timeWindow]);

  return (
    <div className="home-container">
      <div className="time-window-toggle">
        <button
          className={timeWindow === "week" ? "active" : ""}
          onClick={() => setTimeWindow("week")}
        >
          This Week
        </button>
        <button
          className={timeWindow === "day" ? "active" : ""}
          onClick={() => setTimeWindow("day")}
        >
          Today
        </button>
      </div>
      
      <h2>Trending Movies</h2>
      <div className="scroll-container">
        <button className="scroll-button left" onClick={() => scroll(trendingMoviesRef, -1)}>{"<"}</button>
        <div className="container" ref={trendingMoviesRef}>
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button className="scroll-button right" onClick={() => scroll(trendingMoviesRef, 1)}>{">"}</button>
      </div>
      
      <h2>Trending TV Series</h2>
      <div className="scroll-container">
        <button className="scroll-button left" onClick={() => scroll(trendingTVSeriesRef, -1)}>{"<"}</button>
        <div className="container" ref={trendingTVSeriesRef}>
          {trendingTVSeries.map((tvSeries) => (
            <MovieCard key={tvSeries.id} movie={tvSeries} />
          ))}
        </div>
        <button className="scroll-button right" onClick={() => scroll(trendingTVSeriesRef, 1)}>{">"}</button>
      </div>
      
      <h2>Popular Movies</h2>
      <div className="scroll-container">
        <button className="scroll-button left" onClick={() => scroll(popularMoviesRef, -1)}>{"<"}</button>
        <div className="container" ref={popularMoviesRef}>
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button className="scroll-button right" onClick={() => scroll(popularMoviesRef, 1)}>{">"}</button>
      </div>
      
      <h2>Popular TV Series</h2>
      <div className="scroll-container">
        <button className="scroll-button left" onClick={() => scroll(popularTVSeriesRef, -1)}>{"<"}</button>
        <div className="container" ref={popularTVSeriesRef}>
          {popularTVSeries.map((tvSeries) => (
            <MovieCard key={tvSeries.id} movie={tvSeries} />
          ))}
        </div>
        <button className="scroll-button right" onClick={() => scroll(popularTVSeriesRef, 1)}>{">"}</button>
      </div>
    </div>
  );
};

export default Home;
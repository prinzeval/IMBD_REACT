import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_URL = "https://api.themoviedb.org/3/trending";
const API_KEY = "95969af960b31cb5bde9e76e0a841cd4";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVSeries, setTrendingTVSeries] = useState([]);
  const [timeWindow, setTimeWindow] = useState("week"); // Default to "week"

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `${API_URL}/movie/${timeWindow}?language=en-US&api_key=${API_KEY}`
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
          `${API_URL}/tv/${timeWindow}?language=en-US&api_key=${API_KEY}`
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

    fetchTrendingMovies();
    fetchTrendingTVSeries();
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
      <div className="container">
        {trendingMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <h2>Trending TV Series</h2>
      <div className="container">
        {trendingTVSeries.map((tvSeries) => (
          <MovieCard key={tvSeries.id} movie={tvSeries} />
        ))}
      </div>
    </div>
  );
};

export default Home;

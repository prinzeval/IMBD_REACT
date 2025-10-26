import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Home.css";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Home = () => {
  const navigate = useNavigate();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVSeries, setTrendingTVSeries] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVSeries, setPopularTVSeries] = useState([]);
  const [timeWindow, setTimeWindow] = useState("week");
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Create hero carousel items from trending content
  const heroItems = [
    ...trendingMovies.slice(0, 3),
    ...trendingTVSeries.slice(0, 2)
  ].filter(item => item.backdrop_path);

  // Auto-rotation carousel logic
  useEffect(() => {
    if (!isAutoPlaying || heroItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) =>
        prevIndex === heroItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroItems.length]);



  // Manual navigation
  const goToNext = () => {
    setCurrentHeroIndex((prevIndex) =>
      prevIndex === heroItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentHeroIndex((prevIndex) =>
      prevIndex === 0 ? heroItems.length - 1 : prevIndex - 1
    );
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

  // Get current featured content from carousel
  const featuredContent = heroItems[currentHeroIndex];


  // Handle play button click - navigate to movie details
  const handlePlayButtonClick = () => {
    if (featuredContent) {
      const mediaType = featuredContent.media_type || (featuredContent.title ? 'movie' : 'tv');
      navigate(`/${mediaType}/${featuredContent.id}`);
    }
  };

  // Handle more info button click - navigate to movie details
  const handleMoreInfoClick = () => {
    if (featuredContent) {
      const mediaType = featuredContent.media_type || (featuredContent.title ? 'movie' : 'tv');
      navigate(`/${mediaType}/${featuredContent.id}`);
    }
  };


  return (
    <div className="home-container">
      {/* Netflix-style Hero Carousel */}
      {featuredContent && (
        <div className="hero-section">
          <div className="hero-backdrop">
            {/* Static backdrop image */}
            <img
              src={`https://image.tmdb.org/t/p/original${featuredContent.backdrop_path}`}
              alt={featuredContent.title || featuredContent.name}
              className="hero-image"
            />

            <div className="hero-gradient"></div>
          </div>

          {/* Carousel Navigation Arrows */}
          {heroItems.length > 1 && (
            <>
              <button
                className="hero-nav-button hero-nav-left"
                onClick={goToPrevious}
              >
                ‹
              </button>
              <button
                className="hero-nav-button hero-nav-right"
                onClick={goToNext}
              >
                ›
              </button>
            </>
          )}

          {/* Carousel Indicators */}
          {heroItems.length > 1 && (
            <div className="hero-indicators">
              {heroItems.map((_, index) => (
                <button
                  key={index}
                  className={`hero-indicator ${index === currentHeroIndex ? 'active' : ''}`}
                  onClick={() => setCurrentHeroIndex(index)}
                />
              ))}
            </div>
          )}

          <div className="hero-content">
            <div className="hero-info">
              <h1 className="hero-title">{featuredContent.title || featuredContent.name}</h1>
              <p className="hero-description">{featuredContent.overview}</p>
              <div className="hero-buttons">
                <button className="hero-button play-button" onClick={handlePlayButtonClick}>
                  <span>▶</span> Play
                </button>
                <button className="hero-button info-button" onClick={handleMoreInfoClick}>
                  <span>ⓘ</span> More Info
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Time Window Toggle - Moved outside hero section */}
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

      {/* Content Rows */}
      <div className="content-rows">
        <div className="content-row">
          <h2 className="row-title">Trending Movies</h2>
          <div className="scroll-container">
            <button className="scroll-button left" onClick={() => scroll(trendingMoviesRef, -1)}>{"<"}</button>
            <div className="container" ref={trendingMoviesRef}>
              {trendingMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>
            <button className="scroll-button right" onClick={() => scroll(trendingMoviesRef, 1)}>{">"}</button>
          </div>
        </div>

        <div className="content-row">
          <h2 className="row-title">Trending TV Series</h2>
          <div className="scroll-container">
            <button className="scroll-button left" onClick={() => scroll(trendingTVSeriesRef, -1)}>{"<"}</button>
            <div className="container" ref={trendingTVSeriesRef}>
              {trendingTVSeries.map((tvSeries) => (
                <MovieCard
                  key={tvSeries.id}
                  movie={tvSeries}
                />
              ))}
            </div>
            <button className="scroll-button right" onClick={() => scroll(trendingTVSeriesRef, 1)}>{">"}</button>
          </div>
        </div>

        <div className="content-row">
          <h2 className="row-title">Popular Movies</h2>
          <div className="scroll-container">
            <button className="scroll-button left" onClick={() => scroll(popularMoviesRef, -1)}>{"<"}</button>
            <div className="container" ref={popularMoviesRef}>
              {popularMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>
            <button className="scroll-button right" onClick={() => scroll(popularMoviesRef, 1)}>{">"}</button>
          </div>
        </div>

        <div className="content-row">
          <h2 className="row-title">Popular TV Series</h2>
          <div className="scroll-container">
            <button className="scroll-button left" onClick={() => scroll(popularTVSeriesRef, -1)}>{"<"}</button>
            <div className="container" ref={popularTVSeriesRef}>
              {popularTVSeries.map((tvSeries) => (
                <MovieCard
                  key={tvSeries.id}
                  movie={tvSeries}
                />
              ))}
            </div>
            <button className="scroll-button right" onClick={() => scroll(popularTVSeriesRef, 1)}>{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
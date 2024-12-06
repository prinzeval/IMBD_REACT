import React, { useEffect, useState, useRef } from "react";
import MovieCard from "./MovieCard";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Recommendations = ({ id, mediaType }) => {
  const [recommendations, setRecommendations] = useState([]);
  const containerRef = useRef(null);

  const scroll = (direction) => {
    containerRef.current.scrollBy({
      left: direction * 200, // Adjust the scroll amount
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      const endpoint =
        mediaType === "movie"
          ? `${API_URL}movie/${id}/recommendations?language=en-US&page=1&api_key=${API_KEY}`
          : `${API_URL}tv/${id}/recommendations?language=en-US&page=1&api_key=${API_KEY}`;

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setRecommendations(data.results || []);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setRecommendations([]);
      }
    };

    fetchRecommendations();
  }, [id, mediaType]);

  return (
    <div className="recommendations-container">
      <h2>Recommended {mediaType === "movie" ? "Movies" : "TV Shows"}</h2>
      <div className="scroll-container">
        <button className="scroll-button left" onClick={() => scroll(-1)}>{"<"}</button>
        <div className="container" ref={containerRef}>
          {recommendations.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
        <button className="scroll-button right" onClick={() => scroll(1)}>{">"}</button>
      </div>
    </div>
  );
};

export default Recommendations;

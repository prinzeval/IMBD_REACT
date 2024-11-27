import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const Recommendations = ({ id, mediaType }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const endpoint =
        mediaType === "movie"
          ? `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1&api_key=95969af960b31cb5bde9e76e0a841cd4`
          : `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1&api_key=95969af960b31cb5bde9e76e0a841cd4`;

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
      <div className="container">
        {recommendations.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;

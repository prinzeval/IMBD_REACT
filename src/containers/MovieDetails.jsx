// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const API_URL = "https://www.omdbapi.com/"; // Base URL for OMDB API
// const API_KEY = "1f841ba6"; // Your API key

// const MovieDetails = () => {
//   const { id } = useParams(); // Get imdbID from URL params
//   const [movie, setMovie] = useState(null); // State to hold movie details
//   const [selectedSeason, setSelectedSeason] = useState(1); // Default to Season 1
//   const [selectedEpisode, setSelectedEpisode] = useState(1); // Default to Episode 1

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       const response = await fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`);
//       const data = await response.json();
//       setMovie(data); // Set movie details to state
//     };

//     fetchMovieDetails(); // Fetch movie details on component mount
//   }, [id]);

//   if (!movie) {
//     return <h2>Loading...</h2>; // Show loading message while fetching data
//   }

//   // Generate iframe URL for video
//   const iframeUrl = movie.Type === 'movie'
//     ? `https://vidsrc.xyz/embed/movie?imdb=${id}`
//     : `https://vidsrc.xyz/embed/tv?imdb=${id}&season=${selectedSeason}&episode=${selectedEpisode}`;

//   // Generate episode buttons for series
//   const generateEpisodeButtons = () => {
//     // Assume there are 10 episodes per season (you can adjust this logic)
//     const numberOfEpisodes = 10;
//     const episodeButtons = [];
//     for (let i = 1; i <= numberOfEpisodes; i++) {
//       episodeButtons.push(
//         <button
//           key={i}
//           className={`episode-button ${selectedEpisode === i ? 'selected' : ''}`}
//           onClick={() => setSelectedEpisode(i)}
//         >
//           Episode {i}
//         </button>
//       );
//     }
//     return episodeButtons;
//   };

//   return (
//     <div className="movie-details">
//       <h2>{movie.Title}</h2>
//       <p><strong>Year:</strong> {movie.Year}</p>
//       <p><strong>Rated:</strong> {movie.Rated}</p>
//       <p><strong>Released:</strong> {movie.Released}</p>
//       <p><strong>Runtime:</strong> {movie.Runtime}</p>
//       <p><strong>Genre:</strong> {movie.Genre}</p>
//       <p><strong>Director:</strong> {movie.Director}</p>
//       <p><strong>Writer:</strong> {movie.Writer}</p>
//       <p><strong>Actors:</strong> {movie.Actors}</p>
//       <p><strong>Plot:</strong> {movie.Plot}</p>
//       <p><strong>Language:</strong> {movie.Language}</p>
//       <p><strong>Country:</strong> {movie.Country}</p>
//       <p><strong>Awards:</strong> {movie.Awards}</p>

//       {/* Video Embed */}
//       <div className="video-container">
//         <iframe
//           src={iframeUrl}
//           frameBorder="0"
//           allowFullScreen
//           title={movie.Title}
//           className="video-player"
//         ></iframe>
//       </div>

//       {/* Display episode selector if the movie is a series */}
//       {movie.Type === "series" && (
//         <>
//           <div className="season-episode-selector">
//             <label htmlFor="season">Season:</label>
//             <select
//               id="season"
//               value={selectedSeason}
//               onChange={(e) => setSelectedSeason(Number(e.target.value))}
//             >
//               {Array.from({ length: parseInt(movie.totalSeasons) }, (_, index) => (
//                 <option key={index + 1} value={index + 1}>
//                   Season {index + 1}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Display episode buttons for the selected season */}
//           <div className="episode-buttons">
//             {generateEpisodeButtons()}
//           </div>
//         </>
//       )}

//       <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
//       <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
//       <p><strong>Production:</strong> {movie.Production}</p>
//     </div>
//   );
// };

// export default MovieDetails;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "95969af960b31cb5bde9e76e0a841cd4";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // TMDB image base URL

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the route parameters
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${API_URL}${id}?language=en-US&api_key=${API_KEY}`
        );

        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  // Extract only the required fields
  const {
    release_date,
    genres,
    runtime,
    production_companies,
    imdb_id,
    production_countries,
    poster_path,
  } = movie;

  return (
    <div className="movie-details-container">
      {/* Video at the top */}
      {imdb_id ? (
        <div className="video-container">
          <iframe
            src={`https://vidsrc.xyz/embed/movie?imdb=${imdb_id}`}
            title={`${movie.title || movie.name} Video`}
            allowFullScreen
          />
        </div>
      ) : (
        <p>No video available</p>
      )}

      {/* Movie Details */}
      <div className="details-container">
        {/* Poster */}
        {poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${poster_path}`}
            alt={`${movie.title || movie.name} Poster`}
            className="movie-poster"
          />
        ) : (
          <p>No poster available</p>
        )}

        {/* Text Details */}
        <div className="movie-info">
          <h2>{movie.title || movie.name}</h2>
          <p><strong>Release Date:</strong> {release_date || "N/A"}</p>
          <p>
            <strong>Genres:</strong>{" "}
            {genres && genres.length > 0
              ? genres.map((genre) => genre.name).join(", ")
              : "N/A"}
          </p>
          <p><strong>Runtime:</strong> {runtime ? `${runtime} minutes` : "N/A"}</p>
          <p>
            <strong>Origin Country:</strong>{" "}
            {production_countries && production_countries.length > 0
              ? production_countries.map((country) => country.name).join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Production:</strong>{" "}
            {production_companies && production_companies.length > 0
              ? production_companies.map((company) => company.name).join(", ")
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

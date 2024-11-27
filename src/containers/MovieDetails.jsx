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
import { useParams, useLocation } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import DetailsInfo from "./DetailsInfo";
import SeasonSelector from "./SeasonSelector";
import EpisodeSelector from "./EpisodeSelector";
import Recommendations from "../components/Recommendations"; // Import Recommendations component

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [details, setDetails] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const mediaType = location.pathname.includes("/tv/") ? "tv" : "movie";
        const response = await fetch(
          `${API_URL}${mediaType}/${id}?language=en-US&api_key=${API_KEY}`
        );

        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }

        const data = await response.json();
        const filteredSeasons = data.seasons?.filter(season => season.season_number !== 0) || [];
        setDetails({ ...data, seasons: filteredSeasons });
        if (mediaType === "tv" && filteredSeasons.length > 0) {
          setSelectedSeason(filteredSeasons[0].season_number);
        }
      } catch (error) {
        console.error("Failed to fetch details:", error);
      }
    };

    fetchDetails();
  }, [id, location.pathname]);

  if (!details) {
    return <div>Loading...</div>;
  }

  const handleSeasonChange = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
    setSelectedEpisode(1);
  };

  const handleEpisodeChange = (episodeNumber) => {
    setSelectedEpisode(episodeNumber);
  };

  return (
    <div className="details-container">
      <VideoPlayer 
        location={location} 
        id={id} 
        imdb_id={details.imdb_id}
        selectedSeason={selectedSeason}
        selectedEpisode={selectedEpisode}
      />
      {location.pathname.includes("/tv/") && (
        <div className="season-episode-selector">
          <SeasonSelector 
            seasons={details.seasons} 
            selectedSeason={selectedSeason} 
            handleSeasonChange={handleSeasonChange}
          />
          <EpisodeSelector
            selectedSeason={selectedSeason}
            selectedEpisode={selectedEpisode}
            handleEpisodeChange={handleEpisodeChange}
            seasons={details.seasons}
          />
        </div>
      )}
      <DetailsInfo details={details} />
      <Recommendations id={id} mediaType={location.pathname.includes("/tv/") ? "tv" : "movie"} /> {/* Include Recommendations component */}
    </div>
  );
};

export default MovieDetails;

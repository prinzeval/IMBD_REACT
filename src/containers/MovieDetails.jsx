// THIS IS src/containers/MovieDetails.jsx



import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import DetailsInfo from "./DetailsInfo";
import SeasonSelector from "./SeasonSelector";
import EpisodeSelector from "./EpisodeSelector";
import Recommendations from "../components/Recommendations";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

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
      <Recommendations id={id} mediaType={location.pathname.includes("/tv/") ? "tv" : "movie"} />
    </div>
  );
};

export default MovieDetails;

import React from "react";

const EpisodeSelector = ({ selectedSeason, selectedEpisode, handleEpisodeChange, seasons }) => {
  const season = seasons.find((season) => season.season_number === selectedSeason);
  const episodeCount = season ? season.episode_count : 0;

  return (
    <div className="episode-selector">
      <h3>Select Episode:</h3>
      {Array.from({ length: episodeCount }, (_, index) => index + 1).map((episodeNumber) => (
        <button
          key={episodeNumber}
          onClick={() => handleEpisodeChange(episodeNumber)}
          className={selectedEpisode === episodeNumber ? "active" : ""}
        >
          Episode {episodeNumber}
        </button>
      ))}
    </div>
  );
};

export default EpisodeSelector;

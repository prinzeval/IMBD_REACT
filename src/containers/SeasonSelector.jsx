import React from "react";

const SeasonSelector = ({ seasons, selectedSeason, handleSeasonChange }) => (
  <div className="season-selector">
    <h3>Select Season:</h3>
    {seasons.map((season) => (
      <button
        key={season.season_number}
        onClick={() => handleSeasonChange(season.season_number)}
        className={selectedSeason === season.season_number ? "active" : ""}
      >
        Season {season.season_number}
      </button>
    ))}
  </div>
);

export default SeasonSelector;

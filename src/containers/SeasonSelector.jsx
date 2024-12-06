import React from "react";

const SeasonSelector = ({ seasons, selectedSeason, handleSeasonChange }) => (
  <div className="season-selector">
    <h3>Select Season:</h3>
    <select
      value={selectedSeason}
      onChange={(e) => handleSeasonChange(Number(e.target.value))}
    >
      {seasons.map((season) => (
        <option key={season.season_number} value={season.season_number}>
          Season {season.season_number}
        </option>
      ))}
    </select>
  </div>
);

export default SeasonSelector;

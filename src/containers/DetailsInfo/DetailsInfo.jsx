import React from "react";
import "./DetailsInfo.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const DetailsInfo = ({ details }) => {
  const {
    release_date,
    first_air_date,
    genres,
    runtime,
    episode_run_time,
    production_companies,
    networks,
    production_countries,
    poster_path,
    overview,
  } = details;

  return (
    <div className="details-wrapper">
      {poster_path ? (
        <img
          src={`${IMAGE_BASE_URL}${poster_path}`}
          alt="Poster"
          className="details-poster"
        />
      ) : (
        <p>No poster available</p>
      )}
      <div className="details-info">
        <h2>{details.title || details.name}</h2>
        <p><strong>Release Date:</strong> {release_date || first_air_date || "N/A"}</p>
        <p>
          <strong>Genres:</strong>{" "}
          {genres && genres.length > 0
            ? genres.map((genre) => genre.name).join(", ")
            : "N/A"}
        </p>
        <p><strong>Runtime:</strong> {runtime ? `${runtime} minutes` : episode_run_time ? `${episode_run_time[0]} minutes` : "N/A"}</p>
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
            : networks && networks.length > 0
            ? networks.map((network) => network.name).join(", ")
            : "N/A"}
        </p>
        <p><strong>Overview:</strong> {overview || "N/A"}</p>
      </div>
    </div>
  );
};

export default DetailsInfo;
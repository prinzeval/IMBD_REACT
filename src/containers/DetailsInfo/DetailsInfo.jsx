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
    vote_average,
    vote_count,
  } = details;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRuntime = (runtime, episodeRuntime) => {
    if (runtime) return `${runtime} minutes`;
    if (episodeRuntime && episodeRuntime.length > 0) return `${episodeRuntime[0]} minutes`;
    return "N/A";
  };

  return (
    <div className="movie-hero-section">
      {/* Hero Backdrop */}
      <div className="movie-hero-backdrop">
        {details.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            alt={details.title || details.name}
            className="movie-hero-backdrop-image"
          />
        )}
        <div className="movie-hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="movie-hero-content">
        <div className="movie-hero-poster">
          {poster_path ? (
            <img
              src={`${IMAGE_BASE_URL}${poster_path}`}
              alt={details.title || details.name}
              className="movie-hero-poster-image"
            />
          ) : (
            <div className="movie-hero-no-poster">
              <span>No Image</span>
            </div>
          )}
        </div>

        <div className="movie-hero-info">
          <h1 className="movie-hero-title">{details.title || details.name}</h1>

          <div className="movie-hero-meta">
            <div className="movie-hero-rating">
              <span className="movie-rating-stars">★★★★★</span>
              <span className="movie-rating-value">{vote_average?.toFixed(1) || "N/A"}</span>
              <span className="movie-rating-total">/10</span>
              <span className="movie-rating-count">({vote_count} votes)</span>
            </div>

            <div className="movie-hero-tags">
              {genres && genres.slice(0, 3).map((genre, index) => (
                <span key={index} className="movie-genre-tag">{genre.name}</span>
              ))}
            </div>
          </div>

          <div className="movie-hero-details">
            <div className="movie-detail-row">
              <span className="movie-detail-label">Release Date:</span>
              <span className="movie-detail-value">{formatDate(release_date || first_air_date)}</span>
            </div>

            <div className="movie-detail-row">
              <span className="movie-detail-label">Runtime:</span>
              <span className="movie-detail-value">{formatRuntime(runtime, episode_run_time)}</span>
            </div>

            <div className="movie-detail-row">
              <span className="movie-detail-label">Country:</span>
              <span className="movie-detail-value">
                {production_countries && production_countries.length > 0
                  ? production_countries.map((country) => country.name).join(", ")
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="movie-hero-overview">
            <p>{overview || "No overview available."}</p>
          </div>

          <div className="movie-hero-actions">
            <button className="movie-hero-play-btn">
              <span>▶</span> Play
            </button>
            <button className="movie-hero-info-btn">
              <span>ⓘ</span> More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsInfo;
import React, { useState } from "react";
import "./MovieDetailsHero.css";

const MovieDetailsHero = ({ details }) => {
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [selectedServer, setSelectedServer] = useState("vidsrc");

    const handlePlayClick = () => {
        setShowVideoPlayer(true);
    };

    const handleMoreInfoClick = () => {
        setShowMoreInfo(true);
    };

    const closeVideoPlayer = () => {
        setShowVideoPlayer(false);
    };

    const closeMoreInfo = () => {
        setShowMoreInfo(false);
    };

    const getVideoSrc = () => {
        const mediaType = details.title ? 'movie' : 'tv';
        const id = details.id;
        const imdbId = details.imdb_id;

        switch (selectedServer) {
            case "vidsrc":
                return mediaType === 'movie'
                    ? `https://vidsrc.xyz/embed/movie?imdb=${imdbId}`
                    : `https://vidsrc.xyz/embed/tv?tmdb=${id}`;
            case "embed-su":
                return mediaType === 'movie'
                    ? `https://embed.su/embed/movie/${id}`
                    : `https://embed.su/embed/tv/${id}`;
            case "vidlink":
                return mediaType === 'movie'
                    ? `https://vidlink.pro/movie/${id}`
                    : `https://vidlink.pro/tv/${id}`;
            case "vidsrc-cc":
                return mediaType === 'movie'
                    ? `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=false`
                    : `https://vidsrc.cc/v2/embed/tv/${id}?autoPlay=false`;
            case "vidsrc-vip":
                return mediaType === 'movie'
                    ? `https://vidsrc.vip/embed/movie/${id}`
                    : `https://vidsrc.vip/embed/tv/${id}`;
            case "flicky-host":
                return mediaType === 'movie'
                    ? `https://www.flicky.host/embed/movie/?id=${id}`
                    : `https://www.flicky.host/embed/tv/?id=${id}`;
            case "smashy-stream":
                return mediaType === 'movie'
                    ? `https://player.smashy.stream/movie/${id}`
                    : `https://player.smashy.stream/tv/${id}`;
            default:
                return `https://vidsrc.xyz/embed/movie?imdb=${imdbId}`;
        }
    };
    return (
        <div className="movie-details-hero">
            {/* Hero Backdrop */}
            <div className="movie-details-backdrop">
                {details.backdrop_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
                        alt={details.title || details.name}
                        className="movie-details-bg"
                    />
                )}
                <div className="movie-details-overlay"></div>
            </div>

            {/* Hero Content */}
            <div className="movie-details-content">
                <div className="movie-details-info">
                    <h1 className="movie-details-title">{details.title || details.name}</h1>

                    <div className="movie-details-rating">
                        <span className="movie-rating-stars">★★★★★</span>
                        <span className="movie-rating-value">{details.vote_average?.toFixed(1) || "N/A"}</span>
                        <span className="movie-rating-total">/10</span>
                        <span className="movie-rating-count">({details.vote_count} votes)</span>
                    </div>

                    <div className="movie-details-genres">
                        {details.genres && details.genres.slice(0, 3).map((genre, index) => (
                            <span key={index} className="movie-genre-tag">{genre.name}</span>
                        ))}
                    </div>

                    <div className="movie-details-meta">
                        <div className="movie-meta-item">
                            <span className="movie-meta-label">Release Date:</span>
                            <span className="movie-meta-value">
                                {details.release_date || details.first_air_date ?
                                    new Date(details.release_date || details.first_air_date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : "N/A"}
                            </span>
                        </div>

                        <div className="movie-meta-item">
                            <span className="movie-meta-label">Runtime:</span>
                            <span className="movie-meta-value">
                                {details.runtime ? `${details.runtime} minutes` :
                                    details.episode_run_time ? `${details.episode_run_time[0]} minutes` : "N/A"}
                            </span>
                        </div>

                        <div className="movie-meta-item">
                            <span className="movie-meta-label">Country:</span>
                            <span className="movie-meta-value">
                                {details.production_countries && details.production_countries.length > 0
                                    ? details.production_countries.map((country) => country.name).join(", ")
                                    : "N/A"}
                            </span>
                        </div>
                    </div>

                    <div className="movie-details-synopsis">
                        <p>{details.overview || "No overview available."}</p>
                    </div>

                    <div className="movie-details-actions">
                        <button className="movie-play-button" onClick={handlePlayClick}>
                            <span>▶</span> Play
                        </button>
                        <button className="movie-info-button" onClick={handleMoreInfoClick}>
                            <span>ⓘ</span> More Info
                        </button>
                    </div>
                </div>
            </div>

            {/* Video Player Modal */}
            {showVideoPlayer && (
                <div className="video-player-modal">
                    <div className="video-player-content">
                        <button className="close-video-btn" onClick={closeVideoPlayer}>
                            ✕
                        </button>

                        {/* Server Selection */}
                        <div className="server-selection">
                            <h3>Choose Server</h3>
                            <div className="server-buttons">
                                <button
                                    className={`server-btn ${selectedServer === "vidsrc" ? "active" : ""}`}
                                    onClick={() => setSelectedServer("vidsrc")}
                                >
                                    Default Server
                                </button>
                                <button
                                    className={`server-btn ${selectedServer === "embed-su" ? "active" : ""}`}
                                    onClick={() => setSelectedServer("embed-su")}
                                >
                                    Server 1
                                </button>
                                <button
                                    className={`server-btn ${selectedServer === "vidlink" ? "active" : ""}`}
                                    onClick={() => setSelectedServer("vidlink")}
                                >
                                    Server 2
                                </button>
                                <button
                                    className={`server-btn ${selectedServer === "vidsrc-cc" ? "active" : ""}`}
                                    onClick={() => setSelectedServer("vidsrc-cc")}
                                >
                                    Server 3
                                </button>
                                <button
                                    className={`server-btn ${selectedServer === "vidsrc-vip" ? "active" : ""}`}
                                    onClick={() => setSelectedServer("vidsrc-vip")}
                                >
                                    Server 4
                                </button>
                                <button
                                    className={`server-btn ${selectedServer === "flicky-host" ? "active" : ""}`}
                                    onClick={() => setSelectedServer("flicky-host")}
                                >
                                    Server 5
                                </button>
                                <button
                                    className={`server-btn ${selectedServer === "smashy-stream" ? "active" : ""}`}
                                    onClick={() => setSelectedServer("smashy-stream")}
                                >
                                    Server 6
                                </button>
                            </div>
                        </div>

                        <div className="video-player-iframe">
                            <iframe
                                src={getVideoSrc()}
                                title={`${details.title || details.name} Player`}
                                frameBorder="0"
                                allowFullScreen
                                className="video-iframe"
                                key={selectedServer} // Force re-render when server changes
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* More Info Modal */}
            {showMoreInfo && (
                <div className="more-info-modal">
                    <div className="more-info-content">
                        <button className="close-info-btn" onClick={closeMoreInfo}>
                            ✕
                        </button>
                        <h2>{details.title || details.name}</h2>
                        <div className="additional-info">
                            <p><strong>Original Title:</strong> {details.original_title || details.original_name}</p>
                            <p><strong>Status:</strong> {details.status}</p>
                            <p><strong>Budget:</strong> {details.budget ? `$${details.budget.toLocaleString()}` : "N/A"}</p>
                            <p><strong>Revenue:</strong> {details.revenue ? `$${details.revenue.toLocaleString()}` : "N/A"}</p>
                            <p><strong>Languages:</strong> {details.spoken_languages?.map(lang => lang.name).join(", ") || "N/A"}</p>
                            <p><strong>Production Companies:</strong> {details.production_companies?.map(company => company.name).join(", ") || "N/A"}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetailsHero;

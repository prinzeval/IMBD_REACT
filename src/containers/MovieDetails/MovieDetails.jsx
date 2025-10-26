// THIS IS src/containers/MovieDetails.jsx



import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Recommendations from "../../components/Recommendations/Recommendations";
import MovieDetailsHero from "../../components/MovieDetailsHero/MovieDetailsHero";
import "./MovieDetails.css";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [details, setDetails] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false);
  const [selectedEpisodeServer, setSelectedEpisodeServer] = useState('vidplus');
  const [selectedServer, setSelectedServer] = useState('vidplus');
  const [defaultEpisode, setDefaultEpisode] = useState(null); // For auto-loading default episode
  const [muted, setMuted] = useState(false);

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

  // Fetch episodes for selected season
  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!details || !location.pathname.includes("/tv/") || !selectedSeason) return;

      try {
        setLoadingEpisodes(true);
        const response = await fetch(
          `${API_URL}tv/${id}/season/${selectedSeason}?language=en-US&api_key=${API_KEY}`
        );

        if (response.ok) {
          const data = await response.json();
          const episodesList = data.episodes || [];
          setEpisodes(episodesList);

          // Auto-select first episode if no episode is selected and this is the first season
          if (!selectedEpisode && episodesList.length > 0 && selectedSeason === 1) {
            setSelectedEpisode(episodesList[0]);
            setDefaultEpisode(episodesList[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      } finally {
        setLoadingEpisodes(false);
      }
    };

    fetchEpisodes();
  }, [id, selectedSeason, details, location.pathname, selectedEpisode]);

  if (!details) {
    return <div>Loading...</div>;
  }

  const isTVShow = location.pathname.includes("/tv/");
  const handleSeasonChange = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    setShowEpisodeModal(true);
  };

  const closeEpisodeModal = () => {
    setShowEpisodeModal(false);
    setSelectedEpisode(null);
  };

  // Episode server options - 6 working servers with VidPlus as default
  const episodeServers = [
    { id: 'vidplus', name: 'VidPlus', url: `https://player.vidplus.to/embed/tv/${id}/${selectedSeason}/{episode}?autoplay=true&poster=true&title=true&download=true&watchparty=false&chromecast=true&servericon=true&setting=true&pip=true&primarycolor=6C63FF&secondarycolor=9F9BFF&iconcolor=FFFFFF&logourl=https%3A%2F%2Fi.ibb.co%2F67wTJd9R%2Fpngimg-com-netflix-PNG11.png&font=Roboto&fontcolor=FFFFFF&fontsize=20&opacity=0.5&server=3` },
    { id: 'vidsrc', name: 'VidSrc', url: `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${selectedSeason}&episode={episode}` },
    { id: 'vidlink', name: 'VidLink', url: `https://vidlink.pro/tv/${id}/${selectedSeason}/{episode}` },
    { id: 'vidsrc-cc', name: 'VidSrc.cc', url: `https://vidsrc.cc/v2/embed/tv/${id}/${selectedSeason}/{episode}?autoPlay=false` },
    { id: 'vidsrc-vip', name: 'VidSrc.vip', url: `https://vidsrc.vip/embed/tv/${id}/${selectedSeason}/{episode}` },
    { id: 'smashy-stream', name: 'Smashy.stream', url: `https://player.smashy.stream/tv/${id}?s=${selectedSeason}&e={episode}` }
  ];

  const getEpisodeUrl = (serverId, episodeNumber) => {
    const server = episodeServers.find(s => s.id === serverId);
    if (!server) return '';
    return server.url.replace('{episode}', episodeNumber);
  };

  // Handle server change with mute control
  const handleServerChange = (serverId, isEpisode = false) => {
    if (isEpisode) {
      setSelectedEpisodeServer(serverId);
    } else {
      setSelectedServer(serverId);
    }

    // Auto-unmute for vidlink server
    if (serverId === 'vidlink') {
      setMuted(false);
    }
  };

  // Server options for movies/TV shows - 6 working servers with VidPlus as default
  const movieServers = [
    { id: 'vidplus', name: 'VidPlus', url: `https://player.vidplus.to/embed/movie/${id}?autoplay=true&poster=true&title=true&download=true&watchparty=false&chromecast=true&servericon=true&setting=true&pip=true&primarycolor=6C63FF&secondarycolor=9F9BFF&iconcolor=FFFFFF&logourl=https%3A%2F%2Fi.ibb.co%2F67wTJd9R%2Fpngimg-com-netflix-PNG11.png&font=Roboto&fontcolor=FFFFFF&fontsize=20&opacity=0.5&server=3` },
    { id: 'vidsrc', name: 'VidSrc', url: `https://vidsrc.xyz/embed/movie?imdb=${details?.imdb_id}` },
    { id: 'vidlink', name: 'VidLink', url: `https://vidlink.pro/movie/${id}` },
    { id: 'vidsrc-cc', name: 'VidSrc.cc', url: `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=false` },
    { id: 'vidsrc-vip', name: 'VidSrc.vip', url: `https://vidsrc.vip/embed/movie/${id}` },
    { id: 'smashy-stream', name: 'Smashy.stream', url: `https://player.smashy.stream/movie/${id}` }
  ];

  return (
    <div className="movie-details-page">

      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <span>Home</span> / <span>{isTVShow ? 'TV Show' : 'Movie'}</span> / <span>{details?.title || details?.name}</span>
      </div>

      {/* Video Player - Always Visible */}
      <div className="episode-player-section">
        {isTVShow ? (
          <>
            <div className="episode-player-header">
              <h3>
                {selectedEpisode ?
                  `${selectedEpisode.name} - Season ${selectedSeason} Episode ${selectedEpisode.episode_number}` :
                  `Loading Episode...`
                }
              </h3>
            </div>

            {/* Server Selection */}
            <div className="episode-server-selection">
              <h4>Choose Streaming Server:</h4>
              <div className="episode-server-buttons">
                {episodeServers.map((server) => (
                  <button
                    key={server.id}
                    className={`episode-server-btn ${selectedEpisodeServer === server.id ? 'active' : ''}`}
                    onClick={() => handleServerChange(server.id, true)}
                  >
                    {server.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Player */}
            <div className="episode-video-player">
              {selectedEpisode ? (
                <iframe
                  src={getEpisodeUrl(selectedEpisodeServer, selectedEpisode.episode_number)}
                  frameBorder="0"
                ></iframe>
              ) : (
                <div className="loading-player">
                  <p>Loading episode...</p>
                </div>
              )}
            </div>

            {/* Download Section */}
            <div className="download-container">
              <p>
                Series - Season {selectedSeason} Episode {selectedEpisode?.episode_number || 1} selected - Download now
              </p>
              <a href={`https://dl.vidsrc.vip/tv/${id}/${selectedSeason}/${selectedEpisode?.episode_number || 1}`} target="_blank" rel="noopener noreferrer">
                <button>Download</button>
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="episode-player-header">
              <h3>{details?.title || details?.name} - Movie</h3>
            </div>

            {/* Server Selection */}
            <div className="episode-server-selection">
              <h4>Choose Streaming Server:</h4>
              <div className="episode-server-buttons">
                {movieServers.map((server) => (
                  <button
                    key={server.id}
                    className={`episode-server-btn ${selectedServer === server.id ? 'active' : ''}`}
                    onClick={() => handleServerChange(server.id, false)}
                  >
                    {server.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Player */}
            <div className="episode-video-player">
              <iframe
                src={movieServers.find(s => s.id === selectedServer)?.url || ''}
                frameBorder="0"
              ></iframe>
            </div>

            {/* Download Section */}
            <div className="download-container">
              <p>
                Movie selected - Download now
              </p>
              <a href={`https://dl.vidsrc.vip/movie/${id}`} target="_blank" rel="noopener noreferrer">
                <button>Download</button>
              </a>
            </div>
          </>
        )}
      </div>

      {/* Seasons and Episodes Section - Only for TV Shows */}
      {isTVShow && details.seasons && details.seasons.length > 0 && (
        <div className="seasons-episodes-section">
          <div className="container">
            <h2 className="section-title">Seasons & Episodes</h2>

            {/* Season Selector */}
            <div className="season-selector">
              <h3>Select Season:</h3>
              <select
                className="season-dropdown"
                value={selectedSeason}
                onChange={(e) => handleSeasonChange(parseInt(e.target.value))}
              >
                {details.seasons.map((season) => (
                  <option key={season.season_number} value={season.season_number}>
                    Season {season.season_number}
                  </option>
                ))}
              </select>
            </div>

            {/* Episodes List */}
            <div className="episodes-section">
              <h3>Episodes - Season {selectedSeason}</h3>
              {loadingEpisodes ? (
                <div className="loading">Loading episodes...</div>
              ) : (
                <div className="episodes-buttons">
                  {episodes.map((episode) => (
                    <button
                      key={episode.id}
                      className={`episode-btn ${selectedEpisode?.episode_number === episode.episode_number ? 'active' : ''}`}
                      onClick={() => handleEpisodeClick(episode)}
                    >
                      Episode {episode.episode_number}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Movie/TV Details Section */}
      <div className="content-details-section">
        <div className="details-container">
          <div className="poster-section">
            <img
              src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
              alt={details?.title || details?.name}
              className="movie-poster"
            />
          </div>

          <div className="info-section">
            <h1 className="movie-title">{details?.title || details?.name}</h1>

            <div className="movie-meta">
              <button className="trailer-btn">🎬 Trailer</button>
              <span className="hd-tag">HD</span>
              <span className="imdb-rating">IMDB: {details?.vote_average?.toFixed(1) || 'N/A'}</span>
            </div>

            <div className="user-rating">
              <span>0.0 / 0 voted</span>
              <div className="rating-buttons">
                <button className="like-btn">👍</button>
                <button className="dislike-btn">👎</button>
              </div>
            </div>

            <div className="movie-info">
              <p><strong>Released:</strong> {details?.release_date || details?.first_air_date}</p>
              <p><strong>Genre:</strong> {details?.genres?.map(g => g.name).join(', ')}</p>
              <p><strong>Duration:</strong> {details?.runtime || details?.episode_run_time?.[0] || 'N/A'} min</p>
              <p><strong>Country:</strong> {details?.production_countries?.map(c => c.name).join(', ')}</p>
              <p><strong>Production:</strong> {details?.production_companies?.map(c => c.name).join(', ')}</p>
            </div>

            <div className="synopsis">
              <h3>Synopsis</h3>
              <p>{details?.overview}</p>
            </div>
          </div>
        </div>
      </div>



      {/* Recommendations Section */}
      <Recommendations id={id} mediaType={location.pathname.includes("/tv/") ? "tv" : "movie"} />
    </div>
  );
};

export default MovieDetails;

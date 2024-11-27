import React from "react";

const VideoPlayer = ({ location, id, imdb_id, selectedSeason, selectedEpisode }) => {
  if (location.pathname.includes("/tv/")) {
    return (
      <div className="video-container large">
        <iframe
          src={`https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${selectedSeason}&episode=${selectedEpisode}`}
          style={{ width: "100%", height: "500px" }}  // Increased height
          frameBorder="0"
          referrerPolicy="origin"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div className="video-container large">
      {imdb_id ? (
        <iframe
          src={`https://vidsrc.xyz/embed/movie?imdb=${imdb_id}`}
          title={`${id} Video`}
          style={{ width: "100%", height: "500px" }}  // Increased height
          allowFullScreen
        />
      ) : (
        <p>No video available</p>
      )}
    </div>
  );
};

export default VideoPlayer;

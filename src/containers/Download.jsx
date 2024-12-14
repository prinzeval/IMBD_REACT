import React from "react";

const Download = ({ location, id, selectedSeason, selectedEpisode }) => {
  const getDownloadLink = () => {
    if (location.pathname.includes("/tv/")) {
      return `https://dl.vidsrc.vip/tv/${id}/${selectedSeason}/${selectedEpisode}`;
    }
    return `https://dl.vidsrc.vip/movie/${id}`;
  };

  return (
    <div className="download-container">
      <p>
        {location.pathname.includes("/tv/")
          ? `Series - Season ${selectedSeason} Episode ${selectedEpisode} selected`
          : `Movie selected`} - Download now
      </p>
      <a href={getDownloadLink()} target="_blank" rel="noopener noreferrer">
        <button>Download</button>
      </a>
    </div>
  );
};

export default Download;

import React, { useState } from "react";
import Download from "./Download"; // Import the new Download component

const VideoPlayer = ({ location, id, imdb_id, selectedSeason, selectedEpisode }) => {
  const [source, setSource] = useState("vidsrc"); // Default source

  const getVideoSrc = () => {
    if (location.pathname.includes("/tv/")) {
      if (source === "vidsrc") {
        return `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${selectedSeason}&episode=${selectedEpisode}`;
      } else if (source === "embed-su") {
        return `https://embed.su/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`;
      } else if (source === "vidlink") {
        return `https://vidlink.pro/tv/${id}/${selectedSeason}/${selectedEpisode}`;
      } else if (source === "vidsrc-cc") {
        return `https://vidsrc.cc/v2/embed/tv/${id}/${selectedSeason}/${selectedEpisode}?autoPlay=false`;
      } else if (source === "vidsrc-vip") {
        return `https://vidsrc.vip/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`;
      } else if (source === "flicky-host") {
        return `https://www.flicky.host/embed/tv/?id=${id}/${selectedSeason}/${selectedEpisode}`;
      } else if (source === "smashy-stream") {
        return `https://player.smashy.stream/tv/${id}?s=${selectedSeason}&e=${selectedEpisode}`;
      }
    }
    if (source === "vidsrc") {
      return `https://vidsrc.xyz/embed/movie?imdb=${imdb_id}`;
    } else if (source === "embed-su") {
      return `https://embed.su/embed/movie/${id}`;
    } else if (source === "vidlink") {
      return `https://vidlink.pro/movie/${id}`;
    } else if (source === "vidsrc-cc") {
      return `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=false`;
    } else if (source === "vidsrc-vip") {
      return `https://vidsrc.vip/embed/movie/${id}`;
    } else if (source === "flicky-host") {
      return `https://www.flicky.host/embed/movie/?id=${id}`;
    } else if (source === "smashy-stream") {
      return `https://player.smashy.stream/movie/${id}`;
    }
  };

  return (
    <div className="video-container large">
      <iframe
        src={getVideoSrc()}
        style={{ width: "100%", height: "500px" }} // Increased height
        frameBorder="0"
        referrerPolicy="origin"
        allowFullScreen
      ></iframe>
      <div className="video-buttons">
        <button
          onClick={() => setSource("vidsrc")}
          className={source === "vidsrc" ? "active" : ""}
        >
          Default Server
        </button>
        <button
          onClick={() => setSource("embed-su")}
          className={source === "embed-su" ? "active" : ""}
        >
          Server 1
        </button>
        <button
          onClick={() => setSource("vidlink")}
          className={source === "vidlink" ? "active" : ""}
        >
          Server 2
        </button>
        <button
          onClick={() => setSource("vidsrc-cc")}
          className={source === "vidsrc-cc" ? "active" : ""}
        >
          Server 3
        </button>
        <button
          onClick={() => setSource("vidsrc-vip")}
          className={source === "vidsrc-vip" ? "active" : ""}
        >
          Server 4
        </button>
        <button
          onClick={() => setSource("flicky-host")}
          className={source === "flicky-host" ? "active" : ""}
        >
          Server 5
        </button>
        <button
          onClick={() => setSource("smashy-stream")}
          className={source === "smashy-stream" ? "active" : ""}
        >
          Server 6
        </button>
      </div>
      <Download 
        location={location} 
        id={id} 
        selectedSeason={selectedSeason} 
        selectedEpisode={selectedEpisode} 
      />
    </div>
  );
};

export default VideoPlayer;

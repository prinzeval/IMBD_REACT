// THIS IS src/components/Welcome.jsx


import React from "react";
// import "./Welcome.css"; // Make sure to create and import this CSS file

const Welcome = () => {
  return (
    <div className="welcome">
      <h1>Welcome To Mytvv Free Movies, Home To Paradise!</h1>
      <h2>Movies Organized Using IMDb Details, Top Trending Movies, and Shows</h2>
      <ul>
        <li>🎬 No Ads</li>
        <li>⚡ Free and Fast Streaming Server</li>
        <li>🆓 No Account Required to Watch</li>
        <li>🎉 One-Click Streaming</li>
        <li>📥 Movie Downloads</li>
        <li>📚 Huge Library with Over 400,000 Videos</li>
      </ul>
      <p>Search for your favorite movies and TV shows. Desktop view is available with extra features, and mobile view is tailored with a nice taste! ☺️</p>
    </div>
  );
};

export default Welcome;

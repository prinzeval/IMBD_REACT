import React from "react";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="welcome-content">
        <h1>Welcome to MYTVV.NET</h1>
        <h2>Your Home for Free Movies and Shows</h2>
        <p>Unlimited streaming of movies and TV shows with no ads.</p>
        <div className="features">
          <div className="feature">
            <h3>Ad-Free</h3>
          </div>
          <div className="feature">
            <h3>Instant Access</h3>
          </div>
          <div className="feature">
            <h3>Fast Streaming</h3>
          </div>
          <div className="feature">
            <h3>Huge Library</h3>
          </div>
          <div className="feature">
            <h3>Downloadable Content</h3>
          </div>
        </div>
        <p className="footer-text">
          Discover a tailored viewing experience on both desktop and mobile.
        </p>
      </div>
    </div>
  );
};

export default Welcome;

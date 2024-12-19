import React, { useEffect } from "react";
// import "./Welcome.css"; // Uncomment and make sure to create this CSS file if needed

const Welcome = () => {
  useEffect(() => {
    // Create a script element for the popunder ad
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//pl25321094.profitablecpmrate.com/5c/85/f2/5c85f28f1156b8d6b1c2153d6d8bb74e.js";
    script.async = true;

    

    // Append the script to the document body
    document.body.appendChild(script);

    // Clean up: Remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
      <p>
        Search for your favorite movies and TV shows. Desktop view is available
        with extra features, and mobile view is tailored with a nice taste! ☺️
      </p>
    </div>
  );
};

export default Welcome;

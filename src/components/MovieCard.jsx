// import React from 'react';
// import { Link } from 'react-router-dom';

// const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
//   const iframeUrl = Type === 'movie' 
//     ? `https://vidsrc.xyz/embed/movie?imdb=${imdbID}`
//     : `https://vidsrc.xyz/embed/tv?imdb=${imdbID}&season=1&episode=1`;

//   return (
//     <Link to={`/movie/${imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//       <div className="movie" key={imdbID}>
//         <div>
//           <p>{Year}</p>
//         </div>
//         <div>
//           <img src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} alt={Title} />
//         </div>
//         <div>
//           <span>{Type}</span>
//           <h3>{Title}</h3>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default MovieCard;
import React from "react";

const MovieCard = ({ movie }) => {
  const { id, release_date, poster_path, title, name, media_type } = movie;
  const displayTitle = title || name;

  return (
    <div className="movie" key={id}>
      <div>
        <p>{release_date}</p>
      </div>

      <div>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/400"
          }
          alt={displayTitle}
        />
      </div>

      <div>
        <h3>{displayTitle}</h3>
        <p>Type: {media_type}</p>
      </div>
    </div>
  );
};

export default MovieCard;

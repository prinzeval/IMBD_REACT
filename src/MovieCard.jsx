// import React from 'react'

// const MovieCard = ({ movie }) => {
//     return (
//         <div className='container'>
//             <div className='movie'>
//                 <div>
//                     <p>{movie.Year}</p>
//                 </div>

//                 <div>
//                     <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt='movie.Title' />
//                 </div>
//                 <div>
//                     <span>{movie.Type}</span>
//                     <h3>{movie.imdbID}</h3>
//                 </div>
//             </div>
//         </div>
//     );

// };

// export default MovieCard;


import React from 'react';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  return (
    <div className="movie" key={imdbID}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} alt={Title} />
      </div>

      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
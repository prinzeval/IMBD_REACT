// import React, { useState } from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import FeaturedContent from "./components/FeaturedContent";
// import MovieList from "./components/MovieList";
// import "./App.css";

// const App = () => {
//   const [isActive, setIsActive] = useState(false);

//   const toggleActive = () => {
//     setIsActive(!isActive);
//   };

//   const movieData = [
//     { id: 1, title: "Movie 1", image: "https://f.woowoowoowoo.net/resize/250x400/93/02/930252333380d1876be10fe6d4963412/930252333380d1876be10fe6d4963412.jpg" },
//     { id: 2, title: "Movie 2", image: "https://f.woowoowoowoo.net/resize/250x400/93/02/930252333380d1876be10fe6d4963412/930252333380d1876be10fe6d4963412.jpg" },
//   ];

//   return (
//     <div className={`app ${isActive ? "active" : ""}`}>
//       <Navbar toggleActive={toggleActive} />
//       <Sidebar />
//       <div className="container">
//         <FeaturedContent
//           background="https://f.woowoowoowoo.net/resize/250x400/93/02/930252333380d1876be10fe6d4963412/930252333380d1876be10fe6d4963412.jpg"
//           titleSrc="https://via.placeholder.com/200x50"
//           description="This is a sample featured content description."
//         />
//         <MovieList title="SAMPLE MOVIE LIST" movies={movieData} />
//       </div>
//     </div>
//   );
// };

// export default App;










// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MovieCard from "./MovieCard";
// import MovieDetails from "./MovieDetails"; // Import MovieDetails page
// import SearchIcon from "./search.svg";
// import "./App.css";

// const API_URL = "http://www.omdbapi.com?apikey=b6003d8a"; // API key for movie search
// const App = () => {
//   const [searchTerm, setSearchTerm] = useState(""); // Store search term
//   const [movies, setMovies] = useState([]); // Store search results

//   useEffect(() => {
//     searchMovies("Batman"); // Default search term on load
//   }, []);

//   const searchMovies = async (title) => {
//     const response = await fetch(`${API_URL}&s=${title}`); // Fetch search results from OMDB API
//     const data = await response.json();
//     setMovies(data.Search); // Set movie results to state
//   };

//   return (
//     <Router>
//       <div className="app">
//         <h1>MovieLand</h1>

//         <div className="search">
//           <input
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search for movies"
//           />
//           <img
//             src={SearchIcon}
//             alt="search"
//             onClick={() => searchMovies(searchTerm)} // Trigger search
//           />
//         </div>

//         <Routes>
//           {/* Home Route */}
//           <Route
//             path="/"
//             element={
//               <>
//                 {movies?.length > 0 ? (
//                   <div className="container">
//                     {movies.map((movie) => (
//                       <MovieCard key={movie.imdbID} movie={movie} />
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="empty">
//                     <h2>No movies found</h2>
//                   </div>
//                 )}
//               </>
//             }
//           />
//           {/* Movie Details Route */}
//           <Route path="/movie/:id" element={<MovieDetails />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;




import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "95969af960b31cb5bde9e76e0a841cd4";

const App = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Store search term
  const [movies, setMovies] = useState([]); // Store search results
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total pages available

  useEffect(() => {
    searchMovies("Batman"); // Default search term on load
  }, []);

  const searchMovies = async (title, page = 1) => {
    const response = await fetch(
      `${API_URL}search/multi?query=${title}&include_adult=false&language=en-US&page=${page}&api_key=${API_KEY}`
    );
    const data = await response.json();
    setMovies(data.results);
    setCurrentPage(page);
    setTotalPages(data.total_pages || 1);
  };

  const handlePageChange = (direction) => {
    const newPage = currentPage + direction;
    if (newPage > 0 && newPage <= totalPages) {
      searchMovies(searchTerm || "Batman", newPage);
    }
  };

  return (
    <Router>
      <div className="app">
        <h1>MovieLand</h1>

        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies"
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)} // Trigger search
          />
        </div>

        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                {movies?.length > 0 ? (
                  <>
                    <div className="container">
                      {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="pagination">
                      <button
                        onClick={() => handlePageChange(-1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <span>
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty">
                    <h2>No movies found</h2>
                  </div>
                )}
              </>
            }
          />
          {/* Movie Details Route */}
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

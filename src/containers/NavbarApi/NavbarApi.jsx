import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NavbarApi.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Use the API key from .env
const API_URL = "https://api.themoviedb.org/3";

const NavbarApi = ({ children }) => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTVGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Movie Genres
  const fetchMovieGenres = async () => {
    try {
      const response = await axios.get(`${API_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
          language: "en",
        },
      });
      setMovieGenres(response.data.genres);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch TV Genres
  const fetchTVGenres = async () => {
    try {
      const response = await axios.get(`${API_URL}/genre/tv/list`, {
        params: {
          api_key: API_KEY,
          language: "en",
        },
      });
      setTVGenres(response.data.genres);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch Countries
  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${API_URL}/configuration/countries`, {
        params: {
          api_key: API_KEY,
        },
      });
      setCountries(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      await fetchMovieGenres();
      await fetchTVGenres();
      await fetchCountries();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pass data to children (Navbar)
  return React.cloneElement(children, {
    movieGenres,
    tvGenres,
    countries,
  });
};

export default NavbarApi;
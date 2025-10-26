// TMDB API Service Functions
// Complete implementation of all documented endpoints

// API Configuration
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTk2OWFmOTYwYjMxY2I1YmRlOWU3NmUwYTg0MWNkNCIsIm5iZiI6MTczMjQ1MTQ3OC42NDcsInN1YiI6IjY3NDMxYzk2NjM3MGVjYWQzZmZmZmMyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9o5xq2YQRy5lOsX2ZChzQTvI_poKSSQ4hNVnwnlo390';
const BASE_URL = 'https://api.themoviedb.org/3';

// Common headers for all requests
const getHeaders = () => ({
  'accept': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
});

// Generic fetch function with error handling
const fetchFromTMDB = async (endpoint, params = {}) => {
  const queryParams = new URLSearchParams(params);
  const url = `${BASE_URL}${endpoint}?${queryParams}`;
  
  const options = {
    method: 'GET',
    headers: getHeaders()
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

// 1. Trending All - GET /trending/all/{time_window}
export const fetchTrendingAll = async (timeWindow = 'day', language = 'en-US', page = 1) => {
  return await fetchFromTMDB(`/trending/all/${timeWindow}`, { language, page });
};

// 2. Popular Movies - GET /movie/popular
export const fetchPopularMovies = async (page = 1, language = 'en-US', region = 'US') => {
  const params = { language, page, region };
  return await fetchFromTMDB('/movie/popular', params);
};

// 3. Popular TV - GET /tv/popular
export const fetchPopularTV = async (page = 1, language = 'en-US') => {
  return await fetchFromTMDB('/tv/popular', { language, page });
};

// 4. Now Playing Movies - GET /movie/now_playing
export const fetchNowPlayingMovies = async (page = 1, language = 'en-US', region = 'US') => {
  const params = { language, page, region };
  return await fetchFromTMDB('/movie/now_playing', params);
};

// 5. Movie Genres - GET /genre/movie/list
export const fetchMovieGenres = async (language = 'en') => {
  return await fetchFromTMDB('/genre/movie/list', { language });
};

// 6. TV Genres - GET /genre/tv/list
export const fetchTVGenres = async (language = 'en') => {
  return await fetchFromTMDB('/genre/tv/list', { language });
};

// Advanced Discover API functions with country filtering
export const discoverMovies = async (filters = {}) => {
  const {
    page = 1,
    language = 'en-US',
    region = 'US',
    sort_by = 'popularity.desc',
    with_origin_country = null,
    with_genres = null,
    primary_release_year = null,
    vote_average_gte = null,
    vote_count_gte = null,
    with_runtime_gte = null,
    with_runtime_lte = null,
    include_adult = false,
    include_video = false
  } = filters;

  const params = {
    page,
    language,
    region,
    sort_by,
    include_adult,
    include_video
  };

  // Add optional filters
  if (with_origin_country) params.with_origin_country = with_origin_country;
  if (with_genres) params.with_genres = with_genres;
  if (primary_release_year) params.primary_release_year = primary_release_year;
  if (vote_average_gte) params['vote_average.gte'] = vote_average_gte;
  if (vote_count_gte) params['vote_count.gte'] = vote_count_gte;
  if (with_runtime_gte) params['with_runtime.gte'] = with_runtime_gte;
  if (with_runtime_lte) params['with_runtime.lte'] = with_runtime_lte;

  return await fetchFromTMDB('/discover/movie', params);
};

export const discoverTV = async (filters = {}) => {
  const {
    page = 1,
    language = 'en-US',
    region = 'US',
    sort_by = 'popularity.desc',
    with_origin_country = null,
    with_genres = null,
    first_air_date_year = null,
    vote_average_gte = null,
    vote_count_gte = null,
    with_runtime_gte = null,
    with_runtime_lte = null,
    include_adult = false,
    include_null_first_air_dates = false
  } = filters;

  const params = {
    page,
    language,
    region,
    sort_by,
    include_adult,
    include_null_first_air_dates
  };

  // Add optional filters
  if (with_origin_country) params.with_origin_country = with_origin_country;
  if (with_genres) params.with_genres = with_genres;
  if (first_air_date_year) params.first_air_date_year = first_air_date_year;
  if (vote_average_gte) params['vote_average.gte'] = vote_average_gte;
  if (vote_count_gte) params['vote_count.gte'] = vote_count_gte;
  if (with_runtime_gte) params['with_runtime.gte'] = with_runtime_gte;
  if (with_runtime_lte) params['with_runtime.lte'] = with_runtime_lte;

  return await fetchFromTMDB('/discover/tv', params);
};

// Country-specific content functions using Discover API
export const fetchMoviesByCountry = async (countryCode, page = 1, language = 'en-US') => {
  return await discoverMovies({
    page,
    language,
    region: countryCode,
    with_origin_country: countryCode,
    sort_by: 'popularity.desc',
    vote_count_gte: 10
  });
};

export const fetchTVByCountry = async (countryCode, page = 1, language = 'en-US') => {
  return await discoverTV({
    page,
    language,
    region: countryCode,
    with_origin_country: countryCode,
    sort_by: 'popularity.desc',
    vote_count_gte: 5
  });
};

// Latest movies from country (released in current year)
export const fetchLatestMoviesByCountry = async (countryCode, page = 1, language = 'en-US') => {
  const currentYear = new Date().getFullYear();
  
  return await discoverMovies({
    page,
    language,
    region: countryCode,
    with_origin_country: countryCode,
    primary_release_year: currentYear,
    sort_by: 'release_date.desc',
    vote_count_gte: 10,
    vote_average_gte: 4.0
  });
};

// Now playing movies in country (theatrical releases)
export const fetchNowPlayingByCountry = async (countryCode, page = 1, language = 'en-US') => {
  return await discoverMovies({
    page,
    language,
    region: countryCode,
    with_origin_country: countryCode,
    sort_by: 'popularity.desc',
    vote_count_gte: 50,
    vote_average_gte: 5.0,
    primary_release_year: new Date().getFullYear()
  });
};

// Additional utility functions for navbar content
export const fetchContentByGenre = async (mediaType, genreId, page = 1, language = 'en-US') => {
  const params = {
    language,
    page,
    with_genres: genreId,
    sort_by: 'popularity.desc'
  };
  return await fetchFromTMDB(`/discover/${mediaType}`, params);
};

// Get content for specific navbar sections
export const getNavbarContent = async () => {
  try {
    const [
      trendingToday,
      trendingWeek,
      popularMovies,
      popularTV,
      nowPlaying,
      movieGenres,
      tvGenres
    ] = await Promise.all([
      fetchTrendingAll('day'),
      fetchTrendingAll('week'),
      fetchPopularMovies(1, 'en-US', 'US'),
      fetchPopularTV(),
      fetchNowPlayingMovies(1, 'en-US', 'US'),
      fetchMovieGenres(),
      fetchTVGenres()
    ]);

    return {
      trending: {
        today: trendingToday,
        week: trendingWeek
      },
      movies: {
        popular: popularMovies,
        nowPlaying: nowPlaying
      },
      tv: {
        popular: popularTV
      },
      genres: {
        movies: movieGenres,
        tv: tvGenres
      }
    };
  } catch (error) {
    console.error('Error fetching navbar content:', error);
    throw error;
  }
};

export default {
  fetchTrendingAll,
  fetchPopularMovies,
  fetchPopularTV,
  fetchNowPlayingMovies,
  fetchMovieGenres,
  fetchTVGenres,
  fetchContentByGenre,
  getNavbarContent
};

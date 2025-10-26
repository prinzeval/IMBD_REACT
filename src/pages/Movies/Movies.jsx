import React, { useState, useEffect } from 'react';
import { fetchMoviesByCountry, fetchNowPlayingByCountry } from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useCountry } from '../../contexts/CountryContext';
import './Movies.css';

const Movies = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popularPage, setPopularPage] = useState(1);
    const [nowPlayingPage, setNowPlayingPage] = useState(1);
    const [popularTotalPages, setPopularTotalPages] = useState(1);
    const [nowPlayingTotalPages, setNowPlayingTotalPages] = useState(1);
    const { selectedCountry } = useCountry();

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true);
                setError(null);

                const [popular, nowPlaying] = await Promise.all([
                    fetchMoviesByCountry(selectedCountry, 1, 'en-US'),
                    fetchNowPlayingByCountry(selectedCountry, 1, 'en-US')
                ]);

                setPopularMovies(popular.results || []);
                setNowPlayingMovies(nowPlaying.results || []);
                setPopularTotalPages(popular.total_pages || 1);
                setNowPlayingTotalPages(nowPlaying.total_pages || 1);
            } catch (err) {
                setError('Failed to load movies');
                console.error('Error loading movies:', err);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [selectedCountry]);

    const loadPopularPage = async (page) => {
        try {
            setLoading(true);
            const data = await fetchMoviesByCountry(selectedCountry, page, 'en-US');
            setPopularMovies(data.results || []);
            setPopularPage(page);
        } catch (err) {
            console.error('Error loading popular movies page:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadNowPlayingPage = async (page) => {
        try {
            setLoading(true);
            const data = await fetchNowPlayingByCountry(selectedCountry, page, 'en-US');
            setNowPlayingMovies(data.results || []);
            setNowPlayingPage(page);
        } catch (err) {
            console.error('Error loading now playing movies page:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="movies-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading movies...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="movies-page">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="movies-page">
            <div className="movies-header">
                <h1>Movies</h1>
                <p>Discover the latest and greatest movies</p>
            </div>

            <div className="movies-content">
                {/* Popular Movies Section */}
                <section className="movies-section">
                    <h2>Popular Movies</h2>
                    <div className="movies-grid">
                        {popularMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                    <div className="pagination-container">
                        <div className="pagination">
                            <button
                                onClick={() => loadPopularPage(popularPage - 1)}
                                disabled={popularPage === 1}
                                className="pagination-btn prev"
                            >
                                ← Previous
                            </button>

                            <div className="pagination-numbers">
                                {Array.from({ length: Math.min(5, popularTotalPages) }, (_, i) => {
                                    const startPage = Math.max(1, popularPage - 2);
                                    const pageNum = startPage + i;
                                    if (pageNum > popularTotalPages) return null;

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => loadPopularPage(pageNum)}
                                            className={`pagination-btn ${pageNum === popularPage ? 'active' : ''}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => loadPopularPage(popularPage + 1)}
                                disabled={popularPage === popularTotalPages}
                                className="pagination-btn next"
                            >
                                Next →
                            </button>
                        </div>
                        <div className="pagination-info">
                            Page {popularPage} of {popularTotalPages}
                        </div>
                    </div>
                </section>

                {/* Now Playing Section */}
                <section className="movies-section">
                    <h2>Now Playing in Theaters</h2>
                    <div className="movies-grid">
                        {nowPlayingMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                    <div className="pagination-container">
                        <div className="pagination">
                            <button
                                onClick={() => loadNowPlayingPage(nowPlayingPage - 1)}
                                disabled={nowPlayingPage === 1}
                                className="pagination-btn prev"
                            >
                                ← Previous
                            </button>

                            <div className="pagination-numbers">
                                {Array.from({ length: Math.min(5, nowPlayingTotalPages) }, (_, i) => {
                                    const startPage = Math.max(1, nowPlayingPage - 2);
                                    const pageNum = startPage + i;
                                    if (pageNum > nowPlayingTotalPages) return null;

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => loadNowPlayingPage(pageNum)}
                                            className={`pagination-btn ${pageNum === nowPlayingPage ? 'active' : ''}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => loadNowPlayingPage(nowPlayingPage + 1)}
                                disabled={nowPlayingPage === nowPlayingTotalPages}
                                className="pagination-btn next"
                            >
                                Next →
                            </button>
                        </div>
                        <div className="pagination-info">
                            Page {nowPlayingPage} of {nowPlayingTotalPages}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Movies;

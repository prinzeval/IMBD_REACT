import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovieGenres, fetchTVGenres } from '../../services/tmdbApi';
import './Genres.css';

const Genres = () => {
    const [movieGenres, setMovieGenres] = useState(null);
    const [tvGenres, setTVGenres] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                setLoading(true);
                setError(null);

                const [movies, tv] = await Promise.all([
                    fetchMovieGenres(),
                    fetchTVGenres()
                ]);

                setMovieGenres(movies);
                setTVGenres(tv);
            } catch (err) {
                setError('Failed to load genres');
                console.error('Error loading genres:', err);
            } finally {
                setLoading(false);
            }
        };

        loadGenres();
    }, []);

    if (loading) {
        return (
            <div className="genres-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading genres...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="genres-page">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="genres-page">
            <div className="genres-header">
                <h1>Genres</h1>
                <p>Browse content by category</p>
            </div>

            <div className="genres-content">
                {/* Movie Genres Section */}
                <section className="genres-section">
                    <h2>Movie Genres</h2>
                    <div className="genres-grid">
                        {movieGenres?.genres?.map((genre) => (
                            <Link
                                key={genre.id}
                                to={`/genre/movie/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                                className="genre-card"
                            >
                                <div className="genre-icon">🎬</div>
                                <h3>{genre.name}</h3>
                                <p>Movies</p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* TV Genres Section */}
                <section className="genres-section">
                    <h2>TV Show Genres</h2>
                    <div className="genres-grid">
                        {tvGenres?.genres?.map((genre) => (
                            <Link
                                key={genre.id}
                                to={`/genre/tv/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                                className="genre-card"
                            >
                                <div className="genre-icon">📺</div>
                                <h3>{genre.name}</h3>
                                <p>TV Shows</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Genres;

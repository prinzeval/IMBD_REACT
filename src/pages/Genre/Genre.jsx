import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { discoverMovies, discoverTV, fetchMovieGenres, fetchTVGenres } from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Genre.css';

const Genre = () => {
    const { mediaType, genreId } = useParams();
    const [content, setContent] = useState([]);
    const [genreName, setGenreName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadGenreContent = async () => {
            try {
                setLoading(true);
                setError(null);

                // Get genre name
                const genres = mediaType === 'movie' ?
                    await fetchMovieGenres() :
                    await fetchTVGenres();

                const genre = genres.genres.find(g => g.id === parseInt(genreId));
                setGenreName(genre ? genre.name : 'Unknown Genre');

                // Fetch content
                const filters = {
                    page: 1,
                    language: 'en-US',
                    with_genres: parseInt(genreId),
                    sort_by: 'popularity.desc',
                    vote_count_gte: 10
                };

                const data = mediaType === 'movie' ?
                    await discoverMovies(filters) :
                    await discoverTV(filters);

                setContent(data.results || []);
                setTotalPages(data.total_pages || 1);
                setPage(1);
            } catch (err) {
                setError('Failed to load genre content');
                console.error('Error loading genre content:', err);
            } finally {
                setLoading(false);
            }
        };

        if (genreId) {
            loadGenreContent();
        }
    }, [mediaType, genreId]);

    const loadPage = async (pageNum) => {
        try {
            setLoading(true);
            const filters = {
                page: pageNum,
                language: 'en-US',
                with_genres: parseInt(genreId),
                sort_by: 'popularity.desc',
                vote_count_gte: 10
            };

            const data = mediaType === 'movie' ?
                await discoverMovies(filters) :
                await discoverTV(filters);

            setContent(data.results || []);
            setPage(pageNum);
            setTotalPages(data.total_pages || 1);
        } catch (err) {
            console.error('Error loading page:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="genre-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading {genreName} content...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="genre-page">
                <div className="error-container">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="genre-page">
            <div className="genre-hero">
                <div className="hero-backdrop"></div>
                <div className="hero-content">
                    <h1 className="genre-hero-title">{genreName} {mediaType === 'movie' ? 'Movies' : 'TV Shows'}</h1>
                    <p className="genre-hero-description">
                        Discover the best {genreName.toLowerCase()} {mediaType === 'movie' ? 'movies' : 'TV shows'}
                        with high ratings and popularity.
                    </p>
                </div>
            </div>

            <div className="genre-content-area">
                <div className="content-section">
                    <section className="content-section-main">
                        <h2>All {genreName} {mediaType === 'movie' ? 'Movies' : 'TV Shows'}</h2>
                        <div className="content-grid">
                            {content.map((item) => (
                                <MovieCard
                                    key={item.id}
                                    movie={{ ...item, media_type: mediaType }}
                                />
                            ))}
                        </div>

                        <div className="pagination-container">
                            <div className="pagination">
                                <button
                                    onClick={() => loadPage(page - 1)}
                                    disabled={page === 1}
                                    className="pagination-btn prev"
                                >
                                    ← Previous
                                </button>

                                <div className="pagination-numbers">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const startPage = Math.max(1, page - 2);
                                        const pageNum = startPage + i;
                                        if (pageNum > totalPages) return null;

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => loadPage(pageNum)}
                                                className={`pagination-btn ${pageNum === page ? 'active' : ''}`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => loadPage(page + 1)}
                                    disabled={page === totalPages}
                                    className="pagination-btn next"
                                >
                                    Next →
                                </button>
                            </div>
                            <div className="pagination-info">
                                Page {page} of {totalPages}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Genre;

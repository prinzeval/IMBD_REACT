import React, { useState, useEffect } from 'react';
import { fetchPopularTV } from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import './TVShows.css';

const TVShows = () => {
    const [popularTV, setPopularTV] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadTVShows = async () => {
            try {
                setLoading(true);
                setError(null);

                const popular = await fetchPopularTV(1);
                setPopularTV(popular.results || []);
                setTotalPages(popular.total_pages || 1);
            } catch (err) {
                setError('Failed to load TV shows');
                console.error('Error loading TV shows:', err);
            } finally {
                setLoading(false);
            }
        };

        loadTVShows();
    }, []);

    const loadTVPage = async (pageNum) => {
        try {
            setLoading(true);
            const data = await fetchPopularTV(pageNum);
            setPopularTV(data.results || []);
            setPage(pageNum);
        } catch (err) {
            console.error('Error loading TV shows page:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="tv-shows-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading TV shows...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="tv-shows-page">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="tv-shows-page">
            <div className="tv-shows-header">
                <h1>TV Shows</h1>
                <p>Discover the best TV series and shows</p>
            </div>

            <div className="tv-shows-content">
                {/* Popular TV Shows Section */}
                <section className="tv-shows-section">
                    <h2>Popular TV Shows</h2>
                    <div className="tv-shows-grid">
                        {popularTV.map((show) => (
                            <MovieCard key={show.id} movie={{ ...show, media_type: 'tv' }} />
                        ))}
                    </div>
                    <div className="pagination-container">
                        <div className="pagination">
                            <button
                                onClick={() => loadTVPage(page - 1)}
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
                                            onClick={() => loadTVPage(pageNum)}
                                            className={`pagination-btn ${pageNum === page ? 'active' : ''}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => loadTVPage(page + 1)}
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
    );
};

export default TVShows;

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchContentByGenre } from '../../services/tmdbApi';
import MovieCard from '../MovieCard/MovieCard';
import './GenrePage.css';

const GenrePage = () => {
    const { mediaType, genreId } = useParams();
    const [searchParams] = useSearchParams();
    const genreName = searchParams.get('name') || 'Genre';

    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const loadGenreContent = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchContentByGenre(mediaType, genreId, page);
                setContent(data);
            } catch (err) {
                setError('Failed to load content');
                console.error('Error loading genre content:', err);
            } finally {
                setLoading(false);
            }
        };

        loadGenreContent();
    }, [mediaType, genreId, page]);

    if (loading) {
        return (
            <div className="genre-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading {genreName} content...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="genre-page">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="genre-page">
            <div className="genre-header">
                <h1>{genreName} {mediaType === 'movie' ? 'Movies' : 'TV Shows'}</h1>
                <p>{content?.total_results || 0} results found</p>
            </div>

            <div className="genre-content">
                <div className="content-grid">
                    {content?.results?.map((item) => (
                        <MovieCard
                            key={item.id}
                            movie={item}
                            mediaType={mediaType}
                        />
                    ))}
                </div>

                {content?.total_pages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={() => setPage(prev => Math.max(1, prev - 1))}
                            disabled={page === 1}
                            className="pagination-btn"
                        >
                            Previous
                        </button>
                        <span className="page-info">
                            Page {page} of {content.total_pages}
                        </span>
                        <button
                            onClick={() => setPage(prev => Math.min(content.total_pages, prev + 1))}
                            disabled={page === content.total_pages}
                            className="pagination-btn"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenrePage;

import React, { useState, useEffect } from 'react';
import { fetchMovieGenres, fetchTVGenres } from '../../services/tmdbApi';
import './GenreDropdown.css';

const GenreDropdown = ({ onGenreSelect, selectedGenre, mediaType }) => {
    const [movieGenres, setMovieGenres] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                setLoading(true);
                const [movies, tv] = await Promise.all([
                    fetchMovieGenres(),
                    fetchTVGenres()
                ]);
                setMovieGenres(movies.genres || []);
                setTvGenres(tv.genres || []);
            } catch (err) {
                console.error('Error loading genres:', err);
            } finally {
                setLoading(false);
            }
        };

        loadGenres();
    }, []);

    const getCurrentGenres = () => {
        return mediaType === 'tv' ? tvGenres : movieGenres;
    };

    const getSelectedGenreName = () => {
        if (!selectedGenre) return 'All Genres';
        const genres = getCurrentGenres();
        const genre = genres.find(g => g.id === selectedGenre);
        return genre ? genre.name : 'All Genres';
    };

    const handleGenreClick = (genreId) => {
        onGenreSelect(genreId);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    if (loading) {
        return (
            <div className="genre-dropdown-container">
                <div className="genre-selector loading">
                    <span>Loading Genres...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="genre-dropdown-container">
            <button
                className="genre-selector"
                onClick={toggleDropdown}
            >
                <span className="genre-name">{getSelectedGenreName()}</span>
                <span className="dropdown-arrow">{dropdownOpen ? '▲' : '▼'}</span>
            </button>

            {dropdownOpen && (
                <div className="genre-dropdown">
                    <div className="genre-dropdown-header">
                        <span>Select Genre</span>
                    </div>
                    <div className="genre-list">
                        <div
                            className={`genre-option ${!selectedGenre ? 'selected' : ''}`}
                            onClick={() => handleGenreClick(null)}
                        >
                            <span className="genre-name">All Genres</span>
                            {!selectedGenre && <span className="checkmark">✓</span>}
                        </div>
                        {getCurrentGenres().map((genre) => (
                            <div
                                key={genre.id}
                                className={`genre-option ${selectedGenre === genre.id ? 'selected' : ''}`}
                                onClick={() => handleGenreClick(genre.id)}
                            >
                                <span className="genre-name">{genre.name}</span>
                                {selectedGenre === genre.id && <span className="checkmark">✓</span>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenreDropdown;

import React, { useState, useEffect } from 'react';
import { useCountry } from '../../contexts/CountryContext';
import GenreDropdown from '../../components/GenreDropdown/GenreDropdown';
import {
    fetchMoviesByCountry,
    fetchTVByCountry,
    fetchLatestMoviesByCountry,
    fetchNowPlayingByCountry,
    discoverMovies,
    discoverTV
} from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Country.css';

const Country = () => {
    const { selectedCountry, updateCountry } = useCountry();
    const [popularMovies, setPopularMovies] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('movies');
    const [selectedGenre, setSelectedGenre] = useState(null);

    // Pagination states
    const [popularPage, setPopularPage] = useState(1);
    const [latestPage, setLatestPage] = useState(1);
    const [nowPlayingPage, setNowPlayingPage] = useState(1);
    const [tvPage, setTvPage] = useState(1);
    const [popularTotalPages, setPopularTotalPages] = useState(1);
    const [latestTotalPages, setLatestTotalPages] = useState(1);
    const [nowPlayingTotalPages, setNowPlayingTotalPages] = useState(1);
    const [tvTotalPages, setTvTotalPages] = useState(1);

    // Country data for display
    const countries = [
        { code: "US", name: "United States", flag: "🇺🇸" },
        { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
        { code: "CA", name: "Canada", flag: "🇨🇦" },
        { code: "AU", name: "Australia", flag: "🇦🇺" },
        { code: "DE", name: "Germany", flag: "🇩🇪" },
        { code: "FR", name: "France", flag: "🇫🇷" },
        { code: "ES", name: "Spain", flag: "🇪🇸" },
        { code: "IT", name: "Italy", flag: "🇮🇹" },
        { code: "JP", name: "Japan", flag: "🇯🇵" },
        { code: "KR", name: "South Korea", flag: "🇰🇷" },
        { code: "IN", name: "India", flag: "🇮🇳" },
        { code: "BR", name: "Brazil", flag: "🇧🇷" },
        { code: "MX", name: "Mexico", flag: "🇲🇽" },
        { code: "RU", name: "Russia", flag: "🇷🇺" },
        { code: "CN", name: "China", flag: "🇨🇳" },
        { code: "NL", name: "Netherlands", flag: "🇳🇱" },
        { code: "SE", name: "Sweden", flag: "🇸🇪" },
        { code: "NO", name: "Norway", flag: "🇳🇴" },
        { code: "DK", name: "Denmark", flag: "🇩🇰" },
        { code: "FI", name: "Finland", flag: "🇫🇮" }
    ];

    const getSelectedCountryData = () => {
        return countries.find(country => country.code === selectedCountry) || countries[0];
    };

    useEffect(() => {
        const loadCountryContent = async () => {
            try {
                setLoading(true);
                setError(null);

                const filters = {
                    page: 1,
                    language: 'en-US',
                    region: selectedCountry,
                    with_origin_country: selectedCountry,
                    sort_by: 'popularity.desc'
                };

                // Add genre filter if selected
                if (selectedGenre) {
                    filters.with_genres = selectedGenre;
                }

                const [popular, latest, nowPlaying, tv] = await Promise.all([
                    discoverMovies({ ...filters, vote_count_gte: 10 }),
                    discoverMovies({
                        ...filters,
                        primary_release_year: new Date().getFullYear(),
                        sort_by: 'release_date.desc',
                        vote_count_gte: 10,
                        vote_average_gte: 4.0
                    }),
                    discoverMovies({
                        ...filters,
                        vote_count_gte: 50,
                        vote_average_gte: 5.0,
                        primary_release_year: new Date().getFullYear()
                    }),
                    discoverTV({
                        ...filters,
                        vote_count_gte: 5
                    })
                ]);

                setPopularMovies(popular.results || []);
                setLatestMovies(latest.results || []);
                setNowPlayingMovies(nowPlaying.results || []);
                setPopularTV(tv.results || []);
                setPopularTotalPages(popular.total_pages || 1);
                setLatestTotalPages(latest.total_pages || 1);
                setNowPlayingTotalPages(nowPlaying.total_pages || 1);
                setTvTotalPages(tv.total_pages || 1);
            } catch (err) {
                setError('Failed to load content for this country');
                console.error('Error loading country content:', err);
            } finally {
                setLoading(false);
            }
        };

        loadCountryContent();
    }, [selectedCountry, selectedGenre]);

    // Pagination functions
    const loadPopularPage = async (page) => {
        try {
            setLoading(true);
            const filters = {
                page,
                language: 'en-US',
                region: selectedCountry,
                with_origin_country: selectedCountry,
                sort_by: 'popularity.desc',
                vote_count_gte: 10
            };
            if (selectedGenre) filters.with_genres = selectedGenre;

            const data = await discoverMovies(filters);
            setPopularMovies(data.results || []);
            setPopularPage(page);
            setPopularTotalPages(data.total_pages || 1);
        } catch (err) {
            console.error('Error loading popular movies page:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadLatestPage = async (page) => {
        try {
            setLoading(true);
            const filters = {
                page,
                language: 'en-US',
                region: selectedCountry,
                with_origin_country: selectedCountry,
                primary_release_year: new Date().getFullYear(),
                sort_by: 'release_date.desc',
                vote_count_gte: 10,
                vote_average_gte: 4.0
            };
            if (selectedGenre) filters.with_genres = selectedGenre;

            const data = await discoverMovies(filters);
            setLatestMovies(data.results || []);
            setLatestPage(page);
            setLatestTotalPages(data.total_pages || 1);
        } catch (err) {
            console.error('Error loading latest movies page:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadNowPlayingPage = async (page) => {
        try {
            setLoading(true);
            const filters = {
                page,
                language: 'en-US',
                region: selectedCountry,
                with_origin_country: selectedCountry,
                sort_by: 'popularity.desc',
                vote_count_gte: 50,
                vote_average_gte: 5.0,
                primary_release_year: new Date().getFullYear()
            };
            if (selectedGenre) filters.with_genres = selectedGenre;

            const data = await discoverMovies(filters);
            setNowPlayingMovies(data.results || []);
            setNowPlayingPage(page);
            setNowPlayingTotalPages(data.total_pages || 1);
        } catch (err) {
            console.error('Error loading now playing movies page:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadTVPage = async (page) => {
        try {
            setLoading(true);
            const filters = {
                page,
                language: 'en-US',
                region: selectedCountry,
                with_origin_country: selectedCountry,
                sort_by: 'popularity.desc',
                vote_count_gte: 5
            };
            if (selectedGenre) filters.with_genres = selectedGenre;

            const data = await discoverTV(filters);
            setPopularTV(data.results || []);
            setTvPage(page);
            setTvTotalPages(data.total_pages || 1);
        } catch (err) {
            console.error('Error loading TV shows page:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="country-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading content for {getSelectedCountryData().name}...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="country-page">
                <div className="error-container">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="country-page">
            <div className="country-hero">
                <div className="country-hero-content">
                    <div className="country-flag-large">{getSelectedCountryData().flag}</div>
                    <h1>Content from {getSelectedCountryData().name}</h1>
                    <p>Discover the latest movies and TV shows from {getSelectedCountryData().name}</p>
                </div>
            </div>

            <div className="country-content">
                <div className="tab-navigation">
                    <button
                        className={`tab-btn ${activeTab === 'movies' ? 'active' : ''}`}
                        onClick={() => setActiveTab('movies')}
                    >
                        Movies
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'tv' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tv')}
                    >
                        TV Shows
                    </button>

                    <GenreDropdown
                        onGenreSelect={setSelectedGenre}
                        selectedGenre={selectedGenre}
                        mediaType={activeTab}
                    />

                    {/* Country Selector */}
                    <div className="country-selector-container">
                        <select
                            className="country-select"
                            value={selectedCountry}
                            onChange={(e) => updateCountry(e.target.value)}
                        >
                            {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.flag} {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {activeTab === 'movies' && (
                    <div className="content-section">
                        <section className="movies-section">
                            <h2>Latest Movies from {getSelectedCountryData().name}</h2>
                            <div className="movies-grid">
                                {latestMovies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                            <div className="pagination-container">
                                <div className="pagination">
                                    <button
                                        onClick={() => loadLatestPage(latestPage - 1)}
                                        disabled={latestPage === 1}
                                        className="pagination-btn prev"
                                    >
                                        ← Previous
                                    </button>

                                    <div className="pagination-numbers">
                                        {Array.from({ length: Math.min(5, latestTotalPages) }, (_, i) => {
                                            const startPage = Math.max(1, latestPage - 2);
                                            const pageNum = startPage + i;
                                            if (pageNum > latestTotalPages) return null;

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => loadLatestPage(pageNum)}
                                                    className={`pagination-btn ${pageNum === latestPage ? 'active' : ''}`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => loadLatestPage(latestPage + 1)}
                                        disabled={latestPage === latestTotalPages}
                                        className="pagination-btn next"
                                    >
                                        Next →
                                    </button>
                                </div>
                                <div className="pagination-info">
                                    Page {latestPage} of {latestTotalPages}
                                </div>
                            </div>
                        </section>

                        <section className="movies-section">
                            <h2>Popular Movies from {getSelectedCountryData().name}</h2>
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

                        <section className="movies-section">
                            <h2>Now Playing in {getSelectedCountryData().name}</h2>
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
                )}

                {activeTab === 'tv' && (
                    <div className="content-section">
                        <section className="tv-section">
                            <h2>Popular TV Shows from {getSelectedCountryData().name}</h2>
                            <div className="tv-grid">
                                {popularTV.map((show) => (
                                    <MovieCard key={show.id} movie={{ ...show, media_type: 'tv' }} />
                                ))}
                            </div>
                            <div className="pagination-container">
                                <div className="pagination">
                                    <button
                                        onClick={() => loadTVPage(tvPage - 1)}
                                        disabled={tvPage === 1}
                                        className="pagination-btn prev"
                                    >
                                        ← Previous
                                    </button>

                                    <div className="pagination-numbers">
                                        {Array.from({ length: Math.min(5, tvTotalPages) }, (_, i) => {
                                            const startPage = Math.max(1, tvPage - 2);
                                            const pageNum = startPage + i;
                                            if (pageNum > tvTotalPages) return null;

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => loadTVPage(pageNum)}
                                                    className={`pagination-btn ${pageNum === tvPage ? 'active' : ''}`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => loadTVPage(tvPage + 1)}
                                        disabled={tvPage === tvTotalPages}
                                        className="pagination-btn next"
                                    >
                                        Next →
                                    </button>
                                </div>
                                <div className="pagination-info">
                                    Page {tvPage} of {tvTotalPages}
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Country;

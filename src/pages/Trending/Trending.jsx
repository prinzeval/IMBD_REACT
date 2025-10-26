import React, { useState, useEffect } from 'react';
import { fetchTrendingAll } from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Trending.css';

const Trending = () => {
    const [trendingToday, setTrendingToday] = useState([]);
    const [trendingWeek, setTrendingWeek] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [todayPage, setTodayPage] = useState(1);
    const [weekPage, setWeekPage] = useState(1);
    const [todayTotalPages, setTodayTotalPages] = useState(1);
    const [weekTotalPages, setWeekTotalPages] = useState(1);

    useEffect(() => {
        const loadTrending = async () => {
            try {
                setLoading(true);
                setError(null);

                const [today, week] = await Promise.all([
                    fetchTrendingAll('day'),
                    fetchTrendingAll('week')
                ]);

                setTrendingToday(today.results || []);
                setTrendingWeek(week.results || []);
                setTodayTotalPages(today.total_pages || 1);
                setWeekTotalPages(week.total_pages || 1);
            } catch (err) {
                setError('Failed to load trending content');
                console.error('Error loading trending content:', err);
            } finally {
                setLoading(false);
            }
        };

        loadTrending();
    }, []);

    const loadTodayPage = async (pageNum) => {
        try {
            setLoading(true);
            const data = await fetchTrendingAll('day', 'en-US', pageNum);
            setTrendingToday(data.results || []);
            setTodayPage(pageNum);
        } catch (err) {
            console.error('Error loading trending today page:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadWeekPage = async (pageNum) => {
        try {
            setLoading(true);
            const data = await fetchTrendingAll('week', 'en-US', pageNum);
            setTrendingWeek(data.results || []);
            setWeekPage(pageNum);
        } catch (err) {
            console.error('Error loading trending week page:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="trending-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading trending content...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="trending-page">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="trending-page">
            <div className="trending-header">
                <h1>New & Popular</h1>
                <p>Discover what's trending right now</p>
            </div>

            <div className="trending-content">
                {/* Trending Today Section */}
                <section className="trending-section">
                    <h2>Trending Today</h2>
                    <div className="trending-grid">
                        {trendingToday.map((item) => (
                            <MovieCard key={item.id} movie={item} />
                        ))}
                    </div>
                    <div className="pagination-container">
                        <div className="pagination">
                            <button
                                onClick={() => loadTodayPage(todayPage - 1)}
                                disabled={todayPage === 1}
                                className="pagination-btn prev"
                            >
                                ← Previous
                            </button>

                            <div className="pagination-numbers">
                                {Array.from({ length: Math.min(5, todayTotalPages) }, (_, i) => {
                                    const startPage = Math.max(1, todayPage - 2);
                                    const pageNum = startPage + i;
                                    if (pageNum > todayTotalPages) return null;

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => loadTodayPage(pageNum)}
                                            className={`pagination-btn ${pageNum === todayPage ? 'active' : ''}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => loadTodayPage(todayPage + 1)}
                                disabled={todayPage === todayTotalPages}
                                className="pagination-btn next"
                            >
                                Next →
                            </button>
                        </div>
                        <div className="pagination-info">
                            Page {todayPage} of {todayTotalPages}
                        </div>
                    </div>
                </section>

                {/* Trending This Week Section */}
                <section className="trending-section">
                    <h2>Trending This Week</h2>
                    <div className="trending-grid">
                        {trendingWeek.map((item) => (
                            <MovieCard key={item.id} movie={item} />
                        ))}
                    </div>
                    <div className="pagination-container">
                        <div className="pagination">
                            <button
                                onClick={() => loadWeekPage(weekPage - 1)}
                                disabled={weekPage === 1}
                                className="pagination-btn prev"
                            >
                                ← Previous
                            </button>

                            <div className="pagination-numbers">
                                {Array.from({ length: Math.min(5, weekTotalPages) }, (_, i) => {
                                    const startPage = Math.max(1, weekPage - 2);
                                    const pageNum = startPage + i;
                                    if (pageNum > weekTotalPages) return null;

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => loadWeekPage(pageNum)}
                                            className={`pagination-btn ${pageNum === weekPage ? 'active' : ''}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => loadWeekPage(weekPage + 1)}
                                disabled={weekPage === weekTotalPages}
                                className="pagination-btn next"
                            >
                                Next →
                            </button>
                        </div>
                        <div className="pagination-info">
                            Page {weekPage} of {weekTotalPages}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Trending;

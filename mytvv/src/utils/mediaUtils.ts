export const getMediaQuality = (movie: any) => {
    if (!movie) return "HD";

    const releaseDate = movie.release_date || movie.first_air_date;

    // 1. TV Shows are almost always HD from release
    if (movie.media_type === "tv" || movie.name && !movie.title) return "HD";

    if (!releaseDate) return "HD";

    // 2. Check Genres (Animation: 16, Documentary: 99, TV Movie: 10770)
    // These are almost always HD from day one (streaming or direct releases)
    const hdGenres = [16, 99, 10770];
    const genreIds = movie.genre_ids || (movie.genres?.map((g: any) => g.id)) || [];
    if (genreIds.some((id: number) => hdGenres.includes(id))) {
        return "HD";
    }

    // 3. If we have detailed release dates from TMDB, check for digital/physical release
    const releaseDatesData = movie.release_dates;
    if (releaseDatesData?.results) {
        const hasDigitalOrPhysical = releaseDatesData.results.some((country: any) =>
            country.release_dates.some((date: any) =>
                date.type === 4 || date.type === 5 // 4 = Digital, 5 = Physical
            )
        );
        if (hasDigitalOrPhysical) return "HD";
    }

    const release = new Date(releaseDate);
    const now = new Date();

    // Set to start of day for stable hydration
    now.setHours(0, 0, 0, 0);
    release.setHours(0, 0, 0, 0);

    const diffInDays = Math.floor((now.getTime() - release.getTime()) / (1000 * 3600 * 24));

    // 4. Fallback logic: Modern CAM window is much shorter (approx 3-4 weeks)
    // If the movie was released less than 25 days ago and hasn't triggered HD signals above, it might be CAM
    return diffInDays < 25 ? "CAM" : "HD";
};

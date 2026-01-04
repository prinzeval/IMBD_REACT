# MyTV - Next.js Movie & TV Show Database

A modern movie and TV show database built with Next.js 15, TypeScript, and Mantine UI.

## Features

- 🎬 Browse movies and TV shows
- 🔍 Search functionality
- 📱 Responsive design with Mantine UI
- ⚡ Server-side rendering with Next.js
- 🎨 Modern, clean UI

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Mantine UI** - Component library
- **TMDB API** - Movie and TV show data

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
mytvv/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── home/         # Home page
│   │   ├── movies/       # Movies listing
│   │   ├── tv-shows/     # TV shows listing
│   │   ├── movie/[id]/   # Movie details
│   │   ├── tv/[id]/      # TV show details
│   │   └── search/       # Search page
│   ├── components/       # React components
│   │   └── Navbar/       # Navigation component
│   └── services/         # API services
│       └── tmdbApi.ts    # TMDB API client
```

## Routes

- `/` - Welcome page
- `/home` - Home page with trending content
- `/movies` - Browse movies
- `/tv-shows` - Browse TV shows
- `/trending` - Trending content
- `/movie/[id]` - Movie details
- `/tv/[id]` - TV show details
- `/genre/[mediaType]/[genreId]` - Genre page
- `/search` - Search page

## Next Steps

- [ ] Add movie/TV card components
- [ ] Implement carousels for trending content
- [ ] Add movie/TV detail pages with full information
- [ ] Implement genre filtering
- [ ] Add country filtering
- [ ] Add pagination
- [ ] Add dark mode toggle
- [ ] Add favorites/watchlist functionality

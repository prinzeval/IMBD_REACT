"use client";

import { Container, Title, SimpleGrid, Pagination, Stack, Box, Center, Loader, Text, Paper } from "@mantine/core";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchContentByGenre, fetchMovieGenres, fetchTVGenres } from "@/services/tmdbApi";

export default function GenrePage() {
  const params = useParams();
  const mediaType = params.mediaType as string;
  const genreId = params.genreId as string;
  const [content, setContent] = useState<any[]>([]);
  const [genreName, setGenreName] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGenreInfo = async () => {
      try {
        const genres = mediaType === 'movie' ? await fetchMovieGenres() : await fetchTVGenres();
        const genre = genres.genres.find((g: any) => g.id.toString() === genreId);
        setGenreName(genre ? genre.name : 'Genre');
      } catch (error) {
        console.error("Error fetching genre info:", error);
      }
    };
    if (mediaType && genreId) {
      loadGenreInfo();
    }
  }, [mediaType, genreId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchContentByGenre(mediaType, genreId, page);
        setContent(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching genre content:", error);
      } finally {
        setLoading(false);
      }
    };

    if (mediaType && genreId) {
      fetchData();
    }
  }, [mediaType, genreId, page]);

  if (loading && page === 1) {
    return (
      <Center style={{ minHeight: "100vh", background: "#0a0a0a" }}>
        <Loader color="blue" size="xl" type="bars" />
      </Center>
    );
  }

  return (
    <Box style={{ minHeight: "100vh", background: "#0a0a0a", paddingTop: "2rem" }}>
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Paper 
            p="xl" 
            radius="lg" 
            style={{ 
              background: "linear-gradient(135deg, rgba(0, 115, 230, 0.1) 0%, rgba(140, 26, 255, 0.1) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <Title order={1} c="white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              {genreName} {mediaType === "movie" ? "Movies" : "TV Shows"}
            </Title>
            <Text size="lg" style={{ color: "rgba(255, 255, 255, 0.7)", maxWidth: 800 }} mt="md">
              Discover the best {genreName.toLowerCase()} {mediaType === 'movie' ? 'movies' : 'TV shows'}
              with high ratings and popularity.
            </Text>
          </Paper>

          {loading ? (
            <Center py="xl">
              <Loader color="blue" size="xl" type="bars" />
            </Center>
          ) : (
            <>
              <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="xl">
                {content.map((item) => (
                  <MovieCard
                    key={item.id}
                    movie={{
                      ...item,
                      media_type: mediaType,
                    }}
                  />
                ))}
              </SimpleGrid>

              {totalPages > 1 && (
                <Center mt="xl">
                  <Pagination
                    total={Math.min(totalPages, 500)} // TMDB limits to 500 pages
                    value={page}
                    onChange={setPage}
                    color="blue"
                  />
                </Center>
              )}
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

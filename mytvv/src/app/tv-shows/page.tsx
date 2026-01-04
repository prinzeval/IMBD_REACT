"use client";

import { Container, Title, SimpleGrid, Pagination, Stack, Box } from "@mantine/core";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { useState, useEffect } from "react";
import { fetchPopularTV } from "@/services/tmdbApi";

export default function TVShowsPage() {
  const [tvShows, setTVShows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchPopularTV(page);
        setTVShows(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <Box style={{ minHeight: "100vh", background: "#0a0a0a", paddingTop: "2rem" }}>
      <Container size="xl" py={{ base: "md", md: "xl" }}>
        <Stack gap={{ base: "lg", md: "xl" }}>
          <Title
            order={1}
            style={{
              color: "white",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, #ffffff 0%, #8c1aff 50%, #0073e6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            mb={{ base: "lg", md: "xl" }}
          >
            TV Shows
          </Title>

          <SimpleGrid
            cols={{ base: 2, xs: 2, sm: 3, md: 4, lg: 5 }}
            spacing={{ base: "md", sm: "lg", md: "xl" }}
          >
            {tvShows.map((tv) => (
              <MovieCard key={tv.id} movie={{ ...tv, media_type: "tv" }} />
            ))}
          </SimpleGrid>

          {totalPages > 1 && (
            <Pagination
              total={totalPages}
              value={page}
              onChange={setPage}
              color="violet"
              size="md"
              style={{ alignSelf: "center", marginTop: "2rem" }}
              styles={{
                control: {
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "&:hover": {
                    background: "rgba(140, 26, 255, 0.3)",
                  },
                  "&[data-active]": {
                    background: "linear-gradient(135deg, #8c1aff 0%, #0073e6 100%)",
                    border: "none",
                  },
                },
              }}
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
}

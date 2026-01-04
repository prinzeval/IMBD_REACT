"use client";

import { Container, Title, Text, SimpleGrid, Paper, Stack, Box, Center, Loader, Group } from "@mantine/core";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchMovieGenres, fetchTVGenres } from "@/services/tmdbApi";
import { IconMovie, IconDeviceTv } from "@tabler/icons-react";

export default function GenresPage() {
  const [movieGenres, setMovieGenres] = useState<any[]>([]);
  const [tvGenres, setTvGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGenres = async () => {
      try {
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

  if (loading) {
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
          <Title order={1} c="white" mb="xl">Browse by Genre</Title>

          <section>
            <Group mb="lg">
              <IconMovie size={32} color="#0073e6" />
              <Title order={2} c="white">Movie Genres</Title>
            </Group>
            <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="lg">
              {movieGenres.map((genre) => (
                <Link key={genre.id} href={`/genre/movie/${genre.id}`} style={{ textDecoration: 'none' }}>
                  <Paper 
                    p="xl" 
                    radius="md" 
                    withBorder 
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                      textAlign: 'center',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Text fw={700} c="white">{genre.name}</Text>
                  </Paper>
                </Link>
              ))}
            </SimpleGrid>
          </section>

          <section style={{ marginTop: '3rem' }}>
            <Group mb="lg">
              <IconDeviceTv size={32} color="#8c1aff" />
              <Title order={2} c="white">TV Show Genres</Title>
            </Group>
            <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="lg">
              {tvGenres.map((genre) => (
                <Link key={genre.id} href={`/genre/tv/${genre.id}`} style={{ textDecoration: 'none' }}>
                  <Paper 
                    p="xl" 
                    radius="md" 
                    withBorder 
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                      textAlign: 'center',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Text fw={700} c="white">{genre.name}</Text>
                  </Paper>
                </Link>
              ))}
            </SimpleGrid>
          </section>
        </Stack>
      </Container>
    </Box>
  );
}


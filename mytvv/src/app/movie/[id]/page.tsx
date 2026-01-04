"use client";

import { Container, Title, Text, Image, Group, Badge, Stack, Paper, Button, Tabs, SimpleGrid, Box, Breadcrumbs, Anchor, Rating, Divider } from "@mantine/core";
import { IconPlayerPlay, IconDownload, IconStar } from "@tabler/icons-react";
import { fetchMovieDetails } from "@/services/tmdbApi";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { Recommendations } from "@/components/Recommendations/Recommendations";
import { getMediaQuality } from "@/utils/mediaUtils";

const movieServers = [
  { id: 'vidsrc-embed', name: 'VidSrc Embed', url: (id: string) => `https://vidsrc-embed.ru/embed/movie?tmdb=${id}` },
  { id: 'vidsrc', name: 'VidSrc', url: (id: string, imdbId?: string) => `https://vidsrc.xyz/embed/movie?imdb=${imdbId || id}` },
  { id: 'vidlink', name: 'VidLink', url: (id: string) => `https://vidlink.pro/movie/${id}` },
  { id: 'vidsrc-cc', name: 'VidSrc.cc', url: (id: string) => `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=false` },
  { id: 'vidrock', name: 'VidRock', url: (id: string, imdbId?: string) => `https://vidrock.net/movie/${imdbId || id}` },
  { id: 'smashy-stream', name: 'Smashy.stream', url: (id: string) => `https://player.smashy.stream/movie/${id}` },
  { id: 'vidplus', name: 'VidPlus', url: (id: string) => `https://player.vidplus.to/embed/movie/${id}?autoplay=true&poster=true&title=true&download=true&watchparty=false&chromecast=true&servericon=true&setting=true&pip=true&primarycolor=6C63FF&secondarycolor=9F9BFF&iconcolor=FFFFFF&font=Roboto&fontcolor=FFFFFF&fontsize=20&opacity=0.5&server=3` },
];

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [movie, setMovie] = useState<any>(null);
  const [selectedServer, setSelectedServer] = useState('vidsrc-embed');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading || !movie) {
    return (
      <Box style={{ minHeight: "100vh", background: "var(--mantine-color-dark-9)", paddingTop: "2rem" }}>
        <Container size="xl" py="xl">
          <Text c="white">Loading...</Text>
        </Container>
      </Box>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const quality = getMediaQuality(movie);

  return (
    <Box style={{ minHeight: "100vh", background: "var(--mantine-color-dark-9)" }}>
      {/* Hero Section with Backdrop */}
      {backdropUrl && (
        <Box
          style={{
            position: "relative",
            height: "60vh",
            backgroundImage: `url(${backdropUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.9) 100%)",
            }}
          />
        </Box>
      )}

      <Container size="xl" py="xl">
        <Breadcrumbs mb="xl" c="white">
          <Anchor component={Link} href="/" c="white">
            Home
          </Anchor>
          <Text c="white">Movie</Text>
          <Text c="white">{movie.title}</Text>
        </Breadcrumbs>

        {/* Video Player Section */}
        <Paper p="xl" radius="md" withBorder mb="xl" style={{ background: "var(--mantine-color-dark-8)" }}>
          <Stack gap="md">
            <Title order={3} c="white">
              {movie.title} - Movie
            </Title>

            {/* Server Selection */}
            <Tabs value={selectedServer} onChange={(value) => setSelectedServer(value || 'vidsrc-embed')}>
              <Tabs.List>
                {movieServers.map((server) => (
                  <Tabs.Tab key={server.id} value={server.id}>
                    {server.name}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs>

            {/* Video Player */}
            <Box
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <iframe
                src={movieServers.find(s => s.id === selectedServer)?.url(id, movie.imdb_id)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                allowFullScreen
                allow="fullscreen; autoplay; picture-in-picture; encrypted-media"
              />
            </Box>

            {/* Download Section */}
            <Group justify="space-between">
              <Text c="white">Movie selected - Download now</Text>
              <Button
                component="a"
                href={`https://dl.vidsrc.vip/movie/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                leftSection={<IconDownload size={20} />}
                color="red"
              >
                Download
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* Movie Details Section */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" mb="xl">
          <Image
            src={posterUrl}
            alt={movie.title}
            radius="md"
          />

          <Stack gap="md">
            <Title order={1} c="white">
              {movie.title}
            </Title>

            <Group gap="md">
              {mounted && (
                <Badge color={quality === "HD" ? "green" : "orange"} size="lg">{quality}</Badge>
              )}
              <Group gap={4}>
                <IconStar size={20} color="yellow" fill="yellow" />
                <Text c="white" fw={600}>
                  {movie.vote_average?.toFixed(1) || "N/A"}
                </Text>
              </Group>
              <Rating value={movie.vote_average ? movie.vote_average / 2 : 0} fractions={2} readOnly />
            </Group>

            <Divider />

            <Stack gap="xs">
              <Text c="white">
                <strong>Released:</strong> {movie.release_date || "N/A"}
              </Text>
              <Text c="white">
                <strong>Genre:</strong> {movie.genres?.map((g: any) => g.name).join(", ") || "N/A"}
              </Text>
              <Text c="white">
                <strong>Duration:</strong> {movie.runtime || "N/A"} min
              </Text>
              <Text c="white">
                <strong>Country:</strong> {movie.production_countries?.map((c: any) => c.name).join(", ") || "N/A"}
              </Text>
              <Text c="white">
                <strong>Production:</strong> {movie.production_companies?.map((c: any) => c.name).join(", ") || "N/A"}
              </Text>
            </Stack>

            <Divider />

            <Stack gap="xs">
              <Title order={3} c="white">
                Synopsis
              </Title>
              <Text c="white" style={{ lineHeight: 1.6 }}>
                {movie.overview || "No overview available."}
              </Text>
            </Stack>
          </Stack>
        </SimpleGrid>

        <Recommendations id={id} mediaType="movie" />
      </Container>
    </Box>
  );
}

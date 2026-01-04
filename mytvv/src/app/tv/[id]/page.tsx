"use client";

import { Container, Title, Text, Image, Group, Badge, Stack, Paper, Button, Tabs, SimpleGrid, Box, Breadcrumbs, Anchor, Rating, Divider, Select } from "@mantine/core";
import { IconPlayerPlay, IconDownload, IconStar } from "@tabler/icons-react";
import { fetchTVDetails } from "@/services/tmdbApi";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Recommendations } from "@/components/Recommendations/Recommendations";
import { getMediaQuality } from "@/utils/mediaUtils";

const episodeServers = [
  { id: 'vidsrc-embed', name: 'VidSrc Embed', url: (id: string, season: number, episode: number) => `https://vidsrc-embed.ru/embed/tv?tmdb=${id}&season=${season}&episode=${episode}` },
  { id: 'vidsrc', name: 'VidSrc', url: (id: string, season: number, episode: number) => `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${season}&episode=${episode}` },
  { id: 'vidlink', name: 'VidLink', url: (id: string, season: number, episode: number) => `https://vidlink.pro/tv/${id}/${season}/${episode}` },
  { id: 'vidsrc-cc', name: 'VidSrc.cc', url: (id: string, season: number, episode: number) => `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}?autoPlay=false` },
  { id: 'vidrock', name: 'VidRock', url: (id: string, season: number, episode: number, imdbId?: string) => `https://vidrock.net/tv/${imdbId || id}/${season}/${episode}` },
  { id: 'smashy-stream', name: 'Smashy.stream', url: (id: string, season: number, episode: number) => `https://player.smashy.stream/tv/${id}?s=${season}&e=${episode}` },
  { id: 'vidplus', name: 'VidPlus', url: (id: string, season: number, episode: number) => `https://player.vidplus.to/embed/tv/${id}/${season}/${episode}?autoplay=true&poster=true&title=true&download=true&watchparty=false&chromecast=true&servericon=true&setting=true&pip=true&primarycolor=6C63FF&secondarycolor=9F9BFF&iconcolor=FFFFFF&font=Roboto&fontcolor=FFFFFF&fontsize=20&opacity=0.5&server=3` },
];

export default function TVPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [tv, setTV] = useState<any>(null);
  const [selectedServer, setSelectedServer] = useState('vidsrc-embed');
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchTVDetails(id);
        const filteredSeasons = data.seasons?.filter((s: any) => s.season_number !== 0) || [];
        setTV({ ...data, seasons: filteredSeasons });
        if (filteredSeasons.length > 0) {
          setSelectedSeason(filteredSeasons[0].season_number);
        }
      } catch (error) {
        console.error("Error fetching TV show:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!tv || !selectedSeason) return;

      setLoadingEpisodes(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?language=en-US`,
          {
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTk2OWFmOTYwYjMxY2I1YmRlOWU3NmUwYTg0MWNkNCIsIm5iZiI6MTczMjQ1MTQ3OC42NDcsInN1YiI6IjY3NDMxYzk2NjM3MGVjYWQzZmZmZmMyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9o5xq2YQRy5lOsX2ZChzQTvI_poKSSQ4hNVnwnlo390'
            }
          }
        );
        const data = await response.json();
        const episodesList = data.episodes || [];
        setEpisodes(episodesList);
        if (episodesList.length > 0 && !selectedEpisode) {
          setSelectedEpisode(episodesList[0]);
        }
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoadingEpisodes(false);
      }
    };

    fetchEpisodes();
  }, [id, selectedSeason, tv]);

  if (loading || !tv) {
    return (
      <Box style={{ minHeight: "100vh", background: "var(--mantine-color-dark-9)", paddingTop: "2rem" }}>
        <Container size="xl" py="xl">
          <Text c="white">Loading...</Text>
        </Container>
      </Box>
    );
  }

  const posterUrl = tv.poster_path
    ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
    : "https://via.placeholder.com/500";

  const backdropUrl = tv.backdrop_path
    ? `https://image.tmdb.org/t/p/original${tv.backdrop_path}`
    : null;

  // TV shows are almost always HD from release
  const quality = getMediaQuality(tv);

  const seasonOptions = tv.seasons?.map((season: any) => ({
    value: season.season_number.toString(),
    label: `Season ${season.season_number}`,
  })) || [];

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
          <Text c="white">TV Show</Text>
          <Text c="white">{tv.name}</Text>
        </Breadcrumbs>

        {/* Video Player Section */}
        <Paper p="xl" radius="md" withBorder mb="xl" style={{ background: "var(--mantine-color-dark-8)" }}>
          <Stack gap="md">
            <Title order={3} c="white">
              {selectedEpisode
                ? `${selectedEpisode.name} - Season ${selectedSeason} Episode ${selectedEpisode.episode_number}`
                : "Select an episode"}
            </Title>

            {/* Season and Episode Selection */}
            <Group>
              <Select
                label="Season"
                value={selectedSeason.toString()}
                onChange={(value) => {
                  setSelectedSeason(parseInt(value || "1"));
                  setSelectedEpisode(null);
                }}
                data={seasonOptions}
                style={{ flex: 1 }}
              />
              {episodes.length > 0 && (
                <Select
                  label="Episode"
                  value={selectedEpisode?.episode_number?.toString() || ""}
                  onChange={(value) => {
                    const episode = episodes.find((e: any) => e.episode_number.toString() === value);
                    setSelectedEpisode(episode);
                  }}
                  data={episodes.map((ep: any) => ({
                    value: ep.episode_number.toString(),
                    label: `Episode ${ep.episode_number}: ${ep.name}`,
                  }))}
                  style={{ flex: 1 }}
                />
              )}
            </Group>

            {/* Server Selection */}
            <Tabs value={selectedServer} onChange={(value) => setSelectedServer(value || 'vidsrc-embed')}>
              <Tabs.List>
                {episodeServers.map((server) => (
                  <Tabs.Tab key={server.id} value={server.id}>
                    {server.name}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs>

            {/* Video Player */}
            {selectedEpisode && (
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
                  src={episodeServers.find(s => s.id === selectedServer)?.url(id, selectedSeason, selectedEpisode.episode_number, tv.imdb_id)}
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
            )}

            {/* Download Section */}
            {selectedEpisode && (
              <Group justify="space-between">
                <Text c="white">
                  Series - Season {selectedSeason} Episode {selectedEpisode.episode_number} selected - Download now
                </Text>
                <Button
                  component="a"
                  href={`https://dl.vidsrc.vip/tv/${id}/${selectedSeason}/${selectedEpisode.episode_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftSection={<IconDownload size={20} />}
                  color="red"
                >
                  Download
                </Button>
              </Group>
            )}
          </Stack>
        </Paper>

        {/* TV Show Details Section */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" mb="xl">
          <Image
            src={posterUrl}
            alt={tv.name}
            radius="md"
          />

          <Stack gap="md">
            <Title order={1} c="white">
              {tv.name}
            </Title>

            <Group gap="md">
              <Badge color={quality === "HD" ? "green" : "orange"} size="lg">{quality}</Badge>
              <Group gap={4}>
                <IconStar size={20} color="yellow" fill="yellow" />
                <Text c="white" fw={600}>
                  {tv.vote_average?.toFixed(1) || "N/A"}
                </Text>
              </Group>
              <Rating value={tv.vote_average ? tv.vote_average / 2 : 0} fractions={2} readOnly />
            </Group>

            <Divider />

            <Stack gap="xs">
              <Text c="white">
                <strong>First Air Date:</strong> {tv.first_air_date || "N/A"}
              </Text>
              <Text c="white">
                <strong>Genre:</strong> {tv.genres?.map((g: any) => g.name).join(", ") || "N/A"}
              </Text>
              <Text c="white">
                <strong>Seasons:</strong> {tv.number_of_seasons || "N/A"}
              </Text>
              <Text c="white">
                <strong>Episodes:</strong> {tv.number_of_episodes || "N/A"}
              </Text>
              <Text c="white">
                <strong>Country:</strong> {tv.production_countries?.map((c: any) => c.name).join(", ") || "N/A"}
              </Text>
            </Stack>

            <Divider />

            <Stack gap="xs">
              <Title order={3} c="white">
                Synopsis
              </Title>
              <Text c="white" style={{ lineHeight: 1.6 }}>
                {tv.overview || "No overview available."}
              </Text>
            </Stack>
          </Stack>
        </SimpleGrid>

        <Recommendations id={id} mediaType="tv" />
      </Container>
    </Box>
  );
}

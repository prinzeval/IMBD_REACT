"use client";

import { Container, Title, Text, Group, Select, Tabs, SimpleGrid, Pagination, Box, Paper, Stack, Center, Loader } from "@mantine/core";
import { useState, useEffect } from "react";
import { useCountry } from "@/contexts/CountryContext";
import { 
  discoverMovies, 
  discoverTV, 
  fetchLatestMoviesByCountry, 
  fetchNowPlayingByCountry,
  fetchMovieGenres,
  fetchTVGenres
} from "@/services/tmdbApi";
import { MovieCard } from "@/components/MovieCard/MovieCard";

const countries = [
  { value: "US", label: "🇺🇸 United States" },
  { value: "GB", label: "🇬🇧 United Kingdom" },
  { value: "CA", label: "🇨🇦 Canada" },
  { value: "AU", label: "🇦🇺 Australia" },
  { value: "DE", label: "🇩🇪 Germany" },
  { value: "FR", label: "🇫🇷 France" },
  { value: "ES", label: "🇪🇸 Spain" },
  { value: "IT", label: "🇮🇹 Italy" },
  { value: "JP", label: "🇯🇵 Japan" },
  { value: "KR", label: "🇰🇷 South Korea" },
  { value: "IN", label: "🇮🇳 India" },
  { value: "BR", label: "🇧🇷 Brazil" },
  { value: "MX", label: "🇲🇽 Mexico" },
  { value: "RU", label: "🇷🇺 Russia" },
  { value: "CN", label: "🇨🇳 China" },
  { value: "NL", label: "🇳🇱 Netherlands" },
  { value: "SE", label: "🇸🇪 Sweden" },
  { value: "NO", label: "🇳🇴 Norway" },
  { value: "DK", label: "🇩🇰 Denmark" },
  { value: "FI", label: "🇫🇮 Finland" }
];

export default function CountryPage() {
  const { selectedCountry, updateCountry } = useCountry();
  const [activeTab, setActiveTab] = useState<string | null>("movies");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [genres, setGenres] = useState<{ value: string; label: string }[]>([]);
  
  const [popularContent, setPopularContent] = useState<any[]>([]);
  const [latestContent, setLatestContent] = useState<any[]>([]);
  const [nowPlayingContent, setNowPlayingContent] = useState<any[]>([]);
  
  const [popularPage, setPopularPage] = useState(1);
  const [popularTotalPages, setPopularTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = activeTab === "movies" ? await fetchMovieGenres() : await fetchTVGenres();
        setGenres(data.genres.map((g: any) => ({ value: g.id.toString(), label: g.name })));
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
    setSelectedGenre(null);
  }, [activeTab]);

  useEffect(() => {
    const fetchCountryContent = async () => {
      setLoading(true);
      try {
        const filters = {
          page: popularPage,
          region: selectedCountry,
          with_origin_country: selectedCountry,
          with_genres: selectedGenre
        };

        if (activeTab === "movies") {
          const [popular, latest, nowPlaying] = await Promise.all([
            discoverMovies({ ...filters, vote_count_gte: 10 }),
            fetchLatestMoviesByCountry(selectedCountry, 1),
            fetchNowPlayingByCountry(selectedCountry, 1)
          ]);
          
          setPopularContent(popular.results || []);
          setPopularTotalPages(popular.total_pages || 1);
          setLatestContent(latest.results || []);
          setNowPlayingContent(nowPlaying.results || []);
        } else {
          const popular = await discoverTV({ ...filters, vote_count_gte: 5 });
          setPopularContent(popular.results || []);
          setPopularTotalPages(popular.total_pages || 1);
          setLatestContent([]);
          setNowPlayingContent([]);
        }
      } catch (error) {
        console.error("Error fetching country content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryContent();
  }, [selectedCountry, selectedGenre, activeTab, popularPage]);

  const selectedCountryName = countries.find(c => c.value === selectedCountry)?.label || "United States";

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
            <Group justify="space-between" align="flex-end">
              <Stack gap={4}>
                <Title order={1} style={{ color: "white", fontSize: "clamp(2rem, 5vw, 3rem)" }}>
                  Content from {mounted ? selectedCountryName.split(' ')[1] : '...'}
                </Title>
                <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Explore the best movies and TV shows from {mounted ? selectedCountryName.split(' ')[1] : '...'}
                </Text>
              </Stack>
              
              <Group>
                <Select
                  label="Country"
                  data={countries}
                  value={selectedCountry}
                  onChange={(val) => updateCountry(val || "US")}
                  styles={{ input: { backgroundColor: "rgba(255, 255, 255, 0.05)", color: "white" } }}
                />
                <Select
                  label="Genre"
                  data={genres}
                  value={selectedGenre}
                  onChange={setSelectedGenre}
                  placeholder="All Genres"
                  clearable
                  styles={{ input: { backgroundColor: "rgba(255, 255, 255, 0.05)", color: "white" } }}
                />
              </Group>
            </Group>
          </Paper>

          <Tabs value={activeTab} onChange={setActiveTab} color="blue" variant="pills">
            <Tabs.List mb="xl">
              <Tabs.Tab value="movies" style={{ fontSize: "1.1rem", fontWeight: 600 }}>Movies</Tabs.Tab>
              <Tabs.Tab value="tv" style={{ fontSize: "1.1rem", fontWeight: 600 }}>TV Shows</Tabs.Tab>
            </Tabs.List>

            {loading ? (
              <Center py="xl">
                <Loader color="blue" size="xl" type="bars" />
              </Center>
            ) : (
              <>
                {activeTab === "movies" && (
                  <Stack gap="xl">
                    {nowPlayingContent.length > 0 && (
                      <section>
                        <Title order={2} mb="lg" c="white">Now Playing</Title>
                        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="xl">
                          {nowPlayingContent.map((item) => (
                            <MovieCard key={item.id} movie={{ ...item, media_type: "movie" }} />
                          ))}
                        </SimpleGrid>
                      </section>
                    )}

                    {latestContent.length > 0 && (
                      <section>
                        <Title order={2} mb="lg" c="white">Latest Releases</Title>
                        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="xl">
                          {latestContent.map((item) => (
                            <MovieCard key={item.id} movie={{ ...item, media_type: "movie" }} />
                          ))}
                        </SimpleGrid>
                      </section>
                    )}

                    <section>
                      <Title order={2} mb="lg" c="white">Popular Movies</Title>
                      <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="xl">
                        {popularContent.map((item) => (
                          <MovieCard key={item.id} movie={{ ...item, media_type: "movie" }} />
                        ))}
                      </SimpleGrid>
                      <Center mt="xl">
                        <Pagination total={popularTotalPages} value={popularPage} onChange={setPopularPage} color="blue" />
                      </Center>
                    </section>
                  </Stack>
                )}

                {activeTab === "tv" && (
                  <section>
                    <Title order={2} mb="lg" c="white">Popular TV Shows</Title>
                    <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="xl">
                      {popularContent.map((item) => (
                        <MovieCard key={item.id} movie={{ ...item, media_type: "tv" }} />
                      ))}
                    </SimpleGrid>
                    <Center mt="xl">
                      <Pagination total={popularTotalPages} value={popularPage} onChange={setPopularPage} color="blue" />
                    </Center>
                  </section>
                )}
              </>
            )}
          </Tabs>
        </Stack>
      </Container>
    </Box>
  );
}


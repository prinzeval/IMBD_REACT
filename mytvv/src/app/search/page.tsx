"use client";

import { Container, Title, TextInput, Button, SimpleGrid, Box, Stack, Text, Paper, Group } from "@mantine/core";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchContent } from "@/services/tmdbApi";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { IconSearch } from "@tabler/icons-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get("q");
    if (searchQuery) {
      setQuery(searchQuery);
      handleSearch(searchQuery);
    }
  }, [searchParams]);

  const handleSearch = async (searchTerm?: string) => {
    const searchValue = searchTerm || query;
    if (!searchValue.trim()) return;

    setLoading(true);
    try {
      const data = await searchContent(searchValue);
      setResults(data);
      if (!searchTerm) {
        router.push(`/search?q=${encodeURIComponent(searchValue)}`);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Paper
        p={{ base: "md", sm: "xl" }}
        radius="lg"
        withBorder
        mb="xl"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Group gap="sm" style={{ flexWrap: "nowrap" }}>
          <TextInput
            placeholder="Search movies and TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={{ flex: 1 }}
            size="md"
            leftSection={<IconSearch size={20} />}
            styles={{
              input: {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.5)",
                },
                "&:focus": {
                  borderColor: "#0073e6",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                },
              },
            }}
          />
          <Button
            onClick={() => handleSearch()}
            loading={loading}
            size="md"
            style={{
              background: "linear-gradient(135deg, #0073e6 0%, #8c1aff 100%)",
              border: "none",
            }}
          >
            Search
          </Button>
        </Group>
      </Paper>

      {results && (
        <Stack gap="md">
          <Text size="xl" style={{ color: "white" }}>
            Found <strong>{results.total_results}</strong> results for "{query}"
          </Text>
          {results.results && results.results.length > 0 ? (
            <SimpleGrid
              cols={{ base: 2, xs: 2, sm: 3, md: 4, lg: 5 }}
              spacing={{ base: "md", sm: "lg", md: "xl" }}
            >
              {results.results.map((item: any) => {
                const mediaType = item.media_type || (item.title ? "movie" : "tv");
                return (
                  <MovieCard
                    key={item.id}
                    movie={{
                      ...item,
                      media_type: mediaType,
                    }}
                  />
                );
              })}
            </SimpleGrid>
          ) : (
            <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>No results found.</Text>
          )}
        </Stack>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <Box style={{ minHeight: "100vh", background: "#0a0a0a", paddingTop: "2rem" }}>
      <Container size="xl" py={{ base: "md", md: "xl" }}>
        <Title
          order={1}
          mb="xl"
          style={{
            color: "white",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #ffffff 0%, #0073e6 50%, #8c1aff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Search
        </Title>
        <Suspense fallback={<Text style={{ color: "white" }}>Loading...</Text>}>
          <SearchContent />
        </Suspense>
      </Container>
    </Box>
  );
}

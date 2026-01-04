"use client";

import { Box, Title, SimpleGrid, Container, Stack } from "@mantine/core";
import { useState, useEffect } from "react";
import { fetchRecommendations } from "@/services/tmdbApi";
import { MovieCard } from "../MovieCard/MovieCard";

interface RecommendationsProps {
  id: string;
  mediaType: string;
}

export function Recommendations({ id, mediaType }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await fetchRecommendations(mediaType, id);
        setRecommendations(data.results || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (id && mediaType) {
      loadRecommendations();
    }
  }, [id, mediaType]);

  if (recommendations.length === 0) return null;

  return (
    <Box mt="xl">
      <Title order={2} mb="lg" c="white">Recommended {mediaType === "movie" ? "Movies" : "TV Shows"}</Title>
      <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="xl">
        {recommendations.slice(0, 10).map((item) => (
          <MovieCard key={item.id} movie={{ ...item, media_type: mediaType }} />
        ))}
      </SimpleGrid>
    </Box>
  );
}


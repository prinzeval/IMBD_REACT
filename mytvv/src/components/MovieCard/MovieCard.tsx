"use client";

import { Card, Image, Text, Badge, Group, Stack, Rating, Box, Overlay } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IconPlayerPlay } from "@tabler/icons-react";
import { getMediaQuality } from "@/utils/mediaUtils";

interface MovieCardProps {
  movie: {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    backdrop_path?: string;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    media_type?: string;
    overview?: string;
    release_dates?: any;
  };
}

export function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayTitle = movie.title || movie.name || "Unknown";
  const releaseDate = movie.release_date || movie.first_air_date || "";
  const mediaType = movie.media_type || (movie.title ? "movie" : "tv");
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const handleClick = () => {
    router.push(`/${mediaType}/${movie.id}`);
  };

  const quality = getMediaQuality(movie);

  return (
    <Card
      padding={0}
      radius="md"
      style={{
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isHovered ? "scale(1.05) translateY(-8px)" : "scale(1)",
        boxShadow: isHovered
          ? "0 20px 40px rgba(0, 115, 230, 0.4)"
          : "0 4px 20px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
        background: "linear-gradient(135deg, rgba(0, 115, 230, 0.1) 0%, rgba(140, 26, 255, 0.1) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <Box style={{ position: "relative" }}>
        <Image
          src={posterUrl}
          alt={displayTitle}
          height={400}
          style={{
            objectFit: "cover",
            transition: "filter 0.3s ease",
            filter: isHovered ? "brightness(0.7)" : "brightness(1)",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/500x750?text=No+Image";
          }}
        />
        {isHovered && (
          <Overlay
            gradient="linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)"
            opacity={0.8}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              style={{
                background: "linear-gradient(135deg, #0073e6 0%, #8c1aff 100%)",
                borderRadius: "50%",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "scale(1.2)",
              }}
            >
              <IconPlayerPlay size={32} color="white" fill="white" />
            </Box>
          </Overlay>
        )}
      </Box>

      <Stack gap="xs" p="md" style={{ background: "rgba(10, 10, 10, 0.9)" }}>
        <Text
          fw={600}
          size="lg"
          lineClamp={2}
          style={{
            color: "white",
            minHeight: "3rem",
          }}
        >
          {displayTitle}
        </Text>

        <Group justify="space-between" align="center">
          <Group gap="xs">
            <Badge
              variant="gradient"
              gradient={{ from: mediaType === "movie" ? "blue" : "violet", to: "purple" }}
              size="sm"
            >
              {mediaType === "movie" ? "Movie" : "TV"}
            </Badge>
            {mounted && (
              <Badge 
                variant="filled" 
                color={quality === "HD" ? "green" : "orange"} 
                size="xs"
              >
                {quality}
              </Badge>
            )}
          </Group>
          {movie.vote_average && (
            <Group gap={4}>
              <Rating value={movie.vote_average / 2} fractions={2} readOnly size="sm" />
              <Text size="sm" c="dimmed" fw={500}>
                {movie.vote_average.toFixed(1)}
              </Text>
            </Group>
          )}
        </Group>

        {releaseDate && (
          <Text size="sm" c="dimmed" fw={500}>
            {new Date(releaseDate).getFullYear()}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

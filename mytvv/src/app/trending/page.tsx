"use client";

import { Container, Title, SimpleGrid, Tabs, Stack, Box, Paper } from "@mantine/core";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { useState, useEffect } from "react";
import { fetchTrendingAll } from "@/services/tmdbApi";

export default function TrendingPage() {
  const [trending, setTrending] = useState<any[]>([]);
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchTrendingAll(timeWindow);
        setTrending(data.results || []);
      } catch (error) {
        console.error("Error fetching trending:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeWindow]);

  return (
    <Box style={{ minHeight: "100vh", background: "#0a0a0a", paddingTop: "2rem" }}>
      <Container size="xl" py={{ base: "md", md: "xl" }}>
        <Stack gap={{ base: "lg", md: "xl" }}>
          <Paper
            p="md"
            radius="lg"
            withBorder
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              maxWidth: "400px",
              margin: "0 auto 2rem",
            }}
          >
            <Tabs value={timeWindow} onChange={(value) => setTimeWindow(value as "day" | "week")}>
              <Tabs.List grow>
                <Tabs.Tab
                  value="day"
                  style={{
                    color: timeWindow === "day" ? "white" : "rgba(255, 255, 255, 0.6)",
                    fontWeight: timeWindow === "day" ? 600 : 400,
                  }}
                >
                  Trending Today
                </Tabs.Tab>
                <Tabs.Tab
                  value="week"
                  style={{
                    color: timeWindow === "week" ? "white" : "rgba(255, 255, 255, 0.6)",
                    fontWeight: timeWindow === "week" ? 600 : 400,
                  }}
                >
                  This Week
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Paper>

          <Title
            order={1}
            style={{
              color: "white",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, #ff6b6b 0%, #ffd93d 50%, #6bcf7f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            mb={{ base: "lg", md: "xl" }}
          >
            Trending {timeWindow === "day" ? "Today" : "This Week"}
          </Title>

          <SimpleGrid
            cols={{ base: 2, xs: 2, sm: 3, md: 4, lg: 5 }}
            spacing={{ base: "md", sm: "lg", md: "xl" }}
          >
            {trending.map((item) => (
              <MovieCard
                key={item.id}
                movie={{
                  ...item,
                  media_type: item.media_type || (item.title ? "movie" : "tv"),
                }}
              />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

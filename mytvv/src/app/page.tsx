"use client";

import { Container, Title, Text, Button, Stack, TextInput, Group, Paper, SimpleGrid, Box } from "@mantine/core";
import { IconSearch, IconPlayerPlay, IconFlame } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularSearches = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

  const features = [
    { icon: "🎬", title: "Premium Content", description: "Exclusive movies and shows" },
    { icon: "⚡", title: "Instant Streaming", description: "Watch instantly in HD" },
    { icon: "🚀", title: "Ultra Fast", description: "No buffering, ever" },
    { icon: "📚", title: "Massive Library", description: "Thousands of titles" },
    { icon: "📱", title: "Any Device", description: "Watch anywhere" },
    { icon: "✨", title: "Premium Quality", description: "4K and HDR support" },
  ];

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <Box
        style={{
          position: "absolute",
          top: "-50%",
          right: "-20%",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(0, 115, 230, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "pulse 8s ease-in-out infinite",
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(140, 26, 255, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "pulse 10s ease-in-out infinite",
        }}
      />

      <Container size="xl" style={{ position: "relative", zIndex: 2 }} py={{ base: "md", md: "xl" }}>
        <Stack
          gap={{ base: "lg", md: "xl" }}
          align="center"
          style={{ minHeight: "100vh", justifyContent: "center", paddingTop: "2rem" }}
        >
          {/* Hero Content */}
          <Stack gap={{ base: "md", md: "lg" }} align="center" style={{ textAlign: "center", maxWidth: 900, width: "100%" }}>
            <Title
              order={1}
              fw={900}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #0073e6 50%, #8c1aff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: "1.1",
                marginBottom: "1rem",
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
              }}
            >
              Welcome to MyTV
            </Title>
            <Title
              order={2}
              fw={600}
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              }}
            >
              Premium Streaming Experience
            </Title>
            <Text
              size="lg"
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                maxWidth: 700,
                lineHeight: 1.6,
                padding: "0 1rem",
              }}
            >
              Discover the world's best movies and TV shows. Stream in stunning 4K quality with
              zero interruptions. Your premium entertainment destination.
            </Text>

            {/* Premium Search Section */}
            <Paper
              p={{ base: "md", sm: "lg", md: "xl" }}
              radius="lg"
              withBorder
              style={{
                width: "100%",
                maxWidth: 800,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                margin: "0 1rem",
              }}
            >
              <Stack gap={{ base: "sm", md: "md" }}>
                <Title order={3} ta="center" style={{ color: "white", fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}>
                  What would you like to watch?
                </Title>
                <form onSubmit={handleSearch}>
                  <Group gap="sm" style={{ flexWrap: "nowrap" }}>
                    <TextInput
                      placeholder="Search for movies, TV shows, actors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ flex: 1 }}
                      size="md"
                      leftSection={<IconSearch size={20} />}
                      styles={{
                        input: {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          color: "white",
                          fontSize: { base: "0.875rem", sm: "1rem", md: "1.1rem" },
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
                      type="submit"
                      size="md"
                      leftSection={<IconSearch size={20} />}
                      style={{
                        background: "linear-gradient(135deg, #0073e6 0%, #8c1aff 100%)",
                        border: "none",
                      }}
                    >
                      Search
                    </Button>
                  </Group>
                </form>
                <Group gap="xs" justify="center" style={{ flexWrap: "wrap" }}>
                  <Text size="sm" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    Popular:
                  </Text>
                  {popularSearches.map((tag) => (
                    <Button
                      key={tag}
                      variant="light"
                      size="xs"
                      onClick={() => setSearchQuery(tag)}
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "white",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      {tag}
                    </Button>
                  ))}
                </Group>
              </Stack>
            </Paper>

            {/* Action Buttons */}
            <Group gap="md" style={{ flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/home" style={{ textDecoration: "none" }}>
                <Button
                  size="lg"
                  leftSection={<IconPlayerPlay size={20} />}
                  style={{
                    background: "linear-gradient(135deg, #0073e6 0%, #8c1aff 100%)",
                    border: "none",
                    padding: "1rem 2rem",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  Start Watching
                </Button>
              </Link>
              <Link href="/trending" style={{ textDecoration: "none" }}>
                <Button
                  size="lg"
                  leftSection={<IconFlame size={20} />}
                  variant="outline"
                  styles={{
                    root: {
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      color: "white",
                      padding: "1rem 2rem",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.1)",
                      },
                    },
                  }}
                >
                  Trending Now
                </Button>
              </Link>
            </Group>
          </Stack>

          {/* Features Grid */}
          <Paper
            p={{ base: "md", sm: "lg", md: "xl" }}
            radius="lg"
            withBorder
            style={{
              width: "100%",
              maxWidth: "1200px",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              margin: "0 1rem",
            }}
          >
            <Title
              order={2}
              ta="center"
              mb={{ base: "lg", md: "xl" }}
              style={{ color: "white", fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
            >
              Why Choose MyTV?
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={{ base: "md", md: "xl" }}>
              {features.map((feature) => (
                <Paper
                  key={feature.title}
                  p={{ base: "md", md: "lg" }}
                  radius="md"
                  withBorder
                  style={{
                    textAlign: "center",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 115, 230, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Text style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }} mb="sm">
                    {feature.icon}
                  </Text>
                  <Title order={4} mb="xs" style={{ color: "white", fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>
                    {feature.title}
                  </Title>
                  <Text size="sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {feature.description}
                  </Text>
                </Paper>
              ))}
            </SimpleGrid>
          </Paper>
        </Stack>
      </Container>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </Box>
  );
}

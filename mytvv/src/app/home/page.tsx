"use client";

import { Container, Title, Text, Button, Group, Box, Stack, Paper, Tabs, Badge } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight, IconPlayerPlay, IconInfoCircle } from "@tabler/icons-react";
import { ContentRow } from "@/components/ContentRow/ContentRow";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { fetchTrendingAll, fetchPopularMovies, fetchPopularTV, fetchMovieDetails } from "@/services/tmdbApi";
import Autoplay from "embla-carousel-autoplay";
import { getMediaQuality } from "@/utils/mediaUtils";

export default function HomePage() {
  const router = useRouter();
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [trendingTV, setTrendingTV] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [popularTV, setPopularTV] = useState<any[]>([]);
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("week");
  const [heroItems, setHeroItems] = useState<any[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const autoplayPlugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingAll, popularMoviesData, popularTVData] = await Promise.all([
          fetchTrendingAll(timeWindow),
          fetchPopularMovies(),
          fetchPopularTV(),
        ]);

        const movies = trendingAll.results?.filter((item: any) => item.media_type === "movie" || item.title) || [];
        const tv = trendingAll.results?.filter((item: any) => item.media_type === "tv" || item.name) || [];

        setTrendingMovies(movies.map((m: any) => ({ ...m, media_type: "movie" })));
        setTrendingTV(tv.map((t: any) => ({ ...t, media_type: "tv" })));
        setPopularMovies(popularMoviesData.results?.map((m: any) => ({ ...m, media_type: "movie" })) || []);
        setPopularTV(popularTVData.results?.map((t: any) => ({ ...t, media_type: "tv" })) || []);

        const initialHeroContent = [
          ...movies.slice(0, 3),
          ...tv.slice(0, 2),
        ].filter((item: any) => item.backdrop_path);

        // Fetch detailed info for hero items to get accurate release_dates/quality
        const heroWithDetails = await Promise.all(
          initialHeroContent.map(async (item: any) => {
            const mediaType = item.media_type || (item.title ? "movie" : "tv");
            if (mediaType === "movie") {
              try {
                const details = await fetchMovieDetails(item.id.toString());
                return { ...item, ...details };
              } catch (e) {
                return item;
              }
            }
            return item;
          })
        );
        
        setHeroItems(heroWithDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [timeWindow]);

  const handlePlayClick = (item: any) => {
    const mediaType = item.media_type || (item.title ? "movie" : "tv");
    router.push(`/${mediaType}/${item.id}`);
  };

  return (
    <Box style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      {/* Professional Hero Carousel */}
      {heroItems.length > 0 && (
        <Box
          style={{
            position: "relative",
            height: "calc(100vh - 70px)",
            minHeight: "500px",
            maxHeight: "900px",
            marginBottom: "3rem",
          }}
        >
          <Carousel
            plugins={[autoplayPlugin.current]}
            onSlideChange={(index) => setActiveSlide(index)}
            previousControlIcon={
              <Box
                style={{
                  background: "rgba(0, 0, 0, 0.8)",
                  borderRadius: "50%",
                  padding: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "56px",
                  height: "56px",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                <IconChevronLeft size={28} color="white" strokeWidth={2.5} />
              </Box>
            }
            nextControlIcon={
              <Box
                style={{
                  background: "rgba(0, 0, 0, 0.8)",
                  borderRadius: "50%",
                  padding: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "56px",
                  height: "56px",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                <IconChevronRight size={28} color="white" strokeWidth={2.5} />
              </Box>
            }
            styles={{
              control: {
                border: "none",
                opacity: 0.9,
                zIndex: 10,
                "&:hover": {
                  opacity: 1,
                  background: "rgba(0, 115, 230, 0.9)",
                  borderColor: "#0073e6",
                  transform: "scale(1.1)",
                },
                "@media (max-width: 768px)": {
                  width: "48px",
                  height: "48px",
                  padding: "0.5rem",
                },
              },
              viewport: {
                height: "100%",
              },
            }}
          >
            {heroItems.map((item, index) => (
              <Carousel.Slide key={item.id}>
                <Box
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Professional Gradient Overlay */}
                  <Box
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(10,10,10,0.98) 100%)",
                    }}
                  />

                  {/* Content */}
                  <Container
                    size="xl"
                    style={{
                      position: "relative",
                      zIndex: 1,
                      height: "100%",
                      display: "flex",
                      alignItems: "flex-end",
                      paddingBottom: "4rem",
                    }}
                  >
                    <Stack
                      gap="xl"
                      style={{
                        maxWidth: "800px",
                        width: "100%",
                      }}
                    >
                      <Title
                        order={1}
                        fw={900}
                        style={{
                          color: "white",
                          lineHeight: "1.1",
                          textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
                          fontSize: "clamp(2rem, 5vw, 4.5rem)",
                        }}
                      >
                        {item.title || item.name}
                      </Title>
                      <Group gap="sm">
                        {mounted && (
                          <Badge 
                            color={getMediaQuality(item) === "HD" ? "green" : "orange"}
                            size="lg"
                            variant="filled"
                          >
                            {getMediaQuality(item)}
                          </Badge>
                        )}
                        {item.vote_average && (
                          <Badge color="yellow" size="lg" variant="outline">
                            ⭐ {item.vote_average.toFixed(1)}
                          </Badge>
                        )}
                      </Group>
                      <Text
                        size="xl"
                        style={{
                          color: "rgba(255, 255, 255, 0.95)",
                          lineHeight: 1.6,
                          lineClamp: 3,
                          maxWidth: "700px",
                        }}
                      >
                        {item.overview}
                      </Text>
                      <Group gap="md" style={{ flexWrap: "wrap" }}>
                        <Button
                          size="xl"
                          leftSection={<IconPlayerPlay size={20} fill="white" />}
                          onClick={() => handlePlayClick(item)}
                          style={{
                            background: "linear-gradient(135deg, #0073e6 0%, #8c1aff 100%)",
                            border: "none",
                            padding: "0.875rem 2rem",
                            fontSize: "1rem",
                            fontWeight: 600,
                          }}
                        >
                          Play Now
                        </Button>
                        <Button
                          size="xl"
                          leftSection={<IconInfoCircle size={20} />}
                          onClick={() => handlePlayClick(item)}
                          variant="outline"
                          style={{
                            border: "2px solid rgba(255, 255, 255, 0.6)",
                            color: "white",
                            padding: "0.875rem 2rem",
                            fontSize: "1rem",
                            fontWeight: 600,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          More Info
                        </Button>
                      </Group>
                    </Stack>
                  </Container>
                </Box>
              </Carousel.Slide>
            ))}
          </Carousel>

          {/* Professional Carousel Indicators */}
          {heroItems.length > 1 && (
            <Box
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              {heroItems.map((_, index) => (
                <span
                  key={index}
                  onClick={() => {
                    // This would need embla API to work properly
                  }}
                  onMouseEnter={(e) => {
                    if (activeSlide !== index) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.6)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSlide !== index) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)";
                    }
                  }}
                  style={{
                    width: activeSlide === index ? "40px" : "12px",
                    height: "12px",
                    borderRadius: "6px",
                    display: "inline-block",
                    background:
                      activeSlide === index
                        ? "linear-gradient(135deg, #0073e6 0%, #8c1aff 100%)"
                        : "rgba(255, 255, 255, 0.4)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: activeSlide === index ? "2px solid rgba(255, 255, 255, 0.5)" : "none",
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      )}

      <Container size="xl" py={{ base: "md", sm: "lg", md: "xl" }}>
        {/* Premium Time Window Toggle */}
        <Paper
          p="md"
          radius="lg"
          withBorder
          mb="xl"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            maxWidth: "400px",
            margin: "0 auto 3rem",
          }}
        >
          <Tabs value={timeWindow} onChange={(value) => setTimeWindow(value as "day" | "week")}>
            <Tabs.List grow>
              <Tabs.Tab
                value="week"
                style={{
                  color: timeWindow === "week" ? "white" : "rgba(255, 255, 255, 0.6)",
                  fontWeight: timeWindow === "week" ? 600 : 400,
                }}
              >
                This Week
              </Tabs.Tab>
              <Tabs.Tab
                value="day"
                style={{
                  color: timeWindow === "day" ? "white" : "rgba(255, 255, 255, 0.6)",
                  fontWeight: timeWindow === "day" ? 600 : 400,
                }}
              >
                Today
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Paper>

        {/* Content Rows */}
        <Stack gap="xl">
          {trendingMovies.length > 0 && (
            <ContentRow title="Trending Movies" items={trendingMovies} />
          )}
          {trendingTV.length > 0 && (
            <ContentRow title="Trending TV Series" items={trendingTV} />
          )}
          {popularMovies.length > 0 && (
            <ContentRow title="Popular Movies" items={popularMovies} />
          )}
          {popularTV.length > 0 && (
            <ContentRow title="Popular TV Series" items={popularTV} />
          )}
        </Stack>
      </Container>
    </Box>
  );
}

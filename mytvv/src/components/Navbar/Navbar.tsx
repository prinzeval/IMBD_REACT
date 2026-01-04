"use client";

import { Group, Button, TextInput, Burger, Drawer, Stack, Box, Container, Menu, Text, Divider, UnstyledButton, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconSearch, IconChevronDown, IconWorld } from "@tabler/icons-react";
import { fetchMovieGenres, fetchTVGenres } from "@/services/tmdbApi";
import { useCountry } from "@/contexts/CountryContext";

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

export function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movieGenres, setMovieGenres] = useState<any[]>([]);
  const [tvGenres, setTvGenres] = useState<any[]>([]);
  const { selectedCountry, updateCountry } = useCountry();
  const router = useRouter();

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
      }
    };
    loadGenres();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      close();
    }
  };

  const selectedCountryData = countries.find(c => c.value === selectedCountry) || countries[0];

  return (
    <Box
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(10, 10, 10, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container size="xl">
        <Group h={70} px="md" justify="space-between">
          <Group gap="xl">
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" color="white" />
            <Link href="/" style={{ textDecoration: "none" }}>
              <Box
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #0073e6 0%, #8c1aff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                MyTV
              </Box>
            </Link>
          </Group>

          <Group visibleFrom="md" gap="lg">
            <Link href="/home" style={{ textDecoration: "none" }}>
              <Button variant="subtle" color="gray" style={{ color: "white" }}>
                Home
              </Button>
            </Link>
            <Link href="/movies" style={{ textDecoration: "none" }}>
              <Button variant="subtle" color="gray" style={{ color: "white" }}>
                Movies
              </Button>
            </Link>
            <Link href="/tv-shows" style={{ textDecoration: "none" }}>
              <Button variant="subtle" color="gray" style={{ color: "white" }}>
                TV Shows
              </Button>
            </Link>
            <Link href="/trending" style={{ textDecoration: "none" }}>
              <Button variant="subtle" color="gray" style={{ color: "white" }}>
                Trending
              </Button>
            </Link>

            {/* Genres Menu */}
            <Menu shadow="md" width={400} trigger="hover" openDelay={100} closeDelay={400}>
              <Menu.Target>
                <Button 
                  component={Link} 
                  href="/genres" 
                  variant="subtle" 
                  color="gray" 
                  style={{ color: "white" }} 
                  rightSection={<IconChevronDown size={16} />}
                >
                  Genres
                </Button>
              </Menu.Target>

              <Menu.Dropdown p="md" style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Group align="flex-start" grow>
                  <Stack gap="xs">
                    <Text fw={700} size="sm" c="dimmed">MOVIES</Text>
                    <SimpleGrid cols={2} spacing="xs">
                      {movieGenres.map(genre => (
                        <Link key={genre.id} href={`/genre/movie/${genre.id}`} style={{ textDecoration: 'none' }}>
                          <Text size="sm" c="white" style={{ '&:hover': { color: '#0073e6' } }}>{genre.name}</Text>
                        </Link>
                      ))}
                    </SimpleGrid>
                  </Stack>
                  <Divider orientation="vertical" />
                  <Stack gap="xs">
                    <Text fw={700} size="sm" c="dimmed">TV SHOWS</Text>
                    <SimpleGrid cols={2} spacing="xs">
                      {tvGenres.map(genre => (
                        <Link key={genre.id} href={`/genre/tv/${genre.id}`} style={{ textDecoration: 'none' }}>
                          <Text size="sm" c="white" style={{ '&:hover': { color: '#8c1aff' } }}>{genre.name}</Text>
                        </Link>
                      ))}
                    </SimpleGrid>
                  </Stack>
                </Group>
              </Menu.Dropdown>
            </Menu>

            {/* Country Selector */}
            <Menu shadow="md" width={200} trigger="hover">
              <Menu.Target>
                <Button 
                  component={Link} 
                  href="/country" 
                  variant="subtle" 
                  color="gray" 
                  style={{ color: "white" }} 
                  leftSection={<span>{selectedCountryData.label.split(' ')[0]}</span>}
                >
                  Country
                </Button>
              </Menu.Target>
              <Menu.Dropdown style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', maxHeight: 400, overflowY: 'auto' }}>
                {countries.map(country => (
                  <Menu.Item 
                    key={country.value} 
                    onClick={() => updateCountry(country.value)}
                    style={{ color: 'white' }}
                  >
                    {country.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Group gap="sm">
            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{ width: "250px" }}
              leftSection={<IconSearch size={18} />}
              visibleFrom="sm"
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
                  },
                },
              }}
            />
            <Button
              onClick={handleSearch}
              size="sm"
              style={{
                background: "linear-gradient(135deg, #0073e6 0%, #8c1aff 100%)",
                border: "none",
              }}
              hiddenFrom="sm"
            >
              <IconSearch size={18} />
            </Button>
          </Group>
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Box
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #0073e6 0%, #8c1aff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MyTV
          </Box>
        }
        size="xs"
        styles={{
          content: {
            backgroundColor: "#0a0a0a",
          },
          header: {
            backgroundColor: "#0a0a0a",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <Stack gap="xs">
          <Link href="/home" style={{ textDecoration: "none" }} onClick={close}>
            <Button variant="subtle" fullWidth style={{ color: "white", justifyContent: "flex-start" }}>
              Home
            </Button>
          </Link>
          <Link href="/movies" style={{ textDecoration: "none" }} onClick={close}>
            <Button variant="subtle" fullWidth style={{ color: "white", justifyContent: "flex-start" }}>
              Movies
            </Button>
          </Link>
          <Link href="/tv-shows" style={{ textDecoration: "none" }} onClick={close}>
            <Button variant="subtle" fullWidth style={{ color: "white", justifyContent: "flex-start" }}>
              TV Shows
            </Button>
          </Link>
          <Link href="/trending" style={{ textDecoration: "none" }} onClick={close}>
            <Button variant="subtle" fullWidth style={{ color: "white", justifyContent: "flex-start" }}>
              Trending
            </Button>
          </Link>
          <Link href="/country" style={{ textDecoration: "none" }} onClick={close}>
            <Button variant="subtle" fullWidth style={{ color: "white", justifyContent: "flex-start" }}>
              Country
            </Button>
          </Link>
        </Stack>
      </Drawer>
    </Box>
  );
}

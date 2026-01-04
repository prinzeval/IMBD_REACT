"use client";

import { Title, Box } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { MovieCard } from "../MovieCard/MovieCard";

interface ContentRowProps {
  title: string;
  items: any[];
  autoplay?: boolean;
}

export function ContentRow({ title, items, autoplay = false }: ContentRowProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Box mb={{ base: "xl", md: "2xl" }}>
      <Title
        order={2}
        mb="lg"
        style={{
          color: "white",
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          fontWeight: 700,
          marginBottom: "1.5rem",
        }}
      >
        {title}
      </Title>

      <Carousel
        slideSize={{ base: "45%", xs: "40%", sm: "33%", md: "25%", lg: "20%" }}
        slideGap={{ base: "xs", sm: "sm", md: "md" }}
        previousControlIcon={
          <Box
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              borderRadius: "50%",
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
            className="carousel-control"
          >
            <IconChevronLeft size={20} color="white" strokeWidth={2} />
          </Box>
        }
        nextControlIcon={
          <Box
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              borderRadius: "50%",
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
            className="carousel-control"
          >
            <IconChevronRight size={20} color="white" strokeWidth={2} />
          </Box>
        }
        styles={{
          control: {
            border: "none",
            opacity: 0.9,
            "&:hover": {
              opacity: 1,
              background: "rgba(0, 115, 230, 0.9)",
              borderColor: "#0073e6",
              transform: "scale(1.1)",
            },
            "@media (max-width: 768px)": {
              width: "36px",
              height: "36px",
            },
          },
          viewport: {
            paddingBottom: "0.5rem",
          },
        }}
      >
        {items.map((item) => (
          <Carousel.Slide key={item.id}>
            <MovieCard movie={item} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}

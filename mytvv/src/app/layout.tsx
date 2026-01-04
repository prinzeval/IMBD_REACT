import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { theme } from "@/theme/theme";
import { CountryProvider } from "@/contexts/CountryContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyTV - Premium Streaming",
  description: "Premium movies and TV shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}
      >
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications />
          <CountryProvider>
            <Navbar />
            {children}
          </CountryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

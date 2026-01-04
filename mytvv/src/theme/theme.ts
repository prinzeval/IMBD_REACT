import { createTheme, MantineColorsTuple } from '@mantine/core';

const premiumBlue: MantineColorsTuple = [
  '#e6f2ff',
  '#b3d9ff',
  '#80bfff',
  '#4da6ff',
  '#1a8cff',
  '#0073e6',
  '#005bb3',
  '#004280',
  '#002a4d',
  '#00111a',
];

const premiumPurple: MantineColorsTuple = [
  '#f3e8ff',
  '#d9b3ff',
  '#bf80ff',
  '#a64dff',
  '#8c1aff',
  '#7300e6',
  '#5a00b3',
  '#400080',
  '#27004d',
  '#0d001a',
];

export const theme = createTheme({
  primaryColor: 'premiumBlue',
  colors: {
    premiumBlue,
    premiumPurple,
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  headings: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sizes: {
      h1: { fontSize: '3.5rem', lineHeight: '1.1', fontWeight: '700' },
      h2: { fontSize: '2.5rem', lineHeight: '1.2', fontWeight: '700' },
      h3: { fontSize: '2rem', lineHeight: '1.3', fontWeight: '600' },
    },
  },
  defaultRadius: 'md',
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  shadows: {
    md: '0 4px 20px rgba(0, 0, 0, 0.5)',
    xl: '0 8px 40px rgba(0, 0, 0, 0.6)',
  },
});






'use client';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ReactNode, useMemo } from 'react';

const themeOptions = createTheme({
  palette: {
    primary: {
      main: '#7c3aed'
    },
    secondary: {
      main: '#0ea5e9'
    },
    background: {
      default: '#f8fafc'
    }
  },
  shape: {
    borderRadius: 12
  }
});

export default function MUIThemeProvider({ children }: { children: ReactNode }) {
  const theme = useMemo(() => themeOptions, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

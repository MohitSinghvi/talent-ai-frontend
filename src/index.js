import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a modern custom theme with updated palette and typography
const theme = createTheme({
  palette: {
    mode: 'light', // Try 'dark' for a dark theme.
    primary: {
      main: '#0D47A1',  // A deep blue
    },
    secondary: {
      main: '#F57C00',  // A warm orange
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      marginBottom: '1rem'
    },
    h5: {
      fontWeight: 500,
      marginBottom: '0.75rem'
    }
  },
  components: {
    // Custom styles for MUI components
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Provides a modern CSS reset */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0'
          },
          secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2'
          },
          error: {
            main: '#d32f2f'
          },
          success: {
            main: '#2e7d32'
          },
          background: {
            default: isDarkMode ? '#121212' : '#f5f5f5',
            paper: isDarkMode ? '#1e1e1e' : '#ffffff'
          }
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 600
          },
          h6: {
            fontWeight: 500
          }
        },
        shape: {
          borderRadius: 8
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 500
              }
            }
          },
          MuiTextField: {
            defaultProps: {
              variant: 'outlined',
              size: 'small'
            }
          }
        }
      }),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

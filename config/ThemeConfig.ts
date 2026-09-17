"use client";
import { createTheme } from "@mui/material/styles";

//TODO: Corrigir a cor secundaria
declare module "@mui/material/styles" {
  interface PaletteOptions {
    sidebarPalette?: {
      background: string;
      text: string;
      action: {
        hover: string;
        selected: string;
      };
    };
  }
}

const ThemeConfig = createTheme({
  cssVariables: {
    colorSchemeSelector: "class"
  },
  typography: {
    fontFamily: "Inter, Arial, Helvetica, sans-serif"
  },
  shape: {
    borderRadius: 6 // Changes default from 4px to 8px
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    }
  },

  colorSchemes: {
    light: {
      palette: {
        sidebarPalette: {
          background: "#1b253b",
          text: "#ffffff",
          action: {
            hover: "rgba(255, 255, 255, 0.07)",
            selected: "rgba(255, 255, 255, 0.1)"
          }
        },
        primary: {
          light: "#556f8b",
          main: "#2B4C6F",
          dark: "#1e354d"
        },
        secondary: {
          light: "#ff7961",
          main: "#f44336",
          dark: "#ba000d"
        },
        background: { default: "#f2f4f7", paper: "#ffffff" }
      }
    },
    dark: {
      palette: {
        sidebarPalette: {
          background: "#0F172A",
          text: "#ffffff",
          action: {
            hover: "rgba(255, 255, 255, 0.07)",
            selected: "rgba(255, 255, 255, 0.1)"
          }
        },
        primary: {
          light: "#556f8b",
          main: "#2B4C6F",
          dark: "#1e354d"
        },
        secondary: {
          light: "#ff7961",
          main: "#f44336",
          dark: "#ba000d"
        },
        background: { default: "#151f35", paper: "#18243d" }
      }
    }
  }
});

export default ThemeConfig;

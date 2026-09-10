"use client";
import { createTheme } from "@mui/material/styles";

//TODO: Corrigir a cor secundaria

const ThemeConfig = createTheme({
  typography: {
    fontFamily: "Inter, Arial, Helvetica, sans-serif"
  },
  colorSchemes: {
    light: {
      palette: {
        action: {
          hover: "rgba(0, 0, 0, 0.04)",
          selected: "rgba(0, 0, 0, 0.08)"
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
        background: { default: "#f5f5f5", paper: "#ffffff" }
      }
    },
    dark: {
      palette: {
        primary: {
          light: "#556f8b",
          main: "#2B4C6F",
          dark: "#1e354d"
        },
        secondary: {
          light: "#ff7961",
          main: "#f44336",
          dark: "#ba000d"
        }
      }
    }
  }
});

export default ThemeConfig;

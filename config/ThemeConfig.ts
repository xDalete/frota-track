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
    borderRadius: 6
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600
        }
      }
    },
    MuiCard: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  },

  colorSchemes: {
    light: {
      palette: {
        sidebarPalette: {
          background: "hsla(212, 50%, 18%, 1)",
          text: "hsla(0, 0%, 100%, 1)",
          action: {
            hover: "hsla(0, 0%, 100%, 0.07)",
            selected: "hsla(0, 0%, 100%, 0.1)"
          }
        },
        primary: {
          light: "hsla(212, 50%, 45%, 1)",
          main: "hsla(212, 50%, 35%, 1)",
          dark: "hsla(212, 50%, 25%, 1)"
        },
        secondary: {
          light: "hsla(10, 100%, 69%, 1)",
          main: "hsla(3, 90%, 58%, 1)",
          dark: "hsla(356, 100%, 37%, 1)"
        },
        background: { default: "hsla(212, 10%, 92%, 1)", paper: "hsla(212, 10%, 97%, 1)" }
      }
    },
    dark: {
      palette: {
        text: {
          primary: "hsla(0, 0%, 100%, 1)",
          secondary: "hsla(0, 0%, 100%, 0.7)",
          disabled: "hsla(0, 0%, 100%, 0.5)"
        },
        sidebarPalette: {
          background: "hsla(212, 50%, 10%, 1)",
          text: "hsla(0, 0%, 100%, 1)",
          action: {
            hover: "hsla(0, 0%, 100%, 0.07)",
            selected: "hsla(0, 0%, 100%, 0.1)"
          }
        },
        primary: {
          light: "hsla(212, 50%, 45%, 1)",
          main: "hsla(212, 50%, 35%, 1)",
          dark: "hsla(212, 50%, 25%, 1)"
        },
        secondary: {
          light: "hsla(10, 100%, 69%, 1)",
          main: "hsla(3, 90%, 58%, 1)",
          dark: "hsla(356, 100%, 37%, 1)"
        },
        background: { default: "hsla(212, 50%, 13%, 1)", paper: "hsla(212, 50%, 15%, 1)" }
      }
    }
  }
});

export default ThemeConfig;

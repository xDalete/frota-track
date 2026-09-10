"use client";

import { ThemeProvider } from "@mui/material/styles";
import ThemeConfig from "@/config/ThemeConfig";

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={ThemeConfig}>
      {children}
    </ThemeProvider>
  );
}

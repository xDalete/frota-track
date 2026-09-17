import { ThemeProvider } from "@mui/material/styles";
import ThemeConfig from "@/config/ThemeConfig";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true, key: "css" }}>
      <ThemeProvider theme={ThemeConfig} defaultMode="system">
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

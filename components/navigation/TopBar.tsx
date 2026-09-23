import { Box, IconButton, useColorScheme } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import UserMenu from "../user/UserMenu";

export default function TopBar() {
  const { mode, setMode } = useColorScheme();

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        flexDirection: "row",
        padding: 2,
        backgroundColor: "background.paper",
        color: "text.primary",
        height: "80px",
        alignItems: "center",
        flexShrink: 0,
        justifyContent: "flex-end",
        gap: 2
      }}
    >
      <IconButton color="primary" onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        {mode === "light" ? <LightModeOutlined /> : <DarkModeOutlined />}
      </IconButton>
      <UserMenu />
    </Box>
  );
}

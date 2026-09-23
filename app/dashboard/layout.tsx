"use client";
import Sidebar from "@/components/navigation/SideBar";
import TopBar from "@/components/navigation/TopBar";
import { Box } from "@mui/material";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <Box>
        <Sidebar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "background.default",
          color: "text.primary"
        }}
      >
        <TopBar />
        <Box sx={{ padding: 2, overflowY: "scroll" }}>
          <Box>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}

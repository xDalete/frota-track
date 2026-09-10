"use client";
import Sidebar from "@/components/navigation/SideBar";
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
      <Box sx={{ flex: 1, overflowY: "auto", padding: 2 }}>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}

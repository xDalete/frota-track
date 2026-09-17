"use client";
import { Box, Button, Link } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <Link href="/dashboard">
        <Button variant="contained">ir para o dashboard</Button>
      </Link>
      <Link href="/login">
        <Button variant="contained">ir para o login</Button>
      </Link>
    </Box>
  );
}

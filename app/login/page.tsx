"use client";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

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
      <Button variant="contained" color="primary" onClick={() => signIn("github")}>
        Logar com GitHub
      </Button>
    </Box>
  );
}

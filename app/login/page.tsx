"use client";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
        Logar com GitHub
      </Button>
    </div>
  );
}

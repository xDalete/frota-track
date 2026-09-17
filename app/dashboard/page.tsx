"use client";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      <Typography variant="h1" sx={{ mb: 2, fontSize: "2.5rem", fontWeight: "bold" }}>
        Dashboard
      </Typography>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "start" }}>
            <Button variant="contained" color="primary" onClick={() => router.push("/login")}>
              Ir para Login
            </Button>
            {session && (
              <>
                <Button variant="contained" onClick={() => signOut()}>
                  Logout
                </Button>
                <Typography variant="body1">User: {session?.user?.name}</Typography>
                <Typography variant="body1">Email: {session?.user?.email}</Typography>
                {session?.user?.image && <Image src={session?.user?.image} alt="User Image" width={100} height={100} />}
              </>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {Array.from({ length: 100 }, (_, i) => (
              <Button variant="contained" color="primary" key={i}>
                Teste
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

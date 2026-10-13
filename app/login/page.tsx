"use client";

import { Box, Button, Card, CardContent, Divider, Link, Typography, useColorScheme } from "@mui/material";
import { signIn } from "next-auth/react";
import LoginForm from "@/components/login/LoginForm";
import { GitHub, Google } from "@mui/icons-material";

export default function SignInPage() {
  const { mode } = useColorScheme();

  // TODO: integrar a recuperação de senha, o reset de senha e a autenticação real do backend quando a API estiver pronta.
  const handleGithubLogin = () => {
    signIn("github", { redirectTo: "/dashboard" });
  };

  const handleGoogleLogin = () => {
    signIn("google", { redirectTo: "/dashboard" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage:
          mode === "dark"
            ? "radial-gradient(hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))"
            : "radial-gradient(hsl(210, 50%, 85%), hsl(0, 0%, 100%))"
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "450px"
        }}
      >
        <CardContent sx={{ padding: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500, fontSize: "2rem", width: "100%" }}>
            Entrar
          </Typography>

          <LoginForm afterSubmit={() => {}} />

          <Link href="/" variant="body2" sx={{ alignSelf: "center" }}>
            Esqueceu sua senha?
          </Link>

          <Divider>ou</Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleGithubLogin}
              startIcon={<GitHub />}
              type="submit"
            >
              Entrar com GitHub
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleGoogleLogin}
              startIcon={<Google />}
              type="submit"
            >
              Entrar com Google
            </Button>

            <Typography sx={{ textAlign: "center" }}>
              Não tem uma conta?{" "}
              <Link href="/" variant="body2" sx={{ alignSelf: "center" }}>
                Cadastre-se
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

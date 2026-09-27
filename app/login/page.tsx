"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signIn } from "next-auth/react";
import { loginSchema, type LoginFormValues } from "./validation";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px"
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px"
  })
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4)
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    inset: 0,
    zIndex: -1,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))"
    })
  }
}));

export default function SignInPage() {
  const initialValues: LoginFormValues = { email: "", password: "" };
  const [formValues, setFormValues] = React.useState<LoginFormValues>(initialValues);
  const [formErrors, setFormErrors] = React.useState<Partial<Record<keyof LoginFormValues, string>>>({});

  const updateField = (field: keyof LoginFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    const nextValues = { ...formValues, [field]: nextValue };

    setFormValues(nextValues);

    const parsed = loginSchema.safeParse(nextValues);
    if (parsed.success) {
      setFormErrors((current) => ({ ...current, [field]: undefined }));
      return;
    }

    const nextError = parsed.error.flatten().fieldErrors[field]?.[0];
    setFormErrors((current) => ({ ...current, [field]: nextError }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = loginSchema.safeParse(formValues);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      setFormErrors({
        email: errors.email?.[0],
        password: errors.password?.[0]
      });
      return;
    }

    console.log(parsed.data);
  };

  // TODO: integrar a recuperação de senha, o reset de senha e a autenticação real do backend quando a API estiver pronta.
  const handleGithubLogin = () => {
    signIn("github", { redirectTo: "/dashboard" });
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" sx={{ justifyContent: "space-between" }}>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={Boolean(formErrors.email)}
                helperText={formErrors.email || ""}
                id="email"
                type="email"
                name="email"
                placeholder="email@exemplo.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                value={formValues.email}
                onChange={updateField("email")}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <TextField
                error={Boolean(formErrors.password)}
                helperText={formErrors.password || ""}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                value={formValues.password}
                onChange={updateField("password")}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar-me"
            />

            <Button type="submit" fullWidth variant="contained">
              Login
            </Button>

            <Link variant="body2" sx={{ alignSelf: "center" }}>
              Esqueceu sua senha?
            </Link>
          </Box>

          <Divider>ou</Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleGithubLogin}
              startIcon={<GitHubIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: "primary.main",
                color: "common.white",
                "&:hover": {
                  backgroundColor: "primary.dark"
                }
              }}
            >
              Entrar com GitHub
            </Button>
            
            <Typography sx={{ textAlign: "center" }}>
              Não tem uma conta? {" "}
              <Link href="/" variant="body2" sx={{ alignSelf: "center" }}>
                Cadastre-se
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}

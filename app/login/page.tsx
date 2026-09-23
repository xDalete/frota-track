import { signIn } from "@/auth";
import { Box, Button } from "@mui/material";

export default function LoginPage() {
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
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <Button type="submit" variant="contained" color="primary">
          Logar com GitHub
        </Button>
      </form>
    </Box>
  );
}

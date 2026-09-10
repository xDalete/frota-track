import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Typography variant="h4">Dashboard</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {Array.from({ length: 100 }, (_, i) => (
          <Button variant="contained" color="primary" key={i}>
            Teste
          </Button>
        ))}
      </Box>
    </Box>
  );
}

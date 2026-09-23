"use client";
import MetricsCard from "@/components/metrics/MetricsCard";
import { AssignmentOutlined, PlaceOutlined, SettingsOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      <Typography variant="h1" sx={{ mb: 2, fontSize: "2.5rem", fontWeight: "bold" }}>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <MetricsCard name="Em Viagem" value="5" icon={<PlaceOutlined />} color="#006DFE" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <MetricsCard name="Em Manutenção" value="3" icon={<SettingsOutlined />} color="#FE0000" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <MetricsCard name="Viagens" value="47" icon={<AssignmentOutlined />} color="#001933" />
        </Grid>
      </Grid>
      <Card>
        <CardHeader title="Viagens em Andamento" />
        <CardContent>
          <Typography variant="body1">Aqui você pode ver todas as viagens que estão em andamento.</Typography>
          
        </CardContent>
      </Card>
    </Box>
  );
}

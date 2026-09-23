"use client";
import MetricsCard from "@/components/metrics/MetricsCard";
import ViagensTable from "@/components/viagens/ViagensTable";
import { CategoriaHabilitacao, StatusViagem, TipoVeiculo, Viagem } from "@/types/Viagem";
import { AssignmentOutlined, PlaceOutlined, SettingsOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, colors, Grid, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [viagens, setViagens] = useState<Viagem[]>([
    {
      id: 1,
      motorista: {
        nome: "João Silva",
        categoria: CategoriaHabilitacao.B,
        documento: "123456789",
        email: "joao.silva@example.com",
        id: 1,
        telefone: "11999999999"
      },
      veiculo: {
        id: 1,
        placa: "ABC-1234",
        modelo: "Fiat Uno",
        ano: 2020,
        capacidade: 4,
        tipo: TipoVeiculo.CARRO,
        habilitacaoNecessaria: CategoriaHabilitacao.B
      },
      status: StatusViagem.EM_ANDAMENTO,
      dataSaida: "2023-06-01T08:00:00Z",
      dataChegada: "2023-06-01T12:00:00Z",
      origem: "São Paulo",
      destino: "Rio de Janeiro",
      finalidade: "Transporte de passageiros",
      previsaoChegada: "2023-06-01T12:00:00Z"
    }
  ]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      <Typography variant="h1" sx={{ mb: 2, fontSize: "2.5rem", fontWeight: "bold" }}>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <MetricsCard name="Em Viagem" value="5" icon={<PlaceOutlined />} color={colors.blue[500]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <MetricsCard name="Em Manutenção" value="3" icon={<SettingsOutlined />} color={colors.red[500]} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <MetricsCard name="Viagens" value="47" icon={<AssignmentOutlined />} color={colors.grey[500]} />
        </Grid>
      </Grid>
      <Card>
        <CardHeader title="Viagens em Andamento" />
        <CardContent>
          <ViagensTable viagens={viagens} />
        </CardContent>
      </Card>
    </Box>
  );
}

"use client";

import { useState } from "react";
import { BuildOutlined, WarningAmberOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CustomModal from "@/components/common/CustomModal";
import ManutencaoForm from "@/components/manutencao/ManutencaoForm";
import ManutencoesTable from "@/components/manutencao/ManutencoesTable";
import { Manutencao, StatusManutencao, TipoManutencao, TipoVeiculo } from "@/types/ObjectTypes";

const initialManutencoes: Manutencao[] = [
  {
    id: 1,
    placa: "ABC-1D23",
    tipo: TipoVeiculo.CARRO,
    tipoManutencao: TipoManutencao.PREVENTIVA,
    descricao: "Troca de óleo, pastilhas de freio e filtros gerais.",
    dataInicio: "2024-05-14",
    dataFim: "2024-05-14",
    status: StatusManutencao.CONCLUIDO
  },
  {
    id: 2,
    placa: "XYZ-9F87",
    tipo: TipoVeiculo.CARRO,
    tipoManutencao: TipoManutencao.CORRETIVA,
    descricao: "Reparo no sistema elétrico de partida e alternador.",
    dataInicio: "2024-05-20",
    dataFim: "2024-05-22",
    status: StatusManutencao.EM_ANDAMENTO
  },
  {
    id: 3,
    placa: "DEF-5G64",
    tipo: TipoVeiculo.CAMINHAO,
    tipoManutencao: TipoManutencao.PREVENTIVA,
    descricao: "Alinhamento, balanceamento e rodízio dos pneus.",
    dataInicio: "2024-05-24",
    dataFim: "",
    status: StatusManutencao.AGENDADA
  },
  {
    id: 4,
    placa: "MNO-3H21",
    tipo: TipoVeiculo.CAMINHAO,
    tipoManutencao: TipoManutencao.CORRETIVA,
    descricao: "Substituição da correia dentada e tensor hidráulico.",
    dataInicio: "2024-05-12",
    dataFim: "2024-05-13",
    status: StatusManutencao.CONCLUIDO
  },
  {
    id: 5,
    placa: "KLT-8Y42",
    tipo: TipoVeiculo.ONIBUS,
    tipoManutencao: TipoManutencao.PREVENTIVA,
    descricao: "Revisão periódica de suspensão e amortecedores.",
    dataInicio: "2024-05-25",
    dataFim: "",
    status: StatusManutencao.AGENDADA
  }
];

export default function ManutencoesPage() {
  const [manutencoes, setManutencoes] = useState(initialManutencoes);
  const [filtroTipo, setFiltroTipo] = useState<"todas" | TipoManutencao>("todas");
  const [modalAberto, setModalAberto] = useState(false);
  const manutencoesFiltradas =
    filtroTipo === "todas" ? manutencoes : manutencoes.filter(item => item.tipoManutencao === filtroTipo);
  const manutencoesEmAberto = manutencoes.filter(item => item.status !== StatusManutencao.CONCLUIDO);

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2
        }}
      >
        <Box component="h1" sx={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.3, m: 0 }}>
          Manutenções
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <ToggleButtonGroup
            size="small"
            exclusive
            value={filtroTipo}
            aria-label="Filtrar manutenções por tipo"
            onChange={(_, value: "todas" | TipoManutencao | null) => value && setFiltroTipo(value)}
          >
            <ToggleButton value="todas">Todas</ToggleButton>
            <ToggleButton value={TipoManutencao.PREVENTIVA}>Preventivas</ToggleButton>
            <ToggleButton value={TipoManutencao.CORRETIVA}>Corretivas</ToggleButton>
          </ToggleButtonGroup>
          <Button variant="contained" startIcon={<BuildOutlined />} onClick={() => setModalAberto(true)}>
            Registrar Manutenção
          </Button>
        </Box>
      </Box>

      <Card variant="outlined">
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <ManutencoesTable
            dataSource={manutencoesFiltradas}
            onUpdate={manutencao => {
              setManutencoes(current => current.map(item => (item.id === manutencao.id ? manutencao : item)));
            }}
            onDelete={manutencaoId => {
              setManutencoes(current => current.filter(item => item.id !== manutencaoId));
            }}
          />
        </CardContent>
      </Card>

      <Alert
        severity="warning"
        icon={<WarningAmberOutlined />}
        sx={theme => ({
          alignItems: "center",
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.2 : 0.08),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
          color: "text.primary",
          "& .MuiAlert-icon": { color: "primary.main" }
        })}
      >
        <Typography sx={{ fontWeight: 700 }}>
          Atenção: {manutencoesEmAberto.length} veículos em Manutenção Ativa ou Programada
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
          <Typography variant="body2">Placas sob cuidado:</Typography>
          {manutencoesEmAberto.length ? (
            manutencoesEmAberto.map(item => (
              <Chip
                key={item.id}
                size="small"
                label={`${item.placa} (${item.tipoManutencao})`}
                sx={theme => {
                  const color =
                    item.tipoManutencao === TipoManutencao.CORRETIVA
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main;
                  return { backgroundColor: alpha(color, theme.palette.mode === "dark" ? 0.25 : 0.12), color };
                }}
              />
            ))
          ) : (
            <Typography variant="body2">Nenhuma manutenção em aberto.</Typography>
          )}
        </Box>
      </Alert>

      <CustomModal open={modalAberto} onClose={() => setModalAberto(false)} title="Registrar Manutenção">
        <ManutencaoForm
          afterSubmit={manutencao => {
            setManutencoes(current => [
              ...current,
              { ...manutencao, id: Math.max(0, ...current.map(item => item.id)) + 1 }
            ]);
            setModalAberto(false);
          }}
        />
      </CustomModal>
    </Box>
  );
}
